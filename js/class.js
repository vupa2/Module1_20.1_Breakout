class Game {
  constructor() {
    this.life = LIFE;
    this.score = 0;
  }

  decreaseLife() {
    this.life--;
    document.querySelector('#life').innerText = this.life;
  }

  increaseLife() {
    this.life++;
    document.querySelector('#life').innerText = this.life;
  }

  increaseScore() {
    this.score++;
    document.querySelector('#score').innerText = this.score;
  }
}

class Ball {
  constructor() {
    this.ballRadius = BALL_RADIUS;
    this.x = BALL_X;
    this.y = BALL_Y;
    this.speed = BALL_SPEED;
    this.dx = this.speed;
    this.dy = -this.speed;
    this.color = BALL_COLOR;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class Paddle {
  constructor() {
    this.height = PADDLE_HEIGHT;
    this.width = PADDLE_WIDTH;
    this.x = PADDLE_X;
    this.y = PADDLE_Y;
    this.color = PADDLE_COLOR;
    this.speed = PADDLE_SPEED;
  }

  draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class Brick {
  constructor(color) {
    this.width = BRICK_WIDTH;
    this.height = BRICK_HEIGHT;
    this.x = 0;
    this.y = 0;
    this.color = color;
    this.status = true;
  }
;
  draw() {
    if (this.status) {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
  }
}

class BricksWall {
  constructor() {
    this.padding = 8;
    this.brickRowCount = 9;
    this.brickColumnCount = 6;
    this.brickOffsetTop = 25;
    this.brickOffsetLeft = 30;
    this.bricks = [];
    this.powerUps = [];
    this.powerUpChance = 0.65;
  }

  setUp() {
    this.bricks = [];
    this.powerUps = [];
    for (let col = 0; col < this.brickColumnCount; col++) {
      this.bricks[col] = [];
      this.powerUps[col] = [];
      const color = getRandomColor()
      for (let row = 0; row < this.brickRowCount; row++) {
        this.bricks[col][row] = new Brick(color);

        if (Math.random() >= this.powerUpChance) this.powerUps[col][row] = new PowerUp();
      }
    }
  }

  draw() {
    for(let col = 0; col < this.brickColumnCount; col++) {
      for(let row = 0; row < this.brickRowCount; row++) {
        const bricks = this.bricks[col][row];
        const powerUps = this.powerUps[col][row] ?? null;

        if (bricks.status) {
          bricks.x = (col * (bricks.width + this.padding)) + this.brickOffsetLeft;
          bricks.y = (row * (bricks.height + this.padding)) + this.brickOffsetTop;
          if (powerUps) powerUps.setUp(bricks.x, bricks.y, bricks.width, bricks.height);
          bricks.draw();
        }

        if (powerUps) powerUps.draw();
      }
    }
  }
}

class PowerUp {
  constructor() {
    this.width = 0;
    this.height = 0;
    this.x = 0;
    this.y = 0;
    this.speed = 5;
    this.type = PupType[Object.keys(PupType)[randomNumber(Object.keys(PupType).length - 1)]];
    this.color = this.type.color;
    this.symbol = this.type.symbol;
    this.status = false;
  }

  setUp(brickX, brickY, brickWidth, brickHeight) {
    this.x = brickX + brickWidth / 2;
    this.y = brickY + brickHeight / 2;
    this.width = brickHeight / 1.4;
    this.height = this.width;
  }

  draw() {
    if (this.status) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.strokeStyle = this.color;
      ctx.strokeRect(this.x - this.width * 0.5, this.y - this.height * 0.5, this.width, this.height);
      ctx.font = "bold " + this.height + "px " + "Arial";
      ctx.textBaseline = 'middle';
      ctx.textAlign = "center";
      ctx.fillText(this.symbol, this.x, this.y);
      ctx.closePath();
    }
  }
}