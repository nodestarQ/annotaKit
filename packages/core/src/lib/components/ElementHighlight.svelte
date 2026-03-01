<script lang="ts">
	import { annotakitState } from '../state.svelte.js';
	import { detectSvelteComponent } from '../core/svelte-detect.js';

	let rect = $derived.by(() => {
		const el = annotakitState.hoveredElement;
		if (!el) return null;
		return el.getBoundingClientRect();
	});

	let label = $derived.by(() => {
		const el = annotakitState.hoveredElement;
		if (!el) return '';
		const tag = el.tagName.toLowerCase();
		const classes = Array.from(el.classList)
			.filter((c) => !c.startsWith('svelte-') && !c.startsWith('s-'))
			.slice(0, 3)
			.map((c) => `.${c}`)
			.join('');
		const svelte = detectSvelteComponent(el);
		const componentLabel = svelte ? ` <${svelte.name}>` : '';
		return `${tag}${classes}${componentLabel}`;
	});
</script>

{#if rect}
	<div
		data-annotakit="highlight"
		class="pointer-events-none fixed z-[99998]"
		style="
			top: {rect.top}px;
			left: {rect.left}px;
			width: {rect.width}px;
			height: {rect.height}px;
		"
	>
		<!-- Highlight rectangle -->
		<div class="absolute inset-0 rounded-sm border-2 border-annotakit-highlight-border bg-annotakit-highlight"></div>

		<!-- Info label -->
		{#if label}
			<div
				class="absolute bottom-full left-0 mb-1 max-w-72 truncate rounded bg-annotakit-primary px-1.5 py-0.5 font-mono text-xs text-white shadow-sm"
			>
				{label}
			</div>
		{/if}
	</div>
{/if}
