export type AnnotationStatus = 'pending' | 'acknowledged' | 'resolved' | 'dismissed';

export interface SerializedRect {
	x: number;
	y: number;
	width: number;
	height: number;
}

export interface SerializedComputedStyles {
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

export interface SerializedAccessibility {
	role?: string;
	ariaLabel?: string;
	ariaDescribedBy?: string;
	tabIndex?: number;
	alt?: string;
}

export interface SerializedSvelteComponent {
	name: string;
	file: string;
	line?: number;
	col?: number;
	chain: string[];
}

export interface SerializedElementInfo {
	tagName: string;
	classes: string[];
	id?: string;
	selector: string;
	rect: SerializedRect;
	styles: SerializedComputedStyles;
	accessibility: SerializedAccessibility;
	svelte?: SerializedSvelteComponent;
	textContent?: string;
}

export interface SerializedTextSelection {
	text: string;
	contextBefore: string;
	contextAfter: string;
	anchorSelector: string;
}

export interface AnnotationReply {
	id: string;
	timestamp: number;
	source: 'agent' | 'user';
	message: string;
}

export interface McpAnnotation {
	id: string;
	timestamp: number;
	mode: 'element' | 'text' | 'multi';
	element: SerializedElementInfo;
	elements?: SerializedElementInfo[];
	textSelection?: SerializedTextSelection;
	comment: string;
	sessionId: string;
	status: AnnotationStatus;
	acknowledgedAt?: number;
	resolvedAt?: number;
	dismissedAt?: number;
	resolutionSummary?: string;
	dismissReason?: string;
	replies: AnnotationReply[];
}

export interface Session {
	id: string;
	createdAt: number;
	lastActivityAt: number;
	url: string;
	title: string;
	annotationCount: number;
}

export interface SyncPayload {
	url: string;
	title: string;
	annotations: Array<{
		id: string;
		timestamp: number;
		mode: 'element' | 'text' | 'multi';
		element: SerializedElementInfo;
		elements?: SerializedElementInfo[];
		textSelection?: SerializedTextSelection;
		comment: string;
	}>;
}

export interface StoreEvent {
	type: 'annotation:added' | 'annotation:updated' | 'annotation:removed' | 'session:created' | 'session:updated';
	sessionId: string;
	annotationId?: string;
	data?: McpAnnotation | Session;
}
