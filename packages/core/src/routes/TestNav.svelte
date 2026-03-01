<script lang="ts">
	const links = [
		{ href: '#', label: 'Home' },
		{ href: '#features', label: 'Features' },
		{ href: '#docs', label: 'Docs' },
		{ href: '#about', label: 'About' }
	];
</script>

<nav class="flex items-center gap-1 rounded-xl border border-gray-200 bg-white p-1 dark:border-gray-700 dark:bg-gray-800" aria-label="Main navigation">
	{#each links as link}
		<a
			href={link.href}
			class="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
		>
			{link.label}
		</a>
	{/each}
</nav>
