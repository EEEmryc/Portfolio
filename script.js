document.addEventListener("DOMContentLoaded", () => {
  // Récupération des données depuis le fichier .txt
  fetch('projets.txt')
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur lors de la lecture du fichier projets.txt");
      }
      return response.json(); // Le texte est interprété comme du JSON
    })
    .then(projets => {
      const container = document.getElementById('projects-container');
      let htmlContent = '';

      // Génération du code HTML pour chaque projet
      projets.forEach(projet => {
        htmlContent += `
          <div class="project-card" onclick="openModal('${projet.id}')">
            <h3>${projet.titre}</h3>
            <div class="date">${projet.date}</div>
            <img src="${projet.image}" alt="${projet.titre}">
            <p>${projet.descriptionCourte}</p>
          </div>

          <div class="modal" id="${projet.id}">
            <div class="modal-content">
              <span class="close" onclick="closeModal('${projet.id}')">&times;</span>
              <h3>${projet.titre}</h3>
              <p>${projet.descriptionLongue}</p>
            </div>
          </div>
        `;
      });
      
      container.innerHTML = htmlContent;
    })
    .catch(error => console.error(error));
});

function openModal(id) {
  document.getElementById(id).style.display = "block";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

// Fermeture de la modale par clic à l'extérieur
window.onclick = function(event) {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}