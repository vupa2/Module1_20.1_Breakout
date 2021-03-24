const randomNumber = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const getRandomColor = () => {
  return `rgb(${randomNumber(255)}, ${randomNumber(255)}, ${randomNumber(255), 1})`;
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
    ball.dy = -ball.dy; // lose
    game.decreaseLife();
    // alert("GAME OVER");
    // document.location.reload();
  }

  // Di chuyen Paddle
  if (rightPressed) {
    paddle.x += paddle.speed;
    if (paddle.x + paddle.width > canvas.width) paddle.x = canvas.width - paddle.width;
  } else if (leftPressed) {
    paddle.x -= paddle.speed;
    if (paddle.x < 0) paddle.x = 0;
  }

  // Thay doi chieu speed khi cham brick
  if (brickWall.bricks.every(col => col.every(brick => brick.status === false)) && ball.y > BALL_Y) {
    brickWall.setUp();
  } else {
    for (let col = 0; col < brickWall.brickColumnCount; col++) {
      for (let row = 0; row < brickWall.brickRowCount; row++) {
        const bricks = brickWall.bricks[col][row];
        const powerUps = brickWall.powerUps[col][row] ?? null;

        if (bricks.status) {
          if (ball.x >= bricks.x && ball.x <= bricks.x + bricks.width && ball.y >= bricks.y && ball.y <= bricks.y + bricks.height) {
            game.increaseScore();
			bricks.status = false;

            if (ball.dx < ball.speedMax && ball.dx > -ball.speedMax) ball.dy = -ball.dy * 1.01;
            if (powerUps) powerUps.status = true;
          }
        }
        
        // Cham powerUps
        if (powerUps && powerUps.status) {
          if (powerUps.y + powerUps.height > paddle.y && powerUps.x > paddle.x && powerUps.x + powerUps.width < paddle.x + paddle.width) {
            powerUps.status = false;
            switch (powerUps.symbol) {
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
          } else if (powerUps.y + powerUps.height > canvas.height) {
            powerUps.status = false;
          } else {
            powerUps.y += powerUps.speed;
          }
        }
      }
    }
  }

  // Thay doi vi tri
  ball.x += ball.dx;
  ball.y += ball.dy;
}
