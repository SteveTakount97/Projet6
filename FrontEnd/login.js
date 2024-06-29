// Votre code JavaScript dans le fichier script.js
const loginForm = document.getElementById('loginform');

loginForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire

    // Récupérer les valeurs des champs email et password
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Créer l'objet à envoyer au serveur (au format JSON)
    const formData = {
        email: email,
        password: password
    };

    console.log(formData);

    const sendData = async (formData) => {
        const url = "http://localhost:5678/api/users/login";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        };
        try {
            const response = await fetch(url, options);
            console.log(response);
            if (!response.ok) {
                throw new Error(`Une erreur s'est produite avec le statut : ${response.status}`);
            }
            const responseData = await response.json();
            console.log("Réponse du serveur :", responseData);

            // Vérifier si la réponse contient un message de succès ou d'erreur
            if (responseData.userId && responseData.token) {
                // Afficher un message de connexion réussie
                alert("Connexion réussie !");

                // Stocker le userId et le token dans localStorage
                localStorage.setItem('userId', responseData.userId);
                localStorage.setItem('token', responseData.token);

                // Vérifier le token
                await checkToken(responseData.token);

            } else {
                // Afficher un message d'erreur générique
                alert("Email ou mot de passe incorrect.");
            }

        } catch (error) {
            alert(error.message); // Afficher l'erreur en cas de problème
        }
    };

    // Appel de la fonction sendData avec formData en argument
    sendData(formData);
});

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
        alert('Token vérifié avec succès. Vous pouvez créer un work. Vous êtes connecter en tant que administrateur');

        // Rediriger vers index.html
        window.location.href = '/index.html';

    } catch (error) {
        console.error('Error:', error);
        alert('Erreur lors de la vérification du token. Veuillez réessayer plus tard.');
    }
}
