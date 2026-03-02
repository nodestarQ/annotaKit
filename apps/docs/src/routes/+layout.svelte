<script>
	import '../app.css';
	import { Annotakit } from 'annotakit';

	let { children } = $props();
</script>

{@render children()}
<Annotakit position="bottom-right" theme="dark" minimized={true} />
