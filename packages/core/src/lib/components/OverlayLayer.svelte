<script lang="ts">
	import { onMount } from 'svelte';
	import { annotakitState } from '../state.svelte.js';
	import { handleAnnotateClick, handleTextSelection, handleMultiElementClick } from '../core/actions.js';
	import AnnotationPin from './AnnotationPin.svelte';
	import AnnotationPanel from './AnnotationPanel.svelte';

	let overlayEl: HTMLDivElement | undefined = $state();
	let dragRafId: number | null = null;

	// Pointer tracking for context-sensitive interaction
	let pointerStart: { x: number; y: number; target: Element } | null = null;
	let isDragging = $state(false);
	let pointerCurrent = $state<{ x: number; y: number } | null>(null);
	let isTextDrag = $state(false);

	// Hover highlight
	let hoveredElement = $state<Element | null>(null);
	let hoverRafId: number | null = null;

	// Elements currently inside the selection box
	let highlightedElements = $state<Element[]>([]);

	const DRAG_THRESHOLD = 5;
	const SAMPLE_STEP = 20;

	let selectionBox = $derived.by(() => {
		if (!isDragging || isTextDrag || !pointerStart || !pointerCurrent) return null;
		return {
			left: Math.min(pointerStart.x, pointerCurrent.x),
			top: Math.min(pointerStart.y, pointerCurrent.y),
			width: Math.abs(pointerCurrent.x - pointerStart.x),
			height: Math.abs(pointerCurrent.y - pointerStart.y)
		};
	});

	let hoverRect = $derived(hoveredElement ? hoveredElement.getBoundingClientRect() : null);

	let highlightRects = $derived(
		highlightedElements.map((el) => el.getBoundingClientRect())
	);

	// Highlight for the selected annotation's element(s)
	let activeHighlightRects = $derived.by(() => {
		const annotation = annotakitState.activeAnnotation;
		if (!annotation) return [];
		const infos = annotation.elements && annotation.elements.length > 1
			? annotation.elements
			: [annotation.element];
		const rects: DOMRect[] = [];
		for (const info of infos) {
			try {
				const el = document.querySelector(info.selector);
				if (el) rects.push(el.getBoundingClientRect());
			} catch { /* invalid selector */ }
		}
		return rects;
	});

	function isAnnotakitElement(el: Element | null): boolean {
		if (!el) return false;
		return !!el.closest('[data-annotakit]');
	}

	function getElementUnderPoint(x: number, y: number): Element | null {
		if (overlayEl) overlayEl.style.display = 'none';
		const target = document.elementFromPoint(x, y);
		if (overlayEl) overlayEl.style.display = '';
		return target;
	}

	function sampleElementsInBox(minX: number, minY: number, maxX: number, maxY: number): Element[] {
		const seen = new Set<Element>();
		if (overlayEl) overlayEl.style.display = 'none';
		for (let x = minX; x <= maxX; x += SAMPLE_STEP) {
			for (let y = minY; y <= maxY; y += SAMPLE_STEP) {
				const el = document.elementFromPoint(x, y);
				if (el && !isAnnotakitElement(el)) {
					seen.add(el);
				}
			}
		}
		if (overlayEl) overlayEl.style.display = '';

		// Remove ancestors — if an element contains another in the set, drop it
		const elements = Array.from(seen);
		return elements.filter((el) =>
			!elements.some((other) => other !== el && el.contains(other))
		);
	}

	function hasTextCursor(el: Element): boolean {
		const cursor = window.getComputedStyle(el).cursor;
		return cursor === 'text';
	}

	function handleMouseMove(e: MouseEvent) {
		if (!annotakitState.isActive || pointerStart) {
			if (hoveredElement) hoveredElement = null;
			return;
		}
		if (hoverRafId !== null) return;
		hoverRafId = requestAnimationFrame(() => {
			hoverRafId = null;
			if (!annotakitState.isActive || pointerStart) {
				hoveredElement = null;
				return;
			}
			const target = getElementUnderPoint(e.clientX, e.clientY);
			hoveredElement = target && !isAnnotakitElement(target) ? target : null;
		});
	}

	function handlePointerDown(e: PointerEvent) {
		if (!annotakitState.isActive) return;
		if (isAnnotakitElement(e.target as Element)) return;

		const target = getElementUnderPoint(e.clientX, e.clientY);
		if (!target || isAnnotakitElement(target)) return;

		isTextDrag = hasTextCursor(target);
		pointerStart = { x: e.clientX, y: e.clientY, target };
		pointerCurrent = { x: e.clientX, y: e.clientY };
		isDragging = false;
		highlightedElements = [];
		hoveredElement = null;

		if (!isTextDrag) {
			// Prevent native text selection for element drags
			e.preventDefault();
		}
	}

	function handlePointerMove(e: PointerEvent) {
		if (!pointerStart) return;

		pointerCurrent = { x: e.clientX, y: e.clientY };
		const dx = e.clientX - pointerStart.x;
		const dy = e.clientY - pointerStart.y;
		if (Math.sqrt(dx * dx + dy * dy) > DRAG_THRESHOLD) {
			isDragging = true;
		}

		// Sample elements inside selection box (rAF throttled)
		if (isDragging) {
			if (dragRafId !== null) return;
			dragRafId = requestAnimationFrame(() => {
				dragRafId = null;
				if (!pointerStart || !pointerCurrent) return;
				const minX = Math.min(pointerStart.x, pointerCurrent.x);
				const maxX = Math.max(pointerStart.x, pointerCurrent.x);
				const minY = Math.min(pointerStart.y, pointerCurrent.y);
				const maxY = Math.max(pointerStart.y, pointerCurrent.y);
				highlightedElements = sampleElementsInBox(minX, minY, maxX, maxY);
			});
		}
	}

	function handlePointerUp(e: PointerEvent) {
		if (!annotakitState.isActive || !pointerStart) {
			pointerStart = null;
			pointerCurrent = null;
			isDragging = false;
			highlightedElements = [];
			return;
		}

		const start = pointerStart;
		const wasDragging = isDragging;
		const wasTextDrag = isTextDrag;
		const capturedElements = highlightedElements;
		pointerStart = null;
		pointerCurrent = null;
		isDragging = false;
		isTextDrag = false;
		highlightedElements = [];

		// Text selection — only when drag started over a text cursor
		if (wasTextDrag) {
			const selection = window.getSelection();
			if (selection && !selection.isCollapsed && (selection.toString().trim().length > 0)) {
				const annotation = handleTextSelection();
				if (annotation) {
					annotakitState.addAnnotation(annotation);
					selection.removeAllRanges();
					return;
				}
			}
		}

		if (wasDragging && !wasTextDrag) {
			// Use already-sampled elements from drag
			const elements = capturedElements.length > 0
				? capturedElements
				: sampleElementsInBox(
					Math.min(start.x, e.clientX),
					Math.min(start.y, e.clientY),
					Math.max(start.x, e.clientX),
					Math.max(start.y, e.clientY)
				);

			if (elements.length > 1) {
				const annotation = handleMultiElementClick(elements);
				annotakitState.addAnnotation(annotation);
				return;
			} else if (elements.length === 1) {
				const annotation = handleAnnotateClick(elements[0]);
				annotakitState.addAnnotation(annotation);
				return;
			}
		} else {
			// Simple click — single element annotation
			if (isAnnotakitElement(e.target as Element)) return;

			const annotation = handleAnnotateClick(start.target);
			annotakitState.addAnnotation(annotation);
		}
	}

	onMount(() => {
		document.addEventListener('mousemove', handleMouseMove, true);
		document.addEventListener('pointerdown', handlePointerDown, true);
		document.addEventListener('pointermove', handlePointerMove, true);
		document.addEventListener('pointerup', handlePointerUp, true);

		return () => {
			document.removeEventListener('mousemove', handleMouseMove, true);
			document.removeEventListener('pointerdown', handlePointerDown, true);
			document.removeEventListener('pointermove', handlePointerMove, true);
			document.removeEventListener('pointerup', handlePointerUp, true);
			if (dragRafId !== null) cancelAnimationFrame(dragRafId);
			if (hoverRafId !== null) cancelAnimationFrame(hoverRafId);
		};
	});
</script>

<div
	bind:this={overlayEl}
	data-annotakit="overlay"
	class="pointer-events-none fixed inset-0 z-[99997]"
	class:cursor-crosshair={annotakitState.isActive}
>
	<!-- Hover highlight -->
	{#if hoverRect && !isDragging && !annotakitState.activeAnnotation}
		<div
			data-annotakit="highlight"
			class="pointer-events-none fixed z-[99998]"
			style="top: {hoverRect.top}px; left: {hoverRect.left}px; width: {hoverRect.width}px; height: {hoverRect.height}px;"
		>
			<div class="absolute inset-0 rounded-sm border-2 border-annotakit-highlight-border bg-annotakit-highlight"></div>
		</div>
	{/if}

	<!-- Highlights for elements inside selection box -->
	{#each highlightRects as rect}
		<div
			data-annotakit="highlight"
			class="pointer-events-none fixed z-[99998]"
			style="top: {rect.top}px; left: {rect.left}px; width: {rect.width}px; height: {rect.height}px;"
		>
			<div class="absolute inset-0 rounded-sm border-2 border-annotakit-highlight-border bg-annotakit-highlight"></div>
		</div>
	{/each}

	<!-- Active annotation highlight -->
	{#each activeHighlightRects as rect}
		<div
			data-annotakit="highlight"
			class="pointer-events-none fixed z-[99998]"
			style="top: {rect.top}px; left: {rect.left}px; width: {rect.width}px; height: {rect.height}px;"
		>
			<div class="absolute inset-0 rounded-sm border-2 border-annotakit-highlight-border bg-annotakit-highlight"></div>
		</div>
	{/each}

	<!-- Annotation pins -->
	{#if annotakitState.isActive}
		{#each annotakitState.annotations as annotation, i (annotation.id)}
			<AnnotationPin {annotation} index={i} />
		{/each}
	{/if}

	<!-- Selection box -->
	{#if selectionBox}
		<div
			data-annotakit="selection-box"
			class="fixed rounded border-2 border-annotakit-primary bg-annotakit-primary/10"
			style="left: {selectionBox.left}px; top: {selectionBox.top}px; width: {selectionBox.width}px; height: {selectionBox.height}px;"
		></div>
	{/if}

	<!-- Detail panel for selected annotation -->
	{#if annotakitState.isActive}
		<AnnotationPanel />
	{/if}
</div>

<style>
	:global(body.annotakit-active) {
		cursor: crosshair;
	}

	:global(body.annotakit-active) :global([style*="cursor: text"]),
	:global(body.annotakit-active) :global(input),
	:global(body.annotakit-active) :global(textarea),
	:global(body.annotakit-active) :global([contenteditable="true"]),
	:global(body.annotakit-active) :global(p),
	:global(body.annotakit-active) :global(span),
	:global(body.annotakit-active) :global(a),
	:global(body.annotakit-active) :global(h1),
	:global(body.annotakit-active) :global(h2),
	:global(body.annotakit-active) :global(h3),
	:global(body.annotakit-active) :global(h4),
	:global(body.annotakit-active) :global(h5),
	:global(body.annotakit-active) :global(h6),
	:global(body.annotakit-active) :global(li),
	:global(body.annotakit-active) :global(td),
	:global(body.annotakit-active) :global(th),
	:global(body.annotakit-active) :global(label),
	:global(body.annotakit-active) :global(blockquote),
	:global(body.annotakit-active) :global(code),
	:global(body.annotakit-active) :global(pre) {
		cursor: text;
	}
</style>
