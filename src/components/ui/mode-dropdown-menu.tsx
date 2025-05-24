'use client';

import * as React from 'react';

import {
  type DropdownMenuProps,
  DropdownMenuItemIndicator,
} from '@radix-ui/react-dropdown-menu';
import { SuggestionPlugin } from '@udecode/plate-suggestion/react';
import {
  useEditorRef,
  usePlateState,
  usePluginOption,
} from '@udecode/plate/react';
import { CheckIcon, EyeIcon, PencilLineIcon, PenIcon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ToolbarButton } from './toolbar';
import { useEditorBridge } from '../editor/editor-context';

export function ModeDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const [readOnly, setReadOnly] = usePlateState('readOnly');
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState<'editing' | 'viewing' | 'suggestion'>('editing');

  const isSuggesting = usePluginOption(SuggestionPlugin, 'isSuggesting');
  const { onMessage } = useEditorBridge();

  React.useEffect(() => {
    onMessage('editor-mode', (newMode: 'editing' | 'viewing' | 'suggestion') => {
      console.log('[ModeDropdownMenu] Modo recebido via postMessage:', newMode);
      setMode(newMode);

      if (newMode === 'viewing') {
        setReadOnly(true);
        editor.setOption(SuggestionPlugin, 'isSuggesting', false);
        return;
      }

      setReadOnly(false);

      if (newMode === 'suggestion') {
        editor.setOption(SuggestionPlugin, 'isSuggesting', true);
      } else {
        editor.setOption(SuggestionPlugin, 'isSuggesting', false);
      }

      if (newMode === 'editing') {
        editor.tf.focus();
      }
    });
  }, [onMessage, editor, setReadOnly]);

  if (mode === 'viewing') {
    return null;
  }

  let value = 'editing';
  if (readOnly) value = 'viewing';
  if (isSuggesting) value = 'suggestion';

  const item: Record<string, { icon: React.ReactNode; label: string }> = {
    editing: { icon: <PenIcon />, label: 'Editar' },
    suggestion: { icon: <PencilLineIcon />, label: 'Sugerir' },
    viewing: { icon: <EyeIcon />, label: 'Visualizar' },
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={open} tooltip="Modo de edição" isDropdown>
          {item[value].icon}
          <span className="hidden lg:inline">{item[value].label}</span>
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-[180px]" align="start">
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(newValue) => {
            if (newValue === 'viewing') {
              setReadOnly(true);
              return;
            } else {
              setReadOnly(false);
            }

            if (newValue === 'suggestion') {
              editor.setOption(SuggestionPlugin, 'isSuggesting', true);
              return;
            } else {
              editor.setOption(SuggestionPlugin, 'isSuggesting', false);
            }

            if (newValue === 'editing') {
              editor.tf.focus();
              return;
            }
          }}
        >
          <DropdownMenuRadioItem
            className="pl-2 *:first:[span]:hidden *:[svg]:text-muted-foreground"
            value="editing"
          >
            <Indicator />
            {item.editing.icon}
            {item.editing.label}
          </DropdownMenuRadioItem>

          {/* <DropdownMenuRadioItem
            className="pl-2 *:first:[span]:hidden *:[svg]:text-muted-foreground"
            value="viewing"
          >
            <Indicator />
            {item.viewing.icon}
            {item.viewing.label}
          </DropdownMenuRadioItem> */}

          <DropdownMenuRadioItem
            className="pl-2 *:first:[span]:hidden *:[svg]:text-muted-foreground"
            value="suggestion"
          >
            <Indicator />
            {item.suggestion.icon}
            {item.suggestion.label}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Indicator() {
  return (
    <span className="pointer-events-none absolute right-2 flex size-3.5 items-center justify-center">
      <DropdownMenuItemIndicator>
        <CheckIcon />
      </DropdownMenuItemIndicator>
    </span>
  );
}
