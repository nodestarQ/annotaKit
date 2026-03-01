<script lang="ts">
	import { slide } from 'svelte/transition';
	import { annotakitState } from '../state.svelte.js';

	let annotation = $derived(annotakitState.activeAnnotation);

	let commentValue = $state('');
	let showDetails = $state(false);

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
		class="pointer-events-auto fixed right-2 bottom-14 z-[99999] flex w-80 flex-col rounded-xl border border-annotakit-border bg-annotakit-surface shadow-annotakit dark:border-annotakit-border-dark dark:bg-annotakit-surface-dark"
		style="max-height: calc(100vh - 72px);"
	>
		<!-- Header with expand toggle -->
		<button
			class="group flex w-full shrink-0 cursor-pointer items-center gap-2 border-b border-annotakit-border px-3 py-2 text-left transition-colors hover:bg-annotakit-primary/5 dark:border-annotakit-border-dark"
			onclick={() => (showDetails = !showDetails)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
				class="shrink-0 text-annotakit-text/40 transition-all duration-200 group-hover:text-annotakit-primary dark:text-annotakit-text-dark/40 {showDetails ? '' : 'rotate-180'}"
			>
				<path d="m6 9 6 6 6-6"/>
			</svg>
			<span class="flex-1 truncate font-mono text-xs font-medium text-annotakit-text transition-colors group-hover:text-annotakit-primary dark:text-annotakit-text-dark">
				{annotation.element.tagName}{#if annotation.element.id}#{annotation.element.id}{/if}
			</span>
		</button>

		<div class="overflow-y-auto">
			<!-- Collapsible details -->
			{#if showDetails}
				<div class="space-y-2 border-b border-annotakit-border px-3 py-3 dark:border-annotakit-border-dark" transition:slide={{ duration: 200 }}>
					<!-- Multi-element list -->
					{#if annotation.elements && annotation.elements.length > 1}
						<div>
							<div class="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-annotakit-text/50 dark:text-annotakit-text-dark/50">Elements ({annotation.elements.length})</div>
							<div class="space-y-1">
								{#each annotation.elements as el}
									<div class="rounded bg-annotakit-primary/10 px-2 py-1 dark:bg-annotakit-primary/20">
										<code class="block truncate font-mono text-xs text-annotakit-primary">
											{el.selector}
										</code>
										{#if el.svelte}
											<div class="font-mono text-[10px] text-annotakit-accent">
												{el.svelte.name}
											</div>
										{/if}
									</div>
								{/each}
							</div>
						</div>
					{:else}
						<!-- Single element selector -->
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

					<!-- Computed styles -->
					<div>
						<div class="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-annotakit-text/50 dark:text-annotakit-text-dark/50">Computed styles</div>
						<div class="space-y-0.5 font-mono text-[11px] text-annotakit-text/70 dark:text-annotakit-text-dark/70">
							<div>color: {annotation.element.styles.color}</div>
							<div>bg: {annotation.element.styles.backgroundColor}</div>
							<div>font: {annotation.element.styles.fontSize} {annotation.element.styles.fontWeight}</div>
							<div>display: {annotation.element.styles.display}</div>
							<div>padding: {annotation.element.styles.padding}</div>
						</div>
					</div>
				</div>
			{/if}

			<!-- Always visible: Comment + Actions -->
			<div class="space-y-2 p-3">
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

				<!-- Actions -->
				<div class="flex gap-2">
					<button
						class="flex-1 rounded-lg border border-annotakit-border px-3 py-1.5 text-xs font-medium text-annotakit-text/70 transition-colors hover:bg-annotakit-text/5 dark:border-annotakit-border-dark dark:text-annotakit-text-dark/70 dark:hover:bg-annotakit-text-dark/5"
						onclick={handleDelete}
					>
						Cancel
					</button>
					<button
						class="flex-1 rounded-lg bg-annotakit-primary px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-annotakit-primary-dark"
						onclick={handleClose}
					>
						Add
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
