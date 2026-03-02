<script lang="ts">
	import { onMount } from 'svelte';
	import { annotakitState } from '../state.svelte.js';
	import { generateMarkdown, copyToClipboard, FORMAT_OPTIONS } from '../core/output.js';
	import Icon from './Icon.svelte';

	interface Props {
		onOutput?: (markdown: string) => void;
	}

	let { onOutput }: Props = $props();

	let copied = $state(false);
	let dialogEl: HTMLDialogElement | undefined = $state();

	let markdown = $derived(
		generateMarkdown(annotakitState.annotations, annotakitState.outputFormat)
	);

	const titleId = `annotakit-dialog-title-${Math.random().toString(36).slice(2, 8)}`;

	async function handleCopy() {
		const success = await copyToClipboard(markdown);
		if (success) {
			copied = true;
			onOutput?.(markdown);
			setTimeout(() => (copied = false), 2000);
		}
	}

	function closeDialog() {
		annotakitState.showOutputDialog = false;
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === dialogEl) closeDialog();
	}

	function handleCancel(e: Event) {
		e.preventDefault();
		closeDialog();
	}

	// Sync open state with <dialog>
	$effect(() => {
		if (!dialogEl) return;
		if (annotakitState.showOutputDialog) {
			if (!dialogEl.open) dialogEl.showModal();
			document.body.style.overflow = 'hidden';
		} else {
			if (dialogEl.open) dialogEl.close();
			document.body.style.overflow = '';
		}
	});

	// Restore body overflow on unmount
	onMount(() => {
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<dialog
	bind:this={dialogEl}
	data-annotakit="output-dialog"
	class="fixed inset-0 z-[99999] m-0 h-dvh max-h-dvh w-dvw max-w-[100dvw] border-none bg-transparent p-0 backdrop:bg-transparent"
	aria-labelledby={titleId}
	onclick={handleBackdropClick}
	oncancel={handleCancel}
>
	<!-- Backdrop (inside dialog so backdrop-blur works) -->
	<div class="fixed inset-0 bg-black/40 backdrop-blur-sm"></div>

	<!-- Content panel -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed left-1/2 top-1/2 z-[100000] w-[90vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-annotakit-text/80 bg-annotakit-surface shadow-annotakit dark:border-annotakit-text-dark/30 dark:bg-annotakit-surface-dark"
		onclick={(e) => e.stopPropagation()}
		onkeydown={() => {}}
	>
		<div class="flex items-center justify-between border-b-2 border-annotakit-text/80 px-5 py-3 dark:border-annotakit-text-dark/30">
			<h2 id={titleId} class="text-sm font-semibold text-annotakit-text dark:text-annotakit-text-dark">
				Annotation Output
			</h2>
			<button
				class="rounded p-1 text-annotakit-text/50 transition-all duration-300 ease-out hover:bg-annotakit-text hover:text-white dark:text-annotakit-text-dark/50 dark:hover:bg-annotakit-text-dark dark:hover:text-annotakit-surface-dark"
				onclick={closeDialog}
			>
				<Icon name="x" size={16} />
			</button>
		</div>

		<!-- Format selector -->
		<div class="flex gap-1 border-b-2 border-annotakit-text/80 px-5 py-2 dark:border-annotakit-text-dark/30">
			{#each FORMAT_OPTIONS as fmt}
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
	</div>
</dialog>
