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
