// FORMATING CURRENT DAY, HOURS AND MINUTES
let now = new Date();
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

document.querySelector(
  "#current-date"
).innerHTML = `${day} ${hours}:${minutes}`;

// RESPONSE TO SHOW CURRENT DATA
function showTemperature(response) {
  document.querySelector("#current-city").innerHTML = response.data.city;

  document.querySelector("#current-degrees").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#current-weather").innerHTML =
    response.data.condition.description;

  document.querySelector("#current-humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#current-wind-speed").innerHTML =
    response.data.wind.speed;
  document.querySelector(
    "#icon"
  ).innerHTML = `<img src="${response.data.condition.icon_url}" />`;
  console.log(showTemperature);

  getForecast(response.data.city);
}

// SEARCH CITY USING API
function searchCity(city) {
  let apiKey = "06t6cbfb24d9a82130oc6e45cee5e049";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

// INPUT FORM FOR CITY
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  document.querySelector("#current-city").innerHTML = searchInput.value;
  searchCity(searchInput.value);
}
document.querySelector("#search-form").addEventListener("submit", search);

// FORECAST FOR THE WEEK (NEXT DAYS)
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "06t6cbfb24d9a82130oc6e45cee5e049";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
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
// Default city
searchCity("Rīga");
