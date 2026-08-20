(() => {
  const isEn = document.documentElement.lang === 'en' || localStorage.getItem('atelie_lang') === 'en';
  const emptyTextPt = 'O seu carrinho de compras está vazio.';
  const emptyTextEn = 'Your shopping cart is empty.';
  const explorePt = 'Explorar catálogo';
  const exploreEn = 'Explore catalog';

  const items = JSON.parse(localStorage.getItem('atelie-cart-v1') || '[]');
  const box = document.querySelector('[data-full-cart]');
  if (box) {
    box.innerHTML = items.length
      ? items.map(i => `
        <article class="full-cart-item" style="display: flex; gap: 24px; align-items: center; padding: 20px 0; border-bottom: 1px solid rgba(0,0,0,0.08);">
          <img src="${i.image}" alt="${i.name}" style="width: 100px; height: 100px; object-fit: contain; mix-blend-mode: multiply;">
          <div style="flex: 1;">
            <h2 style="font-size: 16px; font-weight: 700; margin: 0 0 6px;">${i.name}</h2>
            <p style="font-size: 13px; color: #666; margin: 0;">Quantidade: ${i.qty}</p>
          </div>
          <strong style="font-size: 16px; font-weight: 700;">${i.price * i.qty} €</strong>
        </article>
      `).join('')
      : `<p style="font-size: 15px; color: #666; margin: 32px 0;"><span data-i18n-pt="${emptyTextPt}" data-i18n-en="${emptyTextEn}">${isEn ? emptyTextEn : emptyTextPt}</span> <a href="/catalogo" style="color: #000; font-weight: 700; text-decoration: underline; margin-left: 8px;" data-i18n-pt="${explorePt}" data-i18n-en="${exploreEn}">${isEn ? exploreEn : explorePt}</a></p>`;
  }

  document.querySelector('[data-checkout]')?.addEventListener('click', () => {
    const status = document.querySelector('[data-checkout-status]');
    if (status) {
      status.textContent = items.length
        ? (isEn ? 'Demo checkout ready for payment gateway integration.' : 'Checkout demonstrativo pronto para ligação a fornecedor de pagamentos.')
        : (isEn ? 'Please add a product to the cart first.' : 'Adicione primeiro um produto ao carrinho.');
    }
  });
})();
