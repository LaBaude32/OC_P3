class Map {
    constructor(lat, lon) {
        this.lat = lat;
        this.lon = lon;
        let markerClusters;

        let map = L.map('map').setView([lat, lon], 11);
        // Créer l'objet "map" et l'insèrer dans l'élément HTML qui a l'ID "map"
        this.map = map;

        markerClusters = L.markerClusterGroup(); // Nous initialisons les groupes de marqueurs


        L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
            minZoom: 1,
            maxZoom: 20
        }).addTo(this.map);
    }

    addMarker(lat, lon, infos) {
        let marker = L.marker([lat, lon]).bindPopup(infos);
        marker.addTo(this.map)
        markerClusters.addLayer(marker);
    }

    addMarkerByStations(stations) {
        for (const station of stations) {

            let lat = (station.position.lat);
            let lon = (station.position.lng);
            let infos = (station.address);

            this.addMarker(lat, lon, infos);
        }
    }
}