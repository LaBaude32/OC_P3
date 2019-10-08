class Resa {
	constructor() {
		this.formStationNom = document.getElementById('stationNom');
		this.formStationAdresse = document.getElementById('StationAdresse');
		this.formStationVelosDispos = document.getElementById('StationVelosDispos');
		this.compteurText = document.getElementById('compteur');
	}

	initResa(ID) {
		let urlStation = "https://api.jcdecaux.com/vls/v3/stations/" + ID + "?contract=Lyon&apiKey=" + api_key;

		let element = this;

		let data = fetch(urlStation)
			.then(response => response.json())
			.then(function (data) {
				element.formHydrate(data);
			});
	}

	formHydrate(station) {
		let nom = station.name.split('-')[1];
		let adresse = station.address;
		if (adresse == "") {
			adresse = nom;
		}
		this.formStationNom.innerText = nom;
		this.formStationAdresse.innerText = "Adresse : " + adresse;
		this.formStationVelosDispos.innerText = "Nombre de vélos diponibles : " + station.mainStands.availabilities.bikes;
	}

	compteur() {
		console.log(this.compteurText);

		let dateActu = new Date();
		// let heures = dateActu.getHours();
		this.compteurText.innerText = dateActu;
	}
}
