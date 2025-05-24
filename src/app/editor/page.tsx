'use client';

import { useEffect } from 'react';

import { Toaster } from 'sonner';

import { EditorProvider, useEditorBridge } from '@/components/editor/editor-context';
import { PlateEditor } from '@/components/editor/plate-editor';
import { SettingsProvider } from '@/components/editor/settings';

function EditorWrapper() {
  const { onMessage } = useEditorBridge();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { data, type } = event.data;

      if (type === 'setContent') {
        try {
          const parsed = JSON.parse(data);
          console.log('Conteúdo recebido:', parsed);
        } catch (err) {
          console.error('Erro ao parsear conteúdo:', err);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onMessage]);

  return <PlateEditor />;
}

export default function Page() {
  return (
    <div className="h-screen w-full">
      <SettingsProvider>
        <EditorProvider>
          <EditorWrapper />
        </EditorProvider>
      </SettingsProvider>
      <Toaster />
    </div>
  );
}
