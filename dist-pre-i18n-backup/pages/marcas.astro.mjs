import { c as createComponent, f as renderComponent, d as renderTemplate, m as maybeRenderHead, a as addAttribute } from '../chunks/astro/server_1IIrW8fW.mjs';
import 'piccolore';
import { $ as $$StoreLayout } from '../chunks/StoreLayout_CjQWi9Fh.mjs';
export { renderers } from '../renderers.mjs';

const $$Marcas = createComponent(($$result, $$props, $$slots) => {
  const brands = [
    {
      name: "SNOB Milano",
      logo: "/partner-snob.jpeg",
      style: "height: 64px; width: auto; max-width: 240px; mix-blend-mode: multiply; transform: scale(2.1); transform-origin: left center; object-position: left center; margin-left: -32px;",
      text: "Design italiano irreverente e solu\xE7\xF5es \xF3ticas vers\xE1teis com clip-on magn\xE9tico patenteado.",
      textEn: "Irreverent Italian design and versatile optical solutions with a patented magnetic clip-on."
    },
    {
      name: "\xD8rgreen Optics",
      logo: "/partner-orgreen.png",
      style: "height: 38px; width: auto; max-width: 200px; filter: brightness(0); object-position: left center;",
      text: "Cor, precis\xE3o e constru\xE7\xE3o escandinava em tit\xE2nio japon\xEAs de grau cir\xFArgico.",
      textEn: "Colour, precision and Scandinavian construction in surgical-grade Japanese titanium."
    },
    {
      name: "Einstoffen",
      logo: "/partner-einstoffen.png",
      style: "height: 68px; width: auto; max-width: 190px; mix-blend-mode: multiply; transform: scale(1.6); transform-origin: left center; object-position: left center;",
      text: "Arma\xE7\xF5es independentes inspiradas por mat\xE9rias-primas nobres e org\xE2nicas da Su\xED\xE7a.",
      textEn: "Independent eyewear inspired by noble, organic materials from Switzerland."
    },
    {
      name: "Rodenstock",
      logo: "/partner-rodenstock.png",
      style: "height: 70px; width: auto; max-width: 200px; mix-blend-mode: multiply; transform: scale(1.35); transform-origin: left center; object-position: left center;",
      text: "Tecnologia biom\xE9trica de lentes alem\xE3s e vis\xE3o de m\xE1xima acuidade \xF3tica.",
      textEn: "German biometric lens technology for maximum visual acuity."
    },
    {
      name: "Eyepetizer",
      logo: "/partners/eyepetizer.png",
      style: "height: 64px; width: auto; max-width: 220px; object-position: left center; filter: grayscale(1);",
      text: "\xD3culos italianos expressivos, leves e cheios de cor para uma identidade visual distinta.",
      textEn: "Expressive, lightweight and colourful Italian eyewear for a distinctive visual identity."
    },
    {
      name: "Longchamp",
      logo: "/partners/longchamp.svg",
      style: "height: 58px; width: auto; max-width: 220px; object-position: left center; filter: grayscale(1);",
      text: "Eleg\xE2ncia parisiense contempor\xE2nea aplicada a arma\xE7\xF5es femininas de linhas refinadas.",
      textEn: "Contemporary Parisian elegance expressed through refined women\u2019s eyewear."
    },
    {
      name: "Maison Bensimon",
      logo: "/partners/maison-bensimon.jpeg",
      style: "height: 68px; width: auto; max-width: 220px; object-position: left center; filter: grayscale(1);",
      text: "Criatividade francesa, cor e conforto numa cole\xE7\xE3o descontra\xEDda e contempor\xE2nea.",
      textEn: "French creativity, colour and comfort in a relaxed contemporary collection."
    }
  ];
  return renderTemplate`${renderComponent($$result, "StoreLayout", $$StoreLayout, { "title": "Marcas | Ateli\xEA \xD3tico" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="page-hero"> <p data-i18n-pt="CURADORIA & PARCEIROS" data-i18n-en="CURATION & PARTNERS">CURADORIA &amp; PARCEIROS</p> <h1 data-i18n-pt="As nossas marcas" data-i18n-en="Our brands">As nossas marcas</h1> </section> <div class="brand-list" style="max-width: 1280px; margin: 0 auto; padding: 0 24px 80px;"> ${brands.map((b) => renderTemplate`<article style="display: grid; grid-template-columns: 260px 1fr auto; align-items: center; gap: 48px; padding: 40px 0; border-bottom: 1px solid rgba(0, 0, 0, 0.1);"> <div style="display: flex; align-items: center; justify-content: flex-start; width: 260px; min-height: 80px;"> <img${addAttribute(b.logo, "src")}${addAttribute(b.name, "alt")}${addAttribute(`object-fit: contain; background: transparent !important; ${b.style}`, "style")}> </div> <p${addAttribute(b.text, "data-i18n-pt")}${addAttribute(b.textEn, "data-i18n-en")} style="font-size: 14px; color: #444; margin: 0; line-height: 1.6;">${b.text}</p> <a href="/catalogo" data-i18n-pt="VER MODELOS →" data-i18n-en="VIEW STYLES →" style="font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #000; text-decoration: none; border-bottom: 1px solid #000; padding-bottom: 2px;">VER MODELOS →</a> </article>`)} </div> ` })}`;
}, "C:/Users/enman/Desktop/Ateli\xEA_Otico/src/pages/marcas.astro", void 0);

const $$file = "C:/Users/enman/Desktop/Ateliê_Otico/src/pages/marcas.astro";
const $$url = "/marcas";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Marcas,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
