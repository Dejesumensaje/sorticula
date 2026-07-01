/** Bookable experiences. `reserveUrl` is a placeholder anchor for the prototype;
 *  in phase 2 it becomes the Tiendanube product/checkout URL (deep-link handoff). */
export interface Experience {
	id: string;
	title: string;
	who: string;
	desc: string;
	price: string;
	/** Numeric price (COP) used to compute cart totals. */
	priceValue: number;
	/** True when `price` is a "desde" floor (groups), shown as such in the cart. */
	fromPrice?: boolean;
	/** Unit suffix shown next to the price ("pareja" / "persona"). */
	unit: string;
	tag: string;
	accent: string;
	/** Optional photo (in /img). Falls back to the striped placeholder if absent. */
	img?: string;
	/** TODO(phase 2): replace with the real Tiendanube product URL. */
	reserveUrl: string;
}

export const experiences: Experience[] = [
	{
		id: 'in-love',
		title: 'In Love',
		who: 'Para parejas · 5 horas',
		desc: 'Bajo la energía de Los Amantes, forjen juntos sus argollas en plata ley 925. Dos manos, un mismo metal, el símbolo de su unión.',
		price: '$1.500.000',
		priceValue: 1500000,
		unit: 'pareja',
		tag: 'Más reservada',
		accent: '#FF5630',
		img: '/img/pareja.jpeg',
		reserveUrl: '#reserva'
	},
	{
		id: 'tu-fuego-propio',
		title: 'Tu Fuego Propio',
		who: 'Individual · 5 horas',
		desc: 'Crea desde cero un anillo, unos aretes o un dije. El nuevo lujo: tiempo, pausa y amor propio, guiada por La Sacerdotisa.',
		price: '$600.000',
		priceValue: 600000,
		unit: 'persona',
		tag: 'A tu ritmo',
		accent: '#6C2BD9',
		img: '/img/manos.jpeg',
		reserveUrl: '#reserva'
	},
	{
		id: 'el-vinculo',
		title: 'El Vínculo',
		who: 'En grupo · 6 horas',
		desc: 'Creen con su grupo favorito en cuatro estaciones del oficio: fundir, laminar, armar y pulir. Un recuerdo tangible de la amistad.',
		price: 'desde $350.000',
		priceValue: 350000,
		fromPrice: true,
		unit: 'persona',
		tag: 'Para grupos',
		accent: '#06B6A4',
		reserveUrl: '#reserva'
	}
];
