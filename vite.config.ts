import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Fully static, prerendered output — portable to Vercel, Netlify or any static host.
			// Swap to adapter-vercel / adapter-netlify later if SSR/edge is needed (phase 2).
			adapter: adapter({ fallback: '404.html' }),

			prerender: {
				// The hero/oficio/experience photos are intentionally optional in the
				// prototype (elegant placeholder shown until real files are dropped in
				// /static/img). Don't fail the build on those; fail on any other 404.
				handleHttpError: ({ path, message }) => {
					if (path.startsWith('/img/')) return;
					throw new Error(message);
				}
			}
		})
	]
});
