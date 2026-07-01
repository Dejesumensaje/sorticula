<script lang="ts">
	import { experiences } from '$lib/content/experiences';
	import { site } from '$lib/content/site';
	import { booking } from '$lib/state/booking.svelte';
	import { addItem, openCart } from '$lib/state/cart.svelte';
	import { reveal } from '$lib/anim/reveal';

	const current = $derived(experiences[booking.selected]);

	function agregar() {
		addItem(current.id);
		openCart();
	}
	const waText = $derived(
		`Hola Sortícula, quiero reservar la experiencia "${current.title}". ¿Me cuentan disponibilidad?`
	);
	const waHref = $derived(`${site.contact.whatsappUrl}?text=${encodeURIComponent(waText)}`);
</script>

<section id="reserva" class="reserva section--invert">
	<div class="shell">
		<div class="head">
			<p class="eyebrow mark reveal" use:reveal>Empieza aquí</p>
			<h2 class="title reveal" use:reveal={{ delay: 70 }}>
				Aparta tu <span class="ital">sesión</span>
			</h2>
		</div>

		<div class="panel reveal" use:reveal={{ delay: 120 }}>
			<div class="tabs" role="tablist" aria-label="Experiencias">
				{#each experiences as exp, i (exp.id)}
					<button
						type="button"
						role="tab"
						aria-selected={i === booking.selected}
						class="tab"
						class:active={i === booking.selected}
						onclick={() => (booking.selected = i)}
					>
						{exp.title}
					</button>
				{/each}
			</div>

			<div class="summary">
				<div class="detail">
					<div class="label">Experiencia seleccionada</div>
					<h3 class="name">{current.title}</h3>
					<div class="price">
						{current.price} <span class="per">/ {current.unit}</span>
					</div>
					<p class="desc">{current.desc}</p>
				</div>
				<div class="actions">
					<button type="button" class="btn primary hot" onclick={agregar}>
						Agregar al carrito →
					</button>
					<a class="btn ghost hot" href={waHref} target="_blank" rel="noopener">
						Consultar por WhatsApp
					</a>
					<p class="reassure">Reserva tu cupo · pago seguro en el checkout</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.reserva {
		background: var(--bg);
		color: var(--fg);
		padding: var(--section-y) var(--pad);
	}
	.shell {
		max-width: var(--maxw-narrow);
	}
	.head {
		margin-bottom: var(--space-8);
	}
	.head .eyebrow {
		color: var(--on-dark-muted);
		margin-bottom: var(--space-4);
	}
	.title {
		font-family: var(--serif);
		font-size: var(--fs-h2);
		font-weight: 400;
		line-height: 0.94;
		margin: 0;
	}
	.ital {
		font-style: italic;
		color: var(--accent);
	}

	.panel {
		border: 1px solid var(--line-on-dark);
		border-radius: 16px;
		padding: clamp(24px, 4vw, 40px);
		background: var(--tinta-2);
	}
	.tabs {
		display: flex;
		gap: var(--space-3);
		flex-wrap: wrap;
		margin-bottom: var(--space-7);
	}
	.tab {
		cursor: pointer;
		font-family: var(--sans);
		font-size: 14px;
		font-weight: 600;
		letter-spacing: 0.02em;
		padding: 12px 22px;
		border-radius: 100px;
		border: 1.5px solid var(--line-on-dark-strong);
		background: transparent;
		color: var(--on-dark);
		transition:
			background 0.3s,
			color 0.3s,
			border-color 0.3s;
	}
	.tab:hover {
		border-color: var(--on-dark);
	}
	.tab.active {
		border-color: var(--accent-deep);
		background: var(--accent-deep);
		color: var(--accent-ink);
	}

	.summary {
		display: grid;
		grid-template-columns: 1.4fr 1fr;
		align-items: center;
		gap: clamp(24px, 4vw, 56px);
		border-top: 1px solid var(--line-on-dark);
		padding-top: var(--space-7);
	}
	.label {
		font-family: var(--sans);
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--on-dark-muted);
		margin-bottom: var(--space-3);
	}
	.name {
		font-family: var(--serif);
		font-size: var(--fs-h3);
		font-weight: 400;
		line-height: 1;
		margin: 0 0 var(--space-3);
	}
	.price {
		font-weight: 700;
		font-size: 26px;
		margin-bottom: var(--space-4);
	}
	.per {
		font-weight: 500;
		font-size: 14px;
		color: var(--on-dark-muted);
	}
	.desc {
		max-width: 46ch;
		margin: 0;
		color: var(--on-dark-muted);
		font-size: var(--fs-sm);
		line-height: 1.6;
	}
	.actions {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		min-width: 240px;
	}
	.btn {
		text-align: center;
		text-decoration: none;
		font-family: var(--sans);
		font-size: 14px;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		padding: 17px 30px;
		border-radius: 100px;
		border: none;
		cursor: pointer;
		appearance: none;
	}
	.btn.primary {
		background: var(--accent-deep);
		color: var(--accent-ink);
	}
	.btn.ghost {
		border: 1.5px solid var(--line-on-dark-strong);
		color: var(--on-dark);
		background: transparent;
	}
	.btn.ghost:hover {
		border-color: var(--on-dark);
	}
	.reassure {
		text-align: center;
		font-size: 11px;
		color: var(--on-dark-muted);
		margin: var(--space-1) 0 0;
	}

	@media (max-width: 760px) {
		.summary {
			grid-template-columns: 1fr;
			align-items: stretch;
		}
		.actions {
			width: 100%;
			min-width: 0;
		}
	}
</style>
