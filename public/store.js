const KEY = 'atelie-cart-v1', FAV = 'atelie-favs-v1';
const read = (key) => { try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; } };
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const cart = read(KEY);
const money = (n) => `${Number(n || 0).toFixed(0)} €`;

function renderCart() {
  document.querySelectorAll('[data-cart-count]').forEach(e => e.textContent = String(cart.reduce((n, i) => n + i.qty, 0)));
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
      : '<p>O seu saco está vazio.</p>';
  }
  const total = cart.reduce((n, i) => n + i.price * i.qty, 0);
  document.querySelectorAll('[data-cart-total]').forEach(e => e.textContent = money(total));
  write(KEY, cart);
}

document.addEventListener('click', (e) => {
  const add = e.target.closest('[data-add-cart]');
  if (add) {
    const item = JSON.parse(add.dataset.addCart);
    const old = cart.find(i => i.slug === item.slug);
    old ? old.qty++ : cart.push({ ...item, qty: 1 });
    renderCart();
    openCart();
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
    fav.classList.toggle('active', i < 0);
  }
});

const drawer = document.querySelector('.cart-drawer');
const overlay = document.querySelector('.drawer-overlay');

function openCart() {
  drawer?.classList.add('open');
  overlay?.classList.add('open');
  drawer?.setAttribute('aria-hidden', 'false');
}

function closeCart() {
  drawer?.classList.remove('open');
  overlay?.classList.remove('open');
  drawer?.setAttribute('aria-hidden', 'true');
}

document.querySelector('.cart-trigger')?.addEventListener('click', openCart);
document.querySelector('.cart-close')?.addEventListener('click', closeCart);
overlay?.addEventListener('click', closeCart);

document.querySelector('.mobile-menu')?.addEventListener('click', (e) => {
  const open = e.currentTarget.getAttribute('aria-expanded') === 'true';
  e.currentTarget.setAttribute('aria-expanded', String(!open));
  document.querySelector('#main-nav')?.classList.toggle('open', !open);
});

document.querySelectorAll('[data-favorite]').forEach(b => b.classList.toggle('active', read(FAV).includes(b.dataset.favorite)));
renderCart();

// Dynamic Pointer-Tracking Zoom
function initZoom() {
  document.querySelectorAll('[data-product-zoom]').forEach((box) => {
    const img = box.querySelector('img');
    if (!img) return;

    const onMove = (e) => {
      const rect = box.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
      img.style.transformOrigin = `${x}% ${y}%`;
    };

    box.addEventListener('mousemove', onMove);
    box.addEventListener('touchmove', onMove, { passive: true });
    box.addEventListener('mouseleave', () => {
      img.style.transformOrigin = 'center center';
    });
  });
}

// Navbar Scroll Effect
function initNavbarScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const checkScroll = () => {
    if (window.scrollY > 8) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', checkScroll, { passive: true });
  checkScroll();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initZoom();
    initNavbarScroll();
  });
} else {
  initZoom();
  initNavbarScroll();
}
