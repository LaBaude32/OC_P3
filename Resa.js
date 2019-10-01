class Resa {
    initResa(ID) {
        let urlStation = "https://api.jcdecaux.com/vls/v3/stations/" + ID + "?contract=Lyon&apiKey=" + api_key;

        let stationResa;

        let dataStation = fetch(urlStation)
            .then(response => response.json())
            .then(function (dataStation) {
                stationResa = dataStation;
                // stations = stations.slice(0, 30); // reduire le nombre de stations pour pas faire de surcharge
                console.log(stationResa);
            });
    }
}