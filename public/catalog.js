// catalog.js — Clean Sidebar & Dual Range Slider Filtering Controller
(() => {
  const grid = document.querySelector('[data-product-grid]');
  const cards = Array.from(document.querySelectorAll('.store-card'));
  const countBadge = document.getElementById('catalog-result-count');
  const emptyState = document.getElementById('catalog-empty-state');
  const searchInput = document.getElementById('catalog-search-input');
  const sortSelect = document.getElementById('catalog-sort-select');
  const filterGroupBrands = document.querySelector('.catalog-filter-group .filter-options-list');

  // Dual Range Slider Elements
  const sliderMin = document.getElementById('price-slider-min');
  const sliderMax = document.getElementById('price-slider-max');
  const sliderTrack = document.getElementById('range-track-fill');
  const minValLabel = document.getElementById('price-slider-min-val');
  const maxValLabel = document.getElementById('price-slider-max-val');

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

  const normalize = (str) => (str || '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  // Load URL params on initial load
  const urlParams = new URLSearchParams(window.location.search);
  const urlBrand = urlParams.get('marca') || urlParams.get('brand');
  const urlCategory = urlParams.get('categoria') || urlParams.get('category');
  const urlShape = urlParams.get('forma') || urlParams.get('shape');
  const urlMaterial = urlParams.get('material');
  const urlSearch = urlParams.get('q');

  if (urlSearch && searchInput) {
    searchInput.value = urlSearch;
  }

  let brandCheckboxMatched = false;

  // Pre-check checkboxes based on URL
  document.querySelectorAll('input[data-filter]').forEach(cb => {
    const filterType = cb.dataset.filter;
    const val = normalize(cb.value);

    if (filterType === 'brand' && urlBrand) {
      const targetBrand = normalize(urlBrand);
      if (val === targetBrand || val.includes(targetBrand) || targetBrand.includes(val)) {
        cb.checked = true;
        brandCheckboxMatched = true;
      }
    }
    if (filterType === 'category' && urlCategory) {
      const targetCat = normalize(urlCategory);
      if (val === targetCat || val.includes(targetCat) || targetCat.includes(val)) {
        cb.checked = true;
      }
    }
    if (filterType === 'shape' && urlShape) {
      const targetShape = normalize(urlShape);
      if (val === targetShape || val.includes(targetShape) || targetShape.includes(val)) {
        cb.checked = true;
      }
    }
    if (filterType === 'material' && urlMaterial) {
      const targetMat = normalize(urlMaterial);
      if (val === targetMat || val.includes(targetMat) || targetMat.includes(val)) {
        cb.checked = true;
      }
    }
  });

  // If a brand URL param was supplied but no existing checkbox matched, dynamically inject and check it
  if (urlBrand && !brandCheckboxMatched && filterGroupBrands) {
    const brandLabel = document.createElement('label');
    brandLabel.className = 'filter-checkbox-label';
    brandLabel.innerHTML = `
      <input type="checkbox" data-filter="brand" value="${urlBrand}" checked />
      <span class="filter-label-text">${urlBrand}</span>
      <span class="filter-count-badge">✓</span>
    `;
    filterGroupBrands.prepend(brandLabel);
  }

  function updateSliderVisuals(source) {
    if (!sliderMin || !sliderMax) return;
    let min = parseInt(sliderMin.value);
    let max = parseInt(sliderMax.value);

    if (min > max - 15) {
      if (source === 'min') {
        sliderMin.value = max - 15;
        min = max - 15;
      } else {
        sliderMax.value = min + 15;
        max = min + 15;
      }
    }

    const minPercent = (min / 600) * 100;
    const maxPercent = (max / 600) * 100;

    if (sliderTrack) {
      sliderTrack.style.left = `${minPercent}%`;
      sliderTrack.style.right = `${100 - maxPercent}%`;
    }

    if (minValLabel) minValLabel.textContent = `${min} €`;
    if (maxValLabel) maxValLabel.textContent = `${max} €`;
  }

  function getActiveFilters() {
    const minP = sliderMin ? parseInt(sliderMin.value) : 0;
    const maxP = sliderMax ? parseInt(sliderMax.value) : 600;

    const filters = {
      brand: [],
      category: [],
      shape: [],
      material: [],
      minPrice: minP > 0 ? minP : null,
      maxPrice: maxP < 600 ? maxP : null,
      search: searchInput ? normalize(searchInput.value) : ''
    };

    document.querySelectorAll('input[data-filter]').forEach(cb => {
      if (cb.checked) {
        const type = cb.dataset.filter;
        if (filters[type]) filters[type].push(normalize(cb.value));
      }
    });

    return filters;
  }

  function applyFilters() {
    const filters = getActiveFilters();
    let visibleCount = 0;

    cards.forEach(card => {
      const cardBrand = normalize(card.dataset.brand);
      const cardCat = normalize(card.dataset.category);
      const cardShape = normalize(card.dataset.shape);
      const cardMat = normalize(card.dataset.material);
      const cardName = normalize(card.dataset.name);
      const cardSku = normalize(card.dataset.sku);
      const cardColor = normalize(card.dataset.color);
      const cardPrice = Number(card.dataset.price || 0);

      // Check Brand match
      const brandMatch = filters.brand.length === 0 || filters.brand.some(b => 
        cardBrand === b || cardBrand.includes(b) || cardName.includes(b) || b.includes(cardBrand)
      );

      // Check Category match
      const catMatch = filters.category.length === 0 || filters.category.some(c => 
        cardCat === c || cardCat.includes(c)
      );

      // Check Shape match
      const shapeMatch = filters.shape.length === 0 || filters.shape.some(s => 
        cardShape === s || cardShape.includes(s)
      );

      // Check Material match
      const matMatch = filters.material.length === 0 || filters.material.some(m => 
        cardMat === m || cardMat.includes(m)
      );

      // Check Price match
      const minMatch = filters.minPrice === null || cardPrice >= filters.minPrice;
      const maxMatch = filters.maxPrice === null || cardPrice <= filters.maxPrice;

      // Check Search text match
      let searchMatch = true;
      if (filters.search) {
        const q = filters.search;
        searchMatch = cardName.includes(q) || 
                      cardBrand.includes(q) || 
                      cardCat.includes(q) || 
                      cardShape.includes(q) || 
                      cardSku.includes(q) || 
                      cardColor.includes(q);
      }

      const isVisible = brandMatch && catMatch && shapeMatch && matMatch && minMatch && maxMatch && searchMatch;

      if (isVisible) {
        card.style.setProperty('display', 'flex', 'important');
        card.removeAttribute('hidden');
        card.classList.remove('is-hidden');
        visibleCount++;
      } else {
        card.style.setProperty('display', 'none', 'important');
        card.setAttribute('hidden', 'true');
        card.classList.add('is-hidden');
      }
    });

    if (countBadge) countBadge.textContent = String(visibleCount);
    if (emptyState) emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    if (grid) grid.style.display = visibleCount === 0 ? 'none' : 'grid';
  }

  function resetAllFilters() {
    if (searchInput) searchInput.value = '';
    if (sliderMin) sliderMin.value = 0;
    if (sliderMax) sliderMax.value = 600;
    updateSliderVisuals('init');
    document.querySelectorAll('input[data-filter]').forEach(cb => cb.checked = false);
    
    // Clear URL params without full page reload
    if (window.history.pushState) {
      const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      window.history.pushState({ path: cleanUrl }, '', cleanUrl);
    }
    
    applyFilters();
  }

  // Range Slider Events
  if (sliderMin) {
    sliderMin.addEventListener('input', () => {
      updateSliderVisuals('min');
      applyFilters();
    });
  }
  if (sliderMax) {
    sliderMax.addEventListener('input', () => {
      updateSliderVisuals('max');
      applyFilters();
    });
  }

  // Delegate Checkbox & Search Events
  document.addEventListener('change', (e) => {
    if ((e.target && e.target.matches('input[data-filter]')) || (e.target && e.target.closest('input[data-filter]'))) {
      applyFilters();
    }
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  if (sortSelect && grid) {
    sortSelect.addEventListener('change', () => {
      const mode = sortSelect.value;
      const sorted = [...cards].sort((a, b) => {
        const priceA = Number(a.dataset.price || 0);
        const priceB = Number(b.dataset.price || 0);
        const nameA = normalize(a.dataset.name);
        const nameB = normalize(b.dataset.name);

        if (mode === 'price-asc') return priceA - priceB;
        if (mode === 'price-desc') return priceB - priceA;
        if (mode === 'name-asc') return nameA.localeCompare(nameB);
        if (mode === 'name-desc') return nameB.localeCompare(nameA);
        return 0;
      });
      sorted.forEach(c => grid.appendChild(c));
    });
  }

  document.getElementById('btn-sidebar-reset')?.addEventListener('click', resetAllFilters);
  document.getElementById('btn-empty-reset')?.addEventListener('click', resetAllFilters);

  // Initial Run
  updateSliderVisuals('init');
  applyFilters();
})();
