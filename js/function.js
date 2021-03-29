const randomNumber = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomNegativePositive = () => {
  return Math.cos(Math.PI * Math.round(Math.random()));
}

const getRandomColor = () => {
  return `rgb(${randomNumber(255)}, ${randomNumber(255)}, ${randomNumber(255)}, 1)`;
}

const reduceColorOpacity = (rgbColor) => {
  const regex = /\d+(\.\d+)?/g;
  let i = 0
  return rgbColor.replace(regex, match => {
    i++;
    return (i === 4) ? parseFloat(match) - 0.5 : match;
  });
}


const update = () => {
  // Update vi tri so sanh
  ball.updateSizeCompare();
  
  // Thay doi chieu speed khi cham tuong
  if (ball.xLeft <= 0 || ball.xRight >= canvas.width) {
    ball.dx = -ball.dx;
  }
  
  // Thay doi chieu speed khi cham tuong + paddle
  if (ball.yTop <= 0) {
    ball.dy = -ball.dy;
  } else if (ball.checkCollision(paddle)) {
    ball.dy = -ball.dy;
    ball.y = paddle.y - ball.radius;
  } else if (ball.yBot >= canvas.height) {
    ball.dy = -ball.dy;
    game.decreaseLife();
  }
  
  // Di chuyen Paddle
  paddle.move();
  
  // Thay doi chieu speed khi cham bricks va powerUps
  if (!brickWall.bricks.some(col => col.some(brick => brick.status === true)) && ball.y > BALL_Y) {
    brickWall.setUp();
    game.increaseLevel(ball);
  } else {
    for (let col = 0; col < brickWall.brickColumnCount; col++) {
      for (let row = 0; row < brickWall.brickRowCount; row++) {
        const brick = brickWall.bricks[col][row];
        const powerUp = brickWall.powerUps[col][row];
        
        // Cham brick
        if (brick && brick.status) {
          if (ball.checkCollision(brick)) {
            brick.break(powerUp);
            ball.dy = -ball.dy;
          }
          
          bullets.forEach((bullet, index) => {
            if (game.checkCollision(bullet, brick, 'up')) {
              brick.break(powerUp);
              bullets.splice(index, 1);
            }
          });
        }
        
        // Cham powerUp
        if (powerUp && powerUp.status) {
          if (game.checkCollision(powerUp, paddle, 'down')) {
            powerUp.status = false;
            switch (powerUp.symbol) {
              case 'I':
                paddle.width = paddle.width + 50 > canvas.width ? canvas.width : paddle.width + 50;
                break;
              case 'D':
                paddle.width = paddle.width - 50 < PADDLE_WIDTH - 20 ? PADDLE_WIDTH - 20 : paddle.width - 50;
                break;
              case 'L':
                game.increaseLife();
                break;
              case 'G':
                game.changeBulletsState();
                break;
            }
          } else if (powerUp.y + powerUp.height > canvas.height) {
            powerUp.status = false;
          } else {
            powerUp.y += powerUp.speed;
          }
        }
      }
    }
  }
  
  // Thay doi vi tri ball
  ball.x += ball.dx;
  ball.y += ball.dy;
}
