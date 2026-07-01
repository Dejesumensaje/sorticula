<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Manifiesto from '$lib/components/Manifiesto.svelte';
	import ElOficio from '$lib/components/ElOficio.svelte';
	import Experiencias from '$lib/components/Experiencias.svelte';
	import Reserva from '$lib/components/Reserva.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import CartDrawer from '$lib/components/CartDrawer.svelte';
</script>

<Seo />

<main>
	<Hero />
	<Manifiesto />
	<ElOficio />
	<Experiencias />
	<Reserva />
</main>
<Footer />
<CartDrawer />
