<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { initSmoothScroll } from '$lib/anim/smoothScroll';
	import { initPalette } from '$lib/state/palette.svelte';
	import { initLang } from '$lib/state/lang.svelte';
	import Cursor from '$lib/components/Cursor.svelte';
	import GemLoader from '$lib/components/GemLoader.svelte';

	let { children } = $props();

	onMount(() => {
		// JS is alive: allow .reveal elements to start hidden and animate in.
		document.documentElement.classList.remove('no-js');
		initPalette(); // sincroniza el store con la paleta aleatoria ya aplicada
		initLang(); // restaura idioma guardado
		const cleanup = initSmoothScroll();
		return cleanup;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<GemLoader />
<Cursor />

{@render children()}
