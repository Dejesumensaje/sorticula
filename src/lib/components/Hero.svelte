<script lang="ts">
	import { site } from '$lib/content/site';
	import CartButton from './CartButton.svelte';
	import PaletteSwitcher from './PaletteSwitcher.svelte';
</script>

<section id="top" class="hero">
	<div class="bg" aria-hidden="true">
		<div class="ember-fallback"></div>
		<img
			src="/img/fuego.jpeg"
			alt=""
			class="hero-photo"
			onerror={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
		/>
		<div class="tone"></div>
		<div class="scrim"></div>
	</div>

	<header class="nav">
		<nav class="nav-side">
			<PaletteSwitcher />
			<a href="#oficio" class="lnk navlink">El Oficio</a>
			<a href="#experiencias" class="lnk navlink">Experiencias</a>
		</nav>
		<a href="#top" class="brand" aria-label={site.name}>
			<img src="/img/logo-white-trim.png" alt={site.name} width="686" height="166" />
		</a>
		<div class="nav-side end">
			<a href="#reserva" class="btn cta-pill">Reservar</a>
			<CartButton tone="light" />
		</div>
	</header>

	<div class="content">
		<p class="eyebrow tagline">
			<span class="pulse"></span>
			Taller de joyería · Bogotá · est. MMXVI
		</p>
		<h1 class="title">
			El taller donde el tiempo <span class="ital">toma forma.</span>
		</h1>
		<div class="lede-row">
			<p class="lede">
				No vendemos joyas. Te damos el fuego, las herramientas y las manos expertas para que
				<strong>forjes la tuya</strong> — junto a quien tú quieras.
			</p>
			<a href="#experiencias" class="btn cta-solid">Reservar una experiencia →</a>
		</div>
	</div>

	<div class="seal" aria-hidden="true">
		<svg viewBox="0 0 118 118">
			<defs>
				<path id="circ" d="M59,59 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
			</defs>
			<circle cx="59" cy="59" r="58" fill="none" stroke="rgba(247,245,241,.5)" stroke-width="1" />
			<circle cx="59" cy="59" r="47" fill="none" stroke="rgba(247,245,241,.5)" stroke-width="1" />
			<text><textPath href="#circ">HECHO A MANO · POR TI · HECHO A MANO · POR TI · </textPath></text>
			<circle cx="59" cy="59" r="5" fill="var(--ember)" />
		</svg>
	</div>

	<div class="cue" aria-hidden="true">
		<span class="cue-label">Scroll</span>
		<span class="cue-track"><span class="cue-dot"></span></span>
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: 100svh;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		background: var(--bg);
		color: var(--fg);
	}
	.bg {
		position: absolute;
		inset: 0;
		overflow: hidden;
	}
	.ember-fallback {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(
				120% 90% at 50% 100%,
				color-mix(in srgb, var(--accent) 55%, transparent) 0%,
				color-mix(in srgb, var(--accent) 18%, transparent) 38%,
				transparent 66%
			),
			var(--bg);
	}
	.hero-photo {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		animation: kenburns 18s ease-out both;
		will-change: transform;
	}
	/* Duotono: tiñe la foto hacia la paleta activa para que combine. */
	.tone {
		position: absolute;
		inset: 0;
		background: var(--bg);
		mix-blend-mode: color;
		opacity: 0.6;
	}
	.scrim {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			180deg,
			color-mix(in srgb, var(--bg) 72%, transparent) 0%,
			color-mix(in srgb, var(--bg) 28%, transparent) 38%,
			color-mix(in srgb, var(--bg) 55%, transparent) 72%,
			var(--bg) 100%
		);
	}

	.nav {
		position: relative;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-6) var(--pad);
		gap: var(--space-4);
	}
	.nav-side {
		display: flex;
		gap: var(--space-7);
		align-items: center;
		flex: 1;
	}
	.nav-side.end {
		justify-content: flex-end;
		gap: var(--space-5);
	}
	.navlink {
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--on-dark);
	}
	.brand img {
		height: 26px;
		width: auto;
	}
	.cta-pill {
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		text-decoration: none;
		color: var(--on-dark);
		border: 1.5px solid var(--line-on-dark-strong);
		padding: 11px 22px;
		border-radius: 100px;
		transition:
			border-color 0.3s,
			background 0.3s,
			color 0.3s;
	}
	.cta-pill:hover {
		border-color: var(--on-dark);
	}

	.content {
		position: relative;
		z-index: 10;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding: 0 var(--pad) var(--space-9);
	}
	.tagline {
		color: var(--on-dark-muted);
		margin-bottom: var(--space-6);
	}
	.pulse {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--accent);
		animation: float 2.6s ease-in-out infinite;
		flex: none;
	}
	.title {
		font-family: var(--serif);
		font-size: var(--fs-display);
		font-weight: 400;
		line-height: 0.92;
		color: var(--on-dark);
		letter-spacing: -0.015em;
		max-width: 15ch;
	}
	.ital {
		font-style: italic;
		color: var(--accent);
	}
	.lede-row {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: var(--space-6);
		margin-top: var(--space-7);
	}
	.lede {
		font-size: var(--fs-lg);
		line-height: 1.5;
		font-weight: 500;
		max-width: 44ch;
		margin: 0;
		color: var(--on-dark);
	}
	.lede strong {
		font-weight: 700;
	}
	.cta-solid {
		font-size: 13px;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		text-decoration: none;
		background: var(--accent-deep);
		color: var(--accent-ink);
		padding: 18px 34px;
		border-radius: 100px;
		white-space: nowrap;
	}

	.seal {
		position: absolute;
		top: var(--space-9);
		right: var(--space-7);
		width: 116px;
		height: 116px;
		z-index: 10;
		animation: spin 22s linear infinite;
	}
	.seal svg {
		width: 100%;
		height: 100%;
		overflow: visible;
	}
	.seal text {
		font-family: var(--sans);
		font-size: 9.4px;
		font-weight: 600;
		letter-spacing: 0.14em;
		fill: var(--on-dark);
	}

	.cue {
		position: absolute;
		bottom: var(--space-6);
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-2);
	}
	.cue-label {
		font-family: var(--sans);
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--on-dark-muted);
	}
	.cue-track {
		width: 1px;
		height: 34px;
		background: var(--line-on-dark-strong);
		position: relative;
		overflow: hidden;
	}
	.cue-dot {
		position: absolute;
		top: 0;
		left: 0;
		width: 1px;
		height: 14px;
		background: var(--accent);
		animation: scrollcue 1.8s var(--ease) infinite;
	}

	@media (max-width: 900px) {
		.navlink {
			display: none;
		}
		.nav {
			padding: var(--space-5) var(--pad);
		}
		.seal {
			display: none;
		}
		.title {
			max-width: 100%;
		}
		.content {
			padding-bottom: var(--space-8);
		}
	}

	@media (max-width: 540px) {
		.content {
			padding-bottom: var(--space-7);
		}
		.tagline {
			margin-bottom: var(--space-5);
		}
		.lede-row {
			margin-top: var(--space-5);
			gap: var(--space-5);
		}
		.cta-solid {
			width: 100%;
			text-align: center;
		}
		.cue {
			display: none;
		}
	}
</style>
