import { c as createComponent, f as renderComponent, d as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_1IIrW8fW.mjs';
import 'piccolore';
import { $ as $$StoreLayout } from '../chunks/StoreLayout_CjQWi9Fh.mjs';
export { renderers } from '../renderers.mjs';

const $$Carreiras = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "StoreLayout", $$StoreLayout, { "title": "Carreiras | Ateli\xEA \xD3tico" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<article class="content-page"><p>ATELIÊ ÓTICO</p><h1>Carreiras</h1><p>Procuramos pessoas que valorizem design independente, precisão ótica e atendimento humano. Envie a sua candidatura espontânea através da página de contactos.</p><a class="rect black" href="/contactos">CONTACTAR</a></article>` })}`;
}, "C:/Users/enman/Desktop/Ateli\xEA_Otico/src/pages/carreiras.astro", void 0);

const $$file = "C:/Users/enman/Desktop/Ateliê_Otico/src/pages/carreiras.astro";
const $$url = "/carreiras";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Carreiras,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
