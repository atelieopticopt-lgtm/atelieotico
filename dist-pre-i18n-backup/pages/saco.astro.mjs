import { c as createComponent, f as renderComponent, d as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_1IIrW8fW.mjs';
import 'piccolore';
import { $ as $$StoreLayout } from '../chunks/StoreLayout_CjQWi9Fh.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Saco = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "StoreLayout", $$StoreLayout, { "title": "O seu saco | Ateli\xEA \xD3tico" }, { "default": ($$result2) => renderTemplate(_a || (_a = __template(["", '<div class="content-page"><p>COMPRAS</p><h1>O seu saco</h1><div data-full-cart></div><div class="full-cart-total"><span>Total</span><strong data-cart-total>0 \u20AC</strong></div><button class="rect black" data-checkout>FINALIZAR ENCOMENDA</button><p data-checkout-status></p></div><script src="/cart-page.js"><\/script>'])), maybeRenderHead()) })}`;
}, "C:/Users/enman/Desktop/Ateli\xEA_Otico/src/pages/saco.astro", void 0);

const $$file = "C:/Users/enman/Desktop/Ateliê_Otico/src/pages/saco.astro";
const $$url = "/saco";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Saco,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
