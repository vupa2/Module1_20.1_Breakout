const canvas = document.getElementById("mainGame"), ctx = canvas.getContext("2d");

// Functions chung
const getRandomColor = () => {
  function getRandomHex() {
    return Math.floor(Math.random() * 255);
  }
  return `rgb(${getRandomHex()}, ${getRandomHex()}, ${getRandomHex(), 1})`;
}

// Doi Tuong
const ball = new Ball();
const paddle = new Paddle();
const brickWall = new BricksWall();
brickWall.setUp()

const drawAll = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  brickWall.draw();
  paddle.draw();
  ball.update(paddle, brickWall);
  ball.draw();

  requestAnimationFrame(drawAll);
}

requestAnimationFrame(drawAll);