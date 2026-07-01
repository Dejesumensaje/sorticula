<script lang="ts">
	import { site } from '$lib/content/site';
</script>

<footer id="contacto" class="footer">
	<div class="shell top">
		<div class="brand">
			<img src="/img/logo-white-trim.png" alt={site.name} width="686" height="166" />
			<p>Casa de joyería donde el tiempo toma forma. {site.contact.address}.</p>
		</div>
		<div class="col">
			<p class="label">Explora</p>
			<a href="#oficio" class="lnk">El Oficio</a>
			<a href="#experiencias" class="lnk">Experiencias</a>
			<a href="#reserva" class="lnk">Reservar</a>
		</div>
		<div class="col">
			<p class="label">Contacto</p>
			<a href="mailto:{site.contact.email}" class="lnk">{site.contact.email}</a>
			<a href={site.contact.whatsappUrl} class="lnk" target="_blank" rel="noopener">
				{site.contact.whatsapp}
			</a>
		</div>
	</div>
	<div class="shell legal">
		<span>© {new Date().getFullYear()} SORTÍCULA — Todos los derechos reservados</span>
		<span>Hecho a mano · Bogotá</span>
	</div>
</footer>

<style>
	.footer {
		background: var(--tinta-deep);
		color: var(--on-dark);
		padding: var(--space-9) var(--pad) var(--space-7);
	}
	.top {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr;
		gap: var(--space-7);
		align-items: start;
		border-bottom: 1px solid var(--line-on-dark);
		padding-bottom: var(--space-8);
	}
	.brand img {
		width: min(420px, 72%);
		height: auto;
	}
	.brand p {
		max-width: 360px;
		color: var(--on-dark-muted);
		margin: var(--space-5) 0 0;
		line-height: 1.6;
		font-size: var(--fs-sm);
	}
	.label {
		font-family: var(--sans);
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--on-dark-muted);
		margin: 0 0 var(--space-4);
	}
	.col a {
		display: block;
		text-decoration: none;
		color: var(--on-dark);
		margin-bottom: var(--space-3);
		font-size: var(--fs-sm);
		transition: color 0.3s;
	}
	.col a:hover {
		color: var(--accent);
	}
	.legal {
		margin: var(--space-5) auto 0;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: var(--space-3);
		font-family: var(--sans);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.06em;
		color: var(--on-dark-muted);
	}
	@media (max-width: 760px) {
		.top {
			grid-template-columns: 1fr;
			gap: var(--space-6);
		}
	}
</style>
