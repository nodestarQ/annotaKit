import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import type { AnnotationStore } from '../store.js';
import type { SyncPayload, StoreEvent } from '../types.js';

function setCors(res: ServerResponse): void {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function json(res: ServerResponse, status: number, data: unknown): void {
	setCors(res);
	res.writeHead(status, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(data));
}

function readBody(req: IncomingMessage): Promise<string> {
	return new Promise((resolve, reject) => {
		const chunks: Buffer[] = [];
		req.on('data', (chunk: Buffer) => chunks.push(chunk));
		req.on('end', () => resolve(Buffer.concat(chunks).toString()));
		req.on('error', reject);
	});
}

function parseRoute(url: string): { path: string; params: Record<string, string>; query: Record<string, string> } {
	const [pathname, queryString] = url.split('?');
	const query: Record<string, string> = {};
	if (queryString) {
		for (const pair of queryString.split('&')) {
			const [key, value] = pair.split('=');
			if (key) query[decodeURIComponent(key)] = decodeURIComponent(value ?? '');
		}
	}

	// Match /api/sessions/:sessionId/sync
	const syncMatch = pathname.match(/^\/api\/sessions\/([^/]+)\/sync$/);
	if (syncMatch) {
		return { path: '/api/sessions/:sessionId/sync', params: { sessionId: syncMatch[1] }, query };
	}

	// Match /api/sessions/:sessionId
	const sessionMatch = pathname.match(/^\/api\/sessions\/([^/]+)$/);
	if (sessionMatch) {
		return { path: '/api/sessions/:sessionId', params: { sessionId: sessionMatch[1] }, query };
	}

	return { path: pathname, params: {}, query };
}

export function createHttpServer(store: AnnotationStore) {
	const server = createServer(async (req, res) => {
		setCors(res);

		// Handle CORS preflight
		if (req.method === 'OPTIONS') {
			res.writeHead(204);
			res.end();
			return;
		}

		const { path, params, query } = parseRoute(req.url ?? '/');

		try {
			// POST /api/sessions/:sessionId/sync
			if (req.method === 'POST' && path === '/api/sessions/:sessionId/sync') {
				const body = await readBody(req);
				const payload: SyncPayload = JSON.parse(body);
				store.syncAnnotations(params.sessionId, payload);
				json(res, 200, { ok: true });
				return;
			}

			// DELETE /api/sessions/:sessionId
			if (req.method === 'DELETE' && path === '/api/sessions/:sessionId') {
				const removed = store.removeSession(params.sessionId);
				json(res, 200, { ok: true, removed });
				return;
			}

			// GET /api/events
			if (req.method === 'GET' && path === '/api/events') {
				setCors(res);
				res.writeHead(200, {
					'Content-Type': 'text/event-stream',
					'Cache-Control': 'no-cache',
					'Connection': 'keep-alive',
				});

				const sessionFilter = query.sessionId;

				const onEvent = (event: StoreEvent) => {
					if (sessionFilter && event.sessionId !== sessionFilter) return;
					res.write(`data: ${JSON.stringify(event)}\n\n`);
				};

				store.on('event', onEvent);

				req.on('close', () => {
					store.off('event', onEvent);
				});
				return;
			}

			// GET /api/health
			if (req.method === 'GET' && path === '/api/health') {
				json(res, 200, {
					status: 'ok',
					sessions: store.getAllSessions().length,
					uptime: process.uptime(),
				});
				return;
			}

			// 404
			json(res, 404, { error: 'Not found' });
		} catch (err) {
			json(res, 500, { error: err instanceof Error ? err.message : 'Internal server error' });
		}
	});

	return server;
}
