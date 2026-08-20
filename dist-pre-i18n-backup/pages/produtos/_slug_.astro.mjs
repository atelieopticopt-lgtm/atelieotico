import { c as createComponent, f as renderComponent, d as renderTemplate, e as createAstro, a as addAttribute, m as maybeRenderHead } from '../../chunks/astro/server_1IIrW8fW.mjs';
import 'piccolore';
import { $ as $$StoreLayout, a as $$Icon } from '../../chunks/StoreLayout_CjQWi9Fh.mjs';
import { $ as $$ProductCard } from '../../chunks/ProductCard_CruyCbUp.mjs';
import { g as getProduct, p as products } from '../../chunks/products_Cityh8Rp.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
function getStaticPaths() {
  const mainPaths = products.map((product) => ({ params: { slug: product.slug } }));
  const legacyPaths = products.slice(0, 14).map((_, i) => ({
    params: { slug: `atelie-${String(i + 1).padStart(2, "0")}` }
  }));
  return [...mainPaths, ...legacyPaths];
}
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const paramSlug = Astro2.params.slug;
  const product = getProduct(paramSlug) || products[0];
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);
  const cart = JSON.stringify({ slug: product.slug, name: product.name, price: product.price, image: product.image });
  const cleanText = (value) => value.replaceAll("Tit?nio", "Tit\xE2nio").replaceAll("Arma??es ?ticas", "Arma\xE7\xF5es \xF3ticas").replaceAll("?culos", "\xD3culos").replaceAll("contempor?neo", "contempor\xE2neo").replaceAll("excel?ncia", "excel\xEAncia").replaceAll("Ateli? ?tico", "Ateli\xEA \xD3tico").replaceAll("Regi?o Aut?noma", "Regi\xE3o Aut\xF3noma");
  const cleanCategory = cleanText(product.category);
  const cleanShape = cleanText(product.shape);
  const cleanMaterial = cleanText(product.material);
  const cleanColor = cleanText(product.color);
  const cleanDescription = `\xD3culos de autor ${product.name} com design contempor\xE2neo e fabrico de excel\xEAncia. Selecionado com rigor pelo Ateli\xEA \xD3tico no Funchal, Regi\xE3o Aut\xF3noma da Madeira.`;
  return renderTemplate`${renderComponent($$result, "StoreLayout", $$StoreLayout, { "title": `${product.name} | Ateli\xEA \xD3tico`, "description": product.description }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([" ", '<article class="product-page">  <div class="product-gallery"> <div class="product-zoom" data-product-zoom> <img', "", '> </div> </div>  <div class="product-info"> <p class="breadcrumbs"> <a href="/catalogo">CAT\xC1LOGO</a> / ', " </p> <h1>", '</h1> <p class="product-type">', " &bull; ", '</p> <p class="product-price">', ' &euro;</p>  <div class="attribute-icons"> <div> ', " <span>FORMA</span> <strong>", "</strong> </div> <div> ", " <span>MATERIAL</span> <strong>", "</strong> </div> <div> ", " <span>COR</span> <strong>", "</strong> </div> <div> ", ' <span>AJUSTE</span> <strong>Personalizado</strong> </div> </div> <button class="add-cart"', ' data-i18n-pt="ADICIONAR AO CARRINHO" data-i18n-en="ADD TO CART">ADICIONAR AO CARRINHO</button> <p class="product-copy">', '</p> <div class="details product-details-popovers"> <details> <summary>DETALHES DO PRODUTO</summary> <p>Arma\xE7\xE3o selecionada pelo Ateli\xEA \xD3tico no Funchal, Madeira. Estojo e pano de microfibra de alta precis\xE3o inclu\xEDdos.</p> </details> <details> <summary>ENVIO E DEVOLU\xC7\xD5ES</summary> <p>Portes gratuitos na Regi\xE3o Aut\xF3noma da Madeira a partir de 100 \u20AC. Devolu\xE7\xE3o simples no prazo de 14 dias.</p> </details> <details> <summary>AJUSTE NO ATELI\xCA</summary> <p>Ajuste facial e aconselhamento \xF3tico personalizado dispon\xEDveis no nosso espa\xE7o na Pra\xE7a do Carmo, Funchal.</p> </details> </div> </div> </article> <section class="related"> <p><a href="/marcas" class="brands-catalog-link" data-i18n-pt="Marcas no nosso cat\xE1logo" data-i18n-en="Brands in our catalogue">Marcas no nosso cat\xE1logo</a></p> <h2>Tamb\xE9m poder\xE1 gostar</h2> <div class="related-grid"> ', " </div> </section> <script>\n    document.querySelectorAll('.product-details-popovers details').forEach((detail) => {\n      detail.addEventListener('toggle', () => {\n        if (!detail.open) return;\n        document.querySelectorAll('.product-details-popovers details[open]').forEach((other) => {\n          if (other !== detail) other.removeAttribute('open');\n        });\n      });\n    });\n  <\/script> "])), maybeRenderHead(), addAttribute(product.image, "src"), addAttribute(`${product.name}, vista principal`, "alt"), product.name.toUpperCase(), product.name, cleanCategory, cleanShape, product.price, renderComponent($$result2, "Icon", $$Icon, { "name": "frame", "size": 20 }), cleanShape, renderComponent($$result2, "Icon", $$Icon, { "name": "layers", "size": 20 }), cleanMaterial, renderComponent($$result2, "Icon", $$Icon, { "name": "color", "size": 20 }), cleanColor, renderComponent($$result2, "Icon", $$Icon, { "name": "fit", "size": 20 }), addAttribute(cart, "data-add-cart"), cleanDescription, related.map((p) => renderTemplate`${renderComponent($$result2, "ProductCard", $$ProductCard, { "product": p })}`)) })}`;
}, "C:/Users/enman/Desktop/Ateli\xEA_Otico/src/pages/produtos/[slug].astro", void 0);

const $$file = "C:/Users/enman/Desktop/Ateliê_Otico/src/pages/produtos/[slug].astro";
const $$url = "/produtos/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
