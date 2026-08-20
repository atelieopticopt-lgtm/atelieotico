// ==========================================================================
// 1. DRAGGABLE & SMOOTH PRODUCT CAROUSEL CONTROLLER (NOVIDADES)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('[data-carousel-track]');
  const prevBtn = document.querySelector('[data-carousel-prev]');
  const nextBtn = document.querySelector('[data-carousel-next]');

  if (track) {
    const getScrollAmount = () => {
      const card = track.querySelector('.ll-product-card');
      return card ? card.offsetWidth + 16 : 300;
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
      });
    }
  }

  // ==========================================================================
  // 2. HERO MULTI-SLIDE CAROUSEL CONTROLLER WITH PAGINATION DOTS & AUTOPLAY
  // ==========================================================================
  const heroSlider = document.getElementById('hero-slider');
  const slidesWrapper = document.getElementById('hero-slides-wrapper');
  const heroPrevBtn = document.getElementById('hero-prev-btn');
  const heroNextBtn = document.getElementById('hero-next-btn');
  const dotsContainer = document.getElementById('hero-dots-container');

  if (heroSlider && slidesWrapper) {
    // Check if custom slides exist in CMS localStorage
    try {
      const saved = localStorage.getItem('atelie_hero_slides');
      if (saved) {
        const slides = JSON.parse(saved);
        if (Array.isArray(slides) && slides.length > 0) {
          slidesWrapper.innerHTML = slides.map((s, i) => `
            <div class="ll-hero-slide ${i === 0 ? 'active' : ''}" data-hero-slide-id="${s.id}">
              <img
                class="ll-melin-hero-img"
                src="${s.image}"
                alt="${s.title || 'Ateliê Ótico'}"
                loading="${i === 0 ? 'eager' : 'lazy'}"
                style="object-position: center ${s.position !== undefined ? s.position : 8}%;"
              />
              <div class="ll-melin-hero-overlay"></div>
              <div class="ll-melin-hero-content">
                ${s.showTag !== false && s.tag ? `<span class="ll-melin-hero-tag">${s.tag}</span>` : ''}
                ${s.showTitle !== false && s.title ? `<h1 class="ll-melin-hero-title">${s.title}</h1>` : ''}
                ${s.showDesc !== false && s.desc ? `<p class="ll-melin-hero-desc">${s.desc}</p>` : ''}
                ${s.showBtn !== false && s.btnText ? `<a href="${s.btnLink || '/catalogo'}" class="ll-melin-btn">${s.btnText}</a>` : ''}
              </div>
            </div>
          `).join('');

          if (dotsContainer) {
            dotsContainer.innerHTML = slides.map((_, i) => `
              <button
                type="button"
                class="ll-hero-dot ${i === 0 ? 'active' : ''}"
                data-slide-index="${i}"
                aria-label="Ir para o slide ${i + 1}"
              ></button>
            `).join('');
          }
        }
      }
    } catch (e) {
      console.warn('Hero CMS load fallback', e);
    }

    let slides = Array.from(slidesWrapper.querySelectorAll('.ll-hero-slide'));
    let dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.ll-hero-dot')) : [];
    let currentIndex = 0;
    let autoPlayTimer = null;

    function goToSlide(index) {
      if (!slides.length) return;
      slides[currentIndex]?.classList.remove('active');
      dots[currentIndex]?.classList.remove('active');

      currentIndex = (index + slides.length) % slides.length;

      slides[currentIndex]?.classList.add('active');
      dots[currentIndex]?.classList.add('active');
    }

    function startAutoPlay() {
      stopAutoPlay();
      if (slides.length > 1) {
        autoPlayTimer = setInterval(() => {
          goToSlide(currentIndex + 1);
        }, 5500);
      }
    }

    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }

    heroPrevBtn?.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
      startAutoPlay();
    });

    heroNextBtn?.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
      startAutoPlay();
    });

    dotsContainer?.addEventListener('click', (e) => {
      const target = e.target.closest('.ll-hero-dot');
      if (target && target.dataset.slideIndex !== undefined) {
        goToSlide(Number(target.dataset.slideIndex));
        startAutoPlay();
      }
    });

    heroSlider.addEventListener('mouseenter', stopAutoPlay);
    heroSlider.addEventListener('mouseleave', startAutoPlay);

    startAutoPlay();
  }
});
