<script lang="ts">
	import '../app.css';
	import { Annotakit } from '$lib/index.js';

	let { children } = $props();
</script>

{@render children()}
<Annotakit position="bottom-right" outputFormat="standard" theme="auto" />
