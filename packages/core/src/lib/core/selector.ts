/**
 * CSS selector generation - produces minimal, unique selectors for DOM elements.
 * Priority: #id > [data-testid] > aria-label+role > minimal class combo > tag:nth-of-type path
 */

export interface SelectorResult {
	selector: string;
	semantic: SemanticHints;
}

export interface SemanticHints {
	id?: string;
	testId?: string;
	role?: string;
	ariaLabel?: string;
}

function collectSemanticHints(el: Element): SemanticHints {
	const hints: SemanticHints = {};
	if (el.id) hints.id = el.id;
	const testId = el.getAttribute('data-testid');
	if (testId) hints.testId = testId;
	const role = el.getAttribute('role') || (el as HTMLElement).role;
	if (role) hints.role = role;
	const ariaLabel = el.getAttribute('aria-label');
	if (ariaLabel) hints.ariaLabel = ariaLabel;
	return hints;
}

function isUnique(selector: string, root: Element | Document = document): boolean {
	try {
		return root.querySelectorAll(selector).length === 1;
	} catch {
		return false;
	}
}

function escapeCSS(value: string): string {
	return CSS.escape(value);
}

function getTagSelector(el: Element): string {
	return el.tagName.toLowerCase();
}

function getNthOfType(el: Element): string {
	const parent = el.parentElement;
	if (!parent) return getTagSelector(el);
	const tag = el.tagName;
	const siblings = Array.from(parent.children).filter((c) => c.tagName === tag);
	if (siblings.length === 1) return getTagSelector(el);
	const index = siblings.indexOf(el) + 1;
	return `${getTagSelector(el)}:nth-of-type(${index})`;
}

function tryIdSelector(el: Element): string | null {
	if (!el.id) return null;
	const selector = `#${escapeCSS(el.id)}`;
	return isUnique(selector) ? selector : null;
}

function tryTestIdSelector(el: Element): string | null {
	const testId = el.getAttribute('data-testid');
	if (!testId) return null;
	const selector = `[data-testid="${escapeCSS(testId)}"]`;
	return isUnique(selector) ? selector : null;
}

function tryAriaSelector(el: Element): string | null {
	const ariaLabel = el.getAttribute('aria-label');
	const role = el.getAttribute('role');
	if (!ariaLabel) return null;
	const tag = getTagSelector(el);
	if (role) {
		const selector = `${tag}[role="${escapeCSS(role)}"][aria-label="${escapeCSS(ariaLabel)}"]`;
		if (isUnique(selector)) return selector;
	}
	const selector = `${tag}[aria-label="${escapeCSS(ariaLabel)}"]`;
	return isUnique(selector) ? selector : null;
}

function tryClassSelector(el: Element): string | null {
	const classes = Array.from(el.classList).filter(
		(c) => !c.startsWith('svelte-') && !c.startsWith('s-')
	);
	if (classes.length === 0) return null;
	const tag = getTagSelector(el);

	// Try single classes first
	for (const cls of classes) {
		const selector = `${tag}.${escapeCSS(cls)}`;
		if (isUnique(selector)) return selector;
	}

	// Try pairs
	for (let i = 0; i < classes.length; i++) {
		for (let j = i + 1; j < classes.length; j++) {
			const selector = `${tag}.${escapeCSS(classes[i])}.${escapeCSS(classes[j])}`;
			if (isUnique(selector)) return selector;
		}
	}

	return null;
}

function buildPathSelector(el: Element, maxAncestors: number = 3): string {
	const parts: string[] = [getNthOfType(el)];
	let current = el.parentElement;
	let depth = 0;

	while (current && current !== document.body && depth < maxAncestors) {
		const id = tryIdSelector(current);
		if (id) {
			parts.unshift(id);
			break;
		}
		parts.unshift(getNthOfType(current));
		current = current.parentElement;
		depth++;
	}

	return parts.join(' > ');
}

export function generateSelector(el: Element): SelectorResult {
	const semantic = collectSemanticHints(el);

	// Priority order
	const selector =
		tryIdSelector(el) ??
		tryTestIdSelector(el) ??
		tryAriaSelector(el) ??
		tryClassSelector(el) ??
		buildPathSelector(el);

	return { selector, semantic };
}
