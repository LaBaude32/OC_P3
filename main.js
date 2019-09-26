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



// On initialise la latitude et la longitude de Paris (centre de la carte)
var lat = 48.852969;
var lon = 2.349903;
var macarte = null;
// Fonction d'initialisation de la carte
function initMap(stations) {
    // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
    macarte = L.map('map').setView([lat, lon], 11);
    // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        // Il est toujours bien de laisser le lien vers la source des données
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 1,
        maxZoom: 20
    }).addTo(macarte);

    var customIcon = L.icon({
        iconUrl: 'icon-marker.png',
        //shadowUrl: 'icon-shadow.png',
        iconSize:     [32, 32], // taille de l'icone
        //shadowSize:   [50, 64], // taille de l'ombre
        iconAnchor:   [32, 64], // point de l'icone qui correspondra à la position du marker
        //shadowAnchor: [32, 64],  // idem pour l'ombre
        popupAnchor:  [-3, -76] // point depuis lequel la popup doit s'ouvrir relativement à l'iconAnchor
    });

    for (const station of stations) {
        lat = (station.position.lat);
        lon = (station.position.lng);

        L.marker([lat, lon], {icon: customIcon}).addTo(macarte);
    }
}
window.onload = function () {
    // Fonction d'initialisation qui s'exécute lorsque le DOM est chargé
    // initMap();
};


let api_key = "81aa8312fa8a1075e302560e528cf5d1e0887cea";
let url = "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=" + api_key;

var stations

let data = fetch(url)
.then(response => response.json())
.then(function (data) {
    stations = data


    initMap(stations);
});
