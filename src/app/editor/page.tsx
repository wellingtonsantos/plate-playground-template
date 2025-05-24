import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';

import { PlateEditor } from '@/components/editor/plate-editor';
import { SettingsProvider } from '@/components/editor/settings';

export default function Page() {
  const [externalContent, setExternalContent] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // if (event.origin !== 'https://app.weweb.io') return;

      const { type, content } = event.data;

      if (type === 'setContent') {
        console.log('Recebido do WeWeb:', content);
        setExternalContent(content);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="h-screen w-full">
      <SettingsProvider>
        <PlateEditor externalContent={externalContent} />
      </SettingsProvider>
      <Toaster />
    </div>
  );
}
