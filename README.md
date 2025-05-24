# Uso do Plate JS como iframe se comunicando via postMessage

### setContent
- Objetivo: Define o conteúdo do editor.
- Exemplo de mensagem:
```ts
{
  type: 'setContent',
  data: { content: [...] } // conteúdo compatível com o editor Plate
}
```

### editor-mode
- Objetivo: Alterna entre os modos editing, viewing ou suggestion.
- Exemplo de mensagem:
```ts
{
  type: 'editor-mode',
  data: 'editing' // ou 'viewing' | 'suggestion'
}
```

### mentionables
- Objetivo: Define a lista de menções disponíveis (para @ mention).
- Exemplo de mensagem:
```ts
{
  type: 'mentionables',
  data: [
    { key: '1', text: 'João' },
    { key: '2', text: 'Maria' }
  ]
}
```

---

# Playground Template

A Next.js 15 template with [Plate](https://platejs.org/) AI, plugins and components.

## Features

- Next.js 15 App Directory
- [Plate](https://platejs.org/) editor
- [shadcn/ui](https://ui.shadcn.com/)
- [MCP](https://platejs.org/docs/components/mcp)

## Requirements

- Node.js 20+
- pnpm 9+

## Installation

Choose one of these methods:

### 1. Using CLI (Recommended)

```bash
npx shadcn@latest add https://platejs.org/r/editor-ai
```

### 2. Using Template

[Use this template](https://github.com/udecode/plate-playground-template/generate), then install dependencies:

```bash
pnpm install
```

## Development

Copy the example env file:

```bash
cp .env.example .env.local
```

Configure `.env.local`:

- `OPENAI_API_KEY` – OpenAI API key ([get one here](https://platform.openai.com/account/api-keys))
- `UPLOADTHING_TOKEN` – UploadThing API key ([get one here](https://uploadthing.com/dashboard))

Start the development server:

```bash
pnpm dev
```

Visit http://localhost:3000/editor to see the editor in action.
