import { c as createComponent, f as renderComponent, d as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_1IIrW8fW.mjs';
import 'piccolore';
import { $ as $$StoreLayout } from '../chunks/StoreLayout_CjQWi9Fh.mjs';
import { $ as $$ProductCard } from '../chunks/ProductCard_CruyCbUp.mjs';
import { p as products } from '../chunks/products_Cityh8Rp.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Pesquisa = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "StoreLayout", $$StoreLayout, { "title": "Pesquisa | Ateli\xEA \xD3tico" }, { "default": ($$result2) => renderTemplate(_a || (_a = __template(["", '<div class="content-page"><p>PESQUISA</p><h1>O que procura?</h1><div class="search-box"><input type="search" data-search placeholder="Pesquisar modelos, formas ou materiais" autofocus><button>PESQUISAR</button></div><div class="product-grid" data-search-results>', `</div><p class="empty-results">Sem resultados para esta pesquisa.</p></div><script>const input=document.querySelector('[data-search]'),cards=[...document.querySelectorAll('[data-search-results] .store-card')];input?.addEventListener('input',()=>{const q=input.value.toLowerCase().trim();let n=0;cards.forEach(c=>{const show=!q||c.textContent.toLowerCase().includes(q);c.hidden=!show;if(show)n++});document.querySelector('.empty-results').style.display=n?'none':'block'})<\/script>`])), maybeRenderHead(), products.map((p) => renderTemplate`${renderComponent($$result2, "ProductCard", $$ProductCard, { "product": p })}`)) })}`;
}, "C:/Users/enman/Desktop/Ateli\xEA_Otico/src/pages/pesquisa.astro", void 0);

const $$file = "C:/Users/enman/Desktop/Ateliê_Otico/src/pages/pesquisa.astro";
const $$url = "/pesquisa";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Pesquisa,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
