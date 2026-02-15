import type { PostMeta } from './meta';
import type { Component } from 'svelte';

export interface PostModule {
	metadata?: PostMeta;
	default?: Component;
}

export interface PostWithSlug extends PostMeta {
	slug: string;
}

export interface PostWithComponent {
	slug: string;
	metadata?: PostMeta;
	component?: Component;
}

/**
 * Get all post modules using import.meta.glob
 */
export function getPostModules() {
	return import.meta.glob('./*.svx') as Record<string, () => Promise<PostModule>>;
}

/**
 * Extract slug from file path
 */
export function extractSlugFromPath(path: string): string {
	return path
		.split('/')
		.pop()!
		.replace(/\.svx$/, '');
}

/**
 * Load all posts with metadata and slugs
 */
export async function loadAllPosts(): Promise<PostWithSlug[]> {
	const modules = getPostModules();

	const posts = await Promise.all(
		Object.entries(modules).map(async ([path, resolver]) => {
			const mod = await resolver();
			const slug = extractSlugFromPath(path);
			const metadata = mod.metadata ?? ({} as PostMeta);

			return { slug, ...metadata };
		})
	);

	// Sort by date (newest first)
	return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Load a single post by slug
 */
export async function loadPostBySlug(
	slug: string
): Promise<{ slug: string; metadata?: PostMeta } | null> {
	const modules = getPostModules();

	const match = Object.entries(modules).find(([path]) => extractSlugFromPath(path) === slug);

	if (!match) {
		return null;
	}

	const [, resolver] = match;
	const mod = await resolver();

	return {
		slug,
		metadata: mod.metadata
	};
}

/**
 * Load a single post with its component by slug
 */
export async function loadPostWithComponent(slug: string): Promise<PostWithComponent | null> {
	const modules = getPostModules();

	const match = Object.entries(modules).find(([path]) => extractSlugFromPath(path) === slug);

	if (!match) {
		return null;
	}

	const [, resolver] = match;
	const mod = await resolver();

	return {
		slug,
		metadata: mod.metadata,
		component: mod.default
	};
}
