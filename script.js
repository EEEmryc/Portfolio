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


  const projects = [
    {
      title: "Cookbook",
      description: "Application de gestion de recettes de cuisine développée en Python avec interface Tkinter et base de données SQLite.",
      tags: ["Python", "Tkinter", "SQLite"],
      link: "https://github.com/EEEmryc/Cookbook"
    },
    {
      title: "Refonte Logiciel Accueil",
      description: "Optimisation et refonte d'une application interne d'accueil pour moderniser l'interface et fluidifier le parcours utilisateur.",
      tags: ["Front-end", "WLanguage", "SQL"],
      link: "https://github.com/EEEmryc"
    },
    {
      title: "Projet Digital Show",
      description: "Conception et intégration de sites web vitrines durant un stage d'ingénierie web.",
      tags: ["HTML", "CSS", "JavaScript"],
      link: "https://github.com/EEEmryc"
    }
  ];

  const projectsContainer = document.getElementById('projects-container');

  if (projectsContainer) {
    projectsContainer.innerHTML = projects.map(project => `
      <div class="bento-card" onclick="window.open('${project.link}', '_blank')">
        <div class="bento-card-content">
          <div>
            <span class="bento-tag">${project.tags.join(' • ')}</span>
            <h2>${project.title}</h2>
            <p class="bento-preview">${project.description}</p>
          </div>
          <span class="bento-link">Voir sur GitHub &rarr;</span>
        </div>
      </div>
    `).join('');
  }

});
