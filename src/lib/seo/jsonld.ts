import { site } from '$lib/content/site';
import { experiences } from '$lib/content/experiences';

/** JSON-LD: a LocalBusiness offering the bookable experiences as services. */
export function localBusinessLd() {
	return {
		'@context': 'https://schema.org',
		'@type': 'JewelryStore',
		name: site.name,
		description: site.description,
		url: site.url,
		email: site.contact.email,
		telephone: site.contact.whatsapp,
		image: `${site.url}/og.jpg`,
		priceRange: '$$$',
		address: {
			'@type': 'PostalAddress',
			streetAddress: site.contact.address,
			addressLocality: site.contact.city,
			addressCountry: site.contact.country
		},
		areaServed: site.contact.city,
		makesOffer: experiences.map((e) => ({
			'@type': 'Offer',
			name: e.title,
			description: e.desc,
			priceCurrency: 'COP',
			category: 'Taller de joyería',
			url: `${site.url}/#reserva`
		}))
	};
}
