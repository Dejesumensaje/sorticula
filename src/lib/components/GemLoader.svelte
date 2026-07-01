<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion } from '$lib/anim/motion';
	import { tr } from '$lib/state/lang.svelte';

	const t = $derived(tr());

	let intro = $state<HTMLDivElement>();
	let gone = $state(false);

	function dismiss() {
		gone = true;
		document.documentElement.style.overflow = '';
	}

	onMount(() => {
		if (prefersReducedMotion()) {
			dismiss();
			return;
		}
		document.documentElement.style.overflow = 'hidden';
		const onEnd = (e: AnimationEvent) => {
			if (e.animationName === 'introOut') dismiss();
		};
		intro?.addEventListener('animationend', onEnd);
		const safety = setTimeout(dismiss, 2400);
		return () => {
			intro?.removeEventListener('animationend', onEnd);
			clearTimeout(safety);
			document.documentElement.style.overflow = '';
		};
	});
</script>

<div class="intro" class:gone bind:this={intro} role="presentation">
	<span class="flood" aria-hidden="true"></span>
	<span class="ring r1" aria-hidden="true"></span>
	<span class="ring r2" aria-hidden="true"></span>

	<span class="gem" aria-hidden="true">
		<svg viewBox="0 0 24 24" width="58" height="58">
			<g fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round">
				<path d="M8 4 H16 L20 9.2 L12 20.5 L4 9.2 Z" />
				<path d="M4 9.2 H20" />
				<path d="M8 4 L9.8 9.2 M16 4 L14.2 9.2" />
				<path d="M9.8 9.2 L12 20.5 M14.2 9.2 L12 20.5" />
				<path d="M12 4 V9.2" />
			</g>
		</svg>
	</span>

	<button type="button" class="skip" onclick={dismiss}>{t.loader.skip}</button>
</div>

<style>
	.intro {
		position: fixed;
		inset: 0;
		z-index: 1000;
		display: grid;
		place-items: center;
		background: #0d0b0a;
		overflow: hidden;
		animation: introOut 0.44s cubic-bezier(0.7, 0, 0.28, 1) 1.28s forwards;
	}
	.intro.gone {
		display: none;
	}

	/* El pulso fuerte estalla el color de la sesión sobre toda la pantalla */
	.flood {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: var(--bg);
		transform: translate(-50%, -50%) scale(0);
		animation: flood 0.62s cubic-bezier(0.16, 1, 0.3, 1) 0.86s forwards;
	}

	/* Ondas de cada latido */
	.ring {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 58px;
		height: 58px;
		margin: -29px 0 0 -29px;
		border-radius: 50%;
		border: 1.5px solid rgba(244, 239, 230, 0.55);
		transform: scale(0.5);
		opacity: 0;
	}
	.r1 {
		animation: pulseRing 0.62s cubic-bezier(0.16, 1, 0.3, 1) 0.26s forwards;
	}
	.r2 {
		animation: pulseRing 0.62s cubic-bezier(0.16, 1, 0.3, 1) 0.56s forwards;
	}

	.gem {
		position: relative;
		z-index: 1;
		display: inline-flex;
		color: #f4efe6;
		transform-origin: 50% 54%;
		filter: drop-shadow(0 0 0 rgba(244, 239, 230, 0));
		animation: heartbeat 1.34s both;
	}

	.skip {
		position: absolute;
		bottom: clamp(20px, 4vw, 40px);
		right: clamp(20px, 4vw, 40px);
		z-index: 2;
		background: none;
		border: none;
		cursor: pointer;
		color: rgba(244, 239, 230, 0.6);
		font-family: var(--sans);
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		padding: 8px;
		opacity: 0;
		animation: skipIn 0.4s ease 0.4s forwards;
		transition: color 0.3s;
	}
	.skip:hover {
		color: #f4efe6;
	}

	/* Llega con pop → late dos veces → anticipa → estalla hacia afuera */
	@keyframes heartbeat {
		0% {
			opacity: 0;
			transform: scale(0.35);
			filter: drop-shadow(0 0 0 rgba(244, 239, 230, 0));
			animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
		}
		15% {
			opacity: 1;
			transform: scale(1);
			animation-timing-function: cubic-bezier(0.4, 0, 0.5, 1);
		}
		24% {
			transform: scale(1.18);
			filter: drop-shadow(0 0 14px rgba(244, 239, 230, 0.45));
			animation-timing-function: cubic-bezier(0.5, 0, 0.7, 0.2);
		}
		33% {
			transform: scale(1);
			filter: drop-shadow(0 0 4px rgba(244, 239, 230, 0.2));
			animation-timing-function: cubic-bezier(0.4, 0, 0.5, 1);
		}
		45% {
			transform: scale(1.18);
			filter: drop-shadow(0 0 14px rgba(244, 239, 230, 0.45));
			animation-timing-function: cubic-bezier(0.5, 0, 0.7, 0.2);
		}
		55% {
			transform: scale(0.98);
			animation-timing-function: cubic-bezier(0.6, 0, 0.9, 0.25);
		}
		64% {
			transform: scale(0.86);
			animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
		}
		100% {
			transform: scale(2.4);
			opacity: 0;
			filter: drop-shadow(0 0 26px rgba(244, 239, 230, 0.5));
		}
	}
	@keyframes pulseRing {
		0% {
			transform: scale(0.5);
			opacity: 0.6;
		}
		100% {
			transform: scale(3.2);
			opacity: 0;
		}
	}
	@keyframes flood {
		to {
			transform: translate(-50%, -50%) scale(200);
		}
	}
	@keyframes skipIn {
		to {
			opacity: 1;
		}
	}
	@keyframes introOut {
		to {
			opacity: 0;
			transform: scale(1.03);
			visibility: hidden;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.intro {
			animation: none;
			display: none;
		}
	}
</style>
