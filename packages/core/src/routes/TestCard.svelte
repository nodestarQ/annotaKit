<script lang="ts">
	interface Props {
		title: string;
		description: string;
	}

	let { title, description }: Props = $props();
</script>

<div class="rounded-lg border-2 border-annotakit-text/80 bg-white p-5 transition-all duration-300 ease-out hover:shadow-annotakit dark:border-annotakit-text-dark/30 dark:bg-annotakit-surface-dark">
	<h3 class="mb-2 font-semibold text-annotakit-text dark:text-annotakit-text-dark">{title}</h3>
	<p class="text-sm text-annotakit-text/60 dark:text-annotakit-text-dark/60">{description}</p>
</div>
