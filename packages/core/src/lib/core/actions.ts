/**
 * Annotation creation helpers — bridges DOM interactions to annotation model.
 */

import type { Annotation } from '../types.js';
import { inspectElement } from './inspector.js';
import { captureTextSelection } from './text-selection.js';
import { createAnnotation } from './annotation.js';

export function handleInspectClick(element: Element): Annotation {
	const info = inspectElement(element);
	return createAnnotation({
		mode: 'inspect',
		element: info,
		comment: ''
	});
}

export function handleAnnotateClick(element: Element): Annotation {
	const info = inspectElement(element);
	return createAnnotation({
		mode: 'annotate',
		element: info,
		comment: ''
	});
}

export function handleTextSelection(): Annotation | null {
	const selection = captureTextSelection();
	if (!selection) return null;

	// Use the anchor element for the element info
	const anchorEl = document.querySelector(selection.anchorSelector);
	if (!anchorEl) return null;

	const info = inspectElement(anchorEl);
	return createAnnotation({
		mode: 'select',
		element: info,
		textSelection: selection,
		comment: ''
	});
}
