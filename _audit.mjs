import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import os from 'node:os';

const EXEC =
	os.homedir() +
	'/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell';
const OUT = '/private/tmp/claude-501/-Users-dejesumensaje-Developer-sorticula/6bea6b95-a084-41ce-b3ca-1853deec850e/scratchpad/audit';
mkdirSync(OUT, { recursive: true });

const PALS = ['pal-brasa', 'pal-fundido', 'pal-patina', 'pal-cobalto', 'pal-tinta'];
const URL = 'http://localhost:5173/';

const browser = await chromium.launch({ executablePath: EXEC });
// reduced-motion: los reveals salen visibles al instante y El Oficio cae a su
// grilla estática (sin pin/Lenis) → captura limpia para auditar layout y color.
const ctx = await browser.newContext({
	viewport: { width: 1440, height: 900 },
	deviceScaleFactor: 1,
	reducedMotion: 'reduce'
});
const page = await ctx.newPage();

async function prep(p) {
	await p.evaluate(() => document.fonts.ready);
	// recorre la página para cargar imágenes lazy y disparar observers
	await p.evaluate(async () => {
		await new Promise((res) => {
			let y = 0;
			const t = setInterval(() => {
				window.scrollBy(0, 600);
				y += 600;
				if (y >= document.body.scrollHeight) {
					clearInterval(t);
					res();
				}
			}, 30);
		});
		window.scrollTo(0, 0);
	});
	await p.addStyleTag({ content: '.reveal{opacity:1!important;transform:none!important}' });
	await p.evaluate(() => Promise.all(Array.from(document.images).map((i) => (i.complete ? 1 : i.decode().catch(() => {})))));
	await p.waitForTimeout(300);
}

await page.goto(URL, { waitUntil: 'networkidle' });
await prep(page);

// audit helpers injected in-page
const auditFn = () => {
	const toRGB = (s) => {
		s = (s || '').trim();
		if (!s) return null;
		if (s.startsWith('#')) {
			let h = s.slice(1);
			if (h.length === 3) h = h.split('').map((c) => c + c).join('');
			return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
		}
		const nums = (s.match(/-?[\d.]+(?:e-?\d+)?/g) || []).map(Number);
		if (nums.length < 3) return null;
		const isColorFn = /color\(|srgb|display-p3/.test(s); // 0–1 range
		const rgb = nums.slice(0, 3);
		return isColorFn ? rgb.map((v) => Math.round(v * 255)) : rgb;
	};
	const lum = (rgb) => {
		const a = rgb.map((v) => {
			v /= 255;
			return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
		});
		return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
	};
	const ratio = (c1, c2) => {
		const a = lum(c1), b = lum(c2);
		const hi = Math.max(a, b), lo = Math.min(a, b);
		return +((hi + 0.05) / (lo + 0.05)).toFixed(2);
	};
	const cs = (el, prop) => getComputedStyle(el).getPropertyValue(prop).trim();
	const samples = [
		['.hero .title', 'color', '--bg'],
		['.hero .ital', 'color', '--bg'],
		['.hero .lede', 'color', '--bg'],
		['.hero .tagline', 'color', '--bg'],
		['.manifiesto .accent', 'color', '--bg'],
		['.oficio .eyebrow', 'color', '--bg'],
		['.reserva .ital', 'color', '--bg'],
		['.reserva .tab.active', 'color', '--accent'],
		['.manifiesto .body p', 'color', '--bg'],
		['.manifiesto .sign', 'color', '--bg'],
		['.oficio h3', 'color', '--bg'],
		['.oficio .card p', 'color', '--bg'],
		['.oficio .intro', 'color', '--bg'],
		['.experiencias .price', 'color', '--bg'],
		['.experiencias .who', 'color', '--bg'],
		['.reserva .name', 'color', '--bg'],
		['.reserva .desc', 'color', '--bg'],
		['.footer .col a', 'color', '--bg'],
		['.footer .brand p', 'color', '--bg']
	];
	const out = [];
	for (const [sel, prop, bgvar] of samples) {
		const el = document.querySelector(sel);
		if (!el) { out.push({ sel, missing: true }); continue; }
		const fg = toRGB(cs(el, prop));
		const bg = toRGB(cs(el, bgvar));
		if (!fg || !bg) { out.push({ sel, fgRaw: cs(el, prop), bgRaw: cs(el, bgvar) }); continue; }
		const r = ratio(fg, bg);
		out.push({ sel, ratio: r, passAA: r >= 4.5, passLarge: r >= 3 });
	}
	const de = document.documentElement;
	const overflow = de.scrollWidth - de.clientWidth;
	return { overflow, samples: out };
};

const results = {};
for (const pal of PALS) {
	await page.evaluate((p) => {
		const de = document.documentElement;
		['pal-brasa', 'pal-fundido', 'pal-patina', 'pal-cobalto', 'pal-tinta'].forEach((c) => de.classList.remove(c));
		de.classList.add(p);
	}, pal);
	await page.waitForTimeout(450);
	await page.screenshot({ path: `${OUT}/desktop-${pal}.png`, fullPage: true });
	results[pal] = await page.evaluate(auditFn);
}

// mobile pass (one palette, check overflow + screenshot)
const mctx = await browser.newContext({
	viewport: { width: 390, height: 844 },
	deviceScaleFactor: 1,
	reducedMotion: 'reduce'
});
const mpage = await mctx.newPage();
await mpage.goto(URL, { waitUntil: 'networkidle' });
await mpage.evaluate(() => {
	const de = document.documentElement;
	['pal-brasa', 'pal-fundido', 'pal-patina', 'pal-cobalto', 'pal-tinta'].forEach((c) => de.classList.remove(c));
	de.classList.add('pal-cobalto');
});
await prep(mpage);
await mpage.screenshot({ path: `${OUT}/mobile-cobalto.png`, fullPage: true });
const mobileOverflow = await mpage.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

console.log(JSON.stringify({ mobileOverflow, results }, null, 2));
await browser.close();
