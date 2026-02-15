export const POSTS_CONFIG = {
	// Directory where posts are stored
	POSTS_DIR: './posts',

	// File extension for posts
	POST_EXTENSION: '.svx',

	// Default metadata for posts
	DEFAULT_METADATA: {
		published: true,
		draft: false,
		author: 'Blog Author',
		tags: [] as string[]
	},

	// Pagination settings
	POSTS_PER_PAGE: 10,

	// Date format
	DATE_FORMAT: 'YYYY-MM-DD',

	// Environment settings
	SHOW_DRAFTS_IN_DEV: true,
	SHOW_UNPUBLISHED_IN_DEV: true,

	// SEO settings
	DEFAULT_DESCRIPTION: 'A blog post',
	MAX_SUMMARY_LENGTH: 160,

	// Sorting options
	DEFAULT_SORT: 'date-desc' as 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc'
} as const;

export type PostsConfig = typeof POSTS_CONFIG;

// Helper function to check if we're in development
export const isDevelopment = () => process.env.NODE_ENV === 'development';

// Helper function to determine if drafts should be shown
export const shouldShowDrafts = () => isDevelopment() && POSTS_CONFIG.SHOW_DRAFTS_IN_DEV;

// Helper function to determine if unpublished posts should be shown
export const shouldShowUnpublished = () => isDevelopment() && POSTS_CONFIG.SHOW_UNPUBLISHED_IN_DEV;
