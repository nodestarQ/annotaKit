/**
 * Central reactive state using Svelte 5 runes class pattern.
 * Single instance - Annotakit is strictly client-side dev tooling.
 */

import type {
	Annotation,
	AnnotakitColor,
	AnnotakitPosition,
	AnnotakitTheme,
	OutputFormat
} from './types.js';
import { loadAnnotations, saveAnnotations, clearAnnotations } from './core/annotation.js';

class AnnotakitState {
	// Core
	enabled = $state(true);
	minimized = $state(false);
	visible = $state(true);
	annotations = $state<Annotation[]>([]);

	// Config
	position = $state<AnnotakitPosition>('bottom-right');
	outputFormat = $state<OutputFormat>('standard');
	theme = $state<AnnotakitTheme>('auto');
	highlightColor = $state<AnnotakitColor>('green');
	storageKey = $state('annotakit');
	retentionDays = $state(7);

	// Transient UI
	selectedAnnotationId = $state<string | null>(null);
	showOutputDialog = $state(false);
	copyFeedback = $state(false);
	frozen = $state(false);

	// Derived
	activeAnnotation = $derived(
		this.annotations.find((a) => a.id === this.selectedAnnotationId) ?? null
	);

	annotationCount = $derived(this.annotations.length);

	isActive = $derived(this.enabled && !this.minimized);

	panelPositionClasses = $derived.by(() => {
		const [v, h] = this.position.split('-');
		const vert = v === 'top' ? 'top-14' : 'bottom-14';
		const horiz = h === 'left' ? 'left-2' : h === 'right' ? 'right-2' : 'left-1/2 -translate-x-1/2';
		return `${vert} ${horiz}`;
	});

	// Methods
	addAnnotation(annotation: Annotation): void {
		this.annotations = [...this.annotations, annotation];
		this.selectedAnnotationId = annotation.id;
		this.saveToStorage();
	}

	updateAnnotation(id: string, updates: Partial<Pick<Annotation, 'comment'>>): void {
		this.annotations = this.annotations.map((a) =>
			a.id === id ? { ...a, ...updates } : a
		);
		this.saveToStorage();
	}

	removeAnnotation(id: string): void {
		this.annotations = this.annotations.filter((a) => a.id !== id);
		if (this.selectedAnnotationId === id) {
			this.selectedAnnotationId = null;
		}
		this.saveToStorage();
	}

	clearAll(): void {
		this.annotations = [];
		this.selectedAnnotationId = null;
		clearAnnotations(this.storageKey);
	}

	loadFromStorage(): void {
		this.annotations = loadAnnotations(this.storageKey, this.retentionDays);
	}

	private saveToStorage(): void {
		saveAnnotations(this.storageKey, this.annotations);
	}

	toggleVisible(): void {
		this.visible = !this.visible;
	}

	toggleMinimized(): void {
		if (!this.minimized) {
			this.selectedAnnotationId = null;
		}
		this.minimized = !this.minimized;
	}

	selectAnnotation(id: string | null): void {
		this.selectedAnnotationId = id;
	}
}

export const annotakitState = new AnnotakitState();
