# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The **Ateliê Ótico** site (optician, Praça do Carmo, Funchal, Madeira) — content in
European Portuguese, built on the Neo Ocular theme layout.

The core rule of this project: **the layout is fixed.** CSS, class names, section
structure and image dimensions are never modified. Only text nodes and `<img src>`
change. If something looks wrong, fix the content mapping — do not edit the markup or
the theme CSS.

Sibling `../neoocular-astro/` is the verified 161-page mirror this layout came from;
`../index.html` + `../css|js|images/` is the original scrape. Neither is touched by
this project.

## Commands

```sh
npm run dev       # dev server (use `astro dev --background`, then astro dev stop/status/logs)
npm run build     # SSG build -> dist/
npm run images    # crop client photos to slot dimensions -> public/img/atelie/
npm run content   # apply pt-PT text + swap <img src> -> src/html/home.pt.content.html
npm run regen     # images + content + build   ← the loop after any content edit
```

`npm run content` ends with a hard gate: it scans the output for English and **exits
non-zero** listing anything it finds. Never bypass it — add the string to
`dictionary.mjs` instead.

Selector-based mapping alone is not enough: it only reaches nodes it names, which once
left 135 of 196 visible strings in English while still reporting "0 unmatched". The
dictionary pass plus this gate is what makes coverage verifiable.

## How content flows

```
tools/content.mjs ─┐
                   ├─ apply-content.mjs ─> src/html/home.pt.content.html ─> src/pages/index.astro
src/html/home.content.html (pristine Neo Ocular markup, never edited by hand)
tools/slots.mjs ───┴─ build-images.mjs  ─> public/img/atelie/*.{jpg,png}
```

- **[tools/dictionary.mjs](tools/dictionary.mjs)** — the **complete** EN→pt-PT map,
  applied to every text node and to `placeholder`/`alt`/`title`/`aria-label`/`value`.
  `PATTERNS` handles strings that embed a number (prices) and switches `$` to `€`.
  This is what guarantees nothing ships in English; ~1,600 substitutions per run.
- **[tools/content.mjs](tools/content.mjs)** — section-specific copy that needs
  position, not just a word-for-word match. Keyed by section index (1-based,
  `.elementor-top-section` document order), then `[selector, ...values]` where the
  Nth match gets the Nth string.
- **[tools/slots.mjs](tools/slots.mjs)** — `SLOTS` maps a slot key to its **original**
  `w`/`h` plus the source photo; `THEME_IMAGE_MAP` maps the theme's filename to that key.
- **[tools/apply-content.mjs](tools/apply-content.mjs)** — the applier.
- Chrome (header/nav/footer) is translated into `src/html/chrome-pt/`; components read
  from there. `src/html/chrome/` holds the untranslated originals.

### Two things that will bite you

**Write to the innermost node.** The theme nests headings as
`<h3 class="qodef-m-title"><span class="qodef-m-title-text">…</span></h3>` and styles the
inner span. Setting text on the outer element deletes it and changes the rendering, so
`setText()` descends to the innermost single `<span>`/`<a>` first. Do not bypass it.

**Never resize a slot.** `build-images.mjs` outputs exactly the slot's original
dimensions using `fit: 'cover'` with sharp's attention strategy, so photos are cropped —
never stretched — to fill the space the design already allocates. Logos use
`fit: 'contain'` on transparent PNG so they are not cut. The script asserts output
dimensions and exits non-zero on mismatch.

## Current state

Home page builds. 80 text nodes, 35 images, 81 nav labels replaced; 0 unmatched;
28/28 crops dimension-exact.

Section → content mapping (Neo Ocular section index → brief section):

| § | Section | Content |
|---|---|---|
| 1 | hero slider | Ver a Peça / Marcar Consulta |
| 2–3 | product grid | Os Favoritos — 6 Snob Milano models |
| 4 | feature block | Spy: titânio, clip-on magnético |
| 5 | feature block | Chicca Sol: lentes Zeiss, peça única |
| 6–7 | advantages | Peça Única · Optometria Completa · Consultoria de Imagem |
| 8 | banners | Óculos Graduados · Óculos de Sol |
| 9–11 | booking | Marcar Consulta + form |
| 12–13 | accordions | O Poder do Essencial · Feito Para Durar |
| 14 | post list | Novidades |
| 15–16 | gallery, brands | Entre no Nosso Mundo, logos |

## Not done yet — needs real data

- **Prices.** The brief carries `€—` throughout; no real values were supplied. Product
  cards currently show the theme's placeholder prices.
- **Testimonial.** The brief's review is explicitly flagged as an example. Replace with a
  real, authorised Google/Instagram review before publishing.
- **Countdown.** The brief's pre-launch timer has no target date. The Neo Ocular home has
  no countdown widget, so it was not placed; if wanted, either add the date or reframe the
  section as "Reserve a sua visita".
- **Categories 03/04** (Lentes de Contacto, Acessórios) live in §10 rather than as their
  own cards — the layout offers 2 banner slots, not 4.
- **Contact details** are wired from `BUSINESS` in content.mjs: 291 220 679, WhatsApp
  964 993 767, Rua da Conceição 29B. The email `geral@atelieotico.pt` is a **guess** —
  confirm it.
- Backend-dependent widgets (search, cart, login, form submission) are inert: the markup
  is styled but there is no server behind it.

## Licensing

The underlying layout and CSS are Qode Interactive's commercial "Neo Ocular" theme.
Shipping this to a client requires a valid theme licence. The photography, brand assets
and copy are the client's own.
