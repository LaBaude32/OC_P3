class Map {
    constructor(lat, lon) {
        this.lat = lat;
        this.lon = lon;
        let map = L.map('map').setView([lat, lon], 11);
        // Créer l'objet "map" et l'insèrer dans l'élément HTML qui a l'ID "map"
        this.map = map;

        L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
            minZoom: 1,
            maxZoom: 20
        }).addTo(this.map);

        markerClusters = L.markerClusterGroup(); // Nous initialisons les groupes de marqueurs
    }

    addMarker(lat, lon, infos) {
        let marker = L.marker([lat, lon]).bindPopup(infos);
        // marker.addTo(this.map)
        markerClusters.addLayer(marker);
    }

    addMarkerByStations(stations) {
        for (const station of stations) {

            let lat = station.position.lat;
            let lon = station.position.lng;
            let nom = station.name.split('-');
            nom = nom[1];
            let infos = 'Station ' + nom + '</br> Adresse : ' + station.address + '</br> Nombre de vélos dispos : ' + station.available_bikes + '</br> Nombre de places vides : ' + station.available_bike_stands;

            this.addMarker(lat, lon, infos);
        }
    }

    addLayerToMap(markerClusters) {
        this.map.addLayer(markerClusters)
    }
}