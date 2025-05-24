'use client';

import type { TElement } from '@udecode/plate';

// import { faker } from '@faker-js/faker';
import { CopilotPlugin } from '@udecode/plate-ai/react';
import { serializeMd, stripMarkdown } from '@udecode/plate-markdown';

import { GhostText } from '@/components/ui/ghost-text';

import { markdownPlugin } from './markdown-plugin';

export const copilotPlugins = [
  markdownPlugin,
  CopilotPlugin.configure(({ api }) => ({
    options: {
      completeOptions: {
        api: '/api/ai/copilot',
        body: {
          system: `You are an advanced AI writing assistant, similar to VSCode Copilot but for general text. Your task is to predict and generate the next part of the text based on the given context.

Rules:

Continue the text naturally up to the next punctuation mark (., ,, ;, :, ?, or !).

Maintain the original style and tone. Do not repeat the input text.

For unclear or ambiguous context, provide the most likely continuation.

Handle code snippets, lists, or structured content when necessary.

Do not include triple quotes in your response.

CRITICAL: Always end the suggestion with a punctuation mark.

CRITICAL: Never start a new block or paragraph. Avoid using headings, lists, or block formatting.

If there's no context or a continuation isn't possible, return "0" (without explanation).

CRITICAL: Respond in the same language as the context, regardless of which language it is.`,
        },
        onError: (e) => {
          // Mock the API response. Remove it when you implement the route /api/ai/copilot
          // api.copilot.setBlockSuggestion({
          //   text: stripMarkdown(faker.lorem.sentence()),
          // });
          console.log(e)
        },
        onFinish: (_, completion) => {
          if (completion === '0') return;

          api.copilot.setBlockSuggestion({
            text: stripMarkdown(completion),
          });
        },
      },
      debounceDelay: 500,
      renderGhostText: GhostText,
      getPrompt: ({ editor }) => {
        const contextEntry = editor.api.block({ highest: true });

        if (!contextEntry) return '';

        const prompt = serializeMd(editor, {
          value: [contextEntry[0] as TElement],
        });

        return `Continue the text up to the next punctuation mark:
  """
  ${prompt}
  """`;
      },
    },
  })),
] as const;
