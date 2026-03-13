import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { AnnotationStore } from './store.js';
import { registerSessionTools } from './tools/sessions.js';
import { registerAnnotationTools } from './tools/annotations.js';
import { registerLifecycleTools } from './tools/lifecycle.js';
import { registerWatchTool } from './tools/watch.js';

export function createMcpServer(store: AnnotationStore): McpServer {
	const server = new McpServer({
		name: 'annotakit',
		version: '0.1.0',
	});

	registerSessionTools(server, store);
	registerAnnotationTools(server, store);
	registerLifecycleTools(server, store);
	registerWatchTool(server, store);

	return server;
}

export { AnnotationStore } from './store.js';
export { createHttpServer } from './http/router.js';
export type * from './types.js';
