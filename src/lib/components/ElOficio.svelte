<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { oficio } from '$lib/content/oficio';
	import { ensureScrollTrigger } from '$lib/anim/smoothScroll';
	import { prefersReducedMotion } from '$lib/anim/motion';
	import { reveal } from '$lib/anim/reveal';
	import { tr } from '$lib/state/lang.svelte';
	import PhotoSlot from './PhotoSlot.svelte';

	const t = $derived(tr());

	let section: HTMLElement;
	let track: HTMLDivElement;
	let horizontal = $state(false);

	onMount(() => {
		const desktop = window.matchMedia('(min-width: 900px)').matches;
		if (prefersReducedMotion() || !desktop) return;

		const ScrollTrigger = ensureScrollTrigger();
		horizontal = true;

		const ctx = gsap.context(() => {
			const distance = () => Math.max(0, track.scrollWidth - section.clientWidth);
			gsap.to(track, {
				x: () => -distance(),
				ease: 'none',
				scrollTrigger: {
					trigger: section,
					start: 'top top',
					end: () => '+=' + distance(),
					pin: true,
					scrub: 1,
					anticipatePin: 1,
					invalidateOnRefresh: true
				}
			});
		}, section);

		// Recompute after layout/fonts settle.
		const t = setTimeout(() => ScrollTrigger.refresh(), 300);

		return () => {
			clearTimeout(t);
			ctx.revert();
		};
	});
</script>

<section id="oficio" class="oficio section--accent" class:horizontal bind:this={section}>
	<div class="shell head">
		<div>
			<p class="eyebrow mark reveal" use:reveal>{t.oficio.eyebrow}</p>
			<h2 class="title reveal" use:reveal={{ delay: 80 }}>
				{t.oficio.titleLead}<span class="ital">{t.oficio.titleHl}</span>
			</h2>
		</div>
		<p class="intro reveal" use:reveal={{ delay: 140 }}>{t.oficio.intro}</p>
	</div>

	<div class="viewport">
		<div class="track" bind:this={track}>
			{#each oficio as step, i (step.n)}
				<article class="card reveal" use:reveal>
					<div class="frame">
						<PhotoSlot src={step.img} label={t.oficio.steps[i].title.toLowerCase()} theme="dark" />
					</div>
					<div class="meta">
						<span class="n">{step.n}</span>
						<span class="tag">{t.oficio.tag}</span>
					</div>
					<h3>{t.oficio.steps[i].title}</h3>
					<p>{t.oficio.steps[i].desc}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.oficio {
		background: var(--bg);
		color: var(--fg);
		padding: var(--section-y) 0;
	}
	.head {
		padding: 0 var(--pad);
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		flex-wrap: wrap;
		gap: var(--space-5);
		margin-bottom: var(--space-9);
	}
	.head .eyebrow {
		color: var(--on-dark-muted);
		margin-bottom: var(--space-4);
	}
	.title {
		font-family: var(--serif);
		font-size: var(--fs-h2);
		font-weight: 400;
		line-height: 0.96;
	}
	.ital {
		font-style: italic;
	}
	.intro {
		max-width: 38ch;
		margin: 0;
		color: var(--on-dark-muted);
		font-size: var(--fs-lg);
		line-height: 1.55;
		text-wrap: pretty;
	}

	.viewport {
		padding: 0 var(--pad);
	}
	.track {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: var(--space-5);
	}

	/* Horizontal mode (desktop, motion on): a single off-screen row that the
	   pinned ScrollTrigger translates on the x-axis. The off-screen track must
	   not stretch the section past the viewport, or the (centered) header gets
	   pushed off-screen — so cap the section to 100vw and clip the overflow. */
	.oficio.horizontal {
		padding-bottom: var(--section-y);
		min-height: 100vh;
		max-width: 100vw;
		overflow-x: clip;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: var(--space-8);
	}
	.oficio.horizontal .head {
		width: 100%;
		margin-bottom: 0;
	}
	.oficio.horizontal .viewport {
		width: 100%;
		overflow: hidden;
		padding-right: 0;
	}
	.oficio.horizontal .track {
		display: flex;
		grid-template-columns: none;
		gap: var(--space-6);
		width: max-content;
		will-change: transform;
		padding-right: var(--pad);
	}
	.oficio.horizontal .card {
		width: 340px;
		flex: 0 0 340px;
	}

	.card {
		display: flex;
		flex-direction: column;
	}
	.frame {
		position: relative;
		overflow: hidden;
		aspect-ratio: 3 / 4;
		border-radius: var(--radius);
		margin-bottom: var(--space-5);
		background: var(--tinta-2);
	}
	.frame :global(.photo) {
		transition: transform 0.7s var(--ease);
	}
	.card:hover .frame :global(.photo),
	.card:hover .frame {
		transform: none;
	}
	.card:hover .frame :global(.photo) {
		transform: scale(1.06);
	}
	.meta {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		border-top: 1px solid var(--line-on-dark);
		padding-top: var(--space-4);
		margin-bottom: var(--space-3);
	}
	.n {
		font-family: var(--sans);
		font-size: 13px;
		font-weight: 600;
		color: var(--on-dark);
		transition: color 0.3s;
	}
	.card:hover .n {
		color: var(--accent);
	}
	.tag {
		font-family: var(--sans);
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--on-dark-muted);
	}
	h3 {
		font-family: var(--serif);
		font-size: var(--fs-h3);
		font-weight: 400;
		margin: 0 0 var(--space-2);
		line-height: 1.02;
	}
	.card p {
		margin: 0;
		color: var(--on-dark-muted);
		font-size: var(--fs-sm);
		line-height: 1.55;
	}

	@media (max-width: 899px) {
		.track {
			grid-template-columns: 1fr 1fr;
			gap: var(--space-4);
		}
		.head {
			margin-bottom: var(--space-7);
		}
	}
	@media (max-width: 540px) {
		.track {
			grid-template-columns: 1fr;
			gap: var(--space-6);
		}
		.frame {
			aspect-ratio: 4 / 3;
		}
	}
</style>
