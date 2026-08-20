// ==========================================================================
// DRAGGABLE & SMOOTH PRODUCT CAROUSEL CONTROLLER
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('[data-carousel-track]');
  const prevBtn = document.querySelector('[data-carousel-prev]');
  const nextBtn = document.querySelector('[data-carousel-next]');

  if (!track) return;

  // Arrow buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const cardWidth = track.querySelector('.ll-product-card')?.offsetWidth || 320;
      track.scrollBy({ left: -(cardWidth + 20), behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const cardWidth = track.querySelector('.ll-product-card')?.offsetWidth || 320;
      track.scrollBy({ left: cardWidth + 20, behavior: 'smooth' });
    });
  }

  // Mouse Drag to Scroll
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  // Prevent accidental navigation when dragging
  let isDragging = false;
  track.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (isDragging) {
        e.preventDefault();
      }
    });
  });

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    isDragging = false;
    track.classList.add('active');
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener('mouseleave', () => {
    isDown = false;
    setTimeout(() => { isDragging = false; }, 50);
  });

  track.addEventListener('mouseup', () => {
    isDown = false;
    setTimeout(() => { isDragging = false; }, 50);
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    isDragging = true;
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5; // scroll speed multiplier
    track.scrollLeft = scrollLeft - walk;
  });
});
