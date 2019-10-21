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
			this.formStationVelosDispos.innerText = "Nombre de v√©los diponibles : " + nbVelosDipos;

			let nomStocked = localStorage.getItem('nom');

			if (nomSotcked != "") {
				let nomStocked = localStorage.getItem('nom');
				let prenomSotcked = localStorage.getItem('prenom');

				document.getElementById('Name').value = nomStocked;
				document.getElementById('FirstName').value = prenomSotcked;

				//TODO: ne fonctionne plus aprËs la fermeture du navigateur
			}



		} else {
			alert('Il n\'y a pas de v√©lo disponnible dans cette station.\n\nVeuillez choisir une autre station');
			//TODO: faire une modal, z index + postion css, + position absolute / relative + display, displa block sur l'event click
		}
	}

	checkForm(e) {
		let nom = document.getElementById('Name').value;
		let prenom = document.getElementById('FirstName').value;
		//TODO: faire une verification sur la signature
		let canvas = this.ctx;

		if (nom == "" || prenom == "") {
			alert('pb');
			e.preventDefault();
		} else {
			this.compteur();
			this.saveName(nom, prenom)
			e.preventDefault();
		}
	}

	saveName(nom, prenom){
		localStorage.setItem('nom', nom);
		localStorage.setItem('prenom', prenom);
	}

	compteur() {
		let minutes = this.checkDate();
		if (minutes > 0) {
			minutes = minutes;
		} else {
			minutes = 19;
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
				element.compteurText.innerText = 'Reservation expir√©e.';
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

//TODO : bloquer le form si on est ‡ moins de 20 min et afficher directement le compteur