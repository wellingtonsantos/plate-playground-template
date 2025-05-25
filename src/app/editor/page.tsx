'use client';

import { Toaster } from 'sonner';

import { EditorProvider } from '@/components/editor/editor-context';
import { PlateEditor } from '@/components/editor/plate-editor';
import { SettingsProvider } from '@/components/editor/settings';

export default function Page() {
  return (
    <div className="h-screen w-full">
      <SettingsProvider>
        <EditorProvider>
          <PlateEditor />
        </EditorProvider>
      </SettingsProvider>
      <Toaster />
    </div>
  );
}
