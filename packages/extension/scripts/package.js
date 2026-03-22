import { copyFileSync, cpSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const target = process.argv[2];

if (!target || !['chrome', 'firefox'].includes(target)) {
	console.error('Usage: node scripts/package.js <chrome|firefox>');
	process.exit(1);
}

// Copy manifest
copyFileSync(
	resolve(root, `manifest/${target}.json`),
	resolve(root, 'dist/manifest.json')
);

// Copy popup.html
copyFileSync(
	resolve(root, 'src/popup/popup.html'),
	resolve(root, 'dist/popup.html')
);

// Copy icons
cpSync(
	resolve(root, 'src/icons'),
	resolve(root, 'dist/icons'),
	{ recursive: true }
);

console.log(`Packaged for ${target}`);
