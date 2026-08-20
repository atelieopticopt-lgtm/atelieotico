// admin.js — Supreme Interactive Admin Dashboard Controller for Ateliê Ótico
(() => {
  const CMS_KEY = 'atelie_cms_store_v1';
  const AUTH_KEY = 'atelie_admin_session_auth';
  const VALID_USERS = ['admin', 'geral@atelieotico.com', 'atelie', 'gestor'];
  const VALID_PASSWORDS = ['atelie2026', 'admin2026', 'admin', 'atelie'];

  // =========================================================================
  // 1. AUTHENTICATION & ACCESS GATE (USERNAME & PASSWORD)
  // =========================================================================
  const authOverlay = document.getElementById('admin-auth-overlay');
  const dashboardLayout = document.getElementById('admin-dashboard-layout');
  const authForm = document.getElementById('admin-auth-form');
  const authUserInput = document.getElementById('auth-username');
  const authPassInput = document.getElementById('auth-passcode');
  const authError = document.getElementById('auth-error-msg');
  const btnLogout = document.getElementById('btn-admin-logout');

  function checkAuth() {
    const isAuthed = sessionStorage.getItem(AUTH_KEY) === 'true' || localStorage.getItem(AUTH_KEY) === 'true';
    if (isAuthed) {
      if (authOverlay) authOverlay.style.display = 'none';
      if (dashboardLayout) dashboardLayout.style.display = 'grid';
    } else {
      if (authOverlay) authOverlay.style.display = 'flex';
      if (dashboardLayout) dashboardLayout.style.display = 'none';
      setTimeout(() => authUserInput?.focus(), 100);
    }
  }

  authForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = (authUserInput?.value || '').trim().toLowerCase();
    const pass = (authPassInput?.value || '').trim();
    const remember = document.getElementById('auth-remember')?.checked;

    const isValidUser = VALID_USERS.includes(user) || user.length >= 3;
    const isValidPass = VALID_PASSWORDS.includes(pass) || pass === 'atelie2026';

    if (isValidUser && isValidPass) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      if (remember) localStorage.setItem(AUTH_KEY, 'true');
      if (authError) authError.style.display = 'none';
      checkAuth();
    } else {
      if (authError) authError.style.display = 'block';
      authPassInput?.select();
    }
  });

  btnLogout?.addEventListener('click', () => {
    sessionStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_KEY);
    checkAuth();
  });

  checkAuth();

  // =========================================================================
  // 2. CMS STATE & DATA LOADING
  // =========================================================================
  let currentEditingPhotos = [];
  let quickAddPhotos = [];

  function updateImageDimensions(imgSrc, outputElId) {
    if (!imgSrc || !outputElId) return;
    const outputEl = document.getElementById(outputElId);
    if (!outputEl) return;

    const tempImg = new Image();
    tempImg.onload = () => {
      outputEl.textContent = `${tempImg.naturalWidth} × ${tempImg.naturalHeight} px`;
    };
    tempImg.onerror = () => {
      outputEl.textContent = 'Dimensões indisponíveis';
    };
    tempImg.src = imgSrc;
  }

  function syncBannerStudio() {
    // 1. Hero Banner Sync
    const heroTag = document.getElementById('hero-tag')?.value || 'COLEÇÃO 2026';
    const heroTitle = document.getElementById('hero-title')?.value || 'Design de Autor & Precisão Ótica';
    const heroDesc = document.getElementById('hero-desc')?.value || '';
    const heroBtn = document.getElementById('hero-btn-text')?.value || 'EXPLORAR CATÁLOGO';
    const heroImg = document.getElementById('hero-img')?.value || '/campagna-hero.jpeg';
    const heroPos = document.getElementById('hero-pos-slider')?.value || 8;

    if (document.getElementById('hero-preview-tag')) document.getElementById('hero-preview-tag').textContent = heroTag;
    if (document.getElementById('hero-preview-title')) document.getElementById('hero-preview-title').textContent = heroTitle;
    if (document.getElementById('hero-preview-desc')) document.getElementById('hero-preview-desc').textContent = heroDesc;
    if (document.getElementById('hero-preview-btn')) document.getElementById('hero-preview-btn').textContent = heroBtn;
    
    const heroPreviewImg = document.getElementById('hero-live-preview-img');
    if (heroPreviewImg) {
      heroPreviewImg.src = heroImg;
      heroPreviewImg.style.objectPosition = `center ${heroPos}%`;
    }
    const heroPosVal = document.getElementById('hero-pos-val');
    if (heroPosVal) heroPosVal.textContent = `${heroPos}% ${heroPos < 25 ? '(Foco no Rosto/Lentes)' : (heroPos > 70 ? '(Foco Inferior)' : '(Foco Central)')}`;
    updateImageDimensions(heroImg, 'hero-detected-dims');

    // 2. Cinematic Banner Sync
    const cinTitle = document.getElementById('cinematic-title')?.value || '';
    const cinDesc = document.getElementById('cinematic-desc')?.value || '';
    const cinImg = document.getElementById('cinematic-img')?.value || '/campagna-signature.jpeg';
    const cinPos = document.getElementById('cinematic-pos-slider')?.value || 50;

    if (document.getElementById('cinematic-preview-title')) document.getElementById('cinematic-preview-title').textContent = cinTitle;
    if (document.getElementById('cinematic-preview-desc')) document.getElementById('cinematic-preview-desc').textContent = cinDesc;
    const cinPreviewImg = document.getElementById('cinematic-live-preview-img');
    if (cinPreviewImg) {
      cinPreviewImg.src = cinImg;
      cinPreviewImg.style.objectPosition = `center ${cinPos}%`;
    }
    const cinPosVal = document.getElementById('cinematic-pos-val');
    if (cinPosVal) cinPosVal.textContent = `${cinPos}% ${cinPos === '50' ? '(Centro)' : ''}`;
    updateImageDimensions(cinImg, 'cinematic-detected-dims');

    // 3. Prefooter Banner Sync
    const preTitle = document.getElementById('prefooter-title')?.value || '';
    const preDesc = document.getElementById('prefooter-desc')?.value || '';
    const preImg = document.getElementById('prefooter-img')?.value || '/campagna-prefooter.jpeg';
    const prePos = document.getElementById('prefooter-pos-slider')?.value || 50;

    if (document.getElementById('prefooter-preview-title')) document.getElementById('prefooter-preview-title').textContent = preTitle;
    if (document.getElementById('prefooter-preview-desc')) document.getElementById('prefooter-preview-desc').textContent = preDesc;
    const prePreviewImg = document.getElementById('prefooter-live-preview-img');
    if (prePreviewImg) {
      prePreviewImg.src = preImg;
      prePreviewImg.style.objectPosition = `center ${prePos}%`;
    }
    const prePosVal = document.getElementById('prefooter-pos-val');
    if (prePosVal) prePosVal.textContent = `${prePos}% ${prePos === '50' ? '(Centro)' : ''}`;
    updateImageDimensions(preImg, 'prefooter-detected-dims');
  }

  function loadSavedCMS() {
    try {
      const raw = localStorage.getItem(CMS_KEY);
      if (!raw) {
        syncBannerStudio();
        return;
      }
      const cms = JSON.parse(raw);

      if (cms.hero) {
        if (cms.hero.tag && document.getElementById('hero-tag')) document.getElementById('hero-tag').value = cms.hero.tag;
        if (cms.hero.title && document.getElementById('hero-title')) document.getElementById('hero-title').value = cms.hero.title;
        if (cms.hero.desc && document.getElementById('hero-desc')) document.getElementById('hero-desc').value = cms.hero.desc;
        if (cms.hero.image && document.getElementById('hero-img')) document.getElementById('hero-img').value = cms.hero.image;
        if (cms.hero.btnText && document.getElementById('hero-btn-text')) document.getElementById('hero-btn-text').value = cms.hero.btnText;
        if (cms.hero.btnLink && document.getElementById('hero-btn-link')) document.getElementById('hero-btn-link').value = cms.hero.btnLink;
        if (cms.hero.position && document.getElementById('hero-pos-slider')) document.getElementById('hero-pos-slider').value = cms.hero.position;
      }
      if (cms.cinematic) {
        if (cms.cinematic.title && document.getElementById('cinematic-title')) document.getElementById('cinematic-title').value = cms.cinematic.title;
        if (cms.cinematic.desc && document.getElementById('cinematic-desc')) document.getElementById('cinematic-desc').value = cms.cinematic.desc;
        if (cms.cinematic.image && document.getElementById('cinematic-img')) document.getElementById('cinematic-img').value = cms.cinematic.image;
        if (cms.cinematic.position && document.getElementById('cinematic-pos-slider')) document.getElementById('cinematic-pos-slider').value = cms.cinematic.position;
      }
      if (cms.prefooter) {
        if (cms.prefooter.title && document.getElementById('prefooter-title')) document.getElementById('prefooter-title').value = cms.prefooter.title;
        if (cms.prefooter.desc && document.getElementById('prefooter-desc')) document.getElementById('prefooter-desc').value = cms.prefooter.desc;
        if (cms.prefooter.image && document.getElementById('prefooter-img')) document.getElementById('prefooter-img').value = cms.prefooter.image;
        if (cms.prefooter.position && document.getElementById('prefooter-pos-slider')) document.getElementById('prefooter-pos-slider').value = cms.prefooter.position;
      }
      if (cms.content) {
        if (cms.content.phone && document.getElementById('content-phone')) document.getElementById('content-phone').value = cms.content.phone;
        if (cms.content.email && document.getElementById('content-email')) document.getElementById('content-email').value = cms.content.email;
        if (cms.content.address && document.getElementById('content-address')) document.getElementById('content-address').value = cms.content.address;
        if (cms.content.hoursMF && document.getElementById('hours-mf')) document.getElementById('hours-mf').value = cms.content.hoursMF;
        if (cms.content.hoursSat && document.getElementById('hours-sat')) document.getElementById('hours-sat').value = cms.content.hoursSat;
      }

      if (cms.priceOverrides && typeof cms.priceOverrides === 'object') {
        Object.entries(cms.priceOverrides).forEach(([id, price]) => {
          const input = document.querySelector(`.admin-inline-price-input[data-id="${id}"]`);
          if (input) input.value = price;
        });
      }

      if (cms.customBrands && Array.isArray(cms.customBrands)) {
        cms.customBrands.forEach(b => appendBrandOption(b));
      }

      syncBannerStudio();
    } catch (e) {
      console.error('Error loading CMS store', e);
    }
  }

  function autoSaveAll() {
    try {
      const existingRaw = localStorage.getItem(CMS_KEY);
      const existing = existingRaw ? JSON.parse(existingRaw) : {};

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
          btnLink: document.getElementById('hero-btn-link')?.value || '',
          position: document.getElementById('hero-pos-slider')?.value || 8
        },
        cinematic: {
          title: document.getElementById('cinematic-title')?.value || '',
          desc: document.getElementById('cinematic-desc')?.value || '',
          image: document.getElementById('cinematic-img')?.value || '',
          position: document.getElementById('cinematic-pos-slider')?.value || 50
        },
        prefooter: {
          title: document.getElementById('prefooter-title')?.value || '',
          desc: document.getElementById('prefooter-desc')?.value || '',
          image: document.getElementById('prefooter-img')?.value || '',
          position: document.getElementById('prefooter-pos-slider')?.value || 50
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
      syncBannerStudio();
    } catch (e) {
      console.error('Error auto-saving CMS data', e);
    }
  }

  // =========================================================================
  // 3. BANNER FILE UPLOAD BUTTONS
  // =========================================================================
  function bindBannerUploader(btnId, fileInputId, targetUrlInputId) {
    const btn = document.getElementById(btnId);
    const fileInput = document.getElementById(fileInputId);
    const urlInput = document.getElementById(targetUrlInputId);

    btn?.addEventListener('click', () => fileInput?.click());
    fileInput?.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          if (evt.target?.result && urlInput) {
            urlInput.value = evt.target.result;
            autoSaveAll();
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  bindBannerUploader('btn-upload-hero', 'hero-file-input', 'hero-img');
  bindBannerUploader('btn-upload-cinematic', 'cinematic-file-input', 'cinematic-img');
  bindBannerUploader('btn-upload-prefooter', 'prefooter-file-input', 'prefooter-img');

  // Sliders and Banner inputs live listener
  document.getElementById('hero-pos-slider')?.addEventListener('input', autoSaveAll);
  document.getElementById('cinematic-pos-slider')?.addEventListener('input', autoSaveAll);
  document.getElementById('prefooter-pos-slider')?.addEventListener('input', autoSaveAll);

  // =========================================================================
  // 4. LIVE FILTERING OF PRODUCT CARDS
  // =========================================================================
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

  // =========================================================================
  // 5. TAB NAVIGATION
  // =========================================================================
  const tabs = document.querySelectorAll('.nav-item[data-tab]');
  const panels = document.querySelectorAll('.tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(`tab-${target}`)?.classList.add('active');
      if (target === 'banners') syncBannerStudio();
    });
  });

  // =========================================================================
  // 6. VISUAL MULTI-PHOTO GALLERY & REORDERING (DRAG & DROP + BUTTONS)
  // =========================================================================
  const modal = document.getElementById('product-modal');
  const modalPhotosList = document.getElementById('modal-photos-gallery-list');
  const modalFileInput = document.getElementById('modal-photo-file-input');
  const btnModalAddPhoto = document.getElementById('btn-modal-add-photo');

  btnModalAddPhoto?.addEventListener('click', () => modalFileInput?.click());

  modalFileInput?.addEventListener('change', (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          currentEditingPhotos.push(evt.target.result);
          renderModalPhotos();
        }
      };
      reader.readAsDataURL(file);
    });
    modalFileInput.value = '';
  });

  function renderModalPhotos() {
    if (!modalPhotosList) return;
    modalPhotosList.innerHTML = '';

    if (currentEditingPhotos.length === 0) {
      modalPhotosList.innerHTML = `<p style="grid-column: 1/-1; font-size: 12px; color: #888;">Nenhuma foto carregada. Clique em "Carregar Foto" acima.</p>`;
      return;
    }

    currentEditingPhotos.forEach((src, idx) => {
      const isMain = idx === 0;
      const isHover = idx === 1;
      const badgeText = isMain ? '#1 Principal' : (isHover ? '#2 Hover' : `#${idx + 1} Galeria`);
      const badgeClass = isMain ? 'main' : (isHover ? 'hover' : 'alt');

      const card = document.createElement('div');
      card.className = `photo-item-card ${isMain ? 'is-main' : ''}`;
      card.draggable = true;
      card.dataset.index = String(idx);

      card.innerHTML = `
        <span class="photo-badge-label ${badgeClass}">${badgeText}</span>
        <img src="${src}" alt="Foto ${idx + 1}" class="photo-item-img" onerror="this.src='/SVG-Logo-Atelie.svg'" />
        <div class="photo-item-actions">
          <button type="button" class="btn-photo-move btn-move-left" data-move="-1" ${idx === 0 ? 'disabled' : ''} title="Mover para a esquerda">&larr;</button>
          <button type="button" class="btn-photo-move btn-move-right" data-move="1" ${idx === currentEditingPhotos.length - 1 ? 'disabled' : ''} title="Mover para a direita">&rarr;</button>
          <button type="button" class="btn-photo-delete" data-del-photo="${idx}" title="Eliminar foto">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      `;

      card.querySelector('.btn-move-left')?.addEventListener('click', () => {
        if (idx > 0) {
          const temp = currentEditingPhotos[idx];
          currentEditingPhotos[idx] = currentEditingPhotos[idx - 1];
          currentEditingPhotos[idx - 1] = temp;
          renderModalPhotos();
        }
      });

      card.querySelector('.btn-move-right')?.addEventListener('click', () => {
        if (idx < currentEditingPhotos.length - 1) {
          const temp = currentEditingPhotos[idx];
          currentEditingPhotos[idx] = currentEditingPhotos[idx + 1];
          currentEditingPhotos[idx + 1] = temp;
          renderModalPhotos();
        }
      });

      card.querySelector('.btn-photo-delete')?.addEventListener('click', () => {
        currentEditingPhotos.splice(idx, 1);
        renderModalPhotos();
      });

      card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', String(idx));
      });

      card.addEventListener('dragover', (e) => e.preventDefault());

      card.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggedIdx = Number(e.dataTransfer.getData('text/plain'));
        const targetIdx = idx;
        if (!isNaN(draggedIdx) && draggedIdx !== targetIdx) {
          const item = currentEditingPhotos.splice(draggedIdx, 1)[0];
          currentEditingPhotos.splice(targetIdx, 0, item);
          renderModalPhotos();
        }
      });

      modalPhotosList.appendChild(card);
    });
  }

  // =========================================================================
  // 7. MODAL OPEN / CLOSE & KEYDOWN ESC HANDLER
  // =========================================================================
  const modalTitle = document.getElementById('modal-product-title');
  const modalForm = document.getElementById('product-modal-form');

  function openProductModal(cardEl) {
    if (!modal) return;
    modalForm?.reset();

    if (cardEl) {
      const id = cardEl.dataset.id;
      const title = cardEl.querySelector('.admin-card-title')?.textContent || '';
      const sku = (cardEl.querySelector('.admin-card-sku')?.textContent || '').replace('SKU:', '').trim();
      const brand = cardEl.querySelector('.admin-card-brand-tag')?.textContent || '';
      const price = cardEl.querySelector('.admin-inline-price-input')?.value || '0';
      const mainImg = cardEl.querySelector('.admin-card-thumb')?.getAttribute('src') || '';

      modalTitle.textContent = `Editar Modelo: ${title}`;
      document.getElementById('modal-product-id').value = id;
      document.getElementById('modal-name').value = title;
      document.getElementById('modal-brand').value = brand;
      document.getElementById('modal-sku').value = sku;
      document.getElementById('modal-price').value = price;

      currentEditingPhotos = [mainImg].filter(Boolean);
      renderModalPhotos();
    }

    modal.style.display = 'flex';
  }

  function closeProductModal() {
    if (modal) modal.style.display = 'none';
  }

  document.getElementById('btn-close-modal')?.addEventListener('click', closeProductModal);
  document.getElementById('btn-cancel-modal')?.addEventListener('click', closeProductModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      closeProductModal();
    }
  });

  modalForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const idVal = document.getElementById('modal-product-id')?.value;
    const name = document.getElementById('modal-name')?.value.trim();
    const brand = document.getElementById('modal-brand')?.value.trim();
    const sku = document.getElementById('modal-sku')?.value.trim();
    const price = Number(document.getElementById('modal-price')?.value);

    if (idVal) {
      const card = document.querySelector(`.admin-product-card[data-id="${idVal}"]`);
      if (card) {
        card.dataset.name = name.toLowerCase();
        card.dataset.brand = brand.toLowerCase();
        card.dataset.sku = sku.toLowerCase();
        if (card.querySelector('.admin-card-title')) card.querySelector('.admin-card-title').textContent = name;
        if (card.querySelector('.admin-card-sku')) card.querySelector('.admin-card-sku').textContent = `SKU: ${sku}`;
        if (card.querySelector('.admin-card-brand-tag')) card.querySelector('.admin-card-brand-tag').textContent = brand;
        if (card.querySelector('.admin-inline-price-input')) card.querySelector('.admin-inline-price-input').value = price;

        if (currentEditingPhotos.length > 0 && card.querySelector('.admin-card-thumb')) {
          card.querySelector('.admin-card-thumb').src = currentEditingPhotos[0];
        }
      }
    }

    autoSaveAll();
    closeProductModal();
  });

  // =========================================================================
  // 8. BRAND MANAGEMENT & NEW PRODUCT CREATION IN TAB 2
  // =========================================================================
  function appendBrandOption(brandName) {
    if (!brandName) return;
    const brandFilter = document.getElementById('admin-brand-filter');
    const quickBrand = document.getElementById('quick-add-brand');
    const modalBrand = document.getElementById('modal-brand');
    const chipList = document.getElementById('admin-brands-chip-list');

    const opt1 = document.createElement('option');
    opt1.value = brandName;
    opt1.textContent = brandName;
    brandFilter?.appendChild(opt1);

    const opt2 = document.createElement('option');
    opt2.value = brandName;
    opt2.textContent = brandName;
    quickBrand?.appendChild(opt2);

    const opt3 = document.createElement('option');
    opt3.value = brandName;
    opt3.textContent = brandName;
    modalBrand?.appendChild(opt3);

    if (chipList) {
      const chip = document.createElement('span');
      chip.className = 'brand-chip';
      chip.innerHTML = `<strong>${brandName}</strong>`;
      chipList.appendChild(chip);
    }
  }

  document.getElementById('form-add-brand')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('new-brand-name');
    const brandName = input?.value.trim();
    if (brandName) {
      appendBrandOption(brandName);

      const existingRaw = localStorage.getItem(CMS_KEY);
      const existing = existingRaw ? JSON.parse(existingRaw) : {};
      const customBrands = existing.customBrands || [];
      if (!customBrands.includes(brandName)) {
        customBrands.push(brandName);
        existing.customBrands = customBrands;
        localStorage.setItem(CMS_KEY, JSON.stringify(existing));
      }

      input.value = '';
      alert(`Marca "${brandName}" adicionada com sucesso!`);
    }
  });

  // Quick Add Multiple Photos Dropzone
  const quickDropzone = document.getElementById('quick-upload-dropzone');
  const quickFileInput = document.getElementById('quick-file-input');
  const quickPreviewsList = document.getElementById('quick-photos-preview-list');

  quickDropzone?.addEventListener('click', () => quickFileInput?.click());

  quickFileInput?.addEventListener('change', (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          quickAddPhotos.push(evt.target.result);
          renderQuickPhotos();
        }
      };
      reader.readAsDataURL(file);
    });
    quickFileInput.value = '';
  });

  function renderQuickPhotos() {
    if (!quickPreviewsList) return;
    quickPreviewsList.innerHTML = '';

    quickAddPhotos.forEach((src, idx) => {
      const card = document.createElement('div');
      card.className = `photo-item-card ${idx === 0 ? 'is-main' : ''}`;
      card.innerHTML = `
        <span class="photo-badge-label ${idx === 0 ? 'main' : (idx === 1 ? 'hover' : 'alt')}">${idx === 0 ? '#1 Principal' : (idx === 1 ? '#2 Hover' : `#${idx + 1}`)}</span>
        <img src="${src}" alt="Foto ${idx + 1}" class="photo-item-img" />
        <button type="button" class="btn-photo-delete" style="width: 100%; margin-top: 4px;">Eliminar</button>
      `;
      card.querySelector('.btn-photo-delete')?.addEventListener('click', () => {
        quickAddPhotos.splice(idx, 1);
        renderQuickPhotos();
      });
      quickPreviewsList.appendChild(card);
    });
  }

  document.getElementById('form-quick-add-product')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const brand = document.getElementById('quick-add-brand')?.value;
    const name = document.getElementById('quick-add-name')?.value.trim();
    const sku = document.getElementById('quick-add-sku')?.value.trim();
    const price = Number(document.getElementById('quick-add-price')?.value);
    const category = document.getElementById('quick-add-category')?.value;
    const shape = document.getElementById('quick-add-shape')?.value;

    const mainPhoto = quickAddPhotos[0] || '/SVG-Logo-Atelie.svg';
    const newId = Date.now();

    const grid = document.getElementById('admin-products-grid');
    if (grid) {
      const article = document.createElement('article');
      article.className = 'admin-product-card';
      article.dataset.id = String(newId);
      article.dataset.name = name.toLowerCase();
      article.dataset.brand = brand.toLowerCase();
      article.dataset.category = category.toLowerCase();
      article.dataset.sku = sku.toLowerCase();

      article.innerHTML = `
        <div class="admin-card-thumb-wrap">
          <img src="${mainPhoto}" alt="${name}" class="admin-card-thumb" loading="lazy" />
          <span class="admin-card-brand-tag">${brand}</span>
        </div>
        <div class="admin-card-body">
          <h3 class="admin-card-title">${name}</h3>
          <div class="admin-card-sku">SKU: ${sku}</div>
          <div class="admin-card-meta">${category} &bull; ${shape}</div>

          <div class="admin-card-price-box">
            <label>Preço:</label>
            <div class="price-input-wrapper">
              <input type="number" class="admin-inline-price-input" value="${price}" data-id="${newId}" min="0" />
              <span>€</span>
            </div>
          </div>

          <div class="admin-card-actions">
            <button type="button" class="btn-card-edit" data-edit-id="${newId}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
              <span>Editar Tudo</span>
            </button>
            <button type="button" class="btn-card-delete" data-del-id="${newId}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              <span>Eliminar</span>
            </button>
          </div>
        </div>
      `;

      article.querySelector('.btn-card-edit')?.addEventListener('click', () => openProductModal(article));
      article.querySelector('.btn-card-delete')?.addEventListener('click', () => {
        if (confirm(`Eliminar modelo "${name}"?`)) {
          article.remove();
          autoSaveAll();
          filterCards();
        }
      });
      article.querySelector('.admin-inline-price-input')?.addEventListener('input', autoSaveAll);

      grid.prepend(article);
    }

    autoSaveAll();
    filterCards();

    e.target.reset();
    quickAddPhotos = [];
    renderQuickPhotos();

    document.querySelector('.nav-item[data-tab="products"]')?.click();
    alert(`Modelo "${name}" criado e publicado no catálogo com sucesso!`);
  });

  // =========================================================================
  // 9. EVENT BINDINGS
  // =========================================================================
  document.getElementById('admin-product-search')?.addEventListener('input', filterCards);
  document.getElementById('admin-brand-filter')?.addEventListener('change', filterCards);
  document.getElementById('admin-category-filter')?.addEventListener('change', filterCards);

  document.querySelectorAll('.auto-save-input').forEach(input => {
    input.addEventListener('input', autoSaveAll);
    input.addEventListener('change', autoSaveAll);
  });

  document.querySelectorAll('.admin-inline-price-input').forEach(input => {
    input.addEventListener('input', autoSaveAll);
    input.addEventListener('change', autoSaveAll);
  });

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

  document.getElementById('btn-add-product')?.addEventListener('click', () => {
    document.querySelector('.nav-item[data-tab="brands-add"]')?.click();
  });

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

  loadSavedCMS();
  filterCards();
})();
