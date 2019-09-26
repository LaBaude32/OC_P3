let api_key = "81aa8312fa8a1075e302560e528cf5d1e0887cea";
let url = "https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=" + api_key;

var stations

let data = fetch(url)
.then(response => response.json())
.then(function (data) {
    stations = data
    initMap();
});