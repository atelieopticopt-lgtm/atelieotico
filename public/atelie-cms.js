// atelie-cms.js — Dynamic CMS & Overrides Engine for Ateliê Ótico
(() => {
  const CMS_KEY = 'atelie_cms_store_v1';

  function getCMSData() {
    try {
      const raw = localStorage.getItem(CMS_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  const cms = getCMSData();
  if (!cms) return;

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Hero Banner Overrides
    if (cms.hero) {
      const heroTag = document.querySelector('.ll-melin-hero-tag');
      const heroTitle = document.querySelector('.ll-melin-hero-title');
      const heroDesc = document.querySelector('.ll-melin-hero-desc');
      const heroBtn = document.querySelector('.ll-melin-hero-content .ll-melin-btn');
      const heroImg = document.querySelector('.ll-melin-hero-img');

      if (heroTag && cms.hero.tag) heroTag.textContent = cms.hero.tag;
      if (heroTitle && cms.hero.title) heroTitle.textContent = cms.hero.title;
      if (heroDesc && cms.hero.desc) heroDesc.textContent = cms.hero.desc;
      if (heroBtn) {
        if (cms.hero.btnText) heroBtn.textContent = cms.hero.btnText;
        if (cms.hero.btnLink) heroBtn.href = cms.hero.btnLink;
      }
      if (heroImg && cms.hero.image) heroImg.src = cms.hero.image;
    }

    // 2. Announcement Bar & Store Info Overrides
    if (cms.content) {
      if (cms.content.phone) {
        document.querySelectorAll('a[href^="tel:"]').forEach(el => {
          el.href = `tel:${cms.content.phone.replace(/\s+/g, '')}`;
          el.textContent = cms.content.phone;
        });
      }
      if (cms.content.address) {
        document.querySelectorAll('.hours-popover-footer p, .ll-footer-gmb-col p:first-of-type').forEach(el => {
          el.textContent = cms.content.address;
        });
      }
    }

    // 3. Cinematic Banner Overrides
    if (cms.cinematic) {
      const cinImg = document.querySelector('.ll-cinematic-img');
      const cinTitle = document.querySelector('.ll-floating-title');
      const cinDesc = document.querySelector('.ll-floating-desc');

      if (cinImg) {
        if (cms.cinematic.image) cinImg.src = cms.cinematic.image;
        if (cms.cinematic.position !== undefined) cinImg.style.objectPosition = `center ${cms.cinematic.position}%`;
      }
      if (cinTitle) {
        if (cms.cinematic.title) cinTitle.textContent = cms.cinematic.title;
        cinTitle.style.display = cms.cinematic.showTitle !== false ? 'block' : 'none';
      }
      if (cinDesc) {
        if (cms.cinematic.desc) cinDesc.textContent = cms.cinematic.desc;
        cinDesc.style.display = cms.cinematic.showDesc !== false ? 'block' : 'none';
      }
    }

    // 4. Pre-footer Appointment Banner Overrides (Exact Floating Card Elements)
    if (cms.prefooter) {
      const pfImg = document.querySelector('.ll-prefooter-img');
      const pfTag = document.querySelector('.ll-prefooter-tag');
      const pfTitle = document.querySelector('.ll-prefooter-title');
      const pfDesc = document.querySelector('.ll-prefooter-desc');
      const pfLink = document.querySelector('.ll-prefooter-link');

      if (pfImg) {
        if (cms.prefooter.image) pfImg.src = cms.prefooter.image;
        if (cms.prefooter.position !== undefined) pfImg.style.objectPosition = `70% ${cms.prefooter.position}%`;
      }
      if (pfTag) {
        if (cms.prefooter.tag) pfTag.textContent = cms.prefooter.tag;
        pfTag.style.display = cms.prefooter.showTag !== false ? 'block' : 'none';
      }
      if (pfTitle) {
        if (cms.prefooter.title) pfTitle.textContent = cms.prefooter.title;
        pfTitle.style.display = cms.prefooter.showTitle !== false ? 'block' : 'none';
      }
      if (pfDesc) {
        if (cms.prefooter.desc) pfDesc.textContent = cms.prefooter.desc;
        pfDesc.style.display = cms.prefooter.showDesc !== false ? 'block' : 'none';
      }
      if (pfLink) {
        if (cms.prefooter.linkText) pfLink.innerHTML = `${cms.prefooter.linkText.replace(/→|&rarr;/g, '').trim()} &rarr;`;
        if (cms.prefooter.linkUrl) pfLink.href = cms.prefooter.linkUrl;
        pfLink.style.display = cms.prefooter.showLink !== false ? 'inline-flex' : 'none';
      }
    }

    // 5. Product Price, Stock & Availability Overrides
    if (cms.priceOverrides && typeof cms.priceOverrides === 'object') {
      Object.entries(cms.priceOverrides).forEach(([id, price]) => {
        const cards = document.querySelectorAll(`.store-card[data-id="${id}"], .store-card[data-name*="${id.toLowerCase()}"], a[href*="${id}"]`);
        cards.forEach(c => {
          const card = c.closest('.store-card') || c;
          const priceEl = card.querySelector('.ll-card-price, .product-price');
          if (priceEl) priceEl.textContent = `${price} €`;
        });
      });
    }

    if (cms.stockOverrides || cms.availOverrides) {
      const stocks = cms.stockOverrides || {};
      const avails = cms.availOverrides || {};

      document.querySelectorAll('.store-card, .product-detail-container, .product-hero').forEach(el => {
        const id = el.dataset.id || el.getAttribute('data-product-id') || el.dataset.sku;
        if (!id) return;

        const isAvail = avails[id] !== undefined ? avails[id] : true;
        const stockQty = stocks[id] !== undefined ? Number(stocks[id]) : 10;

        if (!isAvail || stockQty <= 0) {
          el.classList.add('is-out-of-stock');
          
          if (el.classList.contains('store-card') && !el.querySelector('.badge-stock-out')) {
            const badge = document.createElement('span');
            badge.className = 'badge-stock-out';
            badge.style.cssText = 'position: absolute; top: 12px; left: 12px; background: rgba(0,0,0,0.85); color: #fff; font-size: 10px; font-weight: 800; padding: 4px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 1px; z-index: 5;';
            badge.textContent = !isAvail ? 'INDISPONÍVEL' : 'ESGOTADO';
            (el.querySelector('.ll-card-img-wrap, .image-wrap, a') || el).appendChild(badge);
          }

          const buyBtn = el.querySelector('#btn-add-to-cart, .btn-add-to-bag, .btn-buy-now');
          if (buyBtn) {
            buyBtn.disabled = true;
            buyBtn.style.opacity = '0.5';
            buyBtn.style.cursor = 'not-allowed';
            buyBtn.textContent = !isAvail ? 'PRODUTO INDISPONÍVEL' : 'TEMPORARIAMENTE ESGOTADO';
          }
        }
      });
    }
  });
})();
