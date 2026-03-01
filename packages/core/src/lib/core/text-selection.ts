/**
 * Text selection capture — captures selected text with surrounding context.
 */

import type { TextSelectionInfo } from '../types.js';
import { generateSelector } from './selector.js';

const CONTEXT_CHARS = 50;

export function captureTextSelection(): TextSelectionInfo | null {
	const selection = window.getSelection();
	if (!selection || selection.isCollapsed || !selection.rangeCount) return null;

	const text = selection.toString().trim();
	if (!text) return null;

	const range = selection.getRangeAt(0);
	const anchorNode = range.startContainer;
	const anchorElement =
		anchorNode.nodeType === Node.ELEMENT_NODE
			? (anchorNode as Element)
			: anchorNode.parentElement;

	if (!anchorElement) return null;

	const { selector: anchorSelector } = generateSelector(anchorElement);

	// Get surrounding context from the text content of the anchor element
	const fullText = anchorElement.textContent || '';
	const selectionStart = fullText.indexOf(text);

	let contextBefore = '';
	let contextAfter = '';

	if (selectionStart >= 0) {
		contextBefore = fullText.slice(Math.max(0, selectionStart - CONTEXT_CHARS), selectionStart);
		contextAfter = fullText.slice(
			selectionStart + text.length,
			selectionStart + text.length + CONTEXT_CHARS
		);
	}

	return {
		text,
		contextBefore,
		contextAfter,
		anchorSelector
	};
}

export function clearTextSelection(): void {
	window.getSelection()?.removeAllRanges();
}
