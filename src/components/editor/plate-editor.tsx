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
  const [readOnly, setReadOnly] = React.useState(false); // estado de leitura
  const editor = useCreateEditor({ value: initialValue }, [initialValue]);
  const { sendMessage, onMessage } = useEditorBridge();

  const debouncedSend = React.useMemo(
    () =>
      debounce((value: Value) => {
        sendMessage({ data: value, type: 'content' });
      }, 1000),
    [sendMessage]
  );

  const handleValueChange = ({ value }: { value: Value }) => {
    if (!readOnly) {
      debouncedSend(value);
    }
  };

  React.useEffect(() => {
    // Lida com mensagens específicas do contexto
    onMessage('readonly', (value) => {
      console.log('[PlateEditor] Modo readOnly alterado para:', value);
      setReadOnly(!!value);
    });

    onMessage('setContent', (raw) => {
      try {
        const parsed = JSON.parse(raw);
        setInitialValue(parsed);
        console.log('[PlateEditor] Conteúdo recebido:', parsed);
      } catch (err) {
        console.error('[PlateEditor] Erro ao parsear conteúdo:', err);
      }
    });
  }, [onMessage]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate
        onValueChange={handleValueChange}
        editor={editor}
        readOnly={readOnly} // <-- aqui aplicamos o controle
      >
        <EditorContainer>
          <Editor variant="demo" />
        </EditorContainer>
        {/* <SettingsDialog /> */}
      </Plate>
    </DndProvider>
  );
}
