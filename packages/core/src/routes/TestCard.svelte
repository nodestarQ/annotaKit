<script lang="ts">
	interface Props {
		title: string;
		description: string;
	}

	let { title, description }: Props = $props();
</script>

<div class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
	<h3 class="mb-2 font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
	<p class="text-sm text-gray-600 dark:text-gray-400">{description}</p>
</div>
