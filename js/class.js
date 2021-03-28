class Game {
  constructor() {
    this.life = GAME_LIFE;
    this.score = 0;
    this.status = false;
    this.color = GAME_COLORS[randomNumber(GAME_COLORS.length - 1)];
    this.bulletsState = false;
  }
  
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
  }
  
  decreaseLife() {
    this.life--;
    document.querySelector('#life').innerText = this.life;
    if (this.life <= 0) this.over();
  }
  
  increaseLife() {
    this.life++;
    document.querySelector('#life').innerText = this.life;
  }
  
  increaseScore() {
    this.score++;
    document.querySelector('#score').innerText = this.score;
  }
  
  changeColor() {
    this.color = GAME_COLORS[randomNumber(GAME_COLORS.length - 1)];
  }
  
  statusControl() {
    const button = document.querySelector('#game-info button');
    if (!game.status) {
      game.status = true;
      button.innerText = 'Enter To Restart';
    } else {
      document.location.reload();
    }
  }
  
  over() {
    this.status = false;
    this.saveToStorage();
    alert("GAME OVER");
    document.location.reload();
  }
  
  saveToStorage() {
    if (this.score > parseInt(localStorage.getItem("highestScore"))) localStorage.setItem("highestScore", this.score);
  }
  
  changeBulletsState() {
    this.bulletsState = true;
    setTimeout(() => { this.bulletsState = false; }, 2000)
  }
  
  fireBullet() {
    if (this.bulletsState) bullets.push(new Bullet(paddle));
  }
}

class Ball {
  constructor() {
    this.radius = BALL_RADIUS;
    this.diameter = this.radius * 2;
    this.x = BALL_X;
    this.y = BALL_Y;
    this.speed = BALL_SPEED;
    this.speedMax = BALL_SPEED_MAX;
    this.dx = this.speed;
    this.dy = -this.speed;
    this.color = BALL_COLOR;
  }
  
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  
  update() {
    this.xLeft = this.x - this.radius;
    this.xRight = this.x + this.radius;
    this.yTop = this.y - this.radius;
    this.yBot = this.y + this.radius;
  }
  
  checkCollision(target) {
    return this.xRight >= target.x && this.xLeft <= target.x + target.width && this.yBot >= target.y && this.yTop <= target.y + target.height;
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
    this.xLeft = this.x - this.radius;
    this.xRight = this.x + this.radius;
    this.yTop = this.y - this.radius;
    this.yBot = this.y + this.radius;
  }
  
  draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  
  move() {
    if (rightPressed) {
      this.x += this.speed;
      if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
    } else if (leftPressed) {
      this.x -= this.speed;
      if (this.x < 0) this.x = 0;
    }
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
    this.life = 2;
  }
  
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
    this.padding = WALL_BRICK_PADDING;
    this.brickColumnCount = WALL_BRICK_COLUMN;
    this.brickRowCount = WALL_BRICK_ROW;
    this.brickOffsetTop = WALL_OFFSET_TOP;
    this.brickOffsetLeft = WALL_OFFSET_LEFT;
    this.bricks = [];
    this.powerUps = [];
    this.powerUpChance = PUP_CHANCE;
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
    for (let col = 0; col < this.brickColumnCount; col++) {
      for (let row = 0; row < this.brickRowCount; row++) {
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
    this.speed = PUP_SPEED;
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

class Bullet {
  constructor(paddle) {
    this.width = BULLET_WIDTH;
    this.height = BULLET_HEIGHT;
    this.x = paddle.x + paddle.width / 2 - this.width / 2;
    this.y = paddle.y - this.height;
    this.speed = 4;
    this.status = false;
    this.color = 'red';
  }
  
  setUp(paddle) {
    this.x = paddle.x + paddle.width / 2 - this.width / 2;
    this.y = paddle.y - this.height;
  }
  
  draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}