// Date

function nextThreeDaysExceptTomorrow(number) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  for (let index = 0; index < 3; index++) {
    //
    let localNumber = number + index;
    if (localNumber <= 6) {
      document.querySelector(`#day${index + 2}`).innerHTML = days[localNumber];
    } else {
      localNumber = localNumber - 7;
      document.querySelector(`#day${index + 2}`).innerHTML = days[localNumber];
    }
  }
}

let now = new Date();
let number = now.getDay();
nextThreeDaysExceptTomorrow(number + 2);

// Unit converter

function convertToF(event) {
  if (unit === "celsius") {
    for (let index = 0; index < 11; index++) {
      document.querySelector(`#temp${index}`).innerHTML = parseInt(
        Math.round(document.querySelector(`#temp${index}`).innerHTML) * 1.8 + 32
      );
    }
    unit = "fahrenheit";
  }
}

function convertToC(event, temp) {
  if (unit === "fahrenheit") {
    for (let index = 0; index < 11; index++) {
      document.querySelector(`#temp${index}`).innerHTML = parseInt(
        Math.round(
          (document.querySelector(`#temp${index}`).innerHTML - 32) * (5 / 9)
        )
      );
    }
    unit = "celsius";
  }
}

let fahrenheit = document.querySelector("#fahrenheit");
let celsius = document.querySelector("#celsius");

celsius.addEventListener("click", convertToC);
fahrenheit.addEventListener("click", convertToF);

// Temperature and condition

function cptlFrstWrd(word) {
  let firstLetter = word.charAt(0).toUpperCase();
  let remainingLetters = word.substring(1);
  let capitalWord = firstLetter + remainingLetters;
  return capitalWord;
}

function getTargetTime(response) {
  let targetTime = new Date().toLocaleTimeString("en-GB", {
    timeZone: response.data.results[0].timezone.name,
  });
  targetTime = parseInt(targetTime);
  if (targetTime >= 7 && targetTime < 22) {
    console.log("day");
  } else {
    console.log("night");
  }
}

function showCurTemp(response) {
  let curTemp = Math.round(response.data.temperature.current);
  let curCon = response.data.condition.description;
  let curIcon = response.data.condition.icon_url;

  let curTempElement = document.querySelector("#temp0");
  let curConElement = document.querySelector("#con0");
  let curIconElement = document.querySelector("#icon0");

  curTempElement.innerHTML = curTemp;
  curConElement.innerHTML = curCon;
  curIconElement.src = curIcon;

  let long = response.data.coordinates.longitude;
  let lat = response.data.coordinates.latitude;

  let apiKey = "bcc3cb81b1d84c1b975e2367fcb5772e";
  let apiUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=${apiKey}`;

  axios.get(apiUrl).then(getTargetTime);
}

function showFTemp(response) {
  for (let index = 0; index < 5; index++) {
    let maxTemp = Math.round(response.data.daily[index].temperature.maximum);
    let minTemp = Math.round(response.data.daily[index].temperature.minimum);

    document.querySelector(`#temp${index * 2 + 1}`).innerHTML = maxTemp;
    document.querySelector(`#temp${index * 2 + 2}`).innerHTML = minTemp;
    if (index > 0) {
      document.querySelector(`#icon${index}`).src =
        response.data.daily[index].condition.icon_url;

      document.querySelector(`#con${index}`).innerHTML =
        response.data.daily[index].condition.description;
    }
  }
  unit = "celsius";
}

// Search Engine

function searchCity(event) {
  event.preventDefault();

  let inputCity = document.querySelector(".search-city");
  let inputCityTitle = cptlFrstWrd(inputCity.value);

  let apiKey = "t59d1foebd7d6a037ffd3299548b5a20";
  let apiUrlCur = `https://api.shecodes.io/weather/v1/current?query=${inputCityTitle}&key=${apiKey}&units=metric`;
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${inputCityTitle}&key=${apiKey}&units=metric`;

  axios.get(apiUrlCur).then(showCurTemp);
  axios.get(apiUrlForecast).then(showFTemp);

  let city = document.querySelector("#city");
  city.innerHTML = inputCityTitle;
  inputCity.value = null;
}

let searchEngine = document.querySelector("#search-form");
searchEngine.addEventListener("submit", searchCity);

// Default city

function defaultSet() {
  let apiKey = "t59d1foebd7d6a037ffd3299548b5a20";
  let apiUrlCur = `https://api.shecodes.io/weather/v1/current?query=${defaultCity}&key=${apiKey}&units=metric`;
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${defaultCity}&key=${apiKey}&units=metric`;

  axios.get(apiUrlCur).then(showCurTemp);
  axios.get(apiUrlForecast).then(showFTemp);

  let city = document.querySelector("#city");
  city.innerHTML = defaultCity;
}

let defaultCity = "Oslo";
defaultSet(defaultCity);
