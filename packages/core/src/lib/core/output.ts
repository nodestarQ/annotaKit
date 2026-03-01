/**
 * Markdown generation — produces structured markdown from annotations.
 * Three formats: compact, standard, detailed.
 */

import type { Annotation, OutputFormat } from '../types.js';

export const FORMAT_OPTIONS: { value: OutputFormat; label: string }[] = [
	{ value: 'compact', label: 'Compact' },
	{ value: 'standard', label: 'Standard' },
	{ value: 'detailed', label: 'Detailed' }
];

function formatCompact(annotation: Annotation, index: number): string {
	const parts = [`${index + 1}.`];
	if (annotation.mode === 'multi' && annotation.elements && annotation.elements.length > 1) {
		parts.push(`[${annotation.elements.map((el) => `\`${el.selector}\``).join(', ')}]`);
	} else {
		parts.push(`\`${annotation.element.selector}\``);
		if (annotation.element.svelte) {
			parts.push(`(${annotation.element.svelte.name})`);
		}
	}
	if (annotation.comment) {
		parts.push(`— ${annotation.comment}`);
	}
	if (annotation.textSelection) {
		parts.push(`[selected: "${annotation.textSelection.text.slice(0, 60)}"]`);
	}
	return parts.join(' ');
}

function formatStandard(annotation: Annotation, index: number): string {
	const lines: string[] = [];
	lines.push(`### ${index + 1}. ${annotation.element.tagName}${annotation.element.id ? `#${annotation.element.id}` : ''}`);
	lines.push('');

	if (annotation.mode === 'multi' && annotation.elements && annotation.elements.length > 1) {
		lines.push(`- **Elements (${annotation.elements.length}):**`);
		for (const el of annotation.elements) {
			const comp = el.svelte ? ` (${el.svelte.name})` : '';
			lines.push(`  - \`${el.selector}\`${comp}`);
		}
	} else {
		lines.push(`- **Selector:** \`${annotation.element.selector}\``);
		if (annotation.element.svelte) {
			lines.push(`- **Component:** ${annotation.element.svelte.name} (\`${annotation.element.svelte.file}\`)`);
		}
	}

	if (annotation.textSelection) {
		lines.push(`- **Selected text:** "${annotation.textSelection.text}"`);
	}

	if (annotation.comment) {
		lines.push(`- **Comment:** ${annotation.comment}`);
	}

	const a11y = annotation.element.accessibility;
	if (a11y.role || a11y.ariaLabel) {
		const parts: string[] = [];
		if (a11y.role) parts.push(`role="${a11y.role}"`);
		if (a11y.ariaLabel) parts.push(`aria-label="${a11y.ariaLabel}"`);
		lines.push(`- **Accessibility:** ${parts.join(', ')}`);
	}

	return lines.join('\n');
}

function formatDetailed(annotation: Annotation, index: number): string {
	const lines: string[] = [];
	lines.push(`### ${index + 1}. ${annotation.element.tagName}${annotation.element.id ? `#${annotation.element.id}` : ''}`);
	lines.push('');

	if (annotation.mode === 'multi' && annotation.elements && annotation.elements.length > 1) {
		lines.push(`- **Elements (${annotation.elements.length}):**`);
		for (const el of annotation.elements) {
			const comp = el.svelte ? ` — ${el.svelte.name} (\`${el.svelte.file}\`)` : '';
			lines.push(`  - \`${el.selector}\`${comp}`);
		}
	} else {
		lines.push(`- **Selector:** \`${annotation.element.selector}\``);
		if (annotation.element.svelte) {
			const sv = annotation.element.svelte;
			lines.push(`- **Component:** ${sv.name} (\`${sv.file}:${sv.line ?? ''}\`)`);
			if (sv.chain.length > 0) {
				lines.push(`- **Component chain:** ${sv.chain.join(' > ')}`);
			}
		}
	}

	if (annotation.textSelection) {
		lines.push(`- **Selected text:** "${annotation.textSelection.text}"`);
		if (annotation.textSelection.contextBefore || annotation.textSelection.contextAfter) {
			lines.push(`- **Context:** ...${annotation.textSelection.contextBefore}**[${annotation.textSelection.text}]**${annotation.textSelection.contextAfter}...`);
		}
	}

	if (annotation.comment) {
		lines.push(`- **Comment:** ${annotation.comment}`);
	}

	// Dimensions
	const r = annotation.element.rect;
	lines.push(`- **Dimensions:** ${Math.round(r.width)}×${Math.round(r.height)} at (${Math.round(r.x)}, ${Math.round(r.y)})`);

	// Computed styles
	const s = annotation.element.styles;
	lines.push(`- **Styles:**`);
	lines.push(`  - color: ${s.color}`);
	lines.push(`  - background: ${s.backgroundColor}`);
	lines.push(`  - font: ${s.fontWeight} ${s.fontSize} ${s.fontFamily.split(',')[0]}`);
	lines.push(`  - display: ${s.display}, position: ${s.position}`);
	lines.push(`  - padding: ${s.padding}, margin: ${s.margin}`);

	const a11y = annotation.element.accessibility;
	if (a11y.role || a11y.ariaLabel || a11y.alt) {
		lines.push(`- **Accessibility:**`);
		if (a11y.role) lines.push(`  - role: ${a11y.role}`);
		if (a11y.ariaLabel) lines.push(`  - aria-label: ${a11y.ariaLabel}`);
		if (a11y.alt) lines.push(`  - alt: ${a11y.alt}`);
	}

	return lines.join('\n');
}

export function generateMarkdown(
	annotations: Annotation[],
	format: OutputFormat = 'standard'
): string {
	if (annotations.length === 0) return '<!-- No annotations -->';

	const lines: string[] = [];
	lines.push('## Annotakit Feedback');
	lines.push('');

	const formatter =
		format === 'compact'
			? formatCompact
			: format === 'detailed'
				? formatDetailed
				: formatStandard;

	for (let i = 0; i < annotations.length; i++) {
		lines.push(formatter(annotations[i], i));
		if (format !== 'compact') lines.push('');
	}

	return lines.join('\n');
}

export async function copyToClipboard(text: string): Promise<boolean> {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		// Fallback: textarea approach
		try {
			const textarea = document.createElement('textarea');
			textarea.value = text;
			textarea.style.position = 'fixed';
			textarea.style.opacity = '0';
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand('copy');
			document.body.removeChild(textarea);
			return true;
		} catch {
			return false;
		}
	}
}
