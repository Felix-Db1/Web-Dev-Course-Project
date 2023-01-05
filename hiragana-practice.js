const characters = [
  { hiragana: "あ", romaji: "a" },
  { hiragana: "い", romaji: "i" },
  { hiragana: "う", romaji: "u" },
  { hiragana: "え", romaji: "e" },
  { hiragana: "お", romaji: "o" },
  { hiragana: "か", romaji: "ka" },
  { hiragana: "き", romaji: "ki" },
  { hiragana: "く", romaji: "ku" },
  { hiragana: "け", romaji: "ke" },
  { hiragana: "こ", romaji: "ko" },
  { hiragana: "さ", romaji: "sa" },
  { hiragana: "し", romaji: "shi" },
  { hiragana: "す", romaji: "su" },
  { hiragana: "せ", romaji: "se" },
  { hiragana: "そ", romaji: "so" },
  { hiragana: "た", romaji: "ta" },
  { hiragana: "ち", romaji: "chi" },
  { hiragana: "つ", romaji: "tsu" },
  { hiragana: "て", romaji: "te" },
  { hiragana: "と", romaji: "to" },
  { hiragana: "な", romaji: "na" },
  { hiragana: "に", romaji: "ni" },
  { hiragana: "ぬ", romaji: "nu" },
  { hiragana: "ね", romaji: "ne" },
  { hiragana: "の", romaji: "no" },
  { hiragana: "は", romaji: "ha" },
  { hiragana: "ひ", romaji: "hi" },
  { hiragana: "ふ", romaji: "fu" },
  { hiragana: "へ", romaji: "he" },
  { hiragana: "ほ", romaji: "ho" },
  { hiragana: "ま", romaji: "ma" },
  { hiragana: "み", romaji: "mi" },
  { hiragana: "む", romaji: "mu" },
  { hiragana: "め", romaji: "me" },
  { hiragana: "も", romaji: "mo" },
  { hiragana: "や", romaji: "ya" },
  { hiragana: "ゆ", romaji: "yu" },
  { hiragana: "よ", romaji: "yo" },
  { hiragana: "ら", romaji: "ra" },
  { hiragana: "り", romaji: "ri" },
  { hiragana: "る", romaji: "ru" },
  { hiragana: "れ", romaji: "re" },
  { hiragana: "ろ", romaji: "ro" },
  { hiragana: "わ", romaji: "wa" },
  { hiragana: "を", romaji: "wo" },
  { hiragana: "ん", romaji: "n" },
];
// creates an array with multiple elements
// each element is an object
// each object has two properties (keys)

const characterElement = document.querySelector(".character");
// selects an element from the HTML document
// takes a CSS selector as an argument and returns the first element that matches the selector
// stores a reference to that element in a variable
const inputElement = document.querySelector(".input");
const scoreContainer = document.querySelector(".score-container");
const scoreElement = document.querySelector(".score");
const timeResultElement = document.querySelector(".time-result");
const buttonElement = document.querySelector(".restart");
const audioElement = new Audio("audio/wav_Game-over.wav");
// creates and returns a new HTMLAudioElement object
// optionally starts the process of loading an audio file

let score = 0;
let startTime;
let currentCharacter;
let gameOver = false;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // destructuring assignment
  }
  return array;
}
// takes an array as an argument and shuffles its elements randomly
// loops through the array backwards and swaps each element with another random element
// returns the shuffled array
// Math.floor() rounds down the result to the nearest whole number
// Math.random() returns a random number between 0 (inclusive) and 1 (exclusive)

function nextCharacter() {
  const charactersShuffled = shuffle(characters);
  let character;
  for (let i = 0; i < charactersShuffled.length; i++) {
    character = charactersShuffled[i];
    if (!character.guessed) {
      character.guessed = true;
      currentCharacter = character;
      characterElement.textContent = character.hiragana;
      return;
    }
  }
  gameOver = true;
  endGame();
}
// selects the first/next character to be displayed
// creates a new array which is a shuffled version of the original characters array
// iterates through the shuffled array to find the next character that has not been guessed yet
// the for loop completes when all characters have been used
// displays the end game screen

function checkAnswer() {
  if (gameOver) {
    return;
  }

  if (!startTime) {
    startTime = Date.now();
  }

  if (inputElement.value.trim().toLowerCase() === currentCharacter.romaji) {
    score += 10;
  } else {
    score -= 5;
    if (score < 0) {
      score = 0;
    }
    scoreContainer.classList.add("incorrect-bg-color");
    setTimeout(function () {
      scoreContainer.classList.remove("incorrect-bg-color");
    }, 300);
  }

  scoreElement.textContent = score;
  inputElement.value = "";
  nextCharacter();
}
// sets the start time to the current time if it hasn't been set yet
// increases the score by 10 if the answer is correct
// decreases the score by 5 if the answer is incorrect and changes the background color of the score container element for 0.3 seconds
// updates the score element with the current score
// clears the user's input
// displays the next character

function endGame() {
  characterElement.textContent = "やった！";
  timeResultElement.style.display = "block";
  // timeResultElement.textContent = `Time: ${Math.round((Date.now() - startTime) / 1000)} seconds`;
  timeResultElement.textContent = `Time: ${((Date.now() - startTime) / 1000).toFixed(1)} seconds`;
  audioElement.volume = 0.1;
  audioElement.play();
}
// changes the text content of the character element to a custom message
// makes the timer visible and displays the time it took to finish the game
// plays an audio file

inputElement.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    checkAnswer();
  }
});
// adds an event listener for the keydown event to the input element
// if the pressed key is Enter, the default action of the event (submit form) is prevented and the checkAnswer function is called

buttonElement.addEventListener("click", function () {
  location.reload();
});
// adds an event listener for the click event to the button element
// when the button is clicked, the current page reloads

nextCharacter();
// starts the game
