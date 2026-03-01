<script lang="ts">
	import { Tooltip, DropdownMenu } from 'bits-ui';
	import { annotakitState } from '../state.svelte.js';
	import type { AnnotakitMode, OutputFormat } from '../types.js';

	interface ModeButton {
		mode: AnnotakitMode;
		label: string;
		icon: string;
		shortcut: string;
	}

	const modeButtons: ModeButton[] = [
		{ mode: 'inspect', label: 'Inspect', icon: 'inspect', shortcut: 'Ctrl+Shift+I' },
		{ mode: 'annotate', label: 'Annotate', icon: 'annotate', shortcut: 'Ctrl+Shift+A' },
		{ mode: 'select', label: 'Select Text', icon: 'select', shortcut: '' }
	];

	const formatOptions: { value: OutputFormat; label: string }[] = [
		{ value: 'compact', label: 'Compact' },
		{ value: 'standard', label: 'Standard' },
		{ value: 'detailed', label: 'Detailed' }
	];

	// Dragging
	let dragOffset = $state({ x: 0, y: 0 });

	function handlePointerDown(e: PointerEvent) {
		if ((e.target as HTMLElement).closest('[data-no-drag]')) return;
		annotakitState.isDragging = true;
		dragOffset = {
			x: e.clientX - annotakitState.toolbarPosition.x,
			y: e.clientY - annotakitState.toolbarPosition.y
		};
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	}

	function handlePointerMove(e: PointerEvent) {
		if (!annotakitState.isDragging) return;
		const margin = 8;
		const x = Math.max(margin, Math.min(window.innerWidth - 320 - margin, e.clientX - dragOffset.x));
		const y = Math.max(margin, Math.min(window.innerHeight - 48 - margin, e.clientY - dragOffset.y));
		annotakitState.toolbarPosition = { x, y };
	}

	function handlePointerUp() {
		annotakitState.isDragging = false;
	}

	function toggleMode(mode: AnnotakitMode) {
		annotakitState.setMode(annotakitState.mode === mode ? 'idle' : mode);
	}
</script>

{#if !annotakitState.minimized}
	<div
		data-annotakit="toolbar"
		class="fixed z-[99999] flex w-80 select-none items-center justify-between gap-1 rounded-xl border border-annotakit-border bg-annotakit-surface px-2 py-1.5 shadow-annotakit dark:border-annotakit-border-dark dark:bg-annotakit-surface-dark"
		style="left: {annotakitState.toolbarPosition.x}px; top: {annotakitState.toolbarPosition.y}px;"
		role="toolbar"
		tabindex="0"
		aria-label="Annotakit toolbar"
		onpointerdown={handlePointerDown}
		onpointermove={handlePointerMove}
		onpointerup={handlePointerUp}
	>
		<!-- Drag handle -->
		<div class="mr-1 flex cursor-grab items-center text-annotakit-text/30 active:cursor-grabbing dark:text-annotakit-text-dark/30">
			<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>
		</div>

		<!-- Mode buttons -->
		{#each modeButtons as btn}
			<Tooltip.Root delayDuration={300}>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<button
							{...props}
							data-no-drag
							class="rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors {annotakitState.mode === btn.mode
								? 'bg-annotakit-primary text-white'
								: 'text-annotakit-text/70 hover:bg-annotakit-primary/10 hover:text-annotakit-text dark:text-annotakit-text-dark/70 dark:hover:text-annotakit-text-dark'}"
							onclick={() => toggleMode(btn.mode)}
						>
							{#if btn.icon === 'inspect'}
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
							{:else if btn.icon === 'annotate'}
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/></svg>
							{:else}
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 6H3"/><path d="M21 12H8"/><path d="M21 18H8"/><path d="M3 12v6"/></svg>
							{/if}
						</button>
					{/snippet}
				</Tooltip.Trigger>
				<Tooltip.Content
					class="z-[100000] rounded-lg bg-annotakit-text px-2 py-1 text-xs text-white shadow-lg dark:bg-annotakit-text-dark dark:text-annotakit-text"
					sideOffset={6}
				>
					{btn.label}{#if btn.shortcut} ({btn.shortcut}){/if}
				</Tooltip.Content>
			</Tooltip.Root>
		{/each}

		<!-- Separator -->
		<div class="mx-0.5 h-5 w-px bg-annotakit-border dark:bg-annotakit-border-dark"></div>

		<!-- Annotation count + output button -->
		<Tooltip.Root delayDuration={300}>
			<Tooltip.Trigger>
				{#snippet child({ props })}
					<button
						{...props}
						data-no-drag
						class="relative rounded-lg px-2.5 py-1.5 text-xs font-medium text-annotakit-text/70 transition-colors hover:bg-annotakit-primary/10 hover:text-annotakit-text dark:text-annotakit-text-dark/70 dark:hover:text-annotakit-text-dark"
						onclick={() => (annotakitState.showOutputDialog = true)}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
						{#if annotakitState.annotationCount > 0}
							<span class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-annotakit-primary text-[10px] font-bold text-white">
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

		<!-- Settings menu -->
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<button
						{...props}
						data-no-drag
						class="rounded-lg px-2 py-1.5 text-annotakit-text/50 transition-colors hover:bg-annotakit-primary/10 hover:text-annotakit-text dark:text-annotakit-text-dark/50 dark:hover:text-annotakit-text-dark"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
					</button>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				data-no-drag
				class="z-[100000] min-w-44 rounded-xl border border-annotakit-border bg-annotakit-surface p-1 shadow-annotakit dark:border-annotakit-border-dark dark:bg-annotakit-surface-dark"
				sideOffset={6}
			>
				<DropdownMenu.Group>
					<DropdownMenu.GroupHeading class="px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-annotakit-text/40 dark:text-annotakit-text-dark/40">
						Output format
					</DropdownMenu.GroupHeading>
				</DropdownMenu.Group>
				<DropdownMenu.RadioGroup value={annotakitState.outputFormat} onValueChange={(v) => (annotakitState.outputFormat = v as OutputFormat)}>
					{#each formatOptions as fmt}
						<DropdownMenu.RadioItem
							value={fmt.value}
							class="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-annotakit-text/80 outline-none transition-colors hover:bg-annotakit-primary/10 data-[highlighted]:bg-annotakit-primary/10 dark:text-annotakit-text-dark/80"
						>
							{#snippet children({ checked })}
								<span class="flex h-3 w-3 items-center justify-center rounded-full border border-annotakit-border dark:border-annotakit-border-dark">
									{#if checked}
										<span class="h-1.5 w-1.5 rounded-full bg-annotakit-primary"></span>
									{/if}
								</span>
								{fmt.label}
							{/snippet}
						</DropdownMenu.RadioItem>
					{/each}
				</DropdownMenu.RadioGroup>

				<DropdownMenu.Separator class="my-1 h-px bg-annotakit-border dark:bg-annotakit-border-dark" />

				<DropdownMenu.Item
					class="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-annotakit-text/80 outline-none transition-colors hover:bg-annotakit-primary/10 data-[highlighted]:bg-annotakit-primary/10 dark:text-annotakit-text-dark/80"
					onclick={() => annotakitState.toggleMinimized()}
				>
					Minimize
				</DropdownMenu.Item>

				{#if annotakitState.annotationCount > 0}
					<DropdownMenu.Item
						class="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-annotakit-danger outline-none transition-colors hover:bg-annotakit-danger/10 data-[highlighted]:bg-annotakit-danger/10"
						onclick={() => annotakitState.clearAll()}
					>
						Clear all ({annotakitState.annotationCount})
					</DropdownMenu.Item>
				{/if}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
{:else}
	<!-- Minimized state: small floating button to restore -->
	<button
		data-annotakit="toolbar-minimized"
		class="fixed z-[99999] flex h-8 w-8 items-center justify-center rounded-full bg-annotakit-primary text-white shadow-annotakit transition-transform hover:scale-110"
		style="left: {annotakitState.toolbarPosition.x}px; top: {annotakitState.toolbarPosition.y}px;"
		onclick={() => annotakitState.toggleMinimized()}
		title="Restore Annotakit toolbar"
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/></svg>
	</button>
{/if}
