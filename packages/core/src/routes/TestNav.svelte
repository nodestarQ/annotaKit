<script lang="ts">
	const links = [
		{ href: '#', label: 'Home' },
		{ href: '#features', label: 'Features' },
		{ href: '#docs', label: 'Docs' },
		{ href: '#about', label: 'About' }
	];
</script>

<nav class="flex items-center gap-1 rounded-lg border-2 border-annotakit-text/80 bg-white p-1 dark:border-annotakit-text-dark/30 dark:bg-annotakit-surface-dark" aria-label="Main navigation">
	{#each links as link}
		<a
			href={link.href}
			class="rounded px-4 py-2 text-sm font-medium text-annotakit-text/50 transition-all duration-300 ease-out hover:bg-annotakit-text hover:text-white dark:text-annotakit-text-dark/50 dark:hover:bg-annotakit-text-dark dark:hover:text-annotakit-surface-dark"
		>
			{link.label}
		</a>
	{/each}
</nav>
