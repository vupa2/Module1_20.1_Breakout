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

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//
document.querySelector('#game-info button').addEventListener('click', (e) => {

  if (e.target.innerText === 'Start') {
    e.target.innerText = 'Restart';
  } else if (e.target.innerText === 'Restart') {
    document.location.reload();
  }
  // e.target.innerText = 'Restart'
})