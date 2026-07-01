<script lang="ts">
	import { cart, count, openCart } from '$lib/state/cart.svelte';
	import { tr } from '$lib/state/lang.svelte';

	interface Props {
		/** 'light' = para fondos oscuros (hero); 'dark' = para fondos claros. */
		tone?: 'light' | 'dark';
	}
	let { tone = 'light' }: Props = $props();

	const t = $derived(tr());
	const n = $derived(count());
</script>

<button
	type="button"
	class="cart-btn hot {tone}"
	onclick={openCart}
	aria-label="{t.cart.openPre} ({n} {n === 1 ? t.cart.item1 : t.cart.itemN})"
>
	<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
		<path
			d="M3 4h2l2.4 12.2a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L21 8H6"
			fill="none"
			stroke="currentColor"
			stroke-width="1.6"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<circle cx="9.5" cy="20" r="1.4" fill="currentColor" />
		<circle cx="17.5" cy="20" r="1.4" fill="currentColor" />
	</svg>
	{#if n > 0}
		<span class="badge" aria-hidden="true">{n}</span>
	{/if}
</button>

<style>
	.cart-btn {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 42px;
		height: 42px;
		border-radius: 100px;
		border: 1.5px solid transparent;
		background: transparent;
		cursor: pointer;
		transition:
			border-color 0.3s,
			transform 0.3s var(--ease);
	}
	.cart-btn.light {
		color: var(--on-dark);
		border-color: var(--line-on-dark-strong);
	}
	.cart-btn.dark {
		color: var(--tinta);
		border-color: var(--line-strong);
	}
	.cart-btn:hover {
		transform: translateY(-2px);
	}
	.cart-btn.light:hover {
		border-color: var(--on-dark);
	}
	.cart-btn.dark:hover {
		border-color: var(--tinta);
	}
	.badge {
		position: absolute;
		top: -5px;
		right: -5px;
		min-width: 19px;
		height: 19px;
		padding: 0 5px;
		border-radius: 100px;
		background: var(--accent-deep);
		color: var(--accent-ink);
		font-family: var(--sans);
		font-size: 11px;
		line-height: 19px;
		text-align: center;
		font-weight: 700;
	}
</style>
