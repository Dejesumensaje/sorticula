import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './motion';

let registered = false;

/** Register ScrollTrigger once (idempotent). Components can call this safely. */
export function ensureScrollTrigger() {
	if (!registered) {
		gsap.registerPlugin(ScrollTrigger);
		registered = true;
	}
	return ScrollTrigger;
}

/**
 * Boot Lenis smooth-scroll and wire it to the GSAP ticker + ScrollTrigger.
 * Returns a cleanup function. No-op (but still registers ScrollTrigger) when
 * the user prefers reduced motion, so native scrolling is used instead.
 */
export function initSmoothScroll(): () => void {
	ensureScrollTrigger();

	if (prefersReducedMotion()) {
		return () => {};
	}

	const lenis = new Lenis({
		duration: 1.1,
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		smoothWheel: true
	});

	lenis.on('scroll', ScrollTrigger.update);

	const onTick = (time: number) => lenis.raf(time * 1000);
	gsap.ticker.add(onTick);
	gsap.ticker.lagSmoothing(0);

	// Recompute trigger positions once fonts/images settle.
	const refresh = () => ScrollTrigger.refresh();
	window.addEventListener('load', refresh);

	return () => {
		window.removeEventListener('load', refresh);
		gsap.ticker.remove(onTick);
		lenis.destroy();
	};
}
