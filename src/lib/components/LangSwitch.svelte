<script lang="ts">
	import { lang, setLang } from '$lib/state/lang.svelte';
</script>

<div class="lang" role="group" aria-label="Idioma / Language">
	<button
		type="button"
		class="opt"
		class:active={lang.code === 'es'}
		aria-pressed={lang.code === 'es'}
		onclick={() => setLang('es')}>ES</button
	>
	<span class="sep" aria-hidden="true">/</span>
	<button
		type="button"
		class="opt"
		class:active={lang.code === 'en'}
		aria-pressed={lang.code === 'en'}
		onclick={() => setLang('en')}>EN</button
	>
</div>

<style>
	.lang {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-family: var(--sans);
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.1em;
	}
	.opt {
		background: none;
		border: none;
		cursor: pointer;
		padding: 4px 2px;
		color: var(--fg);
		opacity: 0.5;
		transition: opacity 0.3s;
		font: inherit;
		letter-spacing: inherit;
	}
	.opt:hover {
		opacity: 0.85;
	}
	.opt.active {
		opacity: 1;
		text-decoration: underline;
		text-underline-offset: 4px;
		text-decoration-thickness: 1.5px;
	}
	.sep {
		opacity: 0.4;
		color: var(--fg);
	}
</style>
