const update = (ball, paddle, brickWall) => {
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
    // alert("GAME OVER");
    // document.location.reload();
  }

  // Thay doi chieu speed khi cham brick
  for (let col = 0; col < brickWall.brickColumnCount; col++) {
    for (let row = 0; row < brickWall.brickRowCount; row++) {
      const bricks = brickWall.bricks[col][row];
      const powerUps = brickWall.powerUps[col][row];

      if (bricks.status) {
        if (ball.x >= bricks.x && ball.x <= bricks.x + bricks.width && ball.y >= bricks.y && ball.y <= bricks.y + bricks.height) {
          ball.dy = -ball.dy * 1.005;

          bricks.status = false;
          powerUps.status = true;
        }
      }

      if (powerUps.status) {
        if (powerUps.y + powerUps.height > paddle.y && powerUps.x > paddle.x && powerUps.x + powerUps.width < paddle.x + paddle.width) {
          powerUps.status = false;
        } else if (powerUps.y + powerUps.height > canvas.height) {
          powerUps.status = false;
        } else {
          powerUps.y += powerUps.speed;
        }
      }
    }
  }

  // Thay doi vi tri
  ball.x += ball.dx;
  ball.y += ball.dy;
}