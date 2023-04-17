// Converting °F->°C
let fahrenheit = document.querySelector("#fahrenheit-link");
function fahrenheitToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-degrees");
  let celsisusTemp = temperature.innerHTML;
  temperature.innerHTML = Math.round((celsisusTemp * 9) / 5 + 32);
}
fahrenheit.addEventListener("click", fahrenheitToCelsius);
// Converting celsius to fahrengeit
let celsius = document.querySelector("#celcius-link");
function celsiusToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-degrees");
  let celsisusTemp = temperature.innerHTML;
  temperature.innerHTML = Math.round(((celsisusTemp - 32) * 5) / 9);
}
celsius.addEventListener("click", celsiusToFahrenheit);
// Current date
let now = new Date();

let currentDate = document.querySelector("#current-date");

let hours = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

currentDate.innerHTML = `${day} ${hours}:${minutes}`;

function showTemperature(response) {
  console.log(response.data);
  document.querySelector("#current-city").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-degrees");
  temperatureElement.innerHTML = `${temperature}`;

  document.querySelector("#current-weather").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#maxTemp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#minTemp").innerHTML = Math.round(
    response.data.main.temp_min
  );
}
function searchCity(city) {
  let apiKey = "320a6e66b85389b30ab1efe865b1d5b7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  //let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  axios.get(`${apiUrl}`).then(showTemperature);
  //axios.get(`${apiUrl}${city}&units=metric&appid=${apiKey}`).then(showTemperature);
}
// Searching for city
let form = document.querySelector("#search-form");
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let city = document.querySelector("#current-city");
  city.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}
form.addEventListener("submit", search);
// Current location
function showPosition(position) {
  let apiKey = "320a6e66b85389b30ab1efe865b1d5b7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
  //console.log(position.coords.latitude);
  //console.log(position.coords.longitude);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let getCurrentLocationButton = document.querySelector(".current-button");
getCurrentLocationButton.addEventListener("click", getCurrentLocation);
// Default city
searchCity("Rīga");
