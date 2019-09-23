let bouton = document.querySelector('button');
let img = document.querySelector('img');
img.style.visibility = "visible";

function switchDiapo() {
    let listImgs = document.querySelectorAll('img');
    let imageAffichee;
    let nbImages = 0;
    let css
    let compteur = 0;

    img.style.visibility = "visible";

    for (image of listImgs) {
        css = getComputedStyle(image).visibility;
        if (css == "visible") {
            //recuperer l'image actuelle affichée
            imageAffichee = nbImages;
        }
        nbImages++; //recupere le nombre total d'image
    }

    for (val of listImgs) {
        let css = getComputedStyle(val).visibility
        if (css == "visible") {
            //cacher les images
            val.style.visibility = "hidden"
        }
        if (compteur == imageAffichee + 1) {
            // si l'image est celle qui suit l'image affiché, la révéler
            val.style.visibility = "visible"
        }
        compteur++;
        if (compteur == nbImages - 1) {
            // si on est à la dernière image, révéler la 1ère
            img.style.visibility = "visible";
        }
    }
}

bouton.addEventListener('click', switchDiapo);
