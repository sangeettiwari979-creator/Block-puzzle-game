const size = 4;
let board = [];
let score = 0;

const game = document.getElementById("game-container");
const scoreEl = document.getElementById("score");
const startBtn = document.getElementById("start-btn");

startBtn.onclick = startGame;

function startGame() {
  board = Array(size).fill().map(() => Array(size).fill(0));
  score = 0;
  scoreEl.innerText = score;
  addNumber();
  addNumber();
  drawBoard();
}

function drawBoard() {
  game.innerHTML = "";
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.style.top = `${r * 80}px`;
      tile.style.left = `${c * 80}px`;
      tile.innerText = board[r][c] !== 0 ? board[r][c] : "";
      tile.style.background = board[r][c]
        ? `hsl(${Math.log2(board[r][c]) * 40},80%,60%)`
        : "#444";
      game.appendChild(tile);
    }
  }
}

function addNumber() {
  let empty = [];
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++)
      if (board[r][c] === 0) empty.push([r, c]);

  if (empty.length === 0) return;
  let [r, c] = empty[Math.floor(Math.random() * empty.length)];
  board[r][c] = 2;
}

function slide(row) {
  row = row.filter(x => x);
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] === row[i + 1]) {
      row[i] *= 2;
      score += row[i];
      row[i + 1] = 0;
    }
  }
  row = row.filter(x => x);
  while (row.length < size) row.push(0);
  return row;
}

function moveLeft() {
  for (let r = 0; r < size; r++)
    board[r] = slide(board[r]);
}

function moveRight() {
  for (let r = 0; r < size; r++)
    board[r] = slide(board[r].reverse()).reverse();
}

function moveUp() {
  for (let c = 0; c < size; c++) {
    let col = board.map(r => r[c]);
    col = slide(col);
    for (let r = 0; r < size; r++) board[r][c] = col[r];
  }
}

function moveDown() {
  for (let c = 0; c < size; c++) {
    let col = board.map(r => r[c]).reverse();
    col = slide(col).reverse();
    for (let r = 0; r < size; r++) board[r][c] = col[r];
  }
}

document.addEventListener("keydown", e => {
  let moved = true;
  if (e.key === "ArrowLeft") moveLeft();
  else if (e.key === "ArrowRight") moveRight();
  else if (e.key === "ArrowUp") moveUp();
  else if (e.key === "ArrowDown") moveDown();
  else moved = false;

  if (moved) {
    addNumber();
    scoreEl.innerText = score;
    drawBoard();
  }
});
