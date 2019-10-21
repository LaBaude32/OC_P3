class Resa {
	constructor() {
		this.formStationNom = document.getElementById('stationNom');
		this.formStationAdresse = document.getElementById('StationAdresse');
		this.formStationVelosDispos = document.getElementById('StationVelosDispos');
		this.compteurText = document.getElementById('compteur');
		this.canvas = document.getElementById('c1');
		this.ctx = this.canvas.getContext('2d');
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
		let nbVelosDipos = station.mainStands.availabilities.bikes;
		if (nbVelosDipos > 0) {
			let nom = station.name.split('-')[1];
			let adresse = station.address;
			if (adresse == "") {
				adresse = nom;
			}
			document.getElementById('form').style.display = 'block';
			this.formStationNom.innerText = nom;
			this.formStationAdresse.innerText = "Adresse : " + adresse;
			this.formStationVelosDispos.innerText = "Nombre de vélos diponibles : " + nbVelosDipos;
		} else {
			alert('Il n\'y a pas de vélo disponnible dans cette station.\n\nVeuillez choisir une autre station');
			//faire une modal, z index + postion css, + position absolute / relative + display, displa block sur l'event click
		}
	}

	checkForm(){


		this.compteur();
	}

	compteur() {
		let minutes = this.checkDate();
        if (minutes>0){
        minutes = minutes;
    }else {
        let minutes = 19;
    }
		this.setDate();
		let secondes = 60;
		let secondesTxt;

		let intervalID = setInterval(plusUneSec, 1000);

		let element = this;

		document.getElementById('displayTimer').style.visibility = 'visible';
		document.getElementById('form').style.display = 'none';

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

	signature() {
		let draw = false;
		let ctx = this.ctx;
		ctx.fillStyle = 'orange';

		let topOffset = this.canvas.getBoundingClientRect();

		ctx.canvas.addEventListener('mousemove', function (event) {
			let mouseX = event.x - topOffset.left;
			let mouseY = event.y - topOffset.top;
			if (draw == true) {
				ctx.fillRect(mouseX, mouseY, 4, 4);
			}
		});

		ctx.canvas.addEventListener('mouseup', function () {
			draw = false;
		});

		ctx.canvas.addEventListener('mousedown', function () {
			draw = true;
		});
	}

	clearCanvas() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	setDate() {
		let stockedDate = Date.now();
		sessionStorage.setItem('date', stockedDate);

		// TODO:  nom et prenom en localStorage, le temps en session.
		// TODO:  faire un ynds comme en PHP
		// TODO:
	}

	checkDate() {
		let stockedDate = Number(sessionStorage.getItem('date'));
		let actualDate = Date.now();
		let difference = actualDate - stockedDate;
        let min;
		if (difference > 1000) {
            console.log(difference);
            min = Math.floor(difference / 60000);
		}
        return min;
	}
}
