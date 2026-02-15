import { loadAllPosts } from '$lib/posts/loader';
import { sortByDateDesc, isValidPost } from '$lib/posts/meta';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	try {
		const allPosts = await loadAllPosts();

		// Filter out invalid and unpublished posts
		const validPosts = allPosts.filter(isValidPost);

		// Sort by date (newest first)
		const sortedPosts = validPosts.sort(sortByDateDesc);

		return {
			posts: sortedPosts
		};
	} catch (error) {
		console.error('Error loading posts:', error);
		return {
			posts: []
		};
	}
};
