import { c as createComponent, f as renderComponent, d as renderTemplate, m as maybeRenderHead, b as renderScript } from '../chunks/astro/server_1IIrW8fW.mjs';
import 'piccolore';
import { $ as $$StoreLayout } from '../chunks/StoreLayout_CjQWi9Fh.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Conta = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "StoreLayout", $$StoreLayout, { "title": "Conta | Ateli\xEA \xD3tico", "data-astro-cid-nodojmyq": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="account-page" data-astro-cid-nodojmyq> <header data-astro-cid-nodojmyq><p data-astro-cid-nodojmyq>CONTA DE CLIENTE</p><h1 data-astro-cid-nodojmyq>Entrar ou criar conta</h1></header> <div class="account-grid" data-astro-cid-nodojmyq> <form data-login data-astro-cid-nodojmyq><h2 data-astro-cid-nodojmyq>Entrar</h2><input type="email" name="email" placeholder="Email" required data-astro-cid-nodojmyq><input type="password" name="password" placeholder="Palavra-passe" required data-astro-cid-nodojmyq><button data-astro-cid-nodojmyq>ENTRAR</button><p data-login-status data-astro-cid-nodojmyq></p></form> <form data-register data-astro-cid-nodojmyq><h2 data-astro-cid-nodojmyq>Criar conta</h2><input type="text" name="name" placeholder="Nome" required data-astro-cid-nodojmyq><input type="email" name="email" placeholder="Email" required data-astro-cid-nodojmyq><input type="password" name="password" placeholder="Palavra-passe (mín. 6 caracteres)" minlength="6" required data-astro-cid-nodojmyq><button data-astro-cid-nodojmyq>CRIAR CONTA</button><p data-register-status data-astro-cid-nodojmyq></p></form> </div> </section> ${renderScript($$result2, "C:/Users/enman/Desktop/Ateli\xEA_Otico/src/pages/conta.astro?astro&type=script&index=0&lang.ts")} ` })} `;
}, "C:/Users/enman/Desktop/Ateli\xEA_Otico/src/pages/conta.astro", void 0);

const $$file = "C:/Users/enman/Desktop/Ateliê_Otico/src/pages/conta.astro";
const $$url = "/conta";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Conta,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
