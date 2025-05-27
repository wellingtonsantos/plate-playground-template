'use client';

import * as React from 'react';

import { useEditorReadOnly } from '@udecode/plate/react';
// import { HighlightPlugin } from '@udecode/plate-highlight/react';
import {
  AudioPlugin,
  FilePlugin,
  ImagePlugin,
  VideoPlugin,
} from '@udecode/plate-media/react';

import {
  // HighlighterIcon,
  // ArrowUpToLineIcon,
  BaselineIcon,
  // BoldIcon,
  // Code2Icon,
  // ItalicIcon,
  PaintBucketIcon,
  // StrikethroughIcon,
  // UnderlineIcon,
  // WandSparklesIcon,
} from 'lucide-react';

// import { MoreDropdownMenu } from '@/components/ui/more-dropdown-menu';

// import { AIToolbarButton } from './ai-toolbar-button';
import { AlignDropdownMenu } from './align-dropdown-menu';
import { ColorDropdownMenu } from './color-dropdown-menu';
// import { CommentToolbarButton } from './comment-toolbar-button';
import { EmojiDropdownMenu } from './emoji-dropdown-menu';
// import { ExportToolbarButton } from './export-toolbar-button';
// import { FontSizeToolbarButton } from './font-size-toolbar-button';
import { RedoToolbarButton, UndoToolbarButton } from './history-toolbar-button';
// import { ImportToolbarButton } from './import-toolbar-button';
// import {
//   BulletedIndentListToolbarButton,
//   NumberedIndentListToolbarButton,
// } from './indent-list-toolbar-button';
// import { IndentTodoToolbarButton } from './indent-todo-toolbar-button';
// import { IndentToolbarButton } from './indent-toolbar-button';
// import { InsertDropdownMenu } from './insert-dropdown-menu';
// import { LineHeightDropdownMenu } from './line-height-dropdown-menu';
// import { LinkToolbarButton } from './link-toolbar-button';
// import { MarkToolbarButton } from './mark-toolbar-button';
import { MediaToolbarButton } from './media-toolbar-button';
// import { ModeDropdownMenu } from './mode-dropdown-menu';
// import { OutdentToolbarButton } from './outdent-toolbar-button';
// import { TableDropdownMenu } from './table-dropdown-menu';
// import { ToggleToolbarButton } from './toggle-toolbar-button';
import { ToolbarGroup } from './toolbar';
// import { TurnIntoDropdownMenu } from './turn-into-dropdown-menu';

import {
  FontBackgroundColorPlugin,
  FontColorPlugin,
} from '@udecode/plate-font/react';

export function FixedToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <div className="flex w-full">
      {!readOnly && (
        <>
          <ToolbarGroup>
            <UndoToolbarButton />
            <RedoToolbarButton />
          </ToolbarGroup>

          {/* 
          <ToolbarGroup>
            <AIToolbarButton tooltip="Comandos de IA">
              <WandSparklesIcon />
            </AIToolbarButton>
          </ToolbarGroup> 
          */}

          {/* 
          <ToolbarGroup>
            <ExportToolbarButton>
              <ArrowUpToLineIcon />
            </ExportToolbarButton>
            <ImportToolbarButton />
          </ToolbarGroup>
          */}

          {/* 
          <ToolbarGroup>
            <InsertDropdownMenu />
            <TurnIntoDropdownMenu />
            <FontSizeToolbarButton />
          </ToolbarGroup>
          */}

          
          <ToolbarGroup>
            {/* <MarkToolbarButton nodeType={BoldPlugin.key} tooltip="Negrito (⌘+B)">
              <BoldIcon />
            </MarkToolbarButton>

            <MarkToolbarButton
              nodeType={ItalicPlugin.key}
              tooltip="Itálico (⌘+I)"
            >
              <ItalicIcon />
            </MarkToolbarButton>

            <MarkToolbarButton
              nodeType={UnderlinePlugin.key}
              tooltip="Sublinhado (⌘+U)"
            >
              <UnderlineIcon />
            </MarkToolbarButton>

            <MarkToolbarButton
              nodeType={StrikethroughPlugin.key}
              tooltip="Riscado (⌘+⇧+M)"
            >
              <StrikethroughIcon />
            </MarkToolbarButton>

            <MarkToolbarButton nodeType={CodePlugin.key} tooltip="Código (⌘+E)">
              <Code2Icon />
            </MarkToolbarButton> */}

            <AlignDropdownMenu />

            <ColorDropdownMenu
              nodeType={FontColorPlugin.key}
              tooltip="Cor do texto"
            >
              <BaselineIcon />
            </ColorDropdownMenu>

            <ColorDropdownMenu
              nodeType={FontBackgroundColorPlugin.key}
              tooltip="Cor de fundo"
            >
              <PaintBucketIcon />
            </ColorDropdownMenu>

            <EmojiDropdownMenu />
          </ToolbarGroup>
         

          {/* <ToolbarGroup>
            <AlignDropdownMenu />
            <NumberedIndentListToolbarButton />
            <BulletedIndentListToolbarButton />
            <IndentTodoToolbarButton />
            <ToggleToolbarButton />
          </ToolbarGroup> */}

          {/* <ToolbarGroup>
            <LinkToolbarButton />
            <TableDropdownMenu />
            <EmojiDropdownMenu />
          </ToolbarGroup> */}

          <ToolbarGroup>
            <MediaToolbarButton nodeType={ImagePlugin.key} />
            <MediaToolbarButton nodeType={VideoPlugin.key} />
            <MediaToolbarButton nodeType={AudioPlugin.key} />
            <MediaToolbarButton nodeType={FilePlugin.key} />
          </ToolbarGroup>

          {/* <ToolbarGroup>
            <LineHeightDropdownMenu />
            <OutdentToolbarButton />
            <IndentToolbarButton />
          </ToolbarGroup> */}

          {/* <ToolbarGroup>
            <MoreDropdownMenu />
          </ToolbarGroup> */}
        </>
      )}

      <div className="grow" />

      {/* <ToolbarGroup>
        <MarkToolbarButton nodeType={HighlightPlugin.key} tooltip="Destaque">
          <HighlighterIcon />
        </MarkToolbarButton>
        <CommentToolbarButton />
      </ToolbarGroup> */}
      
      {/* {!readOnly && (
        <ToolbarGroup>
          <ModeDropdownMenu />
        </ToolbarGroup>
      )} */}
    </div>
  );
}
