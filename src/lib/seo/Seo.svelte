<script lang="ts">
	import { site } from '$lib/content/site';
	import { localBusinessLd } from './jsonld';

	interface Props {
		title?: string;
		description?: string;
		path?: string;
		image?: string;
	}
	let {
		title = `${site.name} — ${site.tagline}`,
		description = site.description,
		path = '/',
		image = '/og.jpg'
	}: Props = $props();

	const canonical = $derived(`${site.url}${path === '/' ? '' : path}`);
	const ogImage = $derived(image.startsWith('http') ? image : `${site.url}${image}`);
	const ld = JSON.stringify(localBusinessLd());
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:locale" content={site.locale} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />

	{@html `<script type="application/ld+json">${ld}<\/script>`}
</svelte:head>
