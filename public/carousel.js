// ==========================================================================
// DRAGGABLE & SMOOTH PRODUCT CAROUSEL CONTROLLER
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('[data-carousel-track]');
  const prevBtn = document.querySelector('[data-carousel-prev]');
  const nextBtn = document.querySelector('[data-carousel-next]');

  if (!track) return;

  const getScrollAmount = () => {
    const card = track.querySelector('.ll-product-card');
    return card ? card.offsetWidth + 16 : 300;
  };

  // Arrow buttons
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
});
