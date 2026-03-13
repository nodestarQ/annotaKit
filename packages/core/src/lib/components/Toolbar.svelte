<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import type { TransitionConfig } from 'svelte/transition';
	import { annotakitState } from '../state.svelte.js';
	import { generateMarkdown, copyToClipboard, FORMAT_OPTIONS } from '../core/output.js';
	import { COLOR_OPTIONS } from '../core/colors.js';
	import Icon from './Icon.svelte';
	import TooltipButton from './TooltipButton.svelte';

	const COLLAPSED_WIDTH = 40;
	const COMPACT_WIDTH = 272;
	const EXPANDED_WIDTH = 320;

	// Reusable button variant classes
	const BTN = 'text-annotakit-text/50 hover:bg-annotakit-text hover:text-annotakit-surface';
	const BTN_ACTIVE = 'bg-annotakit-text text-annotakit-surface';
	const BTN_DISABLED = 'cursor-default text-annotakit-text/15';
	const BTN_DANGER = 'text-annotakit-text/50 hover:bg-annotakit-danger hover:text-white';

	let showSettings = $state(false);
	let showClearConfirm = $state(false);

	function closePanels() {
		showSettings = false;
		showClearConfirm = false;
	}

	// Close panels when user starts annotating
	$effect(() => {
		if (annotakitState.activeAnnotation) closePanels();
	});

	let isExpanded = $derived(annotakitState.activeAnnotation !== null || showSettings || showClearConfirm);
	let targetWidth = $derived(isExpanded ? EXPANDED_WIDTH : COMPACT_WIDTH);

	// Position classes derived from state
	let positionClasses = $derived.by(() => {
		const [v, h] = annotakitState.position.split('-');
		const vert = v === 'top' ? 'top-2' : 'bottom-2';
		const horiz = h === 'left' ? 'left-2' : h === 'right' ? 'right-2' : 'left-1/2 -translate-x-1/2';
		return `${vert} ${horiz}`;
	});

	function telescopeIn(_node: HTMLElement, { duration = 250, easing = cubicOut }: { duration?: number; easing?: (t: number) => number } = {}): TransitionConfig {
		const target = isExpanded ? EXPANDED_WIDTH : COMPACT_WIDTH;
		return {
			duration,
			easing,
			css: (t: number) => {
				const width = COLLAPSED_WIDTH + (target - COLLAPSED_WIDTH) * t;
				return `width: ${width}px; overflow: hidden;`;
			}
		};
	}

	function telescopeOut(node: HTMLElement, { duration = 200, easing = cubicOut }: { duration?: number; easing?: (t: number) => number } = {}): TransitionConfig {
		const current = node.getBoundingClientRect().width;
		return {
			duration,
			easing,
			css: (t: number) => {
				const width = COLLAPSED_WIDTH + (current - COLLAPSED_WIDTH) * t;
				return `width: ${width}px; overflow: hidden;`;
			}
		};
	}

	async function handleCopy() {
		const md = generateMarkdown(annotakitState.annotations, annotakitState.outputFormat);
		const ok = await copyToClipboard(md);
		if (ok) {
			annotakitState.copyFeedback = true;
			setTimeout(() => (annotakitState.copyFeedback = false), 1500);
			if (annotakitState.autoClearAfterCopy) annotakitState.clearAll();
		}
	}
</script>

{#if !annotakitState.minimized}
	<!-- Settings panel (above/below toolbar) -->
	{#if showSettings}
		<div
			data-annotakit="settings"
			class="pointer-events-auto fixed {annotakitState.panelPositionClasses} z-[99999] flex w-80 flex-col rounded-lg border-2 border-annotakit-stroke bg-annotakit-surface shadow-annotakit"
		>
			<div class="flex shrink-0 items-center justify-between border-b-2 border-annotakit-stroke px-3 py-2">
				<span class="text-xs font-medium text-annotakit-text">Settings</span>
				<button
					class="rounded p-1 {BTN}"
					onclick={() => (showSettings = false)}
					title="Close settings"
				>
					<Icon name="x" />
				</button>
			</div>

			<div class="space-y-2 p-3">
				{#if annotakitState.mcpServerUrl}
					<div class="flex items-center justify-between">
						<div class="text-[10px] font-medium uppercase tracking-wider text-annotakit-text/50">MCP Server</div>
						<div class="flex items-center gap-1.5">
							<span class="text-[10px] text-annotakit-text/50">{annotakitState.mcpConnected ? 'Connected' : 'Disconnected'}</span>
							<span
								class="h-2 w-2 rounded-full {annotakitState.mcpConnected ? 'bg-green-500' : 'bg-annotakit-text/25'}"
							></span>
						</div>
					</div>

					<div class="h-px bg-annotakit-text/10"></div>
				{/if}

				<div>
					<div class="mb-1 text-[10px] font-medium uppercase tracking-wider text-annotakit-text/50">Output format</div>
					<div class="flex gap-2">
						{#each FORMAT_OPTIONS as fmt}
							<button
								class="flex-1 rounded border-2 border-annotakit-stroke px-3 py-1.5 text-xs font-medium transition-all duration-300 ease-out {annotakitState.outputFormat === fmt.value
									? BTN_ACTIVE
									: 'text-annotakit-text/70 hover:bg-annotakit-text hover:text-annotakit-surface'}"
								onclick={() => annotakitState.setOutputFormat(fmt.value)}
							>
								{fmt.label}
							</button>
						{/each}
					</div>
				</div>

				<div class="h-px bg-annotakit-text/10"></div>

				<div>
					<div class="mb-1 text-[10px] font-medium uppercase tracking-wider text-annotakit-text/50">Highlight color</div>
					<div class="flex gap-2">
						{#each COLOR_OPTIONS as color}
							<button
								class="h-6 flex-1 rounded-md border-2 transition-all duration-300 ease-out {annotakitState.highlightColor === color.value
									? 'border-annotakit-text scale-110'
									: 'border-transparent hover:scale-110'}"
								style="background-color: {color.base};"
								onclick={() => (annotakitState.highlightColor = color.value)}
								title={color.label}
							></button>
						{/each}
					</div>
				</div>

				<div class="h-px bg-annotakit-text/10"></div>

				<label class="flex cursor-pointer items-center justify-between">
					<span class="text-[10px] font-medium uppercase tracking-wider text-annotakit-text/50">Block page interactions</span>
					<button
						role="switch"
						aria-checked={annotakitState.blockInteractions}
						aria-label="Block page interactions"
						class="relative h-5 w-9 rounded-full border-2 border-annotakit-stroke transition-colors duration-300 ease-out {annotakitState.blockInteractions
							? 'bg-annotakit-primary'
							: 'bg-annotakit-text/15'}"
						onclick={() => (annotakitState.blockInteractions = !annotakitState.blockInteractions)}
					>
						<span
							class="absolute top-0.5 left-0.5 h-3 w-3 rounded-full bg-white transition-transform duration-300 ease-out {annotakitState.blockInteractions ? 'translate-x-4' : ''}"
						></span>
					</button>
				</label>

				<div class="h-px bg-annotakit-text/10"></div>

				<label class="flex cursor-pointer items-center justify-between">
					<span class="text-[10px] font-medium uppercase tracking-wider text-annotakit-text/50">Auto-clear after copy</span>
					<button
						role="switch"
						aria-checked={annotakitState.autoClearAfterCopy}
						aria-label="Clear annotations after export"
						class="relative h-5 w-9 rounded-full border-2 border-annotakit-stroke transition-colors duration-300 ease-out {annotakitState.autoClearAfterCopy
							? 'bg-annotakit-primary'
							: 'bg-annotakit-text/15'}"
						onclick={() => (annotakitState.autoClearAfterCopy = !annotakitState.autoClearAfterCopy)}
					>
						<span
							class="absolute top-0.5 left-0.5 h-3 w-3 rounded-full bg-white transition-transform duration-300 ease-out {annotakitState.autoClearAfterCopy ? 'translate-x-4' : ''}"
						></span>
					</button>
				</label>
			</div>
		</div>
	{/if}

	<!-- Clear confirmation card -->
	{#if showClearConfirm}
		<div
			data-annotakit="clear-confirm"
			class="pointer-events-auto fixed {annotakitState.panelPositionClasses} z-[99999] flex w-80 flex-col rounded-lg border-2 border-annotakit-stroke bg-annotakit-surface shadow-annotakit"
		>
			<div class="flex shrink-0 items-center justify-between border-b-2 border-annotakit-stroke px-3 py-2">
				<span class="text-xs font-medium text-annotakit-text">Clear annotations?</span>
				<button
					class="rounded p-1 {BTN}"
					onclick={() => (showClearConfirm = false)}
					title="Close"
				>
					<Icon name="x" />
				</button>
			</div>

			<div class="space-y-2 p-3">
				<p class="text-xs text-annotakit-text/70">
					This will remove all <strong class="text-annotakit-text">{annotakitState.annotationCount}</strong> annotations.
				</p>
				<div class="flex gap-2">
					<button
						class="flex-1 rounded border-2 border-annotakit-stroke px-3 py-1.5 text-xs font-medium text-annotakit-text/70 transition-all duration-300 ease-out hover:bg-annotakit-text hover:text-annotakit-surface"
						onclick={() => (showClearConfirm = false)}
					>
						Cancel
					</button>
					<button
						class="flex-1 rounded border-2 border-annotakit-stroke bg-annotakit-danger px-3 py-1.5 text-xs font-medium text-white transition-all duration-300 ease-out hover:opacity-80"
						onclick={() => { annotakitState.clearAll(); showClearConfirm = false; }}
					>
						Clear all
					</button>
				</div>
			</div>
		</div>
	{/if}

	<!-- Toolbar -->
	<div
		data-annotakit="toolbar"
		class="fixed {positionClasses} z-[99999] flex select-none items-center gap-1 rounded-lg border-2 border-annotakit-stroke bg-annotakit-surface px-2 py-1.5 shadow-annotakit transition-[width] duration-200 ease-out"
		style="width: {targetWidth}px;"
		role="toolbar"
		tabindex="0"
		aria-label="Annotakit toolbar"
		in:telescopeIn
		out:telescopeOut
	>
		<!-- Left: Output button -->
		<div class="flex shrink-0 items-center gap-1">
			<TooltipButton
				label="Output ({annotakitState.annotationCount})"
				class="relative text-xs font-medium {BTN}"
				onclick={() => (annotakitState.showOutputDialog = true)}
			>
				<Icon name="file" />
				{#if annotakitState.annotationCount > 0}
					<span class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-sm bg-annotakit-primary text-[10px] font-bold text-white">
						{annotakitState.annotationCount}
					</span>
				{/if}
			</TooltipButton>

			<div class="mx-0.5 h-5 w-px bg-annotakit-text/20"></div>
		</div>

		<!-- Center: Freeze | Edit | Copy | Delete | Settings -->
		<div class="flex flex-1 items-center justify-evenly">
			<TooltipButton
				label={annotakitState.frozen ? 'Resume animations' : 'Freeze animations'}
				class={annotakitState.frozen ? 'bg-annotakit-warning text-white' : BTN}
				onclick={() => (annotakitState.frozen = !annotakitState.frozen)}
			>
				<Icon name={annotakitState.frozen ? 'play' : 'pause'} />
			</TooltipButton>

			<TooltipButton
				label={annotakitState.visible ? 'Hide annotations' : 'Show annotations'}
				class={annotakitState.visible ? BTN_ACTIVE : BTN}
				onclick={() => annotakitState.toggleVisible()}
			>
				<Icon name={annotakitState.visible ? 'eye' : 'eye-off'} />
			</TooltipButton>

			<TooltipButton
				label={annotakitState.copyFeedback ? 'Copied!' : 'Copy markdown'}
				class={annotakitState.annotationCount > 0 ? BTN : BTN_DISABLED}
				onclick={handleCopy}
				disabled={annotakitState.annotationCount === 0}
			>
				<Icon name={annotakitState.copyFeedback ? 'check' : 'copy'} />
			</TooltipButton>

			<TooltipButton
				label="Clear all ({annotakitState.annotationCount})"
				class={annotakitState.annotationCount > 0 ? BTN_DANGER : BTN_DISABLED}
				onclick={() => { closePanels(); showClearConfirm = true; }}
				disabled={annotakitState.annotationCount === 0}
			>
				<Icon name="trash" />
			</TooltipButton>

			<TooltipButton
				label="Settings"
				class={showSettings ? BTN_ACTIVE : BTN}
				onclick={() => { const open = !showSettings; closePanels(); showSettings = open; }}
			>
				<Icon name="gear" />
			</TooltipButton>
		</div>

		<!-- Right: Close -->
		<div class="flex shrink-0 items-center gap-1">
			<div class="mx-0.5 h-5 w-px bg-annotakit-text/20"></div>

			<button
				class="rounded p-1.5 transition-all duration-300 ease-out {BTN_DANGER}"
				onclick={() => annotakitState.toggleMinimized()}
				title="Collapse toolbar"
			>
				<Icon name="chevron-right" />
			</button>
		</div>
	</div>
{:else}
	<!-- Minimized state -->
	<button
		data-annotakit="toolbar-minimized"
		class="fixed {positionClasses} z-[99999] flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border-2 border-annotakit-stroke bg-annotakit-surface text-annotakit-text/50 shadow-annotakit transition-all duration-300 ease-out hover:bg-annotakit-text hover:text-annotakit-surface"
		onclick={() => annotakitState.toggleMinimized()}
		title="Restore Annotakit toolbar"
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice"><defs><pattern id="annotakit-icon-pattern" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="translate(0 0) scale(40) rotate(0)" shape-rendering="crispEdges"><rect width="1" height="1" x="4" y="2" fill="currentColor"/><rect width="1" height="1" x="5" y="2" fill="currentColor"/><rect width="1" height="1" x="6" y="2" fill="currentColor"/><rect width="1" height="1" x="7" y="2" fill="currentColor"/><rect width="1" height="1" x="8" y="2" fill="currentColor"/><rect width="1" height="1" x="9" y="2" fill="currentColor"/><rect width="1" height="1" x="10" y="2" fill="currentColor"/><rect width="1" height="1" x="11" y="2" fill="currentColor"/><rect width="1" height="1" x="12" y="2" fill="currentColor"/><rect width="1" height="1" x="13" y="2" fill="currentColor"/><rect width="1" height="1" x="14" y="2" fill="currentColor"/><rect width="1" height="1" x="15" y="2" fill="currentColor"/><rect width="1" height="1" x="4" y="3" fill="currentColor"/><rect width="1" height="1" x="5" y="3" fill="currentColor"/><rect width="1" height="1" x="6" y="3" fill="currentColor"/><rect width="1" height="1" x="7" y="3" fill="currentColor"/><rect width="1" height="1" x="8" y="3" fill="currentColor"/><rect width="1" height="1" x="9" y="3" fill="currentColor"/><rect width="1" height="1" x="10" y="3" fill="currentColor"/><rect width="1" height="1" x="11" y="3" fill="currentColor"/><rect width="1" height="1" x="12" y="3" fill="currentColor"/><rect width="1" height="1" x="13" y="3" fill="currentColor"/><rect width="1" height="1" x="14" y="3" fill="currentColor"/><rect width="1" height="1" x="15" y="3" fill="currentColor"/><rect width="1" height="1" x="4" y="4" fill="currentColor"/><rect width="1" height="1" x="5" y="4" fill="currentColor"/><rect width="1" height="1" x="6" y="4" fill="currentColor"/><rect width="1" height="1" x="7" y="4" fill="currentColor"/><rect width="1" height="1" x="8" y="4" fill="currentColor"/><rect width="1" height="1" x="9" y="4" fill="currentColor"/><rect width="1" height="1" x="10" y="4" fill="currentColor"/><rect width="1" height="1" x="11" y="4" fill="currentColor"/><rect width="1" height="1" x="12" y="4" fill="currentColor"/><rect width="1" height="1" x="13" y="4" fill="currentColor"/><rect width="1" height="1" x="14" y="4" fill="currentColor"/><rect width="1" height="1" x="15" y="4" fill="currentColor"/><rect width="1" height="1" x="3" y="5" fill="currentColor"/><rect width="1" height="1" x="4" y="5" fill="currentColor"/><rect width="1" height="1" x="5" y="5" fill="currentColor"/><rect width="1" height="1" x="6" y="5" fill="currentColor"/><rect width="1" height="1" x="7" y="5" fill="currentColor"/><rect width="1" height="1" x="8" y="5" fill="currentColor"/><rect width="1" height="1" x="9" y="5" fill="currentColor"/><rect width="1" height="1" x="10" y="5" fill="currentColor"/><rect width="1" height="1" x="11" y="5" fill="currentColor"/><rect width="1" height="1" x="12" y="5" fill="currentColor"/><rect width="1" height="1" x="13" y="5" fill="currentColor"/><rect width="1" height="1" x="14" y="5" fill="currentColor"/><rect width="1" height="1" x="15" y="5" fill="currentColor"/><rect width="1" height="1" x="16" y="5" fill="currentColor"/><rect width="1" height="1" x="3" y="6" fill="currentColor"/><rect width="1" height="1" x="4" y="6" fill="currentColor"/><rect width="1" height="1" x="5" y="6" fill="currentColor"/><rect width="1" height="1" x="6" y="6" fill="currentColor"/><rect width="1" height="1" x="7" y="6" fill="currentColor"/><rect width="1" height="1" x="8" y="6" fill="currentColor"/><rect width="1" height="1" x="9" y="6" fill="currentColor"/><rect width="1" height="1" x="10" y="6" fill="currentColor"/><rect width="1" height="1" x="11" y="6" fill="currentColor"/><rect width="1" height="1" x="12" y="6" fill="currentColor"/><rect width="1" height="1" x="13" y="6" fill="currentColor"/><rect width="1" height="1" x="14" y="6" fill="currentColor"/><rect width="1" height="1" x="15" y="6" fill="currentColor"/><rect width="1" height="1" x="16" y="6" fill="currentColor"/><rect width="1" height="1" x="3" y="7" fill="currentColor"/><rect width="1" height="1" x="4" y="7" fill="currentColor"/><rect width="1" height="1" x="15" y="7" fill="currentColor"/><rect width="1" height="1" x="16" y="7" fill="currentColor"/><rect width="1" height="1" x="3" y="8" fill="currentColor"/><rect width="1" height="1" x="4" y="8" fill="currentColor"/><rect width="1" height="1" x="15" y="8" fill="currentColor"/><rect width="1" height="1" x="16" y="8" fill="currentColor"/><rect width="1" height="1" x="3" y="9" fill="currentColor"/><rect width="1" height="1" x="4" y="9" fill="currentColor"/><rect width="1" height="1" x="6" y="9" fill="currentColor"/><rect width="1" height="1" x="7" y="9" fill="currentColor"/><rect width="1" height="1" x="8" y="9" fill="currentColor"/><rect width="1" height="1" x="11" y="9" fill="currentColor"/><rect width="1" height="1" x="12" y="9" fill="currentColor"/><rect width="1" height="1" x="13" y="9" fill="currentColor"/><rect width="1" height="1" x="15" y="9" fill="currentColor"/><rect width="1" height="1" x="16" y="9" fill="currentColor"/><rect width="1" height="1" x="2" y="10" fill="currentColor"/><rect width="1" height="1" x="3" y="10" fill="currentColor"/><rect width="1" height="1" x="4" y="10" fill="currentColor"/><rect width="1" height="1" x="6" y="10" fill="currentColor"/><rect width="1" height="1" x="7" y="10" fill="currentColor"/><rect width="1" height="1" x="8" y="10" fill="currentColor"/><rect width="1" height="1" x="11" y="10" fill="currentColor"/><rect width="1" height="1" x="12" y="10" fill="currentColor"/><rect width="1" height="1" x="13" y="10" fill="currentColor"/><rect width="1" height="1" x="15" y="10" fill="currentColor"/><rect width="1" height="1" x="16" y="10" fill="currentColor"/><rect width="1" height="1" x="17" y="10" fill="currentColor"/><rect width="1" height="1" x="2" y="11" fill="currentColor"/><rect width="1" height="1" x="4" y="11" fill="currentColor"/><rect width="1" height="1" x="6" y="11" fill="currentColor"/><rect width="1" height="1" x="7" y="11" fill="currentColor"/><rect width="1" height="1" x="8" y="11" fill="currentColor"/><rect width="1" height="1" x="11" y="11" fill="currentColor"/><rect width="1" height="1" x="12" y="11" fill="currentColor"/><rect width="1" height="1" x="13" y="11" fill="currentColor"/><rect width="1" height="1" x="15" y="11" fill="currentColor"/><rect width="1" height="1" x="17" y="11" fill="currentColor"/><rect width="1" height="1" x="2" y="12" fill="currentColor"/><rect width="1" height="1" x="4" y="12" fill="currentColor"/><rect width="1" height="1" x="15" y="12" fill="currentColor"/><rect width="1" height="1" x="17" y="12" fill="currentColor"/><rect width="1" height="1" x="2" y="13" fill="currentColor"/><rect width="1" height="1" x="3" y="13" fill="currentColor"/><rect width="1" height="1" x="4" y="13" fill="currentColor"/><rect width="1" height="1" x="7" y="13" fill="currentColor"/><rect width="1" height="1" x="8" y="13" fill="currentColor"/><rect width="1" height="1" x="9" y="13" fill="currentColor"/><rect width="1" height="1" x="10" y="13" fill="currentColor"/><rect width="1" height="1" x="11" y="13" fill="currentColor"/><rect width="1" height="1" x="12" y="13" fill="currentColor"/><rect width="1" height="1" x="15" y="13" fill="currentColor"/><rect width="1" height="1" x="16" y="13" fill="currentColor"/><rect width="1" height="1" x="17" y="13" fill="currentColor"/><rect width="1" height="1" x="4" y="14" fill="currentColor"/><rect width="1" height="1" x="7" y="14" fill="currentColor"/><rect width="1" height="1" x="8" y="14" fill="currentColor"/><rect width="1" height="1" x="9" y="14" fill="currentColor"/><rect width="1" height="1" x="10" y="14" fill="currentColor"/><rect width="1" height="1" x="11" y="14" fill="currentColor"/><rect width="1" height="1" x="12" y="14" fill="currentColor"/><rect width="1" height="1" x="15" y="14" fill="currentColor"/><rect width="1" height="1" x="4" y="15" fill="currentColor"/><rect width="1" height="1" x="7" y="15" fill="currentColor"/><rect width="1" height="1" x="8" y="15" fill="currentColor"/><rect width="1" height="1" x="9" y="15" fill="currentColor"/><rect width="1" height="1" x="10" y="15" fill="currentColor"/><rect width="1" height="1" x="11" y="15" fill="currentColor"/><rect width="1" height="1" x="12" y="15" fill="currentColor"/><rect width="1" height="1" x="15" y="15" fill="currentColor"/><rect width="1" height="1" x="4" y="16" fill="currentColor"/><rect width="1" height="1" x="15" y="16" fill="currentColor"/><rect width="1" height="1" x="4" y="17" fill="currentColor"/><rect width="1" height="1" x="5" y="17" fill="currentColor"/><rect width="1" height="1" x="6" y="17" fill="currentColor"/><rect width="1" height="1" x="7" y="17" fill="currentColor"/><rect width="1" height="1" x="8" y="17" fill="currentColor"/><rect width="1" height="1" x="9" y="17" fill="currentColor"/><rect width="1" height="1" x="10" y="17" fill="currentColor"/><rect width="1" height="1" x="11" y="17" fill="currentColor"/><rect width="1" height="1" x="12" y="17" fill="currentColor"/><rect width="1" height="1" x="13" y="17" fill="currentColor"/><rect width="1" height="1" x="14" y="17" fill="currentColor"/><rect width="1" height="1" x="15" y="17" fill="currentColor"/></pattern></defs><rect width="100%" height="100%" fill="url(#annotakit-icon-pattern)"/></svg>
		{#if annotakitState.annotationCount > 0}
			<span class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-sm bg-annotakit-primary text-[10px] font-bold text-white">
				{annotakitState.annotationCount}
			</span>
		{/if}
	</button>
{/if}
