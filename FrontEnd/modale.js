document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("myModal");
    const gallery = document.querySelector('.gallery');
    const page1 = document.getElementById("page1");
    const page2 = document.getElementById("page2");
    const categoriesUrl = 'http://localhost:5678/api/categories';
    const backToPage1Button = document.getElementById("backToPage1");
    const btn = document.getElementById("btnedit");
    const photoform = document.getElementById("photoForm");
    const span = document.querySelector(".close");
    const uploadButton = document.getElementById('uploadbutton'); // Corrected ID
    const fileInput = document.getElementById('fileInput');
    const previewImage = document.getElementById('previewImage');
    const uploadPlaceholder = document.getElementById('uploadPlaceholder');

    let addPictureButton;

    // Fonction pour afficher la première page du modal
    function showPage1() {
        page1.classList.add('active');
        page2.classList.remove('active');
    }

    // Fonction pour afficher la deuxième page du modal
    function showPage2() {
        page1.classList.remove('active');
        page2.classList.add('active');
    }

    // Fonction pour attacher l'événement de clic au bouton "Ajouter une photo"
    function attachAddPictureEvent() {
        if (addPictureButton) {
            addPictureButton.onclick = showPage2;
        }
    }
    // Attacher l'événement de clic au bouton "Retour à la page 1"
      if (backToPage1Button) {
    backToPage1Button.onclick = showPage1;
         }

    // Fonction pour initialiser le contenu du modal lorsque le bouton est cliqué
    function initializeModal() {
        modal.style.display = "block";
        showPage1();
        photoform.innerHTML = '';

        // Cloner et ajouter les images de la galerie au formulaire
        const figures = Array.from(gallery.querySelectorAll('figure'));
        figures.forEach(figure => {
            const img = figure.querySelector('img');
            if (img) {
                const imgClone = img.cloneNode(true);
                const imgContainer = document.createElement('div');
                imgContainer.classList.add('img-container');
                imgContainer.appendChild(imgClone);

                imgClone.style.width = '100px';
                imgClone.style.objectFit = 'cover';
                imgClone.style.height = '90px';
                imgClone.style.display = 'block';

                const deleteIcon = document.createElement("i");
                deleteIcon.classList.add("fas", "fa-trash", "delete-icon");

                deleteIcon.onclick = function() {
                    imgContainer.remove();
                };

                imgContainer.appendChild(deleteIcon);
                photoform.appendChild(imgContainer);
            }
        });

        // Ajouter dynamiquement le bouton "Ajouter une photo" s'il n'existe pas déjà
        if (!document.getElementById('addPhotoButton')) {
            const addPictureDiv = document.createElement('div');
            addPictureDiv.classList.add('addpicture');
            addPictureButton = document.createElement('button');
            addPictureButton.id = 'addPhotoButton';
            addPictureButton.classList.add('textbtn');
            addPictureButton.textContent = 'Ajouter une photo';

            addPictureDiv.appendChild(addPictureButton);
            photoform.appendChild(addPictureDiv);

            attachAddPictureEvent();
        }
    }

    // Gérer le clic sur le bouton "modifier"
    if (btn) {
        btn.onclick = initializeModal;
    }

    // Gérer le clic sur le bouton de fermeture
    if (span) {
        span.onclick = function() {
            modal.style.display = "none";
        };
    }

    // Gérer le clic en dehors de la modal pour la fermer
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    
    // Ajouter un écouteur d'événement au bouton d'upload pour ouvrir le sélecteur de fichiers
    uploadButton.addEventListener('click', function() {
        fileInput.click();
    });

    // Écouter les changements dans l'input file pour afficher un aperçu de l'image sélectionnée
    fileInput.addEventListener('change', function(event) {
        const file = fileInput.files[0]; // Récupérer le premier fichier sélectionné (dans ce cas, une image)
        if (file) {
            const reader = new FileReader(); // Créer un objet FileReader

            // Définir ce qui se passe une fois que le fichier a été lu avec succès
            reader.onload = function(e) {
                previewImage.src = e.target.result; // Définir la source de l'image pour afficher l'aperçu
                previewImage.style.display = 'block'; // Afficher l'élément previewImage
                uploadPlaceholder.style.display = 'none'; // Masquer l'élément uploadPlaceholder
            };

            // Lire le contenu du fichier en tant que URL de données (data URL)
            reader.readAsDataURL(file);
        }
    });
    
// Écouter la soumission du formulaire d'ajout de photo sur la page 2
const addPhotoForm = document.getElementById('addPhotoForm');
if (addPhotoForm) {
    addPhotoForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêcher le comportement par défaut du formulaire

        // Récupérer les valeurs du formulaire
        const projectName = document.getElementById('projectName').value;
        const category = document.getElementById('category').value;
        const imageSrc = previewImage.src;

         // Créer l'objet à envoyer au serveur (au format JSON)
    const formData = {
        title : projectName,
        category: category,
        imageSrc : imageSrc
    };

    console.log(formData);

        // Appel à une fonction pour ajouter le projet à la galerie
        addProjectToGallery(projectName, category, imageSrc);
         
      modal.style.display = "none"; 
    });
}

// Fonction pour ajouter le projet à la galerie de la page principale
function addProjectToGallery(projectName, category, imageSrc) {
    // Créer un nouvel élément figure pour le projet
    const figure = document.createElement('figure');
    figure.classList.add('project');

    // Créer une balise img pour l'image du projet
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = projectName;

    // Créer un élément figcaption pour le titre et la catégorie
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = `${projectName}`;

    // Ajouter l'image et le figcaption à la figure
    figure.appendChild(img);
    figure.appendChild(figcaption);

    // Ajouter la figure à la galerie de projets sur la page principale
    gallery.appendChild(figure);
}
    
});
