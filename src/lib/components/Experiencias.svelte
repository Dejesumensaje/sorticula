<script lang="ts">
	import { experiences } from '$lib/content/experiences';
	import { selectExperience } from '$lib/state/booking.svelte';
	import { addItem, openCart } from '$lib/state/cart.svelte';
	import { tr, priceLabel } from '$lib/state/lang.svelte';
	import { reveal } from '$lib/anim/reveal';
	import PhotoSlot from './PhotoSlot.svelte';

	const t = $derived(tr());

	function agregar(id: string) {
		addItem(id);
		openCart();
	}

	const index = (i: number) => String(i + 1).padStart(2, '0');
</script>

<section id="experiencias" class="experiencias">
	<div class="shell">
		<div class="head">
			<div>
				<p class="eyebrow mark reveal" use:reveal>{t.experiencias.eyebrow}</p>
				<h2 class="title reveal" use:reveal={{ delay: 80 }}>{t.experiencias.title}</h2>
			</div>
			<p class="intro reveal" use:reveal={{ delay: 140 }}>{t.experiencias.intro}</p>
		</div>

		<div class="grid">
			{#each experiences as exp, i (exp.id)}
				{@const c = t.experiences[exp.id]}
				<article class="card reveal" use:reveal={{ delay: i * 90 }}>
					<a
						class="frame hot"
						href="#reserva"
						onclick={() => selectExperience(i)}
						aria-label={c.title}
					>
						<PhotoSlot src={exp.img} label={c.title} theme="light" imgClass="exp-img" />
						<span class="idx">{index(i)}</span>
						<span class="tag">{c.tag}</span>
					</a>
					<div class="body">
						<div class="who">{c.who}</div>
						<h3>{c.title}</h3>
						<p>{c.desc}</p>
						<div class="foot">
							<div class="pricing">
								<span class="price">{priceLabel(exp)}</span>
								<span class="per">/ {c.unit}</span>
							</div>
							<button type="button" class="add hot" onclick={() => agregar(exp.id)}>
								{t.experiencias.add} <span aria-hidden="true">+</span>
							</button>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.experiencias {
		background: var(--hueso);
		padding: var(--section-y) var(--pad);
	}
	.head {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin-bottom: var(--space-9);
		flex-wrap: wrap;
		gap: var(--space-5);
	}
	.head .eyebrow {
		margin-bottom: var(--space-4);
	}
	.title {
		font-family: var(--serif);
		font-size: var(--fs-h2);
		font-weight: 400;
		line-height: 0.96;
	}
	.intro {
		max-width: 38ch;
		margin: 0;
		color: var(--text-muted);
		font-size: var(--fs-lg);
		line-height: 1.55;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-5);
	}

	.card {
		color: var(--text);
		display: flex;
		flex-direction: column;
		background: var(--hueso-2);
		border-radius: var(--radius);
		overflow: hidden;
		border: 1px solid var(--line);
	}
	.frame {
		display: block;
		position: relative;
		overflow: hidden;
		aspect-ratio: 4 / 5;
	}
	.frame :global(.exp-img) {
		transition: transform 0.7s var(--ease);
	}
	.card:hover .frame :global(.exp-img) {
		transform: scale(1.05);
	}
	.idx {
		position: absolute;
		top: var(--space-4);
		left: var(--space-4);
		font-family: var(--sans);
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.08em;
		color: var(--accent-ink);
		background: var(--accent-deep);
		width: 30px;
		height: 30px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.tag {
		position: absolute;
		top: var(--space-4);
		right: var(--space-4);
		font-family: var(--sans);
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--bg);
		background: var(--fg);
		padding: 6px 12px;
		border-radius: 100px;
	}
	.body {
		padding: var(--space-6);
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.who {
		font-family: var(--sans);
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--text-muted);
		margin-bottom: var(--space-3);
	}
	h3 {
		font-family: var(--serif);
		font-size: var(--fs-h3);
		font-weight: 400;
		margin: 0 0 var(--space-3);
		line-height: 1.02;
	}
	.body p {
		margin: 0 0 var(--space-6);
		color: var(--text-muted);
		font-size: var(--fs-sm);
		line-height: 1.55;
		flex: 1;
	}
	.foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-4);
		border-top: 1px solid var(--line);
		padding-top: var(--space-5);
	}
	.pricing {
		display: flex;
		align-items: baseline;
		gap: 6px;
	}
	.price {
		font-weight: 700;
		font-size: 19px;
	}
	.per {
		font-size: 12px;
		color: var(--text-muted);
	}
	.add {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		cursor: pointer;
		font-family: var(--sans);
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		padding: 11px 18px;
		border-radius: 100px;
		border: 1.5px solid var(--line-strong);
		background: transparent;
		color: var(--tinta);
		white-space: nowrap;
		transition:
			transform 0.3s var(--ease),
			background 0.3s,
			color 0.3s,
			border-color 0.3s;
	}
	.add span {
		font-size: 15px;
		line-height: 1;
	}
	.add:hover {
		transform: translateY(-2px);
		background: var(--accent-deep);
		color: var(--accent-ink);
		border-color: var(--accent-deep);
	}

	@media (max-width: 900px) {
		.grid {
			grid-template-columns: 1fr;
			max-width: 460px;
			margin: 0 auto;
		}
		.head {
			margin-bottom: var(--space-7);
		}
	}
</style>
