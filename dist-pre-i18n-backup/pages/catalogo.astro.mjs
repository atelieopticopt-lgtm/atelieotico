import { c as createComponent, f as renderComponent, d as renderTemplate, a as addAttribute, m as maybeRenderHead } from '../chunks/astro/server_1IIrW8fW.mjs';
import 'piccolore';
import { $ as $$StoreLayout } from '../chunks/StoreLayout_CjQWi9Fh.mjs';
import { $ as $$ProductCard } from '../chunks/ProductCard_CruyCbUp.mjs';
import { p as products } from '../chunks/products_Cityh8Rp.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Catalogo = createComponent(($$result, $$props, $$slots) => {
  const groups = {
    category: [...new Set(products.map((p) => p.category))],
    shape: [...new Set(products.map((p) => p.shape))],
    material: [...new Set(products.map((p) => p.material))],
    color: [...new Set(products.map((p) => p.color))]
  };
  return renderTemplate`${renderComponent($$result, "StoreLayout", $$StoreLayout, { "title": "cat\xE1logo de \xD3culos | Ateli\xEA \xD3tico", "description": "cat\xE1logo completo de arma\xE7\xF5es \xF3ticas e \xF3culos de sol de autor no Ateli\xEA \xD3tico, Madeira." }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([" ", '<section class="page-hero"> <p>Ateli\xEA \xD3TICO</p> <h1>O nosso cat\xE1logo</h1> <p><span data-result-count>', '</span> MODELOS</p> </section> <div class="catalog-layout"> <aside class="filters"> <div class="filter-group"> <h2>TIPO</h2> ', ' </div> <div class="filter-group"> <h2>FORMA</h2> ', ' </div> <div class="filter-group"> <h2>MATERIAL</h2> ', ' </div> <div class="filter-group"> <h2>COR</h2> ', ' </div> </aside> <section class="catalog-main"> <div class="catalog-tools"> <div class="view-buttons"> <button data-view="grid" aria-label="Vista em grelha">\u25A6</button> <button data-view="list" aria-label="Vista em lista">\u25A4</button> </div> <select data-sort aria-label="Ordenar"> <option value="default">ORDENAR</option> <option value="price-asc">PRE\xC7O: ASCENDENTE</option> <option value="price-desc">PRE\xC7O: DESCENDENTE</option> <option value="name">NOME</option> </select> </div> <div class="product-grid" data-product-grid> ', ' </div> <p class="empty-results">N\xE3o encontr\xE1mos modelos com estes filtros.</p> </section> </div> <script src="/catalog.js"><\/script> '])), maybeRenderHead(), products.length, groups.category.map((v) => renderTemplate`<label> <input type="checkbox" data-filter="category"${addAttribute(v, "value")}> ${v} </label>`), groups.shape.map((v) => renderTemplate`<label> <input type="checkbox" data-filter="shape"${addAttribute(v, "value")}> ${v} </label>`), groups.material.map((v) => renderTemplate`<label> <input type="checkbox" data-filter="material"${addAttribute(v, "value")}> ${v} </label>`), groups.color.map((v) => renderTemplate`<label> <input type="checkbox" data-filter="color"${addAttribute(v, "value")}> ${v} </label>`), products.map((product) => renderTemplate`${renderComponent($$result2, "ProductCard", $$ProductCard, { "product": product })}`)) })}`;
}, "C:/Users/enman/Desktop/Ateli\xEA_Otico/src/pages/catalogo.astro", void 0);

const $$file = "C:/Users/enman/Desktop/Ateliê_Otico/src/pages/catalogo.astro";
const $$url = "/catalogo";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Catalogo,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
