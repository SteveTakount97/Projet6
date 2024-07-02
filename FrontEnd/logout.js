document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner l'élément avec l'ID "logout"
    var logoutButton = document.getElementById('logout');

    // Ajouter un event listener pour gérer le clic sur le bouton de déconnexion
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            // Appeler la fonction logout() lorsque l'utilisateur clique sur le bouton
            logout();
        });
    }

    function logout() {
        // Supprimer le token d'authentification du localStorage ou sessionStorage
        localStorage.removeItem('token'); // Pour localStorage

         alert('deconnection ok');

        // Rediriger l'utilisateur vers la page de connexion ou une autre page après la déconnexion
        setTimeout(function() {
            window.location.href = '/login.html';
        }, 2000); // Redirection après 2 secondes (2000 millisecondes)
    }
});