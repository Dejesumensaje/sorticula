<script lang="ts">
	import {
		cart,
		lines,
		total,
		count,
		setQty,
		removeItem,
		clear,
		closeCart,
		formatCOP
	} from '$lib/state/cart.svelte';

	const items = $derived(lines());
	const sum = $derived(total());
	const n = $derived(count());

	// Datos del checkout simulado (no se envían a ningún lado).
	let nombre = $state('');
	let email = $state('');
	let fecha = $state('');

	// Pago simulado.
	let metodo = $state<'tarjeta' | 'pse'>('tarjeta');
	let tarjeta = $state('');
	let venc = $state('');
	let cvc = $state('');
	let titular = $state('');

	const steps = [
		{ id: 'checkout', n: '1', label: 'Datos' },
		{ id: 'pago', n: '2', label: 'Pago' },
		{ id: 'done', n: '3', label: 'Listo' }
	] as const;
	const stepIndex = $derived(steps.findIndex((s) => s.id === cart.view));

	function goCheckout() {
		if (n > 0) cart.view = 'checkout';
	}
	function goPago(e: SubmitEvent) {
		e.preventDefault();
		cart.view = 'pago';
	}
	function pagar(e: SubmitEvent) {
		e.preventDefault();
		cart.view = 'done';
		clear();
	}

	function cerrar() {
		closeCart();
		setTimeout(() => (cart.view = 'cart'), 320);
		nombre = email = fecha = '';
		tarjeta = venc = cvc = titular = '';
		metodo = 'tarjeta';
	}

	function onKey(e: KeyboardEvent) {
		if (e.key === 'Escape' && cart.open) cerrar();
	}

	const titles: Record<string, string> = {
		cart: 'Tu carrito',
		checkout: 'Tus datos',
		pago: 'Pago',
		done: 'Confirmado'
	};
</script>

<svelte:window onkeydown={onKey} />

<div
	class="overlay"
	class:open={cart.open}
	onclick={cerrar}
	onwheel={(e) => e.preventDefault()}
	ontouchmove={(e) => e.preventDefault()}
	aria-hidden="true"
></div>

<div
	class="drawer"
	class:open={cart.open}
	role="dialog"
	aria-modal="true"
	aria-label="Carrito"
	tabindex="-1"
>
	<header class="bar">
		<span class="ttl">{titles[cart.view]}</span>
		<button type="button" class="x hot" onclick={cerrar} aria-label="Cerrar carrito">✕</button>
	</header>

	{#if cart.view !== 'cart'}
		<ol class="steps" aria-hidden="true">
			{#each steps as s, i (s.id)}
				<li class="step" class:active={i === stepIndex} class:past={i < stepIndex}>
					<span class="dot">{i < stepIndex ? '✓' : s.n}</span>
					<span class="slabel">{s.label}</span>
				</li>
			{/each}
		</ol>
	{/if}

	{#if cart.view === 'cart'}
		<div class="body">
			{#if items.length === 0}
				<p class="empty">Tu carrito está vacío. Elige una experiencia para empezar.</p>
			{:else}
				<ul class="lines">
					{#each items as line (line.exp.id)}
						<li class="line">
							<div class="info">
								<p class="name">{line.exp.title}</p>
								<p class="unit">
									{formatCOP(line.exp.priceValue)}{line.exp.fromPrice ? '+' : ''} / {line.exp.unit}
								</p>
							</div>
							<div class="qty">
								<button
									type="button"
									class="step-btn hot"
									onclick={() => setQty(line.exp.id, line.qty - 1)}
									aria-label="Quitar uno">−</button
								>
								<span class="num">{line.qty}</span>
								<button
									type="button"
									class="step-btn hot"
									onclick={() => setQty(line.exp.id, line.qty + 1)}
									aria-label="Agregar uno">+</button
								>
							</div>
							<div class="sub">
								<span>{formatCOP(line.subtotal)}</span>
								<button
									type="button"
									class="rm hot"
									onclick={() => removeItem(line.exp.id)}
									aria-label="Eliminar {line.exp.title}">Quitar</button
								>
							</div>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
		<footer class="foot">
			<div class="total">
				<span>Total</span>
				<span class="amount">{formatCOP(sum)}</span>
			</div>
			<button type="button" class="cta hot" disabled={n === 0} onclick={goCheckout}>
				Continuar →
			</button>
			<p class="note">Prototipo · simulación de compra</p>
		</footer>
	{:else if cart.view === 'checkout'}
		<form class="body form" onsubmit={goPago}>
			<label>
				<span>Nombre</span>
				<input type="text" bind:value={nombre} required placeholder="Tu nombre" />
			</label>
			<label>
				<span>Email</span>
				<input type="email" bind:value={email} required placeholder="tucorreo@ejemplo.com" />
			</label>
			<label>
				<span>Fecha preferida</span>
				<input type="date" bind:value={fecha} required />
			</label>

			<div class="recap">
				<span>{n} {n === 1 ? 'experiencia' : 'experiencias'}</span>
				<span class="amount">{formatCOP(sum)}</span>
			</div>
			<button type="submit" class="cta hot">Continuar al pago →</button>
			<button type="button" class="back hot" onclick={() => (cart.view = 'cart')}>
				← Volver al carrito
			</button>
		</form>
	{:else if cart.view === 'pago'}
		<form class="body form" onsubmit={pagar}>
			<div class="methods" role="radiogroup" aria-label="Método de pago">
				<label class="method" class:sel={metodo === 'tarjeta'}>
					<input type="radio" name="metodo" value="tarjeta" bind:group={metodo} />
					Tarjeta
				</label>
				<label class="method" class:sel={metodo === 'pse'}>
					<input type="radio" name="metodo" value="pse" bind:group={metodo} />
					PSE
				</label>
			</div>

			{#if metodo === 'tarjeta'}
				<label>
					<span>Número de tarjeta</span>
					<input
						type="text"
						bind:value={tarjeta}
						required
						inputmode="numeric"
						maxlength="19"
						placeholder="4242 4242 4242 4242"
					/>
				</label>
				<div class="row">
					<label>
						<span>Vencimiento</span>
						<input type="text" bind:value={venc} required placeholder="MM/AA" maxlength="5" />
					</label>
					<label>
						<span>CVC</span>
						<input
							type="text"
							bind:value={cvc}
							required
							inputmode="numeric"
							maxlength="4"
							placeholder="123"
						/>
					</label>
				</div>
				<label>
					<span>Nombre en la tarjeta</span>
					<input type="text" bind:value={titular} required placeholder="Como aparece en la tarjeta" />
				</label>
			{:else}
				<p class="pse-note">
					Serás redirigido a tu banco para completar el pago con PSE. (Simulado en el prototipo.)
				</p>
			{/if}

			<div class="recap">
				<span>Total a pagar</span>
				<span class="amount">{formatCOP(sum)}</span>
			</div>
			<button type="submit" class="cta hot">Pagar {formatCOP(sum)} →</button>
			<button type="button" class="back hot" onclick={() => (cart.view = 'checkout')}>
				← Volver
			</button>
			<p class="note">Prototipo · no se procesa ningún pago real</p>
		</form>
	{:else}
		<div class="body done">
			<div class="check" aria-hidden="true">✓</div>
			<h3>Reserva confirmada</h3>
			<p>
				Te enviaríamos los detalles por correo. Esto es una simulación del prototipo — en producción,
				el pago se procesa de forma segura en el checkout de Tiendanube.
			</p>
			<button type="button" class="cta hot" onclick={cerrar}>Seguir explorando</button>
		</div>
	{/if}
</div>

<style>
	.overlay {
		position: fixed;
		inset: 0;
		z-index: 90;
		background: rgba(16, 13, 10, 0.55);
		opacity: 0;
		visibility: hidden;
		transition:
			opacity 0.35s var(--ease),
			visibility 0.35s;
	}
	.overlay.open {
		opacity: 1;
		visibility: visible;
	}

	.drawer {
		position: fixed;
		top: 0;
		right: 0;
		z-index: 100;
		width: min(440px, 100vw);
		height: 100svh;
		display: flex;
		flex-direction: column;
		background: var(--hueso);
		color: var(--tinta);
		transform: translateX(100%);
		transition: transform 0.4s var(--ease-out);
		box-shadow: -20px 0 60px rgba(16, 13, 10, 0.28);
	}
	.drawer.open {
		transform: translateX(0);
	}

	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-5) var(--pad);
		border-bottom: 1px solid var(--line);
	}
	.ttl {
		font-family: var(--serif);
		font-size: 28px;
	}
	.x {
		background: none;
		border: none;
		font-size: 17px;
		cursor: pointer;
		color: var(--tinta);
		line-height: 1;
		padding: 8px;
	}

	/* Indicador de pasos */
	.steps {
		list-style: none;
		display: flex;
		gap: var(--space-2);
		margin: 0;
		padding: var(--space-4) var(--pad);
		border-bottom: 1px solid var(--line);
	}
	.step {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		flex: 1;
	}
	.step .dot {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		font-weight: 700;
		border: 1.5px solid var(--line-strong);
		color: var(--text-muted);
		flex: none;
	}
	.step .slabel {
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--text-muted);
	}
	.step.active .dot {
		background: var(--accent-deep);
		border-color: var(--accent-deep);
		color: var(--accent-ink);
	}
	.step.active .slabel {
		color: var(--tinta);
	}
	.step.past .dot {
		background: var(--tinta);
		border-color: var(--tinta);
		color: var(--hueso);
	}

	.body {
		flex: 1;
		overflow-y: auto;
		padding: var(--space-5) var(--pad);
	}
	.empty {
		color: var(--text-muted);
		font-size: var(--fs-sm);
		line-height: 1.6;
	}

	.lines {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-5);
	}
	.line {
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-areas: 'info qty' 'sub sub';
		gap: var(--space-3) var(--space-3);
		padding-bottom: var(--space-5);
		border-bottom: 1px solid var(--line);
	}
	.info {
		grid-area: info;
	}
	.name {
		font-family: var(--serif);
		font-size: 21px;
		margin: 0;
	}
	.unit {
		font-size: 12px;
		font-weight: 500;
		color: var(--text-muted);
		margin: 4px 0 0;
	}
	.qty {
		grid-area: qty;
		display: inline-flex;
		align-items: center;
		gap: 4px;
		height: max-content;
		border: 1.5px solid var(--line-strong);
		border-radius: 100px;
		padding: 2px;
	}
	.step-btn {
		width: 32px;
		height: 32px;
		border: none;
		background: none;
		font-size: 17px;
		cursor: pointer;
		color: var(--tinta);
		border-radius: 50%;
		line-height: 1;
	}
	.step-btn:hover {
		background: color-mix(in srgb, var(--fg) 10%, transparent);
	}
	.num {
		min-width: 20px;
		text-align: center;
		font-size: 14px;
		font-weight: 600;
	}
	.sub {
		grid-area: sub;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-weight: 700;
		font-size: 16px;
	}
	.rm {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--text-muted);
	}
	.rm:hover {
		color: var(--accent);
	}

	.foot {
		padding: var(--space-5) var(--pad) calc(var(--space-5) + env(safe-area-inset-bottom));
		border-top: 1px solid var(--line);
	}
	.total {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: var(--space-4);
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--text-muted);
	}
	.amount {
		font-size: 24px;
		font-weight: 700;
		color: var(--tinta);
		letter-spacing: 0;
		text-transform: none;
	}
	.cta {
		width: 100%;
		padding: 17px 24px;
		border: none;
		border-radius: 100px;
		background: var(--accent-deep);
		color: var(--accent-ink);
		font-family: var(--sans);
		font-size: 14px;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		cursor: pointer;
		transition:
			transform 0.3s var(--ease),
			opacity 0.3s;
	}
	.cta:hover:not(:disabled) {
		transform: translateY(-2px);
	}
	.cta:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}
	.note {
		text-align: center;
		font-size: 10.5px;
		font-weight: 500;
		letter-spacing: 0.06em;
		color: var(--text-muted);
		margin: var(--space-4) 0 0;
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}
	.form label {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}
	.form label > span {
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--text-muted);
	}
	.form input {
		font-family: var(--sans);
		font-size: 15px;
		font-weight: 500;
		padding: 14px 16px;
		border: 1.5px solid var(--line-strong);
		border-radius: 10px;
		background: var(--surface);
		color: var(--fg);
	}
	.form input::placeholder {
		color: var(--fg-muted);
	}
	.form input:focus {
		outline: none;
		border-color: var(--accent);
	}
	.row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-3);
	}
	.methods {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-3);
	}
	.method {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		flex-direction: row !important;
		padding: 13px;
		border: 1.5px solid var(--line-strong);
		border-radius: 10px;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
	}
	.method.sel {
		border-color: var(--accent);
		background: color-mix(in srgb, var(--accent) 12%, transparent);
	}
	.method input {
		accent-color: var(--accent);
		width: auto;
	}
	.pse-note {
		font-size: 14px;
		line-height: 1.6;
		color: var(--text-muted);
		margin: 0;
	}
	.recap {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding-top: var(--space-4);
		border-top: 1px solid var(--line);
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--text-muted);
		margin-top: var(--space-2);
	}
	.back {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--text-muted);
		padding: var(--space-1);
	}
	.back:hover {
		color: var(--tinta);
	}

	.done {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: var(--space-4);
	}
	.check {
		width: 72px;
		height: 72px;
		border-radius: 50%;
		background: var(--accent-deep);
		color: var(--accent-ink);
		font-size: 34px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: var(--space-1);
	}
	.done h3 {
		font-family: var(--serif);
		font-size: 34px;
		font-weight: 400;
	}
	.done p {
		color: var(--text-muted);
		font-size: var(--fs-sm);
		line-height: 1.6;
		max-width: 32ch;
		margin: 0 0 var(--space-3);
	}
	.done .cta {
		width: auto;
		padding: 15px 30px;
	}

	@media (max-width: 540px) {
		.drawer {
			width: 100vw;
		}
	}
</style>
