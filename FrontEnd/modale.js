document.addEventListener("DOMContentLoaded", function() {
    // Sélectionne l'élément modale en utilisant son ID "myModal"
    var modal = document.getElementById("myModal");
    const gallery = document.querySelector('.gallery');

    // Sélectionne le bouton qui ouvre la modale en utilisant son ID "btnedit"
    var btn = document.getElementById("btnedit");

    var photoform = document.getElementById ("photoForm");
    // Sélectionne l'élément <span> qui ferme la modale en utilisant la première occurrence de la classe "close"
    var span = document.getElementsByClassName("close")[0];

    // Lorsque l'utilisateur clique sur le bouton, la fonction s'exécute et affiche la modale
    btn.onclick = function() {
        modal.style.display = "block";
       
         // Parcourir chaque figure de la galerie
         figures = Array.from(gallery.querySelectorAll('figure'));
         figures.forEach(figure => {
            const img = figure.querySelector('img'); // Sélectionner l'élément img de la figure

            if (img) {
                // Cloner l'élément figure
        
                const imgClone = img.cloneNode(true);

                // Ajuster la taille de l'image clonée comme nécessaire
                imgClone.style.width = '100px'; // Ajuster la taille comme nécessaire
                imgClone.style.height = '70px';

                // Ajouter la figure clonée au conteneur flex dans la modale
                photoform.appendChild(imgClone);
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