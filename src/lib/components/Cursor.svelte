<script lang="ts">
	import { onMount } from 'svelte';

	let ring: HTMLDivElement;
	let core: HTMLDivElement;
	let active = $state(false);
	let hot = $state(false);

	onMount(() => {
		if (!window.matchMedia('(pointer:fine)').matches) return;
		active = true;
		document.body.classList.add('has-cursor');

		let x = innerWidth / 2,
			y = innerHeight / 2,
			rx = x,
			ry = y;
		let raf = 0;

		const onMove = (e: PointerEvent) => {
			x = e.clientX;
			y = e.clientY;
			core.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
		};
		const onOver = (e: Event) => {
			const t = e.target as HTMLElement;
			hot = !!t.closest?.('a, button, .hot');
		};

		const loop = () => {
			rx += (x - rx) * 0.18;
			ry += (y - ry) * 0.18;
			ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
			raf = requestAnimationFrame(loop);
		};
		loop();

		window.addEventListener('pointermove', onMove, { passive: true });
		window.addEventListener('pointerover', onOver, { passive: true });

		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('pointermove', onMove);
			window.removeEventListener('pointerover', onOver);
			document.body.classList.remove('has-cursor');
		};
	});
</script>

<div class="ring" class:on={active} class:is-hot={hot} bind:this={ring} aria-hidden="true"></div>
<div class="core" class:on={active} bind:this={core} aria-hidden="true"></div>

<style>
	.ring,
	.core {
		position: fixed;
		left: 0;
		top: 0;
		border-radius: 50%;
		pointer-events: none;
		z-index: 9999;
		opacity: 0;
	}
	.ring.on,
	.core.on {
		opacity: 1;
	}
	.ring {
		width: 30px;
		height: 30px;
		border: 1.5px solid var(--ember);
		mix-blend-mode: difference;
		transition:
			width 0.25s,
			height 0.25s,
			background 0.25s;
	}
	.ring.is-hot {
		width: 52px;
		height: 52px;
		background: color-mix(in srgb, var(--accent) 20%, transparent);
	}
	.core {
		width: 6px;
		height: 6px;
		background: var(--ember);
	}
	@media (pointer: coarse) {
		.ring,
		.core {
			display: none;
		}
	}
</style>
