<script lang="ts">
	import TestButton from './TestButton.svelte';
	import TestCard from './TestCard.svelte';
	import TestNav from './TestNav.svelte';
</script>

<div class="mx-auto max-w-4xl space-y-12 p-8">
	<header class="space-y-2">
		<h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Annotakit Playground</h1>
		<p class="text-gray-600 dark:text-gray-400">
			A diverse set of UI elements for testing the annotation toolbar.
		</p>
	</header>

	<!-- Navigation -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">Navigation</h2>
		<TestNav />
	</section>

	<!-- Buttons -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">Buttons</h2>
		<div class="flex flex-wrap gap-3">
			<TestButton variant="primary">Primary</TestButton>
			<TestButton variant="secondary">Secondary</TestButton>
			<TestButton variant="danger">Danger</TestButton>
			<TestButton disabled>Disabled</TestButton>
		</div>
	</section>

	<!-- Cards -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">Cards</h2>
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			<TestCard title="Feature One" description="This card demonstrates a typical feature section with a title and description." />
			<TestCard title="Feature Two" description="Another card to test annotations on repeated component patterns." />
			<TestCard title="Feature Three" description="A third card for testing nth-of-type selector generation." />
		</div>
	</section>

	<!-- Form -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">Form Elements</h2>
		<form class="max-w-md space-y-4" onsubmit={(e) => e.preventDefault()}>
			<div>
				<label for="name" class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
				<input
					id="name"
					type="text"
					placeholder="Enter your name"
					class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
				/>
			</div>
			<div>
				<label for="email" class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
				<input
					id="email"
					type="email"
					placeholder="email@example.com"
					class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
				/>
			</div>
			<div>
				<label for="message" class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
				<textarea
					id="message"
					rows="3"
					placeholder="Your message..."
					class="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
				></textarea>
			</div>
			<button
				type="submit"
				class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
			>
				Submit
			</button>
		</form>
	</section>

	<!-- Text content for selection testing -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">Text Content</h2>
		<article class="prose dark:prose-invert max-w-none" data-testid="article-content">
			<p>
				This paragraph contains text that can be selected to test the text selection annotation mode.
				Try selecting a portion of this text while in "Select Text" mode to see how Annotakit captures
				the selection with surrounding context.
			</p>
			<p>
				A second paragraph provides additional content for testing cross-element selection and context
				extraction. The annotation should capture up to 50 characters of context before and after the
				selected text.
			</p>
		</article>
	</section>

	<!-- Animations -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">Animations</h2>
		<div class="flex flex-wrap items-center gap-6">
			<!-- Pulse -->
			<div class="flex flex-col items-center gap-2">
				<div class="h-12 w-12 animate-pulse rounded-full bg-blue-500"></div>
				<span class="text-xs text-gray-500">Pulse</span>
			</div>
			<!-- Spin -->
			<div class="flex flex-col items-center gap-2">
				<div class="h-12 w-12 animate-spin rounded-lg border-4 border-purple-300 border-t-purple-600"></div>
				<span class="text-xs text-gray-500">Spin</span>
			</div>
			<!-- Bounce -->
			<div class="flex flex-col items-center gap-2">
				<div class="h-12 w-12 animate-bounce rounded-md bg-green-500"></div>
				<span class="text-xs text-gray-500">Bounce</span>
			</div>
			<!-- Ping -->
			<div class="flex flex-col items-center gap-2">
				<div class="relative h-12 w-12">
					<div class="absolute inset-0 animate-ping rounded-full bg-red-400 opacity-75"></div>
					<div class="relative h-12 w-12 rounded-full bg-red-500"></div>
				</div>
				<span class="text-xs text-gray-500">Ping</span>
			</div>
			<!-- Custom float -->
			<div class="flex flex-col items-center gap-2">
				<div class="h-12 w-12 rounded-lg bg-amber-500" style="animation: float 2s ease-in-out infinite;"></div>
				<span class="text-xs text-gray-500">Float</span>
			</div>
		</div>
	</section>

	<!-- Accessibility test section -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">Accessibility</h2>
		<div class="flex gap-4">
			<button role="tab" aria-label="Settings tab" class="rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-600 dark:text-gray-100">
				Settings
			</button>
			<button role="tab" aria-label="Profile tab" class="rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-600 dark:text-gray-100">
				Profile
			</button>
			<img src="https://placehold.co/120x80" alt="Sample placeholder" class="rounded-lg" />
		</div>
	</section>
</div>
