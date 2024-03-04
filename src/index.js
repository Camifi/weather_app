function changeCountry(cityName) {
  fetchWeather(cityName); // Llama a la función para obtener el clima de la ciudad ingresada
}

let searchForm = document.querySelector("form");
let cityInput = document.querySelector(".search-input");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let cityName = cityInput.value;
  changeCountry(cityName);
  cityInput.value = ""; // Limpia el input después de la búsqueda
});

function getCurrentDateTime() {
  let now = new Date();
  let options = { weekday: "long", hour: "numeric", minute: "numeric" };
  let formattedDateTime = new Intl.DateTimeFormat("en-US", options).format(now);
  return formattedDateTime;
}

function updateDateTime() {
  let dateTimeElement = document.getElementById("date-time");
  dateTimeElement.textContent = getCurrentDateTime();
}

function fetchWeather(cityName) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then(function (response) {
      displayTemperature(response.data);
    })
    .catch(function (error) {
      console.error("Error al obtener los datos del clima:", error);
    });
}

function displayTemperature(data) {
  let temperature = Math.round(data.temperature.current);
  let city = data.city;

  let headingElement = document.querySelector(".location-info h1");
  let temperatureElement = document.querySelector(".temperature-info");

  headingElement.innerHTML = city;
  temperatureElement.innerHTML = ` ${temperature}°C`;
}

updateDateTime();
