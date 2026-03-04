/**
 * Element inspection - extracts tag, classes, selector, dimensions, computed styles,
 * accessibility info, and Svelte component info from a DOM element.
 */

import type { ElementInfo, ComputedStyleSubset, AccessibilityInfo } from '../types.js';
import { generateSelector } from './selector.js';
import { detectSvelteComponent } from './svelte-detect.js';

function extractComputedStyles(el: Element): ComputedStyleSubset {
	const cs = getComputedStyle(el);
	return {
		color: cs.color,
		backgroundColor: cs.backgroundColor,
		fontSize: cs.fontSize,
		fontFamily: cs.fontFamily,
		fontWeight: cs.fontWeight,
		lineHeight: cs.lineHeight,
		padding: cs.padding,
		margin: cs.margin,
		borderRadius: cs.borderRadius,
		border: cs.border,
		display: cs.display,
		position: cs.position,
		width: cs.width,
		height: cs.height
	};
}

function extractAccessibility(el: Element): AccessibilityInfo {
	const info: AccessibilityInfo = {};
	const role = el.getAttribute('role');
	if (role) info.role = role;
	const ariaLabel = el.getAttribute('aria-label');
	if (ariaLabel) info.ariaLabel = ariaLabel;
	const ariaDescribedBy = el.getAttribute('aria-describedby');
	if (ariaDescribedBy) info.ariaDescribedBy = ariaDescribedBy;
	const tabIndex = (el as HTMLElement).tabIndex;
	if (tabIndex !== undefined && tabIndex >= 0) info.tabIndex = tabIndex;
	const alt = el.getAttribute('alt');
	if (alt) info.alt = alt;
	return info;
}

export function inspectElement(el: Element): ElementInfo {
	const { selector } = generateSelector(el);
	const svelte = detectSvelteComponent(el);

	const textContent = el.textContent?.trim().slice(0, 100) || undefined;

	return {
		tagName: el.tagName.toLowerCase(),
		classes: Array.from(el.classList),
		id: el.id || undefined,
		selector,
		rect: el.getBoundingClientRect(),
		styles: extractComputedStyles(el),
		accessibility: extractAccessibility(el),
		svelte: svelte ?? undefined,
		textContent
	};
}
