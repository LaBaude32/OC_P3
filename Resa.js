class Resa {
    constructor() {
        let formStationNom = document.getElementById('stationNom');
        let formStationAdresse = document.getElementById('StationAdresse');
        let formStationVelosDispos = document.getElementById('StationVelosDispos');

    }

    initResa(ID) {
        let urlStation = "https://api.jcdecaux.com/vls/v3/stations/" + ID + "?contract=Lyon&apiKey=" + api_key;

        var stationResa;

        let dataStation = fetch(urlStation)
            .then(responseB => responseB.json())
            .then(function (dataStation) {
                stationResa = dataStation;
                console.log(stationResa);
                this.formHydrate();
            });
    }

    formHydrate() {
        let nom = stationResa.name.split('-')[1];

        formStationNom.innerText = nom;
        formStationAdresse.innerText = stationResa.address;
        formStationVelosDispos.innerText = stationResa.mainStands.availabilities.bikes
    }
}