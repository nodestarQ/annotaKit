<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'primary' | 'secondary' | 'danger';
		disabled?: boolean;
		children: Snippet;
	}

	let { variant = 'primary', disabled = false, children }: Props = $props();

	const variantClasses: Record<string, string> = {
		primary: 'border-2 border-annotakit-text/80 bg-annotakit-text text-white hover:bg-annotakit-primary dark:border-annotakit-text-dark/30 dark:bg-annotakit-text-dark dark:text-annotakit-surface-dark dark:hover:bg-annotakit-primary',
		secondary: 'border-2 border-annotakit-text/80 text-annotakit-text/70 hover:bg-annotakit-text hover:text-white dark:border-annotakit-text-dark/30 dark:text-annotakit-text-dark/70 dark:hover:bg-annotakit-text-dark dark:hover:text-annotakit-surface-dark',
		danger: 'border-2 border-annotakit-text/80 bg-annotakit-danger text-white hover:opacity-90 dark:border-annotakit-text-dark/30'
	};
</script>

<button
	class="rounded px-4 py-2 text-sm font-medium transition-all duration-300 ease-out disabled:cursor-not-allowed disabled:opacity-50 {variantClasses[variant]}"
	{disabled}
>
	{@render children()}
</button>
