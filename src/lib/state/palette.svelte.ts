/**
 * Sistema de paleta: 5 paletas curadas; una al azar en cada carga (la fija un
 * script en app.html antes de pintar) y el randomizador la cambia en caliente.
 * La paleta vive como una clase .pal-* en <html>; aquí solo la leemos/cambiamos.
 */
import { browser } from '$app/environment';

export interface Palette {
	id: string;
	name: string;
	bg: string;
	accent: string;
}

export const PALETTES: Palette[] = [
	{ id: 'pal-brasa', name: 'Brasa', bg: '#2a0a06', accent: '#ff5a1f' },
	{ id: 'pal-fundido', name: 'Fundido', bg: '#e0401c', accent: '#160f08' },
	{ id: 'pal-patina', name: 'Pátina', bg: '#0e3a33', accent: '#d9f25c' },
	{ id: 'pal-cobalto', name: 'Cobalto', bg: '#1a2be0', accent: '#e8ff5a' },
	{ id: 'pal-tinta', name: 'Tinta', bg: '#141318', accent: '#94ffe5' }
];

export const palette = $state({ id: PALETTES[0].id });

function apply(id: string) {
	if (!browser) return;
	const el = document.documentElement;
	for (const p of PALETTES) el.classList.remove(p.id);
	el.classList.add(id);
	palette.id = id;
	const meta = document.querySelector('meta[name="theme-color"]');
	const p = PALETTES.find((x) => x.id === id);
	if (meta && p) meta.setAttribute('content', p.bg);
}

/** Sincroniza el store con la clase que ya puso el script inline (o elige una). */
export function initPalette() {
	if (!browser) return;
	const current = PALETTES.find((p) => document.documentElement.classList.contains(p.id));
	if (current) palette.id = current.id;
	else apply(PALETTES[(Math.random() * PALETTES.length) | 0].id);
}

/** Cambia a una paleta distinta al azar. */
export function randomize() {
	const others = PALETTES.filter((p) => p.id !== palette.id);
	apply(others[(Math.random() * others.length) | 0].id);
}

export function setPalette(id: string) {
	apply(id);
}
