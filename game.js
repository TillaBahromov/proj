const ball = document.getElementById('ball');
const container = document.getElementById('game-container');

ball.addEventListener('click', () => {
  alert('You caught the ball!');
  moveBall();
});

function moveBall() {
  const containerRect = container.getBoundingClientRect();
  const ballSize = ball.offsetWidth;

  const randomX = Math.random() * (containerRect.width - ballSize);
  const randomY = Math.random() * (containerRect.height - ballSize);

  ball.style.left = `${randomX}px`;
  ball.style.top = `${randomY}px`;
}
