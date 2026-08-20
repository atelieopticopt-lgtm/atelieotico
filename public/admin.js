// admin.js — Interactive Admin Dashboard Controller for Ateliê Ótico
(() => {
  const CMS_KEY = 'atelie_cms_store_v1';

  // State
  let products = [];
  let currentPage = 1;
  const pageSize = 20;

  function loadData() {
    const raw = localStorage.getItem(CMS_KEY);
    let cms = null;
    try {
      cms = raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error('Error reading CMS store', e);
    }

    if (cms && cms.products && Array.isArray(cms.products) && cms.products.length > 0) {
      products = cms.products;
    } else if (window.INITIAL_PRODUCTS && Array.isArray(window.INITIAL_PRODUCTS)) {
      products = JSON.parse(JSON.stringify(window.INITIAL_PRODUCTS));
    }

    // Populate Banners & Texts if saved
    if (cms) {
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
      tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 36px; color: #888;">Nenhum produto encontrado com os filtros selecionados.</td></tr>`;
    } else {
      pageProducts.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>
            <img src="${p.image}" alt="${p.name}" class="table-thumb" loading="lazy" onerror="this.src='/SVG-Logo-Atelie.svg'" />
          </td>
          <td>
            <strong style="color: #000; font-size: 13.5px;">${p.name}</strong>
            <div style="font-size: 11px; color: #777; margin-top: 2px;">SKU: ${p.sku || p.slug}</div>
          </td>
          <td><span style="font-weight: 700; color: #111;">${p.brand || 'Ateliê Ótico'}</span></td>
          <td><span style="font-size: 12.5px; color: #444;">${p.category || 'Armações óticas'}</span></td>
          <td><span style="font-size: 12px; color: #666;">${p.shape || 'Redonda'} &bull; ${p.material || 'Acetato'}</span></td>
          <td>
            <div style="display: flex; align-items: center; gap: 4px;">
              <input type="number" class="price-inline-input" value="${p.price}" min="0" data-id="${p.id}" />
              <span style="font-size: 12px; font-weight: 700;">€</span>
            </div>
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
      pageInfo.textContent = `A mostrar ${total === 0 ? 0 : startIdx + 1}–${endIdx} de ${total} produtos (${products.length} total)`;
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
  const modalTitle = document.getElementById('modal-product-title');
  const modalForm = document.getElementById('product-modal-form');

  function openProductModal(productId) {
    if (!modal) return;
    modalForm.reset();

    if (productId !== null) {
      const p = products.find(x => x.id === productId);
      if (!p) return;
      modalTitle.textContent = `Editar Modelo: ${p.name}`;
      document.getElementById('modal-product-id').value = p.id;
      document.getElementById('modal-name').value = p.name || '';
      document.getElementById('modal-brand').value = p.brand || '';
      document.getElementById('modal-sku').value = p.sku || '';
      document.getElementById('modal-price').value = p.price || 0;
      document.getElementById('modal-category').value = p.category || 'Armações óticas';
      document.getElementById('modal-shape').value = p.shape || 'Redonda';
      document.getElementById('modal-material').value = p.material || 'Acetato';
      document.getElementById('modal-color').value = p.color || '';
      document.getElementById('modal-image').value = p.image || '';
      document.getElementById('modal-hover').value = p.hover || '';
      document.getElementById('modal-desc').value = p.description || '';
    } else {
      modalTitle.textContent = 'Adicionar Novo Produto';
      document.getElementById('modal-product-id').value = '';
      document.getElementById('modal-category').value = 'Armações óticas';
      document.getElementById('modal-shape').value = 'Redonda';
      document.getElementById('modal-material').value = 'Acetato';
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
    const category = document.getElementById('modal-category').value;
    const shape = document.getElementById('modal-shape').value;
    const material = document.getElementById('modal-material').value;
    const color = document.getElementById('modal-color').value.trim();
    const image = document.getElementById('modal-image').value.trim();
    const hover = document.getElementById('modal-hover').value.trim();
    const description = document.getElementById('modal-desc').value.trim();

    if (idVal) {
      // Edit existing
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
        prod.hover = hover || image;
        prod.description = description;
      }
    } else {
      // Create new
      const newId = Date.now();
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + sku.toLowerCase();
      const newProd = {
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
        hover: hover || image,
        description: description
      };
      products.unshift(newProd);
    }

    saveAllToCMS(false);
    populateBrandOptions();
    renderTable();
    closeProductModal();
    alert('Produto guardado com sucesso!');
  });

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
  function initAdmin() {
    loadData();
    populateBrandOptions();
    renderTable();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdmin);
  } else {
    initAdmin();
  }
})();
