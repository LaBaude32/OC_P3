class Resa {
    constructor() {
        this.formStationNom = document.getElementById('stationNom');
        this.formStationAdresse = document.getElementById('StationAdresse');
        this.formStationVelosDispos = document.getElementById('StationVelosDispos');
        this.compteurText = document.getElementById('compteur');
    }

    initResa(ID) {
        let urlStation = "https://api.jcdecaux.com/vls/v3/stations/" + ID + "?contract=Lyon&apiKey=" + api_key;

        let station;

        let data = fetch(urlStation)
            .then(response => response.json())
            .then(function (data) {
                station = data;
            });

        this.formHydrate(station);
    }

    formHydrate(station) {
        console.log(station);

        // let nom = station.name.split('-')[1];
        let nom = 'test'

        this.formStationNom.innerText = nom;
        // formStationAdresse.innerText = stationResa.address;
        // formStationVelosDispos.innerText = stationResa.mainStands.availabilities.bikes
    }

    compteur(){
        console.log(this.compteurText);

        let dateActu = new Date();
        // let heures = dateActu.getHours();
        this.compteurText.innerText = dateActu;
    }
}