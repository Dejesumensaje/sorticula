/**
 * Idioma activo (ES/EN). Persistido en localStorage y reflejado en <html lang>.
 * `tr()` devuelve el diccionario del idioma actual (reactivo al leer lang.code).
 */
import { browser } from '$app/environment';
import { dict, type Lang } from '$lib/i18n/dict';

export const lang = $state<{ code: Lang }>({ code: 'es' });

export function tr() {
	return dict[lang.code];
}

function reflect(code: Lang) {
	if (browser) document.documentElement.lang = code === 'en' ? 'en' : 'es-CO';
}

export function setLang(code: Lang) {
	lang.code = code;
	reflect(code);
	if (browser) localStorage.setItem('sorticula_lang', code);
}

export function toggleLang() {
	setLang(lang.code === 'es' ? 'en' : 'es');
}

/** Restaura la preferencia guardada (o deja el default 'es'). */
export function initLang() {
	if (!browser) return;
	const saved = localStorage.getItem('sorticula_lang');
	if (saved === 'es' || saved === 'en') {
		lang.code = saved;
		reflect(saved);
	}
}

/** Formatea COP según el idioma (es-CO usa puntos, en-US comas). */
export function money(value: number) {
	return '$' + value.toLocaleString(lang.code === 'en' ? 'en-US' : 'es-CO');
}

/** Etiqueta de precio localizada: "$1.500.000" o "desde $350.000" / "from $350,000". */
export function priceLabel(exp: { priceValue: number; fromPrice?: boolean }) {
	const base = money(exp.priceValue);
	return exp.fromPrice ? `${tr().price.desde} ${base}` : base;
}
