import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

const isDev = process.env.NODE_ENV === 'development';

// Build each entry as a separate self-contained IIFE
const entry = process.env.ENTRY ?? 'content';

const entries: Record<string, string> = {
	content: resolve(__dirname, 'src/content/mount.ts'),
	popup: resolve(__dirname, 'src/popup/popup.ts'),
	'service-worker': resolve(__dirname, 'src/background/service-worker.ts')
};

export default defineConfig({
	plugins: [
		svelte({
			compilerOptions: {
				css: 'injected'
			}
		})
	],
	build: {
		outDir: 'dist',
		emptyOutDir: entry === 'content',
		rollupOptions: {
			input: entries[entry],
			output: {
				entryFileNames: `${entry}.js`,
				format: 'iife'
			}
		},
		target: 'es2022',
		minify: !isDev,
		sourcemap: isDev ? 'inline' : false
	}
});
