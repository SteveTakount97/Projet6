async function checkToken(token) {
    try {
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to verify token');
        }

        // Token vérifié avec succès
        alert('Token vérifié avec succès. Vous pouvez créer un work. Vous êtes connecté en tant qu\'administrateur');

        // Rediriger vers index.html
        window.location.href = '/index.html';

    } catch (error) {
        console.error('Error:', error);
        alert('Erreur lors de la vérification du token. Veuillez réessayer plus tard.');
    }
}

document.addEventListener("DOMContentLoaded", async function() {
    const authLink = document.getElementById("auth-link");
    const token = localStorage.getItem('token'); // Supposons que le token est stocké dans le localStorage

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
                // Utilisateur connecté
                authLink.innerHTML = '<a href="login.html">logout</a>';
            } else {
                // Token invalide
                authLink.innerHTML = '<a href="login.html">login</a>';
            }
        } catch (error) {
            console.error('Error:', error);
            authLink.innerHTML = '<a href="login.html">login</a>';
        }
    } else {
        // Pas de token, utilisateur non connecté
        authLink.innerHTML = '<a href="login.html">login</a>';
    }
});