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

// Temperature and condition

function cptlFrstWrd(word) {
  let firstLetter = word.charAt(0).toUpperCase();
  let remainingLetters = word.substring(1);
  let capitalWord = firstLetter + remainingLetters;
  console.log(capitalWord);
  return capitalWord;
}
function showCurTemp(response) {
  console.log(response);

  let curTemp = Math.round(response.data.temperature.current);
  let curCon = response.data.condition.description;

  let curTempElement = document.querySelector("#current-temp");
  let curConElement = document.querySelector("#current-condition");

  curTempElement.innerHTML = curTemp;
  curConElement.innerHTML = curCon;
}

function showFTemp(response) {
  console.log(response);
  // tmorrow
  let tmrMxTmp = Math.round(response.data.daily[1].temperature.maximum);
  let tmrMnTmp = Math.round(response.data.daily[1].temperature.minimum);

  let tmrMxTmpElmnt = document.querySelector("#tmr-max");
  let tmrMnTmpElmnt = document.querySelector("#tmr-min");

  tmrMxTmpElmnt.innerHTML = tmrMxTmp;
  tmrMnTmpElmnt.innerHTML = tmrMnTmp;

  // day after tomorrow

  let tmr1MxTmp = Math.round(response.data.daily[2].temperature.maximum);
  let tmr1MnTmp = Math.round(response.data.daily[2].temperature.minimum);

  let tmr1MxTmpElmnt = document.querySelector("#tmr-plus-1-max");
  let tmr1MnTmpElmnt = document.querySelector("#tmr-plus-1-min");

  tmr1MxTmpElmnt.innerHTML = tmr1MxTmp;
  tmr1MnTmpElmnt.innerHTML = tmr1MnTmp;

  // day 3

  let tmr2MxTmp = Math.round(response.data.daily[3].temperature.maximum);
  let tmr2MnTmp = Math.round(response.data.daily[3].temperature.minimum);

  let tmr2MxTmpElmnt = document.querySelector("#tmr-plus-2-max");
  let tmr2MnTmpElmnt = document.querySelector("#tmr-plus-2-min");

  tmr2MxTmpElmnt.innerHTML = tmr2MxTmp;
  tmr2MnTmpElmnt.innerHTML = tmr2MnTmp;

  // day 4

  let tmr3MxTmp = Math.round(response.data.daily[4].temperature.maximum);
  let tmr3MnTmp = Math.round(response.data.daily[4].temperature.minimum);

  let tmr3MxTmpElmnt = document.querySelector("#tmr-plus-3-max");
  let tmr3MnTmpElmnt = document.querySelector("#tmr-plus-3-min");

  tmr3MxTmpElmnt.innerHTML = tmr3MxTmp;
  tmr3MnTmpElmnt.innerHTML = tmr3MnTmp;
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
