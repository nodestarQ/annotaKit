<script>
	import { pm, managers } from '$lib/pm.svelte';
</script>

<svelte:head>
	<title>Installation - annotaKit docs</title>
</svelte:head>

<h1>Installation</h1>
<p class="lead">Add annotaKit to your SvelteKit project in under a minute.</p>

<h2>Install the package</h2>

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
	<pre class="rounded-lg rounded-tl-none bg-surface-raised border border-border font-mono text-sm text-text px-4 py-2.5 m-0"><code>{pm.command}</code></pre>
</div>

<p>Requires <code>svelte ^5.35.0</code> as a peer dependency.</p>

<h2>Add to your layout</h2>

<p>
	Import the component and stylesheet in your root layout:
</p>

<pre><code>&lt;!-- src/routes/+layout.svelte --&gt;
&lt;script&gt;
  import &#123; Annotakit &#125; from 'annotakit';
  import 'annotakit/styles';
&lt;/script&gt;

&lt;Annotakit /&gt;
&#123;@render children()&#125;</code></pre>

<p>That's it. A floating toolbar appears in the corner of your app.</p>

<h2>Props</h2>

<div class="not-prose space-y-6">
	<div class="space-y-2">
		<h3 class="text-base font-semibold text-text"><code class="text-primary">position</code></h3>
		<p class="text-text-muted text-sm">Toolbar position on screen.</p>
		<p class="text-text-muted text-sm"><strong class="text-text">Type:</strong> <code>'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'</code></p>
		<p class="text-text-muted text-sm"><strong class="text-text">Default:</strong> <code>'bottom-right'</code></p>
	</div>

	<div class="space-y-2">
		<h3 class="text-base font-semibold text-text"><code class="text-primary">outputFormat</code></h3>
		<p class="text-text-muted text-sm">Default markdown output format.</p>
		<p class="text-text-muted text-sm"><strong class="text-text">Type:</strong> <code>'compact' | 'standard' | 'detailed'</code></p>
		<p class="text-text-muted text-sm"><strong class="text-text">Default:</strong> <code>'standard'</code></p>
	</div>

	<div class="space-y-2">
		<h3 class="text-base font-semibold text-text"><code class="text-primary">theme</code></h3>
		<p class="text-text-muted text-sm">Color theme. <code>auto</code> follows system preference.</p>
		<p class="text-text-muted text-sm"><strong class="text-text">Type:</strong> <code>'light' | 'dark' | 'auto'</code></p>
		<p class="text-text-muted text-sm"><strong class="text-text">Default:</strong> <code>'auto'</code></p>
	</div>

	<div class="space-y-2">
		<h3 class="text-base font-semibold text-text"><code class="text-primary">storageKey</code></h3>
		<p class="text-text-muted text-sm">localStorage key for persisted annotations.</p>
		<p class="text-text-muted text-sm"><strong class="text-text">Type:</strong> <code>string</code></p>
		<p class="text-text-muted text-sm"><strong class="text-text">Default:</strong> <code>'annotakit'</code></p>
	</div>

	<div class="space-y-2">
		<h3 class="text-base font-semibold text-text"><code class="text-primary">retentionDays</code></h3>
		<p class="text-text-muted text-sm">Days to keep annotations in storage.</p>
		<p class="text-text-muted text-sm"><strong class="text-text">Type:</strong> <code>number</code></p>
		<p class="text-text-muted text-sm"><strong class="text-text">Default:</strong> <code>7</code></p>
	</div>

	<div class="space-y-2">
		<h3 class="text-base font-semibold text-text"><code class="text-primary">enabled</code></h3>
		<p class="text-text-muted text-sm">Show/hide the toolbar.</p>
		<p class="text-text-muted text-sm"><strong class="text-text">Type:</strong> <code>boolean</code></p>
		<p class="text-text-muted text-sm"><strong class="text-text">Default:</strong> <code>true</code></p>
	</div>

	<div class="space-y-2">
		<h3 class="text-base font-semibold text-text"><code class="text-primary">highlightColor</code></h3>
		<p class="text-text-muted text-sm">Annotation highlight color.</p>
		<p class="text-text-muted text-sm"><strong class="text-text">Type:</strong> <code>'green' | 'blue' | 'purple' | 'red' | 'orange' | 'yellow'</code></p>
		<p class="text-text-muted text-sm"><strong class="text-text">Default:</strong> <code>'green'</code></p>
	</div>

	<div class="space-y-2">
		<h3 class="text-base font-semibold text-text"><code class="text-primary">minimized</code></h3>
		<p class="text-text-muted text-sm">Start the toolbar collapsed.</p>
		<p class="text-text-muted text-sm"><strong class="text-text">Type:</strong> <code>boolean</code></p>
		<p class="text-text-muted text-sm"><strong class="text-text">Default:</strong> <code>false</code></p>
	</div>

	<div class="space-y-2">
		<h3 class="text-base font-semibold text-text"><code class="text-primary">mcpServerUrl</code></h3>
		<p class="text-text-muted text-sm">MCP server URL for the status indicator. Enables health polling when set.</p>
		<p class="text-text-muted text-sm"><strong class="text-text">Type:</strong> <code>string</code></p>
		<p class="text-text-muted text-sm"><strong class="text-text">Default:</strong> none</p>
	</div>

	<div class="space-y-2">
		<h3 class="text-base font-semibold text-text"><code class="text-primary">onOutput</code></h3>
		<p class="text-text-muted text-sm">Callback when markdown is generated.</p>
		<p class="text-text-muted text-sm"><strong class="text-text">Type:</strong> <code>(markdown: string) =&gt; void</code></p>
		<p class="text-text-muted text-sm"><strong class="text-text">Default:</strong> none</p>
	</div>
</div>

