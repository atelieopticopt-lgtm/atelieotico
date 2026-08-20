import { c as createComponent, e as createAstro } from '../../chunks/astro/server_1IIrW8fW.mjs';
import 'piccolore';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$NewArrivals = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$NewArrivals;
  return Astro2.redirect("/#cat\xE1logo");
}, "C:/Users/enman/Desktop/Ateli\xEA_Otico/src/pages/collections/new-arrivals.astro", void 0);

const $$file = "C:/Users/enman/Desktop/Ateliê_Otico/src/pages/collections/new-arrivals.astro";
const $$url = "/collections/new-arrivals";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$NewArrivals,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
