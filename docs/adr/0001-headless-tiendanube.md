# ADR 0001 — Arquitectura: híbrido headless con Tiendanube

- **Estado:** Aceptado
- **Fecha:** 2026-06-29
- **Contexto del proyecto:** Sortícula (taller de joyería, Bogotá). Sitio one-page
  impactante. La tienda se administra en **Tiendanube (Nuvemshop)**.

## Contexto

Se quería evaluar si era posible un frontend **headless** (a medida, desacoplado del
tema de Tiendanube) sobre la plataforma, idealmente con SvelteKit y animaciones
avanzadas, manteniendo la administración en Tiendanube.

## Investigación

- **API de Tiendanube:** REST + **OAuth2 obligatorio**. El token es secreto y debe usarse
  **solo del lado del servidor**. No existe una API pública de storefront para leer
  productos desde el navegador. Hay rate limiting (Leaky Bucket: 40 de bucket, 2 req/s).
- **Checkout:** es **alojado/transparente** dentro de Nuvemshop. No hay un endpoint
  documentado para "crear carrito → obtener checkout URL". El recurso `Cart` solo permite
  leer/eliminar ítems de carritos existentes, no orquestar un checkout propio.
- **Dominio:** Tiendanube gestiona el dominio cuando se delega; admite subdominios vía CNAME.

Fuentes: documentación oficial `tiendanube.github.io/api-documentation` (intro, checkout,
cart, product) y centro de ayuda de Tiendanube (dominios/subdominios).

## Decisión

Adoptar un modelo **híbrido headless**:

1. **Frontend a medida** en SvelteKit (este repo), impactante y optimizado, en el dominio
   principal.
2. **Checkout NO se reemplaza.** La conversión se hace por **handoff**: el botón
   "Reservar" enlaza a la página de producto / checkout **alojado** de Tiendanube
   (subdominio sugerido `tienda.sorticula.com` vía CNAME).
3. **Contenido fijo en código** para esta fase (no se consume la API). Las experiencias y
   etapas viven tipadas en `src/lib/content/`. Cada experiencia tiene `reserveUrl`, hoy un
   ancla placeholder, que en fase 2 apunta al producto real.

Un **checkout 100% propio queda descartado** por las restricciones de plataforma.

## Alternativas consideradas

- **Headless con checkout propio:** inviable (checkout alojado, sin API de orquestación).
- **Contenido dinámico desde la API ahora:** aplazado. Requiere publicar una app OAuth y un
  servidor con el token; aporta poco para validar el prototipo y añade superficie de fallo.

## Consecuencias

- (+) Libertad total de diseño/animación y SEO controlado; sin secretos ni servidor en fase 1.
- (+) Salida **estática** portable (Vercel/Netlify/cualquier host).
- (−) Hay un salto de dominio al pagar (mitigable con subdominio de marca y diseño de la
  transición).
- (−) Precios/links se editan en código hasta que (si se quiere) se integre la API en fase 2.

## Fase 2 (pendiente, en conjunto)

App/credenciales Tiendanube, URLs de producto reales en `reserveUrl`, DNS
`tienda.sorticula.com`, y —opcional— lectura de productos vía API server-side si se desea
sincronizar contenido.
