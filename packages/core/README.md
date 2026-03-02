# annotakit

Click your UI, leave notes, generate agent-ready context.

<!-- TODO: Add screenshot or GIF demo -->
<!-- ![annotakit demo](https://raw.githubusercontent.com/nodestarQ/annotaKit/main/.github/demo.gif) -->

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
| `enabled` | `boolean` | `true` | Show/hide the toolbar |
| `onOutput` | `(markdown: string) => void` | — | Callback when markdown is generated |

## Output Formats

Annotakit generates structured markdown in three formats:

**Compact** — one line per annotation, minimal:

```
1. `nav > button.menu` (HeaderNav) — Fix hover state
```

**Standard** — grouped with selector, component info, accessibility:

```markdown
### 1. BUTTON

- **Selector:** `nav > button.menu`
- **Component:** HeaderNav (`src/lib/HeaderNav.svelte`)
- **Comment:** Fix hover state
- **Accessibility:** role="button", aria-label="Menu"
```

**Detailed** — everything above plus dimensions, computed styles, and component chain.

## Modes

- **Element** — click any element to annotate it with a CSS selector, component info, and a comment
- **Text** — select text within an element to capture the selection with surrounding context
- **Multi-element** — click multiple elements to group them into a single annotation

## Features

- Freeze page animations while annotating
- Annotations persist in localStorage across sessions
- Light/dark mode with auto-detection
- Svelte component detection (name, file, line, component chain)
- Keyboard shortcuts (Escape to deselect/close)

## License

[MIT](LICENSE)
