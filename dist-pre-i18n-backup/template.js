// Safe, local-only interactions for the static template.
document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[aria-controls]');
  if (!trigger) return;
  const target = document.getElementById(trigger.getAttribute('aria-controls'));
  if (!target) return;
  const expanded = trigger.getAttribute('aria-expanded') === 'true';
  trigger.setAttribute('aria-expanded', String(!expanded));
  target.toggleAttribute('hidden', expanded);
});

document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

// Keep the original Melin carousel and replace only its product imagery.
const catalogTitle = [...document.querySelectorAll('.type-section')]
  .find((element) => element.textContent.trim() === 'Latest Releases');

if (catalogTitle) {
  catalogTitle.textContent = 'O Nosso Catálogo';

  const firstCards = [...document.querySelectorAll('.product-item')].slice(0, 6);
  const wrapper = firstCards[0]?.closest('.swiper-wrapper');

  if (wrapper && firstCards.length) {
    while (wrapper.querySelectorAll('.product-item').length < 14) {
      const source = firstCards[wrapper.querySelectorAll('.product-item').length % firstCards.length];
      const slide = source.closest('.swiper-slide');
      wrapper.appendChild((slide || source).cloneNode(true));
    }
  }

  const cards = [...(wrapper || document).querySelectorAll('.product-item')].slice(0, 14);
  cards.forEach((card, index) => {
    const number = index + 1;
    const base = '/Atelie%20%C3%93ptica/';
    const main = card.querySelector('.product-item__image');
    const hover = card.querySelector('.product-item__hover-image');
    const title = card.querySelector('.product-item__title');

    if (main) {
      main.src = `${base}${number}-1.jpeg`;
      main.srcset = '';
      main.alt = `Modelo Atelie Óptica ${number}, vista principal`;
      main.removeAttribute(':src');
      main.removeAttribute(':srcset');
      main.classList.add('opacity-100');
    }

    if (hover) {
      hover.src = `${base}${number}-2.jpeg`;
      hover.srcset = '';
      hover.alt = `Modelo Atelie Óptica ${number}, vista alternativa`;
      hover.removeAttribute(':src');
      hover.removeAttribute(':srcset');
    }

    if (title) title.textContent = `Modelo Atelie ${String(number).padStart(2, '0')}`;
  });
}
