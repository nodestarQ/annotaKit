<script lang="ts">
	import type { Annotation } from '../types.js';
	import { annotakitState } from '../state.svelte.js';

	interface Props {
		annotation: Annotation;
		index: number;
	}

	let { annotation, index }: Props = $props();

	let isSelected = $derived(annotakitState.selectedAnnotationId === annotation.id);

	// Re-query DOM position from stored selector
	let position = $state<{ top: number; right: number } | null>(null);

	function updatePosition() {
		try {
			const el = document.querySelector(annotation.element.selector);
			if (!el) {
				position = null;
				return;
			}
			const rect = el.getBoundingClientRect();
			position = {
				top: rect.top - 10,
				right: window.innerWidth - rect.right - 10
			};
		} catch {
			position = null;
		}
	}

	$effect(() => {
		updatePosition();
		window.addEventListener('scroll', updatePosition, true);
		window.addEventListener('resize', updatePosition);
		return () => {
			window.removeEventListener('scroll', updatePosition, true);
			window.removeEventListener('resize', updatePosition);
		};
	});

	function handleClick(e: MouseEvent) {
		e.stopPropagation();
		annotakitState.selectAnnotation(isSelected ? null : annotation.id);
	}
</script>

{#if position}
	<button
		data-annotakit="pin"
		class="pointer-events-auto fixed z-[99998] flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold text-white shadow-md transition-transform {isSelected
			? 'scale-125 bg-annotakit-primary-dark ring-2 ring-white'
			: 'bg-annotakit-primary hover:scale-110'}"
		style="top: {position.top}px; right: {position.right}px;"
		onclick={handleClick}
		title="Annotation #{index + 1}"
	>
		{index + 1}
	</button>
{/if}
