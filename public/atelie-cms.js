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

      if (cinImg && cms.cinematic.image) cinImg.src = cms.cinematic.image;
      if (cinTitle && cms.cinematic.title) cinTitle.textContent = cms.cinematic.title;
      if (cinDesc && cms.cinematic.desc) cinDesc.textContent = cms.cinematic.desc;
    }

    // 4. Pre-footer Appointment Banner Overrides
    if (cms.prefooter) {
      const pfImg = document.querySelector('.ll-prefooter-img');
      const pfTitle = document.querySelector('.ll-prefooter-title');
      const pfDesc = document.querySelector('.ll-prefooter-desc');

      if (pfImg && cms.prefooter.image) pfImg.src = cms.prefooter.image;
      if (pfTitle && cms.prefooter.title) pfTitle.textContent = cms.prefooter.title;
      if (pfDesc && cms.prefooter.desc) pfDesc.textContent = cms.prefooter.desc;
    }

    // 5. Product Price & Custom Product Overrides
    if (cms.products && Array.isArray(cms.products)) {
      cms.products.forEach(p => {
        // Find existing cards and update price/name if changed
        const card = document.querySelector(`.store-card[data-name*="${p.name.toLowerCase()}"]`) ||
                     document.querySelector(`a[href*="${p.slug}"]`)?.closest('.store-card');
        if (card) {
          if (p.price) {
            const priceEl = card.querySelector('.ll-card-price');
            if (priceEl) priceEl.textContent = `${p.price} €`;
            card.dataset.price = String(p.price);
          }
          if (p.image) {
            const imgMain = card.querySelector('.ll-card-img-main');
            if (imgMain) imgMain.src = p.image;
          }
        }
      });
    }
  });
})();
