import { c as createComponent, f as renderComponent, d as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_1IIrW8fW.mjs';
import 'piccolore';
import { $ as $$StoreLayout } from '../chunks/StoreLayout_CjQWi9Fh.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Contactos = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "StoreLayout", $$StoreLayout, { "title": "Contactos | Ateli\xEA \xD3tico \u2014 Madeira" }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([" ", `<div class="content-page contact-grid"> <div> <p>CONTACTOS</p> <h1>Vamos conversar.</h1> <p>Marque uma visita para experimentar a cole\xE7\xE3o e receber aconselhamento \xF3tico personalizado.</p> <h2>Atendimento</h2> <p>Regi\xE3o Aut\xF3noma da Madeira<br>De segunda a s\xE1bado<br>Por marca\xE7\xE3o personalizada</p> </div> <form class="contact-form"> <label>Nome<input required name="nome"></label> <label>E-mail<input required type="email" name="email"></label> <label>Telefone<input type="tel" name="telefone"></label> <label>Mensagem<textarea required name="mensagem"></textarea></label> <button class="rect black" type="submit">ENVIAR PEDIDO</button> <p data-form-status></p> </form> </div> <script>
    document.querySelector('.contact-form')?.addEventListener('submit', e => {
      e.preventDefault();
      e.currentTarget.reset();
      document.querySelector('[data-form-status]').textContent = 'Obrigado. Recebemos o seu pedido e entraremos em contacto brevemente.';
    });
  <\/script> `])), maybeRenderHead()) })}`;
}, "C:/Users/enman/Desktop/Ateli\xEA_Otico/src/pages/contactos.astro", void 0);

const $$file = "C:/Users/enman/Desktop/Ateliê_Otico/src/pages/contactos.astro";
const $$url = "/contactos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contactos,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
