const gridWidth = 8;
const gridHeight = 6;
const cellWidth = 50;
const cellHeight = 50;
let gridCanvas = document.getElementById('gridCanvas');
let ctx = gridCanvas.getContext('2d');
let grid = [];
let timer = null;

// Initialize grid with random agents
function initializeGrid() {
    grid = [];
    for (let y = 0; y < gridHeight; y++) {
        let row = [];
        for (let x = 0; x < gridWidth; x++) {
            row.push(Math.random() < 0.5 ? 1 : 2); // Randomly assign team 1 or team 2
        }
        grid.push(row);
    }
    drawGrid();
}

// Draw the grid on canvas
function drawGrid() {
    ctx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            ctx.fillStyle = grid[y][x] === 1 ? 'red' : 'blue';
            ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
        }
    }
}

// Update the grid by moving unsatisfied agents
function updateGrid() {
    // Add logic for moving unsatisfied agents
    drawGrid();
    updateStats();
}

// Start the simulation
function start() {
    if (!timer) {
        timer = setInterval(updateGrid, 100);
    }
}

// Stop the simulation
function stop() {
    clearInterval(timer);
    timer = null;
}

// Reset the simulation
function reset() {
    stop();
    initializeGrid();
    document.getElementById('round').textContent = '0';
    document.getElementById('satisfied').textContent = '0';
}

// Perform one step of the simulation
function step() {
    updateGrid();
}

// Update round and satisfaction stats
function updateStats() {
    // Add logic to calculate rounds and satisfaction percentage
}








// Initialize the grid when the script loads
initializeGrid();