
(() => {
  const body = document.body;
  const header = document.querySelector('[data-sticky-header]');
  let lastScroll = scrollY;
  addEventListener('scroll', () => { const y = scrollY; header?.classList.toggle('is-hidden', y > lastScroll && y > 160); lastScroll = y; }, { passive: true });

  const closeDrawers = () => {
    document.querySelectorAll('.drawer').forEach(drawer => { drawer.hidden = true; drawer.classList.remove('is-open'); });
    document.querySelector('.drawer-backdrop')?.setAttribute('hidden', ''); body.classList.remove('has-overlay');
  };
  document.querySelectorAll('[data-open-drawer]').forEach(button => button.addEventListener('click', () => {
    closeDrawers(); const drawer = document.getElementById(button.dataset.openDrawer); if (!drawer) return;
    drawer.hidden = false; document.querySelector('.drawer-backdrop')?.removeAttribute('hidden'); body.classList.add('has-overlay'); requestAnimationFrame(() => drawer.classList.add('is-open'));
  }));
  document.querySelectorAll('[data-close-drawers]').forEach(button => button.addEventListener('click', closeDrawers));
  addEventListener('keydown', event => { if (event.key === 'Escape') closeDrawers(); });

  document.querySelectorAll('.nav-item > button').forEach(button => button.addEventListener('click', () => {
    const menu = document.getElementById(button.getAttribute('aria-controls')); const open = menu?.hidden;
    document.querySelectorAll('.mega-menu').forEach(item => item.hidden = true); document.querySelectorAll('.nav-item > button').forEach(item => item.setAttribute('aria-expanded', 'false'));
    if (menu && open) { menu.hidden = false; button.setAttribute('aria-expanded', 'true'); }
  }));
  const locale = document.querySelector('.locale-button'); locale?.addEventListener('click', () => { const pop = document.getElementById('locale-popover'); if (!pop) return; pop.hidden = !pop.hidden; locale.setAttribute('aria-expanded', String(!pop.hidden)); });
  document.querySelectorAll('[data-mobile-panel]').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('.mobile-panel').forEach(panel => panel.hidden = true); document.getElementById(button.dataset.mobilePanel)?.removeAttribute('hidden'); }));
  document.querySelectorAll('[data-mobile-back]').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('.mobile-panel').forEach(panel => panel.hidden = true); document.getElementById('mobile-main')?.removeAttribute('hidden'); }));

  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const slides = [...carousel.querySelectorAll(':scope .carousel-slide')]; if (slides.length < 2) return; let index = 0; const dots = carousel.querySelector('.carousel-dots');
    const show = next => { slides[index]?.classList.remove('is-active'); index = (next + slides.length) % slides.length; slides[index].classList.add('is-active'); dots?.querySelectorAll('button').forEach((dot, i) => dot.classList.toggle('is-active', i === index)); };
    slides.forEach((_, i) => { if (!dots) return; const dot = document.createElement('button'); dot.setAttribute('aria-label', `Ir para destaque ${i + 1}`); dot.addEventListener('click', () => show(i)); dots.append(dot); }); show(0);
    carousel.querySelector('.carousel-prev')?.addEventListener('click', () => show(index - 1)); carousel.querySelector('.carousel-next')?.addEventListener('click', () => show(index + 1));
    const delay = Number(carousel.dataset.autoplay); if (delay) setInterval(() => show(index + 1), delay);
  });
  document.querySelectorAll('[data-scroll-wrapper]').forEach(wrapper => { const row = wrapper.querySelector('[data-scroll-row]'); wrapper.querySelector('[data-scroll-prev]')?.addEventListener('click', () => row?.scrollBy({ left: -row.clientWidth * .8, behavior: 'smooth' })); wrapper.querySelector('[data-scroll-next]')?.addEventListener('click', () => row?.scrollBy({ left: row.clientWidth * .8, behavior: 'smooth' })); });

  const items = []; const cart = document.querySelector('[data-cart-items]');
  const renderCart = () => {
    document.querySelector('.cart-count').textContent = String(items.reduce((sum, item) => sum + item.quantity, 0));
    if (!items.length) { cart.innerHTML = '<div class="empty-state"><p>O seu carrinho está vazio.</p><a class="button-primary" href="/loja/">Continuar a comprar</a></div>'; return; }
    cart.innerHTML = items.map((item, i) => `<article class="cart-line"><img src="${item.image}" alt="${item.name}"><div><h3>${item.name}</h3><p>${item.price}</p><div class="quantity"><button data-qty="-1" data-index="${i}">−</button><span>${item.quantity}</span><button data-qty="1" data-index="${i}">+</button></div></div><button data-remove="${i}" aria-label="Remover">×</button></article>`).join('');
  };
  document.querySelectorAll('[data-add-product]').forEach(button => button.addEventListener('click', () => { const card = button.closest('.product-card'); const found = items.find(item => item.name === card.dataset.name); found ? found.quantity++ : items.push({ name: card.dataset.name, price: card.dataset.price, image: card.dataset.image, quantity: 1 }); renderCart(); document.querySelector('[data-open-drawer="cart-drawer"]')?.click(); }));
  cart?.addEventListener('click', event => { const button = event.target.closest('button'); if (!button) return; if (button.dataset.qty) { const item = items[Number(button.dataset.index)]; item.quantity = Math.max(1, item.quantity + Number(button.dataset.qty)); } if (button.dataset.remove) items.splice(Number(button.dataset.remove), 1); renderCart(); });

  const comparison = document.querySelector('.comparison');
  const setComparison = value => { const safe = Math.max(0, Math.min(100, value)); comparison?.style.setProperty('--comparison', `${safe}%`); comparison?.setAttribute('aria-valuenow', String(Math.round(safe))); };
  comparison?.addEventListener('pointerdown', event => { comparison.setPointerCapture(event.pointerId); const move = e => setComparison(((e.clientX - comparison.getBoundingClientRect().left) / comparison.clientWidth) * 100); move(event); comparison.addEventListener('pointermove', move); comparison.addEventListener('pointerup', () => comparison.removeEventListener('pointermove', move), { once: true }); });
  comparison?.addEventListener('keydown', event => { if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return; event.preventDefault(); setComparison(Number(comparison.getAttribute('aria-valuenow')) + (event.key === 'ArrowRight' ? 5 : -5)); });

  const footerGroups = [...document.querySelectorAll('.footer-main details')];
  const setFooterMode = () => {
    if (matchMedia('(max-width: 767px)').matches) footerGroups.forEach((group, index) => { group.open = index === 0; });
    else footerGroups.forEach(group => { group.open = true; });
  };
  setFooterMode();
  addEventListener('resize', setFooterMode);
  footerGroups.forEach(group => group.addEventListener('toggle', () => {
    if (!group.open || !matchMedia('(max-width: 767px)').matches) return;
    footerGroups.forEach(other => { if (other !== group) other.open = false; });
  }));
})();

