import { browser } from '$app/environment';

/** True when the user asked the OS to reduce motion. Safe on the server. */
export function prefersReducedMotion(): boolean {
	if (!browser) return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
