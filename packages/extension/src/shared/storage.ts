import type { ExtensionSettings } from './messaging.js';

const STORAGE_KEY = 'annotakit-settings';

const DEFAULTS: ExtensionSettings = {
	enabled: true,
	position: 'bottom-right',
	theme: 'auto',
	highlightColor: 'green',
	outputFormat: 'standard',
	disabledDomains: []
};

export async function loadSettings(): Promise<ExtensionSettings> {
	const result = await chrome.storage.local.get(STORAGE_KEY);
	return { ...DEFAULTS, ...(result[STORAGE_KEY] ?? {}) };
}

export async function saveSettings(updates: Partial<ExtensionSettings>): Promise<void> {
	const current = await loadSettings();
	await chrome.storage.local.set({ [STORAGE_KEY]: { ...current, ...updates } });
}

export function isDomainDisabled(settings: ExtensionSettings, hostname: string): boolean {
	return settings.disabledDomains.includes(hostname);
}
