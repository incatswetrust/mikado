<script lang="ts">
	import '../../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import icon from '$lib/assets/icon.svg';
	import Aside from "$lib/components/admin/Aside.svelte";
	import Head from "$lib/components/admin/Head.svelte";
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Aside/>
<main class="lg:ml-64 min-h-dvh flex flex-col overflow-x-hidden">
	<section class="bg-gray-50 dark:bg-gray-900 min-h-screen">
		<Head icon={icon} />  
		<div class="flex-1">
			{@render children?.()}
		</div>
	</section>
</main>