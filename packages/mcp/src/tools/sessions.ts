import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { AnnotationStore } from '../store.js';

export function registerSessionTools(server: McpServer, store: AnnotationStore): void {
	server.tool(
		'annotakit_list_sessions',
		'List all active browser sessions connected to annotaKit',
		{},
		async () => {
			const sessions = store.getAllSessions();
			if (sessions.length === 0) {
				return { content: [{ type: 'text', text: 'No active sessions. Make sure the annotaKit bridge is running in your browser.' }] };
			}
			return {
				content: [{
					type: 'text',
					text: JSON.stringify(sessions, null, 2),
				}],
			};
		},
	);

	server.tool(
		'annotakit_get_session',
		'Get details for a specific browser session including annotation summary',
		{ sessionId: z.string().describe('The session ID to look up') },
		async ({ sessionId }) => {
			const session = store.getSession(sessionId);
			if (!session) {
				return { content: [{ type: 'text', text: `Session "${sessionId}" not found.` }] };
			}

			const annotations = store.getSessionAnnotations(sessionId);
			const statusCounts = {
				pending: 0,
				acknowledged: 0,
				resolved: 0,
				dismissed: 0,
			};
			for (const a of annotations) {
				statusCounts[a.status]++;
			}

			return {
				content: [{
					type: 'text',
					text: JSON.stringify({ ...session, statusCounts }, null, 2),
				}],
			};
		},
	);
}
