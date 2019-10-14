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
		}else {
			alert('Il n\'y a pas de vélo disponnible dans cette station.\n\nVeuillez choisir une autre station');
		}
	}

	compteur() {
		let dateActu = new Date();

		let minutes = 19;
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

		let own = ctx.canvas.offsetTop;
		let parent = ctx.canvas.offsetParent.offsetTop;
		// let total = parent - own - 564; //ordiportable
		let total = parent - own - 564 + 274; //ordifixe
		console.log(own);
		console.log(parent);
		console.log(total);

		ctx.canvas.addEventListener('mousemove', function (event) {
			let mouseX = event.x - ctx.canvas.offsetLeft - ctx.canvas.offsetParent.offsetLeft;
			let mouseY = event.y - ctx.canvas.offsetTop - total;
			let status = document.getElementById('test'); //Affichage des coordonées
			status.innerHTML = mouseX + ' | ' + mouseY;
			if (draw == true) {
				ctx.fillRect(mouseX, mouseY, 2, 2);
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
}
