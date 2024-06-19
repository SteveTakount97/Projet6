  
  // URL de l'API récupération des données 
  const apiUrl = 'http://localhost:5678/api/works';

  // Fonction pour récupérer les données des travaux
  async function fetchWorks() {
      try {
          // Effectuer la requête GET
          const response = await fetch(apiUrl);
          
          // Vérifier si la requête a réussi
          if (!response.ok) {
              throw new Error(`Erreur HTTP! Statut: ${response.status}`);
          }

          // Extraire les données JSON de la réponse
          const works = await response.json();

          // Afficher les données dans la console
          console.log(works);
      } catch (error) {
          console.error('Erreur lors de la récupération des travaux:', error);
      }
  }

  // Appeler la fonction pour récupérer les travaux au chargement de la page
  window.onload = fetchWorks;


   //creation des elements via javascript

// Attendre que le document soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Sélection de la section "portfolio"
    const portfolioSection = document.getElementById('portfolio');

    // Vérifier si l'élément a été trouvé
    if (portfolioSection) {
        // Création du conteneur <div> avec la classe "filtre"
        const filterContainer = document.createElement('div');
        filterContainer.classList.add('filtre');

        // Création des éléments h3
        const tous = document.createElement('button');
        tous.textContent = 'Tous';

        const objet = document.createElement('button');
        objet.textContent = 'Objet';

        const appartement = document.createElement('button');
        appartement.textContent = 'Appartement';

        const restaurant = document.createElement('button');
        restaurant.textContent = 'Hôtels & Restaurants'; // Utilisation du texte correct

        // Ajout des éléments h3 au conteneur "filtre"
        filterContainer.appendChild(tous);
        filterContainer.appendChild(objet);
        filterContainer.appendChild(appartement);
        filterContainer.appendChild(restaurant);

        // Insérer le conteneur "filtre" juste après le premier h2 dans la section "portfolio"
        const h2Element = portfolioSection.querySelector('h2');
        if (h2Element) {
            h2Element.insertAdjacentElement('afterend', filterContainer);
        } else {
            console.error('Aucun élément <h2> trouvé dans la section avec l\'ID "portfolio".');
        }
    } else {
        console.error('L\'élément avec l\'ID "portfolio" n\'a pas été trouvé.');
    }
});
