/**
 * Browser bridge for annotaKit MCP server.
 * Import as '@annotakit/mcp/bridge' in your Svelte layout.
 * This module is browser-safe and has no Node.js dependencies.
 */

import type { Annotation } from 'annotakit';

export interface McpBridgeConfig {
	/** MCP server URL. Default: 'http://localhost:4156' */
	serverUrl?: string;
	/** Session ID. Auto-generated if omitted. */
	sessionId?: string;
}

export interface McpBridge {
	/** Sync current annotations to the MCP server */
	sync(annotations: Annotation[], url: string, title: string): Promise<void>;
	/** Notify the MCP server that this session is disconnecting */
	disconnect(): Promise<void>;
	/** The session ID for this bridge instance */
	readonly sessionId: string;
}

function generateId(): string {
	if (typeof crypto !== 'undefined' && crypto.randomUUID) {
		return crypto.randomUUID();
	}
	// Fallback for older browsers
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0;
		const v = c === 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

export function createMcpBridge(config?: McpBridgeConfig): McpBridge {
	const serverUrl = (config?.serverUrl ?? 'http://localhost:4156').replace(/\/$/, '');
	const sessionId = config?.sessionId ?? generateId();

	async function sync(annotations: Annotation[], url: string, title: string): Promise<void> {
		try {
			await fetch(`${serverUrl}/api/sessions/${sessionId}/sync`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ url, title, annotations }),
			});
		} catch {
			// Silently ignore - missing MCP server should never break the app
		}
	}

	async function disconnect(): Promise<void> {
		try {
			await fetch(`${serverUrl}/api/sessions/${sessionId}`, {
				method: 'DELETE',
			});
		} catch {
			// Silently ignore
		}
	}

	return {
		sync,
		disconnect,
		get sessionId() {
			return sessionId;
		},
	};
}
