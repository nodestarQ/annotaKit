<svelte:head>
	<title>Features: annotaKit docs</title>
</svelte:head>

<h1>Features</h1>
<p class="lead">Everything annotaKit can do.</p>

<h2>Interaction modes</h2>

<h3>Element click</h3>
<p>
	Click any element on the page to annotate it. annotaKit captures its CSS selector, tag name,
	Svelte component info, and accessibility attributes. A comment field lets you describe the change
	needed.
</p>

<h3>Text selection</h3>
<p>
	Select text within an element to capture the selection along with surrounding context. Useful for
	pointing out specific copy that needs changing.
</p>

<h3>Multi-element drag</h3>
<p>
	Click multiple elements to group them into a single annotation. Handy when a change spans
	several elements, like updating a card layout or navigation group.
</p>

<h2>Output formats</h2>

<p>annotaKit generates structured markdown in three levels of detail:</p>

<ul>
	<li>
		<strong>Compact:</strong> one line per annotation with selector, component name, and comment
	</li>
	<li>
		<strong>Standard:</strong> grouped blocks with selector, component path, comment, and
		accessibility info
	</li>
	<li>
		<strong>Detailed:</strong> everything from Standard plus element dimensions, computed styles,
		and the full Svelte component chain
	</li>
</ul>

<p>
	Switch between formats from the toolbar settings, or set a default via the
	<code>outputFormat</code> prop.
</p>

<h2>Toolbar features</h2>

<h3>Freeze animations</h3>
<p>
	Pause all CSS animations and transitions on the page while annotating. Prevents elements from
	moving while you're trying to click them.
</p>

<h3>Show / hide annotations</h3>
<p>
	Toggle annotation overlay visibility without disabling annotation mode. Useful when you want to
	see the clean UI but keep your annotations intact.
</p>

<h3>Settings panel</h3>
<p>
	Configure the output format from the built-in settings panel.
</p>

<h3>Clear all</h3>
<p>
	Remove all annotations with a confirmation step to prevent accidental deletion.
</p>

<h2>Persistence</h2>

<p>
	Annotations are saved to <code>localStorage</code> and restored across page reloads and
	sessions. Configure the storage key with the <code>storageKey</code> prop, and how long
	annotations are retained with <code>retentionDays</code> (default: 7 days).
</p>

<h2>Theming</h2>

<p>
	annotaKit supports light, dark, and auto themes. In <code>auto</code> mode it follows the
	system preference or detects a <code>dark</code> class on the <code>&lt;html&gt;</code> element.
</p>

<h2>Svelte component detection</h2>

<p>
	In dev mode, annotaKit reads Svelte's debug metadata to capture component names, file paths,
	line numbers, and the full component chain for each annotated element. This gives agents precise
	context about where to make changes.
</p>
