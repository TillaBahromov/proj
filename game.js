const boardSize = 20; // Taqdim etilgan o'lcham (20x20)
const gameBoard = document.getElementById("game-board");

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let direction = { x: 0, y: 0 };
let speed = 200;
let gameInterval;

// O'yin doskasini yaratish
function createBoard() {
  gameBoard.innerHTML = "";
  for (let i = 0; i < boardSize * boardSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    gameBoard.appendChild(cell);
  }
}

// Ilon va ozuqani chizish
function draw() {
  createBoard();
  const cells = document.querySelectorAll(".cell");

  // Ilon tanasini chizish
  snake.forEach(segment => {
    const index = segment.y * boardSize + segment.x;
    cells[index].classList.add("snake");
  });

  // Ozuqani chizish
  const foodIndex = food.y * boardSize + food.x;
  cells[foodIndex].classList.add("food");
}

// Ilon harakatini yangilash
function update() {
  const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Chegaraga urilib o'yin tugashi
  if (
    newHead.x < 0 ||
    newHead.x >= boardSize ||
    newHead.y < 0 ||
    newHead.y >= boardSize ||
    snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
  ) {
    alert("Game Over!");
    clearInterval(gameInterval);
    return;
  }

  snake.unshift(newHead);

  // Ozuqani yeganda uzunlik oshadi
  if (newHead.x === food.x && newHead.y === food.y) {
    placeFood();
  } else {
    snake.pop(); // O'tmagan qismi qisqaradi
  }

  draw();
}

// Yangi ozuqa joylash
function placeFood() {
  food = {
    x: Math.floor(Math.random() * boardSize),
    y: Math.floor(Math.random() * boardSize),
  };

  // Ilon tanasiga to'g'ri kelmasligini tekshirish
  if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
    placeFood();
  }
}

// Yo'nalishni boshqarish
document.addEventListener("keydown", event => {
  switch (event.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
});

// O'yinni boshlash
function startGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  placeFood();
  draw();
  gameInterval = setInterval(update, speed);
}

startGame();
