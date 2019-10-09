class Resa {
	constructor() {
		this.formStationNom = document.getElementById('stationNom');
		this.formStationAdresse = document.getElementById('StationAdresse');
		this.formStationVelosDispos = document.getElementById('StationVelosDispos');
		this.compteurText = document.getElementById('compteur');
		this.canvas = document.getElementById('c1');
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
		let dateActu = new Date();

		let minutes = 19;
		let secondes = 60;
		let secondesTxt;

		let intervalID = setInterval(plusUneSec, 1000);

		let element = this;

		function plusUneSec() {
			secondes--;
			if (minutes == 0 && secondes == 0) {
				clearInterval(intervalID);
				element.compteurText.innerText = 'Reservation expirée.';
			} else {
				if (secondes == 0) {
					minutes--;
					secondes = 59;
				}
				if (secondes < 10) {
					secondesTxt = '0' + secondes;
				} else {
					secondesTxt = secondes;
				}
				element.compteurText.innerText = minutes + ':' + secondesTxt;
			}
		}
	}

	signature(){
		// console.log(this.canvas);
		this.canvas.width = 300;
		this.canvas.height = 200;
		let draw = false;
		let ctx = this.canvas.getContext('2d');
		ctx.fillStyle = '#4444CC'; //Nuance de bleu
		let x = 12;
		let y = 150;
		ctx.fillRect(y, x, 2, 2);
		// console.log(ctx);

	}
}
