'use client';

import * as React from 'react';
import type { TMentionInputElement } from '@udecode/plate-mention';
import type { PlateElementProps } from '@udecode/plate/react';

import { getMentionOnSelectItem } from '@udecode/plate-mention';
import { PlateElement } from '@udecode/plate/react';

import {
  InlineCombobox,
  InlineComboboxContent,
  InlineComboboxEmpty,
  InlineComboboxGroup,
  InlineComboboxInput,
  InlineComboboxItem,
} from './inline-combobox';

import { useEditorBridge } from '../editor/editor-context';

const onSelectItem = getMentionOnSelectItem();

type Mentionable = {
  key: string;
  text: string;
};

export function MentionInputElement(
  props: PlateElementProps<TMentionInputElement>
) {
  const { editor, element } = props;
  const [search, setSearch] = React.useState('');
  const [mentionables, setMentionables] = React.useState<Mentionable[]>([]);
  const { onMessage } = useEditorBridge();

  React.useEffect(() => {
    onMessage('mentionables', (data) => {
      if (Array.isArray(data)) {
        setMentionables(data);
      }
    });
  }, [onMessage]);

  return (
    <PlateElement {...props} as="span" data-slate-value={element.value}>
      <InlineCombobox
        value={search}
        element={element}
        setValue={setSearch}
        showTrigger={false}
        trigger="@"
      >
        <span className="inline-block rounded-md bg-muted px-1.5 py-0.5 align-baseline text-sm ring-ring focus-within:ring-2">
          <InlineComboboxInput />
        </span>

        <InlineComboboxContent className="my-1.5">
          <InlineComboboxEmpty>No results</InlineComboboxEmpty>

          <InlineComboboxGroup>
            {mentionables.map((item) => (
              <InlineComboboxItem
                key={item.key}
                value={item.text}
                onClick={() => onSelectItem(editor, item, search)}
              >
                {item.text}
              </InlineComboboxItem>
            ))}
          </InlineComboboxGroup>
        </InlineComboboxContent>
      </InlineCombobox>

      {props.children}
    </PlateElement>
  );
}
