<script lang="ts">
	import { Tooltip } from 'bits-ui';
	import type { Snippet } from 'svelte';

	interface Props {
		label: string;
		class?: string;
		onclick?: (e: MouseEvent) => void;
		disabled?: boolean;
		children: Snippet;
	}

	let { label, class: className = '', onclick, disabled = false, children }: Props = $props();
</script>

<Tooltip.Root delayDuration={300}>
	<Tooltip.Trigger>
		{#snippet child({ props })}
			<button
				{...props}
				class="rounded p-1.5 transition-all duration-300 ease-out {className}"
				{onclick}
				{disabled}
			>
				{@render children()}
			</button>
		{/snippet}
	</Tooltip.Trigger>
	<Tooltip.Content
		class="z-[100000] rounded border-2 border-annotakit-text/80 bg-annotakit-surface px-2 py-1 text-xs text-annotakit-text shadow-lg dark:border-annotakit-text-dark/30 dark:bg-annotakit-surface-dark dark:text-annotakit-text-dark"
		sideOffset={8}
	>
		{label}
	</Tooltip.Content>
</Tooltip.Root>
