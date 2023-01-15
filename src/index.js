let currentTime = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];
let hour = currentTime.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minute = currentTime.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let div = document.querySelector("#current-time");
div.innerHTML = `${day} ${hour}:${minute}`;

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector(".enter");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${city.value}`;
  let apiKey = "96f633068ece54dc03b4a1ba9571d807";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemprature);
}

let formInput = document.querySelector("#form-input");
formInput.addEventListener("submit", searchCity);

function showTemprature(response) {
  let city = document.querySelector(".enter");
  city.innerHTML = response.data.name;

  let degree = document.querySelector("#degree");
  let temprature = Math.round(response.data.main.temp);
  degree.innerHTML = temprature;

  let tempratureDescription = document.querySelector("#description");
  tempratureDescription.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#humidity");
  let humidityRate = Math.round(response.data.main.humidity);
  humidity.innerHTML = `Humidity:${humidityRate}%`;

  let wind = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind: ${windSpeed} Km/h`;
}

function showposition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "96f633068ece54dc03b4a1ba9571d807";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemprature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showposition);
}

let currentLocation = document.querySelector("#location");
currentLocation.addEventListener("click", getCurrentPosition);
