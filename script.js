'use strict';

// Selecting elements
const dots = document.querySelectorAll('.dot');
const message = document.querySelector('.result');
const btn = document.querySelector('.again');
const startGameBtn = document.querySelector('.btn');
const confirm = document.querySelector('.confirm');
const seconds = document.querySelector('.seconds');
const displayText = document.querySelector('.text');
let confirmedSeconds;
let arrNumbers = [];
let click;

// Get timer seconds
confirm.addEventListener('click', () => {
  confirmedSeconds = seconds.value * 1000;
  seconds.value = '';
  if (confirmedSeconds > 0) {
    displayText.innerHTML = `Numbers will disappear within ${
      confirmedSeconds / 1000
    } seconds. Remember them from smallest to
    greatest.
    Click ' Start Game ' button to play. `;
  } else {
    displayText.innerHTML = `Click number greater than 0`;
  }
  removeList(displayText, 'hidden');
});

for (let i = 0; i < dots.length; i++) {
  let number;

  startGameBtn.addEventListener('click', () => {
    click = 0;

    //Getting random non repetetive numbers
    dots[i].value = Math.trunc(Math.random() * 20) + 1;
    number = dots[i].value;

    //Storing into array
    if (!arrNumbers.includes(number)) {
      arrNumbers.push(number);
      showNumber(dots[i], number);
      hideNumber(dots[i]);
    } else {
      //create new random number
      const newNumber = Math.trunc(Math.random() * 20) + 1;
      number = newNumber;
      arrNumbers.push(number);
      showNumber(dots[i], number);
      hideNumber(dots[i]);
    }
    removeList(dots[i], 'right');
    removeList(dots[i], 'blur');
    removeList(dots[i], 'wrong');
    displayMessage('');
    console.log(arrNumbers);
  });

  dots[i].addEventListener('click', function () {
    if (dots[i].textContent === '?') {
      click++;
      let min = calcMin(arrNumbers);
      let max = calcMax(arrNumbers);

      // First click must be on the smallest number else show error and start over
      if (click === 1 && number === min) {
        addList(dots[i], 'right');
        showNumber(dots[i], number);
      } else if (click === 1 && number !== min) {
        incorrect(dots[i], number);

        btn.addEventListener('click', function () {
          onBtnClick(dots[i]);
        });
      }

      // If second click is the middle number, it's correct
      if (click === 2 && number !== max && number !== min) {
        addList(dots[i], 'right');
        showNumber(dots[i], number);
      }

      // If the third click is on the largest number, it's correct
      if (click >= 3 && number === max) {
        addList(dots[i], 'right');
        showNumber(dots[i], number);
      }

      // If the second is on the largest number show error and start over
      if (click === 2 && number === max) {
        incorrect(dots[i], number);

        btn.addEventListener('click', function () {
          onBtnClick(dots[i]);
        });
      }
      // If all 3 are correct
      if (click >= 3 && dots[i].classList.contains('right')) {
        displayMessage('YOU WON');
      }
    }
  });
}

// ---- FUNCTIONS -----

//Calculating max and min
function calcMax(arr) {
  let max = arr[0];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}

function calcMin(arr) {
  let min = arr[0];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < min) min = arr[i];
  }
  return min;
}

//Adding and removing the classes
function addList(element, result) {
  element.classList.add(result);
}

function removeList(element, result) {
  element.classList.remove(result);
}

// Displaying message
function displayMessage(msg) {
  message.textContent = msg;
}

// Incorrect number
function incorrect(element, num) {
  addList(element, 'blur');
  addList(element, 'wrong');
  showNumber(element, num);
  displayMessage('You choose wrong number. Try again!');
  btn.classList.remove('hidden');
}

//Button logic
function onBtnClick(element) {
  click = 0;
  removeList(element, 'right');
  removeList(element, 'wrong');
  removeList(element, 'blur');
  element.textContent = '?';
  displayMessage('');
  btn.classList.add('hidden');
}

//Show number
function showNumber(element, num) {
  element.textContent = num;
}

//Hide number
function hideNumber(element) {
  setTimeout(() => {
    element.textContent = '?';
  }, confirmedSeconds);
}
