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
    // const newOpacity = parseFloat(match) - 0.25
    i++;
    return (i === 4) ? parseFloat(match) - 0.5 : match;
  });
}

const saveToStorage = (score) => {
  if (score > localStorage.getItem("highestScore")) localStorage.setItem("highestScore", score);
}

const update = (game, ball, paddle, brickWall) => {
  // Thay doi chieu speed khi cham tuong
  if (ball.x + ball.dx > canvas.width - ball.ballRadius || ball.x + ball.dx < ball.ballRadius) {
    ball.dx = -ball.dx;
  }

  // Thay doi chieu speed khi cham tuong + paddle
  if (ball.y + ball.dy < ball.ballRadius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > paddle.y & ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ball.ballRadius) {
    ball.dy = -ball.dy;
    game.decreaseLife();
  }

  // Di chuyen Paddle
  if (rightPressed) {
    paddle.x += paddle.speed;
    if (paddle.x + paddle.width > canvas.width) paddle.x = canvas.width - paddle.width;
  } else if (leftPressed) {
    paddle.x -= paddle.speed;
    if (paddle.x < 0) paddle.x = 0;
  }

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
        if (brick.status) {
          if (ball.x >= brick.x && ball.x <= brick.x + brick.width && ball.y >= brick.y && ball.y <= brick.y + brick.height) {

            if (brick.life > 1) {
              brick.life--;
              brick.color = reduceColorOpacity(brick.color);
            } else {
              game.increaseScore();
              brick.status = false;
              if (powerUp) powerUp.status = true;
            }

            if (ball.dx < ball.speedMax && ball.dx > -ball.speedMax) ball.dy = -ball.dy * 1.002
          }
        }

        // Cham powerUp
        if (powerUp && powerUp.status) {
          if (powerUp.y + powerUp.height >= paddle.y && powerUp.x >= paddle.x && powerUp.x + powerUp.width <= paddle.x + paddle.width) {
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