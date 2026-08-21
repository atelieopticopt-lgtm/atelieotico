// store.js — Client-side cart & wishlist store with reactive badge and drawer state
const KEY = 'atelie-cart-v1', FAV = 'atelie-favs-v1';
const read = (key) => { try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; } };
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const cart = read(KEY);
const money = (n) => `${Number(n || 0).toFixed(0)} €`;

function getDrawerElements() {
  return {
    drawer: document.querySelector('.cart-drawer'),
    overlay: document.querySelector('.drawer-overlay')
  };
}

function openCart() {
  const { drawer, overlay } = getDrawerElements();
  if (drawer) {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
  }
  if (overlay) {
    overlay.classList.add('open');
  }
  document.body.classList.add('cart-open');
}

function closeCart() {
  const { drawer, overlay } = getDrawerElements();
  if (drawer) {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
  }
  if (overlay) {
    overlay.classList.remove('open');
  }
  document.body.classList.remove('cart-open');
}

function renderCart() {
  const isEn = document.documentElement.lang === 'en' || localStorage.getItem('atelie_lang') === 'en';
  const emptyTextPt = 'O seu carrinho de compras está vazio.';
  const emptyTextEn = 'Your shopping cart is empty.';
  const emptyText = isEn ? emptyTextEn : emptyTextPt;

  const count = cart.reduce((n, i) => n + i.qty, 0);
  document.querySelectorAll('[data-cart-count]').forEach(e => {
    e.textContent = String(count);
    e.setAttribute('data-cart-count', String(count));
    if (count === 0) {
      e.style.setProperty('display', 'none', 'important');
    } else {
      e.style.setProperty('display', 'flex', 'important');
    }
  });

  const box = document.querySelector('[data-cart-items]');
  if (box) {
    box.innerHTML = cart.length
      ? cart.map(i => `
        <div class="mini-item">
          <img src="${i.image}" alt="${i.name}">
          <div>
            <strong>${i.name}</strong>
            <p>${money(i.price)} &bull; Qtd. ${i.qty}</p>
          </div>
          <button data-remove="${i.slug}" aria-label="Remover">&times;</button>
        </div>
      `).join('')
      : `<div class="empty-cart-message"><p data-i18n-pt="${emptyTextPt}" data-i18n-en="${emptyTextEn}">${emptyText}</p></div>`;
  }
  const total = cart.reduce((n, i) => n + i.price * i.qty, 0);
  document.querySelectorAll('[data-cart-total]').forEach(e => e.textContent = money(total));
  write(KEY, cart);
}

function initFavs() {
  const list = read(FAV);
  document.querySelectorAll('[data-favorite]').forEach(btn => {
    const slug = btn.dataset.favorite;
    const isFav = list.includes(slug);
    btn.classList.toggle('is-active', isFav);
    btn.classList.toggle('active', isFav);
  });
}

document.addEventListener('click', (e) => {
  const add = e.target.closest('[data-add-cart]');
  if (add) {
    try {
      const item = typeof add.dataset.addCart === 'string' ? JSON.parse(add.dataset.addCart) : add.dataset.addCart;
      if (item && item.slug) {
        const old = cart.find(i => i.slug === item.slug);
        old ? old.qty++ : cart.push({ ...item, qty: 1 });
        renderCart();

        // ALWAYS open the cart drawer menu immediately when adding to cart
        openCart();

        if (!add.dataset.origText) {
          add.dataset.origText = add.textContent.trim();
        }
        const isEn = document.documentElement.lang === 'en' || localStorage.getItem('atelie_lang') === 'en';
        add.textContent = isEn ? '✓ ADDED TO BAG' : '✓ ADICIONADO AO SACO';
        add.style.background = '#22c55e';
        add.style.borderColor = '#22c55e';
        add.style.color = '#ffffff';

        setTimeout(() => {
          add.textContent = add.dataset.origText || (isEn ? 'ADD TO BAG' : 'ADICIONAR AO SACO');
          add.style.background = '';
          add.style.borderColor = '';
          add.style.color = '';
        }, 1400);
      }
    } catch(err) {
      console.error('[Cart Add Error]', err);
    }
  }

  const remove = e.target.closest('[data-remove]');
  if (remove) {
    const i = cart.findIndex(x => x.slug === remove.dataset.remove);
    if (i >= 0) cart.splice(i, 1);
    renderCart();
  }

  const fav = e.target.closest('[data-favorite]');
  if (fav) {
    const list = read(FAV), slug = fav.dataset.favorite, i = list.indexOf(slug);
    i >= 0 ? list.splice(i, 1) : list.push(slug);
    write(FAV, list);
    fav.classList.toggle('is-active', i < 0);
    fav.classList.toggle('active', i < 0);
  }

  const closeBtn = e.target.closest('[data-close-cart], .cart-close, .drawer-overlay');
  if (closeBtn) {
    closeCart();
  }

  const trigger = e.target.closest('.cart-trigger, [data-open-cart]');
  if (trigger) {
    openCart();
  }
});

// Close with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCart();
  }
});

// Global API
window.openCart = openCart;
window.closeCart = closeCart;
window.renderCart = renderCart;
window.addToCart = function(item) {
  if (!item || !item.slug) return;
  const old = cart.find(i => i.slug === item.slug);
  old ? old.qty++ : cart.push({ ...item, qty: 1 });
  renderCart();
  openCart();
};

renderCart();
initFavs();
