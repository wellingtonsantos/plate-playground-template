'use client';

import * as React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Value } from '@udecode/plate-common';
import { Plate } from '@udecode/plate/react';
import { debounce } from 'lodash';

import { useEditorBridge } from '@/components/editor/editor-context';
import { useCreateEditor } from '@/components/editor/use-create-editor';
import { Editor, EditorContainer } from '@/components/ui/editor';

export function PlateEditor() {
  const [initialValue, setInitialValue] = React.useState<Value>([]);
  const editor = useCreateEditor({ value: initialValue }, [initialValue]);
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

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { data, type } = event.data;

      if (type === 'setContent') {
        try {
          const parsed = JSON.parse(data);
          setInitialValue(parsed); // atualiza o state que será usado como value no próximo render
          console.log('Conteúdo recebido:', parsed);
        } catch (err) {
          console.error('Erro ao parsear conteúdo:', err);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

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
