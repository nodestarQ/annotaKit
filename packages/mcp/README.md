# @annotakit/mcp

MCP (Model Context Protocol) server for annotaKit. Exposes browser annotations to AI agents like Claude Desktop and Claude Code in real time.

## How it works

```
Browser (annotaKit component)
  -> HTTP POST /api/sessions/:id/sync
  -> In-memory store (sessions + annotations with lifecycle status)
  -> MCP tools (9 tools exposed to AI agents)
  -> AI agent (Claude Desktop, Claude Code, etc.)
```

The browser bridge sends annotations to an HTTP server. The MCP server shares the same in-memory store and exposes the data to AI agents via stdio transport.

## Setup

### 1. Install

```bash
pnpm add @annotakit/mcp
```

### 2. Start the MCP server

```bash
npx @annotakit/mcp
# or
node node_modules/@annotakit/mcp/dist/bin.js
```

This starts:
- HTTP server on port 4156 (for the browser bridge)
- MCP server on stdio (for AI agents)

Use `--port <number>` to change the HTTP port.

### 3. Wire up the browser bridge

In your Svelte layout (e.g. `+layout.svelte`):

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

<Annotakit />
```

The bridge silently handles errors, so a missing MCP server never breaks your app.

### 4. Connect an AI agent

**Claude Code** - add to `.claude/settings.json`:

```json
{
  "mcpServers": {
    "annotakit": {
      "command": "node",
      "args": ["/path/to/node_modules/@annotakit/mcp/dist/bin.js"]
    }
  }
}
```

**Claude Desktop** - add to your MCP config:

```json
{
  "mcpServers": {
    "annotakit": {
      "command": "node",
      "args": ["/path/to/node_modules/@annotakit/mcp/dist/bin.js"]
    }
  }
}
```

## MCP Tools

| Tool | Description |
|------|-------------|
| `annotakit_list_sessions` | List active browser sessions |
| `annotakit_get_session` | Get session details + annotation summary |
| `annotakit_get_annotations` | Get annotations, filter by status, control detail level |
| `annotakit_get_pending` | Get all pending annotations across sessions |
| `annotakit_acknowledge` | Mark annotation as seen |
| `annotakit_resolve` | Mark as addressed with optional summary |
| `annotakit_dismiss` | Reject with reason |
| `annotakit_reply` | Add agent response to annotation thread |
| `annotakit_watch` | Long-poll until new annotations arrive |

## Bridge API

```typescript
import { createMcpBridge } from '@annotakit/mcp/bridge'

const bridge = createMcpBridge({
  serverUrl: 'http://localhost:4156', // default
  sessionId: 'custom-id',            // auto-generated if omitted
})

bridge.sync(annotations, url, title) // send annotations to MCP server
bridge.disconnect()                   // notify server on unmount
bridge.sessionId                      // read the session ID
```

## HTTP API

```
POST   /api/sessions/:sessionId/sync   - Receive annotations from browser
DELETE /api/sessions/:sessionId         - Browser tab closing
GET    /api/events?sessionId=           - SSE stream of annotation events
GET    /api/health                      - Health check
```

## Testing

```bash
# Start the server
node packages/mcp/dist/bin.js

# Health check
curl http://localhost:4156/api/health

# Use the MCP Inspector
npx @modelcontextprotocol/inspector node packages/mcp/dist/bin.js
```
