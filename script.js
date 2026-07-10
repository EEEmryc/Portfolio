document.addEventListener("DOMContentLoaded", () => {
  fetch('projets.txt')
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur de chargement");
      }
      return response.json();
    })
    .then(projets => {
      const container = document.getElementById('projects-container');
      const projetsSection = document.getElementById('projets');
      
      let cardsHtml = '';
      let modalsHtml = '';

      projets.forEach(projet => {
        cardsHtml += `
          <div class="project-card" onclick="openModal('${projet.id}')">
            <h3>${projet.titre}</h3>
            <div class="date">${projet.date}</div>
            <img src="${projet.image}" alt="${projet.titre}" onerror="this.src='https://via.placeholder.com/400x200'">
            <p>${projet.descriptionCourte}</p>
          </div>
        `;

        modalsHtml += `
          <div class="modal" id="${projet.id}">
            <div class="modal-content">
              <span class="close" onclick="closeModal('${projet.id}')">&times;</span>
              <h3>${projet.titre}</h3>
              <p>${projet.descriptionLongue}</p>
            </div>
          </div>
        `;
      });
      
      container.innerHTML = cardsHtml;
      
      projetsSection.insertAdjacentHTML('beforeend', modalsHtml);
    })
    .catch(error => {
      console.error(error);
    });
});

function openModal(id) {
  document.getElementById(id).style.display = "block";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

window.onclick = function(event) {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}
