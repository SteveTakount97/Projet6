// URL de l'API récupération des données
const apiUrl = 'http://localhost:5678/api/works';
const categoriesUrl = 'http://localhost:5678/api/categories';

// Déclarer une variable globale pour stocker les figures une fois récupérées
let figures = [];


// Fonction principale pour charger les catégories, initialiser les filtres et afficher les travaux
async function loadCategoriesAndWorks() {
    try {
        const categories = await fetchCategories(); // Récupération des catégories depuis l'API
        initFilterButtons(categories); // Initialisation des boutons de filtre avec les catégories récupérées
        
        const works = await fetchWorks(); // Récupération des travaux depuis l'API
        displayWorks(works); // Affichage initial des travaux
        displayWorksByCategory('Tous'); // Affichage initial de tous les travaux
    } catch (error) {
        console.error('Erreur lors du chargement initial:', error);
    }
}

// Fonction pour initialiser les boutons de filtre avec les catégories récupérées
function initFilterButtons(categories) {
    const uniqueCategories = new Set(categories.map(category => category.name));
    const filterContainer = document.createElement('div');
    filterContainer.classList.add('filtre');

    const allButton = createFilterButton('Tous');
    filterContainer.appendChild(allButton);
    allButton.addEventListener('click', function() {
        displayWorksByCategory('Tous');
    });

    uniqueCategories.forEach(category => {
        const button = createFilterButton(category);
        filterContainer.appendChild(button);
        button.addEventListener('click', function() {
            displayWorksByCategory(category);
        });
    });

    const h2Element = document.querySelector('#portfolio h2');
    if (h2Element) {
        h2Element.insertAdjacentElement('afterend', filterContainer);
    } else {
        console.error('Aucun élément <h2> trouvé dans la section avec l\'ID "portfolio".');
    }

    // Sélectionner toutes les figures une fois pour toutes après récupération des travaux
    const gallery = document.querySelector('.gallery');
    figures = Array.from(gallery.querySelectorAll('figure'));
}

// Fonction pour afficher les travaux filtrés dans la galerie en fonction de la catégorie sélectionnée
function displayWorksByCategory(category) {
    figures.forEach(figure => {
        const figureCategory = figure.dataset.category;

        if (category === 'Tous' || figureCategory === category) {
            figure.classList.remove('hidden');
        } else {
            figure.classList.add('hidden');
        }
    });
}


// Fonction pour créer un bouton de filtre avec le texte spécifié
function createFilterButton(category) {
    const button = document.createElement('button');
    button.classList.add('btn-filtre');
    button.textContent = category;
    return button;
}

// Fonction pour récupérer les données des travaux depuis l'API
async function fetchWorks() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Erreur HTTP! Statut: ${response.status}`);
        }
        const works = await response.json();
        console.log('Travaux récupérés:', works); // Logging des travaux récupérés
        
        return works;
    } catch (error) {
        console.error('Erreur lors de la récupération des travaux:', error);
        return [];
    }
}

// Fonction pour récupérer les catégories depuis l'API
async function fetchCategories() {
    try {
        const response = await fetch(categoriesUrl);
        if (!response.ok) {
            throw new Error(`Erreur HTTP! Statut: ${response.status}`);
        }
        const data = await response.json();
        console.log('Catégories récupérées:', data); // Logging des catégories récupérées
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
        return [];
    }
}

// Fonction pour afficher les travaux dans la galerie
function displayWorks(works) {
    const gallery = document.querySelector('.gallery');
    
    // Vider la liste globale des figures avant de la remplir à nouveau
    figures = [];

    // Ajouter dynamiquement les attributs data-work-id et data-category aux figures existantes
    works.forEach((work, index) => {
        const figure = gallery.children[index];
        if (figure) {
            figure.dataset.workId = work.id;
            figure.dataset.category = work.category.name;

            const img = figure.querySelector('img');
            if (img) {
                img.src = work.imageUrl;
                img.alt = work.title;
            }

            const figcaption = figure.querySelector('figcaption');
            if (figcaption) {
                figcaption.textContent = work.title;
            }

            figures.push(figure); // Ajouter la figure à la liste globale
        } 
    });
}

// Appeler la fonction principale pour démarrer le chargement initial
document.addEventListener('DOMContentLoaded', loadCategoriesAndWorks);
