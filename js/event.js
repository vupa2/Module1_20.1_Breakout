// Bat su kien phim
let rightPressed = false, leftPressed = false;

const keyDownHandler = (e) => {
  switch (e.keyCode) {
    case 39:
      rightPressed = true;
      break;
    case 37:
      leftPressed = true;
      break;
    case 32:
      game.fireBullet()
      break;
    case 13:
      game.statusControl();
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
  
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  document.querySelector('#game-info button').addEventListener('click', () => { game.statusControl(); }, false);
}

document.addEventListener("DOMContentLoaded", initialize, false);