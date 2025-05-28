const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const balls = [];

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomColor() {
  return `hsl(${random(0, 360)}, 100%, 50%)`;
}

class Ball {
  constructor(x, y, velX, velY, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.size = size;
    this.gravity = 0.3;
    this.bounce = 0.7;
    this.colorShift = random(0, 360);
  }

  draw() {
    this.colorShift = (this.colorShift + 1) % 360;
    ctx.beginPath();
    ctx.fillStyle = `hsl(${this.colorShift}, 100%, 50%)`;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    this.velY += this.gravity;

    if (this.x + this.size >= canvas.width || this.x - this.size <= 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.size >= canvas.height) {
      this.velY = -this.velY * this.bounce;
      this.y = canvas.height - this.size;
    }

    this.x += this.velX;
    this.y += this.velY;
  }
}

canvas.addEventListener('click', (e) => {
  balls.push(
    new Ball(
      e.clientX,
      e.clientY,
      random(-5, 5),
      random(-5, 5),
      random(10, 20)
    )
  );
});

canvas.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  balls.forEach((ball, i) => {
    const dx = ball.x - e.clientX;
    const dy = ball.y - e.clientY;
    if (Math.sqrt(dx * dx + dy * dy) < ball.size) {
      balls.splice(i, 1);
    }
  });
});

function loop() {
  ctx.fillStyle = 'rgba(17, 17, 17, 0.3)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
  }

  requestAnimationFrame(loop);
}

loop();
