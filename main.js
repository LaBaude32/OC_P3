let lancementDiapo = document.getElementById('suivant');
let lancementCompteur = document.getElementById('LancementCompteur');
let canvasErase = document.getElementById('canvasErase');

let diapo = new Diapo();

lancementDiapo.addEventListener('click', diapo.switchDiapo);

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
let url = "https://api.jcdecaux.com/vls/v3/stations?contract=Lyon&apiKey=" + api_key;

var stations;

let data = fetch(url)
	.then(response => response.json())
	.then(function (data) {
		stations = data;
		initMap(stations);
	});

function showStation(id) {
	let resa = new Resa();
	resa.initResa(id);
}

let launchCompteur = new Resa();
// lancementCompteur.addEventListener('submit', function () {
lancementCompteur.addEventListener('click', function () {
	launchCompteur.compteur();
	//:TODO utiliser submit de façon a ce que les champs soient completés. -> problème de rechargement de la page.
});

// let lancementCanvas = document.getElementById('lancementCanvas');
let lancementCanvas = document.getElementById('c1');
let canvas = new Resa();
lancementCanvas.addEventListener('mouseover', function () {
	canvas.signature();
});

canvasErase.addEventListener('click', function () {
	canvas.clearCanvas();
});
