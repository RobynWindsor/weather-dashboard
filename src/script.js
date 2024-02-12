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
}
