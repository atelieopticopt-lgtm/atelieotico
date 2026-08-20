import { c as createComponent, m as maybeRenderHead, a as addAttribute, f as renderComponent, d as renderTemplate, e as createAstro } from './astro/server_1IIrW8fW.mjs';
import 'piccolore';
import { a as $$Icon } from './StoreLayout_CjQWi9Fh.mjs';

const $$Astro = createAstro();
const $$ProductCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProductCard;
  const { product } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article class="store-card ll-product-card"${addAttribute(product.category, "data-category")}${addAttribute(product.shape, "data-shape")}${addAttribute(product.material, "data-material")}${addAttribute(product.color, "data-color")}${addAttribute(product.price, "data-price")}${addAttribute(product.name.toLowerCase(), "data-name")}> <a${addAttribute(`/produtos/${product.slug}`, "href")} class="ll-card-image-box"> <img class="ll-card-img-main"${addAttribute(product.image, "src")}${addAttribute(`${product.name}, vista principal`, "alt")} loading="lazy"> <img class="ll-card-img-hover"${addAttribute(product.hover, "src")}${addAttribute(`${product.name}, vista alternativa`, "alt")} loading="lazy"> </a> <div class="ll-card-meta"> <div class="ll-card-title-row"> <h3 class="ll-card-title"><a${addAttribute(`/produtos/${product.slug}`, "href")}>${product.name}</a></h3> <strong class="ll-card-price">${product.price} &euro;</strong> </div> <p class="ll-card-sub">${product.category} &bull; ${product.shape}</p> </div> <button class="favorite ll-card-fav" type="button"${addAttribute(product.slug, "data-favorite")}${addAttribute(`Guardar ${product.name} nos favoritos`, "aria-label")}> ${renderComponent($$result, "Icon", $$Icon, { "name": "heart", "size": 18 })} </button> </article>`;
}, "C:/Users/enman/Desktop/Ateli\xEA_Otico/src/components/ProductCard.astro", void 0);

export { $$ProductCard as $ };
