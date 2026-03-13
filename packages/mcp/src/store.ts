import { EventEmitter } from 'node:events';
import type {
	McpAnnotation,
	Session,
	SyncPayload,
	AnnotationStatus,
	AnnotationReply,
	StoreEvent,
} from './types.js';

export class AnnotationStore extends EventEmitter {
	private sessions = new Map<string, Session>();
	private annotations = new Map<string, McpAnnotation>();

	syncAnnotations(sessionId: string, payload: SyncPayload): void {
		const now = Date.now();

		// Create or update session
		let session = this.sessions.get(sessionId);
		if (!session) {
			session = {
				id: sessionId,
				createdAt: now,
				lastActivityAt: now,
				url: payload.url,
				title: payload.title,
				annotationCount: 0,
			};
			this.sessions.set(sessionId, session);
			this.emit('event', {
				type: 'session:created',
				sessionId,
				data: session,
			} satisfies StoreEvent);
		} else {
			session.lastActivityAt = now;
			session.url = payload.url;
			session.title = payload.title;
		}

		// Track incoming annotation IDs
		const incomingIds = new Set(payload.annotations.map((a) => a.id));

		// Remove annotations no longer present in browser
		for (const [id, existing] of this.annotations) {
			if (existing.sessionId === sessionId && !incomingIds.has(id)) {
				this.annotations.delete(id);
				this.emit('event', {
					type: 'annotation:removed',
					sessionId,
					annotationId: id,
				} satisfies StoreEvent);
			}
		}

		// Add or update annotations
		for (const incoming of payload.annotations) {
			const existing = this.annotations.get(incoming.id);
			if (existing) {
				// Update core fields from browser, preserve lifecycle state
				existing.element = incoming.element;
				existing.elements = incoming.elements;
				existing.textSelection = incoming.textSelection;
				existing.comment = incoming.comment;
				this.emit('event', {
					type: 'annotation:updated',
					sessionId,
					annotationId: incoming.id,
					data: existing,
				} satisfies StoreEvent);
			} else {
				const annotation: McpAnnotation = {
					...incoming,
					sessionId,
					status: 'pending',
					replies: [],
				};
				this.annotations.set(incoming.id, annotation);
				this.emit('event', {
					type: 'annotation:added',
					sessionId,
					annotationId: incoming.id,
					data: annotation,
				} satisfies StoreEvent);
			}
		}

		// Update session annotation count
		session.annotationCount = this.getSessionAnnotations(sessionId).length;
		this.emit('event', {
			type: 'session:updated',
			sessionId,
			data: session,
		} satisfies StoreEvent);
	}

	removeSession(sessionId: string): boolean {
		const session = this.sessions.get(sessionId);
		if (!session) return false;

		// Remove all annotations for this session
		for (const [id, annotation] of this.annotations) {
			if (annotation.sessionId === sessionId) {
				this.annotations.delete(id);
			}
		}

		this.sessions.delete(sessionId);
		return true;
	}

	getSession(sessionId: string): Session | undefined {
		return this.sessions.get(sessionId);
	}

	getAllSessions(): Session[] {
		return Array.from(this.sessions.values());
	}

	getAnnotation(annotationId: string): McpAnnotation | undefined {
		return this.annotations.get(annotationId);
	}

	getSessionAnnotations(sessionId: string, status?: AnnotationStatus): McpAnnotation[] {
		const results: McpAnnotation[] = [];
		for (const annotation of this.annotations.values()) {
			if (annotation.sessionId === sessionId) {
				if (!status || annotation.status === status) {
					results.push(annotation);
				}
			}
		}
		return results;
	}

	getPendingAnnotations(sessionId?: string): McpAnnotation[] {
		const results: McpAnnotation[] = [];
		for (const annotation of this.annotations.values()) {
			if (annotation.status === 'pending') {
				if (!sessionId || annotation.sessionId === sessionId) {
					results.push(annotation);
				}
			}
		}
		return results;
	}

	acknowledge(annotationId: string): McpAnnotation | undefined {
		const annotation = this.annotations.get(annotationId);
		if (!annotation) return undefined;
		annotation.status = 'acknowledged';
		annotation.acknowledgedAt = Date.now();
		this.emit('event', {
			type: 'annotation:updated',
			sessionId: annotation.sessionId,
			annotationId,
			data: annotation,
		} satisfies StoreEvent);
		return annotation;
	}

	resolve(annotationId: string, summary?: string): McpAnnotation | undefined {
		const annotation = this.annotations.get(annotationId);
		if (!annotation) return undefined;
		annotation.status = 'resolved';
		annotation.resolvedAt = Date.now();
		if (summary) annotation.resolutionSummary = summary;
		this.emit('event', {
			type: 'annotation:updated',
			sessionId: annotation.sessionId,
			annotationId,
			data: annotation,
		} satisfies StoreEvent);
		return annotation;
	}

	dismiss(annotationId: string, reason: string): McpAnnotation | undefined {
		const annotation = this.annotations.get(annotationId);
		if (!annotation) return undefined;
		annotation.status = 'dismissed';
		annotation.dismissedAt = Date.now();
		annotation.dismissReason = reason;
		this.emit('event', {
			type: 'annotation:updated',
			sessionId: annotation.sessionId,
			annotationId,
			data: annotation,
		} satisfies StoreEvent);
		return annotation;
	}

	addReply(annotationId: string, message: string, source: 'agent' | 'user' = 'agent'): McpAnnotation | undefined {
		const annotation = this.annotations.get(annotationId);
		if (!annotation) return undefined;
		const reply: AnnotationReply = {
			id: crypto.randomUUID(),
			timestamp: Date.now(),
			source,
			message,
		};
		annotation.replies.push(reply);
		this.emit('event', {
			type: 'annotation:updated',
			sessionId: annotation.sessionId,
			annotationId,
			data: annotation,
		} satisfies StoreEvent);
		return annotation;
	}
}
