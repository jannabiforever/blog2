import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { loadPostWithComponent } from '$lib/posts/loader';
import { isValidPost } from '$lib/posts/meta';

export const load: PageLoad = async ({ params }) => {
	const { slug } = params;

	if (!slug) {
		throw error(400, 'Slug is required');
	}

	try {
		const post = await loadPostWithComponent(slug);

		if (!post) {
			throw error(404, 'Post not found');
		}

		// Check if post has required metadata
		if (!isValidPost({ slug: post.slug, ...post.metadata })) {
			throw error(500, 'Post metadata is invalid');
		}

		// Check if post is published (skip in development)
		if (process.env.NODE_ENV === 'production' && post.metadata) {
			throw error(404, 'Post not found');
		}

		return {
			slug: post.slug,
			metadata: post.metadata,
			component: post.component
		};
	} catch (err) {
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}

		console.error('Error loading post:', err);
		throw error(500, 'Internal server error');
	}
};
