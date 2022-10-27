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

const characterElement = document.querySelector(".character");
const inputElement = document.querySelector(".input");
const scoreContainer = document.querySelector(".score-container");
const scoreElement = document.querySelector(".score");
const resultElement = document.querySelector(".result");
const buttonElement = document.querySelector(".restart");
const audioElement = new Audio("audio/wav_Game-over.wav");

let score = 0;
let startTime;
let currentCharacter;
let gameStartTime;
let gameOver = false;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function endGame() {
  gameOver = true;
  characterElement.textContent = "やった！";
  resultElement.style.display = "block";
  resultElement.textContent = `Time: ${Math.floor((Date.now() - gameStartTime) / 1000)} seconds`;
  audioElement.volume = 0.1;
  audioElement.play();
}

function checkAnswer() {
  if (gameOver) {
    return;
  }

  if (inputElement.value.trim().toLowerCase() === currentCharacter.romaji.toLowerCase()) {
    score += 10;
  } else {
    score -= 5;
    if (score < 0) {
      score = 0;
    }
    scoreContainer.classList.add("incorrect");
    setTimeout(function () {
      scoreContainer.classList.remove("incorrect");
    }, 300);
  }
  scoreElement.textContent = score;
  inputElement.value = "";
  nextCharacter();
}

function nextCharacter() {
  if (gameOver) {
    return;
  }

  gameStartTime = gameStartTime || Date.now();
  startTime = Date.now();

  const charactersShuffled = shuffle(characters);
  let character;
  let index;
  for (let i = 0; i < charactersShuffled.length; i++) {
    character = charactersShuffled[i];
    index = characters.indexOf(character);
    if (!character.guessed) {
      character.guessed = true;
      startTime = Date.now();
      currentCharacter = character;
      characterElement.textContent = character.hiragana;
      inputElement.value = "";
      inputElement.focus();
      return;
    }
  }
  gameOver = true;
  endGame();
}

inputElement.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    checkAnswer();
  }
});

buttonElement.addEventListener("click", function () {
  location.reload();
});

nextCharacter();
