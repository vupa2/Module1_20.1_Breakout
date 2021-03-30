const canvas = document.getElementById("main-game"),
      ctx = canvas.getContext("2d");

// Audio
const FX_HIT_BRICK = new Audio("audio/brick_hit.mp3"),
      FX_HIT_PADDLE = new Audio("audio/paddle_hit.mp3"),
      FX_HIT_WALL = new Audio("audio/wall.mp3"),
      FX_HIT_POWER = new Audio("audio/powerup.mp3"),
      FX_LIFE_LOST = new Audio("/audio/life_lost.mp3"),
      FX_NEXT_LEVEL = new Audio("audio/win.mp3"),
      FX_BULLET = new Audio("audio/bullet.wav");

FX_HIT_BRICK.volume = 0.08;
FX_HIT_PADDLE.volume = 0.08;
FX_HIT_POWER.volume = 0.2;
FX_HIT_WALL.volume = 0.08;
FX_LIFE_LOST.volume = 0.08;
FX_NEXT_LEVEL.volume = 0.1;
FX_BULLET.volume = 0.1;

// Tham so
const GAME_LIFE = 3; // 3
      GAME_COLORS = ['#2f335c', '#9c3d54', '#387c6d'];

const BALL_RADIUS = 8,
      BALL_X = canvas.width / 2,
      BALL_Y = canvas.height / 1.1,
      BALL_SPEED = 7, // 4:Default
      BALL_SPEED_MAX = 20,
      BALL_COLOR = '#e7e6e1';

const PADDLE_WIDTH = 80,
      PADDLE_HEIGHT = 8,
      PADDLE_X = (canvas.width - PADDLE_WIDTH) / 2,
      PADDLE_Y = canvas.height - PADDLE_HEIGHT - 20,
      PADDLE_COLOR = '#f2a154',
      PADDLE_SPEED = 10;

const BRICK_WIDTH = 67,
      BRICK_HEIGHT = 27,
      BRICK_COLOR = '#e84545',
      BRICK_LIFE = 2;

const WALL_BRICK_PADDING = 8, // 8
      WALL_BRICK_COLUMN = 6, // 6
      WALL_BRICK_ROW = 8, // 8
      WALL_OFFSET_TOP = 25,
      WALL_OFFSET_LEFT = 30;

const PUP_CHANCE = 0.6,
      PUP_SPEED = 2;

const BULLET_WIDTH = 10;
      BULLET_HEIGHT = 10;

const PupType = {
      INCREASE: {color: "#17FF00", symbol: "I"},
      DECREASE: {color: "#FFD500", symbol: "D"},
      LIFE: {color: "#F875AA", symbol: "L"},
      GUN: {color: "#75F8ED", symbol: "G"}
}

// Doi Tuong
const bullets = [];
const game = new Game();
const ball = new Ball();
const paddle = new Paddle();

const brickWall = new BricksWall();
brickWall.setUp();

const drawAll = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.draw();
  brickWall.draw();
  paddle.draw();
  ball.draw();

  if (bullets.length > 0) {
    bullets.forEach((bullet, index) => {
      bullet.draw();
      bullet.y < 0 ? bullets.splice(index, 1) : bullet.y -= 2;
    });
  }

  if (game.status) update(game, ball, paddle, brickWall);

  // requestAnimationFrame(drawAll);
  setTimeout(drawAll, 1000/60);
}

// requestAnimationFrame(drawAll);
drawAll();
