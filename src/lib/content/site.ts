/** Global site metadata + contact info. Single source of truth for the prototype. */
export const site = {
	name: 'Sortícula',
	tagline: 'El taller donde el tiempo toma forma',
	// Used for SEO canonical/OG. Update when the real domain is live (phase 2).
	url: 'https://sorticula.com',
	locale: 'es_CO',
	founded: '2016',
	description:
		'Taller de joyería en Bogotá. No vendemos joyas: te damos el fuego, las herramientas y las manos expertas para que forjes la tuya, junto a quien tú quieras.',
	contact: {
		email: 'quierocrear@sorticula.com',
		whatsapp: '+57 311 291 8935',
		whatsappUrl: 'https://wa.me/573112918935',
		address: 'Calle 59 bis #8-27, Bogotá',
		city: 'Bogotá',
		country: 'CO'
	},
	nav: [
		{ label: 'El Oficio', href: '#oficio' },
		{ label: 'Experiencias', href: '#experiencias' },
		{ label: 'Reservar', href: '#reserva' }
	]
} as const;

export type Site = typeof site;
