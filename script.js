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

function showCur(response) {
  let curTemp = Math.round(response.data.temperature.current);
  let curCon = response.data.condition.description;
  let curIcon = response.data.condition.icon_url;

  let curTempElement = document.querySelector("#temp0");
  let curConElement = document.querySelector("#con0");
  let curIconElement = document.querySelector("#icon0");

  curTempElement.innerHTML = curTemp;
  curConElement.innerHTML = curCon;
  curIconElement.src = curIcon;

  let lon = response.data.coordinates.longitude;
  let lat = response.data.coordinates.latitude;

  // day and night and current time comparison and changing the color scheme

  let apiUrl = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lon}`;

  axios.get(apiUrl).then((response) => {
    let targetTime = new Date().toLocaleTimeString("en-GB", {
      timeZone: response.data.results.timezone,
    });
    targetTime = parseInt(targetTime.replace(/:/g, ""));
    let T = targetTime;

    function add12(item, index, arr) {
      if (item.slice(-2) === "PM") {
        item = item.padStart(9, 0).replace(/PM/g, "");
        let pmHrs = parseInt(item.slice(0, 2)) + 12;
        pmHrs = pmHrs.toString();
        item = item.replace(item.slice(0, 2), pmHrs);
        arr[index] = parseInt(item.trim());
      } else {
        item = item.replace(/AM/g, "").trim();
        arr[index] = parseInt(item);
      }
    }

    let sunrise = response.data.results.sunrise.replace(/:/g, "");
    let sunset = response.data.results.sunset.replace(/:/g, "");
    let dawn = response.data.results.dawn.replace(/:/g, "");
    let dusk = response.data.results.dusk.replace(/:/g, "");

    let dayNight = [dawn, sunrise, sunset, dusk];

    dayNight.forEach(add12);

    if (T > dayNight[0] && T < dayNight[1]) {
      console.log("Twilight-dawn");
    } else if (T > dayNight[1] && T < dayNight[2]) {
      console.log("Day");
    } else if (T > dayNight[2] && T < dayNight[3]) {
      console.log("Twilight-dusk");
    } else {
      console.log("Night");
    }
  });
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

// Search Engine (and checking if the request was valid)

function searchCity(event) {
  event.preventDefault();

  let inputCity = document.querySelector(".search-city");
  let inputCityTitle = cptlFrstWrd(inputCity.value);

  let apiKey = "t59d1foebd7d6a037ffd3299548b5a20";
  let apiUrlCur = `https://api.shecodes.io/weather/v1/current?query=${inputCityTitle}&key=${apiKey}&units=metric`;
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${inputCityTitle}&key=${apiKey}&units=metric`;

  axios.get(apiUrlCur).then((response) => {
    if (response.data.status == "not_found") {
    } else {
      showCur(response);
      let city = document.querySelector("#city");
      city.innerHTML = inputCityTitle;
    }
  });
  axios.get(apiUrlForecast).then((response) => {
    if (response.data.status == "not_found") {
      alert(
        "Hmm...🤔 \nLooks like the city you have entered doesn't exist \nplease enter a city name again."
      );
    } else {
      showFTemp(response);
    }
  });

  inputCity.value = null;
}

let searchEngine = document.querySelector("#search-form");
searchEngine.addEventListener("submit", searchCity);

// Default city

function defaultSet() {
  let apiKey = "t59d1foebd7d6a037ffd3299548b5a20";
  let apiUrlCur = `https://api.shecodes.io/weather/v1/current?query=${defaultCity}&key=${apiKey}&units=metric`;
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${defaultCity}&key=${apiKey}&units=metric`;

  axios.get(apiUrlCur).then(showCur);
  axios.get(apiUrlForecast).then(showFTemp);

  let city = document.querySelector("#city");
  city.innerHTML = defaultCity;
}

let defaultCity = "Oslo";
defaultSet(defaultCity);
