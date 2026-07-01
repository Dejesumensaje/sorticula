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
	import { tr } from '$lib/state/lang.svelte';

	const t = $derived(tr());
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

	const steps = $derived([
		{ id: 'checkout', n: '1', label: t.cart.steps.datos },
		{ id: 'pago', n: '2', label: t.cart.steps.pago },
		{ id: 'done', n: '3', label: t.cart.steps.listo }
	]);
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

	const titles = $derived<Record<string, string>>({
		cart: t.cart.titles.cart,
		checkout: t.cart.titles.checkout,
		pago: t.cart.titles.pago,
		done: t.cart.titles.done
	});
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
	aria-label={titles[cart.view]}
	tabindex="-1"
>
	<header class="bar">
		<span class="ttl">{titles[cart.view]}</span>
		<button type="button" class="x hot" onclick={cerrar} aria-label={t.cart.close}>✕</button>
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
				<p class="empty">{t.cart.empty}</p>
			{:else}
				<ul class="lines">
					{#each items as line (line.exp.id)}
						{@const c = t.experiences[line.exp.id]}
						<li class="line">
							<div class="info">
								<p class="name">{c.title}</p>
								<p class="unit">
									{formatCOP(line.exp.priceValue)}{line.exp.fromPrice ? '+' : ''} / {c.unit}
								</p>
							</div>
							<div class="qty">
								<button
									type="button"
									class="step-btn hot"
									onclick={() => setQty(line.exp.id, line.qty - 1)}
									aria-label={t.cart.removeOne}>−</button
								>
								<span class="num">{line.qty}</span>
								<button
									type="button"
									class="step-btn hot"
									onclick={() => setQty(line.exp.id, line.qty + 1)}
									aria-label={t.cart.addOne}>+</button
								>
							</div>
							<div class="sub">
								<span>{formatCOP(line.subtotal)}</span>
								<button
									type="button"
									class="rm hot"
									onclick={() => removeItem(line.exp.id)}
									aria-label="{t.cart.quitar} · {c.title}">{t.cart.quitar}</button
								>
							</div>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
		<footer class="foot">
			<div class="total">
				<span>{t.cart.total}</span>
				<span class="amount">{formatCOP(sum)}</span>
			</div>
			<button type="button" class="cta hot" disabled={n === 0} onclick={goCheckout}>
				{t.cart.continue}
			</button>
			<p class="note">{t.cart.note}</p>
		</footer>
	{:else if cart.view === 'checkout'}
		<form class="body form" onsubmit={goPago}>
			<label>
				<span>{t.cart.nombre}</span>
				<input type="text" bind:value={nombre} required placeholder={t.cart.nombrePh} />
			</label>
			<label>
				<span>{t.cart.email}</span>
				<input type="email" bind:value={email} required placeholder={t.cart.emailPh} />
			</label>
			<label>
				<span>{t.cart.fecha}</span>
				<input type="date" bind:value={fecha} required />
			</label>

			<div class="recap">
				<span>{n} {n === 1 ? t.cart.exp1 : t.cart.expN}</span>
				<span class="amount">{formatCOP(sum)}</span>
			</div>
			<button type="submit" class="cta hot">{t.cart.toPago}</button>
			<button type="button" class="back hot" onclick={() => (cart.view = 'cart')}>
				{t.cart.backCart}
			</button>
		</form>
	{:else if cart.view === 'pago'}
		<form class="body form" onsubmit={pagar}>
			<div class="methods" role="radiogroup" aria-label={t.cart.titles.pago}>
				<label class="method" class:sel={metodo === 'tarjeta'}>
					<input type="radio" name="metodo" value="tarjeta" bind:group={metodo} />
					{t.cart.metodoTarjeta}
				</label>
				<label class="method" class:sel={metodo === 'pse'}>
					<input type="radio" name="metodo" value="pse" bind:group={metodo} />
					{t.cart.metodoPse}
				</label>
			</div>

			{#if metodo === 'tarjeta'}
				<label>
					<span>{t.cart.tarjeta}</span>
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
						<span>{t.cart.venc}</span>
						<input type="text" bind:value={venc} required placeholder="MM/AA" maxlength="5" />
					</label>
					<label>
						<span>{t.cart.cvc}</span>
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
					<span>{t.cart.titular}</span>
					<input type="text" bind:value={titular} required placeholder={t.cart.titularPh} />
				</label>
			{:else}
				<p class="pse-note">
					{t.cart.pseNote}
				</p>
			{/if}

			<div class="recap">
				<span>{t.cart.totalPagar}</span>
				<span class="amount">{formatCOP(sum)}</span>
			</div>
			<button type="submit" class="cta hot">{t.cart.pagar} {formatCOP(sum)} →</button>
			<button type="button" class="back hot" onclick={() => (cart.view = 'checkout')}>
				{t.cart.back}
			</button>
			<p class="note">{t.cart.note2}</p>
		</form>
	{:else}
		<div class="body done">
			<div class="check" aria-hidden="true">✓</div>
			<h3>{t.cart.doneTitle}</h3>
			<p>{t.cart.doneBody}</p>
			<button type="button" class="cta hot" onclick={cerrar}>{t.cart.doneCta}</button>
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
