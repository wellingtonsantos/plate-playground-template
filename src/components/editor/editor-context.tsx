'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';

type Message = {
  data: any;
  type: string;
};

type EditorContextType = {
  sendMessage: (msg: Message) => void;
  onMessage: (type: string, handler: (data: any) => void) => void;
};

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const useEditorBridge = () => {
  const context = useContext(EditorContext);
  if (!context) throw new Error('useEditorBridge deve ser usado dentro do EditorProvider');
  return context;
};

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const handlersRef = useRef<Record<string, Array<(data: any) => void>>>({});
  const lastMessages = useRef<Record<string, any>>({});

  const sendMessage = (msg: Message) => {
    window.parent.postMessage(msg, '*');
    console.log('[EditorProvider] Enviando mensagem:', msg);
  };

  const onMessage = (type: string, handler: (data: any) => void) => {
    if (!handlersRef.current[type]) {
      handlersRef.current[type] = [];
    }
    handlersRef.current[type].push(handler);

    // ⚠️ Executa handler imediatamente se já tem mensagem anterior
    if (type in lastMessages.current) {
      console.log(`[EditorProvider] Executando handler imediato com mensagem anterior para tipo: ${type}`);
      handler(lastMessages.current[type]);
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { data, type } = event.data || {};

      console.log('[EditorProvider] Mensagem recebida:', event.data);

      if (typeof type === 'string') {
        lastMessages.current[type] = data;

        if (handlersRef.current[type]) {
          handlersRef.current[type].forEach((handler) => {
            console.log(`[EditorProvider] Executando handler registrado para tipo: ${type}`);
            handler(data);
          });
        } else {
          console.warn('[EditorProvider] Nenhum handler registrado para tipo:', type);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <EditorContext.Provider value={{ sendMessage, onMessage }}>
      {children}
    </EditorContext.Provider>
  );
};