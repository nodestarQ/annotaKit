# annotakit

[![npm version](https://img.shields.io/npm/v/annotakit)](https://www.npmjs.com/package/annotakit)
[![npm downloads](https://img.shields.io/npm/dm/annotakit)](https://www.npmjs.com/package/annotakit)
[![license](https://img.shields.io/npm/l/annotakit)](LICENSE)

Show your AI what to fix. Click your UI, leave notes, generate agent-ready context.

**[Documentation](https://annotakit.dev)**

annotaKit is a Svelte component that lets you annotate UI elements and export structured markdown. Click elements, add comments, and copy the output straight into Claude, Cursor, or any AI agent.

![annotakit demo](media/demo.gif)

## Install

```bash
pnpm add annotakit
```

```bash
npm install annotakit
```

```bash
yarn add annotakit
```

Requires `svelte ^5.35.0` as a peer dependency.

## Usage

Import the component and stylesheet in your root layout:

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import { Annotakit } from 'annotakit';
  import 'annotakit/styles';
</script>

<Annotakit />
<slot />
```

That's it. A floating toolbar appears in the corner of your app.

Start collapsed with `<Annotakit minimized />`.

## How It Works

1. **Activate** - import annotaKit and the toolbar appears
2. **Annotate** - click elements, select text, or drag to multi-select
3. **Comment** - add notes describing the change needed
4. **Export** - copy structured markdown to your clipboard or pipe it to an AI agent
5. **Paste** - drop the markdown into Claude, Cursor, or any AI tool

Output includes CSS selectors, Svelte component info, accessibility attributes, and computed styles. Everything an agent needs to locate and understand the element.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `position` | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'bottom-right'` | Toolbar position on screen |
| `outputFormat` | `'compact' \| 'standard' \| 'detailed'` | `'standard'` | Default markdown output format |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'auto'` | Color theme (`auto` follows system/`<html class="dark">`) |
| `storageKey` | `string` | `'annotakit'` | localStorage key for persisted annotations |
| `retentionDays` | `number` | `7` | Days to keep annotations in storage |
| `highlightColor` | `'green' \| 'blue' \| 'purple' \| 'red' \| 'orange' \| 'yellow'` | `'green'` | Annotation highlight color |
| `enabled` | `boolean` | `true` | Show/hide the toolbar |
| `minimized` | `boolean` | `false` | Start the toolbar collapsed |
| `mcpServerUrl` | `string` | - | MCP server URL for status indicator (e.g. `'http://localhost:4156'`) |
| `onOutput` | `(markdown: string) => void` | - | Callback when markdown is generated |

## Output Formats

annotaKit generates structured markdown in three formats:

**Compact** - one line per annotation, minimal:

```
1. `nav > button.menu` (HeaderNav) - Fix hover state
```

**Standard** - grouped with selector, component info, accessibility:

```markdown
### 1. BUTTON

- **Selector:** `nav > button.menu`
- **Component:** HeaderNav (`src/lib/HeaderNav.svelte`)
- **Comment:** Fix hover state
- **Accessibility:** role="button", aria-label="Menu"
```

**Detailed** - everything above plus dimensions, computed styles, and component chain.

## Annotation Modes

- **Element** - click any element to annotate it with a CSS selector, component info, and a comment
- **Text** - select text within an element to capture the selection with surrounding context
- **Multi-element** - drag across multiple elements to group them into a single annotation

## Features

- Edit, delete, and update annotations inline
- Markdown export in three detail levels with output preview dialog
- Quick copy to clipboard from toolbar
- Auto-clear after copy option in settings
- Clear-all confirmation to prevent accidental deletion
- Toggle annotation visibility without disabling annotation mode
- Freeze page animations while annotating
- Customizable highlight color (6 options)
- Block page interactions toggle to prevent accidental clicks
- Annotations persist in localStorage with configurable retention period
- Light/dark mode with auto-detection
- Svelte component detection (name, file, line, component chain)
- Keyboard shortcuts (Escape to deselect/close)

## MCP Integration

annotaKit can connect to an MCP server so AI agents (Claude Desktop, Claude Code, etc.) can receive and respond to your annotations in real time.

```bash
pnpm add @annotakit/mcp
```

Start the server:

```bash
npx @annotakit/mcp
```

Wire up the browser bridge:

```svelte
<script lang="ts">
  import { Annotakit, annotakitState } from 'annotakit'
  import { createMcpBridge } from '@annotakit/mcp/bridge'
  import { browser } from '$app/environment'
  import { onDestroy } from 'svelte'

  const mcpBridge = browser ? createMcpBridge() : null

  $effect(() => {
    if (mcpBridge) {
      mcpBridge.sync(annotakitState.annotations, window.location.href, document.title)
    }
  })

  onDestroy(() => mcpBridge?.disconnect())
</script>

<Annotakit mcpServerUrl="http://localhost:4156" />
```

A status dot in the settings panel shows whether the MCP server is connected. The server exposes 9 tools for AI agents to list sessions, read annotations, acknowledge, resolve, dismiss, reply, and watch for new annotations.

See the [`@annotakit/mcp` README](packages/mcp/README.md) for full setup and tool reference.

## Packages

| Package | Description |
| --- | --- |
| [`annotakit`](packages/core) | Core library - Svelte 5 component + framework-agnostic engine |
| [`@annotakit/mcp`](packages/mcp) | MCP server - connects annotations to AI agents in real time |

## Roadmap

- [ ] **Framework packages** - dedicated packages for other frameworks (React, Vue, etc.) so annotaKit works beyond SvelteKit
- [ ] **Collaborative annotations** - share annotation sessions across team members in real time
- [ ] **Browser extension** - annotate any website without adding annotaKit to the project

Have an idea? [Open an issue](https://github.com/nodestarQ/annotaKit/issues).

## Contributing

We're looking for help with documentation, DX/testing, export formats, and framework support. See the [contributing guide](CONTRIBUTING.md) for details on how to get started.

## Development

Requires [pnpm](https://pnpm.io/) and Node.js 18+.

```bash
# Install dependencies
pnpm install

# Start dev playground
pnpm dev

# Type check
pnpm check

# Build package
pnpm build
```

## Acknowledgements

Inspired by [Agentation](https://github.com/benjitaylor/agentation) (PolyForm Shield 1.0.0). Annotakit is a clean-room implementation built for the SvelteKit ecosystem, written from scratch under the MIT license.

## License

© 2026 nodestarQ

[MIT](LICENSE)
