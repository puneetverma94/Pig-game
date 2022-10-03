'use strict';

//Selecting elements

let score0El = document.querySelector('#score--0');
let score1El = document.querySelector('#score--1');
let current0 = document.querySelector('#current--0');
let current1 = document.querySelector('#current--1');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnhold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//Starting condition

score0El.textContent = '0';
score1El.textContent = '0';
diceEl.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;
let score = [0, 0];
let playing = true;

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Resetting the game

btnNew.addEventListener('click', function () {
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  diceEl.classList.add('hidden');
  document.querySelector(`.player--1`).classList.remove('player--active');
});

//Rolling dice funtionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generating a random no.
    const dice = Math.trunc(Math.random() * 6 + 1);
    console.log(dice);

    //Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //check for rolled 1: if true switch to next player
    if (dice !== 1) {
      // Add dice to current Score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to Next player
      switchPlayer();
    }
  }
});

btnhold.addEventListener('click', function () {
  if (playing) {
    //Add current score to active player
    score[activePlayer] += currentScore;
    console.log(score);
    //check score is >=100, if yes declare winner.
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});
