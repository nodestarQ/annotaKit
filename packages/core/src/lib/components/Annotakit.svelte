<script lang="ts">
	import { onMount } from 'svelte';
	import { Tooltip } from 'bits-ui';
	import { annotakitState } from '../state.svelte.js';
	import type { AnnotakitPosition, OutputFormat, AnnotakitTheme } from '../types.js';
	import Toolbar from './Toolbar.svelte';
	import OverlayLayer from './OverlayLayer.svelte';
	import OutputDialog from './OutputDialog.svelte';

	interface Props {
		position?: AnnotakitPosition;
		outputFormat?: OutputFormat;
		theme?: AnnotakitTheme;
		storageKey?: string;
		retentionDays?: number;
		enabled?: boolean;
		onOutput?: (markdown: string) => void;
	}

	let {
		position = 'bottom-right',
		outputFormat = 'standard',
		theme = 'auto',
		storageKey = 'annotakit',
		retentionDays = 7,
		enabled = true,
		onOutput
	}: Props = $props();

	let mounted = $state(false);

	// Resolve initial toolbar position from position prop
	function resolvePosition(pos: AnnotakitPosition): { x: number; y: number } {
		const margin = 8;
		const toolbarWidth = 320;
		const toolbarHeight = 44;
		const w = typeof window !== 'undefined' ? window.innerWidth : 1280;
		const h = typeof window !== 'undefined' ? window.innerHeight : 720;

		const positions: Record<AnnotakitPosition, { x: number; y: number }> = {
			'top-left': { x: margin, y: margin },
			'top-center': { x: (w - toolbarWidth) / 2, y: margin },
			'top-right': { x: w - toolbarWidth - margin, y: margin },
			'bottom-left': { x: margin, y: h - toolbarHeight - margin },
			'bottom-center': { x: (w - toolbarWidth) / 2, y: h - toolbarHeight - margin },
			'bottom-right': { x: w - toolbarWidth - margin, y: h - toolbarHeight - margin }
		};

		return positions[pos];
	}

	// Sync props to state
	$effect(() => {
		annotakitState.position = position;
		annotakitState.outputFormat = outputFormat;
		annotakitState.theme = theme;
		annotakitState.storageKey = storageKey;
		annotakitState.retentionDays = retentionDays;
		annotakitState.enabled = enabled;
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

	// Toggle crosshair cursor on body
	$effect(() => {
		if (!mounted) return;
		if (annotakitState.mode !== 'idle') {
			document.body.classList.add('annotakit-active');
		} else {
			document.body.classList.remove('annotakit-active');
		}
	});

	// Keyboard shortcuts
	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			annotakitState.setMode('idle');
			annotakitState.showOutputDialog = false;
		}
		if (e.ctrlKey && e.shiftKey && e.key === 'I') {
			e.preventDefault();
			annotakitState.setMode(annotakitState.mode === 'inspect' ? 'idle' : 'inspect');
		}
		if (e.ctrlKey && e.shiftKey && e.key === 'A') {
			e.preventDefault();
			annotakitState.setMode(annotakitState.mode === 'annotate' ? 'idle' : 'annotate');
		}
	}

	onMount(() => {
		mounted = true;
		annotakitState.toolbarPosition = resolvePosition(position);
		annotakitState.loadFromStorage();
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.body.classList.remove('annotakit-active');
			document.documentElement.removeAttribute('data-annotakit-theme');
		};
	});
</script>

{#if mounted && annotakitState.enabled}
	<Tooltip.Provider delayDuration={300}>
		<Toolbar />
		<OverlayLayer />
		{#if annotakitState.showOutputDialog}
			<OutputDialog {onOutput} />
		{/if}
	</Tooltip.Provider>
{/if}
