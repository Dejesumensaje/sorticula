/** Datos estructurales de las experiencias. El texto (title, who, desc, tag,
 *  unit) es localizado y vive en `$lib/i18n/dict` por id. `reserveUrl` es un
 *  placeholder del prototipo; en fase 2 será la URL de producto de Tiendanube. */
export interface Experience {
	id: string;
	/** Precio numérico (COP) para calcular totales. */
	priceValue: number;
	/** True cuando el precio es un "desde" (grupos). */
	fromPrice?: boolean;
	/** Foto opcional (en /img). Cae al placeholder a rayas si falta. */
	img?: string;
	/** TODO(fase 2): reemplazar con la URL real de producto de Tiendanube. */
	reserveUrl: string;
}

export const experiences: Experience[] = [
	{ id: 'in-love', priceValue: 1500000, img: '/img/pareja.jpeg', reserveUrl: '#reserva' },
	{ id: 'tu-fuego-propio', priceValue: 600000, img: '/img/manos.jpeg', reserveUrl: '#reserva' },
	{ id: 'el-vinculo', priceValue: 350000, fromPrice: true, reserveUrl: '#reserva' }
];
