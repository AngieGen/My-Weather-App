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

if (minutes < 10) {
  minutes = `0${minutes}`;
}

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
  document.querySelector("#current-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#current-wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(
    "#icon"
  ).innerHTML = `<img src="https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png" alt="Sunny" />`;
}
function searchCity(city) {
  let apiKey = "320a6e66b85389b30ab1efe865b1d5b7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
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

// FORECAST FOR THE WEEK (NEXT DAYS)

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKeySheCodes = "06t6cbfb24d9a82130oc6e45cee5e049";
  let apiUrlSheCodes = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKeySheCodes}&units=metric`;
  axios(`${apiUrlSheCodes}`).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
     <div class="weather-forecast-date">${formatDay(day.time)}</div>
     <img
       src="${day.condition.icon_url}"
       alt=""
       width="50px"
     />
     <div class="weather-forecast-temperatures">
       <span class="weather-forecast-temp-max">${Math.round(
         day.temperature.maximum
       )}°</span>
       <span class="weather-forecast-temp-max">${Math.round(
         day.temperature.minimum
       )}°</span>
     </div>
     </div>`;
    }
  });
  let forecast = document.querySelector("#forecast-for-next-days");
  forecast.innerHTML = forecastHtml;
}
getForecast("riga");
