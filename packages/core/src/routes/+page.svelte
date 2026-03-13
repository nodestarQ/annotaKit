<script lang="ts">
	import TestButton from './TestButton.svelte';
	import TestCard from './TestCard.svelte';
	import TestNav from './TestNav.svelte';
</script>

<div class="flex min-h-screen bg-annotakit-surface dark:bg-annotakit-surface-dark">
	<!-- Side nav -->
	<nav class="sticky top-0 flex h-screen w-40 shrink-0 flex-col border-r-2 border-annotakit-text/80 px-3 py-4 dark:border-annotakit-text-dark/30">
		<!-- Logo -->
		<div class="mb-4 flex items-center gap-2 px-1">
			<div class="flex h-7 w-7 items-center justify-center rounded-lg bg-annotakit-text dark:bg-annotakit-text-dark">
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice"><defs><pattern id="nav-icon" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="scale(40)" shape-rendering="crispEdges"><rect width="1" height="1" x="4" y="2" fill="white"/><rect width="1" height="1" x="5" y="2" fill="white"/><rect width="1" height="1" x="6" y="2" fill="white"/><rect width="1" height="1" x="7" y="2" fill="white"/><rect width="1" height="1" x="8" y="2" fill="white"/><rect width="1" height="1" x="9" y="2" fill="white"/><rect width="1" height="1" x="10" y="2" fill="white"/><rect width="1" height="1" x="11" y="2" fill="white"/><rect width="1" height="1" x="12" y="2" fill="white"/><rect width="1" height="1" x="13" y="2" fill="white"/><rect width="1" height="1" x="14" y="2" fill="white"/><rect width="1" height="1" x="15" y="2" fill="white"/><rect width="1" height="1" x="4" y="3" fill="white"/><rect width="1" height="1" x="5" y="3" fill="white"/><rect width="1" height="1" x="6" y="3" fill="white"/><rect width="1" height="1" x="7" y="3" fill="white"/><rect width="1" height="1" x="8" y="3" fill="white"/><rect width="1" height="1" x="9" y="3" fill="white"/><rect width="1" height="1" x="10" y="3" fill="white"/><rect width="1" height="1" x="11" y="3" fill="white"/><rect width="1" height="1" x="12" y="3" fill="white"/><rect width="1" height="1" x="13" y="3" fill="white"/><rect width="1" height="1" x="14" y="3" fill="white"/><rect width="1" height="1" x="15" y="3" fill="white"/><rect width="1" height="1" x="4" y="4" fill="white"/><rect width="1" height="1" x="5" y="4" fill="white"/><rect width="1" height="1" x="6" y="4" fill="white"/><rect width="1" height="1" x="7" y="4" fill="white"/><rect width="1" height="1" x="8" y="4" fill="white"/><rect width="1" height="1" x="9" y="4" fill="white"/><rect width="1" height="1" x="10" y="4" fill="white"/><rect width="1" height="1" x="11" y="4" fill="white"/><rect width="1" height="1" x="12" y="4" fill="white"/><rect width="1" height="1" x="13" y="4" fill="white"/><rect width="1" height="1" x="14" y="4" fill="white"/><rect width="1" height="1" x="15" y="4" fill="white"/><rect width="1" height="1" x="3" y="5" fill="white"/><rect width="1" height="1" x="4" y="5" fill="white"/><rect width="1" height="1" x="5" y="5" fill="white"/><rect width="1" height="1" x="6" y="5" fill="white"/><rect width="1" height="1" x="7" y="5" fill="white"/><rect width="1" height="1" x="8" y="5" fill="white"/><rect width="1" height="1" x="9" y="5" fill="white"/><rect width="1" height="1" x="10" y="5" fill="white"/><rect width="1" height="1" x="11" y="5" fill="white"/><rect width="1" height="1" x="12" y="5" fill="white"/><rect width="1" height="1" x="13" y="5" fill="white"/><rect width="1" height="1" x="14" y="5" fill="white"/><rect width="1" height="1" x="15" y="5" fill="white"/><rect width="1" height="1" x="16" y="5" fill="white"/><rect width="1" height="1" x="3" y="6" fill="white"/><rect width="1" height="1" x="4" y="6" fill="white"/><rect width="1" height="1" x="5" y="6" fill="white"/><rect width="1" height="1" x="6" y="6" fill="white"/><rect width="1" height="1" x="7" y="6" fill="white"/><rect width="1" height="1" x="8" y="6" fill="white"/><rect width="1" height="1" x="9" y="6" fill="white"/><rect width="1" height="1" x="10" y="6" fill="white"/><rect width="1" height="1" x="11" y="6" fill="white"/><rect width="1" height="1" x="12" y="6" fill="white"/><rect width="1" height="1" x="13" y="6" fill="white"/><rect width="1" height="1" x="14" y="6" fill="white"/><rect width="1" height="1" x="15" y="6" fill="white"/><rect width="1" height="1" x="16" y="6" fill="white"/><rect width="1" height="1" x="3" y="7" fill="white"/><rect width="1" height="1" x="4" y="7" fill="white"/><rect width="1" height="1" x="15" y="7" fill="white"/><rect width="1" height="1" x="16" y="7" fill="white"/><rect width="1" height="1" x="3" y="8" fill="white"/><rect width="1" height="1" x="4" y="8" fill="white"/><rect width="1" height="1" x="15" y="8" fill="white"/><rect width="1" height="1" x="16" y="8" fill="white"/><rect width="1" height="1" x="3" y="9" fill="white"/><rect width="1" height="1" x="4" y="9" fill="white"/><rect width="1" height="1" x="6" y="9" fill="white"/><rect width="1" height="1" x="7" y="9" fill="white"/><rect width="1" height="1" x="8" y="9" fill="white"/><rect width="1" height="1" x="11" y="9" fill="white"/><rect width="1" height="1" x="12" y="9" fill="white"/><rect width="1" height="1" x="13" y="9" fill="white"/><rect width="1" height="1" x="15" y="9" fill="white"/><rect width="1" height="1" x="16" y="9" fill="white"/><rect width="1" height="1" x="2" y="10" fill="white"/><rect width="1" height="1" x="3" y="10" fill="white"/><rect width="1" height="1" x="4" y="10" fill="white"/><rect width="1" height="1" x="6" y="10" fill="white"/><rect width="1" height="1" x="7" y="10" fill="white"/><rect width="1" height="1" x="8" y="10" fill="white"/><rect width="1" height="1" x="11" y="10" fill="white"/><rect width="1" height="1" x="12" y="10" fill="white"/><rect width="1" height="1" x="13" y="10" fill="white"/><rect width="1" height="1" x="15" y="10" fill="white"/><rect width="1" height="1" x="16" y="10" fill="white"/><rect width="1" height="1" x="17" y="10" fill="white"/><rect width="1" height="1" x="2" y="11" fill="white"/><rect width="1" height="1" x="4" y="11" fill="white"/><rect width="1" height="1" x="6" y="11" fill="white"/><rect width="1" height="1" x="7" y="11" fill="white"/><rect width="1" height="1" x="8" y="11" fill="white"/><rect width="1" height="1" x="11" y="11" fill="white"/><rect width="1" height="1" x="12" y="11" fill="white"/><rect width="1" height="1" x="13" y="11" fill="white"/><rect width="1" height="1" x="15" y="11" fill="white"/><rect width="1" height="1" x="17" y="11" fill="white"/><rect width="1" height="1" x="2" y="12" fill="white"/><rect width="1" height="1" x="4" y="12" fill="white"/><rect width="1" height="1" x="15" y="12" fill="white"/><rect width="1" height="1" x="17" y="12" fill="white"/><rect width="1" height="1" x="2" y="13" fill="white"/><rect width="1" height="1" x="3" y="13" fill="white"/><rect width="1" height="1" x="4" y="13" fill="white"/><rect width="1" height="1" x="7" y="13" fill="white"/><rect width="1" height="1" x="8" y="13" fill="white"/><rect width="1" height="1" x="9" y="13" fill="white"/><rect width="1" height="1" x="10" y="13" fill="white"/><rect width="1" height="1" x="11" y="13" fill="white"/><rect width="1" height="1" x="12" y="13" fill="white"/><rect width="1" height="1" x="15" y="13" fill="white"/><rect width="1" height="1" x="16" y="13" fill="white"/><rect width="1" height="1" x="17" y="13" fill="white"/><rect width="1" height="1" x="4" y="14" fill="white"/><rect width="1" height="1" x="7" y="14" fill="white"/><rect width="1" height="1" x="8" y="14" fill="white"/><rect width="1" height="1" x="9" y="14" fill="white"/><rect width="1" height="1" x="10" y="14" fill="white"/><rect width="1" height="1" x="11" y="14" fill="white"/><rect width="1" height="1" x="12" y="14" fill="white"/><rect width="1" height="1" x="15" y="14" fill="white"/><rect width="1" height="1" x="4" y="15" fill="white"/><rect width="1" height="1" x="7" y="15" fill="white"/><rect width="1" height="1" x="8" y="15" fill="white"/><rect width="1" height="1" x="9" y="15" fill="white"/><rect width="1" height="1" x="10" y="15" fill="white"/><rect width="1" height="1" x="11" y="15" fill="white"/><rect width="1" height="1" x="12" y="15" fill="white"/><rect width="1" height="1" x="15" y="15" fill="white"/><rect width="1" height="1" x="4" y="16" fill="white"/><rect width="1" height="1" x="15" y="16" fill="white"/><rect width="1" height="1" x="4" y="17" fill="white"/><rect width="1" height="1" x="5" y="17" fill="white"/><rect width="1" height="1" x="6" y="17" fill="white"/><rect width="1" height="1" x="7" y="17" fill="white"/><rect width="1" height="1" x="8" y="17" fill="white"/><rect width="1" height="1" x="9" y="17" fill="white"/><rect width="1" height="1" x="10" y="17" fill="white"/><rect width="1" height="1" x="11" y="17" fill="white"/><rect width="1" height="1" x="12" y="17" fill="white"/><rect width="1" height="1" x="13" y="17" fill="white"/><rect width="1" height="1" x="14" y="17" fill="white"/><rect width="1" height="1" x="15" y="17" fill="white"/></pattern></defs><rect width="100%" height="100%" fill="url(#nav-icon)"/></svg>
			</div>
			<span class="text-sm font-medium text-annotakit-text dark:text-annotakit-text-dark">annotaKit</span>
		</div>

		<!-- Nav links -->
		<div class="flex flex-col gap-0.5">
			<a href="#navigation" class="rounded px-2 py-1 text-xs text-annotakit-text/50 transition-all duration-300 ease-out hover:bg-annotakit-text hover:text-white dark:text-annotakit-text-dark/50 dark:hover:bg-annotakit-text-dark dark:hover:text-annotakit-surface-dark">Navigation</a>
			<a href="#buttons" class="rounded px-2 py-1 text-xs text-annotakit-text/50 transition-all duration-300 ease-out hover:bg-annotakit-text hover:text-white dark:text-annotakit-text-dark/50 dark:hover:bg-annotakit-text-dark dark:hover:text-annotakit-surface-dark">Buttons</a>
			<a href="#cards" class="rounded px-2 py-1 text-xs text-annotakit-text/50 transition-all duration-300 ease-out hover:bg-annotakit-text hover:text-white dark:text-annotakit-text-dark/50 dark:hover:bg-annotakit-text-dark dark:hover:text-annotakit-surface-dark">Cards</a>
			<a href="#form" class="rounded px-2 py-1 text-xs text-annotakit-text/50 transition-all duration-300 ease-out hover:bg-annotakit-text hover:text-white dark:text-annotakit-text-dark/50 dark:hover:bg-annotakit-text-dark dark:hover:text-annotakit-surface-dark">Form</a>
			<a href="#text" class="rounded px-2 py-1 text-xs text-annotakit-text/50 transition-all duration-300 ease-out hover:bg-annotakit-text hover:text-white dark:text-annotakit-text-dark/50 dark:hover:bg-annotakit-text-dark dark:hover:text-annotakit-surface-dark">Text</a>
			<a href="#animations" class="rounded px-2 py-1 text-xs text-annotakit-text/50 transition-all duration-300 ease-out hover:bg-annotakit-text hover:text-white dark:text-annotakit-text-dark/50 dark:hover:bg-annotakit-text-dark dark:hover:text-annotakit-surface-dark">Animations</a>
			<a href="#accessibility" class="rounded px-2 py-1 text-xs text-annotakit-text/50 transition-all duration-300 ease-out hover:bg-annotakit-text hover:text-white dark:text-annotakit-text-dark/50 dark:hover:bg-annotakit-text-dark dark:hover:text-annotakit-surface-dark">Accessibility</a>
		</div>

		<!-- Bottom meta -->
		<div class="mt-auto pt-4 text-[10px] text-annotakit-text/30 dark:text-annotakit-text-dark/30">
			Playground
		</div>
	</nav>

	<!-- Main content -->
	<main class="flex-1 overflow-y-auto">
		<article class="mx-auto max-w-3xl px-8 py-10">
			<!-- Hero -->
			<header class="mb-10">
				<h1 class="mb-2 text-2xl font-bold text-annotakit-text dark:text-annotakit-text-dark">
					annotaKit Playground
				</h1>
				<p class="text-sm text-annotakit-text/50 dark:text-annotakit-text-dark/50">
					A diverse set of UI elements for testing the annotation toolbar. Enable the edit toggle, click elements, drag to select, and generate structured markdown output.
				</p>
			</header>

			<!-- Navigation -->
			<section id="navigation" class="mb-10">
				<h2 class="mb-3 text-xs font-medium uppercase tracking-wider text-annotakit-text/40 dark:text-annotakit-text-dark/40">Navigation</h2>
				<TestNav />
			</section>

			<!-- Buttons -->
			<section id="buttons" class="mb-10">
				<h2 class="mb-3 text-xs font-medium uppercase tracking-wider text-annotakit-text/40 dark:text-annotakit-text-dark/40">Buttons</h2>
				<div class="flex flex-wrap justify-center gap-3">
					<TestButton variant="primary">Primary</TestButton>
					<TestButton variant="secondary">Secondary</TestButton>
					<TestButton variant="danger">Danger</TestButton>
					<TestButton disabled>Disabled</TestButton>
				</div>
			</section>

			<!-- Cards -->
			<section id="cards" class="mb-10">
				<h2 class="mb-3 text-xs font-medium uppercase tracking-wider text-annotakit-text/40 dark:text-annotakit-text-dark/40">Cards</h2>
				<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<TestCard title="Feature One" description="This card demonstrates a typical feature section with a title and description." />
					<TestCard title="Feature Two" description="Another card to test annotations on repeated component patterns." />
					<TestCard title="Feature Three" description="A third card for testing nth-of-type selector generation." />
				</div>
			</section>

			<!-- Form -->
			<section id="form" class="mb-10">
				<h2 class="mb-3 text-xs font-medium uppercase tracking-wider text-annotakit-text/40 dark:text-annotakit-text-dark/40">Form Elements</h2>
				<form class="space-y-4 rounded-lg border-2 border-annotakit-text/80 bg-white p-5 dark:border-annotakit-text-dark/30 dark:bg-annotakit-surface-dark" onsubmit={(e) => { e.preventDefault(); alert('Submit button has been clicked, if you want to block interactions do so in the settings'); }}>
					<div>
						<label for="name" class="mb-1 block text-sm font-medium text-annotakit-text/70 dark:text-annotakit-text-dark/70">Name</label>
						<input
							id="name"
							type="text"
							placeholder="Enter your name"
							class="w-full rounded border-2 border-annotakit-text/80 bg-annotakit-surface px-3 py-2 text-sm text-annotakit-text placeholder:text-annotakit-text/30 focus:border-annotakit-primary focus:outline-none dark:border-annotakit-text-dark/30 dark:bg-annotakit-surface-dark dark:text-annotakit-text-dark dark:placeholder:text-annotakit-text-dark/30"
						/>
					</div>
					<div>
						<label for="email" class="mb-1 block text-sm font-medium text-annotakit-text/70 dark:text-annotakit-text-dark/70">Email</label>
						<input
							id="email"
							type="email"
							placeholder="email@example.com"
							class="w-full rounded border-2 border-annotakit-text/80 bg-annotakit-surface px-3 py-2 text-sm text-annotakit-text placeholder:text-annotakit-text/30 focus:border-annotakit-primary focus:outline-none dark:border-annotakit-text-dark/30 dark:bg-annotakit-surface-dark dark:text-annotakit-text-dark dark:placeholder:text-annotakit-text-dark/30"
						/>
					</div>
					<div>
						<label for="message" class="mb-1 block text-sm font-medium text-annotakit-text/70 dark:text-annotakit-text-dark/70">Message</label>
						<textarea
							id="message"
							rows="3"
							placeholder="Your message..."
							class="w-full resize-y rounded border-2 border-annotakit-text/80 bg-annotakit-surface px-3 py-2 text-sm text-annotakit-text placeholder:text-annotakit-text/30 focus:border-annotakit-primary focus:outline-none dark:border-annotakit-text-dark/30 dark:bg-annotakit-surface-dark dark:text-annotakit-text-dark dark:placeholder:text-annotakit-text-dark/30"
						></textarea>
					</div>
					<button
						type="submit"
						class="rounded border-2 border-annotakit-text/80 bg-annotakit-text px-4 py-2 text-sm font-medium text-white transition-all duration-300 ease-out hover:bg-annotakit-primary dark:border-annotakit-text-dark/30 dark:bg-annotakit-text-dark dark:text-annotakit-surface-dark dark:hover:bg-annotakit-primary"
					>
						Submit
					</button>
				</form>
			</section>

			<!-- Text content -->
			<section id="text" class="mb-10">
				<h2 class="mb-3 text-xs font-medium uppercase tracking-wider text-annotakit-text/40 dark:text-annotakit-text-dark/40">Text Content</h2>
				<article class="max-w-none space-y-3 rounded-lg border-2 border-annotakit-text/80 bg-white p-5 dark:border-annotakit-text-dark/30 dark:bg-annotakit-surface-dark" data-testid="article-content">
					<p class="text-sm leading-relaxed text-annotakit-text/80 dark:text-annotakit-text-dark/80">
						This paragraph contains text that can be selected to test the text selection annotation mode.
						Try selecting a portion of this text while the edit toggle is active to see how Annotakit captures
						the selection with surrounding context.
					</p>
					<p class="text-sm leading-relaxed text-annotakit-text/80 dark:text-annotakit-text-dark/80">
						A second paragraph provides additional content for testing cross-element selection and context
						extraction. The annotation should capture up to 50 characters of context before and after the
						selected text.
					</p>
				</article>
			</section>

			<!-- Animations -->
			<section id="animations" class="mb-10">
				<h2 class="mb-3 text-xs font-medium uppercase tracking-wider text-annotakit-text/40 dark:text-annotakit-text-dark/40">Animations</h2>
				<div class="flex items-center justify-between rounded-lg border-2 border-annotakit-text/80 bg-white p-5 dark:border-annotakit-text-dark/30 dark:bg-annotakit-surface-dark">
					<div class="flex flex-col items-center gap-2">
						<div class="h-12 w-12 animate-pulse rounded-full bg-annotakit-primary"></div>
						<span class="text-[10px] font-medium uppercase tracking-wider text-annotakit-text/40 dark:text-annotakit-text-dark/40">Pulse</span>
					</div>
					<div class="flex flex-col items-center gap-2">
						<div class="h-12 w-12 animate-spin rounded-lg border-4 border-annotakit-primary-light border-t-annotakit-primary-dark"></div>
						<span class="text-[10px] font-medium uppercase tracking-wider text-annotakit-text/40 dark:text-annotakit-text-dark/40">Spin</span>
					</div>
					<div class="flex flex-col items-center gap-2">
						<div class="h-12 w-12 animate-bounce rounded-md bg-annotakit-accent"></div>
						<span class="text-[10px] font-medium uppercase tracking-wider text-annotakit-text/40 dark:text-annotakit-text-dark/40">Bounce</span>
					</div>
					<div class="flex flex-col items-center gap-2">
						<div class="relative h-12 w-12">
							<div class="absolute inset-0 animate-ping rounded-full bg-annotakit-danger opacity-75"></div>
							<div class="relative h-12 w-12 rounded-full bg-annotakit-danger"></div>
						</div>
						<span class="text-[10px] font-medium uppercase tracking-wider text-annotakit-text/40 dark:text-annotakit-text-dark/40">Ping</span>
					</div>
					<div class="flex flex-col items-center gap-2">
						<div class="h-12 w-12 rounded-lg bg-annotakit-warning" style="animation: float 2s ease-in-out infinite;"></div>
						<span class="text-[10px] font-medium uppercase tracking-wider text-annotakit-text/40 dark:text-annotakit-text-dark/40">Float</span>
					</div>
				</div>
			</section>

			<!-- Accessibility -->
			<section id="accessibility" class="mb-10">
				<h2 class="mb-3 text-xs font-medium uppercase tracking-wider text-annotakit-text/40 dark:text-annotakit-text-dark/40">Accessibility</h2>
				<div class="flex items-center justify-center gap-4">
					<button role="tab" aria-label="Settings tab" class="rounded border-2 border-annotakit-text/80 px-4 py-2 text-sm text-annotakit-text/70 transition-all duration-300 ease-out hover:bg-annotakit-text hover:text-white dark:border-annotakit-text-dark/30 dark:text-annotakit-text-dark/70 dark:hover:bg-annotakit-text-dark dark:hover:text-annotakit-surface-dark" onclick={() => alert('Settings tab has been clicked, if you want to block interactions do so in the settings')}>
						Settings
					</button>
					<button role="tab" aria-label="Profile tab" class="rounded border-2 border-annotakit-text/80 px-4 py-2 text-sm text-annotakit-text/70 transition-all duration-300 ease-out hover:bg-annotakit-text hover:text-white dark:border-annotakit-text-dark/30 dark:text-annotakit-text-dark/70 dark:hover:bg-annotakit-text-dark dark:hover:text-annotakit-surface-dark" onclick={() => alert('Profile tab has been clicked, if you want to block interactions do so in the settings')}>
						Profile
					</button>
					<img src="https://placehold.co/120x80" alt="Sample placeholder" class="rounded-lg" />
				</div>
			</section>
		</article>
	</main>
</div>
