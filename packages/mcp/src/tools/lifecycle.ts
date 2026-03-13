import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { AnnotationStore } from '../store.js';

export function registerLifecycleTools(server: McpServer, store: AnnotationStore): void {
	server.tool(
		'annotakit_acknowledge',
		'Mark an annotation as acknowledged (seen by the agent)',
		{ annotationId: z.string().describe('The annotation ID to acknowledge') },
		async ({ annotationId }) => {
			const result = store.acknowledge(annotationId);
			if (!result) {
				return { content: [{ type: 'text', text: `Annotation "${annotationId}" not found.` }] };
			}
			return {
				content: [{ type: 'text', text: `Acknowledged annotation "${annotationId}".` }],
			};
		},
	);

	server.tool(
		'annotakit_resolve',
		'Mark an annotation as resolved (addressed by the agent)',
		{
			annotationId: z.string().describe('The annotation ID to resolve'),
			summary: z.string().optional().describe('Optional summary of how the annotation was addressed'),
		},
		async ({ annotationId, summary }) => {
			const result = store.resolve(annotationId, summary);
			if (!result) {
				return { content: [{ type: 'text', text: `Annotation "${annotationId}" not found.` }] };
			}
			return {
				content: [{
					type: 'text',
					text: `Resolved annotation "${annotationId}".${summary ? ` Summary: ${summary}` : ''}`,
				}],
			};
		},
	);

	server.tool(
		'annotakit_dismiss',
		'Dismiss an annotation with a reason',
		{
			annotationId: z.string().describe('The annotation ID to dismiss'),
			reason: z.string().describe('Reason for dismissing the annotation'),
		},
		async ({ annotationId, reason }) => {
			const result = store.dismiss(annotationId, reason);
			if (!result) {
				return { content: [{ type: 'text', text: `Annotation "${annotationId}" not found.` }] };
			}
			return {
				content: [{
					type: 'text',
					text: `Dismissed annotation "${annotationId}". Reason: ${reason}`,
				}],
			};
		},
	);

	server.tool(
		'annotakit_reply',
		'Add a reply message to an annotation thread',
		{
			annotationId: z.string().describe('The annotation ID to reply to'),
			message: z.string().describe('The reply message'),
		},
		async ({ annotationId, message }) => {
			const result = store.addReply(annotationId, message, 'agent');
			if (!result) {
				return { content: [{ type: 'text', text: `Annotation "${annotationId}" not found.` }] };
			}
			return {
				content: [{
					type: 'text',
					text: `Reply added to annotation "${annotationId}". Thread now has ${result.replies.length} ${result.replies.length === 1 ? 'reply' : 'replies'}.`,
				}],
			};
		},
	);
}
