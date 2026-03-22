import type { AnnotakitColor, AnnotakitPosition, AnnotakitTheme, OutputFormat } from 'annotakit/types';

export interface ExtensionSettings {
	enabled: boolean;
	position: AnnotakitPosition;
	theme: AnnotakitTheme;
	highlightColor: AnnotakitColor;
	outputFormat: OutputFormat;
	disabledDomains: string[];
}

export type Message =
	| { type: 'toggle' }
	| { type: 'get-state' }
	| { type: 'state-update'; count: number; enabled: boolean }
	| { type: 'settings-changed'; settings: Partial<ExtensionSettings> };
