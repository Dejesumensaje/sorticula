/**
 * Copias ES/EN. El inglés es localización, no traducción literal: se adapta el
 * tono, no palabra por palabra. Los datos estructurales (ids, precios, imágenes)
 * viven en content/*.ts; aquí solo el texto visible.
 */
export type Lang = 'es' | 'en';

interface ExpCopy {
	title: string;
	who: string;
	tag: string;
	unit: string;
	desc: string;
}

export interface Copy {
	nav: { oficio: string; experiencias: string; reservar: string };
	hero: {
		eyebrow: string;
		titleLead: string;
		titleHl: string;
		lede1: string;
		ledeStrong: string;
		lede2: string;
		cta: string;
		cue: string;
	};
	manifiesto: {
		eyebrow: string;
		h1: string;
		h2: string;
		h3: string;
		p1: string;
		p2: string;
		sign: string;
	};
	oficio: {
		eyebrow: string;
		titleLead: string;
		titleHl: string;
		intro: string;
		tag: string;
		steps: { title: string; desc: string }[];
	};
	experiencias: { eyebrow: string; title: string; intro: string; add: string };
	experiences: Record<string, ExpCopy>;
	reserva: {
		eyebrow: string;
		titleLead: string;
		titleHl: string;
		label: string;
		add: string;
		whatsapp: string;
		reassure: string;
		waPre: string;
		waPost: string;
	};
	footer: {
		brandDesc: string;
		explora: string;
		contacto: string;
		legal1: string;
		legal2: string;
	};
	cart: {
		titles: { cart: string; checkout: string; pago: string; done: string };
		steps: { datos: string; pago: string; listo: string };
		empty: string;
		total: string;
		continue: string;
		note: string;
		nombre: string;
		email: string;
		fecha: string;
		nombrePh: string;
		emailPh: string;
		toPago: string;
		backCart: string;
		metodoTarjeta: string;
		metodoPse: string;
		tarjeta: string;
		venc: string;
		cvc: string;
		titular: string;
		titularPh: string;
		pseNote: string;
		totalPagar: string;
		pagar: string;
		back: string;
		exp1: string;
		expN: string;
		note2: string;
		doneTitle: string;
		doneBody: string;
		doneCta: string;
		quitar: string;
		addOne: string;
		removeOne: string;
		close: string;
		openPre: string;
		item1: string;
		itemN: string;
	};
	price: { desde: string };
	loader: { skip: string };
	palette: { aria: string; title: string };
	seo: { tagline: string; description: string };
}

export const dict: Record<Lang, Copy> = {
	es: {
		nav: { oficio: 'El Oficio', experiencias: 'Experiencias', reservar: 'Reservar' },
		hero: {
			eyebrow: 'Taller de joyería · Bogotá · est. MMXVI',
			titleLead: 'El taller donde el tiempo ',
			titleHl: 'toma forma.',
			lede1:
				'No vendemos joyas. Te damos el fuego, las herramientas y las manos expertas para que ',
			ledeStrong: 'forjes la tuya',
			lede2: ' — junto a quien tú quieras.',
			cta: 'Reservar una experiencia →',
			cue: 'Scroll'
		},
		manifiesto: {
			eyebrow: 'Manifiesto · 01',
			h1: 'No creamos objetos, ',
			h2: 'materializamos el ',
			h3: 'tiempo y la memoria.',
			p1: 'En Sortícula el lujo no es el brillo: es el proceso. Cada pieza nace de una conversación entre el fuego y la mano, un rastro físico de un momento que merece ser eterno.',
			p2: 'Trabajas el metal acompañado por joyeros expertos. Llegas con una idea; te vas con una historia y con algo imposible de repetir, hecho por ti.',
			sign: 'Taller Sortícula — desde 2016'
		},
		oficio: {
			eyebrow: 'Capítulos del oficio',
			titleLead: 'El ',
			titleHl: 'Oficio',
			intro:
				'Cinco etapas que toda joya atraviesa antes de cruzar la puerta contigo. Sin experiencia previa: te acompaña un joyero experto en cada una.',
			tag: 'Etapa',
			steps: [
				{
					title: 'Materia',
					desc: 'Eliges el metal y, si quieres, una piedra. Cada material guarda su propia luz.'
				},
				{
					title: 'Fuego',
					desc: 'El soplete transforma el metal: lo fundes, lo doblas y lo haces tuyo.'
				},
				{
					title: 'Manos',
					desc: 'Cortas, limas y pules. La precisión que solo tus manos dan, las guía el experto.'
				},
				{
					title: 'Tiempo',
					desc: 'Una sesión, una historia. El detalle es lento; por eso queda para siempre.'
				},
				{
					title: 'Forma',
					desc: 'La pieza nace. Sales con tu joya puesta y con el orgullo de haberla hecho tú.'
				}
			]
		},
		experiencias: {
			eyebrow: 'Reserva tu lugar',
			title: 'Experiencias',
			intro:
				'Tres formas de entrar al taller. Cada una termina con una joya hecha por ustedes mismos — elige, agrégala al carrito y reserva tu sesión.',
			add: 'Agregar'
		},
		experiences: {
			'in-love': {
				title: 'In Love',
				who: 'Para parejas · 5 horas',
				tag: 'Más reservada',
				unit: 'pareja',
				desc: 'Bajo la energía de Los Amantes, forjen juntos sus argollas en plata ley 925. Dos manos, un mismo metal, el símbolo de su unión.'
			},
			'tu-fuego-propio': {
				title: 'Tu Fuego Propio',
				who: 'Individual · 5 horas',
				tag: 'A tu ritmo',
				unit: 'persona',
				desc: 'Crea desde cero un anillo, unos aretes o un dije. El nuevo lujo: tiempo, pausa y amor propio, guiada por La Sacerdotisa.'
			},
			'el-vinculo': {
				title: 'El Vínculo',
				who: 'En grupo · 6 horas',
				tag: 'Para grupos',
				unit: 'persona',
				desc: 'Creen con su grupo favorito en cuatro estaciones del oficio: fundir, laminar, armar y pulir. Un recuerdo tangible de la amistad.'
			}
		},
		reserva: {
			eyebrow: 'Empieza aquí',
			titleLead: 'Aparta tu ',
			titleHl: 'sesión',
			label: 'Experiencia seleccionada',
			add: 'Agregar al carrito →',
			whatsapp: 'Consultar por WhatsApp',
			reassure: 'Reserva tu cupo · pago seguro en el checkout',
			waPre: 'Hola Sortícula, quiero reservar la experiencia "',
			waPost: '". ¿Me cuentan disponibilidad?'
		},
		footer: {
			brandDesc: 'Casa de joyería donde el tiempo toma forma.',
			explora: 'Explora',
			contacto: 'Contacto',
			legal1: 'Todos los derechos reservados',
			legal2: 'Hecho a mano · Bogotá'
		},
		cart: {
			titles: { cart: 'Tu carrito', checkout: 'Tus datos', pago: 'Pago', done: 'Confirmado' },
			steps: { datos: 'Datos', pago: 'Pago', listo: 'Listo' },
			empty: 'Tu carrito está vacío. Elige una experiencia para empezar.',
			total: 'Total',
			continue: 'Continuar →',
			note: 'Prototipo · simulación de compra',
			nombre: 'Nombre',
			email: 'Email',
			fecha: 'Fecha preferida',
			nombrePh: 'Tu nombre',
			emailPh: 'tucorreo@ejemplo.com',
			toPago: 'Continuar al pago →',
			backCart: '← Volver al carrito',
			metodoTarjeta: 'Tarjeta',
			metodoPse: 'PSE',
			tarjeta: 'Número de tarjeta',
			venc: 'Vencimiento',
			cvc: 'CVC',
			titular: 'Nombre en la tarjeta',
			titularPh: 'Como aparece en la tarjeta',
			pseNote:
				'Serás redirigido a tu banco para completar el pago con PSE. (Simulado en el prototipo.)',
			totalPagar: 'Total a pagar',
			pagar: 'Pagar',
			back: '← Volver',
			exp1: 'experiencia',
			expN: 'experiencias',
			note2: 'Prototipo · no se procesa ningún pago real',
			doneTitle: 'Reserva confirmada',
			doneBody:
				'Te enviaríamos los detalles por correo. Esto es una simulación del prototipo — en producción, el pago se procesa de forma segura en el checkout de Tiendanube.',
			doneCta: 'Seguir explorando',
			quitar: 'Quitar',
			addOne: 'Agregar uno',
			removeOne: 'Quitar uno',
			close: 'Cerrar carrito',
			openPre: 'Abrir carrito',
			item1: 'ítem',
			itemN: 'ítems'
		},
		price: { desde: 'desde' },
		loader: { skip: 'Saltar' },
		palette: { aria: 'Otra luz — cambia la paleta', title: 'Otra luz' },
		seo: {
			tagline: 'El taller donde el tiempo toma forma',
			description:
				'Taller de joyería en Bogotá. No vendemos joyas: te damos el fuego, las herramientas y las manos expertas para que forjes la tuya, junto a quien tú quieras.'
		}
	},

	en: {
		nav: { oficio: 'The Craft', experiencias: 'Experiences', reservar: 'Book' },
		hero: {
			eyebrow: 'Jewelry workshop · Bogotá · est. MMXVI',
			titleLead: 'The workshop where time ',
			titleHl: 'takes shape.',
			lede1:
				"We don't sell jewelry. We hand you the fire, the tools, and expert hands so you can ",
			ledeStrong: 'forge your own',
			lede2: ' — beside whoever you choose.',
			cta: 'Book an experience →',
			cue: 'Scroll'
		},
		manifiesto: {
			eyebrow: 'Manifesto · 01',
			h1: "We don't make objects, ",
			h2: 'we give form to ',
			h3: 'time and memory.',
			p1: "At Sortícula, luxury isn't the shine — it's the process. Every piece is born from a conversation between fire and hand: the physical trace of a moment worth keeping forever.",
			p2: 'You work the metal alongside expert jewelers. You arrive with an idea; you leave with a story — and with something impossible to repeat, made by you.',
			sign: 'Sortícula Workshop — since 2016'
		},
		oficio: {
			eyebrow: 'Chapters of the craft',
			titleLead: 'The ',
			titleHl: 'Craft',
			intro:
				'Five stages every piece moves through before it walks out the door with you. No experience needed — an expert jeweler guides you through each one.',
			tag: 'Stage',
			steps: [
				{
					title: 'Matter',
					desc: 'You choose the metal and, if you like, a stone. Every material holds its own light.'
				},
				{
					title: 'Fire',
					desc: 'The torch transforms the metal: you melt it, bend it, and make it yours.'
				},
				{
					title: 'Hands',
					desc: 'You cut, file, and polish. The precision only your hands can give — guided by the expert.'
				},
				{
					title: 'Time',
					desc: "One session, one story. Detail is slow; that's exactly why it lasts forever."
				},
				{
					title: 'Form',
					desc: 'The piece is born. You leave wearing your jewel, proud that you made it yourself.'
				}
			]
		},
		experiencias: {
			eyebrow: 'Reserve your spot',
			title: 'Experiences',
			intro:
				'Three ways into the workshop. Each one ends with a jewel you made yourselves — pick one, add it to the cart, and book your session.',
			add: 'Add'
		},
		experiences: {
			'in-love': {
				title: 'In Love',
				who: 'For couples · 5 hours',
				tag: 'Most booked',
				unit: 'couple',
				desc: 'Under the energy of The Lovers, forge your wedding bands together in sterling silver 925. Two hands, one metal, the symbol of your union.'
			},
			'tu-fuego-propio': {
				title: 'Your Own Fire',
				who: 'Solo · 5 hours',
				tag: 'At your pace',
				unit: 'person',
				desc: 'Create a ring, earrings, or a pendant from scratch. The new luxury: time, stillness, and self-love — guided by The High Priestess.'
			},
			'el-vinculo': {
				title: 'The Bond',
				who: 'In a group · 6 hours',
				tag: 'For groups',
				unit: 'person',
				desc: 'Create with your favorite crew across four stations of the craft: melt, roll, assemble, and polish. A tangible memory of your friendship.'
			}
		},
		reserva: {
			eyebrow: 'Start here',
			titleLead: 'Book your ',
			titleHl: 'session',
			label: 'Selected experience',
			add: 'Add to cart →',
			whatsapp: 'Ask on WhatsApp',
			reassure: 'Reserve your spot · secure payment at checkout',
			waPre: 'Hi Sortícula, I’d love to book the "',
			waPost: '" experience. Could you tell me about availability?'
		},
		footer: {
			brandDesc: 'A jewelry house where time takes shape.',
			explora: 'Explore',
			contacto: 'Contact',
			legal1: 'All rights reserved',
			legal2: 'Handmade · Bogotá'
		},
		cart: {
			titles: { cart: 'Your cart', checkout: 'Your details', pago: 'Payment', done: 'Confirmed' },
			steps: { datos: 'Details', pago: 'Payment', listo: 'Done' },
			empty: 'Your cart is empty. Pick an experience to begin.',
			total: 'Total',
			continue: 'Continue →',
			note: 'Prototype · purchase simulation',
			nombre: 'Name',
			email: 'Email',
			fecha: 'Preferred date',
			nombrePh: 'Your name',
			emailPh: 'you@example.com',
			toPago: 'Continue to payment →',
			backCart: '← Back to cart',
			metodoTarjeta: 'Card',
			metodoPse: 'PSE',
			tarjeta: 'Card number',
			venc: 'Expiry',
			cvc: 'CVC',
			titular: 'Name on card',
			titularPh: 'As it appears on the card',
			pseNote:
				"You'll be redirected to your bank to complete payment with PSE. (Simulated in the prototype.)",
			totalPagar: 'Total to pay',
			pagar: 'Pay',
			back: '← Back',
			exp1: 'experience',
			expN: 'experiences',
			note2: 'Prototype · no real payment is processed',
			doneTitle: 'Reservation confirmed',
			doneBody:
				"We'd email you the details. This is a prototype simulation — in production, payment is processed securely at the Tiendanube checkout.",
			doneCta: 'Keep exploring',
			quitar: 'Remove',
			addOne: 'Add one',
			removeOne: 'Remove one',
			close: 'Close cart',
			openPre: 'Open cart',
			item1: 'item',
			itemN: 'items'
		},
		price: { desde: 'from' },
		loader: { skip: 'Skip' },
		palette: { aria: 'Another light — change the palette', title: 'Another light' },
		seo: {
			tagline: 'The workshop where time takes shape',
			description:
				"Jewelry workshop in Bogotá. We don't sell jewelry: we hand you the fire, the tools, and expert hands so you can forge your own, beside whoever you choose."
		}
	}
};
