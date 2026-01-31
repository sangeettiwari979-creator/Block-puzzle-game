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
