export type AnnotakitMode = 'idle' | 'inspect' | 'annotate' | 'select';

export type AnnotakitPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export type OutputFormat = 'compact' | 'standard' | 'detailed';

export type AnnotakitTheme = 'light' | 'dark' | 'auto';

export interface SvelteComponentInfo {
	name: string;
	file: string;
	line?: number;
	col?: number;
	chain: string[];
}

export interface ElementInfo {
	tagName: string;
	classes: string[];
	id?: string;
	selector: string;
	rect: DOMRect;
	styles: ComputedStyleSubset;
	accessibility: AccessibilityInfo;
	svelte?: SvelteComponentInfo;
	textContent?: string;
}

export interface ComputedStyleSubset {
	color: string;
	backgroundColor: string;
	fontSize: string;
	fontFamily: string;
	fontWeight: string;
	lineHeight: string;
	padding: string;
	margin: string;
	borderRadius: string;
	border: string;
	display: string;
	position: string;
	width: string;
	height: string;
}

export interface AccessibilityInfo {
	role?: string;
	ariaLabel?: string;
	ariaDescribedBy?: string;
	tabIndex?: number;
	alt?: string;
}

export interface TextSelectionInfo {
	text: string;
	contextBefore: string;
	contextAfter: string;
	anchorSelector: string;
}

export interface Annotation {
	id: string;
	timestamp: number;
	mode: 'inspect' | 'annotate' | 'select';
	element: ElementInfo;
	textSelection?: TextSelectionInfo;
	comment: string;
}

export interface AnnotakitConfig {
	position: AnnotakitPosition;
	outputFormat: OutputFormat;
	theme: AnnotakitTheme;
	storageKey: string;
	retentionDays: number;
	enabled: boolean;
}
