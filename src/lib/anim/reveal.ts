import { browser } from '$app/environment';
import { prefersReducedMotion } from './motion';

interface RevealOpts {
	/** Stagger delay in ms. */
	delay?: number;
	/** Viewport fraction that must be visible before revealing (0–1). */
	threshold?: number;
}

/**
 * Svelte action: reveals an element (`.reveal` → `.is-in`) the first time it
 * scrolls into view, using a cheap IntersectionObserver. Works with Lenis
 * (which scrolls the real document). Honours prefers-reduced-motion.
 *
 *   <div class="reveal" use:reveal>…</div>
 *   <div class="reveal" use:reveal={{ delay: 120 }}>…</div>
 */
export function reveal(node: HTMLElement, opts: RevealOpts = {}) {
	if (!browser) return;

	if (prefersReducedMotion()) {
		node.classList.add('is-in');
		return;
	}

	if (opts.delay) node.style.transitionDelay = `${opts.delay}ms`;

	const io = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (e.isIntersecting) {
					node.classList.add('is-in');
					io.unobserve(node);
				}
			}
		},
		{ threshold: opts.threshold ?? 0.15, rootMargin: '0px 0px -8% 0px' }
	);
	io.observe(node);

	return {
		destroy() {
			io.disconnect();
		}
	};
}
