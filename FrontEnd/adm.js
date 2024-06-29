

// Événement chargement du document
document.addEventListener("DOMContentLoaded", async function() {
    const authLink = document.getElementById("auth-link");
    const token = localStorage.getItem('token'); // Supposons que le token est stocké dans le localStorage
    // Sélection dynamique de filterContainer
    const filterContainer = document.querySelector('.filter');

    if (token) {
        try {
            const response = await fetch('http://localhost:5678/api/works', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            
            if (response.ok) {
                // Utilisateur connecté avec un token valide
                const loginLink = document.querySelector('.login');
                const logoutLink = document.querySelector('.logout');

                if (loginLink && logoutLink) {
                    loginLink.classList.add('hidden');
                    logoutLink.classList.remove('hidden');
                } else {
                    console.error('Login or logout element not found.');
                }
            } else {
                // Token invalide
                applyDefaultSettings();
                loginLink.classList.remove('hidden');
                logoutLink.classList.add('hidden');

                console.log(logoutLink);
            }

                 
                 // Sélection dynamique de filterContainer
                 const filterContainer = document.querySelector('.filtre'); // Remplacez '.filter' par votre sélecteur CSS correct


                 if (filterContainer) {
                     filterContainer.style.display = 'none';
                     console.log(filterContainer);
                 } else {
                     console.error('Element with class "filter" not found.');
                     // Gérer le cas où filterContainer n'est pas trouvé, par exemple :
                     // Afficher un message d'erreur, ou ajuster votre logique en conséquence.
                 }
                console.log(filterContainer);

           
        } catch (error) {
            console.error('Error:', error);
            authLink.innerHTML = '<a href="login.html">login</a>';
        }
    } else {
        // Pas de token, utilisateur non connecté
        authLink.innerHTML = '<a href="login.html">login</a>';
    }

});
