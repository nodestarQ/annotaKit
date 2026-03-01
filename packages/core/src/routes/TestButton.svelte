<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'primary' | 'secondary' | 'danger';
		disabled?: boolean;
		children: Snippet;
	}

	let { variant = 'primary', disabled = false, children }: Props = $props();

	const variantClasses: Record<string, string> = {
		primary: 'bg-blue-600 text-white hover:bg-blue-700',
		secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200',
		danger: 'bg-red-600 text-white hover:bg-red-700'
	};
</script>

<button
	class="rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 {variantClasses[variant]}"
	{disabled}
>
	{@render children()}
</button>
