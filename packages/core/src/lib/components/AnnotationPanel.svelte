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
		class="pointer-events-auto fixed right-2 bottom-14 z-[99999] flex w-80 flex-col rounded-lg border-2 border-annotakit-text/80 bg-annotakit-surface shadow-annotakit dark:border-annotakit-text-dark/30 dark:bg-annotakit-surface-dark"
		style="max-height: calc(100vh - 72px);"
	>
		<!-- Header with expand toggle -->
		<button
			class="group flex w-full shrink-0 cursor-pointer items-center gap-2 border-b-2 border-annotakit-text/80 px-3 py-2 text-left transition-all duration-300 ease-out hover:bg-annotakit-text hover:text-white dark:border-annotakit-text-dark/30 dark:hover:bg-annotakit-text-dark dark:hover:text-annotakit-surface-dark"
			onclick={() => (showDetails = !showDetails)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
				class="shrink-0 text-annotakit-text/40 transition-all duration-300 ease-out group-hover:text-white dark:text-annotakit-text-dark/40 dark:group-hover:text-annotakit-surface-dark {showDetails ? '' : 'rotate-180'}"
			>
				<path d="m6 9 6 6 6-6"/>
			</svg>
			<span class="flex-1 truncate font-mono text-xs font-medium text-annotakit-text transition-all duration-300 ease-out group-hover:text-white dark:text-annotakit-text-dark dark:group-hover:text-annotakit-surface-dark">
				{annotation.element.tagName}{#if annotation.element.id}#{annotation.element.id}{/if}
			</span>
		</button>

		<div class="overflow-y-auto">
			<!-- Collapsible details -->
			{#if showDetails}
				<div class="space-y-2 border-b-2 border-annotakit-text/80 px-3 py-3 dark:border-annotakit-text-dark/30" transition:slide={{ duration: 200 }}>
					<!-- Multi-element list -->
					{#if annotation.elements && annotation.elements.length > 1}
						<div>
							<div class="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-annotakit-text/50 dark:text-annotakit-text-dark/50">Elements ({annotation.elements.length})</div>
							<div class="space-y-1">
								{#each annotation.elements as el}
									<div class="rounded border border-annotakit-text/10 bg-annotakit-text/5 px-2 py-1 dark:border-annotakit-text-dark/10 dark:bg-annotakit-text-dark/5">
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
							<code class="block truncate rounded border border-annotakit-text/10 bg-annotakit-text/5 px-2 py-1 font-mono text-xs text-annotakit-primary dark:border-annotakit-text-dark/10 dark:bg-annotakit-text-dark/5">
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
							<div class="rounded border border-annotakit-text/10 bg-annotakit-text/5 px-2 py-1 text-xs italic text-annotakit-text dark:border-annotakit-text-dark/10 dark:bg-annotakit-text-dark/5 dark:text-annotakit-text-dark">
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
						class="w-full resize-y rounded border-2 border-annotakit-text/80 bg-white px-2 py-1.5 text-sm text-annotakit-text placeholder:text-annotakit-text/30 focus:border-annotakit-primary focus:outline-none dark:border-annotakit-text-dark/30 dark:bg-annotakit-surface-dark dark:text-annotakit-text-dark dark:placeholder:text-annotakit-text-dark/30"
						rows="3"
						placeholder="Describe the change needed..."
						value={commentValue}
						oninput={handleCommentInput}
					></textarea>
				</div>

				<!-- Actions -->
				<div class="flex gap-2">
					<button
						class="flex-1 rounded border-2 border-annotakit-text/80 px-3 py-1.5 text-xs font-medium text-annotakit-text/70 transition-all duration-300 ease-out hover:bg-annotakit-text hover:text-white dark:border-annotakit-text-dark/30 dark:text-annotakit-text-dark/70 dark:hover:bg-annotakit-text-dark dark:hover:text-annotakit-surface-dark"
						onclick={handleDelete}
					>
						Cancel
					</button>
					<button
						class="flex-1 rounded border-2 border-annotakit-text/80 bg-annotakit-text px-3 py-1.5 text-xs font-medium text-white transition-all duration-300 ease-out hover:bg-annotakit-primary dark:border-annotakit-text-dark/30 dark:bg-annotakit-text-dark dark:text-annotakit-surface-dark dark:hover:bg-annotakit-primary"
						onclick={handleClose}
					>
						Add
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
