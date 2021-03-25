// Bat su kien phim
let rightPressed = false, leftPressed = false;

const gameStateControl = () => {
console.log('run');
  game.over = false;

  const button = document.querySelector('#game-info button');
  if (button.innerText === 'Space To Start') {
    button.innerText = 'Space To Restart';
  } else if (button.innerText === 'Space To Restart') {
    document.location.reload();
  }
}

const keyDownHandler = (e) => {
  switch (e.keyCode) {
    case 39:
      rightPressed = true;
      break;
    case 37:
      leftPressed = true;
      break;
    case 32:
      gameStateControl();
      break;
  }
}

const keyUpHandler = (e) => {
  switch (e.keyCode) {
    case 39:
      rightPressed = false;
      break;
    case 37:
      leftPressed = false;
      break;
  }
}

const initialize = () => {
  const highestScoreTag = document.querySelector('#game-info #highest span')
  const highestScoreData = localStorage.getItem("highestScore");

  highestScoreTag.innerText = highestScoreData ? highestScoreData : 0;
}

document.addEventListener("DOMContentLoaded", initialize, false)
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.querySelector('#game-info button').addEventListener('click', gameStateControl, false)