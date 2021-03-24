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

  update(paddle, brickWall) {
    // Thay doi chieu speed khi cham tuong
    if (this.x + this.dx > canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
      this.dx = -this.dx;
    }

    // Thay doi chieu speed khi cham tuong + paddle
    if (this.y + this.dy < this.ballRadius) {
      this.dy = -this.dy;
    } else if (this.y + this.dy > paddle.y & this.x > paddle.x && this.x < paddle.x + paddle.width) {
      this.dy = -this.dy;
    } else if (this.y + this.dy > canvas.height - this.ballRadius) {
      this.dy = -this.dy; // lose
      // alert("GAME OVER");
      // document.location.reload();
    }

    // Thay doi chieu speed khi cham brick
    for (let col = 0; col < brickWall.brickColumnCount; col++) {
      for (let row = 0; row < brickWall.brickRowCount; row++) {
        if (brickWall.bricks[col][row].status === 1) {
          if (this.x > brickWall.bricks[col][row].x && this.x < brickWall.bricks[col][row].x + brickWall.bricks[col][row].width && this.y > brickWall.bricks[col][row].y && this.y < brickWall.bricks[col][row].y + brickWall.bricks[col][row].height) {
            this.dy = -this.dy * 1.005;
            brickWall.bricks[col][row].status = 0;
          }
        }
      }
    }

    // Thay doi vi tri
    this.x += this.dx;
    this.y += this.dy;
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
    this.status = 1;
  }

  draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
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
      this.powerUps[col] = [];;
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
        if (this.bricks[col][row].status === 1) {
          this.bricks[col][row].x = (col * (this.bricks[col][row].width + this.padding)) + this.brickOffsetLeft;
          this.bricks[col][row].y = (row * (this.bricks[col][row].height + this.padding)) + this.brickOffsetTop;
          this.powerUps[col][row].setUp(this.bricks[col][row].x, this.bricks[col][row].y, this.bricks[col][row].width, this.bricks[col][row].height)
          this.bricks[col][row].draw();
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
    this.speed = 7;
    this.color = '#fff600';
    this.symbol = '~'
    this.display = true;
  }

  setUp(brickX, brickY, brickWidth, brickHeight) {
    this.x = brickX + brickWidth / 2;
    this.y = brickY + brickHeight / 2;
    this.width = brickHeight / 2;
    this.height = this.width;
  }

  draw() {
    if (this.display) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.strokeStyle = this.color;
      ctx.strokeRect(this.x - this.width * 0.5, this.y - this.height * 0.5, this.width, this.height);
      ctx.font = "bold " + this.height + "px " + "Lucida Console";
      ctx.textBaseline = 'middle';
      ctx.textAlign = "center";
      ctx.fillText(this.symbol, this.x, this.y);
      ctx.closePath();

      this.update();
    }
  }

  update() {
    this.y += this.speed;
  }
}