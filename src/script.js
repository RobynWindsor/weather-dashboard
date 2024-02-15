// function that will save search to local storage
function saveSearch(city) {
  let searches = JSON.parse(localStorage.getItem('weatherSearches')) || [];

  // Check if the city is already in the searches
  if (!searches.includes(city)) {
    searches.push(city);
    localStorage.setItem('weatherSearches', JSON.stringify(searches));
  }
}
// Create Function yo load previous searches from local storage
function loadSearches() {
  let searches = JSON.parse(localStorage.getItem('weatherSearches')) || [];
  // Display previous searches in UI
  let previousSearchElement = document.querySelector('#previous-searches');
  previousSearchElement.innerHTML = '';
  searches.forEach(function (city) {
    previousSearchElement.innerHTML += `<li>${city}</li>`;
  });
}

let currentDate = new Date();

let h3 = document.querySelector('h3');
let days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
let day = days[currentDate.getDay()];

let hours = currentDate.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
h3.innerHTML = `${day} ${hours}:${minutes}`;

function displayForecast(response) {
  console.log(response);
  let forecast = response.data.daily.slice(1);
  // Skip first day

  let forecastElement = document.querySelector('#forecast');

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (day) {
    const timeSeconds = day.time;
    const timeMilliseconds = timeSeconds * 1000;
    const dayIndexOfWeek = new Date(timeMilliseconds).getDay();
    const dayNameOfWeek = days[dayIndexOfWeek];

    console.log(day);
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2 weather-forecast">
        <div class="weather-forecast-date">${dayNameOfWeek}</div>
        <img
          src="${day.condition.icon_url}"
          alt="${day.condition.description}"
          title="${day.condition.description}"
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            day.temperature.maximum
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            day.temperature.minimum
          )}° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = '748ed80fdo221bt48fa84019ab0b737f';
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function search(city) {
  let apiKey = '748ed80fdo221bt48fa84019ab0b737f';
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
  console.log(apiUrl);
}

function showTemperature(response) {
  let iconElement = document.querySelector('#weather-icon');
  iconElement.setAttribute('src', response.data.condition.icon_url);
  console.log(response.data);
  console.log(response.data.condition.icon_url);
  document.querySelector;
  document.querySelector('#city').innerHTML = response.data.city;
  document.querySelector('#temp').innerHTML = `${Math.round(
    response.data.temperature.current
  )}°C`;

  document.querySelector('#humidity').innerHTML =
    response.data.temperature.humidity;
  document.querySelector('#wind').innerHTML = Math.round(
    response.data.wind.speed
  );
  getForecast(response.data.coordinates);
  saveSearch(response.data.city);
  loadSearches();
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector('#city-input').value;
  search(city);
}

let searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', handleSubmit);
search('Cape Town');
