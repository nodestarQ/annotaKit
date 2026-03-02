<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { Snippet } from 'svelte';
	import { annotakitState } from '../state.svelte.js';

	interface Props {
		label: string;
		class?: string;
		onclick?: (e: MouseEvent) => void;
		disabled?: boolean;
		children: Snippet;
	}

	let { label, class: className = '', onclick, disabled = false, children }: Props = $props();

	let show = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;
	const tooltipId = `annotakit-tip-${Math.random().toString(36).slice(2, 8)}`;

	let tooltipClasses = $derived(
		annotakitState.position.startsWith('top') ? 'top-full mt-2' : 'bottom-full mb-2'
	);

	function open() {
		timer = setTimeout(() => (show = true), 300);
	}

	function close() {
		clearTimeout(timer);
		show = false;
	}

	onDestroy(() => clearTimeout(timer));
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="relative inline-flex" onmouseenter={open} onmouseleave={close}>
	<button
		class="rounded p-1.5 transition-all duration-300 ease-out {className}"
		{onclick}
		{disabled}
		onfocus={open}
		onblur={close}
		aria-describedby={show ? tooltipId : undefined}
	>
		{@render children()}
	</button>
	{#if show}
		<div
			id={tooltipId}
			role="tooltip"
			class="pointer-events-none absolute {tooltipClasses} left-1/2 z-[100000] -translate-x-1/2 whitespace-nowrap rounded border-2 border-annotakit-stroke bg-annotakit-surface px-2 py-1 text-xs text-annotakit-text shadow-lg"
		>
			{label}
		</div>
	{/if}
</div>
