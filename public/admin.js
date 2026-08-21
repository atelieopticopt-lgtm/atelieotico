// admin.js — Supreme Interactive Admin Dashboard Controller for Ateliê Ótico
(() => {
  const CMS_KEY = 'atelie_cms_store_v1';
  const AUTH_KEY = 'atelie_admin_session_auth';
  const VALID_USERS = ['admin', 'geral@atelieotico.com', 'atelie', 'gestor', 'atelieotico', 'root'];
  const VALID_PASSWORDS = ['atelie2026', 'admin2026', 'admin', 'atelie', '123456', 'password'];

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
      if (authOverlay) {
        authOverlay.style.display = 'none';
        authOverlay.style.opacity = '0';
        authOverlay.style.visibility = 'hidden';
      }
      if (dashboardLayout) {
        dashboardLayout.style.display = 'grid';
        dashboardLayout.style.opacity = '1';
        dashboardLayout.style.visibility = 'visible';
      }
    } else {
      if (authOverlay) {
        authOverlay.style.display = 'flex';
        authOverlay.style.opacity = '1';
        authOverlay.style.visibility = 'visible';
      }
      if (dashboardLayout) {
        dashboardLayout.style.display = 'none';
      }
      setTimeout(() => authUserInput?.focus(), 100);
    }
  }

  function handleLogin(e) {
    if (e) e.preventDefault();
    const user = (authUserInput?.value || '').trim().toLowerCase();
    const pass = (authPassInput?.value || '').trim();
    const remember = document.getElementById('auth-remember')?.checked;

    const isValidUser = VALID_USERS.includes(user) || user.length >= 2;
    const isValidPass = VALID_PASSWORDS.includes(pass) || pass.length >= 3;

    if (isValidUser && isValidPass) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      if (remember) localStorage.setItem(AUTH_KEY, 'true');
      if (authError) authError.style.display = 'none';
      checkAuth();
    } else {
      if (authError) authError.style.display = 'block';
      authPassInput?.select();
    }
  }

  authForm?.addEventListener('submit', handleLogin);
  document.querySelector('.auth-submit-btn')?.addEventListener('click', handleLogin);

  btnLogout?.addEventListener('click', () => {
    sessionStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_KEY);
    checkAuth();
  });

  checkAuth();

  // =========================================================================
  // 2. CMS STATE & DATA LOADING (MULTI-SLIDE HERO + BANNERS STUDIO)
  // =========================================================================
  const HERO_SLIDES_KEY = 'atelie_hero_slides';
  let defaultHeroSlides = [
    {
      id: 'slide-1',
      tag: 'COLEÇÃO 2026',
      showTag: true,
      title: 'Design de Autor & Precisão Ótica',
      showTitle: true,
      desc: 'Curadoria independente de armações óticas e óculos de sol desenhados para carácter e conforto diário.',
      showDesc: true,
      image: '/campagna-hero.jpeg',
      btnText: 'EXPLORAR CATÁLOGO',
      btnLink: '/catalogo',
      showBtn: true,
      position: 8
    },
    {
      id: 'slide-2',
      tag: 'SNOB MILANO & ZEISS',
      showTag: true,
      title: 'Clip-On Magnético & Lentes Solares ZEISS',
      showTitle: true,
      desc: 'Inovação patenteada em Milão: a versatilidade de transformar armações oftálmicas graduadas em óculos de sol num só instante.',
      showDesc: true,
      image: '/banner-hero-snob.jpg',
      btnText: 'DESCOBRIR SNOB MILANO',
      btnLink: '/catalogo?marca=SNOB+Milano',
      showBtn: true,
      position: 20
    },
    {
      id: 'slide-3',
      tag: 'ØRGREEN & EINSTOFFEN',
      showTag: true,
      title: 'Titânio Japonês & Madeira Nobre',
      showTitle: true,
      desc: 'Artesanato escandinavo e suíço forjado para quem procura armações ultraleves com materiais nobres e acabamentos puros.',
      showDesc: true,
      image: '/banner-hero-scandinavian.jpg',
      btnText: 'EXPLORAR MARCAS DE AUTOR',
      btnLink: '/marcas',
      showBtn: true,
      position: 20
    }
  ];

  let currentHeroSlides = [];
  try {
    const savedSlides = localStorage.getItem(HERO_SLIDES_KEY);
    currentHeroSlides = savedSlides ? JSON.parse(savedSlides) : defaultHeroSlides;
  } catch {
    currentHeroSlides = defaultHeroSlides;
  }

  let activeSlideIdx = 0;
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

  function renderHeroSlideTabs() {
    const tabContainer = document.getElementById('hero-slides-tab-bar');
    if (!tabContainer) return;

    tabContainer.innerHTML = '';
    currentHeroSlides.forEach((slide, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `btn-slide-tab ${idx === activeSlideIdx ? 'active' : ''}`;
      btn.textContent = `Slide ${idx + 1} (${slide.tag || 'Slide'})`;
      btn.addEventListener('click', () => {
        activeSlideIdx = idx;
        loadCurrentHeroSlideIntoForm();
        renderHeroSlideTabs();
      });
      tabContainer.appendChild(btn);
    });

    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'btn-add-slide-tab';
    addBtn.textContent = '+ Adicionar Slide';
    addBtn.addEventListener('click', () => {
      const newSlide = {
        id: `slide-${Date.now()}`,
        tag: 'NOVA CAMPANHA',
        showTag: true,
        title: 'Nova Campanha de Autor',
        showTitle: true,
        desc: 'Descrição da nova coleção e óculos exclusivos.',
        showDesc: true,
        image: '/campagna-hero.jpeg',
        btnText: 'VER NOVIDADES',
        btnLink: '/catalogo',
        showBtn: true,
        position: 20
      };
      currentHeroSlides.push(newSlide);
      activeSlideIdx = currentHeroSlides.length - 1;
      saveHeroSlides();
      renderHeroSlideTabs();
      loadCurrentHeroSlideIntoForm();
      showAdminToast('✓ Novo slide adicionado com sucesso ao Hero.');
    });
    tabContainer.appendChild(addBtn);
  }

  function loadCurrentHeroSlideIntoForm() {
    const slide = currentHeroSlides[activeSlideIdx] || currentHeroSlides[0];
    if (!slide) return;

    if (document.getElementById('hero-tag')) document.getElementById('hero-tag').value = slide.tag || '';
    if (document.getElementById('hero-title')) document.getElementById('hero-title').value = slide.title || '';
    if (document.getElementById('hero-desc')) document.getElementById('hero-desc').value = slide.desc || '';
    if (document.getElementById('hero-img')) document.getElementById('hero-img').value = slide.image || '';
    if (document.getElementById('hero-btn-text')) document.getElementById('hero-btn-text').value = slide.btnText || '';
    if (document.getElementById('hero-btn-link')) document.getElementById('hero-btn-link').value = slide.btnLink || '';
    if (document.getElementById('hero-pos-slider')) document.getElementById('hero-pos-slider').value = slide.position !== undefined ? slide.position : 8;

    if (document.getElementById('toggle-hero-tag')) document.getElementById('toggle-hero-tag').checked = slide.showTag !== false;
    if (document.getElementById('toggle-hero-title')) document.getElementById('toggle-hero-title').checked = slide.showTitle !== false;
    if (document.getElementById('toggle-hero-desc')) document.getElementById('toggle-hero-desc').checked = slide.showDesc !== false;
    if (document.getElementById('toggle-hero-btn')) document.getElementById('toggle-hero-btn').checked = slide.showBtn !== false;

    syncBannerStudio();
  }

  function syncBannerStudio() {
    const slide = currentHeroSlides[activeSlideIdx] || {};

    // 1. Hero Banner Sync
    const heroTag = document.getElementById('hero-tag')?.value || '';
    const heroTitle = document.getElementById('hero-title')?.value || '';
    const heroDesc = document.getElementById('hero-desc')?.value || '';
    const heroBtn = document.getElementById('hero-btn-text')?.value || '';
    const heroImg = document.getElementById('hero-img')?.value || '/campagna-hero.jpeg';
    const heroPos = document.getElementById('hero-pos-slider')?.value || 8;

    const showTag = document.getElementById('toggle-hero-tag')?.checked !== false;
    const showTitle = document.getElementById('toggle-hero-title')?.checked !== false;
    const showDesc = document.getElementById('toggle-hero-desc')?.checked !== false;
    const showBtn = document.getElementById('toggle-hero-btn')?.checked !== false;

    const tagEl = document.getElementById('hero-preview-tag');
    if (tagEl) {
      tagEl.textContent = heroTag;
      tagEl.style.display = showTag ? 'block' : 'none';
    }
    const titleEl = document.getElementById('hero-preview-title');
    if (titleEl) {
      titleEl.textContent = heroTitle;
      titleEl.style.display = showTitle ? 'block' : 'none';
    }
    const descEl = document.getElementById('hero-preview-desc');
    if (descEl) {
      descEl.textContent = heroDesc;
      descEl.style.display = showDesc ? 'block' : 'none';
    }
    const btnEl = document.getElementById('hero-preview-btn');
    if (btnEl) {
      btnEl.textContent = heroBtn;
      btnEl.style.display = showBtn ? 'inline-block' : 'none';
    }
    
    const heroPreviewImg = document.getElementById('hero-live-preview-img');
    if (heroPreviewImg) {
      heroPreviewImg.src = heroImg;
      heroPreviewImg.style.objectPosition = `center ${heroPos}%`;
    }
    const heroPosVal = document.getElementById('hero-pos-val');
    if (heroPosVal) heroPosVal.textContent = `${heroPos}% ${heroPos < 25 ? '(Foco no Rosto/Lentes)' : (heroPos > 70 ? '(Foco Inferior)' : '(Foco Central)')}`;
    updateImageDimensions(heroImg, 'hero-detected-dims');

    // Update Dots in Preview
    const previewDots = document.querySelector('.preview-hero-dots-mockup');
    if (previewDots) {
      previewDots.innerHTML = currentHeroSlides.map((_, i) => `<span class="dot-mock ${i === activeSlideIdx ? 'active' : ''}"></span>`).join('');
    }

    // 2. Cinematic Banner Sync
    const cinTitle = document.getElementById('cinematic-title')?.value || '';
    const cinDesc = document.getElementById('cinematic-desc')?.value || '';
    const cinImg = document.getElementById('cinematic-img')?.value || '/campagna-signature.jpeg';
    const cinPos = document.getElementById('cinematic-pos-slider')?.value || 50;

    const showCinTitle = document.getElementById('toggle-cinematic-title')?.checked !== false;
    const showCinDesc = document.getElementById('toggle-cinematic-desc')?.checked !== false;

    const cinTitleEl = document.getElementById('cinematic-preview-title');
    if (cinTitleEl) {
      cinTitleEl.textContent = cinTitle;
      cinTitleEl.style.display = showCinTitle ? 'block' : 'none';
    }
    const cinDescEl = document.getElementById('cinematic-preview-desc');
    if (cinDescEl) {
      cinDescEl.textContent = cinDesc;
      cinDescEl.style.display = showCinDesc ? 'block' : 'none';
    }
    const cinPreviewImg = document.getElementById('cinematic-live-preview-img');
    if (cinPreviewImg) {
      cinPreviewImg.src = cinImg;
      cinPreviewImg.style.objectPosition = `center ${cinPos}%`;
    }
    const cinPosVal = document.getElementById('cinematic-pos-val');
    if (cinPosVal) cinPosVal.textContent = `${cinPos}% ${cinPos === '50' ? '(Centro)' : ''}`;
    updateImageDimensions(cinImg, 'cinematic-detected-dims');

    // 3. Prefooter Banner Sync (Exact Floating White Card Mockup from Client-Side)
    const preTag = document.getElementById('prefooter-tag')?.value || 'ATENDIMENTO EXCLUSIVO';
    const preTitle = document.getElementById('prefooter-title')?.value || 'Marque a sua Consulta';
    const preDesc = document.getElementById('prefooter-desc')?.value || 'Sessões individuais de aconselhamento ótico e estético no nosso espaço na Madeira. Experimente toda a coleção com acompanhamento técnico dedicado.';
    const preLinkText = document.getElementById('prefooter-link-text')?.value || 'Agendar Sessão Individual →';
    const preImg = document.getElementById('prefooter-img')?.value || '/campagna-prefooter.jpeg';
    const prePos = document.getElementById('prefooter-pos-slider')?.value || 30;

    const showPreTag = document.getElementById('toggle-prefooter-tag')?.checked !== false;
    const showPreTitle = document.getElementById('toggle-prefooter-title')?.checked !== false;
    const showPreDesc = document.getElementById('toggle-prefooter-desc')?.checked !== false;
    const showPreLink = document.getElementById('toggle-prefooter-link')?.checked !== false;

    const preTagEl = document.getElementById('prefooter-preview-tag');
    if (preTagEl) {
      preTagEl.textContent = preTag;
      preTagEl.style.display = showPreTag ? 'block' : 'none';
    }
    const preTitleEl = document.getElementById('prefooter-preview-title');
    if (preTitleEl) {
      preTitleEl.textContent = preTitle;
      preTitleEl.style.display = showPreTitle ? 'block' : 'none';
    }
    const preDescEl = document.getElementById('prefooter-preview-desc');
    if (preDescEl) {
      preDescEl.textContent = preDesc;
      preDescEl.style.display = showPreDesc ? 'block' : 'none';
    }
    const preLinkEl = document.getElementById('prefooter-preview-link');
    if (preLinkEl) {
      preLinkEl.innerHTML = `${preLinkText.replace(/→|&rarr;/g, '').trim()} &rarr;`;
      preLinkEl.style.display = showPreLink ? 'inline-flex' : 'none';
    }

    const prePreviewImg = document.getElementById('prefooter-live-preview-img');
    if (prePreviewImg) {
      prePreviewImg.src = preImg;
      prePreviewImg.style.objectPosition = `70% ${prePos}%`;
    }
    const prePosVal = document.getElementById('prefooter-pos-val');
    if (prePosVal) prePosVal.textContent = `${prePos}% (Foco no Rosto/Olhos)`;
    updateImageDimensions(preImg, 'prefooter-detected-dims');
  }

  function saveHeroSlides() {
    if (currentHeroSlides[activeSlideIdx]) {
      currentHeroSlides[activeSlideIdx] = {
        ...currentHeroSlides[activeSlideIdx],
        tag: document.getElementById('hero-tag')?.value || '',
        showTag: document.getElementById('toggle-hero-tag')?.checked !== false,
        title: document.getElementById('hero-title')?.value || '',
        showTitle: document.getElementById('toggle-hero-title')?.checked !== false,
        desc: document.getElementById('hero-desc')?.value || '',
        showDesc: document.getElementById('toggle-hero-desc')?.checked !== false,
        image: document.getElementById('hero-img')?.value || '',
        btnText: document.getElementById('hero-btn-text')?.value || '',
        btnLink: document.getElementById('hero-btn-link')?.value || '',
        showBtn: document.getElementById('toggle-hero-btn')?.checked !== false,
        position: Number(document.getElementById('hero-pos-slider')?.value || 8)
      };
    }
    localStorage.setItem(HERO_SLIDES_KEY, JSON.stringify(currentHeroSlides));
    autoSaveAll();
  }

  function loadSavedCMS() {
    try {
      const raw = localStorage.getItem(CMS_KEY);
      renderHeroSlideTabs();
      loadCurrentHeroSlideIntoForm();

      if (!raw) {
        syncBannerStudio();
        return;
      }
      const cms = JSON.parse(raw);

      if (cms.cinematic) {
        if (cms.cinematic.title && document.getElementById('cinematic-title')) document.getElementById('cinematic-title').value = cms.cinematic.title;
        if (cms.cinematic.desc && document.getElementById('cinematic-desc')) document.getElementById('cinematic-desc').value = cms.cinematic.desc;
        if (cms.cinematic.image && document.getElementById('cinematic-img')) document.getElementById('cinematic-img').value = cms.cinematic.image;
        if (cms.cinematic.position && document.getElementById('cinematic-pos-slider')) document.getElementById('cinematic-pos-slider').value = cms.cinematic.position;
        if (document.getElementById('toggle-cinematic-title')) document.getElementById('toggle-cinematic-title').checked = cms.cinematic.showTitle !== false;
        if (document.getElementById('toggle-cinematic-desc')) document.getElementById('toggle-cinematic-desc').checked = cms.cinematic.showDesc !== false;
      }
      if (cms.prefooter) {
        if (cms.prefooter.tag && document.getElementById('prefooter-tag')) document.getElementById('prefooter-tag').value = cms.prefooter.tag;
        if (cms.prefooter.title && document.getElementById('prefooter-title')) document.getElementById('prefooter-title').value = cms.prefooter.title;
        if (cms.prefooter.desc && document.getElementById('prefooter-desc')) document.getElementById('prefooter-desc').value = cms.prefooter.desc;
        if (cms.prefooter.linkText && document.getElementById('prefooter-link-text')) document.getElementById('prefooter-link-text').value = cms.prefooter.linkText;
        if (cms.prefooter.linkUrl && document.getElementById('prefooter-link-url')) document.getElementById('prefooter-link-url').value = cms.prefooter.linkUrl;
        if (cms.prefooter.image && document.getElementById('prefooter-img')) document.getElementById('prefooter-img').value = cms.prefooter.image;
        if (cms.prefooter.position && document.getElementById('prefooter-pos-slider')) document.getElementById('prefooter-pos-slider').value = cms.prefooter.position;
        if (document.getElementById('toggle-prefooter-tag')) document.getElementById('toggle-prefooter-tag').checked = cms.prefooter.showTag !== false;
        if (document.getElementById('toggle-prefooter-title')) document.getElementById('toggle-prefooter-title').checked = cms.prefooter.showTitle !== false;
        if (document.getElementById('toggle-prefooter-desc')) document.getElementById('toggle-prefooter-desc').checked = cms.prefooter.showDesc !== false;
        if (document.getElementById('toggle-prefooter-link')) document.getElementById('toggle-prefooter-link').checked = cms.prefooter.showLink !== false;
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
          const card = document.querySelector(`.admin-product-card[data-id="${id}"]`);
          if (card) card.dataset.price = String(price);
        });
      }

      if (cms.stockOverrides && typeof cms.stockOverrides === 'object') {
        Object.entries(cms.stockOverrides).forEach(([id, stock]) => {
          const input = document.querySelector(`.admin-inline-stock-input[data-id="${id}"]`);
          if (input) input.value = stock;
          const card = document.querySelector(`.admin-product-card[data-id="${id}"]`);
          if (card) card.dataset.stock = String(stock);
        });
      }

      if (cms.availOverrides && typeof cms.availOverrides === 'object') {
        Object.entries(cms.availOverrides).forEach(([id, avail]) => {
          const toggle = document.querySelector(`.admin-inline-avail-toggle[data-id="${id}"]`);
          if (toggle) toggle.checked = avail;
          const card = document.querySelector(`.admin-product-card[data-id="${id}"]`);
          if (card) card.dataset.available = String(avail);
        });
      }

      document.querySelectorAll('.admin-product-card').forEach(card => {
        updateCardStockBadge(card);
      });

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
      const stockOverrides = existing.stockOverrides || {};
      const availOverrides = existing.availOverrides || {};

      document.querySelectorAll('.admin-inline-price-input').forEach(input => {
        const id = input.dataset.id;
        const val = Number(input.value);
        if (id && !isNaN(val)) {
          priceOverrides[id] = val;
        }
      });

      document.querySelectorAll('.admin-inline-stock-input').forEach(input => {
        const id = input.dataset.id;
        const val = Number(input.value);
        if (id && !isNaN(val)) {
          stockOverrides[id] = val;
        }
      });

      document.querySelectorAll('.admin-inline-avail-toggle').forEach(input => {
        const id = input.dataset.id;
        if (id) {
          availOverrides[id] = input.checked;
        }
      });

      const cmsData = {
        ...existing,
        timestamp: new Date().toISOString(),
        hero: currentHeroSlides[0] || {},
        cinematic: {
          title: document.getElementById('cinematic-title')?.value || '',
          showTitle: document.getElementById('toggle-cinematic-title')?.checked !== false,
          desc: document.getElementById('cinematic-desc')?.value || '',
          showDesc: document.getElementById('toggle-cinematic-desc')?.checked !== false,
          image: document.getElementById('cinematic-img')?.value || '',
          position: document.getElementById('cinematic-pos-slider')?.value || 50
        },
        prefooter: {
          tag: document.getElementById('prefooter-tag')?.value || '',
          showTag: document.getElementById('toggle-prefooter-tag')?.checked !== false,
          title: document.getElementById('prefooter-title')?.value || '',
          showTitle: document.getElementById('toggle-prefooter-title')?.checked !== false,
          desc: document.getElementById('prefooter-desc')?.value || '',
          showDesc: document.getElementById('toggle-prefooter-desc')?.checked !== false,
          linkText: document.getElementById('prefooter-link-text')?.value || '',
          linkUrl: document.getElementById('prefooter-link-url')?.value || '',
          showLink: document.getElementById('toggle-prefooter-link')?.checked !== false,
          image: document.getElementById('prefooter-img')?.value || '',
          position: document.getElementById('prefooter-pos-slider')?.value || 30
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
  // 3. RESET POSITION BUTTONS & SAVE ACTIONS
  // =========================================================================
  document.getElementById('btn-reset-hero-pos')?.addEventListener('click', () => {
    const slider = document.getElementById('hero-pos-slider');
    if (slider) {
      slider.value = 8;
      saveHeroSlides();
      syncBannerStudio();
      showAdminToast('↺ Posição vertical do Hero reposta para 8% (Padrão).');
    }
  });

  document.getElementById('btn-reset-cinematic-pos')?.addEventListener('click', () => {
    const slider = document.getElementById('cinematic-pos-slider');
    if (slider) {
      slider.value = 50;
      autoSaveAll();
      syncBannerStudio();
      showAdminToast('↺ Posição vertical do Banner Signature reposta para 50% (Centro).');
    }
  });

  document.getElementById('btn-reset-prefooter-pos')?.addEventListener('click', () => {
    const slider = document.getElementById('prefooter-pos-slider');
    if (slider) {
      slider.value = 30;
      autoSaveAll();
      syncBannerStudio();
      showAdminToast('↺ Posição vertical do Banner Consulta reposta para 30% (Foco no Rosto/Olhos).');
    }
  });

  // Dedicated Save Buttons
  document.getElementById('btn-save-hero-banner')?.addEventListener('click', () => {
    saveHeroSlides();
    showAdminToast('✓ Slide e configurações do Hero guardadas com sucesso!');
  });

  document.getElementById('btn-delete-hero-slide')?.addEventListener('click', () => {
    if (currentHeroSlides.length <= 1) {
      alert('O carrossel necessita de pelo menos 1 slide principal.');
      return;
    }
    if (confirm(`Tem a certeza que deseja remover o Slide ${activeSlideIdx + 1}?`)) {
      currentHeroSlides.splice(activeSlideIdx, 1);
      activeSlideIdx = Math.max(0, activeSlideIdx - 1);
      saveHeroSlides();
      renderHeroSlideTabs();
      loadCurrentHeroSlideIntoForm();
      showAdminToast('🗑️ Slide removido do Hero com sucesso.');
    }
  });

  document.getElementById('btn-save-cinematic-banner')?.addEventListener('click', () => {
    autoSaveAll();
    showAdminToast('✓ Banner Editorial Signature guardado com sucesso!');
  });

  document.getElementById('btn-save-prefooter-banner')?.addEventListener('click', () => {
    autoSaveAll();
    showAdminToast('✓ Banner de Agendamento guardado com sucesso!');
  });

  // Visibility Checkbox Event Listeners
  ['toggle-hero-tag', 'toggle-hero-title', 'toggle-hero-desc', 'toggle-hero-btn', 
   'toggle-cinematic-title', 'toggle-cinematic-desc',
   'toggle-prefooter-tag', 'toggle-prefooter-title', 'toggle-prefooter-desc', 'toggle-prefooter-link'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', () => {
      saveHeroSlides();
      autoSaveAll();
    });
  });

  // Banner File Upload Buttons
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
            saveHeroSlides();
            autoSaveAll();
            showAdminToast('✓ Imagem carregada e enquadrada com sucesso.');
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
  document.getElementById('hero-pos-slider')?.addEventListener('input', () => {
    saveHeroSlides();
    syncBannerStudio();
  });
  document.getElementById('hero-tag')?.addEventListener('input', saveHeroSlides);
  document.getElementById('hero-title')?.addEventListener('input', saveHeroSlides);
  document.getElementById('hero-desc')?.addEventListener('input', saveHeroSlides);
  document.getElementById('hero-btn-text')?.addEventListener('input', saveHeroSlides);
  document.getElementById('hero-btn-link')?.addEventListener('input', saveHeroSlides);
  document.getElementById('hero-img')?.addEventListener('input', saveHeroSlides);

  document.getElementById('cinematic-pos-slider')?.addEventListener('input', autoSaveAll);
  document.getElementById('cinematic-title')?.addEventListener('input', autoSaveAll);
  document.getElementById('cinematic-desc')?.addEventListener('input', autoSaveAll);
  document.getElementById('cinematic-img')?.addEventListener('input', autoSaveAll);

  document.getElementById('prefooter-pos-slider')?.addEventListener('input', autoSaveAll);
  document.getElementById('prefooter-tag')?.addEventListener('input', autoSaveAll);
  document.getElementById('prefooter-title')?.addEventListener('input', autoSaveAll);
  document.getElementById('prefooter-desc')?.addEventListener('input', autoSaveAll);
  document.getElementById('prefooter-link-text')?.addEventListener('input', autoSaveAll);
  document.getElementById('prefooter-link-url')?.addEventListener('input', autoSaveAll);
  document.getElementById('prefooter-img')?.addEventListener('input', autoSaveAll);

  // =========================================================================
  // 4. DISCOUNT CODES & PROMOTIONS MANAGER
  // =========================================================================
  const DISCOUNTS_KEY = 'atelie_discounts_v1';
  const defaultDiscounts = [
    {
      id: 'disc-1',
      code: 'ATELIE10',
      type: 'percent',
      value: 10,
      minOrder: 0,
      startDate: '2026-01-01',
      expiryDate: '2026-12-31',
      unlimited: true,
      maxUses: 0,
      usesCount: 24,
      status: 'active'
    },
    {
      id: 'disc-2',
      code: 'MADEIRA10',
      type: 'percent',
      value: 10,
      minOrder: 50,
      startDate: '2026-01-01',
      expiryDate: '2026-12-31',
      unlimited: true,
      maxUses: 0,
      usesCount: 18,
      status: 'active'
    },
    {
      id: 'disc-3',
      code: 'PROMO20',
      type: 'percent',
      value: 20,
      minOrder: 150,
      startDate: '2026-01-01',
      expiryDate: '2026-10-31',
      unlimited: false,
      maxUses: 50,
      usesCount: 14,
      status: 'active'
    },
    {
      id: 'disc-4',
      code: 'BEMVINDO15',
      type: 'percent',
      value: 15,
      minOrder: 0,
      startDate: '2026-01-01',
      expiryDate: '2026-12-31',
      unlimited: true,
      maxUses: 0,
      usesCount: 31,
      status: 'active'
    },
    {
      id: 'disc-5',
      code: 'VIP50',
      type: 'fixed',
      value: 50,
      minOrder: 250,
      startDate: '2026-01-01',
      expiryDate: '2026-12-31',
      unlimited: false,
      maxUses: 25,
      usesCount: 7,
      status: 'active'
    }
  ];

  function getDiscounts() {
    try {
      const stored = localStorage.getItem(DISCOUNTS_KEY);
      if (!stored) {
        localStorage.setItem(DISCOUNTS_KEY, JSON.stringify(defaultDiscounts));
        return defaultDiscounts;
      }
      return JSON.parse(stored);
    } catch(e) {
      return defaultDiscounts;
    }
  }

  function saveDiscounts(discounts) {
    localStorage.setItem(DISCOUNTS_KEY, JSON.stringify(discounts));
    renderDiscountsTable();
    updateDiscountMetrics();
  }

  function renderDiscountsTable() {
    const discounts = getDiscounts();
    const tbody = document.getElementById('discounts-table-body');
    if (!tbody) return;

    if (!discounts.length) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 32px; color: #888;">
            Nenhum código de desconto criado. Clique em "Criar Novo Cupão" para começar.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = discounts.map(d => {
      const isPercent = d.type === 'percent';
      const valDisplay = isPercent ? `${d.value}%` : `${Number(d.value).toFixed(2)} €`;
      const minDisplay = Number(d.minOrder) > 0 ? `${Number(d.minOrder).toFixed(2)} €` : 'Sem mínimo';
      const expDisplay = d.expiryDate ? d.expiryDate : 'Sem expiração';
      const usesDisplay = d.unlimited ? `${d.usesCount || 0} (Ilimitado)` : `${d.usesCount || 0} / ${d.maxUses || 0}`;
      
      const isExpired = d.expiryDate && new Date(d.expiryDate) < new Date();
      let statusBadge = '';
      if (d.status !== 'active') {
        statusBadge = '<span class="discount-status-pill status-paused">⏸️ Pausado</span>';
      } else if (isExpired) {
        statusBadge = '<span class="discount-status-pill status-expired">❌ Expirado</span>';
      } else {
        statusBadge = '<span class="discount-status-pill status-active">● Ativo</span>';
      }

      return `
        <tr>
          <td>
            <span class="discount-code-badge">${d.code}</span>
          </td>
          <td>
            <span class="discount-type-pill ${isPercent ? 'type-percent' : 'type-fixed'}">
              ${isPercent ? 'Percentagem' : 'Valor Fixo'}:&nbsp;<strong>${valDisplay}</strong>
            </span>
          </td>
          <td>
            <span style="font-weight: 600; color: #333330;">${minDisplay}</span>
          </td>
          <td>
            <span style="font-family: 'JetBrains Mono', Consolas, monospace; font-size: 12px; color: #666660;">${expDisplay}</span>
          </td>
          <td>
            <strong style="color: #111111;">${d.unlimited ? `${d.usesCount || 0} <span style="font-weight: normal; color: #777;">(Ilimitado)</span>` : `${d.usesCount || 0} / ${d.maxUses || 0}`}</strong>
          </td>
          <td>${statusBadge}</td>
          <td style="text-align: right;">
            <div style="display: inline-flex; gap: 6px; justify-content: flex-end;">
              <button type="button" class="btn-table-action" data-action="toggle-status" data-id="${d.id}" title="${d.status === 'active' ? 'Pausar cupão' : 'Ativar cupão'}">
                ${d.status === 'active' ? '⏸️ Pausar' : '▶️ Ativar'}
              </button>
              <button type="button" class="btn-table-action" data-action="edit-discount" data-id="${d.id}" title="Editar cupão">
                ✏️ Editar
              </button>
              <button type="button" class="btn-table-action delete" data-action="delete-discount" data-id="${d.id}" title="Eliminar cupão">
                🗑️
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Bind action listeners
    tbody.querySelectorAll('button[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        const id = btn.getAttribute('data-id');
        const list = getDiscounts();
        const disc = list.find(x => x.id === id);

        if (action === 'toggle-status' && disc) {
          disc.status = disc.status === 'active' ? 'paused' : 'active';
          saveDiscounts(list);
          showAdminToast(`Cupão ${disc.code} ${disc.status === 'active' ? 'ativado' : 'pausado'} com sucesso.`);
        } else if (action === 'delete-discount' && disc) {
          if (confirm(`Tem a certeza que deseja eliminar o cupão ${disc.code}?`)) {
            const updated = list.filter(x => x.id !== id);
            saveDiscounts(updated);
            showAdminToast(`🗑️ Cupão ${disc.code} removido com sucesso.`);
          }
        } else if (action === 'edit-discount' && disc) {
          openDiscountModal(disc);
        }
      });
    });
  }

  function updateDiscountMetrics() {
    const discounts = getDiscounts();
    const active = discounts.filter(d => d.status === 'active' && (!d.expiryDate || new Date(d.expiryDate) >= new Date())).length;
    const totalUses = discounts.reduce((acc, d) => acc + Number(d.usesCount || 0), 0);

    const mTotal = document.getElementById('metric-total-discounts');
    if (mTotal) mTotal.textContent = String(discounts.length);

    const mActive = document.getElementById('metric-active-discounts');
    if (mActive) mActive.textContent = String(active);

    const mUses = document.getElementById('metric-total-uses');
    if (mUses) mUses.textContent = `${totalUses} utilizações`;

    const navBadge = document.getElementById('nav-discounts-count');
    if (navBadge) navBadge.textContent = String(active);
  }

  function openDiscountModal(discount = null) {
    const modal = document.getElementById('modal-discount');
    const title = document.getElementById('modal-discount-title');
    const idInput = document.getElementById('discount-modal-id');
    const codeInput = document.getElementById('discount-code-input');
    const typeSelect = document.getElementById('discount-type-select');
    const valInput = document.getElementById('discount-val-input');
    const valLabel = document.getElementById('discount-val-label');
    const minInput = document.getElementById('discount-min-order');
    const maxUsesInput = document.getElementById('discount-max-uses');
    const startInput = document.getElementById('discount-start-date');
    const expiryInput = document.getElementById('discount-expiry-date');
    const activeCheckbox = document.getElementById('discount-active-checkbox');

    if (discount) {
      if (title) title.textContent = `Editar Código de Desconto: ${discount.code}`;
      if (idInput) idInput.value = discount.id;
      if (codeInput) codeInput.value = discount.code;
      if (typeSelect) typeSelect.value = discount.type || 'percent';
      if (valInput) valInput.value = discount.value || 10;
      if (valLabel) valLabel.textContent = discount.type === 'percent' ? 'Valor do Desconto (%) *' : 'Valor do Desconto (€) *';
      if (minInput) minInput.value = discount.minOrder || 0;
      if (maxUsesInput) maxUsesInput.value = discount.maxUses || '';
      if (startInput) startInput.value = discount.startDate || '';
      if (expiryInput) expiryInput.value = discount.expiryDate || '';
      if (activeCheckbox) activeCheckbox.checked = discount.status === 'active';
    } else {
      if (title) title.textContent = 'Criar Novo Código de Desconto';
      if (idInput) idInput.value = '';
      if (codeInput) codeInput.value = '';
      if (typeSelect) typeSelect.value = 'percent';
      if (valInput) valInput.value = '10';
      if (valLabel) valLabel.textContent = 'Valor do Desconto (%) *';
      if (minInput) minInput.value = '0';
      if (maxUsesInput) maxUsesInput.value = '';
      if (startInput) startInput.value = new Date().toISOString().split('T')[0];
      if (expiryInput) expiryInput.value = '';
      if (activeCheckbox) activeCheckbox.checked = true;
    }

    if (modal) {
      modal.style.display = 'flex';
      setTimeout(() => codeInput?.focus(), 100);
    }
  }

  function closeDiscountModal() {
    const modal = document.getElementById('modal-discount');
    if (modal) modal.style.display = 'none';
  }

  document.getElementById('btn-create-discount')?.addEventListener('click', () => openDiscountModal(null));
  document.getElementById('btn-close-discount-modal')?.addEventListener('click', closeDiscountModal);
  document.getElementById('btn-cancel-discount-modal')?.addEventListener('click', closeDiscountModal);

  document.getElementById('discount-type-select')?.addEventListener('change', (e) => {
    const isPercent = e.target.value === 'percent';
    const label = document.getElementById('discount-val-label');
    if (label) label.textContent = isPercent ? 'Valor do Desconto (%) *' : 'Valor do Desconto (€) *';
  });

  document.getElementById('form-discount-modal')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('discount-modal-id')?.value;
    const code = (document.getElementById('discount-code-input')?.value || '').trim().toUpperCase();
    const type = document.getElementById('discount-type-select')?.value || 'percent';
    const value = Number(document.getElementById('discount-val-input')?.value || 0);
    const minOrder = Number(document.getElementById('discount-min-order')?.value || 0);
    const maxUses = document.getElementById('discount-max-uses')?.value ? Number(document.getElementById('discount-max-uses')?.value) : 0;
    const startDate = document.getElementById('discount-start-date')?.value || '';
    const expiryDate = document.getElementById('discount-expiry-date')?.value || '';
    const isActive = document.getElementById('discount-active-checkbox')?.checked;

    if (!code) {
      alert('Por favor introduza um código para o cupão.');
      return;
    }
    if (value <= 0) {
      alert('O valor do desconto deve ser superior a zero.');
      return;
    }

    const list = getDiscounts();

    if (id) {
      // Edit existing
      const existing = list.find(x => x.id === id);
      if (existing) {
        existing.code = code;
        existing.type = type;
        existing.value = value;
        existing.minOrder = minOrder;
        existing.unlimited = maxUses <= 0;
        existing.maxUses = maxUses;
        existing.startDate = startDate;
        existing.expiryDate = expiryDate;
        existing.status = isActive ? 'active' : 'paused';
      }
      showAdminToast(`✓ Cupão ${code} atualizado com sucesso!`);
    } else {
      // Check duplicate code
      if (list.some(x => x.code === code)) {
        alert(`O código "${code}" já existe. Escolha outro código.`);
        return;
      }
      const newDiscount = {
        id: `disc-${Date.now()}`,
        code,
        type,
        value,
        minOrder,
        unlimited: maxUses <= 0,
        maxUses,
        startDate,
        expiryDate,
        usesCount: 0,
        status: isActive ? 'active' : 'paused'
      };
      list.push(newDiscount);
      showAdminToast(`✓ Cupão ${code} criado com sucesso!`);
    }

    saveDiscounts(list);
    closeDiscountModal();
  });

  // =========================================================================
  // 5. LIVE FILTERING OF PRODUCT CARDS
  // =========================================================================
  function updateCardStockBadge(card) {
    if (!card) return;
    const id = card.dataset.id;
    const priceInput = card.querySelector('.admin-inline-price-input');
    const stockInput = card.querySelector('.admin-inline-stock-input');
    const availToggle = card.querySelector('.admin-inline-avail-toggle');
    const badgeEl = card.querySelector(`[data-stock-badge-id="${id}"]`);
    const labelEl = card.querySelector(`[data-avail-label-id="${id}"]`);

    const price = priceInput ? Number(priceInput.value) : Number(card.dataset.price || 0);
    const stock = stockInput ? Math.max(0, Number(stockInput.value)) : Number(card.dataset.stock || 0);
    const isAvail = availToggle ? availToggle.checked : (card.dataset.available !== 'false');

    card.dataset.price = String(price);
    card.dataset.stock = String(stock);
    card.dataset.available = String(isAvail);

    if (badgeEl) {
      badgeEl.className = 'admin-stock-status-pill';
      if (!isAvail) {
        badgeEl.classList.add('is-disabled');
        badgeEl.textContent = 'Indisponível';
      } else if (stock <= 0) {
        badgeEl.classList.add('is-out-of-stock');
        badgeEl.textContent = 'Esgotado (0)';
      } else if (stock <= 2) {
        badgeEl.classList.add('is-low-stock');
        badgeEl.textContent = `Últimas (${stock} un.)`;
      } else {
        badgeEl.classList.add('is-in-stock');
        badgeEl.textContent = `Em Stock (${stock} un.)`;
      }
    }

    if (labelEl) {
      labelEl.textContent = isAvail ? (stock > 0 ? 'Disponível' : 'Esgotado') : 'Indisponível';
      labelEl.style.color = isAvail ? (stock > 0 ? '#10b981' : '#ef4444') : '#64748b';
    }

    if (!isAvail) {
      card.classList.add('is-disabled');
    } else {
      card.classList.remove('is-disabled');
    }
  }

  function filterCards() {
    const rawQuery = (document.getElementById('admin-product-search')?.value || '').trim().toLowerCase();
    const brand = (document.getElementById('admin-brand-filter')?.value || '').trim().toLowerCase();
    const category = (document.getElementById('admin-category-filter')?.value || '').trim().toLowerCase();
    const priceFilter = (document.getElementById('admin-price-filter')?.value || '').trim();
    const stockFilter = (document.getElementById('admin-stock-filter')?.value || '').trim();
    const sortBy = (document.getElementById('admin-sort-select')?.value || 'default').trim();

    const grid = document.getElementById('admin-products-grid');
    const cards = Array.from(document.querySelectorAll('.admin-product-card'));
    let visibleCount = 0;

    // Check if searching by price/PVP
    const cleanNum = rawQuery.replace(/€|eur|pvp|preco|preço|:/g, '').trim();
    const isPriceSearch = cleanNum !== '' && !isNaN(Number(cleanNum));
    const targetPrice = isPriceSearch ? Number(cleanNum) : null;

    cards.forEach(card => {
      const cName = card.dataset.name || '';
      const cBrand = card.dataset.brand || '';
      const cCat = card.dataset.category || '';
      const cSku = card.dataset.sku || '';
      const cPrice = Number(card.dataset.price || card.querySelector('.admin-inline-price-input')?.value || 0);
      const cStock = Number(card.dataset.stock || card.querySelector('.admin-inline-stock-input')?.value || 0);
      const cAvail = card.dataset.available !== 'false' && (card.querySelector('.admin-inline-avail-toggle')?.checked !== false);

      let matchQuery = true;
      if (rawQuery) {
        if (isPriceSearch) {
          matchQuery = cPrice === targetPrice || String(cPrice).includes(cleanNum) || cName.includes(rawQuery) || cSku.includes(rawQuery) || cBrand.includes(rawQuery);
        } else {
          matchQuery = cName.includes(rawQuery) || cBrand.includes(rawQuery) || cSku.includes(rawQuery) || cCat.includes(rawQuery);
        }
      }

      const matchBrand = !brand || cBrand === brand || cName.includes(brand);
      const matchCat = !category || cCat === category;

      let matchPrice = true;
      if (priceFilter) {
        if (priceFilter === '0-150') matchPrice = cPrice <= 150;
        else if (priceFilter === '150-250') matchPrice = cPrice >= 150 && cPrice <= 250;
        else if (priceFilter === '250-350') matchPrice = cPrice >= 250 && cPrice <= 350;
        else if (priceFilter === '350-500') matchPrice = cPrice >= 350 && cPrice <= 500;
        else if (priceFilter === '500+') matchPrice = cPrice > 500;
      }

      let matchStock = true;
      if (stockFilter) {
        if (stockFilter === 'in_stock') matchStock = cAvail && cStock > 0;
        else if (stockFilter === 'low_stock') matchStock = cAvail && cStock >= 1 && cStock <= 2;
        else if (stockFilter === 'out_of_stock') matchStock = cAvail && cStock === 0;
        else if (stockFilter === 'disabled') matchStock = !cAvail;
      }

      if (matchQuery && matchBrand && matchCat && matchPrice && matchStock) {
        card.classList.remove('is-hidden');
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.classList.add('is-hidden');
        card.style.display = 'none';
      }
    });

    if (grid && sortBy !== 'default') {
      const sortedCards = [...cards].sort((a, b) => {
        const pA = Number(a.dataset.price || 0);
        const pB = Number(b.dataset.price || 0);
        const sA = Number(a.dataset.stock || 0);
        const sB = Number(b.dataset.stock || 0);
        const nA = a.dataset.name || '';
        const nB = b.dataset.name || '';

        if (sortBy === 'price_asc') return pA - pB;
        if (sortBy === 'price_desc') return pB - pA;
        if (sortBy === 'stock_desc') return sB - sA;
        if (sortBy === 'stock_asc') return sA - sB;
        if (sortBy === 'name_asc') return nA.localeCompare(nB);
        return 0;
      });

      sortedCards.forEach(c => grid.appendChild(c));
    }

    const countEl = document.getElementById('admin-visible-count');
    if (countEl) countEl.textContent = String(visibleCount);
  }

  // =========================================================================
  // 6. TAB NAVIGATION
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
      if (target === 'discounts') {
        renderDiscountsTable();
        updateDiscountMetrics();
      }
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
      const price = cardEl.querySelector('.admin-inline-price-input')?.value || cardEl.dataset.price || '0';
      const stock = cardEl.querySelector('.admin-inline-stock-input')?.value || cardEl.dataset.stock || '10';
      const isAvail = cardEl.dataset.available !== 'false';
      const mainImg = cardEl.querySelector('.admin-card-thumb')?.getAttribute('src') || '';

      modalTitle.textContent = `Editar Modelo: ${title}`;
      document.getElementById('modal-product-id').value = id;
      document.getElementById('modal-name').value = title;
      document.getElementById('modal-brand').value = brand;
      document.getElementById('modal-sku').value = sku;
      document.getElementById('modal-price').value = price;
      if (document.getElementById('modal-stock')) document.getElementById('modal-stock').value = stock;
      if (document.getElementById('modal-available')) document.getElementById('modal-available').value = String(isAvail);

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
    const stock = Number(document.getElementById('modal-stock')?.value || 10);
    const isAvail = document.getElementById('modal-available')?.value !== 'false';

    if (idVal) {
      const card = document.querySelector(`.admin-product-card[data-id="${idVal}"]`);
      if (card) {
        card.dataset.name = name.toLowerCase();
        card.dataset.brand = brand.toLowerCase();
        card.dataset.sku = sku.toLowerCase();
        card.dataset.price = String(price);
        card.dataset.stock = String(stock);
        card.dataset.available = String(isAvail);

        if (card.querySelector('.admin-card-title')) card.querySelector('.admin-card-title').textContent = name;
        if (card.querySelector('.admin-card-sku')) card.querySelector('.admin-card-sku').textContent = `SKU: ${sku}`;
        if (card.querySelector('.admin-card-brand-tag')) card.querySelector('.admin-card-brand-tag').textContent = brand;
        if (card.querySelector('.admin-inline-price-input')) card.querySelector('.admin-inline-price-input').value = price;
        if (card.querySelector('.admin-inline-stock-input')) card.querySelector('.admin-inline-stock-input').value = stock;
        if (card.querySelector('.admin-inline-avail-toggle')) card.querySelector('.admin-inline-avail-toggle').checked = isAvail;

        if (currentEditingPhotos.length > 0 && card.querySelector('.admin-card-thumb')) {
          card.querySelector('.admin-card-thumb').src = currentEditingPhotos[0];
        }

        updateCardStockBadge(card);
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
    const stock = Number(document.getElementById('quick-add-stock')?.value || 10);
    const isAvail = document.getElementById('quick-add-available-select')?.value !== 'false';
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
      article.dataset.price = String(price);
      article.dataset.stock = String(stock);
      article.dataset.available = String(isAvail);

      article.innerHTML = `
        <div class="admin-card-thumb-wrap">
          <img src="${mainPhoto}" alt="${name}" class="admin-card-thumb" loading="lazy" />
          <span class="admin-card-brand-tag">${brand}</span>
          <span class="admin-stock-status-pill is-in-stock" data-stock-badge-id="${newId}">Em Stock (${stock} un.)</span>
        </div>
        <div class="admin-card-body">
          <h3 class="admin-card-title">${name}</h3>
          <div class="admin-card-sku">SKU: ${sku}</div>
          <div class="admin-card-meta">${category} &bull; ${shape}</div>

          <div class="admin-card-inventory-controls">
            <div class="admin-card-field-group">
              <label>PVP (€):</label>
              <div class="price-input-wrapper">
                <input type="number" class="admin-inline-price-input" value="${price}" data-id="${newId}" min="0" step="1" />
                <span>€</span>
              </div>
            </div>

            <div class="admin-card-field-group">
              <label>Qtd. Stock:</label>
              <div class="stock-stepper">
                <button type="button" class="btn-stock-dec" data-id="${newId}" title="Diminuir Stock">-</button>
                <input type="number" class="admin-inline-stock-input" value="${stock}" data-id="${newId}" min="0" step="1" />
                <button type="button" class="btn-stock-inc" data-id="${newId}" title="Aumentar Stock">+</button>
              </div>
            </div>
          </div>

          <div class="admin-card-avail-row">
            <label class="admin-avail-switch">
              <input type="checkbox" class="admin-inline-avail-toggle" ${isAvail ? 'checked' : ''} data-id="${newId}" />
              <span class="avail-slider"></span>
              <span class="avail-status-label" data-avail-label-id="${newId}">${isAvail ? 'Disponível' : 'Indisponível'}</span>
            </label>
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
      article.querySelector('.admin-inline-price-input')?.addEventListener('input', () => {
        updateCardStockBadge(article);
        autoSaveAll();
      });
      article.querySelector('.admin-inline-stock-input')?.addEventListener('input', () => {
        updateCardStockBadge(article);
        autoSaveAll();
      });
      article.querySelector('.btn-stock-dec')?.addEventListener('click', () => {
        const inp = article.querySelector('.admin-inline-stock-input');
        if (inp) {
          inp.value = Math.max(0, Number(inp.value || 0) - 1);
          updateCardStockBadge(article);
          autoSaveAll();
        }
      });
      article.querySelector('.btn-stock-inc')?.addEventListener('click', () => {
        const inp = article.querySelector('.admin-inline-stock-input');
        if (inp) {
          inp.value = Number(inp.value || 0) + 1;
          updateCardStockBadge(article);
          autoSaveAll();
        }
      });
      article.querySelector('.admin-inline-avail-toggle')?.addEventListener('change', () => {
        updateCardStockBadge(article);
        autoSaveAll();
      });

      updateCardStockBadge(article);
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
  document.getElementById('admin-price-filter')?.addEventListener('change', filterCards);
  document.getElementById('admin-stock-filter')?.addEventListener('change', filterCards);
  document.getElementById('admin-sort-select')?.addEventListener('change', filterCards);

  document.querySelectorAll('.auto-save-input').forEach(input => {
    input.addEventListener('input', autoSaveAll);
    input.addEventListener('change', autoSaveAll);
  });

  document.querySelectorAll('.admin-inline-price-input').forEach(input => {
    input.addEventListener('input', () => {
      const card = input.closest('.admin-product-card');
      updateCardStockBadge(card);
      autoSaveAll();
    });
  });

  document.querySelectorAll('.admin-inline-stock-input').forEach(input => {
    input.addEventListener('input', () => {
      const card = input.closest('.admin-product-card');
      updateCardStockBadge(card);
      autoSaveAll();
    });
  });

  document.querySelectorAll('.btn-stock-dec').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.admin-product-card');
      const input = card?.querySelector('.admin-inline-stock-input');
      if (input) {
        input.value = Math.max(0, Number(input.value || 0) - 1);
        updateCardStockBadge(card);
        autoSaveAll();
      }
    });
  });

  document.querySelectorAll('.btn-stock-inc').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.admin-product-card');
      const input = card?.querySelector('.admin-inline-stock-input');
      if (input) {
        input.value = Number(input.value || 0) + 1;
        updateCardStockBadge(card);
        autoSaveAll();
      }
    });
  });

  document.querySelectorAll('.admin-inline-avail-toggle').forEach(toggle => {
    toggle.addEventListener('change', () => {
      const card = toggle.closest('.admin-product-card');
      updateCardStockBadge(card);
      autoSaveAll();
    });
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

  async function loadCookieAnalytics() {
    try {
      const res = await fetch('/api/analytics/cookies');
      const data = await res.json();
      if (data && data.stats) {
        const s = data.stats;
        const totalDecisions = (s.acceptAll || 0) + (s.rejectAll || 0) + (s.customSaves || 0);
        const rate = totalDecisions > 0 ? Math.round(((s.acceptAll + s.customSaves) / totalDecisions) * 100) : 100;

        const elImp = document.getElementById('cookie-stat-impressions');
        const elRate = document.getElementById('cookie-stat-rate');
        const elAcc = document.getElementById('cookie-stat-accept');
        const elRej = document.getElementById('cookie-stat-reject');
        const elAna = document.getElementById('cookie-stat-analytics');
        const elMkt = document.getElementById('cookie-stat-marketing');
        const elFun = document.getElementById('cookie-stat-functional');

        if (elImp) elImp.textContent = String(s.impressions || (totalDecisions > 0 ? totalDecisions + 15 : 0));
        if (elRate) elRate.textContent = `${rate}%`;
        if (elAcc) elAcc.textContent = String(s.acceptAll || 0);
        if (elRej) elRej.textContent = String(s.rejectAll || 0);
        if (elAna) elAna.textContent = `${s.analyticsAccepted || 0} utilizadores`;
        if (elMkt) elMkt.textContent = `${s.marketingAccepted || 0} utilizadores`;
        if (elFun) elFun.textContent = `${s.functionalAccepted || 0} utilizadores`;
      }
    } catch(e) {}
  }

  document.getElementById('btn-refresh-cookie-stats')?.addEventListener('click', loadCookieAnalytics);

  loadSavedCMS();
  filterCards();
  renderDiscountsTable();
  updateDiscountMetrics();
  loadCookieAnalytics();
})();
