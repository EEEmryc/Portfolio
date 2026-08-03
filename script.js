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
      "id": "modal1",
      "titre": "Développement web & Référencement (Digital Show)",
      "date": "Mars 2025",
      "image": "img/digital-show.jpg",
      "descriptionCourte": "Conception de deux sites vitrines et travail d'optimisation SEO.",
      "descriptionLongue": "Projet réalisé lors d'un stage de trois mois validé dans le cadre de mon cursus à l'Université Sorbonne Paris Nord. Réalisation et intégration de deux sites vitrines pour l'entreprise Digital Show : le premier dédié aux costumes lumineux interactifs (led-suit.com) et le second axé sur les prestations techniques événementielles (prestataire-technique-event.com). Ce stage m'a permis d'étudier et de pratiquer la personnalisation en HTML/CSS, tout en travaillant sur l'optimisation SEO (référencement naturel) pour améliorer la visibilité des sites sur les moteurs de recherche."
    },
    {
      "id": "modal2",
      "titre": "Application de suivi de stage",
      "date": "Juin 2025",
      "image": "img/Université_Sorbonne_Paris_Nord_-_Forum.webp",
      "descriptionCourte": "Application web développée en PHP avec une interface simple.",
      "descriptionLongue": "Ce projet universitaire a été développé dans le cadre de ma deuxième année de BUT. L'application permet de gérer le suivi des stages étudiants. Réalisée en équipe, nous avons utilisé PHP, MySQL, HTML/CSS, en appliquant une méthodologie agile et des outils de collaboration comme Git."
    },
    {
      "id": "modal3",
      "titre": "Cookbook - Application de recettes",
      "date": "Mars 2026",
      "image": "img/photo-cookbook.jpg",
      "descriptionCourte": "Application de gestion et d'optimisation de recettes quotidiennes.",
      "descriptionLongue": "Développement d'une application de bureau native dédiée à la gestion culinaire et à l'analyse nutritionnelle automatisée. Conçu en Python avec le framework Flet (basé sur Flutter), le logiciel intègre une base de données relationnelle locale SQLite pour le stockage des recettes et l'ingestion complète des 3 400 références de la base de données gouvernementale CIQUAL, complétée par des requêtes asynchrones vers l'API Open Food Facts. Le cœur de l'application repose sur un moteur d'analyse syntaxique en logique hybride permettant la saisie en langage naturel des ingrédients, un algorithme de conversion dynamique des volumes en masses selon la densité des aliments, et un calcul vectoriel en temps réel des calories et des macro/micro-nutriments. Un accent strict a été mis sur la qualité de code."
    },
    {
      "id": "modal4",
      "titre": "Analyse et optimisation d'EDT",
      "date": "Juin 2026",
      "image": "img/calendrier.jpg",
      "descriptionCourte": "Analyse du processus de création des emplois du temps pour une promotion de BUT.",
      "descriptionLongue": "Étude réalisée en collaboration avec la responsable des emplois du temps. L'objectif était d'analyser et de modéliser le processus de création existant, d'en identifier les limites, puis de proposer des hypothèses d'amélioration concrètes pour optimiser la planification."
    },
    {
      "id": "modal5",
      "titre": "Plateforme E-learning",
      "date": "Juin 2026",
      "image": "img/photo-SAE.jpg",
      "descriptionCourte": "Développement full-stack d'un site d'hébergement de cours.",
      "descriptionLongue": "Projet d'architecture logicielle réalisé en groupe. Développement du front-end et du back-end d'une plateforme éducative intégrant des interfaces spécifiques et des gestions de droits pour les administrateurs, les professeurs et les élèves. Code source et gestion de projet centralisés sur GitHub (dépôt TP_Architecture_Logicielle)."
    }
  ];

  const projectsContainer = document.getElementById('projects-container');

  if (projectsContainer) {
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
  }

});
