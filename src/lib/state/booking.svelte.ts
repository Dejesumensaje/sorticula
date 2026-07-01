/** Shared, reactive selection between the Experiencias cards and the Reserva CTA. */
export const booking = $state({ selected: 0 });

export function selectExperience(i: number) {
	booking.selected = i;
}
