<script lang="ts">
	import { Tooltip } from 'bits-ui';
	import { cubicOut } from 'svelte/easing';
	import type { TransitionConfig } from 'svelte/transition';
	import { annotakitState } from '../state.svelte.js';
	import type { OutputFormat } from '../types.js';
	import { generateMarkdown, copyToClipboard } from '../core/output.js';

	const COLLAPSED_WIDTH = 40;
	const COMPACT_WIDTH = 272;
	const EXPANDED_WIDTH = 320;

	let isExpanded = $derived(annotakitState.activeAnnotation !== null);
	let targetWidth = $derived(isExpanded ? EXPANDED_WIDTH : COMPACT_WIDTH);

	function telescopeIn(node: HTMLElement, { duration = 250, easing = cubicOut }: { duration?: number; easing?: (t: number) => number } = {}): TransitionConfig {
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

	const formatOptions: { value: OutputFormat; label: string }[] = [
		{ value: 'compact', label: 'Compact' },
		{ value: 'standard', label: 'Standard' },
		{ value: 'detailed', label: 'Detailed' }
	];

	let showSettings = $state(false);

	async function handleCopy() {
		const md = generateMarkdown(annotakitState.annotations, annotakitState.outputFormat);
		const ok = await copyToClipboard(md);
		if (ok) {
			annotakitState.copyFeedback = true;
			setTimeout(() => (annotakitState.copyFeedback = false), 1500);
		}
	}
</script>

{#if !annotakitState.minimized}
	<!-- Settings panel (above toolbar) -->
	{#if showSettings}
		<div
			data-annotakit="settings"
			class="pointer-events-auto fixed right-2 bottom-14 z-[99999] flex w-80 flex-col rounded-xl border border-annotakit-border bg-annotakit-surface shadow-annotakit dark:border-annotakit-border-dark dark:bg-annotakit-surface-dark"
		>
			<div class="flex shrink-0 items-center justify-between border-b border-annotakit-border px-3 py-2 dark:border-annotakit-border-dark">
				<span class="text-xs font-medium text-annotakit-text dark:text-annotakit-text-dark">Settings</span>
				<button
					class="text-annotakit-text/50 transition-colors hover:text-annotakit-text dark:text-annotakit-text-dark/50 dark:hover:text-annotakit-text-dark"
					onclick={() => (showSettings = false)}
					title="Close settings"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
				</button>
			</div>

			<div class="space-y-2 p-3">
				<!-- Output format -->
				<div>
					<div class="mb-1 text-[10px] font-medium uppercase tracking-wider text-annotakit-text/50 dark:text-annotakit-text-dark/50">Output format</div>
					<div class="flex gap-1">
						{#each formatOptions as fmt}
							<button
								class="rounded-lg px-2.5 py-1 text-xs transition-colors {annotakitState.outputFormat === fmt.value
									? 'bg-annotakit-primary text-white'
									: 'text-annotakit-text/70 hover:bg-annotakit-primary/10 hover:text-annotakit-text dark:text-annotakit-text-dark/70 dark:hover:text-annotakit-text-dark'}"
								onclick={() => (annotakitState.outputFormat = fmt.value)}
							>
								{fmt.label}
							</button>
						{/each}
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- Toolbar -->
	<div
		data-annotakit="toolbar"
		class="fixed right-2 bottom-2 z-[99999] flex select-none items-center gap-1 rounded-xl border border-annotakit-border bg-annotakit-surface px-2 py-1.5 shadow-annotakit transition-[width] duration-200 ease-out dark:border-annotakit-border-dark dark:bg-annotakit-surface-dark"
		style="width: {targetWidth}px;"
		role="toolbar"
		tabindex="0"
		aria-label="Annotakit toolbar"
		in:telescopeIn
		out:telescopeOut
	>
		<!-- Left: Output button -->
		<div class="flex shrink-0 items-center gap-1">
			<Tooltip.Root delayDuration={300}>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<button
							{...props}
							class="relative rounded-lg px-2.5 py-1.5 text-xs font-medium text-annotakit-text/70 transition-colors hover:bg-annotakit-primary/10 hover:text-annotakit-text dark:text-annotakit-text-dark/70 dark:hover:text-annotakit-text-dark"
							onclick={() => (annotakitState.showOutputDialog = true)}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
							{#if annotakitState.annotationCount > 0}
								<span class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-sm bg-annotakit-primary text-[10px] font-bold text-white">
									{annotakitState.annotationCount}
								</span>
							{/if}
						</button>
					{/snippet}
				</Tooltip.Trigger>
				<Tooltip.Content
					class="z-[100000] rounded-lg bg-annotakit-text px-2 py-1 text-xs text-white shadow-lg dark:bg-annotakit-text-dark dark:text-annotakit-text"
					sideOffset={6}
				>
					Output ({annotakitState.annotationCount})
				</Tooltip.Content>
			</Tooltip.Root>

			<div class="mx-0.5 h-5 w-px bg-annotakit-border dark:bg-annotakit-border-dark"></div>
		</div>

		<!-- Center: Freeze | Edit | Copy | Delete | Settings (left to right) -->
		<div class="flex flex-1 items-center justify-evenly">
			<!-- Freeze animations (leftmost) -->
			<Tooltip.Root delayDuration={300}>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<button
							{...props}
							class="rounded-lg px-2 py-1.5 transition-colors {annotakitState.frozen
								? 'bg-annotakit-warning/20 text-annotakit-warning'
								: 'text-annotakit-text/50 hover:bg-annotakit-primary/10 hover:text-annotakit-text dark:text-annotakit-text-dark/50 dark:hover:text-annotakit-text-dark'}"
							onclick={() => (annotakitState.frozen = !annotakitState.frozen)}
						>
							{#if annotakitState.frozen}
								<!-- Play icon (filled) -->
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="6 3 20 12 6 21 6 3"/></svg>
							{:else}
								<!-- Pause icon (filled) -->
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/></svg>
							{/if}
						</button>
					{/snippet}
				</Tooltip.Trigger>
				<Tooltip.Content
					class="z-[100000] rounded-lg bg-annotakit-text px-2 py-1 text-xs text-white shadow-lg dark:bg-annotakit-text-dark dark:text-annotakit-text"
					sideOffset={6}
				>
					{annotakitState.frozen ? 'Resume animations' : 'Freeze animations'}
				</Tooltip.Content>
			</Tooltip.Root>

			<!-- Edit toggle -->
			<Tooltip.Root delayDuration={300}>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<button
							{...props}
							class="rounded-lg px-2 py-1.5 transition-colors {annotakitState.active
								? 'bg-annotakit-primary text-white'
								: 'text-annotakit-text/50 hover:bg-annotakit-primary/10 hover:text-annotakit-text dark:text-annotakit-text-dark/50 dark:hover:text-annotakit-text-dark'}"
							onclick={() => annotakitState.toggleActive()}
						>
							<!-- Pencil icon -->
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
						</button>
					{/snippet}
				</Tooltip.Trigger>
				<Tooltip.Content
					class="z-[100000] rounded-lg bg-annotakit-text px-2 py-1 text-xs text-white shadow-lg dark:bg-annotakit-text-dark dark:text-annotakit-text"
					sideOffset={6}
				>
					{annotakitState.active ? 'Deactivate' : 'Activate'}
				</Tooltip.Content>
			</Tooltip.Root>

			<!-- Copy -->
			<Tooltip.Root delayDuration={300}>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<button
							{...props}
							class="rounded-lg px-2 py-1.5 transition-colors {annotakitState.annotationCount > 0
								? 'text-annotakit-text/50 hover:bg-annotakit-primary/10 hover:text-annotakit-text dark:text-annotakit-text-dark/50 dark:hover:text-annotakit-text-dark'
								: 'cursor-default text-annotakit-text/20 dark:text-annotakit-text-dark/20'}"
							onclick={handleCopy}
							disabled={annotakitState.annotationCount === 0}
						>
							{#if annotakitState.copyFeedback}
								<!-- Check icon -->
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
							{:else}
								<!-- Copy (two squares) icon -->
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
							{/if}
						</button>
					{/snippet}
				</Tooltip.Trigger>
				<Tooltip.Content
					class="z-[100000] rounded-lg bg-annotakit-text px-2 py-1 text-xs text-white shadow-lg dark:bg-annotakit-text-dark dark:text-annotakit-text"
					sideOffset={6}
				>
					{annotakitState.copyFeedback ? 'Copied!' : 'Copy markdown'}
				</Tooltip.Content>
			</Tooltip.Root>

			<!-- Delete -->
			<Tooltip.Root delayDuration={300}>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<button
							{...props}
							class="rounded-lg px-2 py-1.5 transition-colors {annotakitState.annotationCount > 0
								? 'text-annotakit-text/50 hover:bg-annotakit-danger/10 hover:text-annotakit-danger dark:text-annotakit-text-dark/50 dark:hover:text-annotakit-danger'
								: 'cursor-default text-annotakit-text/20 dark:text-annotakit-text-dark/20'}"
							onclick={() => annotakitState.clearAll()}
							disabled={annotakitState.annotationCount === 0}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
						</button>
					{/snippet}
				</Tooltip.Trigger>
				<Tooltip.Content
					class="z-[100000] rounded-lg bg-annotakit-text px-2 py-1 text-xs text-white shadow-lg dark:bg-annotakit-text-dark dark:text-annotakit-text"
					sideOffset={6}
				>
					Clear all ({annotakitState.annotationCount})
				</Tooltip.Content>
			</Tooltip.Root>

			<!-- Settings (rightmost) -->
			<Tooltip.Root delayDuration={300}>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<button
							{...props}
							class="rounded-lg px-2 py-1.5 text-annotakit-text/50 transition-colors hover:bg-annotakit-primary/10 hover:text-annotakit-text dark:text-annotakit-text-dark/50 dark:hover:text-annotakit-text-dark {showSettings ? 'bg-annotakit-primary/10 text-annotakit-text dark:text-annotakit-text-dark' : ''}"
							onclick={() => (showSettings = !showSettings)}
						>
							<!-- Gear icon -->
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
						</button>
					{/snippet}
				</Tooltip.Trigger>
				<Tooltip.Content
					class="z-[100000] rounded-lg bg-annotakit-text px-2 py-1 text-xs text-white shadow-lg dark:bg-annotakit-text-dark dark:text-annotakit-text"
					sideOffset={6}
				>
					Settings
				</Tooltip.Content>
			</Tooltip.Root>
		</div>

		<!-- Right: Close -->
		<div class="flex shrink-0 items-center gap-1">
			<div class="mx-0.5 h-5 w-px bg-annotakit-border dark:bg-annotakit-border-dark"></div>

			<button
				class="rounded-lg px-2 py-1.5 text-annotakit-text/50 transition-colors hover:bg-annotakit-danger/10 hover:text-annotakit-danger dark:text-annotakit-text-dark/50 dark:hover:text-annotakit-danger"
				onclick={() => annotakitState.toggleMinimized()}
				title="Collapse toolbar"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
			</button>
		</div>
	</div>
{:else}
	<!-- Minimized state: square button with rounded corners -->
	<button
		data-annotakit="toolbar-minimized"
		class="fixed right-2 bottom-2 z-[99999] flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-annotakit-border bg-annotakit-surface text-annotakit-text/50 shadow-annotakit transition-colors hover:bg-annotakit-primary/10 hover:text-annotakit-primary dark:border-annotakit-border-dark dark:bg-annotakit-surface-dark dark:text-annotakit-text-dark/50 dark:hover:text-annotakit-primary"
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
