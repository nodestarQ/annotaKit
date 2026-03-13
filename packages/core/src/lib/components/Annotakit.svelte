<script lang="ts">
	import { onMount } from 'svelte';
	import { annotakitState } from '../state.svelte.js';
	import type { AnnotakitColor, AnnotakitPosition, OutputFormat, AnnotakitTheme } from '../types.js';
	import { applyHighlightColor, clearHighlightColor, loadHighlightColor, saveHighlightColor } from '../core/colors.js';
	import Toolbar from './Toolbar.svelte';
	import OverlayLayer from './OverlayLayer.svelte';
	import OutputDialog from './OutputDialog.svelte';

	interface Props {
		position?: AnnotakitPosition;
		outputFormat?: OutputFormat;
		theme?: AnnotakitTheme;
		highlightColor?: AnnotakitColor;
		storageKey?: string;
		retentionDays?: number;
		enabled?: boolean;
		minimized?: boolean;
		mcpServerUrl?: string;
		onOutput?: (markdown: string) => void;
	}

	let {
		position = 'bottom-right',
		outputFormat = 'standard',
		theme = 'auto',
		highlightColor = 'green',
		storageKey = 'annotakit',
		retentionDays = 7,
		enabled = true,
		minimized = false,
		mcpServerUrl,
		onOutput
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
		annotakitState.storageKey = storageKey;
		annotakitState.retentionDays = retentionDays;
		annotakitState.enabled = enabled;
		annotakitState.minimized = minimized;
		annotakitState.mcpServerUrl = mcpServerUrl ?? null;
	});

	// MCP health polling
	$effect(() => {
		const url = annotakitState.mcpServerUrl;
		if (!url || !mounted) {
			annotakitState.mcpConnected = false;
			return;
		}

		let active = true;

		async function check() {
			try {
				const res = await fetch(`${url.replace(/\/$/, '')}/api/health`, { signal: AbortSignal.timeout(3000) });
				if (active) annotakitState.mcpConnected = res.ok;
			} catch {
				if (active) annotakitState.mcpConnected = false;
			}
		}

		check();
		const interval = setInterval(check, 5000);

		return () => {
			active = false;
			clearInterval(interval);
			annotakitState.mcpConnected = false;
		};
	});

	// Resolve theme and set data attribute
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
		document.documentElement.setAttribute('data-annotakit-theme', resolved);
	});

	// Apply highlight color CSS custom properties and persist
	$effect(() => {
		if (!mounted) return;
		applyHighlightColor(annotakitState.highlightColor);
		saveHighlightColor(annotakitState.storageKey, annotakitState.highlightColor);
	});

	// Persist block interactions setting
	$effect(() => {
		if (!mounted) return;
		try {
			localStorage.setItem(annotakitState.storageKey + ':block-interactions', String(annotakitState.blockInteractions));
		} catch { /* storage unavailable */ }
	});

	// Toggle crosshair cursor on body
	$effect(() => {
		if (!mounted) return;
		if (annotakitState.isActive) {
			document.body.classList.add('annotakit-active');
		} else {
			document.body.classList.remove('annotakit-active');
		}
	});

	// Freeze animations
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
		annotakitState.loadFromStorage();
		const savedColor = loadHighlightColor(annotakitState.storageKey);
		if (savedColor) annotakitState.highlightColor = savedColor;
		try {
			const savedBlock = localStorage.getItem(annotakitState.storageKey + ':block-interactions');
			if (savedBlock === 'true') annotakitState.blockInteractions = true;
		} catch { /* storage unavailable */ }
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.body.classList.remove('annotakit-active');
			document.documentElement.removeAttribute('data-annotakit-theme');
			document.getElementById('annotakit-freeze-styles')?.remove();
			clearHighlightColor();
		};
	});
</script>

{#if mounted && annotakitState.enabled}
	<Toolbar />
	<OverlayLayer />
	{#if annotakitState.showOutputDialog}
		<OutputDialog {onOutput} />
	{/if}
{/if}
