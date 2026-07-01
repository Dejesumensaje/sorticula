# Sortícula — sitio one-page (prototipo · Fase 1)

Landing one-page para **Sortícula**, taller de joyería en Bogotá donde los clientes
**forjan su propia pieza**. SvelteKit + GSAP/ScrollTrigger + Lenis, con un momento WebGL
(three.js) en el hero.

> **Estado:** prototipo para validación. El contenido es fijo en código y los botones
> "Reservar" son placeholders. La integración real con **Tiendanube** (checkout, dominio)
> es Fase 2. Ver `docs/adr/0001-headless-tiendanube.md`.

## Requisitos

Node 20+ (probado en 22). `npm install` ya ejecutado.

## Desarrollo

```sh
npm run dev          # servidor de desarrollo
npm run dev -- --open
```

## Build y preview

```sh
npm run build        # genera el sitio estático en ./build
npm run preview      # sirve el build de producción localmente
npm run check        # type-check (svelte-check)
```

La salida es **100% estática** (`@sveltejs/adapter-static`, prerender), portable a cualquier
host.

## Deploy

El `build/` estático sirve igual en Vercel o Netlify.

- **Vercel:** importar el repo (framework: SvelteKit) o `vercel --prod`. Output detectado
  automáticamente. Si más adelante se necesita SSR/edge, cambiar a `@sveltejs/adapter-vercel`.
- **Netlify:** `build command = npm run build`, `publish = build`. O `netlify deploy --prod`.

> El adapter es intercambiable en una línea en `vite.config.ts` cuando se decida el host
> definitivo.

## Estructura

```
src/
  app.html, app.css            reset + design tokens + keyframes
  routes/
    +layout.svelte             Lenis + cursor + CSS global
    +layout.ts                 prerender = true
    +page.svelte               ensambla el one-page
    sitemap.xml/+server.ts
  lib/
    content/                   experiences.ts · oficio.ts · site.ts (contenido fijo, tipado)
    components/                Hero · Manifiesto · ElOficio · Experiencias · Reserva · Footer · Cursor · PhotoSlot
    anim/                      smoothScroll · reveal · motion
    webgl/ForgeHero.ts         escena de brasas (import dinámico + fallback)
    seo/                       Seo.svelte · jsonld.ts
    state/booking.svelte.ts    experiencia seleccionada (Experiencias ↔ Reserva)
static/img/                    logo + (fotos a entregar)
docs/adr/                      decisiones de arquitectura
prototype/                     prototipo estático original (referencia)
```

## Animaciones

- **El Oficio**: pin + scroll horizontal (GSAP/ScrollTrigger). En móvil/`prefers-reduced-motion`
  cae a una grilla vertical.
- **Hero WebGL**: brasas en three.js, lazy y solo en dispositivos capaces; fallback a gradiente.
- **Reveals**: `use:reveal` (IntersectionObserver). Todo respeta `prefers-reduced-motion`.

## Imágenes

`static/img/logo-white-trim.png` está incluido. Las fotos (`fuego.jpeg`, `manos.jpeg`,
`pareja.jpeg`) **faltan**: el sitio muestra placeholders elegantes hasta que se coloquen los
originales en `static/img/` con esos nombres — entonces aparecen solas.

## Pendientes (Fase 2, en conjunto)

- Fotos originales en alta.
- App/credenciales Tiendanube → URLs de producto en `reserveUrl` (`src/lib/content/experiences.ts`).
- DNS `tienda.sorticula.com` → Tiendanube; dominio principal del sitio.
- Imagen Open Graph real en `static/og.jpg`.
