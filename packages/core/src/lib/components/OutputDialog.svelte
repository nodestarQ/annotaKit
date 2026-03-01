<script lang="ts">
	import { Dialog } from 'bits-ui';
	import { annotakitState } from '../state.svelte.js';
	import { generateMarkdown, copyToClipboard } from '../core/output.js';
	import type { OutputFormat } from '../types.js';

	interface Props {
		onOutput?: (markdown: string) => void;
	}

	let { onOutput }: Props = $props();

	let copied = $state(false);

	let markdown = $derived(
		generateMarkdown(annotakitState.annotations, annotakitState.outputFormat)
	);

	const formats: { value: OutputFormat; label: string }[] = [
		{ value: 'compact', label: 'Compact' },
		{ value: 'standard', label: 'Standard' },
		{ value: 'detailed', label: 'Detailed' }
	];

	async function handleCopy() {
		const success = await copyToClipboard(markdown);
		if (success) {
			copied = true;
			onOutput?.(markdown);
			setTimeout(() => (copied = false), 2000);
		}
	}

	function handleOpenChange(open: boolean) {
		annotakitState.showOutputDialog = open;
	}
</script>

<Dialog.Root open={annotakitState.showOutputDialog} onOpenChange={handleOpenChange}>
	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 z-[99999] bg-black/40 backdrop-blur-sm" />
		<Dialog.Content
			data-annotakit="output-dialog"
			class="fixed left-1/2 top-1/2 z-[100000] w-[90vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-annotakit-text/80 bg-annotakit-surface shadow-annotakit dark:border-annotakit-text-dark/30 dark:bg-annotakit-surface-dark"
		>
			<div class="flex items-center justify-between border-b-2 border-annotakit-text/80 px-5 py-3 dark:border-annotakit-text-dark/30">
				<Dialog.Title class="text-sm font-semibold text-annotakit-text dark:text-annotakit-text-dark">
					Annotation Output
				</Dialog.Title>
				<Dialog.Close class="rounded p-1 text-annotakit-text/50 transition-all duration-300 ease-out hover:bg-annotakit-text hover:text-white dark:text-annotakit-text-dark/50 dark:hover:bg-annotakit-text-dark dark:hover:text-annotakit-surface-dark">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
				</Dialog.Close>
			</div>

			<!-- Format selector -->
			<div class="flex gap-1 border-b-2 border-annotakit-text/80 px-5 py-2 dark:border-annotakit-text-dark/30">
				{#each formats as fmt}
					<button
						class="rounded px-3 py-1 text-xs font-medium transition-all duration-300 ease-out {annotakitState.outputFormat === fmt.value
							? 'bg-annotakit-text text-white dark:bg-annotakit-text-dark dark:text-annotakit-surface-dark'
							: 'text-annotakit-text/60 hover:bg-annotakit-text hover:text-white dark:text-annotakit-text-dark/60 dark:hover:bg-annotakit-text-dark dark:hover:text-annotakit-surface-dark'}"
						onclick={() => (annotakitState.outputFormat = fmt.value)}
					>
						{fmt.label}
					</button>
				{/each}
			</div>

			<!-- Markdown preview -->
			<div class="max-h-[50vh] overflow-auto p-5">
				<pre class="whitespace-pre-wrap rounded border-2 border-annotakit-text/80 bg-annotakit-text/5 p-4 font-mono text-xs leading-relaxed text-annotakit-text dark:border-annotakit-text-dark/30 dark:bg-annotakit-text-dark/5 dark:text-annotakit-text-dark">{markdown}</pre>
			</div>

			<!-- Actions -->
			<div class="flex items-center justify-end gap-2 border-t-2 border-annotakit-text/80 px-5 py-3 dark:border-annotakit-text-dark/30">
				<span class="mr-auto text-xs text-annotakit-text/40 dark:text-annotakit-text-dark/40">
					{annotakitState.annotationCount} annotation{annotakitState.annotationCount !== 1 ? 's' : ''}
				</span>
				<button
					class="rounded border-2 border-annotakit-text/80 bg-annotakit-text px-4 py-2 text-sm font-medium text-white transition-all duration-300 ease-out hover:bg-annotakit-primary dark:border-annotakit-text-dark/30 dark:bg-annotakit-text-dark dark:text-annotakit-surface-dark dark:hover:bg-annotakit-primary"
					onclick={handleCopy}
				>
					{copied ? 'Copied!' : 'Copy to clipboard'}
				</button>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
