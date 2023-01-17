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

// Unit converter

function convertToF(event) {
  if (unit === "celsius") {
    for (let index = 0; index < 11; index++) {
      document.querySelector(`#temp${index}`).innerHTML = parseInt(
        Math.round(document.querySelector(`#temp${index}`).innerHTML) + 1.8 + 32
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

let unit = "celsius";
let fahrenheit = document.querySelector("#fahrenheit");
let celsius = document.querySelector("#celsius");

celsius.addEventListener("click", convertToC);
fahrenheit.addEventListener("click", convertToF);

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
  let curIcon = response.data.condition.icon_url;

  let curTempElement = document.querySelector("#temp0");
  let curConElement = document.querySelector("#current-condition");
  let curIconElement = document.querySelector("#current-icon");

  curTempElement.innerHTML = curTemp;
  curConElement.innerHTML = curCon;
  curIconElement.src = curIcon;

  unit = "celsius";
}

function showFTemp(response) {
  console.log(response);
  //today

  let todayMax = Math.round(response.data.daily[0].temperature.maximum);
  let todayMin = Math.round(response.data.daily[0].temperature.minimum);

  let todayMaxElement = document.querySelector("#temp1");
  let todayMinElement = document.querySelector("#temp2");

  todayMaxElement.innerHTML = todayMax;
  todayMinElement.innerHTML = todayMin;

  // tmorrow

  let tmrMxTmp = Math.round(response.data.daily[1].temperature.maximum);
  let tmrMnTmp = Math.round(response.data.daily[1].temperature.minimum);
  let tmrCon = response.data.daily[1].condition.description;
  let tmrIcon = response.data.daily[1].condition.icon_url;

  console.log(response.data.daily[1].condition.description);

  let tmrMxTmpElmnt = document.querySelector("#temp3");
  let tmrMnTmpElmnt = document.querySelector("#temp4");
  let tmrConElmnt = document.querySelector("#tomorrow-condition");
  let tmrIconElmnt = document.querySelector("#tomorrow-icon");

  tmrMxTmpElmnt.innerHTML = tmrMxTmp;
  tmrMnTmpElmnt.innerHTML = tmrMnTmp;
  tmrConElmnt.innerHTML = tmrCon;
  tmrIconElmnt.src = tmrIcon;

  // day after tomorrow

  let tmr1MxTmp = Math.round(response.data.daily[2].temperature.maximum);
  let tmr1MnTmp = Math.round(response.data.daily[2].temperature.minimum);
  let tmr1Con = response.data.daily[2].condition.description;
  let tmr1Icon = response.data.daily[2].condition.icon_url;

  let tmr1MxTmpElmnt = document.querySelector("#temp5");
  let tmr1MnTmpElmnt = document.querySelector("#temp6");
  let tmr1ConElmnt = document.querySelector("#tomorrow-1-condition");
  let tmr1IconElmnt = document.querySelector("#tomorrow-1-icon");

  tmr1MxTmpElmnt.innerHTML = tmr1MxTmp;
  tmr1MnTmpElmnt.innerHTML = tmr1MnTmp;
  tmr1ConElmnt.innerHTML = tmr1Con;
  tmr1IconElmnt.src = tmr1Icon;

  // day 3

  let tmr2MxTmp = Math.round(response.data.daily[3].temperature.maximum);
  let tmr2MnTmp = Math.round(response.data.daily[3].temperature.minimum);
  let tmr2Con = response.data.daily[3].condition.description;
  let tmr2Icon = response.data.daily[3].condition.icon_url;

  let tmr2MxTmpElmnt = document.querySelector("#temp7");
  let tmr2MnTmpElmnt = document.querySelector("#temp8");
  let tmr2ConElmnt = document.querySelector("#tomorrow-2-condition");
  let tmr2IconElmnt = document.querySelector("#tomorrow-2-icon");

  tmr2MxTmpElmnt.innerHTML = tmr2MxTmp;
  tmr2MnTmpElmnt.innerHTML = tmr2MnTmp;
  tmr2ConElmnt.innerHTML = tmr2Con;
  tmr2IconElmnt.src = tmr2Icon;

  // day 4

  let tmr3MxTmp = Math.round(response.data.daily[4].temperature.maximum);
  let tmr3MnTmp = Math.round(response.data.daily[4].temperature.minimum);
  let tmr3Con = response.data.daily[4].condition.description;
  let tmr3Icon = response.data.daily[4].condition.icon_url;

  let tmr3MxTmpElmnt = document.querySelector("#temp9");
  let tmr3MnTmpElmnt = document.querySelector("#temp10");
  let tmr3ConElmnt = document.querySelector("#tomorrow-3-condition");
  let tmr3IconElmnt = document.querySelector("#tomorrow-3-icon");

  tmr3MxTmpElmnt.innerHTML = tmr3MxTmp;
  tmr3MnTmpElmnt.innerHTML = tmr3MnTmp;
  tmr3ConElmnt.innerHTML = tmr3Con;
  tmr3IconElmnt.src = tmr3Icon;

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
