/**
 * Annotation data model + localStorage persistence.
 */

import type { Annotation } from '../types.js';

const DEFAULT_RETENTION_DAYS = 7;

export function createAnnotation(
	partial: Omit<Annotation, 'id' | 'timestamp'>
): Annotation {
	return {
		id: crypto.randomUUID(),
		timestamp: Date.now(),
		...partial
	};
}

export function loadAnnotations(storageKey: string, retentionDays?: number): Annotation[] {
	try {
		const raw = localStorage.getItem(`${storageKey}:annotations`);
		if (!raw) return [];
		const parsed: Annotation[] = JSON.parse(raw);
		const cutoff = Date.now() - (retentionDays ?? DEFAULT_RETENTION_DAYS) * 86400000;
		return parsed.filter((a) => a.timestamp > cutoff);
	} catch {
		return [];
	}
}

export function saveAnnotations(storageKey: string, annotations: Annotation[]): void {
	try {
		localStorage.setItem(`${storageKey}:annotations`, JSON.stringify(annotations));
	} catch {
		// localStorage may be full or disabled
	}
}

export function clearAnnotations(storageKey: string): void {
	try {
		localStorage.removeItem(`${storageKey}:annotations`);
	} catch {
		// ignore
	}
}
