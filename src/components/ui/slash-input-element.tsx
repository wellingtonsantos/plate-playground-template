'use client';

import * as React from 'react';

import type { TSlashInputElement } from '@udecode/plate-slash-command';

import { AIChatPlugin } from '@udecode/plate-ai/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { CalloutPlugin } from '@udecode/plate-callout/react';
import { CodeBlockPlugin } from '@udecode/plate-code-block/react';
import { DatePlugin } from '@udecode/plate-date/react';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { TocPlugin } from '@udecode/plate-heading/react';
import { INDENT_LIST_KEYS, ListStyleType } from '@udecode/plate-indent-list';
import {
  EquationPlugin,
  InlineEquationPlugin,
} from '@udecode/plate-math/react';
import { TablePlugin } from '@udecode/plate-table/react';
import { TogglePlugin } from '@udecode/plate-toggle/react';
import {
  type PlateEditor,
  type PlateElementProps,
  ParagraphPlugin,
} from '@udecode/plate/react';
import { PlateElement } from '@udecode/plate/react';
import {
  CalendarIcon,
  ChevronRightIcon,
  Code2,
  Columns3Icon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  LightbulbIcon,
  ListIcon,
  ListOrdered,
  PilcrowIcon,
  Quote,
  RadicalIcon,
  SparklesIcon,
  Square,
  Table,
  TableOfContentsIcon,
} from 'lucide-react';

import {
  insertBlock,
  insertInlineElement,
} from '@/components/editor/transforms';

import {
  InlineCombobox,
  InlineComboboxContent,
  InlineComboboxEmpty,
  InlineComboboxGroup,
  InlineComboboxGroupLabel,
  InlineComboboxInput,
  InlineComboboxItem,
} from './inline-combobox';

type Group = {
  group: string;
  items: Item[];
};

interface Item {
  icon: React.ReactNode;
  value: string;
  onSelect: (editor: PlateEditor, value: string) => void;
  className?: string;
  focusEditor?: boolean;
  keywords?: string[];
  label?: string;
}

const groups: Group[] = [
  {
    group: 'AI',
    items: [
      {
        focusEditor: false,
        icon: <SparklesIcon />,
        value: 'AI',
        onSelect: (editor) => {
          editor.getApi(AIChatPlugin).aiChat.show();
        },
      },
    ],
  },
  {
    group: 'Basic blocks',
    items: [
      {
        icon: <PilcrowIcon />,
        keywords: ['paragraph'],
        label: 'Texto normal',
        value: ParagraphPlugin.key,
      },
      {
        icon: <Heading1Icon />,
        keywords: ['title', 'h1'],
        label: 'Título 1',
        value: HEADING_KEYS.h1,
      },
      {
        icon: <Heading2Icon />,
        keywords: ['subtitle', 'h2'],
        label: 'Título 2',
        value: HEADING_KEYS.h2,
      },
      {
        icon: <Heading3Icon />,
        keywords: ['subtitle', 'h3'],
        label: 'Título 3',
        value: HEADING_KEYS.h3,
      },
      {
        icon: <ListIcon />,
        keywords: ['unordered', 'ul', '-'],
        label: 'Lista com marcadores',
        value: ListStyleType.Disc,
      },
      {
        icon: <ListOrdered />,
        keywords: ['ordered', 'ol', '1'],
        label: 'Lista numerada',
        value: ListStyleType.Decimal,
      },
      {
        icon: <Square />,
        keywords: ['checklist', 'task', 'checkbox', '[]'],
        label: 'Lista de tarefas',
        value: INDENT_LIST_KEYS.todo,
      },
      {
        icon: <ChevronRightIcon />,
        keywords: ['collapsible', 'expandable'],
        label: 'Alternar',
        value: TogglePlugin.key,
      },
      {
        icon: <Code2 />,
        keywords: ['```'],
        label: 'Bloco de código',
        value: CodeBlockPlugin.key,
      },
      {
        icon: <Table />,
        label: 'Tabela',
        value: TablePlugin.key,
      },
      {
        icon: <Quote />,
        keywords: ['citation', 'blockquote', 'quote', '>'],
        label: 'Citação em bloco',
        value: BlockquotePlugin.key,
      },
      {
        description: 'Insira um bloco destacado.',
        icon: <LightbulbIcon />,
        keywords: ['note'],
        label: 'Faixa',
        value: CalloutPlugin.key,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
  },
  {
    group: 'Advanced blocks',
    items: [
      {
        icon: <TableOfContentsIcon />,
        keywords: ['toc'],
        label: 'Índice',
        value: TocPlugin.key,
      },
      {
        icon: <Columns3Icon />,
        label: '3 colunas',
        value: 'action_three_columns',
      },
      {
        focusEditor: false,
        icon: <RadicalIcon />,
        label: 'Equação',
        value: EquationPlugin.key,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
  },
  {
    group: 'Inline',
    items: [
      {
        focusEditor: true,
        icon: <CalendarIcon />,
        keywords: ['time'],
        label: 'Data',
        value: DatePlugin.key,
      },
      {
        focusEditor: false,
        icon: <RadicalIcon />,
        label: 'Equação Inline',
        value: InlineEquationPlugin.key,
      },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertInlineElement(editor, value);
      },
    })),
  },
];

export function SlashInputElement(
  props: PlateElementProps<TSlashInputElement>
) {
  const { editor, element } = props;

  return (
    <PlateElement {...props} as="span" data-slate-value={element.value}>
      <InlineCombobox element={element} trigger="/">
        <InlineComboboxInput />

        <InlineComboboxContent>
          <InlineComboboxEmpty>No results</InlineComboboxEmpty>

          {groups.map(({ group, items }) => (
            <InlineComboboxGroup key={group}>
              <InlineComboboxGroupLabel>{group}</InlineComboboxGroupLabel>

              {items.map(
                ({ focusEditor, icon, keywords, label, value, onSelect }) => (
                  <InlineComboboxItem
                    key={value}
                    value={value}
                    onClick={() => onSelect(editor, value)}
                    label={label}
                    focusEditor={focusEditor}
                    group={group}
                    keywords={keywords}
                  >
                    <div className="mr-2 text-muted-foreground">{icon}</div>
                    {label ?? value}
                  </InlineComboboxItem>
                )
              )}
            </InlineComboboxGroup>
          ))}
        </InlineComboboxContent>
      </InlineCombobox>

      {props.children}
    </PlateElement>
  );
}
