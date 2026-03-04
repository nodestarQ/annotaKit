import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { createRequire } from 'module';
import { dirname, join } from 'path';

const require = createRequire(import.meta.url);
const annotakitDir = dirname(require.resolve('annotakit'));
const pkg = JSON.parse(
	(await import('fs')).readFileSync(join(annotakitDir, '..', 'package.json'), 'utf-8')
);

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	define: {
		__ANNOTAKIT_VERSION__: JSON.stringify(pkg.version)
	}
});
