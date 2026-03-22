<script lang="ts">
	import { onMount } from 'svelte';
	import { annotakitState } from 'annotakit/state';
	import type { AnnotakitColor, AnnotakitPosition, OutputFormat, AnnotakitTheme } from 'annotakit/types';
	import { applyHighlightColor, clearHighlightColor, loadHighlightColor, saveHighlightColor } from 'annotakit/core/colors.js';
	import Toolbar from 'annotakit/components/Toolbar.svelte';
	import OverlayLayer from 'annotakit/components/OverlayLayer.svelte';
	import OutputDialog from 'annotakit/components/OutputDialog.svelte';

	interface Props {
		shadowHost: HTMLElement;
		position?: AnnotakitPosition;
		outputFormat?: OutputFormat;
		theme?: AnnotakitTheme;
		highlightColor?: AnnotakitColor;
	}

	let {
		shadowHost,
		position = 'bottom-right',
		outputFormat = 'standard',
		theme = 'auto',
		highlightColor = 'green'
	}: Props = $props();

	let mounted = $state(false);

	// Sync props to state
	$effect(() => {
		annotakitState.position = position;
		if (typeof window === 'undefined' || !localStorage.getItem('annotakit-output-format')) {
			annotakitState.outputFormat = outputFormat;
		}
		annotakitState.theme = theme;
		annotakitState.highlightColor = highlightColor;
		annotakitState.storageKey = 'annotakit';
		annotakitState.retentionDays = 7;
		annotakitState.enabled = true;
		annotakitState.minimized = false;
	});

	// Resolve theme — set on shadow host instead of document.documentElement
	$effect(() => {
		if (!mounted) return;
		let resolved: 'light' | 'dark' = 'light';
		if (annotakitState.theme === 'auto') {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			const htmlHasDark = document.documentElement.classList.contains('dark');
			resolved = prefersDark || htmlHasDark ? 'dark' : 'light';
		} else {
			resolved = annotakitState.theme as 'light' | 'dark';
		}
		shadowHost.setAttribute('data-annotakit-theme', resolved);
	});

	// Apply highlight color to shadow host (not document.documentElement)
	$effect(() => {
		if (!mounted) return;
		applyHighlightColor(annotakitState.highlightColor, shadowHost);
		saveHighlightColor(annotakitState.storageKey, annotakitState.highlightColor);
	});

	// Persist block interactions setting
	$effect(() => {
		if (!mounted) return;
		try {
			localStorage.setItem(annotakitState.storageKey + ':block-interactions', String(annotakitState.blockInteractions));
		} catch { /* storage unavailable */ }
	});

	// Persist auto-clear setting
	$effect(() => {
		if (!mounted) return;
		try {
			localStorage.setItem(annotakitState.storageKey + ':auto-clear-after-copy', String(annotakitState.autoClearAfterCopy));
		} catch { /* storage unavailable */ }
	});

	// Toggle crosshair cursor on body (must affect host page)
	$effect(() => {
		if (!mounted) return;
		if (annotakitState.isActive) {
			document.body.classList.add('annotakit-active');
		} else {
			document.body.classList.remove('annotakit-active');
		}
	});

	// Freeze animations (must affect host page)
	$effect(() => {
		if (!mounted) return;
		const id = 'annotakit-freeze-styles';
		if (annotakitState.frozen) {
			if (!document.getElementById(id)) {
				const style = document.createElement('style');
				style.id = id;
				style.textContent = `
					*:not([data-annotakit] *) {
						animation-play-state: paused !important;
						transition: none !important;
						transition-delay: 0s !important;
						transition-duration: 0s !important;
					}
				`;
				document.head.appendChild(style);
			}
		} else {
			document.getElementById(id)?.remove();
		}
	});

	// Keyboard shortcuts
	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			annotakitState.selectAnnotation(null);
			annotakitState.showOutputDialog = false;
		}
	}

	onMount(() => {
		mounted = true;

		// Inject crosshair cursor style into host page
		const cursorStyleId = 'annotakit-cursor-styles';
		if (!document.getElementById(cursorStyleId)) {
			const style = document.createElement('style');
			style.id = cursorStyleId;
			style.textContent = `body.annotakit-active { cursor: crosshair !important; }`;
			document.head.appendChild(style);
		}

		annotakitState.loadFromStorage();
		const savedColor = loadHighlightColor(annotakitState.storageKey);
		if (savedColor) annotakitState.highlightColor = savedColor;
		try {
			const savedBlock = localStorage.getItem(annotakitState.storageKey + ':block-interactions');
			if (savedBlock === 'true') annotakitState.blockInteractions = true;
			const savedAutoClear = localStorage.getItem(annotakitState.storageKey + ':auto-clear-after-copy');
			if (savedAutoClear === 'true') annotakitState.autoClearAfterCopy = true;
		} catch { /* storage unavailable */ }
		document.addEventListener('keydown', handleKeyDown);

		// Listen for toggle messages from background/popup
		chrome.runtime.onMessage.addListener((message) => {
			if (message.type === 'toggle') {
				annotakitState.toggleMinimized();
			}
		});

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.body.classList.remove('annotakit-active');
			shadowHost.removeAttribute('data-annotakit-theme');
			document.getElementById('annotakit-freeze-styles')?.remove();
			document.getElementById(cursorStyleId)?.remove();
			clearHighlightColor(shadowHost);
		};
	});
</script>

{#if mounted && annotakitState.enabled}
	<Toolbar />
	<OverlayLayer />
	{#if annotakitState.showOutputDialog}
		<OutputDialog />
	{/if}
{/if}
