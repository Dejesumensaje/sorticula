/** Datos estructurales de "El Oficio". El texto (title, desc) es localizado y
 *  vive en `$lib/i18n/dict` (oficio.steps, mismo orden). */
export interface OficioStep {
	n: string;
	/** Foto opcional (en /img). Cae al placeholder a rayas si falta. */
	img?: string;
}

export const oficio: OficioStep[] = [
	{ n: '01' },
	{ n: '02', img: '/img/fuego.jpeg' },
	{ n: '03', img: '/img/manos.jpeg' },
	{ n: '04' },
	{ n: '05' }
];
