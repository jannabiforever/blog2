export class PostError extends Error {
	constructor(
		message: string,
		public code: string,
		public status: number = 500
	) {
		super(message);
		this.name = 'PostError';
	}
}

export class PostNotFoundError extends PostError {
	constructor(slug: string) {
		super(`Post with slug "${slug}" not found`, 'POST_NOT_FOUND', 404);
		this.name = 'PostNotFoundError';
	}
}

export class PostValidationError extends PostError {
	constructor(field: string, value?: unknown) {
		super(
			`Post validation failed: ${field}${value ? ` (received: ${value})` : ''}`,
			'POST_VALIDATION_ERROR',
			422
		);
		this.name = 'PostValidationError';
	}
}

export class PostLoadError extends PostError {
	constructor(slug: string, originalError?: Error) {
		super(
			`Failed to load post "${slug}"${originalError ? `: ${originalError.message}` : ''}`,
			'POST_LOAD_ERROR',
			500
		);
		this.name = 'PostLoadError';
		if (originalError) {
			this.cause = originalError;
		}
	}
}

export class PostParseError extends PostError {
	constructor(slug: string, parseError?: Error) {
		super(
			`Failed to parse post metadata for "${slug}"${parseError ? `: ${parseError.message}` : ''}`,
			'POST_PARSE_ERROR',
			500
		);
		this.name = 'PostParseError';
		if (parseError) {
			this.cause = parseError;
		}
	}
}

// Error type guards
export function isPostError(error: unknown): error is PostError {
	return error instanceof PostError;
}

export function isPostNotFoundError(error: unknown): error is PostNotFoundError {
	return error instanceof PostNotFoundError;
}

export function isPostValidationError(error: unknown): error is PostValidationError {
	return error instanceof PostValidationError;
}

// Error handler utility for SvelteKit
export function handlePostError(error: unknown): {
	status: number;
	message: string;
	code?: string;
} {
	if (isPostError(error)) {
		return {
			status: error.status,
			message: error.message,
			code: error.code
		};
	}

	// Log unexpected errors
	console.error('Unexpected error in post handling:', error);

	return {
		status: 500,
		message: 'Internal server error'
	};
}

// Logging utilities
export function logPostError(error: PostError, context?: string): void {
	const logContext = context ? ` [${context}]` : '';
	console.error(`${error.name}${logContext}:`, {
		message: error.message,
		code: error.code,
		status: error.status,
		cause: error.cause
	});
}

export function logPostWarning(message: string, context?: string): void {
	const logContext = context ? ` [${context}]` : '';
	console.warn(`Post Warning${logContext}:`, message);
}

export function logPostInfo(message: string, context?: string): void {
	const logContext = context ? ` [${context}]` : '';
	console.info(`Post Info${logContext}:`, message);
}

// Validation error factory functions
export function createRequiredFieldError(field: string): PostValidationError {
	return new PostValidationError(`Required field "${field}" is missing`);
}

export function createInvalidDateError(date: string): PostValidationError {
	return new PostValidationError(`Invalid date format`, date);
}

export function createInvalidSlugError(slug: string): PostValidationError {
	return new PostValidationError(`Invalid slug format`, slug);
}

// Error wrapper for async operations
export async function withPostErrorHandling<T>(
	operation: () => Promise<T>,
	context?: string
): Promise<T> {
	try {
		return await operation();
	} catch (error) {
		if (isPostError(error)) {
			logPostError(error, context);
			throw error;
		}

		const wrappedError = new PostError(
			`Operation failed${context ? ` in ${context}` : ''}`,
			'OPERATION_FAILED',
			500
		);

		logPostError(wrappedError, context);
		throw wrappedError;
	}
}
