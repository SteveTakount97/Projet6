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
                alert("Email ou mot de passe incorrect.");
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
                
               // Rediriger vers index.html ou une autre page appropriée après la connexion
                  window.location.href = '/index.html';
            } 

        } catch (error) {
            alert(error.message); // Afficher l'erreur en cas de problème
        }
    };

    // Appel de la fonction sendData avec formData en argument
    sendData(formData);
});
