const canvas = document.getElementById("main-game"), ctx = canvas.getContext("2d");

// Tham so
const LIFE = 3;

const BALL_RADIUS = 8,
      BALL_X = canvas.width / 2,
      BALL_Y = canvas.height / 1.4,
      BALL_SPEED = 4,
      BALL_SPEED_MAX = 30,
      BALL_COLOR = '#e7e6e1';

const PADDLE_WIDTH = 80,
      PADDLE_HEIGHT = 8,
      PADDLE_X = (canvas.width - PADDLE_WIDTH) / 2,
      PADDLE_Y = canvas.height - PADDLE_HEIGHT - 20,
      PADDLE_COLOR = '#f2a154',
      PADDLE_SPEED = 12;

const BRICK_WIDTH = 67,
      BRICK_HEIGHT = 27,
      BRICK_COLOR = '#e84545';

const PupType = {
  INCREASE: {color: "#17FF00", symbol: "I"},
  DECRESE: {color: "#FFD500", symbol: "D"},
  LIFE: {color: "#f875aa", symbol: "L"}
}

// Doi Tuong
const game = new Game();
const ball = new Ball();
const paddle = new Paddle();
const brickWall = new BricksWall();
brickWall.setUp()

const drawAll = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.draw();
  brickWall.draw();
  paddle.draw();
  ball.draw();
  if (!game.over) update(game, ball, paddle, brickWall);

  requestAnimationFrame(drawAll);
}

requestAnimationFrame(drawAll);