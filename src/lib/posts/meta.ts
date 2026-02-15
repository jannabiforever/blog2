export type PostMeta = {
	title: string;
	date: string;
	summary?: string;
	tags?: string[];
};

export type PostListItem = PostMeta & {
	slug: string;
};

export type PostWithContent = PostListItem & {
	content?: string;
};

// Utility type for posts that are guaranteed to have required fields
export type ValidatedPost = Required<Pick<PostMeta, 'title' | 'date'>> &
	Omit<PostMeta, 'title' | 'date'> & {
		slug: string;
	};

// Type guard to check if a post has required fields
export function isValidPost(post: Partial<PostMeta> & { slug: string }): post is ValidatedPost {
	return !!(post.title && post.date && post.slug);
}

// Sort comparison functions
export const sortByDateDesc = (a: { date: string }, b: { date: string }): number =>
	new Date(b.date).getTime() - new Date(a.date).getTime();

export const sortByDateAsc = (a: { date: string }, b: { date: string }): number =>
	new Date(a.date).getTime() - new Date(b.date).getTime();
