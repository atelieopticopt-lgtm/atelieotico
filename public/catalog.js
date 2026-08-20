// catalog.js — Luxury Multi-Faceted Catalog Controller for Ateliê Ótico
(() => {
  const grid = document.querySelector('[data-product-grid]');
  const cards = Array.from(document.querySelectorAll('.store-card'));
  const countBadge = document.getElementById('catalog-result-count');
  const emptyState = document.getElementById('catalog-empty-state');
  const searchInput = document.getElementById('catalog-search-input');
  const searchClear = document.getElementById('catalog-search-clear');
  const sortSelect = document.getElementById('catalog-sort-select');
  const activeChipsBar = document.getElementById('catalog-active-chips');
  const chipsContainer = document.getElementById('chips-container');
  const btnClearAll = document.getElementById('btn-clear-all');
  const btnSidebarReset = document.getElementById('btn-sidebar-reset');
  const btnEmptyReset = document.getElementById('btn-empty-reset');
  const priceMinInput = document.getElementById('price-min');
  const priceMaxInput = document.getElementById('price-max');
  const priceTagBtns = document.querySelectorAll('.price-tag-btn');
  const filterCheckboxes = document.querySelectorAll('input[data-filter]');

  // Mobile Drawer
  const mobileToggleBtn = document.getElementById('btn-toggle-filters-mobile');
  const mobileCloseBtn = document.getElementById('btn-close-filters-mobile');
  const sidebar = document.getElementById('catalog-sidebar');

  if (mobileToggleBtn && sidebar) {
    mobileToggleBtn.addEventListener('click', () => sidebar.classList.add('open'));
  }
  if (mobileCloseBtn && sidebar) {
    mobileCloseBtn.addEventListener('click', () => sidebar.classList.remove('open'));
  }

  // Load URL params on initial load
  const urlParams = new URLSearchParams(window.location.search);

  const urlBrand = urlParams.get('marca') || urlParams.get('brand');
  const urlCategory = urlParams.get('categoria') || urlParams.get('category');
  const urlShape = urlParams.get('forma') || urlParams.get('shape');
  const urlSearch = urlParams.get('q');

  if (urlSearch && searchInput) {
    searchInput.value = urlSearch;
  }

  filterCheckboxes.forEach(cb => {
    const filterType = cb.dataset.filter;
    const val = cb.value;
    if (filterType === 'brand' && urlBrand && (urlBrand.toLowerCase() === val.toLowerCase() || urlParams.getAll('brand').includes(val) || urlParams.getAll('marca').includes(val))) {
      cb.checked = true;
    }
    if (filterType === 'category' && urlCategory && (urlCategory.toLowerCase() === val.toLowerCase() || urlParams.getAll('category').includes(val) || urlParams.getAll('categoria').includes(val))) {
      cb.checked = true;
    }
    if (filterType === 'shape' && urlShape && (urlShape.toLowerCase() === val.toLowerCase() || urlParams.getAll('shape').includes(val))) {
      cb.checked = true;
    }
  });

  function getActiveFilters() {
    const filters = {
      brand: [],
      category: [],
      shape: [],
      material: [],
      minPrice: priceMinInput && priceMinInput.value ? Number(priceMinInput.value) : null,
      maxPrice: priceMaxInput && priceMaxInput.value ? Number(priceMaxInput.value) : null,
      search: searchInput ? searchInput.value.trim().toLowerCase() : ''
    };

    filterCheckboxes.forEach(cb => {
      if (cb.checked) {
        const type = cb.dataset.filter;
        if (filters[type]) filters[type].push(cb.value);
      }
    });

    return filters;
  }

  function renderChips(filters) {
    if (!chipsContainer || !activeChipsBar) return;
    chipsContainer.innerHTML = '';
    let hasActive = false;

    // Search chip
    if (filters.search) {
      hasActive = true;
      chipsContainer.appendChild(createChip(`"${filters.search}"`, () => {
        if (searchInput) searchInput.value = '';
        applyFilters();
      }));
    }

    // Price chips
    if (filters.minPrice !== null || filters.maxPrice !== null) {
      hasActive = true;
      const min = filters.minPrice !== null ? `${filters.minPrice}€` : '0€';
      const max = filters.maxPrice !== null ? `${filters.maxPrice}€` : '∞';
      chipsContainer.appendChild(createChip(`${min} — ${max}`, () => {
        if (priceMinInput) priceMinInput.value = '';
        if (priceMaxInput) priceMaxInput.value = '';
        priceTagBtns.forEach(b => b.classList.remove('active'));
        applyFilters();
      }));
    }

    // Checkbox chips
    ['brand', 'category', 'shape', 'material'].forEach(type => {
      filters[type].forEach(val => {
        hasActive = true;
        chipsContainer.appendChild(createChip(val, () => {
          const targetCb = Array.from(filterCheckboxes).find(cb => cb.dataset.filter === type && cb.value === val);
          if (targetCb) targetCb.checked = false;
          applyFilters();
        }));
      });
    });

    activeChipsBar.style.display = hasActive ? 'flex' : 'none';
  }

  function createChip(text, onRemove) {
    const chip = document.createElement('div');
    chip.className = 'filter-chip';
    chip.innerHTML = `<span>${text}</span><button type="button" aria-label="Remover">&times;</button>`;
    chip.querySelector('button').addEventListener('click', onRemove);
    return chip;
  }

  function applyFilters() {
    const filters = getActiveFilters();
    renderChips(filters);

    if (searchClear) {
      searchClear.style.display = filters.search ? 'block' : 'none';
    }

    let visibleCount = 0;

    cards.forEach(card => {
      const cardBrand = (card.dataset.brand || '').toLowerCase();
      const cardCat = (card.dataset.category || '').toLowerCase();
      const cardShape = (card.dataset.shape || '').toLowerCase();
      const cardMat = (card.dataset.material || '').toLowerCase();
      const cardName = (card.dataset.name || '').toLowerCase();
      const cardSku = (card.dataset.sku || '').toLowerCase();
      const cardPrice = Number(card.dataset.price || 0);

      // Check Brand match
      const brandMatch = filters.brand.length === 0 || filters.brand.some(b => b.toLowerCase() === cardBrand || cardName.includes(b.toLowerCase()));

      // Check Category match
      const catMatch = filters.category.length === 0 || filters.category.some(c => c.toLowerCase() === cardCat);

      // Check Shape match
      const shapeMatch = filters.shape.length === 0 || filters.shape.some(s => s.toLowerCase() === cardShape);

      // Check Material match
      const matMatch = filters.material.length === 0 || filters.material.some(m => m.toLowerCase() === cardMat);

      // Check Price match
      const minMatch = filters.minPrice === null || cardPrice >= filters.minPrice;
      const maxMatch = filters.maxPrice === null || cardPrice <= filters.maxPrice;

      // Check Search text match
      let searchMatch = true;
      if (filters.search) {
        const q = filters.search;
        searchMatch = cardName.includes(q) || cardBrand.includes(q) || cardCat.includes(q) || cardShape.includes(q) || cardSku.includes(q);
      }

      const isVisible = brandMatch && catMatch && shapeMatch && matMatch && minMatch && maxMatch && searchMatch;

      card.hidden = !isVisible;
      if (isVisible) visibleCount++;
    });

    if (countBadge) countBadge.textContent = String(visibleCount);
    if (emptyState) emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    if (grid) grid.style.display = visibleCount === 0 ? 'none' : 'grid';
  }

  function resetAllFilters() {
    if (searchInput) searchInput.value = '';
    if (priceMinInput) priceMinInput.value = '';
    if (priceMaxInput) priceMaxInput.value = '';
    filterCheckboxes.forEach(cb => cb.checked = false);
    priceTagBtns.forEach(b => b.classList.remove('active'));
    applyFilters();
  }

  // Event Listeners
  filterCheckboxes.forEach(cb => cb.addEventListener('change', applyFilters));

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      applyFilters();
      searchInput?.focus();
    });
  }

  if (priceMinInput) priceMinInput.addEventListener('input', applyFilters);
  if (priceMaxInput) priceMaxInput.addEventListener('input', applyFilters);

  priceTagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const min = btn.dataset.min;
      const max = btn.dataset.max;
      const isActive = btn.classList.contains('active');

      priceTagBtns.forEach(b => b.classList.remove('active'));

      if (isActive) {
        if (priceMinInput) priceMinInput.value = '';
        if (priceMaxInput) priceMaxInput.value = '';
      } else {
        btn.classList.add('active');
        if (priceMinInput) priceMinInput.value = min !== '0' ? min : '';
        if (priceMaxInput) priceMaxInput.value = max !== '1000' ? max : '';
      }
      applyFilters();
    });
  });

  if (sortSelect && grid) {
    sortSelect.addEventListener('change', () => {
      const mode = sortSelect.value;
      const sorted = [...cards].sort((a, b) => {
        const priceA = Number(a.dataset.price || 0);
        const priceB = Number(b.dataset.price || 0);
        const nameA = (a.dataset.name || '').toLowerCase();
        const nameB = (b.dataset.name || '').toLowerCase();

        if (mode === 'price-asc') return priceA - priceB;
        if (mode === 'price-desc') return priceB - priceA;
        if (mode === 'name-asc') return nameA.localeCompare(nameB);
        if (mode === 'name-desc') return nameB.localeCompare(nameA);
        return 0;
      });
      sorted.forEach(c => grid.appendChild(c));
    });
  }

  btnClearAll?.addEventListener('click', resetAllFilters);
  btnSidebarReset?.addEventListener('click', resetAllFilters);
  btnEmptyReset?.addEventListener('click', resetAllFilters);

  // Initial Run
  applyFilters();
})();
