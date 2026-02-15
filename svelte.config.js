import { mdsvex, escapeSvelte } from 'mdsvex';
import adapter from '@sveltejs/adapter-netlify';
import { createHighlighter } from 'shiki';

const theme = 'github-dark';
const highlighter = await createHighlighter({
	themes: ['github-dark', 'github-light'],
	langs: [
		'javascript',
		'typescript',
		'rust',
		'svelte',
		'python',
		'ocaml',
		'surql',
		'surrealql',
		'sql'
	]
});

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme }));
			return `{@html \`${html}\` }`;
		}
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: { adapter: adapter() },
	preprocess: [mdsvex(mdsvexOptions)],
	extensions: ['.svelte', '.svx']
};

export default config;
