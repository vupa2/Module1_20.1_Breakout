class Ball {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 1.4;
    this.ballRadius = 8;
    this.speed = 4;
    this.dx = this.speed;
    this.dy = -this.speed;
    this.color = '#e7e6e1';
  }

  draw() {
    // Ve hinh
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }


}

class Paddle {
  constructor() {
    this.height = 8;
    this.width = 50;
    this.x = (canvas.width - this.width) / 2;
    this.y = canvas.height - this.height - 50;
    this.color = '#f2a154';
    this.speed = 8;
  }

  draw() {
    // Ve hinh
    this.update();

    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    // Di chuyen trai phai
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
  constructor() {
    this.width = 67;
    this.height = 27;
    this.x = 0;
    this.y = 0
    this.color = '#e84545';
    this.status = true;
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
    this.padding = 8;
    this.brickRowCount = 7;
    this.brickColumnCount = 6;
    this.brickOffsetTop = 25;
    this.brickOffsetLeft = 30;
    this.bricks = [];
    this.powerUps = [];
  }

  setUp() {
    for (let col = 0; col < this.brickColumnCount; col++) {
      this.bricks[col] = [];
      this.powerUps[col] = [];
      for (let row = 0; row < this.brickRowCount; row++) {
        this.bricks[col][row] = new Brick();
        this.powerUps[col][row] = new PowerUp();
      }
    }
  }

  draw() {
    // Ve hinh
    for(let col = 0; col < this.brickColumnCount; col++) {
      for(let row = 0; row < this.brickRowCount; row++) {
        const bricks = this.bricks[col][row];

        if (bricks.status) {
          bricks.x = (col * (bricks.width + this.padding)) + this.brickOffsetLeft;
          bricks.y = (row * (bricks.height + this.padding)) + this.brickOffsetTop;

          this.powerUps[col][row].setUp(bricks.x, bricks.y, bricks.width, bricks.height);

          bricks.draw();
        }
        this.powerUps[col][row].draw();
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
    this.color = '#fff600';
    this.symbol = '~'
    this.status = false;
  }

  setUp(brickX, brickY, brickWidth, brickHeight) {
    this.x = brickX + brickWidth / 2;
    this.y = brickY + brickHeight / 2;
    this.width = brickHeight / 2;
    this.height = this.width;
  }

  draw() {
    if (this.status) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.strokeStyle = this.color;
      ctx.strokeRect(this.x - this.width * 0.5, this.y - this.height * 0.5, this.width, this.height);
      ctx.font = "bold " + this.height + "px " + "Lucida Console";
      ctx.textBaseline = 'middle';
      ctx.textAlign = "center";
      ctx.fillText(this.symbol, this.x, this.y);
      ctx.closePath();
    }
  }

  update() {
    if (this.status) {
      if (this.y >= canvas.height) {
        this.status = false;
      } else {
        this.y += this.speed;
      }
    }
  }
}