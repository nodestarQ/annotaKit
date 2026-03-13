# annotakit

[![npm version](https://img.shields.io/npm/v/annotakit)](https://www.npmjs.com/package/annotakit)
[![npm downloads](https://img.shields.io/npm/dm/annotakit)](https://www.npmjs.com/package/annotakit)
[![license](https://img.shields.io/npm/l/annotakit)](LICENSE)

Click your UI, leave notes, generate agent-ready context.

**[Documentation](https://annotakit.dev)**

![annotakit demo](../../media/demo.gif)

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

Annotakit generates structured markdown in three formats:

**Compact** -one line per annotation, minimal:

```
1. `nav > button.menu` (HeaderNav) -Fix hover state
```

**Standard** -grouped with selector, component info, accessibility:

```markdown
### 1. BUTTON

- **Selector:** `nav > button.menu`
- **Component:** HeaderNav (`src/lib/HeaderNav.svelte`)
- **Comment:** Fix hover state
- **Accessibility:** role="button", aria-label="Menu"
```

**Detailed** -everything above plus dimensions, computed styles, and component chain.

## Modes

- **Element** -click any element to annotate it with a CSS selector, component info, and a comment
- **Text** -select text within an element to capture the selection with surrounding context
- **Multi-element** -click multiple elements to group them into a single annotation

## Features

- Edit, delete, and update annotations inline
- Markdown export in three detail levels with output preview dialog
- Quick copy to clipboard from toolbar
- Clear-all confirmation to prevent accidental deletion
- Toggle annotation visibility without disabling annotation mode
- Freeze page animations while annotating
- Customizable highlight color (6 options)
- Block page interactions toggle to prevent accidental clicks
- Auto-clear after copy option in settings
- Annotations persist in localStorage with configurable retention period
- Light/dark mode with auto-detection
- Svelte component detection (name, file, line, component chain)
- Keyboard shortcuts (Escape to deselect/close)

## MCP Integration

annotaKit can connect to an MCP server so AI agents (Claude Desktop, Claude Code, etc.) can receive and respond to your annotations in real time.

Install `@annotakit/mcp` and pass the server URL:

```svelte
<Annotakit mcpServerUrl="http://localhost:4156" />
```

A status dot in the settings panel shows whether the MCP server is connected. See the [`@annotakit/mcp` README](../mcp/README.md) for full setup.

## License
© 2026 nodestarQ

[MIT](LICENSE)
