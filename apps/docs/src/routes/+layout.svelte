<script lang="ts">
	import '../app.css';
	import { Annotakit } from 'annotakit';
	import { page } from '$app/state';
	import { Drawer } from 'vaul-svelte';
	import { afterNavigate } from '$app/navigation';
	import { PUBLIC_UMAMI_URL, PUBLIC_UMAMI_WEBSITE_ID } from '$env/static/public';

	let { children } = $props();
	let drawerOpen = $state(false);
	const version = __ANNOTAKIT_VERSION__;

	afterNavigate(() => {
		drawerOpen = false;
	});

	const nav = [
		{
			links: [
				{ label: 'Getting Started', href: '/' },
				{ label: 'Installation', href: '/docs/installation' }
			]
		},
		{
			section: 'Reference',
			links: [{ label: 'Features', href: '/docs/features' }]
		}
	];

	function isActive(href: string) {
		return page.url.pathname === href;
	}
</script>

<svelte:head>
	{#if PUBLIC_UMAMI_URL && PUBLIC_UMAMI_WEBSITE_ID}
		<script defer src={PUBLIC_UMAMI_URL} data-website-id={PUBLIC_UMAMI_WEBSITE_ID}></script>
	{/if}
</svelte:head>

<div class="min-h-screen bg-surface">
	<!-- Mobile top bar -->
	<div class="fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-14 px-4 bg-surface md:hidden">
		<a href="/" class="flex items-center gap-2 text-text">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" class="w-6 h-6" aria-label="annotakit logo"><defs><pattern id="ocb-mobile" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="translate(0 0) scale(40) rotate(0)" shape-rendering="crispEdges"><rect width="1" height="1" x="4" y="2" fill="currentColor"/><rect width="1" height="1" x="5" y="2" fill="currentColor"/><rect width="1" height="1" x="6" y="2" fill="currentColor"/><rect width="1" height="1" x="7" y="2" fill="currentColor"/><rect width="1" height="1" x="8" y="2" fill="currentColor"/><rect width="1" height="1" x="9" y="2" fill="currentColor"/><rect width="1" height="1" x="10" y="2" fill="currentColor"/><rect width="1" height="1" x="11" y="2" fill="currentColor"/><rect width="1" height="1" x="12" y="2" fill="currentColor"/><rect width="1" height="1" x="13" y="2" fill="currentColor"/><rect width="1" height="1" x="14" y="2" fill="currentColor"/><rect width="1" height="1" x="15" y="2" fill="currentColor"/><rect width="1" height="1" x="4" y="3" fill="currentColor"/><rect width="1" height="1" x="5" y="3" fill="currentColor"/><rect width="1" height="1" x="6" y="3" fill="currentColor"/><rect width="1" height="1" x="7" y="3" fill="currentColor"/><rect width="1" height="1" x="8" y="3" fill="currentColor"/><rect width="1" height="1" x="9" y="3" fill="currentColor"/><rect width="1" height="1" x="10" y="3" fill="currentColor"/><rect width="1" height="1" x="11" y="3" fill="currentColor"/><rect width="1" height="1" x="12" y="3" fill="currentColor"/><rect width="1" height="1" x="13" y="3" fill="currentColor"/><rect width="1" height="1" x="14" y="3" fill="currentColor"/><rect width="1" height="1" x="15" y="3" fill="currentColor"/><rect width="1" height="1" x="4" y="4" fill="currentColor"/><rect width="1" height="1" x="5" y="4" fill="currentColor"/><rect width="1" height="1" x="6" y="4" fill="currentColor"/><rect width="1" height="1" x="7" y="4" fill="currentColor"/><rect width="1" height="1" x="8" y="4" fill="currentColor"/><rect width="1" height="1" x="9" y="4" fill="currentColor"/><rect width="1" height="1" x="10" y="4" fill="currentColor"/><rect width="1" height="1" x="11" y="4" fill="currentColor"/><rect width="1" height="1" x="12" y="4" fill="currentColor"/><rect width="1" height="1" x="13" y="4" fill="currentColor"/><rect width="1" height="1" x="14" y="4" fill="currentColor"/><rect width="1" height="1" x="15" y="4" fill="currentColor"/><rect width="1" height="1" x="3" y="5" fill="currentColor"/><rect width="1" height="1" x="4" y="5" fill="currentColor"/><rect width="1" height="1" x="5" y="5" fill="currentColor"/><rect width="1" height="1" x="6" y="5" fill="currentColor"/><rect width="1" height="1" x="7" y="5" fill="currentColor"/><rect width="1" height="1" x="8" y="5" fill="currentColor"/><rect width="1" height="1" x="9" y="5" fill="currentColor"/><rect width="1" height="1" x="10" y="5" fill="currentColor"/><rect width="1" height="1" x="11" y="5" fill="currentColor"/><rect width="1" height="1" x="12" y="5" fill="currentColor"/><rect width="1" height="1" x="13" y="5" fill="currentColor"/><rect width="1" height="1" x="14" y="5" fill="currentColor"/><rect width="1" height="1" x="15" y="5" fill="currentColor"/><rect width="1" height="1" x="16" y="5" fill="currentColor"/><rect width="1" height="1" x="3" y="6" fill="currentColor"/><rect width="1" height="1" x="4" y="6" fill="currentColor"/><rect width="1" height="1" x="5" y="6" fill="currentColor"/><rect width="1" height="1" x="6" y="6" fill="currentColor"/><rect width="1" height="1" x="7" y="6" fill="currentColor"/><rect width="1" height="1" x="8" y="6" fill="currentColor"/><rect width="1" height="1" x="9" y="6" fill="currentColor"/><rect width="1" height="1" x="10" y="6" fill="currentColor"/><rect width="1" height="1" x="11" y="6" fill="currentColor"/><rect width="1" height="1" x="12" y="6" fill="currentColor"/><rect width="1" height="1" x="13" y="6" fill="currentColor"/><rect width="1" height="1" x="14" y="6" fill="currentColor"/><rect width="1" height="1" x="15" y="6" fill="currentColor"/><rect width="1" height="1" x="16" y="6" fill="currentColor"/><rect width="1" height="1" x="3" y="7" fill="currentColor"/><rect width="1" height="1" x="4" y="7" fill="currentColor"/><rect width="1" height="1" x="15" y="7" fill="currentColor"/><rect width="1" height="1" x="16" y="7" fill="currentColor"/><rect width="1" height="1" x="3" y="8" fill="currentColor"/><rect width="1" height="1" x="4" y="8" fill="currentColor"/><rect width="1" height="1" x="15" y="8" fill="currentColor"/><rect width="1" height="1" x="16" y="8" fill="currentColor"/><rect width="1" height="1" x="3" y="9" fill="currentColor"/><rect width="1" height="1" x="4" y="9" fill="currentColor"/><rect width="1" height="1" x="6" y="9" fill="currentColor"/><rect width="1" height="1" x="7" y="9" fill="currentColor"/><rect width="1" height="1" x="8" y="9" fill="currentColor"/><rect width="1" height="1" x="11" y="9" fill="currentColor"/><rect width="1" height="1" x="12" y="9" fill="currentColor"/><rect width="1" height="1" x="13" y="9" fill="currentColor"/><rect width="1" height="1" x="15" y="9" fill="currentColor"/><rect width="1" height="1" x="16" y="9" fill="currentColor"/><rect width="1" height="1" x="2" y="10" fill="currentColor"/><rect width="1" height="1" x="3" y="10" fill="currentColor"/><rect width="1" height="1" x="4" y="10" fill="currentColor"/><rect width="1" height="1" x="6" y="10" fill="currentColor"/><rect width="1" height="1" x="7" y="10" fill="currentColor"/><rect width="1" height="1" x="8" y="10" fill="currentColor"/><rect width="1" height="1" x="11" y="10" fill="currentColor"/><rect width="1" height="1" x="12" y="10" fill="currentColor"/><rect width="1" height="1" x="13" y="10" fill="currentColor"/><rect width="1" height="1" x="15" y="10" fill="currentColor"/><rect width="1" height="1" x="16" y="10" fill="currentColor"/><rect width="1" height="1" x="17" y="10" fill="currentColor"/><rect width="1" height="1" x="2" y="11" fill="currentColor"/><rect width="1" height="1" x="4" y="11" fill="currentColor"/><rect width="1" height="1" x="6" y="11" fill="currentColor"/><rect width="1" height="1" x="7" y="11" fill="currentColor"/><rect width="1" height="1" x="8" y="11" fill="currentColor"/><rect width="1" height="1" x="11" y="11" fill="currentColor"/><rect width="1" height="1" x="12" y="11" fill="currentColor"/><rect width="1" height="1" x="13" y="11" fill="currentColor"/><rect width="1" height="1" x="15" y="11" fill="currentColor"/><rect width="1" height="1" x="17" y="11" fill="currentColor"/><rect width="1" height="1" x="2" y="12" fill="currentColor"/><rect width="1" height="1" x="4" y="12" fill="currentColor"/><rect width="1" height="1" x="15" y="12" fill="currentColor"/><rect width="1" height="1" x="17" y="12" fill="currentColor"/><rect width="1" height="1" x="2" y="13" fill="currentColor"/><rect width="1" height="1" x="3" y="13" fill="currentColor"/><rect width="1" height="1" x="4" y="13" fill="currentColor"/><rect width="1" height="1" x="7" y="13" fill="currentColor"/><rect width="1" height="1" x="8" y="13" fill="currentColor"/><rect width="1" height="1" x="9" y="13" fill="currentColor"/><rect width="1" height="1" x="10" y="13" fill="currentColor"/><rect width="1" height="1" x="11" y="13" fill="currentColor"/><rect width="1" height="1" x="12" y="13" fill="currentColor"/><rect width="1" height="1" x="15" y="13" fill="currentColor"/><rect width="1" height="1" x="16" y="13" fill="currentColor"/><rect width="1" height="1" x="17" y="13" fill="currentColor"/><rect width="1" height="1" x="4" y="14" fill="currentColor"/><rect width="1" height="1" x="7" y="14" fill="currentColor"/><rect width="1" height="1" x="8" y="14" fill="currentColor"/><rect width="1" height="1" x="9" y="14" fill="currentColor"/><rect width="1" height="1" x="10" y="14" fill="currentColor"/><rect width="1" height="1" x="11" y="14" fill="currentColor"/><rect width="1" height="1" x="12" y="14" fill="currentColor"/><rect width="1" height="1" x="15" y="14" fill="currentColor"/><rect width="1" height="1" x="4" y="15" fill="currentColor"/><rect width="1" height="1" x="7" y="15" fill="currentColor"/><rect width="1" height="1" x="8" y="15" fill="currentColor"/><rect width="1" height="1" x="9" y="15" fill="currentColor"/><rect width="1" height="1" x="10" y="15" fill="currentColor"/><rect width="1" height="1" x="11" y="15" fill="currentColor"/><rect width="1" height="1" x="12" y="15" fill="currentColor"/><rect width="1" height="1" x="15" y="15" fill="currentColor"/><rect width="1" height="1" x="4" y="16" fill="currentColor"/><rect width="1" height="1" x="15" y="16" fill="currentColor"/><rect width="1" height="1" x="4" y="17" fill="currentColor"/><rect width="1" height="1" x="5" y="17" fill="currentColor"/><rect width="1" height="1" x="6" y="17" fill="currentColor"/><rect width="1" height="1" x="7" y="17" fill="currentColor"/><rect width="1" height="1" x="8" y="17" fill="currentColor"/><rect width="1" height="1" x="9" y="17" fill="currentColor"/><rect width="1" height="1" x="10" y="17" fill="currentColor"/><rect width="1" height="1" x="11" y="17" fill="currentColor"/><rect width="1" height="1" x="12" y="17" fill="currentColor"/><rect width="1" height="1" x="13" y="17" fill="currentColor"/><rect width="1" height="1" x="14" y="17" fill="currentColor"/><rect width="1" height="1" x="15" y="17" fill="currentColor"/></pattern></defs><rect width="100%" height="100%" fill="url(#ocb-mobile)"/></svg>
			<span class="text-sm font-semibold">annotaKit</span>
		</a>
		<button
			onclick={() => (drawerOpen = true)}
			class="p-2 text-text-muted hover:text-text"
			aria-label="Open navigation"
		>
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
			</svg>
		</button>
	</div>

	<!-- Mobile drawer -->
	<Drawer.Root bind:open={drawerOpen} direction="bottom" noBodyStyles>
		<Drawer.Portal>
			<Drawer.Overlay class="fixed inset-0 z-50 bg-black/40" />
			<Drawer.Content class="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl bg-surface-raised border-t border-border">
				<div class="mx-auto mt-3 mb-2 h-1 w-10 rounded-full bg-border"></div>
				<nav class="px-6 pb-8 pt-2 space-y-4">
					{#each nav as group}
						<div>
							{#if group.section}
								<h3 class="text-xs font-light tracking-wider text-text-muted mb-2">
									{group.section}
								</h3>
							{/if}
							<ul class="space-y-1">
								{#each group.links as link}
									<li>
										<a
											href={link.href}
											onclick={() => (drawerOpen = false)}
											class="block py-1.5 text-sm transition-colors {isActive(link.href)
												? 'text-primary font-medium'
												: 'text-text-muted hover:text-text'}"
										>
											{link.label}
										</a>
									</li>
								{/each}
							</ul>
						</div>
					{/each}
				</nav>
			</Drawer.Content>
		</Drawer.Portal>
	</Drawer.Root>

	<!-- Centered shell -->
	<div class="max-w-[960px] mx-auto flex min-h-screen">
		<!-- Desktop sidebar -->
		<aside class="hidden md:flex sticky top-0 h-screen w-64 bg-surface flex-col shrink-0">
			<nav class="flex-1 overflow-y-auto px-4 pt-12 space-y-6">
				<div class="grid w-fit mb-8 text-text gap-1">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" class="min-w-0 aspect-square mb-1" aria-label="annotakit logo"><defs><pattern id="ocb-pattern" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="translate(0 0) scale(40) rotate(0)" shape-rendering="crispEdges"><rect width="1" height="1" x="4" y="2" fill="currentColor"/><rect width="1" height="1" x="5" y="2" fill="currentColor"/><rect width="1" height="1" x="6" y="2" fill="currentColor"/><rect width="1" height="1" x="7" y="2" fill="currentColor"/><rect width="1" height="1" x="8" y="2" fill="currentColor"/><rect width="1" height="1" x="9" y="2" fill="currentColor"/><rect width="1" height="1" x="10" y="2" fill="currentColor"/><rect width="1" height="1" x="11" y="2" fill="currentColor"/><rect width="1" height="1" x="12" y="2" fill="currentColor"/><rect width="1" height="1" x="13" y="2" fill="currentColor"/><rect width="1" height="1" x="14" y="2" fill="currentColor"/><rect width="1" height="1" x="15" y="2" fill="currentColor"/><rect width="1" height="1" x="4" y="3" fill="currentColor"/><rect width="1" height="1" x="5" y="3" fill="currentColor"/><rect width="1" height="1" x="6" y="3" fill="currentColor"/><rect width="1" height="1" x="7" y="3" fill="currentColor"/><rect width="1" height="1" x="8" y="3" fill="currentColor"/><rect width="1" height="1" x="9" y="3" fill="currentColor"/><rect width="1" height="1" x="10" y="3" fill="currentColor"/><rect width="1" height="1" x="11" y="3" fill="currentColor"/><rect width="1" height="1" x="12" y="3" fill="currentColor"/><rect width="1" height="1" x="13" y="3" fill="currentColor"/><rect width="1" height="1" x="14" y="3" fill="currentColor"/><rect width="1" height="1" x="15" y="3" fill="currentColor"/><rect width="1" height="1" x="4" y="4" fill="currentColor"/><rect width="1" height="1" x="5" y="4" fill="currentColor"/><rect width="1" height="1" x="6" y="4" fill="currentColor"/><rect width="1" height="1" x="7" y="4" fill="currentColor"/><rect width="1" height="1" x="8" y="4" fill="currentColor"/><rect width="1" height="1" x="9" y="4" fill="currentColor"/><rect width="1" height="1" x="10" y="4" fill="currentColor"/><rect width="1" height="1" x="11" y="4" fill="currentColor"/><rect width="1" height="1" x="12" y="4" fill="currentColor"/><rect width="1" height="1" x="13" y="4" fill="currentColor"/><rect width="1" height="1" x="14" y="4" fill="currentColor"/><rect width="1" height="1" x="15" y="4" fill="currentColor"/><rect width="1" height="1" x="3" y="5" fill="currentColor"/><rect width="1" height="1" x="4" y="5" fill="currentColor"/><rect width="1" height="1" x="5" y="5" fill="currentColor"/><rect width="1" height="1" x="6" y="5" fill="currentColor"/><rect width="1" height="1" x="7" y="5" fill="currentColor"/><rect width="1" height="1" x="8" y="5" fill="currentColor"/><rect width="1" height="1" x="9" y="5" fill="currentColor"/><rect width="1" height="1" x="10" y="5" fill="currentColor"/><rect width="1" height="1" x="11" y="5" fill="currentColor"/><rect width="1" height="1" x="12" y="5" fill="currentColor"/><rect width="1" height="1" x="13" y="5" fill="currentColor"/><rect width="1" height="1" x="14" y="5" fill="currentColor"/><rect width="1" height="1" x="15" y="5" fill="currentColor"/><rect width="1" height="1" x="16" y="5" fill="currentColor"/><rect width="1" height="1" x="3" y="6" fill="currentColor"/><rect width="1" height="1" x="4" y="6" fill="currentColor"/><rect width="1" height="1" x="5" y="6" fill="currentColor"/><rect width="1" height="1" x="6" y="6" fill="currentColor"/><rect width="1" height="1" x="7" y="6" fill="currentColor"/><rect width="1" height="1" x="8" y="6" fill="currentColor"/><rect width="1" height="1" x="9" y="6" fill="currentColor"/><rect width="1" height="1" x="10" y="6" fill="currentColor"/><rect width="1" height="1" x="11" y="6" fill="currentColor"/><rect width="1" height="1" x="12" y="6" fill="currentColor"/><rect width="1" height="1" x="13" y="6" fill="currentColor"/><rect width="1" height="1" x="14" y="6" fill="currentColor"/><rect width="1" height="1" x="15" y="6" fill="currentColor"/><rect width="1" height="1" x="16" y="6" fill="currentColor"/><rect width="1" height="1" x="3" y="7" fill="currentColor"/><rect width="1" height="1" x="4" y="7" fill="currentColor"/><rect width="1" height="1" x="15" y="7" fill="currentColor"/><rect width="1" height="1" x="16" y="7" fill="currentColor"/><rect width="1" height="1" x="3" y="8" fill="currentColor"/><rect width="1" height="1" x="4" y="8" fill="currentColor"/><rect width="1" height="1" x="15" y="8" fill="currentColor"/><rect width="1" height="1" x="16" y="8" fill="currentColor"/><rect width="1" height="1" x="3" y="9" fill="currentColor"/><rect width="1" height="1" x="4" y="9" fill="currentColor"/><rect width="1" height="1" x="6" y="9" fill="currentColor"/><rect width="1" height="1" x="7" y="9" fill="currentColor"/><rect width="1" height="1" x="8" y="9" fill="currentColor"/><rect width="1" height="1" x="11" y="9" fill="currentColor"/><rect width="1" height="1" x="12" y="9" fill="currentColor"/><rect width="1" height="1" x="13" y="9" fill="currentColor"/><rect width="1" height="1" x="15" y="9" fill="currentColor"/><rect width="1" height="1" x="16" y="9" fill="currentColor"/><rect width="1" height="1" x="2" y="10" fill="currentColor"/><rect width="1" height="1" x="3" y="10" fill="currentColor"/><rect width="1" height="1" x="4" y="10" fill="currentColor"/><rect width="1" height="1" x="6" y="10" fill="currentColor"/><rect width="1" height="1" x="7" y="10" fill="currentColor"/><rect width="1" height="1" x="8" y="10" fill="currentColor"/><rect width="1" height="1" x="11" y="10" fill="currentColor"/><rect width="1" height="1" x="12" y="10" fill="currentColor"/><rect width="1" height="1" x="13" y="10" fill="currentColor"/><rect width="1" height="1" x="15" y="10" fill="currentColor"/><rect width="1" height="1" x="16" y="10" fill="currentColor"/><rect width="1" height="1" x="17" y="10" fill="currentColor"/><rect width="1" height="1" x="2" y="11" fill="currentColor"/><rect width="1" height="1" x="4" y="11" fill="currentColor"/><rect width="1" height="1" x="6" y="11" fill="currentColor"/><rect width="1" height="1" x="7" y="11" fill="currentColor"/><rect width="1" height="1" x="8" y="11" fill="currentColor"/><rect width="1" height="1" x="11" y="11" fill="currentColor"/><rect width="1" height="1" x="12" y="11" fill="currentColor"/><rect width="1" height="1" x="13" y="11" fill="currentColor"/><rect width="1" height="1" x="15" y="11" fill="currentColor"/><rect width="1" height="1" x="17" y="11" fill="currentColor"/><rect width="1" height="1" x="2" y="12" fill="currentColor"/><rect width="1" height="1" x="4" y="12" fill="currentColor"/><rect width="1" height="1" x="15" y="12" fill="currentColor"/><rect width="1" height="1" x="17" y="12" fill="currentColor"/><rect width="1" height="1" x="2" y="13" fill="currentColor"/><rect width="1" height="1" x="3" y="13" fill="currentColor"/><rect width="1" height="1" x="4" y="13" fill="currentColor"/><rect width="1" height="1" x="7" y="13" fill="currentColor"/><rect width="1" height="1" x="8" y="13" fill="currentColor"/><rect width="1" height="1" x="9" y="13" fill="currentColor"/><rect width="1" height="1" x="10" y="13" fill="currentColor"/><rect width="1" height="1" x="11" y="13" fill="currentColor"/><rect width="1" height="1" x="12" y="13" fill="currentColor"/><rect width="1" height="1" x="15" y="13" fill="currentColor"/><rect width="1" height="1" x="16" y="13" fill="currentColor"/><rect width="1" height="1" x="17" y="13" fill="currentColor"/><rect width="1" height="1" x="4" y="14" fill="currentColor"/><rect width="1" height="1" x="7" y="14" fill="currentColor"/><rect width="1" height="1" x="8" y="14" fill="currentColor"/><rect width="1" height="1" x="9" y="14" fill="currentColor"/><rect width="1" height="1" x="10" y="14" fill="currentColor"/><rect width="1" height="1" x="11" y="14" fill="currentColor"/><rect width="1" height="1" x="12" y="14" fill="currentColor"/><rect width="1" height="1" x="15" y="14" fill="currentColor"/><rect width="1" height="1" x="4" y="15" fill="currentColor"/><rect width="1" height="1" x="7" y="15" fill="currentColor"/><rect width="1" height="1" x="8" y="15" fill="currentColor"/><rect width="1" height="1" x="9" y="15" fill="currentColor"/><rect width="1" height="1" x="10" y="15" fill="currentColor"/><rect width="1" height="1" x="11" y="15" fill="currentColor"/><rect width="1" height="1" x="12" y="15" fill="currentColor"/><rect width="1" height="1" x="15" y="15" fill="currentColor"/><rect width="1" height="1" x="4" y="16" fill="currentColor"/><rect width="1" height="1" x="15" y="16" fill="currentColor"/><rect width="1" height="1" x="4" y="17" fill="currentColor"/><rect width="1" height="1" x="5" y="17" fill="currentColor"/><rect width="1" height="1" x="6" y="17" fill="currentColor"/><rect width="1" height="1" x="7" y="17" fill="currentColor"/><rect width="1" height="1" x="8" y="17" fill="currentColor"/><rect width="1" height="1" x="9" y="17" fill="currentColor"/><rect width="1" height="1" x="10" y="17" fill="currentColor"/><rect width="1" height="1" x="11" y="17" fill="currentColor"/><rect width="1" height="1" x="12" y="17" fill="currentColor"/><rect width="1" height="1" x="13" y="17" fill="currentColor"/><rect width="1" height="1" x="14" y="17" fill="currentColor"/><rect width="1" height="1" x="15" y="17" fill="currentColor"/></pattern></defs><rect width="100%" height="100%" fill="url(#ocb-pattern)"/></svg>
					<span class="text-lg font-semibold text-text">annotaKit</span>
					<div class="flex items-center gap-2 text-xs">
						<a href="https://www.npmjs.com/package/annotakit" target="_blank" rel="noopener noreferrer" class="text-text-muted hover:text-text transition-colors">v{version}</a>
						<span class="text-border">|</span>
						<a href="https://github.com/nodestarQ/annotaKit" target="_blank" rel="noopener noreferrer" class="text-text-muted hover:text-text transition-colors">GitHub</a>
					</div>
				</div>
				{#each nav as group}
					<div>
						{#if group.section}
							<h3 class="text-xs font-light tracking-wider text-text-muted mb-2">
								{group.section}
							</h3>
						{/if}
						<ul class="space-y-0.5">
							{#each group.links as link}
								<li>
									<a
										href={link.href}
										class="block py-0 text-sm rounded transition-colors {isActive(link.href)
											? 'text-primary font-medium'
											: 'text-text-muted hover:text-text'}"
									>
										{link.label}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</nav>
		</aside>

		<!-- Content -->
		<main class="flex-1 min-w-0 pt-14 md:pt-0 md:text-sm">
			<div class="px-4 py-12 prose md:px-6 md:max-w-[80%]">
				{@render children()}
			</div>
			<footer class="px-4 pb-8 text-xs text-text-muted md:px-6">
				made by <a href="https://x.com/nodestarQ" target="_blank" rel="noopener noreferrer" class="text-text-muted hover:text-text transition-colors underline">nodestarQ</a> | special thanks to <a href="https://x.com/abashoverse" target="_blank" rel="noopener noreferrer" class="text-text-muted hover:text-text transition-colors underline">abashoverse</a>
			</footer>
		</main>
	</div>
</div>

<Annotakit position="bottom-right" theme="dark" minimized={true} />
