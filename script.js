const startBtn = document.getElementById("start-btn");
const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");

let score = 0;
let tiles = [];

startBtn.addEventListener("click", () => {
    score = 0;
    scoreDisplay.innerText = score;
    gameContainer.innerHTML = "";
    tiles = [];

    // Create initial 2 tiles
    addTile();
    addTile();
});

function addTile() {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.innerText = 2;
    
    // Random position in grid (4x4)
    const row = Math.floor(Math.random()*4);
    const col = Math.floor(Math.random()*4);
    tile.style.top = `${row*80}px`;
    tile.style.left = `${col*80}px`;

    gameContainer.appendChild(tile);
    tiles.push(tile);
}

// TODO: Add swipe / merge logic + scoring
const startBtn = document.getElementById("start-btn");
const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");

let score = 0;
let tiles = [];

// Swipe detection
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

function resetSwipe() {
    touchStartX = 0; touchStartY = 0; touchEndX = 0; touchEndY = 0;
}

// Start button click
startBtn.addEventListener("click", () => {
    score = 0;
    scoreDisplay.innerText = score;
    gameContainer.innerHTML = "";
    tiles = [];
    addTile();
    addTile();
});

// Add a tile
function addTile() {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.innerText = 2;

    // Random position 4x4 grid
    let positionValid = false;
    let row, col;
    while(!positionValid) {
        row = Math.floor(Math.random()*4);
        col = Math.floor(Math.random()*4);
        positionValid = !tiles.some(t => t.dataset.row == row && t.dataset.col == col);
    }

    tile.style.top = `${row*80}px`;
    tile.style.left = `${col*80}px`;
    tile.dataset.row = row;
    tile.dataset.col = col;

    gameContainer.appendChild(tile);
    tiles.push(tile);
}

// Swipe controls for mobile
gameContainer.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
});

gameContainer.addEventListener("touchend", e => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
    resetSwipe();
});

function handleSwipe() {
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;

    if(Math.abs(dx) > Math.abs(dy)) {
        // Horizontal swipe
        if(dx > 20) moveTiles("right");
        else if(dx < -20) moveTiles("left");
    } else {
        // Vertical swipe
        if(dy > 20) moveTiles("down");
        else if(dy < -20) moveTiles("up");
    }
}

// Arrow keys support
document.addEventListener("keydown", e => {
    if(e.key === "ArrowUp") moveTiles("up");
    if(e.key === "ArrowDown") moveTiles("down");
    if(e.key === "ArrowLeft") moveTiles("left");
    if(e.key === "ArrowRight") moveTiles("right");
});

// Move tiles logic
function moveTiles(direction) {
    // For simplicity, just add a new tile per move
    addTile();
    score += 2;
    scoreDisplay.innerText = score;
}
