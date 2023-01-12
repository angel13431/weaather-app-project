// Date
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function tmrPlusOne(number) {
  number = number + 2;
  if (number > 6) {
    number = number - 7;
    tomPlus1.innerHTML = days[number];
  } else {
    tomPlus1.innerHTML = days[number];
  }
}
function tmrPlusTwo(number) {
  number = number + 3;
  if (number > 6) {
    number = number - 7;
    tomPlus2.innerHTML = days[number];
  } else {
    tomPlus2.innerHTML = days[number];
  }
}
function tmrPlusThree(number) {
  number = number + 4;
  if (number > 6) {
    number = number - 7;
    tomPlus3.innerHTML = days[number];
  } else {
    tomPlus3.innerHTML = days[number];
  }
}

let tomPlus1 = document.querySelector("#tom-plus-1");
let tomPlus2 = document.querySelector("#tom-plus-2");
let tomPlus3 = document.querySelector("#tom-plus-3");

let now = new Date();

let number = now.getDay();

tmrPlusOne(number);
tmrPlusTwo(number);
tmrPlusThree(number);

// Search engine
function cptlFrstWrd(word) {
  let firstLetter = word.charAt(0).toUpperCase();
  let remainingLetters = word.substring(1);
  let capitalWord = firstLetter + remainingLetters;
  console.log(capitalWord);
  return capitalWord;
}
function showTemp(response) {
  let curTemp = response.data.temperature.current;
  let curTempElement = document.querySelector("#current-temp");

  curTempElement.innerHTML = curTemp;
}

function searchCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector(".search-city");
  let inputCityTitle = cptlFrstWrd(inputCity.value);

  let apiKey = "t59d1foebd7d6a037ffd3299548b5a20";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${inputCityTitle}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);

  let city = document.querySelector("#city");
  city.innerHTML = inputCityTitle;
  inputCity.value = null;
}

let searchEngine = document.querySelector("#search-form");
searchEngine.addEventListener("submit", searchCity);
