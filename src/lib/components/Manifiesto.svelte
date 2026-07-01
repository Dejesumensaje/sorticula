<script lang="ts">
	import { reveal } from '$lib/anim/reveal';
	import { tr } from '$lib/state/lang.svelte';

	const t = $derived(tr());
</script>

<section class="manifiesto">
	<div class="shell grid">
		<div>
			<p class="eyebrow mark reveal" use:reveal>{t.manifiesto.eyebrow}</p>
			<h2 class="headline">
				<span class="reveal" use:reveal={{ delay: 60 }}>{t.manifiesto.h1}</span>
				<span class="reveal mute" use:reveal={{ delay: 140 }}>{t.manifiesto.h2}</span>
				<span class="reveal accent" use:reveal={{ delay: 220 }}>{t.manifiesto.h3}</span>
			</h2>
		</div>
		<div class="body reveal" use:reveal={{ delay: 120 }}>
			<p>{t.manifiesto.p1}</p>
			<p>{t.manifiesto.p2}</p>
			<p class="sign">{t.manifiesto.sign}</p>
		</div>
	</div>
</section>

<style>
	.manifiesto {
		background: var(--hueso);
		color: var(--text);
		padding: var(--section-y) var(--pad);
	}
	.grid {
		display: grid;
		grid-template-columns: 1.05fr 0.95fr;
		gap: clamp(40px, 6vw, 96px);
		align-items: start;
	}
	.eyebrow {
		margin-bottom: var(--space-6);
	}
	.headline {
		font-family: var(--serif);
		font-size: var(--fs-h2);
		font-weight: 400;
		line-height: 1.02;
		max-width: 13ch;
		color: var(--text);
	}
	.headline span {
		display: inline;
	}
	.headline .mute {
		color: var(--text-muted);
	}
	.headline .accent {
		font-style: italic;
		color: var(--hl);
	}
	.body {
		padding-top: var(--space-2);
		max-width: var(--measure);
	}
	.body p {
		font-size: var(--fs-lg);
		line-height: 1.6;
		margin: 0 0 var(--space-5);
		color: var(--text-muted);
	}
	.body p:first-child {
		color: var(--text);
	}
	.body .sign {
		font-family: var(--sans);
		font-size: var(--fs-label);
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--text-muted);
		margin: var(--space-6) 0 0;
	}
	@media (max-width: 900px) {
		.grid {
			grid-template-columns: 1fr;
			gap: var(--space-6);
		}
	}
</style>
