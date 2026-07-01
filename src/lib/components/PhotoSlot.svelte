<script lang="ts">
	/**
	 * Slot de foto con placeholder a rayas. La foto se tiñe hacia la paleta
	 * activa (duotono ligero) para que combine con cualquier color de sección.
	 */
	interface Props {
		src?: string;
		label: string;
		theme?: 'dark' | 'light';
		imgClass?: string;
	}
	let { src, label, theme = 'dark', imgClass = '' }: Props = $props();

	let failed = $state(false);
</script>

<div class="slot {theme}">
	{#if src && !failed}
		<img
			{src}
			alt={label}
			class="photo {imgClass}"
			loading="lazy"
			decoding="async"
			onerror={() => (failed = true)}
		/>
		<span class="tone" aria-hidden="true"></span>
	{:else}
		<span class="ph-label">[ foto · {label} ]</span>
	{/if}
</div>

<style>
	.slot {
		position: absolute;
		inset: 0;
		overflow: hidden;
		background: repeating-linear-gradient(
			48deg,
			var(--surface),
			var(--surface) 11px,
			color-mix(in srgb, var(--surface) 84%, var(--fg)) 11px,
			color-mix(in srgb, var(--surface) 84%, var(--fg)) 22px
		);
	}
	.photo {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	/* Duotono: empuja la foto hacia la paleta sin perder su contenido. */
	.tone {
		position: absolute;
		inset: 0;
		background: var(--bg);
		mix-blend-mode: color;
		opacity: 0.5;
		pointer-events: none;
	}
	.ph-label {
		position: absolute;
		left: 0;
		bottom: 0;
		padding: 16px;
		font-family: var(--sans);
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.04em;
		color: var(--fg-muted);
	}
</style>
