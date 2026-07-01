# ADR 0002 — Stack de animaciones

- **Estado:** Aceptado
- **Fecha:** 2026-06-29

## Contexto

El objetivo de marca es un sitio **impactante que genere curiosidad**, con animaciones
"arriesgadas pero con sentido", sin sacrificar performance, SEO ni accesibilidad en móvil.

## Decisión

Base **2D con GSAP + ScrollTrigger + Lenis**, más **un único momento WebGL** (three.js) en
el hero. Concretamente:

- **Lenis** — smooth-scroll, sincronizado con el ticker de GSAP y `ScrollTrigger.update`.
  Ver `src/lib/anim/smoothScroll.ts`.
- **GSAP + ScrollTrigger** — la animación protagonista: **El Oficio** con `pin` + scroll
  **horizontal** (timeline narrativo de las 5 etapas). Ver `src/lib/components/ElOficio.svelte`.
- **Reveals** — `IntersectionObserver` ligero vía la acción `use:reveal`
  (`src/lib/anim/reveal.ts`), en vez de cientos de ScrollTriggers, para no penalizar el paint.
- **Cursor-spark** — cursor a medida solo en `pointer:fine` (`Cursor.svelte`).
- **Hero "La Forja"** — campo de brasas en three.js (`src/lib/webgl/ForgeHero.ts`), **cargado
  dinámicamente** y solo en dispositivos capaces (`canRunWebGL` en `motion.ts`): requiere
  WebGL, ancho ≥ 760px y motion no reducido. Se pausa fuera de viewport / con la pestaña oculta.

## Por qué no three.js como protagonista

3D pesado como eje central encarece el bundle (~130 kB gzip de three) y arriesga jank y
peores métricas en móviles de gama media — justo el público de un negocio local. Un solo
momento WebGL, lazy y con fallback, da el "wow" sin ese costo en la ruta crítica.

## Salvaguardas

- **`prefers-reduced-motion`**: desactiva Lenis, el pin horizontal y el WebGL; los reveals se
  muestran de inmediato. Definido en `app.css` y en cada helper.
- **Progressive enhancement**: `<html class="no-js">`; si el JS no carga, `.reveal` permanece
  visible (nada queda oculto).
- **Fallback del hero**: gradiente de brasas + foto opcional bajo el canvas; si no hay WebGL,
  el hero se ve íntegro.
- **Code-splitting**: three.js queda en su propio chunk (import dinámico).

## Consecuencias

- (+) Impacto alto con ruta crítica liviana; degrada con elegancia.
- (−) El scroll horizontal con `pin` requiere `ScrollTrigger.refresh()` tras cargar fuentes/
  imágenes y pruebas en dispositivos reales (incluido en la verificación).
