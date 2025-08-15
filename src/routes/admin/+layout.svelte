<script lang="ts">
	import '../../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Aside from "$lib/components/admin/Aside.svelte";
	import Head from "$lib/components/admin/Head.svelte";
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


<!--Head/-->

<Aside/>

<main
		class="lg:ml-64 min-h-screen 
         overflow-x-hidden"
>
<Head/>
{@render children?.()}
</main>