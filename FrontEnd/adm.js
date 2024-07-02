// Déclarer les variables globalement pour qu'elles soient accessibles partout
let loginLink;
let logoutLink;
let btnedit;
let filterContainer;

// Fonction pour vérifier si l'utilisateur est connecté
function isUserLoggedIn() {
    return localStorage.getItem('token') !== null;
}

// Fonction pour initialiser les éléments lorsque l'utilisateur est connecté
function initializeElementsLoggedIn() {
    loginLink = document.querySelector('.login');
    logoutLink = document.querySelector('.logout');
    btnedit = document.querySelector('.btn-modifier');
    filterContainer = document.querySelector('.filtre');

    // Manipuler les éléments lorsqu'un utilisateur est connecté
    if (logoutLink) {
        logoutLink.classList.remove('hidden');
        if (btnedit) btnedit.classList.remove('hidden');
    } else {
        console.error('Logout element not found.');
    }

    if (loginLink) {
        loginLink.classList.add('hidden');
    } else {
        console.error('Login element not found.');
    }

    if (filterContainer) {
        filterContainer.style.display = 'none';
    } else {
        console.error('Element with class "filtre" not found.');
    }
}

// Fonction pour initialiser les éléments lorsque l'utilisateur n'est pas connecté
function initializeElementsLoggedOut() {
    loginLink = document.querySelector('.login');
    logoutLink = document.querySelector('.logout');
    btnedit = document.querySelector('.btn-modifier');
    filterContainer = document.querySelector('.filtre');

    // Manipuler les éléments lorsqu'un utilisateur n'est pas connecté
    if (logoutLink) {
        logoutLink.classList.add('hidden');
    }

    if (loginLink) {
        loginLink.classList.remove('hidden');
    }

    if (btnedit) {
        btnedit.classList.add('hidden');
    }

   
}

// Vérifier l'état de connexion dès le chargement du script
document.addEventListener('DOMContentLoaded', function() {
    if (isUserLoggedIn()) {
        console.log('L\'utilisateur est logué.');
        initializeElementsLoggedIn();
    } else {
        console.log('L\'utilisateur n\'est pas logué.');
        initializeElementsLoggedOut();
    }
});

