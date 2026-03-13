import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { AnnotationStore } from '../store.js';
import type { StoreEvent } from '../types.js';

export function registerWatchTool(server: McpServer, store: AnnotationStore): void {
	server.tool(
		'annotakit_watch',
		'Long-poll for new annotation events. Blocks until a new annotation arrives or timeout is reached.',
		{
			sessionId: z.string().optional().describe('Optional session ID to watch'),
			timeoutSeconds: z.number().min(1).max(120).default(30).describe('Timeout in seconds (default 30, max 120)'),
		},
		async ({ sessionId, timeoutSeconds }) => {
			const timeout = (timeoutSeconds ?? 30) * 1000;

			const result = await new Promise<StoreEvent | null>((resolve) => {
				const timer = setTimeout(() => {
					store.off('event', onEvent);
					resolve(null);
				}, timeout);

				function onEvent(event: StoreEvent) {
					if (event.type !== 'annotation:added') return;
					if (sessionId && event.sessionId !== sessionId) return;
					clearTimeout(timer);
					store.off('event', onEvent);
					resolve(event);
				}

				store.on('event', onEvent);
			});

			if (!result) {
				return {
					content: [{ type: 'text', text: `No new annotations within ${timeoutSeconds ?? 30}s timeout.` }],
				};
			}

			return {
				content: [{
					type: 'text',
					text: JSON.stringify({
						event: result.type,
						sessionId: result.sessionId,
						annotationId: result.annotationId,
						annotation: result.data,
					}, null, 2),
				}],
			};
		},
	);
}
