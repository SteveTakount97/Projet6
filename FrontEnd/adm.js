document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si l'utilisateur est connecté
    if (isUserLoggedIn()) {
        console.log('L\'utilisateur est logué.');

        // Afficher des informations spécifiques aux utilisateurs connectés
        const loginLink = document.querySelector('.login');
        const logoutLink = document.querySelector('.logout');
        const filterContainer = document.querySelector('.filtre'); // Remplacez '.filtre' par votre sélecteur CSS correct

        if (logoutLink) {
            logoutLink.classList.remove('hidden');
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

    } else {
        console.log('L\'utilisateur n\'est pas logué.');
        // Rediriger l'utilisateur vers la page de connexion
        window.location.href = '/login.html';
    }
});

// Fonction pour vérifier si l'utilisateur est connecté
function isUserLoggedIn() {
    // Vérifie si le token d'authentification est présent dans localStorage
    const token = localStorage.getItem('token');
    return !!token; // Convertit en booléen (true si le token existe, false sinon)
}
