'use client';

import * as React from 'react';
import { isUrl } from '@udecode/plate';
import { useEditorRef } from '@udecode/plate/react';
import {
  AudioPlugin,
  FilePlugin,
  ImagePlugin,
  PlaceholderPlugin,
  VideoPlugin,
} from '@udecode/plate-media/react';
import { AudioLinesIcon, FileUpIcon, FilmIcon, ImageIcon, LinkIcon } from 'lucide-react';
import { useFilePicker } from 'use-file-picker';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  ToolbarSplitButton,
  ToolbarSplitButtonPrimary,
  ToolbarSplitButtonSecondary,
} from './toolbar';

import { useEditorBridge } from '@/components/editor/editor-context';

const MEDIA_CONFIG: Record<
  string,
  {
    accept: string[];
    icon: React.ReactNode;
    title: string;
    tooltip: string;
  }
> = {
  [AudioPlugin.key]: {
    accept: ['audio/*'],
    icon: <AudioLinesIcon className="size-4" />,
    title: 'Insert Audio',
    tooltip: 'Audio',
  },
  [FilePlugin.key]: {
    accept: ['*'],
    icon: <FileUpIcon className="size-4" />,
    title: 'Insert File',
    tooltip: 'File',
  },
  [ImagePlugin.key]: {
    accept: ['image/*'],
    icon: <ImageIcon className="size-4" />,
    title: 'Insert Image',
    tooltip: 'Image',
  },
  [VideoPlugin.key]: {
    accept: ['video/*'],
    icon: <FilmIcon className="size-4" />,
    title: 'Insert Video',
    tooltip: 'Video',
  },
};

export function MediaToolbarButton({
  nodeType,
  ...props
}: React.ComponentProps<typeof DropdownMenu> & { nodeType: string }) {
  const config = MEDIA_CONFIG[nodeType];
  const editor = useEditorRef();
  const { sendMessage, onMessage } = useEditorBridge();

  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const pendingUploads = React.useRef<Record<string, string>>({});

  // Listen for uploaded file URL
  React.useEffect(() => {
    onMessage('file', ({ id, url }: { id: string; url: string }) => {
      const type = pendingUploads.current[id];
      if (!type) return;

      editor.tf.insertNodes({
        type,
        url,
        name: type === FilePlugin.key ? url.split('/').pop() : undefined,
        children: [{ text: '' }],
      });

      delete pendingUploads.current[id];
    });
  }, [editor, onMessage]);

  const { openFilePicker } = useFilePicker({
    accept: config.accept,
    multiple: true,
    onFilesSelected: ({ plainFiles }) => {
      plainFiles.forEach((file) => {
        const id = `file-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        pendingUploads.current[id] = nodeType;

        sendMessage({
          type: 'file',
          data: { id, file },
        });
      });

      // Insere um placeholder visual se desejar
      editor.getTransforms(PlaceholderPlugin).insert.media(plainFiles);
    },
  });

  return (
    <>
      <ToolbarSplitButton
        onClick={() => openFilePicker()}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setOpen(true);
          }
        }}
        pressed={open}
      >
        <ToolbarSplitButtonPrimary>{config.icon}</ToolbarSplitButtonPrimary>

        <DropdownMenu open={open} onOpenChange={setOpen} modal={false} {...props}>
          <DropdownMenuTrigger asChild>
            <ToolbarSplitButtonSecondary />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" alignOffset={-32} onClick={(e) => e.stopPropagation()}>
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={() => openFilePicker()}>
                {config.icon}
                Carregar do computador
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setDialogOpen(true)}>
                <LinkIcon />
                Inserir via URL
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ToolbarSplitButton>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent className="gap-6">
          <MediaUrlDialogContent
            currentConfig={config}
            nodeType={nodeType}
            setOpen={setDialogOpen}
          />
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function MediaUrlDialogContent({
  currentConfig,
  nodeType,
  setOpen,
}: {
  currentConfig: (typeof MEDIA_CONFIG)[string];
  nodeType: string;
  setOpen: (value: boolean) => void;
}) {
  const editor = useEditorRef();
  const [url, setUrl] = React.useState('');

  const embedMedia = () => {
    if (!isUrl(url)) return toast.error('URL inválida');

    editor.tf.insertNodes({
      type: nodeType,
      url,
      name: nodeType === FilePlugin.key ? url.split('/').pop() : undefined,
      children: [{ text: '' }],
    });

    setOpen(false);
  };

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>{currentConfig.title}</AlertDialogTitle>
      </AlertDialogHeader>

      <AlertDialogDescription className="group relative w-full">
        <label
          htmlFor="url"
          className="absolute top-1/2 -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:top-0 group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground"
        >
          <span className="inline-flex bg-background px-2">URL</span>
        </label>
        <Input
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && embedMedia()}
          placeholder=""
          type="url"
          autoFocus
        />
      </AlertDialogDescription>

      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={(e) => {
          e.preventDefault();
          embedMedia();
        }}>
          Inserir
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
}
