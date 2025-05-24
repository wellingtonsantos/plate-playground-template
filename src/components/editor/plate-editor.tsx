'use client';

import * as React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Value } from '@udecode/plate-common';
import { Plate } from '@udecode/plate/react';
import { debounce } from 'lodash';

import { useEditorBridge } from '@/components/editor/editor-context';
// import { SettingsDialog } from '@/components/editor/settings';
import { useCreateEditor } from '@/components/editor/use-create-editor';
import { Editor, EditorContainer } from '@/components/ui/editor';

export function PlateEditor() {
  const editor = useCreateEditor();
  const { sendMessage } = useEditorBridge();

  const debouncedSend = React.useMemo(
    () =>
      debounce((value: Value) => {
        sendMessage({ data: value, type: 'content' });
      }, 1000),
    [sendMessage]
  );

  const handleValueChange = ({ value }: { value: Value }) => {
    debouncedSend(value);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate onValueChange={handleValueChange} editor={editor}>
        <EditorContainer>
          <Editor variant="demo" />
        </EditorContainer>
        {/* <SettingsDialog /> */}
      </Plate>
    </DndProvider>
  );
}
