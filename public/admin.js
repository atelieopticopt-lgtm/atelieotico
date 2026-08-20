// admin.js — Interactive Admin Dashboard Controller for Ateliê Ótico
(() => {
  const CMS_KEY = 'atelie_cms_store_v1';

  // State
  let products = [];
  let currentPage = 1;
  const pageSize = 20;

  // Load CMS data from localStorage or initial injection
  function loadData() {
    const raw = localStorage.getItem(CMS_KEY);
    let cms = null;
    try {
      cms = raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error('Error reading CMS store', e);
    }

    if (cms && cms.products && Array.isArray(cms.products)) {
      products = cms.products;
    } else if (window.INITIAL_PRODUCTS && Array.isArray(window.INITIAL_PRODUCTS)) {
      products = JSON.parse(JSON.stringify(window.INITIAL_PRODUCTS));
    }

    // Populate Banners & Texts if saved
    if (cms) {
      if (cms.hero) {
        if (cms.hero.tag) document.getElementById('hero-tag').value = cms.hero.tag;
        if (cms.hero.title) document.getElementById('hero-title').value = cms.hero.title;
        if (cms.hero.desc) document.getElementById('hero-desc').value = cms.hero.desc;
        if (cms.hero.image) document.getElementById('hero-img').value = cms.hero.image;
        if (cms.hero.btnText) document.getElementById('hero-btn-text').value = cms.hero.btnText;
        if (cms.hero.btnLink) document.getElementById('hero-btn-link').value = cms.hero.btnLink;
      }
      if (cms.cinematic) {
        if (cms.cinematic.title) document.getElementById('cinematic-title').value = cms.cinematic.title;
        if (cms.cinematic.desc) document.getElementById('cinematic-desc').value = cms.cinematic.desc;
        if (cms.cinematic.image) document.getElementById('cinematic-img').value = cms.cinematic.image;
      }
      if (cms.prefooter) {
        if (cms.prefooter.title) document.getElementById('prefooter-title').value = cms.prefooter.title;
        if (cms.prefooter.desc) document.getElementById('prefooter-desc').value = cms.prefooter.desc;
        if (cms.prefooter.image) document.getElementById('prefooter-img').value = cms.prefooter.image;
      }
      if (cms.content) {
        if (cms.content.phone) document.getElementById('content-phone').value = cms.content.phone;
        if (cms.content.email) document.getElementById('content-email').value = cms.content.email;
        if (cms.content.address) document.getElementById('content-address').value = cms.content.address;
        if (cms.content.hoursMF) document.getElementById('hours-mf').value = cms.content.hoursMF;
        if (cms.content.hoursSat) document.getElementById('hours-sat').value = cms.content.hoursSat;
      }
    }
  }

  function saveAllToCMS(notify = true) {
    const cmsData = {
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
      products: products
    };

    localStorage.setItem(CMS_KEY, JSON.stringify(cmsData));

    if (notify) {
      alert('✅ Alterações guardadas com sucesso! As atualizações estão ativas na loja.');
    }
  }

  // Brand dropdown options
  function populateBrandOptions() {
    const brandFilter = document.getElementById('admin-brand-filter');
    if (!brandFilter) return;

    const brands = [...new Set(products.map(p => p.brand || p.name.split(' ')[0]))].sort();
    brandFilter.innerHTML = '<option value="">Todas as Marcas</option>';
    brands.forEach(b => {
      const opt = document.createElement('option');
      opt.value = b;
      opt.textContent = b;
      brandFilter.appendChild(opt);
    });
  }

  // Filter and Paginate Products
  function getFilteredProducts() {
    const query = (document.getElementById('admin-product-search')?.value || '').trim().toLowerCase();
    const brand = document.getElementById('admin-brand-filter')?.value || '';
    const category = document.getElementById('admin-category-filter')?.value || '';

    return products.filter(p => {
      const pName = (p.name || '').toLowerCase();
      const pBrand = (p.brand || '').toLowerCase();
      const pSku = (p.sku || '').toLowerCase();
      const pCat = (p.category || '');

      const matchQuery = !query || pName.includes(query) || pBrand.includes(query) || pSku.includes(query);
      const matchBrand = !brand || pBrand === brand.toLowerCase() || pName.includes(brand.toLowerCase());
      const matchCat = !category || pCat === category;

      return matchQuery && matchBrand && matchCat;
    });
  }

  function renderTable() {
    const tbody = document.getElementById('admin-products-tbody');
    const pageInfo = document.getElementById('admin-page-info');
    const pageNumEl = document.getElementById('current-page-num');
    const countBadge = document.getElementById('nav-product-count');

    if (!tbody) return;

    const filtered = getFilteredProducts();
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIdx = (currentPage - 1) * pageSize;
    const endIdx = Math.min(startIdx + pageSize, total);
    const pageProducts = filtered.slice(startIdx, endIdx);

    tbody.innerHTML = '';

    if (countBadge) countBadge.textContent = String(products.length);

    if (pageProducts.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 32px; color: #888;">Nenhum produto encontrado.</td></tr>`;
    } else {
      pageProducts.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>
            <img src="${p.image}" alt="${p.name}" class="table-thumb" loading="lazy" onerror="this.src='/SVG-Logo-Atelie.svg'" />
          </td>
          <td>
            <strong>${p.name}</strong>
            <div style="font-size: 11px; color: #888;">SKU: ${p.sku || p.slug}</div>
          </td>
          <td><span style="font-weight: 600;">${p.brand || 'Ateliê Ótico'}</span></td>
          <td>${p.category || 'Armações'}</td>
          <td>${p.shape || 'Redonda'} &bull; ${p.material || 'Acetato'}</td>
          <td>
            <input type="number" class="price-inline-input" value="${p.price}" min="0" data-id="${p.id}" />
          </td>
          <td style="text-align: right;">
            <button type="button" class="table-action-btn edit" data-edit-id="${p.id}">Editar</button>
            <button type="button" class="table-action-btn delete" data-del-id="${p.id}">Eliminar</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }

    if (pageInfo) {
      pageInfo.textContent = `A mostrar ${total === 0 ? 0 : startIdx + 1}–${endIdx} de ${total} produtos`;
    }
    if (pageNumEl) pageNumEl.textContent = String(currentPage);

    // Attach inline price change listener
    tbody.querySelectorAll('.price-inline-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const id = Number(e.target.dataset.id);
        const newPrice = Number(e.target.value);
        const prod = products.find(p => p.id === id);
        if (prod) {
          prod.price = newPrice;
          saveAllToCMS(false);
        }
      });
    });

    // Attach Edit button listeners
    tbody.querySelectorAll('[data-edit-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number(btn.dataset.editId);
        openProductModal(id);
      });
    });

    // Attach Delete button listeners
    tbody.querySelectorAll('[data-del-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number(btn.dataset.delId);
        const prod = products.find(p => p.id === id);
        if (prod && confirm(`Tem a certeza que deseja eliminar o modelo "${prod.name}"?`)) {
          products = products.filter(p => p.id !== id);
          saveAllToCMS(false);
          renderTable();
        }
      });
    });
  }

  // Modal logic
  const modal = document.getElementById('product-modal');
  const form = document.getElementById('product-form');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnCancelModal = document.getElementById('btn-cancel-modal');

  function openProductModal(id = null) {
    if (!modal) return;
    const isEdit = id !== null;
    document.getElementById('modal-product-title').textContent = isEdit ? 'Editar Produto' : 'Adicionar Novo Produto';

    if (isEdit) {
      const p = products.find(prod => prod.id === id);
      if (!p) return;
      document.getElementById('modal-product-id').value = String(p.id);
      document.getElementById('modal-product-slug').value = p.slug || '';
      document.getElementById('modal-name').value = p.name || '';
      document.getElementById('modal-brand').value = p.brand || '';
      document.getElementById('modal-sku').value = p.sku || '';
      document.getElementById('modal-price').value = String(p.price || 0);
      document.getElementById('modal-category').value = p.category || 'Armações óticas';
      document.getElementById('modal-shape').value = p.shape || 'Redonda';
      document.getElementById('modal-material').value = p.material || 'Acetato';
      document.getElementById('modal-color').value = p.color || '';
      document.getElementById('modal-image').value = p.image || '';
      document.getElementById('modal-hover').value = p.hover || '';
      document.getElementById('modal-desc').value = p.description || '';
    } else {
      form.reset();
      document.getElementById('modal-product-id').value = '';
      document.getElementById('modal-product-slug').value = '';
      document.getElementById('modal-price').value = '220';
    }

    modal.classList.add('open');
  }

  function closeModal() {
    modal?.classList.remove('open');
  }

  btnCloseModal?.addEventListener('click', closeModal);
  btnCancelModal?.addEventListener('click', closeModal);

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const idVal = document.getElementById('modal-product-id').value;
    const isEdit = Boolean(idVal);

    const name = document.getElementById('modal-name').value;
    const brand = document.getElementById('modal-brand').value;
    const sku = document.getElementById('modal-sku').value || `SKU-${Date.now()}`;
    const price = Number(document.getElementById('modal-price').value);
    const category = document.getElementById('modal-category').value;
    const shape = document.getElementById('modal-shape').value;
    const material = document.getElementById('modal-material').value;
    const color = document.getElementById('modal-color').value;
    const image = document.getElementById('modal-image').value;
    const hover = document.getElementById('modal-hover').value || image;
    const description = document.getElementById('modal-desc').value;

    if (isEdit) {
      const id = Number(idVal);
      const prod = products.find(p => p.id === id);
      if (prod) {
        prod.name = name;
        prod.brand = brand;
        prod.sku = sku;
        prod.price = price;
        prod.category = category;
        prod.shape = shape;
        prod.material = material;
        prod.color = color;
        prod.image = image;
        prod.hover = hover;
        prod.description = description;
      }
    } else {
      const newId = Date.now();
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      products.unshift({
        id: newId,
        slug: slug,
        sku: sku,
        name: name,
        brand: brand,
        price: price,
        category: category,
        shape: shape,
        material: material,
        color: color,
        image: image,
        hover: hover,
        description: description
      });
    }

    saveAllToCMS(false);
    closeModal();
    populateBrandOptions();
    renderTable();
    alert('✅ Produto guardado com sucesso!');
  });

  // Navigation Tabs
  const tabBtns = document.querySelectorAll('.nav-item[data-tab]');
  const tabPanels = document.querySelectorAll('.tab-panel');
  const panelTitle = document.getElementById('panel-title');
  const panelSubtitle = document.getElementById('panel-subtitle');

  const tabDescriptions = {
    products: { title: 'Gestão de Produtos & Catálogo', sub: 'Edite preços, adicione novos modelos de autor e faça a gestão em tempo real.' },
    banners: { title: 'Banners & Campanhas', sub: 'Personalize o Hero Banner, campanhas e imagens de destaque da homepage.' },
    texts: { title: 'Textos & Conteúdos da Loja', sub: 'Configure horários de funcionamento, morada e contactos telefónicos.' },
    backup: { title: 'Backup & Sincronização', sub: 'Exporte o ficheiro JSON de configuração completa ou restaure cópias de segurança.' }
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(`tab-${tabId}`)?.classList.add('active');

      if (tabDescriptions[tabId]) {
        if (panelTitle) panelTitle.textContent = tabDescriptions[tabId].title;
        if (panelSubtitle) panelSubtitle.textContent = tabDescriptions[tabId].sub;
      }
    });
  });

  // Event Listeners for Filters & Search
  document.getElementById('admin-product-search')?.addEventListener('input', () => {
    currentPage = 1;
    renderTable();
  });
  document.getElementById('admin-brand-filter')?.addEventListener('change', () => {
    currentPage = 1;
    renderTable();
  });
  document.getElementById('admin-category-filter')?.addEventListener('change', () => {
    currentPage = 1;
    renderTable();
  });

  document.getElementById('btn-prev-page')?.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderTable();
    }
  });

  document.getElementById('btn-next-page')?.addEventListener('click', () => {
    const filtered = getFilteredProducts();
    const totalPages = Math.ceil(filtered.length / pageSize);
    if (currentPage < totalPages) {
      currentPage++;
      renderTable();
    }
  });

  document.getElementById('btn-add-product')?.addEventListener('click', () => openProductModal(null));
  document.getElementById('btn-save-all-cms')?.addEventListener('click', () => saveAllToCMS(true));

  // JSON Export / Backup
  document.getElementById('btn-export-json')?.addEventListener('click', () => {
    saveAllToCMS(false);
    const data = localStorage.getItem(CMS_KEY) || JSON.stringify({ products });
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
      loadData();
      populateBrandOptions();
      renderTable();
      alert('Valores repostos com sucesso.');
    }
  });

  // Init
  loadData();
  populateBrandOptions();
  renderTable();
})();
