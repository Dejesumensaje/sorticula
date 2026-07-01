<script lang="ts">
	import { site } from '$lib/content/site';
	import { tr } from '$lib/state/lang.svelte';
	import { localBusinessLd } from './jsonld';

	interface Props {
		title?: string;
		description?: string;
		path?: string;
		image?: string;
	}
	let { title, description, path = '/', image = '/og.jpg' }: Props = $props();

	const t = $derived(tr());
	const metaTitle = $derived(title ?? `${site.name} — ${t.seo.tagline}`);
	const metaDesc = $derived(description ?? t.seo.description);
	const canonical = $derived(`${site.url}${path === '/' ? '' : path}`);
	const ogImage = $derived(image.startsWith('http') ? image : `${site.url}${image}`);
	const ld = JSON.stringify(localBusinessLd());
</script>

<svelte:head>
	<title>{metaTitle}</title>
	<meta name="description" content={metaDesc} />
	<link rel="canonical" href={canonical} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:title" content={metaTitle} />
	<meta property="og:description" content={metaDesc} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:locale" content={site.locale} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={metaTitle} />
	<meta name="twitter:description" content={metaDesc} />
	<meta name="twitter:image" content={ogImage} />

	{@html `<script type="application/ld+json">${ld}<\/script>`}
</svelte:head>
