/**
 * Carrito simulado (prototipo). No hay pago real: el flujo termina en una
 * confirmación dentro del sitio. En Fase 2 el checkout real es handoff a Tiendanube.
 */
import { experiences, type Experience } from '$lib/content/experiences';
import { lang } from '$lib/state/lang.svelte';

export type CartView = 'cart' | 'checkout' | 'pago' | 'done';

interface CartItem {
	id: string;
	qty: number;
}

interface CartLine {
	exp: Experience;
	qty: number;
	subtotal: number;
}

export const cart = $state<{ items: CartItem[]; open: boolean; view: CartView }>({
	items: [],
	open: false,
	view: 'cart'
});

function find(id: string) {
	return cart.items.find((it) => it.id === id);
}

export function addItem(id: string) {
	const existing = find(id);
	if (existing) existing.qty += 1;
	else cart.items.push({ id, qty: 1 });
}

export function setQty(id: string, qty: number) {
	const it = find(id);
	if (!it) return;
	if (qty <= 0) removeItem(id);
	else it.qty = qty;
}

export function removeItem(id: string) {
	cart.items = cart.items.filter((it) => it.id !== id);
}

export function clear() {
	cart.items = [];
}

export function openCart() {
	cart.view = 'cart';
	cart.open = true;
}

export function closeCart() {
	cart.open = false;
}

/** Líneas del carrito con los datos de la experiencia y el subtotal calculado. */
export function lines(): CartLine[] {
	return cart.items
		.map((it) => {
			const exp = experiences.find((e) => e.id === it.id);
			if (!exp) return null;
			return { exp, qty: it.qty, subtotal: exp.priceValue * it.qty };
		})
		.filter((l): l is CartLine => l !== null);
}

export function count(): number {
	return cart.items.reduce((n, it) => n + it.qty, 0);
}

export function total(): number {
	return lines().reduce((sum, l) => sum + l.subtotal, 0);
}

/** Formato de precio en COP, con separador según el idioma activo. */
export function formatCOP(value: number): string {
	return '$' + value.toLocaleString(lang.code === 'en' ? 'en-US' : 'es-CO');
}
