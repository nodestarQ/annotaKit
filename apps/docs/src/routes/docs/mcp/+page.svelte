<script>
	import { pm, managers } from '$lib/pm.svelte';
</script>

<svelte:head>
	<title>MCP Integration - annotaKit docs</title>
</svelte:head>

<h1>MCP Integration</h1>
<p class="lead">Connect annotaKit to AI agents via the Model Context Protocol.</p>

<p>
	The <code>@annotakit/mcp</code> package runs an MCP server that lets AI agents (Claude Desktop,
	Claude Code, etc.) receive and respond to your browser annotations in real time.
</p>

<h2>How it works</h2>

<ol>
	<li>You annotate UI elements in the browser using annotaKit</li>
	<li>The browser bridge syncs annotations to the MCP server over HTTP</li>
	<li>AI agents connect to the MCP server and read your annotations</li>
	<li>Agents can acknowledge, reply to, resolve, or dismiss annotations</li>
</ol>

<h2>Install</h2>

<div class="not-prose">
	<div class="flex gap-0">
		{#each managers as mgr, i}
			<button
				onclick={() => (pm.active = i)}
				class="px-3 py-1 text-xs rounded-t transition-colors {pm.active === i
					? 'bg-surface-raised text-text border border-border border-b-transparent'
					: 'text-text-muted hover:text-text'}"
			>
				{mgr.name}
			</button>
		{/each}
	</div>
	<pre class="rounded-lg rounded-tl-none bg-surface-raised border border-border font-mono text-sm text-text px-4 py-2.5 m-0"><code>{pm.installMcp}</code></pre>
</div>

<h2>Start the server</h2>

<pre><code>npx @annotakit/mcp</code></pre>

<p>
	This starts an HTTP server on port 4156 (for the browser bridge) and an MCP server on stdio
	(for AI agents). Use <code>--port &lt;number&gt;</code> to change the HTTP port.
</p>

<h2>Wire up the bridge</h2>

<p>In your root layout, import the bridge and sync annotations:</p>

<pre><code>&lt;script&gt;
  import &#123; Annotakit, annotakitState &#125; from 'annotakit';
  import &#123; createMcpBridge &#125; from '@annotakit/mcp/bridge';
  import &#123; browser &#125; from '$app/environment';
  import &#123; onDestroy &#125; from 'svelte';

  const mcpBridge = browser ? createMcpBridge() : null;

  $effect(() =&gt; &#123;
    if (mcpBridge) &#123;
      mcpBridge.sync(annotakitState.annotations, window.location.href, document.title);
    &#125;
  &#125;);

  onDestroy(() =&gt; mcpBridge?.disconnect());
&lt;/script&gt;

&lt;Annotakit mcpServerUrl="http://localhost:4156" /&gt;
&#123;@render children()&#125;</code></pre>

<p>
	The <code>mcpServerUrl</code> prop enables the status indicator in the settings panel.
	The bridge silently handles errors, so a missing MCP server never breaks your app.
</p>

<h2>Connect an AI agent</h2>

<h3>Claude Code</h3>

<p>Add to <code>.claude/settings.json</code>:</p>

<pre><code>&#123;
  "mcpServers": &#123;
    "annotakit": &#123;
      "command": "node",
      "args": ["/path/to/node_modules/@annotakit/mcp/dist/bin.js"]
    &#125;
  &#125;
&#125;</code></pre>

<h3>Claude Desktop</h3>

<p>Add to your MCP config:</p>

<pre><code>&#123;
  "mcpServers": &#123;
    "annotakit": &#123;
      "command": "node",
      "args": ["/path/to/node_modules/@annotakit/mcp/dist/bin.js"]
    &#125;
  &#125;
&#125;</code></pre>

<h2>Available tools</h2>

<p>The MCP server exposes 9 tools to AI agents:</p>

<div class="not-prose space-y-4">
	<div class="space-y-2">
		<h3 class="text-base font-semibold text-text"><code class="text-primary">annotakit_list_sessions</code></h3>
		<p class="text-text-muted text-sm">List all active browser sessions connected to annotaKit.</p>
	</div>

	<div class="space-y-2">
		<h3 class="text-base font-semibold text-text"><code class="text-primary">annotakit_get_session</code></h3>
		<p class="text-text-muted text-sm">Get details for a specific session including annotation status counts.</p>
	</div>

	<div class="space-y-2">
		<h3 class="text-base font-semibold text-text"><code class="text-primary">annotakit_get_annotations</code></h3>
		<p class="text-text-muted text-sm">Get annotations for a session. Filter by status and control detail level with the format parameter (compact, standard, detailed).</p>
	</div>

	<div class="space-y-2">
		<h3 class="text-base font-semibold text-text"><code class="text-primary">annotakit_get_pending</code></h3>
		<p class="text-text-muted text-sm">Get all pending annotations across all sessions.</p>
	</div>

	<div class="space-y-2">
		<h3 class="text-base font-semibold text-text"><code class="text-primary">annotakit_acknowledge</code></h3>
		<p class="text-text-muted text-sm">Mark an annotation as seen by the agent.</p>
	</div>

	<div class="space-y-2">
		<h3 class="text-base font-semibold text-text"><code class="text-primary">annotakit_resolve</code></h3>
		<p class="text-text-muted text-sm">Mark an annotation as addressed, with an optional summary.</p>
	</div>

	<div class="space-y-2">
		<h3 class="text-base font-semibold text-text"><code class="text-primary">annotakit_dismiss</code></h3>
		<p class="text-text-muted text-sm">Dismiss an annotation with a reason.</p>
	</div>

	<div class="space-y-2">
		<h3 class="text-base font-semibold text-text"><code class="text-primary">annotakit_reply</code></h3>
		<p class="text-text-muted text-sm">Add an agent reply to an annotation thread.</p>
	</div>

	<div class="space-y-2">
		<h3 class="text-base font-semibold text-text"><code class="text-primary">annotakit_watch</code></h3>
		<p class="text-text-muted text-sm">Long-poll until new annotations arrive or timeout is reached. Useful for agents that want to wait for user input.</p>
	</div>
</div>

<h2>Bridge API</h2>

<pre><code>import &#123; createMcpBridge &#125; from '@annotakit/mcp/bridge';

const bridge = createMcpBridge(&#123;
  serverUrl: 'http://localhost:4156', // default
  sessionId: 'custom-id',            // auto-generated if omitted
&#125;);

bridge.sync(annotations, url, title); // send annotations to MCP server
bridge.disconnect();                   // notify server on unmount
bridge.sessionId;                      // read the session ID</code></pre>

<h2>Testing</h2>

<p>Use the MCP Inspector to test tools interactively:</p>

<pre><code>npx @modelcontextprotocol/inspector node node_modules/@annotakit/mcp/dist/bin.js</code></pre>
