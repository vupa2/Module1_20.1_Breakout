const canvas = document.getElementById("main-game"),
      ctx = canvas.getContext("2d");

// Tham so
const GAME_LIFE = 3; // 3
      GAME_COLORS = ['#2f335c', '#9c3d54', '#387c6d'];

const BALL_RADIUS = 8,
      BALL_X = canvas.width / 2,
      BALL_Y = canvas.height / 1.4,
      BALL_SPEED = 4, // 4:Default
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
      BRICK_LIFE = 2;

const WALL_BRICK_PADDING = 8,
      WALL_BRICK_COLUMN = 6,
      WALL_BRICK_ROW = 8,
      WALL_OFFSET_TOP = 25,
      WALL_OFFSET_LEFT = 30;

const PUP_CHANCE = 0.5,
      PUP_SPEED = 4;

const BULLET_WIDTH = 10;
      BULLET_HEIGHT = 10;

const PupType = {
  INCREASE: {color: "#17FF00", symbol: "I"},
  DECRESE: {color: "#FFD500", symbol: "D"},
  LIFE: {color: "#F875AA", symbol: "L"},
  GUN: {color: "#75F8ED", symbol: "G"}
}

// Doi Tuong
const bullets = [];
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

  if (bullets.length > 0) {
    bullets.forEach((bullet, index) => {
      bullet.draw();
      if (bullet.y < 0) {
        bullets.splice(index, 1);
      } else {
        bullet.y -= 2;
      }
    });
  }

  if (!game.over) update(game, ball, paddle, brickWall);

  requestAnimationFrame(drawAll);
}

requestAnimationFrame(drawAll);