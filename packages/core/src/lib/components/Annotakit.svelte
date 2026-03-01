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
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.body.classList.remove('annotakit-active');
			document.documentElement.removeAttribute('data-annotakit-theme');
			document.getElementById('annotakit-freeze-styles')?.remove();
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
