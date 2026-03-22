<script lang="ts">
	import { onMount } from 'svelte';
	import type { ExtensionSettings } from '../shared/messaging.js';
	import { loadSettings, saveSettings, isDomainDisabled } from '../shared/storage.js';

	let settings = $state<ExtensionSettings | null>(null);
	let currentHostname = $state('');
	let domainDisabled = $derived(
		settings ? isDomainDisabled(settings, currentHostname) : false
	);

	const positions = [
		{ value: 'top-left', label: 'Top Left' },
		{ value: 'top-center', label: 'Top Center' },
		{ value: 'top-right', label: 'Top Right' },
		{ value: 'bottom-left', label: 'Bottom Left' },
		{ value: 'bottom-center', label: 'Bottom Center' },
		{ value: 'bottom-right', label: 'Bottom Right' }
	] as const;

	const themes = [
		{ value: 'auto', label: 'Auto' },
		{ value: 'light', label: 'Light' },
		{ value: 'dark', label: 'Dark' }
	] as const;

	const colors = [
		{ value: 'green', label: 'Green', hex: '#4ade80' },
		{ value: 'blue', label: 'Blue', hex: '#60a5fa' },
		{ value: 'purple', label: 'Purple', hex: '#a78bfa' },
		{ value: 'red', label: 'Red', hex: '#f87171' },
		{ value: 'orange', label: 'Orange', hex: '#fb923c' },
		{ value: 'yellow', label: 'Yellow', hex: '#facc15' }
	] as const;

	const formats = [
		{ value: 'compact', label: 'Compact' },
		{ value: 'standard', label: 'Standard' },
		{ value: 'detailed', label: 'Detailed' }
	] as const;

	async function update(updates: Partial<ExtensionSettings>) {
		await saveSettings(updates);
		settings = await loadSettings();
	}

	async function toggleDomain() {
		if (!settings || !currentHostname) return;
		const domains = [...settings.disabledDomains];
		const idx = domains.indexOf(currentHostname);
		if (idx >= 0) {
			domains.splice(idx, 1);
		} else {
			domains.push(currentHostname);
		}
		await update({ disabledDomains: domains });
	}

	async function toggleGlobal() {
		if (!settings) return;
		await update({ enabled: !settings.enabled });
	}

	onMount(async () => {
		settings = await loadSettings();
		const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
		if (tab?.url) {
			try {
				currentHostname = new URL(tab.url).hostname;
			} catch { /* invalid URL */ }
		}
	});
</script>

{#if settings}
	<div class="popup">
		<header>
			<h1>annotaKit</h1>
			<label class="toggle">
				<input type="checkbox" checked={settings.enabled} onchange={toggleGlobal} />
				<span>{settings.enabled ? 'Enabled' : 'Disabled'}</span>
			</label>
		</header>

		{#if currentHostname}
			<div class="domain-toggle">
				<button class="domain-btn" class:disabled={domainDisabled} onclick={toggleDomain}>
					{domainDisabled ? 'Enable' : 'Disable'} on {currentHostname}
				</button>
			</div>
		{/if}

		<div class="settings">
			<div class="field">
				<label for="position">Position</label>
				<select id="position" value={settings.position} onchange={(e) => update({ position: e.currentTarget.value as ExtensionSettings['position'] })}>
					{#each positions as pos}
						<option value={pos.value}>{pos.label}</option>
					{/each}
				</select>
			</div>

			<div class="field">
				<label for="theme">Theme</label>
				<select id="theme" value={settings.theme} onchange={(e) => update({ theme: e.currentTarget.value as ExtensionSettings['theme'] })}>
					{#each themes as t}
						<option value={t.value}>{t.label}</option>
					{/each}
				</select>
			</div>

			<div class="field">
				<label for="format">Output Format</label>
				<select id="format" value={settings.outputFormat} onchange={(e) => update({ outputFormat: e.currentTarget.value as ExtensionSettings['outputFormat'] })}>
					{#each formats as f}
						<option value={f.value}>{f.label}</option>
					{/each}
				</select>
			</div>

			<div class="field">
				<label>Highlight Color</label>
				<div class="color-row">
					{#each colors as color}
						<button
							class="color-swatch"
							class:active={settings.highlightColor === color.value}
							style="background-color: {color.hex}"
							title={color.label}
							onclick={() => update({ highlightColor: color.value })}
						></button>
					{/each}
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="popup loading">Loading...</div>
{/if}

<style>
	.popup {
		padding: 16px;
		color: #1a1a1a;
		font-size: 13px;
	}

	.loading {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 120px;
		color: #888;
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 12px;
		padding-bottom: 12px;
		border-bottom: 1px solid #e5e5e5;
	}

	h1 {
		margin: 0;
		font-size: 16px;
		font-weight: 700;
		color: #1a1a1a;
	}

	.toggle {
		display: flex;
		align-items: center;
		gap: 6px;
		cursor: pointer;
		font-size: 12px;
		color: #666;
	}

	.toggle input {
		accent-color: #4ade80;
	}

	.domain-toggle {
		margin-bottom: 12px;
	}

	.domain-btn {
		width: 100%;
		padding: 8px;
		border: 1px solid #e5e5e5;
		border-radius: 6px;
		background: #fafafa;
		cursor: pointer;
		font-size: 12px;
		color: #444;
		transition: background 0.15s;
	}

	.domain-btn:hover {
		background: #f0f0f0;
	}

	.domain-btn.disabled {
		color: #ef4444;
		border-color: #fecaca;
		background: #fef2f2;
	}

	.settings {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.field label {
		font-size: 11px;
		font-weight: 600;
		color: #888;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.field select {
		padding: 6px 8px;
		border: 1px solid #e5e5e5;
		border-radius: 6px;
		font-size: 13px;
		background: #fff;
		color: #1a1a1a;
		cursor: pointer;
	}

	.field select:focus {
		outline: none;
		border-color: #4ade80;
	}

	.color-row {
		display: flex;
		gap: 6px;
	}

	.color-swatch {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		border: 2px solid transparent;
		cursor: pointer;
		transition: border-color 0.15s, transform 0.15s;
	}

	.color-swatch:hover {
		transform: scale(1.1);
	}

	.color-swatch.active {
		border-color: #1a1a1a;
	}
</style>
