const btn = document.getElementById("btn");
const meteo = document.getElementById("meteo");
const input = document.getElementById("city");
const image = document.getElementById("image");
const map = document.getElementById("mapid");
btn.addEventListener("click", function(e) {
  e.preventDefault();
  init(this.previousElementSibling.value);
});

input.focus();

const icons = {
  Clouds: "wi wi-day-cloudy",
  Rain: "wi wi-day-rain",
  Clear: "wi wi-day-sunny",
  Snow: "wi wi-day-snow",
  mist: "wi wi-day-fog",
  Drizzle: "wi wi-day-sleet"
};

const windDir = {
  360: "Nord",
  337: "Nord-Nord-Ouest",
  315: "Nord-Ouest",
  292: "Ouest-Nord-Ouest",
  270: "Ouest",
  247: "Ouest-Sud-Ouest",
  225: "Sud-Ouest",
  202: "Sud-Sud-Ouest",
  180: "Sud",
  157: "Sud-Sud-Est",
  135: "Sud-Est",
  112: "Est-Sud-Est",
  90: "Est",
  67: "Est-Nord-Est",
  45: "Nord-Est",
  22: "Nord-Nord-Est",
  0: "Nord"
};

async function init(city) {
  const weather = await fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=8e602b9ea28ed4f9f8fc97a5f6d1105c&units=metric"
  ).then(response => response.json());

  if (weather.cod == "404" || city == "") {
    input.classList.add("error");
    meteo.style.display = "none";
    map.classList.add("hidden");
  } else {
    input.classList.remove("error");
    meteo.style.display = "block";
    map.classList.remove("hidden");
  }

  let icon = "<i class='" + icons[weather.weather[0].main] + "'></i>";
  image.innerHTML = icon;

  let wind = windDir[closest(weather.wind.deg, Object.keys(windDir))];

  meteo.innerHTML = `
    <h1>Météo de ${weather.name} (${weather.sys.country})</h1>
    <ul>
        <li>Temps : ${icon}</li>
        <li>
            <h4>Température :</h4>
            <ul>
                <li>Moyenne : ${weather.main.temp}°C</li>
                <li>Maximale : ${weather.main.temp_max}°C</li>
                <li>Minimale : ${weather.main.temp_min}°C</li>
            </ul>
        </li>
        <li>
            <h4>Vent :</h4>
            <ul>
                <li>Vitesse : ${round(weather.wind.speed * 3.6, 2)} km/h</li>
                <li>Direction : ${wind} <i id="windArrow" class="fas fa-arrow-up"></i></li>
            </ul>
        </li>
        <li>Humidité : ${weather.main.humidity}%</li>
        <li>Pression atmosphérique : ${weather.main.pressure} hPa</li>
        <li>Latitude : ${weather.coord.lat}</li>
        <li>Longitude : ${weather.coord.lon}</li>
    </ul>        
    `;

  mymap.setView([weather.coord.lat, weather.coord.lon], 6);
  document.getElementById("windArrow").style.transform =
    "rotate(" + weather.wind.deg + "deg)";
  marker.setLatLng([weather.coord.lat, weather.coord.lon]);
  console.log(weather);
}

function closest(goal, arr) {
  return arr.reduce(function(prev, curr) {
    return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
  });
}

function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}
