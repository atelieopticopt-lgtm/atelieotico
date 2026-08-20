import { c as createComponent, f as renderComponent, d as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_1IIrW8fW.mjs';
import 'piccolore';
import { $ as $$StoreLayout } from '../chunks/StoreLayout_CjQWi9Fh.mjs';
export { renderers } from '../renderers.mjs';

const $$CondicoesGeraisVenda = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "StoreLayout", $$StoreLayout, { "title": "Condi\xE7\xF5es Gerais de Venda | Ateli\xEA \xD3tico" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<article class="content-page"><p>INFORMAÇÃO LEGAL</p><h1>Condições Gerais de Venda</h1><h2>Objeto</h2><p>Estas condições regulam a encomenda, venda, pagamento e entrega de produtos adquiridos no website do Ateliê Ótico por consumidores finais.</p><h2>Encomendas, preços e pagamento</h2><p>Os preços são apresentados em euros, incluem os impostos legalmente aplicáveis e são confirmados antes da conclusão da encomenda.</p><h2>Disponibilidade, garantia e devoluções</h2><p>As encomendas dependem da disponibilidade de stock. Aplicam-se a garantia legal de conformidade e o prazo legal de livre resolução, exceto a artigos personalizados nos casos previstos na lei.</p><h2>Resolução de litígios</h2><p>O consumidor pode recorrer ao Centro de Arbitragem de Conflitos de Consumo da Região Autónoma da Madeira e às restantes entidades legalmente competentes.</p></article>` })}`;
}, "C:/Users/enman/Desktop/Ateli\xEA_Otico/src/pages/condicoes-gerais-venda.astro", void 0);

const $$file = "C:/Users/enman/Desktop/Ateliê_Otico/src/pages/condicoes-gerais-venda.astro";
const $$url = "/condicoes-gerais-venda";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$CondicoesGeraisVenda,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
