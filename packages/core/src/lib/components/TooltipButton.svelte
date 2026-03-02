<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { Snippet } from 'svelte';

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
			class="pointer-events-none absolute bottom-full left-1/2 z-[100000] mb-2 -translate-x-1/2 whitespace-nowrap rounded border-2 border-annotakit-text/80 bg-annotakit-surface px-2 py-1 text-xs text-annotakit-text shadow-lg dark:border-annotakit-text-dark/30 dark:bg-annotakit-surface-dark dark:text-annotakit-text-dark"
		>
			{label}
		</div>
	{/if}
</div>
