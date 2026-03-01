<script lang="ts">
	import { onMount } from 'svelte';
	import { annotakitState } from '../state.svelte.js';
	import { handleInspectClick, handleAnnotateClick, handleTextSelection } from '../core/actions.js';
	import ElementHighlight from './ElementHighlight.svelte';
	import AnnotationPin from './AnnotationPin.svelte';
	import AnnotationPanel from './AnnotationPanel.svelte';

	let overlayEl: HTMLDivElement | undefined = $state();
	let rafId: number | null = null;

	function isAnnotakitElement(el: Element | null): boolean {
		if (!el) return false;
		return !!el.closest('[data-annotakit]');
	}

	function handleMouseMove(e: MouseEvent) {
		if (annotakitState.mode === 'idle' || annotakitState.isDragging) return;
		if (isAnnotakitElement(e.target as Element)) return;

		// Throttle via rAF
		if (rafId !== null) return;
		rafId = requestAnimationFrame(() => {
			rafId = null;

			// Temporarily hide overlay to get element under cursor
			if (overlayEl) overlayEl.style.display = 'none';
			const target = document.elementFromPoint(e.clientX, e.clientY);
			if (overlayEl) overlayEl.style.display = '';

			if (!target || isAnnotakitElement(target)) {
				annotakitState.hoveredElement = null;
				return;
			}

			annotakitState.hoveredElement = target;
		});
	}

	function handleClick(e: MouseEvent) {
		if (annotakitState.mode === 'idle' || annotakitState.mode === 'select') return;

		// If the click originated from an annotakit element (panel, pin, toolbar), ignore it
		if (isAnnotakitElement(e.target as Element)) return;

		// Temporarily hide overlay to get the real target
		if (overlayEl) overlayEl.style.display = 'none';
		const target = document.elementFromPoint(e.clientX, e.clientY);
		if (overlayEl) overlayEl.style.display = '';

		if (!target || isAnnotakitElement(target)) return;

		e.preventDefault();
		e.stopPropagation();

		if (annotakitState.mode === 'inspect') {
			const annotation = handleInspectClick(target);
			annotakitState.addAnnotation(annotation);
			annotakitState.setMode('idle');
		} else if (annotakitState.mode === 'annotate') {
			const annotation = handleAnnotateClick(target);
			annotakitState.addAnnotation(annotation);
			// Stay in annotate mode for multiple annotations
		}

		annotakitState.hoveredElement = null;
	}

	function handleSelectionChange() {
		if (annotakitState.mode !== 'select') return;
		const selection = window.getSelection();
		if (!selection || selection.isCollapsed) return;

		// Delay to let selection finalize
		setTimeout(() => {
			const annotation = handleTextSelection();
			if (annotation) {
				annotakitState.addAnnotation(annotation);
			}
		}, 100);
	}

	onMount(() => {
		document.addEventListener('mousemove', handleMouseMove, true);
		document.addEventListener('click', handleClick, true);
		document.addEventListener('selectionchange', handleSelectionChange);

		return () => {
			document.removeEventListener('mousemove', handleMouseMove, true);
			document.removeEventListener('click', handleClick, true);
			document.removeEventListener('selectionchange', handleSelectionChange);
			if (rafId !== null) cancelAnimationFrame(rafId);
		};
	});
</script>

<div
	bind:this={overlayEl}
	data-annotakit="overlay"
	class="pointer-events-none fixed inset-0 z-[99997]"
	class:cursor-crosshair={annotakitState.mode !== 'idle'}
>
	<!-- Hover highlight -->
	{#if annotakitState.mode !== 'idle'}
		<ElementHighlight />
	{/if}

	<!-- Annotation pins -->
	{#each annotakitState.annotations as annotation, i (annotation.id)}
		<AnnotationPin {annotation} index={i} />
	{/each}

	<!-- Detail panel for selected annotation -->
	<AnnotationPanel />
</div>

<style>
	:global(body.annotakit-active) {
		cursor: crosshair;
	}
</style>
