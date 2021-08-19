function ResieveTime(time) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[time.getDay()];
  let date = time.getDate();
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}|${date} ${hours}:${minutes}`;
}

let h5 = document.querySelector("h5");
let currentTime = new Date();
h5.innerHTML = ResieveTime(currentTime);

function showWeather(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("#real-feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low").innerHTML = Math.round(
    response.data.main.temp_min
  );
}

function search(city) {
  let key = "f2806ec45c07af369c3c23e940bb6221";
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
}

function searchEngine(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let searchform = document.querySelector("#search-form");
searchform.addEventListener("submit", searchEngine);

function searchLocation(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=f2806ec45c07af369c3c23e940bb6221&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("Boston");

function local(event) {
  event.preventDefault();
  search("Providence");
}
function local2(event) {
  event.preventDefault();
  search("Fall River");
}
function local3(event) {
  event.preventDefault();
  search("Newport");
}

let providence = document.querySelector("#Prov");
providence.addEventListener("click", local);

let fallRiver = document.querySelector("#Fall-River");
fallRiver.addEventListener("click", local2);

let newport = document.querySelector("#Newport");
newport.addEventListener("click", local3);
