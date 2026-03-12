import type { AnnotakitColor } from '../types.js';

interface ColorPreset {
	label: string;
	base: string;
	light: string;
	dark: string;
}

export const COLOR_PRESETS: Record<AnnotakitColor, ColorPreset> = {
	green: { label: 'Green', base: '#4ade80', light: '#86efac', dark: '#22c55e' },
	blue: { label: 'Blue', base: '#60a5fa', light: '#93bbfd', dark: '#3b82f6' },
	purple: { label: 'Purple', base: '#a78bfa', light: '#c4b5fd', dark: '#8b5cf6' },
	red: { label: 'Red', base: '#f87171', light: '#fca5a5', dark: '#ef4444' },
	orange: { label: 'Orange', base: '#fb923c', light: '#fdba74', dark: '#f97316' },
	yellow: { label: 'Yellow', base: '#facc15', light: '#fde047', dark: '#eab308' }
};

export const COLOR_OPTIONS = Object.entries(COLOR_PRESETS).map(([value, preset]) => ({
	value: value as AnnotakitColor,
	...preset
}));

const STORAGE_SUFFIX = ':highlight-color';

export function saveHighlightColor(storageKey: string, color: AnnotakitColor): void {
	try {
		localStorage.setItem(storageKey + STORAGE_SUFFIX, color);
	} catch { /* storage unavailable */ }
}

export function loadHighlightColor(storageKey: string): AnnotakitColor | null {
	try {
		const value = localStorage.getItem(storageKey + STORAGE_SUFFIX);
		if (value && value in COLOR_PRESETS) return value as AnnotakitColor;
	} catch { /* storage unavailable */ }
	return null;
}

export function applyHighlightColor(color: AnnotakitColor): void {
	const preset = COLOR_PRESETS[color];
	const style = document.documentElement.style;
	style.setProperty('--color-annotakit-primary', preset.base);
	style.setProperty('--color-annotakit-primary-light', preset.light);
	style.setProperty('--color-annotakit-primary-dark', preset.dark);
	style.setProperty('--color-annotakit-highlight', `${preset.base}26`);
	style.setProperty('--color-annotakit-highlight-border', `${preset.base}99`);
}

export function clearHighlightColor(): void {
	const style = document.documentElement.style;
	style.removeProperty('--color-annotakit-primary');
	style.removeProperty('--color-annotakit-primary-light');
	style.removeProperty('--color-annotakit-primary-dark');
	style.removeProperty('--color-annotakit-highlight');
	style.removeProperty('--color-annotakit-highlight-border');
}
