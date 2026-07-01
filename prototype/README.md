# Sortícula

Landing page for **Sortícula** — a jewelry workshop in Bogotá where guests forge
their own pieces. Implemented from the Claude Design component `Sorticula.dc.html`.

## Run

It's a static site with no build step. Open `index.html` directly, or serve it:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Structure

- `index.html` — markup, fonts, styles, scroll-driven animations.
- `app.js` — renders the dynamic sections (El Oficio, Experiencias, Reserva),
  the reservation flow (tab/card selection → confirmation state), the custom
  cursor, and a scroll-reveal fallback for browsers without `animation-timeline: view()`.
- `img/` — image assets.

The original `.dc.html` used a React-based runtime; this port reproduces the same
behaviour with dependency-free vanilla JS.

## Images

`img/logo-white-trim.png` was imported from the design project. The three
photographs — `img/fuego.jpeg` (hero), `img/manos.jpeg`, `img/pareja.jpeg` —
could not be pulled in full because the design read API caps file reads at
256 KiB and these originals are larger.

Every photo slot degrades gracefully: until the real files exist it shows the
design's striped `[ foto · … ]` placeholder (and the hero shows a warm ember
gradient). **Drop the originals into `img/` with those exact filenames and they
appear automatically** — no code changes needed.
