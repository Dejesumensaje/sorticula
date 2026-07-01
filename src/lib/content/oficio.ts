/** The five stages of "El Oficio" — the narrative spine of the workshop process. */
export interface OficioStep {
	n: string;
	title: string;
	desc: string;
	/** Optional photo (in /img). Falls back to the striped placeholder if absent. */
	img?: string;
}

export const oficio: OficioStep[] = [
	{
		n: '01',
		title: 'Materia',
		desc: 'Eliges el metal y, si quieres, una piedra. Cada material guarda su propia luz.'
	},
	{
		n: '02',
		title: 'Fuego',
		desc: 'El soplete transforma el metal: lo fundes, lo doblas y lo haces tuyo.',
		img: '/img/fuego.jpeg'
	},
	{
		n: '03',
		title: 'Manos',
		desc: 'Cortas, limas y pules. La precisión que solo tus manos dan, las guía el experto.',
		img: '/img/manos.jpeg'
	},
	{
		n: '04',
		title: 'Tiempo',
		desc: 'Una sesión, una historia. El detalle es lento; por eso queda para siempre.'
	},
	{
		n: '05',
		title: 'Forma',
		desc: 'La pieza nace. Sales con tu joya puesta y con el orgullo de haberla hecho tú.'
	}
];
