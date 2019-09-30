let bouton = document.querySelector('button');

let diapo = new Diapo();

bouton.addEventListener('click', diapo.switchDiapo);

// CARTE

// On initialise la latitude et la longitude de Lyon
let lat = 45.7484600;
let lon = 4.8467100;

let markerClusters;

// Fonction d'initialisation de la carte
function initMap(stations) {
    // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"

    let macarte = new Map(lat, lon);

    macarte.addMarkerByStations(stations);

    macarte.addLayerToMap(markerClusters);
}

let api_key = "81aa8312fa8a1075e302560e528cf5d1e0887cea";
let url = "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=" + api_key;

var stations;

let data = fetch(url)
    .then(response => response.json())
    .then(function (data) {
        stations = data;
        stations = stations.slice(0, 30); // reduire le nombre de stations pour pas faire de surcharge
        console.log(stations);

        initMap(stations);
    });

var content = macarte.L.DomUtil.create('div', 'content'),
    popup = macarte.L.popup().setContent(content);

L.DomEvent.addListener(content, 'click', function (event) {
    alert('test')
}, context);