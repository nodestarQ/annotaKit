#!/usr/bin/env node

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { AnnotationStore } from './store.js';
import { createMcpServer } from './server.js';
import { createHttpServer } from './http/router.js';

function parseArgs(args: string[]): { port: number } {
	let port = 4156;
	const portIndex = args.indexOf('--port');
	if (portIndex !== -1 && args[portIndex + 1]) {
		const parsed = parseInt(args[portIndex + 1], 10);
		if (!isNaN(parsed) && parsed > 0 && parsed < 65536) {
			port = parsed;
		}
	}
	return { port };
}

async function main() {
	const { port } = parseArgs(process.argv.slice(2));

	// Shared store between HTTP and MCP
	const store = new AnnotationStore();

	// Start HTTP server for browser bridge
	const httpServer = createHttpServer(store);
	httpServer.listen(port, () => {
		process.stderr.write(`annotaKit MCP: HTTP server listening on port ${port}\n`);
	});

	// Start MCP server on stdio
	const mcpServer = createMcpServer(store);
	const transport = new StdioServerTransport();
	await mcpServer.connect(transport);

	process.stderr.write('annotaKit MCP: MCP server running on stdio\n');

	// Graceful shutdown
	process.on('SIGINT', () => {
		httpServer.close();
		process.exit(0);
	});
	process.on('SIGTERM', () => {
		httpServer.close();
		process.exit(0);
	});
}

main().catch((err) => {
	process.stderr.write(`annotaKit MCP: Fatal error: ${err}\n`);
	process.exit(1);
});
