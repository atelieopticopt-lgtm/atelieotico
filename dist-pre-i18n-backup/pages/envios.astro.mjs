import { c as createComponent, f as renderComponent, d as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_1IIrW8fW.mjs';
import 'piccolore';
import { $ as $$StoreLayout } from '../chunks/StoreLayout_CjQWi9Fh.mjs';
export { renderers } from '../renderers.mjs';

const $$Envios = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "StoreLayout", $$StoreLayout, { "title": "Envios e Devolu\xE7\xF5es | Ateli\xEA \xD3tico \u2014 Madeira" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="content-page legal-article"> <h1>Envios e Devoluções</h1> <h2>Envios</h2> <p>Entregas em toda a Região Autónoma da Madeira e Portugal Continental. Portes gratuitos em encomendas a partir de 100 € com seguro de envio incluído.</p> <h2>Devoluções</h2> <p>Pode solicitar uma devolução no prazo de 14 dias após a receção, desde que o artigo esteja sem sinais de utilização e na embalagem de autor original.</p> </article> ` })}`;
}, "C:/Users/enman/Desktop/Ateli\xEA_Otico/src/pages/envios.astro", void 0);

const $$file = "C:/Users/enman/Desktop/Ateliê_Otico/src/pages/envios.astro";
const $$url = "/envios";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Envios,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
