// admin.js — Interactive Admin Dashboard Controller for Ateliê Ótico
(() => {
  const CMS_KEY = 'atelie_cms_store_v1';

  // Load saved CMS data from localStorage on start
  function loadSavedCMS() {
    try {
      const raw = localStorage.getItem(CMS_KEY);
      if (!raw) return;
      const cms = JSON.parse(raw);

      if (cms.hero) {
        if (cms.hero.tag && document.getElementById('hero-tag')) document.getElementById('hero-tag').value = cms.hero.tag;
        if (cms.hero.title && document.getElementById('hero-title')) document.getElementById('hero-title').value = cms.hero.title;
        if (cms.hero.desc && document.getElementById('hero-desc')) document.getElementById('hero-desc').value = cms.hero.desc;
        if (cms.hero.image && document.getElementById('hero-img')) document.getElementById('hero-img').value = cms.hero.image;
        if (cms.hero.btnText && document.getElementById('hero-btn-text')) document.getElementById('hero-btn-text').value = cms.hero.btnText;
        if (cms.hero.btnLink && document.getElementById('hero-btn-link')) document.getElementById('hero-btn-link').value = cms.hero.btnLink;
      }
      if (cms.cinematic) {
        if (cms.cinematic.title && document.getElementById('cinematic-title')) document.getElementById('cinematic-title').value = cms.cinematic.title;
        if (cms.cinematic.desc && document.getElementById('cinematic-desc')) document.getElementById('cinematic-desc').value = cms.cinematic.desc;
        if (cms.cinematic.image && document.getElementById('cinematic-img')) document.getElementById('cinematic-img').value = cms.cinematic.image;
      }
      if (cms.prefooter) {
        if (cms.prefooter.title && document.getElementById('prefooter-title')) document.getElementById('prefooter-title').value = cms.prefooter.title;
        if (cms.prefooter.desc && document.getElementById('prefooter-desc')) document.getElementById('prefooter-desc').value = cms.prefooter.desc;
        if (cms.prefooter.image && document.getElementById('prefooter-img')) document.getElementById('prefooter-img').value = cms.prefooter.image;
      }
      if (cms.content) {
        if (cms.content.phone && document.getElementById('content-phone')) document.getElementById('content-phone').value = cms.content.phone;
        if (cms.content.email && document.getElementById('content-email')) document.getElementById('content-email').value = cms.content.email;
        if (cms.content.address && document.getElementById('content-address')) document.getElementById('content-address').value = cms.content.address;
        if (cms.content.hoursMF && document.getElementById('hours-mf')) document.getElementById('hours-mf').value = cms.content.hoursMF;
        if (cms.content.hoursSat && document.getElementById('hours-sat')) document.getElementById('hours-sat').value = cms.content.hoursSat;
      }

      // Apply saved prices to cards
      if (cms.priceOverrides && typeof cms.priceOverrides === 'object') {
        Object.entries(cms.priceOverrides).forEach(([id, price]) => {
          const input = document.querySelector(`.admin-inline-price-input[data-id="${id}"]`);
          if (input) input.value = price;
        });
      }
    } catch (e) {
      console.error('Error loading CMS store', e);
    }
  }

  function autoSaveAll() {
    try {
      const existingRaw = localStorage.getItem(CMS_KEY);
      const existing = existingRaw ? JSON.parse(existingRaw) : {};

      // Gather prices from all rendered cards
      const priceOverrides = existing.priceOverrides || {};
      document.querySelectorAll('.admin-inline-price-input').forEach(input => {
        const id = input.dataset.id;
        const val = Number(input.value);
        if (id && !isNaN(val)) {
          priceOverrides[id] = val;
        }
      });

      const cmsData = {
        ...existing,
        timestamp: new Date().toISOString(),
        hero: {
          tag: document.getElementById('hero-tag')?.value || '',
          title: document.getElementById('hero-title')?.value || '',
          desc: document.getElementById('hero-desc')?.value || '',
          image: document.getElementById('hero-img')?.value || '',
          btnText: document.getElementById('hero-btn-text')?.value || '',
          btnLink: document.getElementById('hero-btn-link')?.value || ''
        },
        cinematic: {
          title: document.getElementById('cinematic-title')?.value || '',
          desc: document.getElementById('cinematic-desc')?.value || '',
          image: document.getElementById('cinematic-img')?.value || ''
        },
        prefooter: {
          title: document.getElementById('prefooter-title')?.value || '',
          desc: document.getElementById('prefooter-desc')?.value || '',
          image: document.getElementById('prefooter-img')?.value || ''
        },
        content: {
          phone: document.getElementById('content-phone')?.value || '',
          email: document.getElementById('content-email')?.value || '',
          address: document.getElementById('content-address')?.value || '',
          hoursMF: document.getElementById('hours-mf')?.value || '',
          hoursSat: document.getElementById('hours-sat')?.value || ''
        },
        priceOverrides: priceOverrides
      };

      localStorage.setItem(CMS_KEY, JSON.stringify(cmsData));
    } catch (e) {
      console.error('Error auto-saving CMS data', e);
    }
  }

  // Live Filtering of Product Cards Grid
  function filterCards() {
    const query = (document.getElementById('admin-product-search')?.value || '').trim().toLowerCase();
    const brand = (document.getElementById('admin-brand-filter')?.value || '').trim().toLowerCase();
    const category = (document.getElementById('admin-category-filter')?.value || '').trim().toLowerCase();

    const cards = document.querySelectorAll('.admin-product-card');
    let visibleCount = 0;

    cards.forEach(card => {
      const cName = card.dataset.name || '';
      const cBrand = card.dataset.brand || '';
      const cCat = card.dataset.category || '';
      const cSku = card.dataset.sku || '';

      const matchQuery = !query || cName.includes(query) || cBrand.includes(query) || cSku.includes(query);
      const matchBrand = !brand || cBrand === brand || cName.includes(brand);
      const matchCat = !category || cCat === category;

      if (matchQuery && matchBrand && matchCat) {
        card.classList.remove('is-hidden');
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.classList.add('is-hidden');
        card.style.display = 'none';
      }
    });

    const countEl = document.getElementById('admin-visible-count');
    if (countEl) countEl.textContent = String(visibleCount);
  }

  // Tab switching
  const tabs = document.querySelectorAll('.nav-item[data-tab]');
  const panels = document.querySelectorAll('.tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(`tab-${target}`)?.classList.add('active');
    });
  });

  // Modal logic
  const modal = document.getElementById('product-modal');
  const modalTitle = document.getElementById('modal-product-title');
  const modalForm = document.getElementById('product-modal-form');

  function openProductModal(cardEl) {
    if (!modal) return;
    modalForm.reset();

    if (cardEl) {
      const id = cardEl.dataset.id;
      const title = cardEl.querySelector('.admin-card-title')?.textContent || '';
      const sku = (cardEl.querySelector('.admin-card-sku')?.textContent || '').replace('SKU:', '').trim();
      const brand = cardEl.querySelector('.admin-card-brand-tag')?.textContent || '';
      const price = cardEl.querySelector('.admin-inline-price-input')?.value || '0';
      const img = cardEl.querySelector('.admin-card-thumb')?.getAttribute('src') || '';

      modalTitle.textContent = `Editar Modelo: ${title}`;
      document.getElementById('modal-product-id').value = id;
      document.getElementById('modal-name').value = title;
      document.getElementById('modal-brand').value = brand;
      document.getElementById('modal-sku').value = sku;
      document.getElementById('modal-price').value = price;
      document.getElementById('modal-image').value = img;
    } else {
      modalTitle.textContent = 'Adicionar Novo Produto ao Catálogo';
      document.getElementById('modal-product-id').value = '';
    }

    modal.style.display = 'flex';
  }

  function closeProductModal() {
    if (modal) modal.style.display = 'none';
  }

  document.getElementById('btn-close-modal')?.addEventListener('click', closeProductModal);
  document.getElementById('btn-cancel-modal')?.addEventListener('click', closeProductModal);

  modalForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const idVal = document.getElementById('modal-product-id').value;
    const name = document.getElementById('modal-name').value.trim();
    const brand = document.getElementById('modal-brand').value.trim();
    const sku = document.getElementById('modal-sku').value.trim();
    const price = Number(document.getElementById('modal-price').value);
    const image = document.getElementById('modal-image').value.trim();

    if (idVal) {
      const card = document.querySelector(`.admin-product-card[data-id="${idVal}"]`);
      if (card) {
        card.dataset.name = name.toLowerCase();
        card.dataset.brand = brand.toLowerCase();
        card.dataset.sku = sku.toLowerCase();
        if (card.querySelector('.admin-card-title')) card.querySelector('.admin-card-title').textContent = name;
        if (card.querySelector('.admin-card-sku')) card.querySelector('.admin-card-sku').textContent = `SKU: ${sku}`;
        if (card.querySelector('.admin-card-brand-tag')) card.querySelector('.admin-card-brand-tag').textContent = brand;
        if (card.querySelector('.admin-card-thumb') && image) card.querySelector('.admin-card-thumb').src = image;
        if (card.querySelector('.admin-inline-price-input')) card.querySelector('.admin-inline-price-input').value = price;
      }
    }

    autoSaveAll();
    closeProductModal();
  });

  // Attach event listeners
  document.getElementById('admin-product-search')?.addEventListener('input', filterCards);
  document.getElementById('admin-brand-filter')?.addEventListener('change', filterCards);
  document.getElementById('admin-category-filter')?.addEventListener('change', filterCards);

  // Auto-save on all text & banner inputs
  document.querySelectorAll('.auto-save-input').forEach(input => {
    input.addEventListener('input', autoSaveAll);
    input.addEventListener('change', autoSaveAll);
  });

  // Auto-save on inline price input change
  document.querySelectorAll('.admin-inline-price-input').forEach(input => {
    input.addEventListener('input', autoSaveAll);
    input.addEventListener('change', autoSaveAll);
  });

  // Edit and Delete buttons on cards
  document.querySelectorAll('.btn-card-edit').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.admin-product-card');
      openProductModal(card);
    });
  });

  document.querySelectorAll('.btn-card-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.admin-product-card');
      const name = card?.querySelector('.admin-card-title')?.textContent || 'este produto';
      if (confirm(`Tem a certeza que deseja ocultar/eliminar "${name}" do catálogo?`)) {
        card.remove();
        autoSaveAll();
        filterCards();
      }
    });
  });

  document.getElementById('btn-add-product')?.addEventListener('click', () => openProductModal(null));

  // JSON Export / Backup
  document.getElementById('btn-export-json')?.addEventListener('click', () => {
    autoSaveAll();
    const data = localStorage.getItem(CMS_KEY) || JSON.stringify({});
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `atelie-otico-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById('btn-reset-defaults')?.addEventListener('click', () => {
    if (confirm('Tem a certeza que deseja repor os dados de origem do catálogo?')) {
      localStorage.removeItem(CMS_KEY);
      location.reload();
    }
  });

  // Init
  loadSavedCMS();
  filterCards();
})();
