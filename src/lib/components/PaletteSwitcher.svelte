<script lang="ts">
	import { randomize } from '$lib/state/palette.svelte';

	let gem = $state<HTMLSpanElement>();

	// Cada clic = girar la piedra para atrapar otra luz → otra paleta.
	function turn() {
		randomize();
		gem?.animate(
			[
				{ transform: 'rotate(0deg) scale(1)' },
				{ transform: 'rotate(210deg) scale(1.14)' },
				{ transform: 'rotate(360deg) scale(1)' }
			],
			{ duration: 700, easing: 'cubic-bezier(0.5, 0, 0.2, 1)' }
		);
	}
</script>

<button
	type="button"
	class="gem-btn hot"
	onclick={turn}
	aria-label="Otra luz — cambia la paleta"
	title="Otra luz"
>
	<span class="gem" bind:this={gem}>
		<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
			<g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round">
				<path d="M8 4 H16 L20 9.2 L12 20.5 L4 9.2 Z" />
				<path d="M4 9.2 H20" />
				<path d="M8 4 L9.8 9.2 M16 4 L14.2 9.2" />
				<path d="M9.8 9.2 L12 20.5 M14.2 9.2 L12 20.5" />
				<path d="M12 4 V9.2" />
			</g>
		</svg>
	</span>
	<span class="spark" aria-hidden="true">
		<svg viewBox="0 0 12 12" width="9" height="9">
			<path d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5 Z" fill="currentColor" />
		</svg>
	</span>
</button>

<style>
	.gem-btn {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 1.5px solid var(--line-strong);
		background: transparent;
		color: var(--fg);
		cursor: pointer;
		transition:
			border-color 0.3s,
			transform 0.3s var(--ease);
	}
	.gem-btn:hover {
		border-color: var(--fg);
		transform: translateY(-2px);
	}
	.gem {
		display: inline-flex;
		transform-origin: 50% 52%;
	}
	/* Brillo sutil al pasar / mantener */
	.spark {
		position: absolute;
		top: 4px;
		right: 5px;
		display: inline-flex;
		color: var(--accent);
		opacity: 0;
		transform: scale(0.4);
		transition:
			opacity 0.3s,
			transform 0.3s var(--ease);
	}
	.gem-btn:hover .spark {
		opacity: 1;
		transform: scale(1);
		animation: twinkle 1.4s var(--ease) infinite;
	}
	@keyframes twinkle {
		0%,
		100% {
			opacity: 1;
			transform: scale(1) rotate(0deg);
		}
		50% {
			opacity: 0.4;
			transform: scale(0.78) rotate(45deg);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.gem-btn:hover .spark {
			animation: none;
		}
	}
</style>
