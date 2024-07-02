// URL de l'API récupération des données
const apiUrl = 'http://localhost:5678/api/works';
const categoriesUrl = 'http://localhost:5678/api/categories';

// Déclarer une variable globale pour stocker les figures une fois récupérées
let figures = [];

// Fonction principale pour charger les catégories, initialiser les filtres et afficher les travaux
async function loadCategoriesAndWorks() {
    try {
        const categories = await fetchCategories(); // Récupération des catégories depuis l'API
        const filterContainer = document.getElementById('filtre-container'); // Création de filterContainer
       

        initFilterButtons(categories, filterContainer); // Initialisation des boutons de filtre avec les catégories récupérées
        
        const works = await fetchWorks(); // Récupération des travaux depuis l'API
        displayWorks(works); // Affichage initial des travaux
    } catch (error) {
        console.error('Erreur lors du chargement initial:', error);
    }
}

// Fonction pour initialiser les boutons de filtre avec les catégories récupérées
function initFilterButtons(categories, filterContainer) {
    const uniqueCategories = new Set(categories.map(category => category.name));

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

    const figureElement = document.querySelector('#portfolio .mesprojets figure');
    if (figureElement) {
        figureElement.insertAdjacentElement('afterend', filterContainer);
    } else {
        console.error('Aucun élément <h2> trouvé dans la section avec l\'ID "portfolio".');
    }
}

// Fonction pour afficher les travaux dans la galerie
export function displayWorks(works) {
    const gallery = document.getElementById('gallery');
    
    // Vider la galerie avant de la remplir à nouveau
    gallery.innerHTML = '';
    
    // Vider la liste globale des figures avant de la remplir à nouveau
    figures = [];

    // Ajouter dynamiquement les figures et leurs enfants à la galerie
    works.forEach((work) => {
        // Créer la balise figure
        const figure = document.createElement('figure');
        figure.dataset.workId = work.id;
        figure.dataset.category = work.category.name;

        // Créer la balise img
        const img = document.createElement('img');
        img.src = work.imageUrl;
        img.alt = work.title;

        // Créer la balise figcaption
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = work.title;

        // Ajouter img et figcaption à figure
        figure.appendChild(img);
        figure.appendChild(figcaption);

        // Ajouter figure à la galerie
        gallery.appendChild(figure);

        // Ajouter la figure à la liste globale
        figures.push(figure);
    });
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
export async function fetchCategories() {
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

//creation des options category dans le button select id category

async function populateCategories() {
    const categories = await fetchCategories();
   
    const selectElement = document.getElementById('category');
   
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id; // Assurez-vous que l'objet catégorie a une propriété id
        option.textContent = category.name; // Assurez-vous que l'objet catégorie a une propriété name
        selectElement.appendChild(option);
    });
}
// Fonction pour vérifier si l'utilisateur est connecté
function isUserLoggedIn() {
    const token = localStorage.getItem('token');
    return token !== null;
}


// Assurez-vous que le DOM est entièrement chargé avant d'appeler populateCategories
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM entièrement chargé et analysé');
    populateCategories();
});
// Appeler la fonction principale pour démarrer le chargement initial une fois que le DOM est chargé
document.addEventListener('DOMContentLoaded', loadCategoriesAndWorks);
