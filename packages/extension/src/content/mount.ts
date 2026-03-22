import { mount, unmount } from 'svelte';
import { annotakitCSS } from 'annotakit/styles/generated-css.js';
import ExtensionRoot from './ExtensionRoot.svelte';

let component: Record<string, unknown> | null = null;

function init() {
	// Don't inject into extension pages
	if (location.protocol === 'chrome-extension:' || location.protocol === 'moz-extension:') return;

	// Create shadow DOM host
	const host = document.createElement('annotakit-ext');
	host.setAttribute('data-annotakit', 'root');
	const shadow = host.attachShadow({ mode: 'open' });

	// Inject compiled CSS into shadow root
	const style = document.createElement('style');
	style.textContent = annotakitCSS;
	shadow.appendChild(style);

	// Mount target
	const target = document.createElement('div');
	target.id = 'annotakit-mount';
	shadow.appendChild(target);

	document.documentElement.appendChild(host);

	component = mount(ExtensionRoot, {
		target,
		props: {
			shadowHost: host
		}
	});
}

init();
