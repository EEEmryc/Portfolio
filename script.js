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


  const projectsContainer = document.getElementById('projects-container');

  if (projectsContainer) {
    fetch('./projet.txt')
      .then(response => {
        if (!response.ok) {
          throw new Error("Erreur de chargement du fichier projet.txt");
        }
        return response.json();
      })
      .then(projects => {
        projectsContainer.innerHTML = projects.map(project => `
          <div class="bento-card">
            <div class="bento-card-content">
              <div>
                <div style="height: 160px; overflow: hidden; border-radius: 12px; margin-bottom: 1rem; background: rgba(255,255,255,0.02);">
                  <img src="${project.image}" alt="${project.titre}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <span class="bento-tag">${project.date}</span>
                <h2>${project.titre}</h2>
                <p class="bento-preview">${project.descriptionCourte}</p>
              </div>
            </div>
          </div>
        `).join('');
      })
      .catch(error => {
        console.error("Erreur :", error);
      });
  }

});
