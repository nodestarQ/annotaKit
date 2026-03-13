<script lang="ts">
	import { slide } from 'svelte/transition';
	import { annotakitState } from '../state.svelte.js';
	import Icon from './Icon.svelte';

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
		class="pointer-events-auto fixed {annotakitState.panelPositionClasses} z-[99999] flex w-80 flex-col rounded-lg border-2 border-annotakit-stroke bg-annotakit-surface shadow-annotakit"
		style="max-height: calc(100vh - 72px);"
	>
		<!-- Header with expand toggle -->
		<button
			class="group flex w-full shrink-0 cursor-pointer items-center gap-2 border-b-2 border-annotakit-stroke px-3 py-2 text-left transition-all duration-300 ease-out hover:bg-annotakit-text hover:text-annotakit-surface"
			onclick={() => (showDetails = !showDetails)}
		>
			<Icon
				name="chevron-right"
				size={12}
				class="shrink-0 text-annotakit-text/40 transition-all duration-300 ease-out group-hover:text-annotakit-surface {showDetails ? 'rotate-90' : ''}"
			/>
			<span class="flex-1 truncate font-mono text-xs font-medium text-annotakit-text transition-all duration-300 ease-out group-hover:text-annotakit-surface">
				{annotation.element.tagName}{#if annotation.element.id}#{annotation.element.id}{/if}
			</span>
		</button>

		<div class="overflow-y-auto">
			<!-- Collapsible details -->
			{#if showDetails}
				<div class="space-y-2 border-b-2 border-annotakit-stroke px-3 py-3" transition:slide={{ duration: 200 }}>
					<!-- Multi-element list -->
					{#if annotation.elements && annotation.elements.length > 1}
						<div>
							<div class="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-annotakit-text/50">Elements ({annotation.elements.length})</div>
							<div class="space-y-1">
								{#each annotation.elements as el}
									<div class="rounded border border-annotakit-text/10 bg-annotakit-text/5 px-2 py-1">
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
							<div class="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-annotakit-text/50">Selector</div>
							<code class="block truncate rounded border border-annotakit-text/10 bg-annotakit-text/5 px-2 py-1 font-mono text-xs text-annotakit-primary">
								{annotation.element.selector}
							</code>
						</div>

						<!-- Svelte component -->
						{#if annotation.element.svelte}
							<div>
								<div class="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-annotakit-text/50">Component</div>
								<div class="font-mono text-xs text-annotakit-accent">
									{annotation.element.svelte.name}
									<span class="text-annotakit-text/40">
										{annotation.element.svelte.file}
									</span>
								</div>
							</div>
						{/if}
					{/if}

					<!-- Text selection -->
					{#if annotation.textSelection}
						<div>
							<div class="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-annotakit-text/50">Selected text</div>
							<div class="rounded border border-annotakit-text/10 bg-annotakit-text/5 px-2 py-1 text-xs italic text-annotakit-text">
								"{annotation.textSelection.text}"
							</div>
						</div>
					{/if}

					<!-- Computed styles -->
					<div>
						<div class="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-annotakit-text/50">Computed styles</div>
						<div class="space-y-0.5 font-mono text-[11px] text-annotakit-text/70">
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
					<div class="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-annotakit-text/50">Comment</div>
					<textarea
						class="w-full resize-y rounded border-2 border-annotakit-stroke bg-annotakit-surface px-2 py-1.5 text-sm text-annotakit-text placeholder:text-annotakit-text/30 focus:border-annotakit-primary focus:outline-none"
						rows="3"
						placeholder="Describe the change needed..."
						value={commentValue}
						oninput={handleCommentInput}
					></textarea>
				</div>

				<!-- Actions -->
				<div class="flex gap-2">
					<button
						class="flex-1 rounded border-2 border-annotakit-stroke px-3 py-1.5 text-xs font-medium text-annotakit-text/70 transition-all duration-300 ease-out hover:bg-annotakit-text hover:text-annotakit-surface"
						onclick={handleDelete}
					>
						Cancel
					</button>
					<button
						class="flex-1 rounded border-2 border-annotakit-stroke bg-annotakit-text px-3 py-1.5 text-xs font-medium text-annotakit-surface transition-all duration-300 ease-out hover:bg-annotakit-primary"
						onclick={handleClose}
					>
						Add
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
