/**
 * Svelte component detection — reads __svelte_meta in dev mode (Svelte 5.35.1+).
 * Gracefully returns null in production or non-Svelte pages.
 */

import type { SvelteComponentInfo } from '../types.js';

interface SvelteMeta {
	loc: { file: string; line: number; col: number };
	parent?: { type: string; file?: string; loc?: { line: number; col: number } };
}

interface SvelteGlobal {
	v?: number | string;
}

export function isSvelteAvailable(): boolean {
	if (typeof window === 'undefined') return false;
	return !!(window as unknown as { __svelte?: SvelteGlobal }).__svelte;
}

function deriveComponentName(filePath: string): string {
	const parts = filePath.split('/');
	const fileName = parts[parts.length - 1];
	return fileName.replace(/\.svelte$/, '');
}

function walkComponentChain(meta: SvelteMeta): string[] {
	const chain: string[] = [];
	let current: SvelteMeta['parent'] = meta.parent;
	while (current) {
		if (current.type === 'component' && current.file) {
			chain.push(deriveComponentName(current.file));
		}
		current = (current as unknown as { parent?: SvelteMeta['parent'] }).parent;
	}
	return chain;
}

export function detectSvelteComponent(el: Element): SvelteComponentInfo | null {
	if (!isSvelteAvailable()) return null;

	const meta = (el as unknown as { __svelte_meta?: SvelteMeta }).__svelte_meta;
	if (!meta?.loc) return null;

	const name = deriveComponentName(meta.loc.file);
	const chain = walkComponentChain(meta);

	return {
		name,
		file: meta.loc.file,
		line: meta.loc.line,
		col: meta.loc.col,
		chain
	};
}
