import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { AnnotationStore } from '../store.js';
import type { McpAnnotation, AnnotationStatus } from '../types.js';

type Format = 'compact' | 'standard' | 'detailed';

function formatAnnotation(a: McpAnnotation, format: Format): Record<string, unknown> {
	if (format === 'compact') {
		return {
			id: a.id,
			status: a.status,
			mode: a.mode,
			comment: a.comment,
			selector: a.element.selector,
			repliesCount: a.replies.length,
		};
	}

	if (format === 'standard') {
		return {
			id: a.id,
			timestamp: a.timestamp,
			status: a.status,
			mode: a.mode,
			comment: a.comment,
			element: {
				tagName: a.element.tagName,
				selector: a.element.selector,
				classes: a.element.classes,
				id: a.element.id,
				textContent: a.element.textContent,
			},
			textSelection: a.textSelection,
			replies: a.replies,
			resolutionSummary: a.resolutionSummary,
			dismissReason: a.dismissReason,
		};
	}

	// detailed - return everything
	return { ...a };
}

export function registerAnnotationTools(server: McpServer, store: AnnotationStore): void {
	server.tool(
		'annotakit_get_annotations',
		'Get annotations for a session, optionally filtered by status. Use format to control detail level.',
		{
			sessionId: z.string().describe('The session ID'),
			status: z.enum(['pending', 'acknowledged', 'resolved', 'dismissed']).optional().describe('Filter by annotation status'),
			format: z.enum(['compact', 'standard', 'detailed']).default('standard').describe('Output detail level'),
		},
		async ({ sessionId, status, format }) => {
			const session = store.getSession(sessionId);
			if (!session) {
				return { content: [{ type: 'text', text: `Session "${sessionId}" not found.` }] };
			}

			const annotations = store.getSessionAnnotations(sessionId, status as AnnotationStatus | undefined);
			if (annotations.length === 0) {
				const statusMsg = status ? ` with status "${status}"` : '';
				return { content: [{ type: 'text', text: `No annotations${statusMsg} in session "${sessionId}".` }] };
			}

			const formatted = annotations.map((a) => formatAnnotation(a, format as Format));
			return {
				content: [{
					type: 'text',
					text: JSON.stringify(formatted, null, 2),
				}],
			};
		},
	);

	server.tool(
		'annotakit_get_pending',
		'Get all pending annotations across all sessions (or for a specific session)',
		{
			sessionId: z.string().optional().describe('Optional session ID to filter by'),
		},
		async ({ sessionId }) => {
			const pending = store.getPendingAnnotations(sessionId);
			if (pending.length === 0) {
				return { content: [{ type: 'text', text: 'No pending annotations.' }] };
			}

			const formatted = pending.map((a) => ({
				id: a.id,
				sessionId: a.sessionId,
				mode: a.mode,
				comment: a.comment,
				selector: a.element.selector,
				timestamp: a.timestamp,
			}));
			return {
				content: [{
					type: 'text',
					text: JSON.stringify(formatted, null, 2),
				}],
			};
		},
	);
}
