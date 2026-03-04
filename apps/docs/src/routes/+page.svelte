<script>
	import { pm, managers } from '$lib/pm.svelte';

	let copied = $state(false);

	async function copyCommand() {
		await navigator.clipboard.writeText(pm.command);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<svelte:head>
	<title>annotaKit - Agent-ready UI annotations for SvelteKit</title>
</svelte:head>

<h1 class="not-prose text-3xl md:text-4xl font-bold leading-tight text-text mb-8">Show your AI<br />what to fix!</h1>

<div class="mt-8 mb-8">
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
	<button
		onclick={copyCommand}
		class="flex items-center gap-3 px-4 py-2.5 rounded-lg rounded-tl-none bg-surface-raised border border-border font-mono text-sm text-text-muted hover:border-primary/50 transition-colors cursor-pointer w-full"
	>
		<span>$ {pm.command}</span>
		<span class="ml-auto text-text-muted/60 text-xs">{copied ? 'Copied!' : 'Copy'}</span>
	</button>
</div>

<p>
	annotaKit is a Svelte component that lets you annotate UI elements and export structured markdown.
	Click elements, add comments, and copy the output straight into Claude, Cursor, or any AI agent.
</p>

<div
	class="demo-container not-prose my-10 relative overflow-hidden rounded-xl border border-border bg-surface aspect-video w-full select-none"
	aria-hidden="true"
>
	<div class="demo-scene">
		<!-- Mock nav -->
		<div class="demo-nav">
			<div class="demo-logo"></div>
			<div class="demo-url-bar">
				<span class="demo-url-text">localhost:69420</span>
			</div>
			<div class="demo-wm-controls">
				<!-- Minimize -->
				<svg class="demo-wm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
				<!-- Maximize -->
				<svg class="demo-wm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
				<!-- Close -->
				<svg class="demo-wm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
			</div>
		</div>
		<!-- Mock content -->
		<div class="demo-bar demo-breadcrumb"></div>
		<div class="demo-heading">I luv open source software</div>
		<div class="demo-bar demo-subtitle"></div>
		<div class="demo-bar demo-line-1"></div>
		<div class="demo-bar demo-line-2"></div>
		<div class="demo-bar demo-line-3"></div>
		<!-- Target button -->
		<div class="demo-btn">Submit</div>
		<div class="demo-btn-ghost">Learn more</div>
		<!-- Text selection highlight -->
		<div class="demo-select-hl"></div>
		<!-- Divider -->
		<div class="demo-divider"></div>
		<!-- Card placeholders -->
		<div class="demo-boxes">
			<div class="demo-box"></div>
			<div class="demo-box"></div>
			<div class="demo-box"></div>
		</div>
		<!-- Footer -->
		<div class="demo-footer">
			<div class="demo-bar demo-footer-bar" style="width: 40px"></div>
			<div class="demo-bar demo-footer-bar" style="width: 30px"></div>
			<div class="demo-bar demo-footer-bar" style="width: 35px"></div>
		</div>
		<!-- Minimized toggle (OCB icon) -->
		<div class="demo-toggle">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice"><defs><pattern id="ocb-demo" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="translate(0 0) scale(40) rotate(0)" shape-rendering="crispEdges"><rect width="1" height="1" x="4" y="2" fill="currentColor"/><rect width="1" height="1" x="5" y="2" fill="currentColor"/><rect width="1" height="1" x="6" y="2" fill="currentColor"/><rect width="1" height="1" x="7" y="2" fill="currentColor"/><rect width="1" height="1" x="8" y="2" fill="currentColor"/><rect width="1" height="1" x="9" y="2" fill="currentColor"/><rect width="1" height="1" x="10" y="2" fill="currentColor"/><rect width="1" height="1" x="11" y="2" fill="currentColor"/><rect width="1" height="1" x="12" y="2" fill="currentColor"/><rect width="1" height="1" x="13" y="2" fill="currentColor"/><rect width="1" height="1" x="14" y="2" fill="currentColor"/><rect width="1" height="1" x="15" y="2" fill="currentColor"/><rect width="1" height="1" x="4" y="3" fill="currentColor"/><rect width="1" height="1" x="5" y="3" fill="currentColor"/><rect width="1" height="1" x="6" y="3" fill="currentColor"/><rect width="1" height="1" x="7" y="3" fill="currentColor"/><rect width="1" height="1" x="8" y="3" fill="currentColor"/><rect width="1" height="1" x="9" y="3" fill="currentColor"/><rect width="1" height="1" x="10" y="3" fill="currentColor"/><rect width="1" height="1" x="11" y="3" fill="currentColor"/><rect width="1" height="1" x="12" y="3" fill="currentColor"/><rect width="1" height="1" x="13" y="3" fill="currentColor"/><rect width="1" height="1" x="14" y="3" fill="currentColor"/><rect width="1" height="1" x="15" y="3" fill="currentColor"/><rect width="1" height="1" x="4" y="4" fill="currentColor"/><rect width="1" height="1" x="5" y="4" fill="currentColor"/><rect width="1" height="1" x="6" y="4" fill="currentColor"/><rect width="1" height="1" x="7" y="4" fill="currentColor"/><rect width="1" height="1" x="8" y="4" fill="currentColor"/><rect width="1" height="1" x="9" y="4" fill="currentColor"/><rect width="1" height="1" x="10" y="4" fill="currentColor"/><rect width="1" height="1" x="11" y="4" fill="currentColor"/><rect width="1" height="1" x="12" y="4" fill="currentColor"/><rect width="1" height="1" x="13" y="4" fill="currentColor"/><rect width="1" height="1" x="14" y="4" fill="currentColor"/><rect width="1" height="1" x="15" y="4" fill="currentColor"/><rect width="1" height="1" x="3" y="5" fill="currentColor"/><rect width="1" height="1" x="4" y="5" fill="currentColor"/><rect width="1" height="1" x="5" y="5" fill="currentColor"/><rect width="1" height="1" x="6" y="5" fill="currentColor"/><rect width="1" height="1" x="7" y="5" fill="currentColor"/><rect width="1" height="1" x="8" y="5" fill="currentColor"/><rect width="1" height="1" x="9" y="5" fill="currentColor"/><rect width="1" height="1" x="10" y="5" fill="currentColor"/><rect width="1" height="1" x="11" y="5" fill="currentColor"/><rect width="1" height="1" x="12" y="5" fill="currentColor"/><rect width="1" height="1" x="13" y="5" fill="currentColor"/><rect width="1" height="1" x="14" y="5" fill="currentColor"/><rect width="1" height="1" x="15" y="5" fill="currentColor"/><rect width="1" height="1" x="16" y="5" fill="currentColor"/><rect width="1" height="1" x="3" y="6" fill="currentColor"/><rect width="1" height="1" x="4" y="6" fill="currentColor"/><rect width="1" height="1" x="5" y="6" fill="currentColor"/><rect width="1" height="1" x="6" y="6" fill="currentColor"/><rect width="1" height="1" x="7" y="6" fill="currentColor"/><rect width="1" height="1" x="8" y="6" fill="currentColor"/><rect width="1" height="1" x="9" y="6" fill="currentColor"/><rect width="1" height="1" x="10" y="6" fill="currentColor"/><rect width="1" height="1" x="11" y="6" fill="currentColor"/><rect width="1" height="1" x="12" y="6" fill="currentColor"/><rect width="1" height="1" x="13" y="6" fill="currentColor"/><rect width="1" height="1" x="14" y="6" fill="currentColor"/><rect width="1" height="1" x="15" y="6" fill="currentColor"/><rect width="1" height="1" x="16" y="6" fill="currentColor"/><rect width="1" height="1" x="3" y="7" fill="currentColor"/><rect width="1" height="1" x="4" y="7" fill="currentColor"/><rect width="1" height="1" x="15" y="7" fill="currentColor"/><rect width="1" height="1" x="16" y="7" fill="currentColor"/><rect width="1" height="1" x="3" y="8" fill="currentColor"/><rect width="1" height="1" x="4" y="8" fill="currentColor"/><rect width="1" height="1" x="15" y="8" fill="currentColor"/><rect width="1" height="1" x="16" y="8" fill="currentColor"/><rect width="1" height="1" x="3" y="9" fill="currentColor"/><rect width="1" height="1" x="4" y="9" fill="currentColor"/><rect width="1" height="1" x="6" y="9" fill="currentColor"/><rect width="1" height="1" x="7" y="9" fill="currentColor"/><rect width="1" height="1" x="8" y="9" fill="currentColor"/><rect width="1" height="1" x="11" y="9" fill="currentColor"/><rect width="1" height="1" x="12" y="9" fill="currentColor"/><rect width="1" height="1" x="13" y="9" fill="currentColor"/><rect width="1" height="1" x="15" y="9" fill="currentColor"/><rect width="1" height="1" x="16" y="9" fill="currentColor"/><rect width="1" height="1" x="2" y="10" fill="currentColor"/><rect width="1" height="1" x="3" y="10" fill="currentColor"/><rect width="1" height="1" x="4" y="10" fill="currentColor"/><rect width="1" height="1" x="6" y="10" fill="currentColor"/><rect width="1" height="1" x="7" y="10" fill="currentColor"/><rect width="1" height="1" x="8" y="10" fill="currentColor"/><rect width="1" height="1" x="11" y="10" fill="currentColor"/><rect width="1" height="1" x="12" y="10" fill="currentColor"/><rect width="1" height="1" x="13" y="10" fill="currentColor"/><rect width="1" height="1" x="15" y="10" fill="currentColor"/><rect width="1" height="1" x="16" y="10" fill="currentColor"/><rect width="1" height="1" x="17" y="10" fill="currentColor"/><rect width="1" height="1" x="2" y="11" fill="currentColor"/><rect width="1" height="1" x="4" y="11" fill="currentColor"/><rect width="1" height="1" x="6" y="11" fill="currentColor"/><rect width="1" height="1" x="7" y="11" fill="currentColor"/><rect width="1" height="1" x="8" y="11" fill="currentColor"/><rect width="1" height="1" x="11" y="11" fill="currentColor"/><rect width="1" height="1" x="12" y="11" fill="currentColor"/><rect width="1" height="1" x="13" y="11" fill="currentColor"/><rect width="1" height="1" x="15" y="11" fill="currentColor"/><rect width="1" height="1" x="17" y="11" fill="currentColor"/><rect width="1" height="1" x="2" y="12" fill="currentColor"/><rect width="1" height="1" x="4" y="12" fill="currentColor"/><rect width="1" height="1" x="15" y="12" fill="currentColor"/><rect width="1" height="1" x="17" y="12" fill="currentColor"/><rect width="1" height="1" x="2" y="13" fill="currentColor"/><rect width="1" height="1" x="3" y="13" fill="currentColor"/><rect width="1" height="1" x="4" y="13" fill="currentColor"/><rect width="1" height="1" x="7" y="13" fill="currentColor"/><rect width="1" height="1" x="8" y="13" fill="currentColor"/><rect width="1" height="1" x="9" y="13" fill="currentColor"/><rect width="1" height="1" x="10" y="13" fill="currentColor"/><rect width="1" height="1" x="11" y="13" fill="currentColor"/><rect width="1" height="1" x="12" y="13" fill="currentColor"/><rect width="1" height="1" x="15" y="13" fill="currentColor"/><rect width="1" height="1" x="16" y="13" fill="currentColor"/><rect width="1" height="1" x="17" y="13" fill="currentColor"/><rect width="1" height="1" x="4" y="14" fill="currentColor"/><rect width="1" height="1" x="7" y="14" fill="currentColor"/><rect width="1" height="1" x="8" y="14" fill="currentColor"/><rect width="1" height="1" x="9" y="14" fill="currentColor"/><rect width="1" height="1" x="10" y="14" fill="currentColor"/><rect width="1" height="1" x="11" y="14" fill="currentColor"/><rect width="1" height="1" x="12" y="14" fill="currentColor"/><rect width="1" height="1" x="15" y="14" fill="currentColor"/><rect width="1" height="1" x="4" y="15" fill="currentColor"/><rect width="1" height="1" x="7" y="15" fill="currentColor"/><rect width="1" height="1" x="8" y="15" fill="currentColor"/><rect width="1" height="1" x="9" y="15" fill="currentColor"/><rect width="1" height="1" x="10" y="15" fill="currentColor"/><rect width="1" height="1" x="11" y="15" fill="currentColor"/><rect width="1" height="1" x="12" y="15" fill="currentColor"/><rect width="1" height="1" x="15" y="15" fill="currentColor"/><rect width="1" height="1" x="4" y="16" fill="currentColor"/><rect width="1" height="1" x="15" y="16" fill="currentColor"/><rect width="1" height="1" x="4" y="17" fill="currentColor"/><rect width="1" height="1" x="5" y="17" fill="currentColor"/><rect width="1" height="1" x="6" y="17" fill="currentColor"/><rect width="1" height="1" x="7" y="17" fill="currentColor"/><rect width="1" height="1" x="8" y="17" fill="currentColor"/><rect width="1" height="1" x="9" y="17" fill="currentColor"/><rect width="1" height="1" x="10" y="17" fill="currentColor"/><rect width="1" height="1" x="11" y="17" fill="currentColor"/><rect width="1" height="1" x="12" y="17" fill="currentColor"/><rect width="1" height="1" x="13" y="17" fill="currentColor"/><rect width="1" height="1" x="14" y="17" fill="currentColor"/><rect width="1" height="1" x="15" y="17" fill="currentColor"/></pattern></defs><rect width="100%" height="100%" fill="url(#ocb-demo)"/></svg>
		</div>
		<!-- Expanded toolbar -->
		<div class="demo-toolbar">
			<!-- File/output -->
			<svg class="demo-tb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>
			</svg>
			<span class="demo-tb-sep"></span>
			<!-- Pause -->
			<svg class="demo-tb-icon" viewBox="0 0 24 24" fill="currentColor" stroke="none">
				<rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/>
			</svg>
			<!-- Eye -->
			<svg class="demo-tb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>
			</svg>
			<!-- Copy -->
			<svg class="demo-tb-icon demo-copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
			</svg>
			<!-- Trash -->
			<svg class="demo-tb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
			</svg>
			<!-- Gear -->
			<svg class="demo-tb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
			</svg>
			<span class="demo-tb-sep"></span>
			<!-- Chevron right (close) -->
			<svg class="demo-tb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="m9 18 6-6-6-6"/>
			</svg>
		</div>
		<!-- Cursor -->
		<svg class="demo-cursor" viewBox="0 0 24 24" width="20" height="20" fill="none">
			<path
				d="M6 3l12 9-5.5 1.2-2.8 5.8z"
				fill="white"
				stroke="black"
				stroke-width="1.5"
				stroke-linejoin="round"
			/>
		</svg>
		<!-- Pin 1 (on Submit button) -->
		<div class="demo-pin demo-pin1">1</div>
		<!-- Pin 2 (on heading) -->
		<div class="demo-pin demo-pin2">2</div>
		<!-- Annotation Card 1: BUTTON -->
		<div class="demo-card demo-card1">
			<div class="demo-card-header">
				<span class="demo-card-badge">1</span>
				<span class="demo-card-tag">BUTTON</span>
			</div>
			<div class="demo-card-body">
				<span class="demo-typed demo-typed1">change hover color to secondary</span>
			</div>
			<div class="demo-card-actions">
				<span class="demo-card-btn">Cancel</span>
				<span class="demo-card-btn demo-card-btn-fill demo-add1">Add</span>
			</div>
		</div>
		<!-- Annotation Card 2: TEXT -->
		<div class="demo-card demo-card2">
			<div class="demo-card-header">
				<span class="demo-card-badge">2</span>
				<span class="demo-card-tag">TEXT</span>
			</div>
			<div class="demo-card-body">
				<span class="demo-typed demo-typed2">fix spelling</span>
			</div>
			<div class="demo-card-actions">
				<span class="demo-card-btn">Cancel</span>
				<span class="demo-card-btn demo-card-btn-fill demo-add2">Add</span>
			</div>
		</div>
		<!-- Dark overlay -->
		<div class="demo-overlay"></div>
		<!-- Terminal window -->
		<div class="demo-terminal">
			<div class="demo-term-titlebar">
				<div class="demo-term-dots">
					<span class="demo-term-dot demo-term-dot-red"></span>
					<span class="demo-term-dot demo-term-dot-yellow"></span>
					<span class="demo-term-dot demo-term-dot-green"></span>
				</div>
				<span class="demo-term-title">vibecodoor project</span>
			</div>
			<div class="demo-term-body">
				<div class="demo-term-line demo-term-line1">$ chud model</div>
				<div class="demo-term-line demo-term-line2">How can I help you today?</div>
				<div class="demo-term-line demo-term-line3">1. BUTTON - change hover color to secondary
2. TEXT - fix spelling</div>
			</div>
		</div>
	</div>
</div>

<h2>How it works</h2>

<ol>
	<li><strong>Activate</strong>: click the <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" class="inline-block w-4 h-4 align-middle text-text" aria-label="annotakit icon"><defs><pattern id="ocb-inline" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="translate(0 0) scale(40) rotate(0)" shape-rendering="crispEdges"><rect width="1" height="1" x="4" y="2" fill="currentColor"/><rect width="1" height="1" x="5" y="2" fill="currentColor"/><rect width="1" height="1" x="6" y="2" fill="currentColor"/><rect width="1" height="1" x="7" y="2" fill="currentColor"/><rect width="1" height="1" x="8" y="2" fill="currentColor"/><rect width="1" height="1" x="9" y="2" fill="currentColor"/><rect width="1" height="1" x="10" y="2" fill="currentColor"/><rect width="1" height="1" x="11" y="2" fill="currentColor"/><rect width="1" height="1" x="12" y="2" fill="currentColor"/><rect width="1" height="1" x="13" y="2" fill="currentColor"/><rect width="1" height="1" x="14" y="2" fill="currentColor"/><rect width="1" height="1" x="15" y="2" fill="currentColor"/><rect width="1" height="1" x="4" y="3" fill="currentColor"/><rect width="1" height="1" x="5" y="3" fill="currentColor"/><rect width="1" height="1" x="6" y="3" fill="currentColor"/><rect width="1" height="1" x="7" y="3" fill="currentColor"/><rect width="1" height="1" x="8" y="3" fill="currentColor"/><rect width="1" height="1" x="9" y="3" fill="currentColor"/><rect width="1" height="1" x="10" y="3" fill="currentColor"/><rect width="1" height="1" x="11" y="3" fill="currentColor"/><rect width="1" height="1" x="12" y="3" fill="currentColor"/><rect width="1" height="1" x="13" y="3" fill="currentColor"/><rect width="1" height="1" x="14" y="3" fill="currentColor"/><rect width="1" height="1" x="15" y="3" fill="currentColor"/><rect width="1" height="1" x="4" y="4" fill="currentColor"/><rect width="1" height="1" x="5" y="4" fill="currentColor"/><rect width="1" height="1" x="6" y="4" fill="currentColor"/><rect width="1" height="1" x="7" y="4" fill="currentColor"/><rect width="1" height="1" x="8" y="4" fill="currentColor"/><rect width="1" height="1" x="9" y="4" fill="currentColor"/><rect width="1" height="1" x="10" y="4" fill="currentColor"/><rect width="1" height="1" x="11" y="4" fill="currentColor"/><rect width="1" height="1" x="12" y="4" fill="currentColor"/><rect width="1" height="1" x="13" y="4" fill="currentColor"/><rect width="1" height="1" x="14" y="4" fill="currentColor"/><rect width="1" height="1" x="15" y="4" fill="currentColor"/><rect width="1" height="1" x="3" y="5" fill="currentColor"/><rect width="1" height="1" x="4" y="5" fill="currentColor"/><rect width="1" height="1" x="5" y="5" fill="currentColor"/><rect width="1" height="1" x="6" y="5" fill="currentColor"/><rect width="1" height="1" x="7" y="5" fill="currentColor"/><rect width="1" height="1" x="8" y="5" fill="currentColor"/><rect width="1" height="1" x="9" y="5" fill="currentColor"/><rect width="1" height="1" x="10" y="5" fill="currentColor"/><rect width="1" height="1" x="11" y="5" fill="currentColor"/><rect width="1" height="1" x="12" y="5" fill="currentColor"/><rect width="1" height="1" x="13" y="5" fill="currentColor"/><rect width="1" height="1" x="14" y="5" fill="currentColor"/><rect width="1" height="1" x="15" y="5" fill="currentColor"/><rect width="1" height="1" x="16" y="5" fill="currentColor"/><rect width="1" height="1" x="3" y="6" fill="currentColor"/><rect width="1" height="1" x="4" y="6" fill="currentColor"/><rect width="1" height="1" x="5" y="6" fill="currentColor"/><rect width="1" height="1" x="6" y="6" fill="currentColor"/><rect width="1" height="1" x="7" y="6" fill="currentColor"/><rect width="1" height="1" x="8" y="6" fill="currentColor"/><rect width="1" height="1" x="9" y="6" fill="currentColor"/><rect width="1" height="1" x="10" y="6" fill="currentColor"/><rect width="1" height="1" x="11" y="6" fill="currentColor"/><rect width="1" height="1" x="12" y="6" fill="currentColor"/><rect width="1" height="1" x="13" y="6" fill="currentColor"/><rect width="1" height="1" x="14" y="6" fill="currentColor"/><rect width="1" height="1" x="15" y="6" fill="currentColor"/><rect width="1" height="1" x="16" y="6" fill="currentColor"/><rect width="1" height="1" x="3" y="7" fill="currentColor"/><rect width="1" height="1" x="4" y="7" fill="currentColor"/><rect width="1" height="1" x="15" y="7" fill="currentColor"/><rect width="1" height="1" x="16" y="7" fill="currentColor"/><rect width="1" height="1" x="3" y="8" fill="currentColor"/><rect width="1" height="1" x="4" y="8" fill="currentColor"/><rect width="1" height="1" x="15" y="8" fill="currentColor"/><rect width="1" height="1" x="16" y="8" fill="currentColor"/><rect width="1" height="1" x="3" y="9" fill="currentColor"/><rect width="1" height="1" x="4" y="9" fill="currentColor"/><rect width="1" height="1" x="6" y="9" fill="currentColor"/><rect width="1" height="1" x="7" y="9" fill="currentColor"/><rect width="1" height="1" x="8" y="9" fill="currentColor"/><rect width="1" height="1" x="11" y="9" fill="currentColor"/><rect width="1" height="1" x="12" y="9" fill="currentColor"/><rect width="1" height="1" x="13" y="9" fill="currentColor"/><rect width="1" height="1" x="15" y="9" fill="currentColor"/><rect width="1" height="1" x="16" y="9" fill="currentColor"/><rect width="1" height="1" x="2" y="10" fill="currentColor"/><rect width="1" height="1" x="3" y="10" fill="currentColor"/><rect width="1" height="1" x="4" y="10" fill="currentColor"/><rect width="1" height="1" x="6" y="10" fill="currentColor"/><rect width="1" height="1" x="7" y="10" fill="currentColor"/><rect width="1" height="1" x="8" y="10" fill="currentColor"/><rect width="1" height="1" x="11" y="10" fill="currentColor"/><rect width="1" height="1" x="12" y="10" fill="currentColor"/><rect width="1" height="1" x="13" y="10" fill="currentColor"/><rect width="1" height="1" x="15" y="10" fill="currentColor"/><rect width="1" height="1" x="16" y="10" fill="currentColor"/><rect width="1" height="1" x="17" y="10" fill="currentColor"/><rect width="1" height="1" x="2" y="11" fill="currentColor"/><rect width="1" height="1" x="4" y="11" fill="currentColor"/><rect width="1" height="1" x="6" y="11" fill="currentColor"/><rect width="1" height="1" x="7" y="11" fill="currentColor"/><rect width="1" height="1" x="8" y="11" fill="currentColor"/><rect width="1" height="1" x="11" y="11" fill="currentColor"/><rect width="1" height="1" x="12" y="11" fill="currentColor"/><rect width="1" height="1" x="13" y="11" fill="currentColor"/><rect width="1" height="1" x="15" y="11" fill="currentColor"/><rect width="1" height="1" x="17" y="11" fill="currentColor"/><rect width="1" height="1" x="2" y="12" fill="currentColor"/><rect width="1" height="1" x="4" y="12" fill="currentColor"/><rect width="1" height="1" x="15" y="12" fill="currentColor"/><rect width="1" height="1" x="17" y="12" fill="currentColor"/><rect width="1" height="1" x="2" y="13" fill="currentColor"/><rect width="1" height="1" x="3" y="13" fill="currentColor"/><rect width="1" height="1" x="4" y="13" fill="currentColor"/><rect width="1" height="1" x="7" y="13" fill="currentColor"/><rect width="1" height="1" x="8" y="13" fill="currentColor"/><rect width="1" height="1" x="9" y="13" fill="currentColor"/><rect width="1" height="1" x="10" y="13" fill="currentColor"/><rect width="1" height="1" x="11" y="13" fill="currentColor"/><rect width="1" height="1" x="12" y="13" fill="currentColor"/><rect width="1" height="1" x="15" y="13" fill="currentColor"/><rect width="1" height="1" x="16" y="13" fill="currentColor"/><rect width="1" height="1" x="17" y="13" fill="currentColor"/><rect width="1" height="1" x="4" y="14" fill="currentColor"/><rect width="1" height="1" x="7" y="14" fill="currentColor"/><rect width="1" height="1" x="8" y="14" fill="currentColor"/><rect width="1" height="1" x="9" y="14" fill="currentColor"/><rect width="1" height="1" x="10" y="14" fill="currentColor"/><rect width="1" height="1" x="11" y="14" fill="currentColor"/><rect width="1" height="1" x="12" y="14" fill="currentColor"/><rect width="1" height="1" x="15" y="14" fill="currentColor"/><rect width="1" height="1" x="4" y="15" fill="currentColor"/><rect width="1" height="1" x="7" y="15" fill="currentColor"/><rect width="1" height="1" x="8" y="15" fill="currentColor"/><rect width="1" height="1" x="9" y="15" fill="currentColor"/><rect width="1" height="1" x="10" y="15" fill="currentColor"/><rect width="1" height="1" x="11" y="15" fill="currentColor"/><rect width="1" height="1" x="12" y="15" fill="currentColor"/><rect width="1" height="1" x="15" y="15" fill="currentColor"/><rect width="1" height="1" x="4" y="16" fill="currentColor"/><rect width="1" height="1" x="15" y="16" fill="currentColor"/><rect width="1" height="1" x="4" y="17" fill="currentColor"/><rect width="1" height="1" x="5" y="17" fill="currentColor"/><rect width="1" height="1" x="6" y="17" fill="currentColor"/><rect width="1" height="1" x="7" y="17" fill="currentColor"/><rect width="1" height="1" x="8" y="17" fill="currentColor"/><rect width="1" height="1" x="9" y="17" fill="currentColor"/><rect width="1" height="1" x="10" y="17" fill="currentColor"/><rect width="1" height="1" x="11" y="17" fill="currentColor"/><rect width="1" height="1" x="12" y="17" fill="currentColor"/><rect width="1" height="1" x="13" y="17" fill="currentColor"/><rect width="1" height="1" x="14" y="17" fill="currentColor"/><rect width="1" height="1" x="15" y="17" fill="currentColor"/></pattern></defs><rect width="100%" height="100%" fill="url(#ocb-inline)"/></svg> icon in the corner to open the toolbar</li>
	<li><strong>Annotate</strong>: click any element to add an annotation</li>
	<li><strong>Comment</strong>: add notes describing the change you need</li>
	<li><strong>Export</strong>: copy structured markdown to your clipboard</li>
	<li><strong>Paste</strong>: paste into an AI agent of your choice</li>

</ol>

<p>
	<strong class="underline decoration-primary">Try it out on this page!</strong> Look for the annotaKit icon in the bottom-right corner.
</p>

<h2>What the output looks like</h2>

<p>
	annotaKit generates structured markdown with CSS selectors, Svelte component info, accessibility
	attributes, and computed styles, basically everything an AI agent needs to locate and understand an element in your codebase.
</p>

<h3>Compact format</h3>

<pre><code>1. `nav > button.menu` (HeaderNav) -Fix hover state</code></pre>

<h3>Standard format</h3>

<pre><code>### 1. BUTTON

- **Selector:** `nav > button.menu`
- **Component:** HeaderNav (`src/lib/HeaderNav.svelte`)
- **Comment:** Fix hover state
- **Accessibility:** role="button", aria-label="Menu"</code></pre>

<h3>Detailed format</h3>

<p>
	Includes everything from Standard plus element dimensions, computed styles, and the full Svelte
	component chain.
</p>

<h2>License</h2>

<p>
	annotaKit is free and open source under the <strong>MIT License</strong>. Feel free to contribute to <a href="https://github.com/nodestarQ/annotaKit" target="_blank" rel="noopener noreferrer">annotaKit</a> on GitHub.
</p>

<p>
	Inspired by <a href="https://github.com/benjitaylor/agentation" target="_blank" rel="noopener noreferrer">/agentation</a>, annotaKit is a clean room implementation built for Svelte.
</p>

<h2>Next steps</h2>

<p>
	Ready to get started? Head to <a href="/docs/installation">Installation</a> to add annotaKit to
	your project, or check out <a href="/docs/features">Features</a> for a full breakdown of what's
	available.
</p>

<style>
	/* ===== Demo animation - 22s loop, two annotation flows + copy & terminal ===== */
	/* All dimensions use em based on a cqw root font-size so everything
	   scales proportionally with the container width. 1em ≈ 10px at 700px. */

	.demo-container {
		container-type: inline-size;
	}

	.demo-scene {
		position: absolute;
		inset: 0;
		font-size: 1.43cqw;
		animation: demo-fade 22s ease infinite;
	}

	@keyframes demo-fade {
		0% { opacity: 0; }
		1.3% { opacity: 1; }
		95% { opacity: 1; }
		100% { opacity: 0; }
	}

	/* --- Mock webpage --- */

	.demo-nav {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 11%;
		background: var(--color-surface-raised);
		border-bottom: 1px solid var(--color-border);
		display: flex;
		align-items: center;
		padding: 0 5%;
	}

	.demo-logo {
		width: 1.8em;
		height: 1.8em;
		border-radius: 0.4em;
		background: var(--color-border);
	}

	.demo-url-bar {
		flex: 1;
		display: flex;
		align-items: center;
		height: 55%;
		margin: 0 1em;
		padding: 0 0.8em;
		border-radius: 0.4em;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
	}

	.demo-url-text {
		font-family: ui-monospace, monospace;
		font-size: 0.9em;
		color: var(--color-text-muted);
		white-space: nowrap;
	}

	.demo-wm-controls {
		display: flex;
		align-items: center;
		gap: 0.6em;
	}

	.demo-wm-icon {
		width: 1.1em;
		height: 1.1em;
		opacity: 0.35;
	}

	.demo-heading {
		position: absolute;
		top: 28%;
		left: 8%;
		font-size: 1.3em;
		font-weight: 600;
		color: var(--color-text);
		white-space: nowrap;
		line-height: 1.3;
	}

	.demo-bar {
		position: absolute;
		left: 8%;
		height: 2.5%;
		border-radius: 0.3em;
		background: var(--color-border);
	}

	.demo-breadcrumb { top: 17%; width: 18%; height: 1.8%; }
	.demo-subtitle { top: 35%; width: 45%; }

	.demo-line-1 { top: 42%; width: 68%; }
	.demo-line-2 { top: 46%; width: 55%; }
	.demo-line-3 { top: 50%; width: 40%; }

	/* --- Mock buttons --- */

	.demo-btn {
		position: absolute;
		top: 58%;
		left: 8%;
		padding: 1.2% 3.5%;
		border: 2px solid var(--color-border);
		border-radius: 0.6em;
		color: var(--color-text-muted);
		font-size: 1.1em;
		animation: demo-btn-hl 22s ease infinite;
	}

	.demo-btn-ghost {
		position: absolute;
		top: 58%;
		left: 23%;
		padding: 1.2% 3.5%;
		border-radius: 0.6em;
		color: var(--color-text-muted);
		font-size: 1.1em;
		opacity: 0.5;
	}

	/* --- Divider, cards, footer --- */

	.demo-divider {
		position: absolute;
		top: 73%;
		left: 8%;
		right: 8%;
		height: 1px;
		background: var(--color-border);
	}

	.demo-boxes {
		position: absolute;
		top: 78%;
		left: 8%;
		right: 8%;
		height: 14%;
		display: flex;
		gap: 3%;
	}

	.demo-box {
		flex: 1;
		border: 1px solid var(--color-border);
		border-radius: 0.6em;
		background: var(--color-surface-raised);
	}

	.demo-footer {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 6%;
		border-top: 1px solid var(--color-border);
		display: flex;
		align-items: center;
		gap: 1em;
		padding: 0 8%;
	}

	.demo-footer-bar {
		position: static;
		height: 40%;
		opacity: 0.5;
	}

	@keyframes demo-btn-hl {
		0%, 14% {
			border-color: var(--color-border);
			box-shadow: none;
			background: transparent;
		}
		14.6% {
			border-color: #4ade8099;
			box-shadow: 0 0 0 3px #4ade8033;
			background: #4ade8015;
		}
		17.2%, 100% {
			border-color: var(--color-border);
			box-shadow: none;
			background: transparent;
		}
	}

	/* --- Text selection highlight --- */

	.demo-select-hl {
		position: absolute;
		top: 27.5%;
		left: 8%;
		height: 4.5%;
		background: rgba(74, 222, 128, 0.25);
		border-radius: 0.2em;
		pointer-events: none;
		z-index: 3;
		animation: demo-select 22s ease infinite;
	}

	@keyframes demo-select {
		0%, 38.2% { width: 0; opacity: 0; }
		38.8% { width: 0; opacity: 1; }
		43.3% { width: 36%; opacity: 1; }
		53.5% { width: 36%; opacity: 1; }
		55.4% { width: 36%; opacity: 0; }
		100% { opacity: 0; }
	}

	/* --- Toggle button (minimized) --- */

	.demo-toggle {
		position: absolute;
		bottom: 8%;
		right: 4%;
		width: 2.8em;
		height: 2.8em;
		border-radius: 0.6em;
		border: 2px solid rgb(227 234 225 / 0.3);
		background: var(--color-surface);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-text);
		animation: demo-toggle-vis 22s ease infinite;
	}

	.demo-toggle svg {
		width: 1.6em;
		height: 1.6em;
	}

	@keyframes demo-toggle-vis {
		0%, 1.3% { opacity: 0; }
		1.9% { opacity: 1; }
		6.4% { opacity: 1; }
		7.6% { opacity: 0; }
		100% { opacity: 0; }
	}

	/* --- Expanded toolbar --- */

	.demo-toolbar {
		position: absolute;
		bottom: 8%;
		right: 3%;
		width: 21em;
		height: 3em;
		border-radius: 0.8em;
		border: 2px solid rgb(227 234 225 / 0.3);
		background: var(--color-surface);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 0.8em;
		color: var(--color-text);
		animation: demo-toolbar-vis 22s ease infinite;
	}

	@keyframes demo-toolbar-vis {
		0%, 7% { opacity: 0; transform: scaleX(0.3); transform-origin: right; }
		9.5% { opacity: 1; transform: scaleX(1); }
		60% { opacity: 1; transform: scaleX(1); }
		63% { opacity: 0; transform: scaleX(1); }
		100% { opacity: 0; transform: scaleX(1); }
	}

	.demo-tb-sep {
		width: 1px;
		height: 1.4em;
		background: rgb(227 234 225 / 0.15);
	}

	.demo-tb-icon {
		width: 1.4em;
		height: 1.4em;
		flex-shrink: 0;
		opacity: 0.4;
	}

	/* --- Copy icon flash --- */

	.demo-copy-icon {
		animation: demo-copy-flash 22s ease infinite;
	}

	@keyframes demo-copy-flash {
		0%, 56% { opacity: 0.4; }
		57%, 59% { opacity: 1; color: #4ade80; }
		60%, 100% { opacity: 0.4; }
	}

	/* --- Cursor --- */

	.demo-cursor {
		position: absolute;
		width: 2em;
		height: 2em;
		z-index: 25;
		pointer-events: none;
		filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
		animation:
			demo-cur-pos 22s cubic-bezier(0.4, 0, 0.2, 1) infinite,
			demo-cur-vis 22s ease infinite,
			demo-cur-click 22s ease infinite;
	}

	@keyframes demo-cur-pos {
		0%, 1.9%  { left: 50%; top: 45%; }
		5.7%      { left: 93%; top: 85%; }
		9.5%      { left: 93%; top: 85%; }
		14%       { left: 16%; top: 61%; }
		17.2%     { left: 16%; top: 61%; }
		19.7%     { left: 75%; top: 68%; }
		28.6%     { left: 75%; top: 68%; }
		30.5%     { left: 90%; top: 76%; }
		32.5%     { left: 90%; top: 76%; }
		37.5%     { left: 8%; top: 30%; }
		38.8%     { left: 8%; top: 30%; }
		43.3%     { left: 44%; top: 30%; }
		45.8%     { left: 75%; top: 68%; }
		50.3%     { left: 75%; top: 68%; }
		51.5%     { left: 90%; top: 76%; }
		53.5%     { left: 90%; top: 76%; }
		56%       { left: 82%; top: 85%; }
		58%       { left: 82%; top: 85%; }
		62%       { left: 82%; top: 85%; }
		65%       { left: 40%; top: 75%; }
		90%       { left: 40%; top: 75%; }
		93%       { left: 40%; top: 75%; }
		100%      { left: 40%; top: 75%; }
	}

	@keyframes demo-cur-vis {
		0% { opacity: 0; }
		1.9% { opacity: 1; }
		59% { opacity: 1; }
		62% { opacity: 0; }
		65% { opacity: 1; }
		90% { opacity: 1; }
		93% { opacity: 0; }
		100% { opacity: 0; }
	}

	@keyframes demo-cur-click {
		0%, 5.7%   { transform: scale(1); }
		6.4%       { transform: scale(0.65); }
		7%, 14%    { transform: scale(1); }
		14.6%      { transform: scale(0.65); }
		15.3%, 30.5% { transform: scale(1); }
		31.2%      { transform: scale(0.65); }
		31.8%, 38.2% { transform: scale(1); }
		38.8%      { transform: scale(0.85); }
		43.3%      { transform: scale(0.85); }
		43.9%, 51.5% { transform: scale(1); }
		52.2%      { transform: scale(0.65); }
		52.8%, 56% { transform: scale(1); }
		57%        { transform: scale(0.65); }
		58%, 100%  { transform: scale(1); }
	}

	/* --- Annotation pins --- */

	.demo-pin {
		position: absolute;
		width: 2.2em;
		height: 2.2em;
		border-radius: 0.5em;
		background: var(--color-primary);
		color: white;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 5;
		pointer-events: none;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
	}

	.demo-pin1 {
		top: 52%;
		left: 18%;
		animation: demo-pin1-pop 22s ease infinite;
	}

	.demo-pin2 {
		top: 24%;
		left: 38%;
		animation: demo-pin2-pop 22s ease infinite;
	}

	@keyframes demo-pin1-pop {
		0%, 31.8% { opacity: 0; transform: scale(0.3); }
		33.7% { opacity: 1; transform: scale(1.15); }
		35% { opacity: 1; transform: scale(1); }
		60% { opacity: 1; transform: scale(1); }
		63% { opacity: 0; transform: scale(0.8); }
		100% { opacity: 0; transform: scale(0.8); }
	}

	@keyframes demo-pin2-pop {
		0%, 52.8% { opacity: 0; transform: scale(0.3); }
		54.7% { opacity: 1; transform: scale(1.15); }
		56% { opacity: 1; transform: scale(1); }
		60% { opacity: 1; transform: scale(1); }
		63% { opacity: 0; transform: scale(0.8); }
		100% { opacity: 0; transform: scale(0.8); }
	}

	/* --- Annotation cards --- */

	.demo-card {
		position: absolute;
		bottom: 20%;
		right: 3%;
		width: 21em;
		background: var(--color-surface);
		border: 2px solid rgb(227 234 225 / 0.3);
		border-radius: 0.8em;
		z-index: 5;
		pointer-events: none;
		overflow: hidden;
	}

	.demo-card1 {
		animation: demo-card1-vis 22s ease infinite;
	}

	.demo-card2 {
		animation: demo-card2-vis 22s ease infinite;
	}

	@keyframes demo-card1-vis {
		0%, 17.2% { opacity: 0; transform: translateY(1em); }
		19.1% { opacity: 1; transform: translateY(0); }
		31.2% { opacity: 1; transform: translateY(0); }
		33.1% { opacity: 0; transform: translateY(0); }
		100% { opacity: 0; }
	}

	@keyframes demo-card2-vis {
		0%, 43.3% { opacity: 0; transform: translateY(1em); }
		45.2% { opacity: 1; transform: translateY(0); }
		54% { opacity: 1; transform: translateY(0); }
		57% { opacity: 0; transform: translateY(0); }
		100% { opacity: 0; }
	}

	.demo-card-header {
		display: flex;
		align-items: center;
		gap: 0.6em;
		padding: 0.6em 0.8em;
		border-bottom: 2px solid rgb(227 234 225 / 0.3);
	}

	.demo-card-badge {
		width: 1.8em;
		height: 1.8em;
		border-radius: 0.4em;
		background: var(--color-primary);
		color: white;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.demo-card-tag {
		font-family: ui-monospace, monospace;
		font-weight: 500;
		color: var(--color-text);
	}

	.demo-card-body {
		padding: 0.6em 0.8em;
		border-bottom: 2px solid rgb(227 234 225 / 0.3);
		min-height: 2.6em;
		font-family: ui-monospace, monospace;
		color: var(--color-text);
	}

	.demo-card-actions {
		display: flex;
		gap: 0.4em;
		padding: 0.6em 0.8em;
	}

	.demo-card-btn {
		flex: 1;
		text-align: center;
		padding: 0.3em 0.6em;
		border: 2px solid rgb(227 234 225 / 0.3);
		border-radius: 0.4em;
		font-size: 0.9em;
		font-weight: 500;
		color: var(--color-text-muted);
	}

	.demo-card-btn-fill {
		background: var(--color-text);
		color: var(--color-surface);
		border-color: var(--color-text);
	}

	/* Add button click flash */

	.demo-add1 {
		animation: demo-add1-flash 22s ease infinite;
	}

	.demo-add2 {
		animation: demo-add2-flash 22s ease infinite;
	}

	@keyframes demo-add1-flash {
		0%, 30.5% { background: var(--color-text); }
		31.2%, 31.8% { background: #4ade80; }
		32.5%, 100% { background: var(--color-text); }
	}

	@keyframes demo-add2-flash {
		0%, 51.5% { background: var(--color-text); }
		52.2%, 52.8% { background: #4ade80; }
		53.5%, 100% { background: var(--color-text); }
	}

	/* --- Typing effects --- */

	.demo-typed {
		display: inline-block;
		overflow: hidden;
		white-space: nowrap;
		max-width: 0;
		vertical-align: bottom;
		border-right: 2px solid transparent;
		padding-right: 2px;
	}

	.demo-typed1 {
		animation:
			demo-type1 22s steps(31, end) infinite,
			demo-caret 0.5s steps(1) infinite;
	}

	.demo-typed2 {
		animation:
			demo-type2 22s steps(12, end) infinite,
			demo-caret 0.5s steps(1) infinite;
	}

	@keyframes demo-type1 {
		0%, 19.1% { max-width: 0; }
		28.6%, 100% { max-width: 31ch; }
	}

	@keyframes demo-type2 {
		0%, 45.2% { max-width: 0; }
		50.3%, 100% { max-width: 12ch; }
	}

	@keyframes demo-caret {
		0%, 100% { border-right-color: transparent; }
		50% { border-right-color: var(--color-text-muted); }
	}

	/* --- Dark overlay --- */

	.demo-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 15;
		pointer-events: none;
		animation: demo-overlay-vis 22s ease infinite;
	}

	@keyframes demo-overlay-vis {
		0%, 59% { opacity: 0; }
		62% { opacity: 0.7; }
		93% { opacity: 0.7; }
		100% { opacity: 0; }
	}

	/* --- Terminal window --- */

	.demo-terminal {
		position: absolute;
		top: 15%;
		left: 10%;
		right: 10%;
		bottom: 15%;
		z-index: 20;
		background: #0d1117;
		border: 1px solid #30363d;
		border-radius: 0.8em;
		overflow: hidden;
		animation: demo-terminal-vis 22s ease infinite;
	}

	@keyframes demo-terminal-vis {
		0%, 61% { opacity: 0; transform: translateY(2em); }
		64% { opacity: 1; transform: translateY(0); }
		93% { opacity: 1; transform: translateY(0); }
		100% { opacity: 0; transform: translateY(0); }
	}

	.demo-term-titlebar {
		background: #161b22;
		padding: 0.6em 1em;
		display: flex;
		align-items: center;
		gap: 0.6em;
	}

	.demo-term-dots {
		display: flex;
		gap: 0.4em;
	}

	.demo-term-dot {
		width: 0.8em;
		height: 0.8em;
		border-radius: 50%;
	}

	.demo-term-dot-red { background: #ff5f57; }
	.demo-term-dot-yellow { background: #febc2e; }
	.demo-term-dot-green { background: #28c840; }

	.demo-term-title {
		font-family: ui-monospace, monospace;
		font-size: 0.85em;
		color: #8b949e;
	}

	.demo-term-body {
		padding: 1em;
		font-family: ui-monospace, monospace;
		color: #c9d1d9;
		white-space: pre-line;
		font-size: 0.95em;
		line-height: 1.8;
	}

	.demo-term-line {
		opacity: 0;
	}

	.demo-term-line1 {
		animation: demo-line1-vis 22s ease infinite;
	}

	.demo-term-line2 {
		animation: demo-line2-vis 22s ease infinite;
	}

	.demo-term-line3 {
		animation: demo-line3-vis 22s ease infinite;
	}

	@keyframes demo-line1-vis {
		0%, 66% { opacity: 0; }
		67% { opacity: 1; }
		93% { opacity: 1; }
		100% { opacity: 0; }
	}

	@keyframes demo-line2-vis {
		0%, 71% { opacity: 0; }
		72% { opacity: 1; }
		93% { opacity: 1; }
		100% { opacity: 0; }
	}

	@keyframes demo-line3-vis {
		0%, 76% { opacity: 0; }
		77% { opacity: 1; }
		93% { opacity: 1; }
		100% { opacity: 0; }
	}
</style>
