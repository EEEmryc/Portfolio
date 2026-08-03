document.addEventListener('DOMContentLoaded', () => {

  const bentoCards = document.querySelectorAll('.bento-card[data-modal]');
  const closeBtns = document.querySelectorAll('.modal .close');

  bentoCards.forEach(card => {
    card.addEventListener('click', () => {
      const modalId = card.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'block';
      }
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const modal = btn.closest('.modal');
      if (modal) {
        modal.style.display = 'none';
      }
    });
  });

  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });


  let activeIndex = 0;
  const cards = document.querySelectorAll('.category-card');
  const prevBtn = document.getElementById('prevSkillBtn');
  const nextBtn = document.getElementById('nextSkillBtn');

  function updateCarousel() {
    cards.forEach((card) => {
      const cardIndex = parseInt(card.getAttribute('data-index'), 10);
      card.classList.remove('state-center', 'state-left', 'state-right');

      if (cardIndex === activeIndex) {
        card.classList.add('state-center');
      } else if (cardIndex === (activeIndex - 1 + cards.length) % cards.length) {
        card.classList.add('state-left');
      } else {
        card.classList.add('state-right');
      }
    });
  }

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const cardIndex = parseInt(card.getAttribute('data-index'), 10);
      if (cardIndex !== activeIndex) {
        activeIndex = cardIndex;
        updateCarousel();
      }
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      activeIndex = (activeIndex - 1 + cards.length) % cards.length;
      updateCarousel();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      activeIndex = (activeIndex + 1) % cards.length;
      updateCarousel();
    });
  }

  updateCarousel();
});
