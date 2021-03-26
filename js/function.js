const randomNumber = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
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

const saveToStorage = (score) => {
  if (score > localStorage.getItem("highestScore")) localStorage.setItem("highestScore", score);
}

const ballCheckCollision = (ball, targetObject) => {
  return ball.xRight >= targetObject.x && ball.xLeft <= targetObject.x + targetObject.width && ball.yBot >= targetObject.y && ball.yTop <= targetObject.y + targetObject.height;
}

const otherCheckCollisionDown = (current, target) => {
  return current.y + current.height >= target.y && current.x >= target.x && current.x + current.width <= target.x + target.width;
}

const otherCheckCollisionUp = (current, target) => {
  return current.y >= target.y && current.y <= target.y + target.height && current.x >= target.x && current.x <= target.x + target.width
}

const brickBreak = (brick, powerUp) => {
  if (brick.life > 1) {
    brick.life--;
    brick.color = reduceColorOpacity(brick.color);
  } else {
    game.increaseScore();
    brick.status = false;
    if (powerUp) powerUp.status = true;
  }
}

const update = () => {
  // Update vi tri so sanh
  ball.update();

  // Thay doi chieu speed khi cham tuong
  if (ball.xLeft < 0 || ball.xRight >= canvas.width) {
    ball.dx = -ball.dx;
  }

  // Thay doi chieu speed khi cham tuong + paddle
  if (ball.yTop <= 0) {
    ball.dy = -ball.dy;
  } else if (ballCheckCollision(ball, paddle)) {
    ball.dy = -ball.dy;
  } else if (ball.yBot >= canvas.height) {
    ball.dy = -ball.dy;
    game.decreaseLife();
  }

  // Di chuyen Paddle
  paddle.move();

  // Thay doi chieu speed khi cham bricks va powerUps
  if (!brickWall.bricks.some(col => col.some(brick => brick.status === true)) && ball.y > BALL_Y) {
    brickWall.setUp();
    game.changeColor();
  } else {
    for (let col = 0; col < brickWall.brickColumnCount; col++) {
      for (let row = 0; row < brickWall.brickRowCount; row++) {
        const brick = brickWall.bricks[col][row];
        const powerUp = brickWall.powerUps[col][row];

        // Cham brick
        if (brick && brick.status) {
          if (ballCheckCollision(ball, brick)) {
            brickBreak(brick, powerUp);
            if (ball.dx < ball.speedMax && ball.dx > -ball.speedMax) ball.dy = -ball.dy * 1.002;
          }

          bullets.forEach((bullet, index) => {
            if (otherCheckCollisionUp(bullet, brick)) {
              brickBreak(brick, powerUp);
              bullets.splice(index, 1);
            }
          });
        }

        // Cham powerUp
        if (powerUp && powerUp.status) {
          if (otherCheckCollisionDown(powerUp, paddle)) {
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