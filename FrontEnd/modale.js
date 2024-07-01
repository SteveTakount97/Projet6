document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("myModal");
    const gallery = document.querySelector('.gallery');
    const page1 = document.getElementById("page1");
    const page2 = document.getElementById("page2");
    const backToPage1Button = document.getElementById("backToPage1");
    const btn = document.getElementById("btnedit");
    const photoform = document.getElementById("photoForm");
    const span = document.querySelector(".close");
    const uploadButton = document.getElementById('uploadbutton');
    const fileInput = document.getElementById('fileInput');
    const previewImage = document.getElementById('previewImage');
    const uploadPlaceholder = document.getElementById('uploadPlaceholder');
    let addPictureButton;
    let resizedBlob = null;

    // Vérifier le token au chargement de la page
    const token = localStorage.getItem('token');
    if (token) {
        console.log(token);
        enableAddPhotoFormListener();
    } else {
        alert('Aucun token d\'autorisation trouvé. Veuillez vous connecter.');
    }

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
                deleteIcon.setAttribute('data-work-id', figure.dataset.workId);

                // Gestionnaire d'événement pour le clic sur une icône de suppression
                deleteIcon.addEventListener('click', handleDeleteIconClick);

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
             // Recharger la page
            window.location.reload();
        }
    }

    // Ajouter un écouteur d'événement au bouton d'upload pour ouvrir le sélecteur de fichiers
    if (uploadButton) {
        uploadButton.addEventListener('click', function() {
            fileInput.click();
        });
    }

    if (fileInput) {
        fileInput.addEventListener('change', function (event) {
            const file = fileInput.files[0];
            const maxSize = 1.2 * 1024 * 1024; // 1.2 MB in bytes
        
            if (file) {
                if (file.size > maxSize) {
                    alert('Le fichier est trop volumineux. La taille maximale est de 1,2 Mo.');
                    fileInput.value = ''; // Clear the input
                    previewImage.style.display = 'none';
                    uploadPlaceholder.style.display = 'block';
                    return;
                }
        
                const reader = new FileReader();
                reader.onload = function (e) {
                    const img = new Image();
                    img.onload = function () {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        const maxWidth = 600;
                        const scaleFactor = maxWidth / img.width;
                        const height = img.height * scaleFactor;
        
                        canvas.width = maxWidth;
                        canvas.height = height;
                        ctx.drawImage(img, 0, 0, maxWidth, height);
        
                        // Convert to PNG (you can modify this based on the original file type)
                        canvas.toBlob((blob) => {
                            if (blob) {
                                resizedBlob = blob; // Assignez blob à resizedBlob
                                const resizedImageSrc = URL.createObjectURL(blob);
                                previewImage.src = resizedImageSrc;
                                previewImage.style.display = 'block';
                                uploadPlaceholder.style.display = 'none';
        
                                // Set object-fit: cover on the preview image
                                previewImage.style.objectFit = 'cover';
        
                                console.log('Image redimensionnée et convertie en blob avec succès.');
                            } else {
                                console.error('Erreur lors de la conversion de l\'image en blob.');
                            }
                        }, 'image/png', 0.7);
                    };
                    img.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Fonction pour activer l'écouteur d'événement sur le formulaire d'ajout de photo
function enableAddPhotoFormListener() {
    const addPhotoForm = document.getElementById('addPhotoForm');
    const previewImage = document.getElementById('previewImage');
    const uploadPlaceholder = document.getElementById('uploadPlaceholder');
    

    if (addPhotoForm) {
        addPhotoForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Empêcher le comportement par défaut du formulaire

            // Récupérer les valeurs du formulaire
            const projectName = document.getElementById('projectName').value;
            const category = document.getElementById('category').value;
            const imageSrc = previewImage.src; // Assurez-vous que previewImage est correctement défini

            try {
                // Créer un FormData pour envoyer les données
                const formData = new FormData();
                formData.append('title', projectName);
                formData.append('category', category);

                // Vérifier si resizedBlob est défini
                if (resizedBlob) {
                    formData.append('file', resizedBlob, 'image.png');
                    console.log('Le blob de l\'image a été ajouté au FormData.');
                } else {
                    alert('Erreur lors de la préparation de l\'image. Veuillez réessayer.');
                    console.error('resizedBlob n\'est pas défini.');
                    return;
                }

                // Envoyer la requête POST pour ajouter le projet
                const response = await fetch('http://localhost:5678/api/works', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    },
                    body: formData
                });

                if (!response.ok) {
                    throw new Error(`Erreur lors de l'ajout du work: ${response.status}`);
                }

                const data = await response.json();
                console.log('Succès:', data);

                // Afficher une alerte pour indiquer le succès de l'envoi
                alert('Données envoyées avec succès !');

                // Ajouter visuellement le projet à la galerie sur la page principale
                addProjectToGallery(projectName, category, imageSrc);

                // Réinitialiser le formulaire et l'aperçu de l'image
                addPhotoForm.reset();
                previewImage.src = '';
                previewImage.style.display = 'none';
                uploadPlaceholder.style.display = 'block';

            } catch (error) {
                console.error('Erreur:', error);
                alert('Erreur lors de l\'ajout du work.');

                // Réinitialiser le formulaire en cas d'erreur
                addPhotoForm.reset();
                previewImage.src = '';
                previewImage.style.display = 'none';
                uploadPlaceholder.style.display = 'block';
            }
        });
    }
}


function handleDeleteIconClick(event) {
    event.stopPropagation(); // Empêcher la propagation du clic sur la figure parente

    const deleteIcon = event.target;
    const workId = deleteIcon.getAttribute('data-work-id');

    // Trouver l'image correspondante à supprimer
    const imgContainer = deleteIcon.closest('.img-container');
    if (!imgContainer) {
        console.error('Container de l\'image non trouvé.');
        return;
    }

    // Vérifier le token avant d'envoyer la requête DELETE
    if (token) {
        const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cet élément ?");
        if (confirmation) {
            // Envoyer la requête DELETE
            fetch(`http://localhost:5678/api/works/${workId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur lors de la suppression du work: ${response.status}`);
                }
                // Supprimer visuellement la figure de la galerie
                imgContainer.remove(); // Supprimer le conteneur de l'image
                 // Recharger la page
                  window.location.reload();
            })
            .catch(error => {
                console.error('Erreur:', error);
                alert('Erreur lors de la suppression du work.');
            });
        }
    } else {
        alert('Erreur: Token d\'autorisation non valide.');
    }
}

});
