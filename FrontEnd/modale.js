document.addEventListener("DOMContentLoaded", function() {
    // Sélectionne l'élément modale en utilisant son ID "myModal"
    var modal = document.getElementById("myModal");
    const gallery = document.querySelector('.gallery');

    // Sélectionne le bouton qui ouvre la modale en utilisant son ID "btnedit"
    var btn = document.getElementById("btnedit");

    var photoform = document.getElementById("photoForm");
    // Sélectionne l'élément <span> qui ferme la modale en utilisant la première occurrence de la classe "close"
    var span = document.getElementsByClassName("close")[0];

    // Lorsque l'utilisateur clique sur le bouton, la fonction s'exécute et affiche la modale
    btn.onclick = function() {
        modal.style.display = "block";

        // Vider le contenu précédent de photoform
        photoform.innerHTML = '';

        // Parcourir chaque figure de la galerie
        const figures = Array.from(gallery.querySelectorAll('figure'));
        figures.forEach(figure => {
            const img = figure.querySelector('img'); // Sélectionner l'élément img de la figure

            if (img) {
                // Cloner l'élément img
                const imgClone = img.cloneNode(true);

                // Créer un conteneur pour l'image clonée et l'icône de suppression
                const imgContainer = document.createElement('div');
                imgContainer.classList.add('img-container');

                // Ajouter l'image clonée au conteneur
                imgContainer.appendChild(imgClone);

                // Ajuster la taille de l'image clonée comme nécessaire
                imgClone.style.width = '100px'; // Ajuster la taille comme nécessaire
                imgClone.style.objectFit = 'cover';
                imgClone.style.height = '90px';
                imgClone.style.display = 'block';

                // Créer une icône de suppression
                const deleteIcon = document.createElement("i");
                deleteIcon.classList.add("fas", "fa-trash", "delete-icon");

                // Définir l'action de suppression sur le clic de l'icône
                deleteIcon.onclick = function() {
                    imgContainer.remove(); // Suppression du conteneur de l'image clonée
                };

                // Ajouter l'icône de suppression au conteneur
                imgContainer.appendChild(deleteIcon);

                // Ajouter le conteneur au conteneur flex dans la modale
                photoform.appendChild(imgContainer);

                // Ajouter dynamiquement le bouton "Ajouter une photo"
                const addPictureDiv = document.createElement('div');
                addPictureDiv.classList.add('addpicture');
                const addButton = document.createElement('button');
                addButton.type = 'submit';
                addButton.classList.add('textbtn');
                addButton.textContent = 'Ajouter une photo';

               addPictureDiv.appendChild(addButton);
               photoform.appendChild(addPictureDiv);
                
                
            }
        });
    }

    // Lorsque l'utilisateur clique sur <span> (x), la fonction s'exécute et cache la modale
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Lorsque l'utilisateur clique n'importe où en dehors de la modale, la fonction s'exécute et cache la modale
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
