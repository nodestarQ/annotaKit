<script lang="ts">
	import { annotakitState } from '../state.svelte.js';

	let annotation = $derived(annotakitState.activeAnnotation);

	const toolbarHeight = 48;
	const gap = 8;

	let toolbarInLowerHalf = $derived(
		annotakitState.toolbarPosition.y > (typeof window !== 'undefined' ? window.innerHeight / 2 : 360)
	);

	let panelStyle = $derived.by(() => {
		const x = annotakitState.toolbarPosition.x;
		const y = annotakitState.toolbarPosition.y;
		if (toolbarInLowerHalf) {
			// Render above toolbar
			return `left: ${x}px; bottom: calc(100vh - ${y}px + ${gap}px); max-height: calc(${y}px - ${gap * 2}px);`;
		} else {
			// Render below toolbar
			const top = y + toolbarHeight + gap;
			return `left: ${x}px; top: ${top}px; max-height: calc(100vh - ${top}px - ${gap}px);`;
		}
	});

	let commentValue = $state('');

	$effect(() => {
		if (annotation) {
			commentValue = annotation.comment;
		}
	});

	function handleCommentInput(e: Event) {
		const value = (e.target as HTMLTextAreaElement).value;
		commentValue = value;
		if (annotation) {
			annotakitState.updateAnnotation(annotation.id, { comment: value });
		}
	}

	function handleDelete() {
		if (annotation) {
			annotakitState.removeAnnotation(annotation.id);
		}
	}

	function handleClose() {
		annotakitState.selectAnnotation(null);
	}
</script>

{#if annotation}
	<div
		data-annotakit="panel"
		class="pointer-events-auto fixed z-[99999] flex w-80 flex-col rounded-xl border border-annotakit-border bg-annotakit-surface shadow-annotakit dark:border-annotakit-border-dark dark:bg-annotakit-surface-dark"
		style={panelStyle}
	>
		<div class="flex shrink-0 items-center justify-between border-b border-annotakit-border px-3 py-2 dark:border-annotakit-border-dark">
			<span class="font-mono text-xs font-medium text-annotakit-text dark:text-annotakit-text-dark">
				{annotation.element.tagName}{#if annotation.element.id}#{annotation.element.id}{/if}
			</span>
			<button
				class="text-annotakit-text/50 transition-colors hover:text-annotakit-text dark:text-annotakit-text-dark/50 dark:hover:text-annotakit-text-dark"
				onclick={handleClose}
				title="Close panel"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
			</button>
		</div>

		<div class="space-y-2 overflow-y-auto p-3">
			<!-- Selector -->
			<div>
				<div class="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-annotakit-text/50 dark:text-annotakit-text-dark/50">Selector</div>
				<code class="block truncate rounded bg-annotakit-primary/10 px-2 py-1 font-mono text-xs text-annotakit-primary dark:bg-annotakit-primary/20">
					{annotation.element.selector}
				</code>
			</div>

			<!-- Svelte component -->
			{#if annotation.element.svelte}
				<div>
					<div class="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-annotakit-text/50 dark:text-annotakit-text-dark/50">Component</div>
					<div class="font-mono text-xs text-annotakit-accent">
						{annotation.element.svelte.name}
						<span class="text-annotakit-text/40 dark:text-annotakit-text-dark/40">
							{annotation.element.svelte.file}
						</span>
					</div>
				</div>
			{/if}

			<!-- Text selection -->
			{#if annotation.textSelection}
				<div>
					<div class="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-annotakit-text/50 dark:text-annotakit-text-dark/50">Selected text</div>
					<div class="rounded bg-annotakit-warning/10 px-2 py-1 text-xs italic text-annotakit-text dark:text-annotakit-text-dark">
						"{annotation.textSelection.text}"
					</div>
				</div>
			{/if}

			<!-- Styles (collapsible) -->
			<details class="group">
				<summary class="cursor-pointer text-[10px] font-medium uppercase tracking-wider text-annotakit-text/50 hover:text-annotakit-text dark:text-annotakit-text-dark/50 dark:hover:text-annotakit-text-dark">
					Computed styles
				</summary>
				<div class="mt-1 space-y-0.5 font-mono text-[11px] text-annotakit-text/70 dark:text-annotakit-text-dark/70">
					<div>color: {annotation.element.styles.color}</div>
					<div>bg: {annotation.element.styles.backgroundColor}</div>
					<div>font: {annotation.element.styles.fontSize} {annotation.element.styles.fontWeight}</div>
					<div>display: {annotation.element.styles.display}</div>
					<div>padding: {annotation.element.styles.padding}</div>
				</div>
			</details>

			<!-- Comment -->
			<div>
				<div class="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-annotakit-text/50 dark:text-annotakit-text-dark/50">Comment</div>
				<textarea
					class="w-full resize-y rounded-lg border border-annotakit-border bg-white px-2 py-1.5 text-sm text-annotakit-text placeholder:text-annotakit-text/30 focus:border-annotakit-primary focus:outline-none dark:border-annotakit-border-dark dark:bg-annotakit-surface-dark dark:text-annotakit-text-dark dark:placeholder:text-annotakit-text-dark/30"
					rows="3"
					placeholder="Describe the change needed..."
					value={commentValue}
					oninput={handleCommentInput}
				></textarea>
			</div>

			<!-- Delete -->
			<button
				class="w-full rounded-lg border border-annotakit-danger/30 px-3 py-1.5 text-xs font-medium text-annotakit-danger transition-colors hover:bg-annotakit-danger/10"
				onclick={handleDelete}
			>
				Remove annotation
			</button>
		</div>
	</div>
{/if}
