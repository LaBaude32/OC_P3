class Resa {
    constructor() {
        let formStationNom = document.getElementById('stationNom');
        let formStationAdresse = document.getElementById('StationAdresse');
        let formStationVelosDispos = document.getElementById('StationVelosDispos');

    }

    initResa(ID) {
        let urlStation = "https://api.jcdecaux.com/vls/v3/stations/" + ID + "?contract=Lyon&apiKey=" + api_key;

        var station;

        let data = fetch(urlStation)
            .then(response => response.json())
            .then(function (data) {
                station = data;
                console.log(station);
                this.formHydrate(station);
            });

    }

    formHydrate(station) {
        let nom = stationResa.name.split('-')[1];

        formStationNom.innerText = nom;
        formStationAdresse.innerText = stationResa.address;
        formStationVelosDispos.innerText = stationResa.mainStands.availabilities.bikes
    }
}