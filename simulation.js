const gridWidth = 8;
const gridHeight = 8;
const cellWidth = 40;
const cellHeight = 40;
const columnSpacing = 8; // Space between columns
const rowGap = 20; // Gap between the third and fourth row
const cellOutline = 1; // Width of the cell outline
let gridCanvas = document.getElementById('gridCanvas');
let ctx = gridCanvas.getContext('2d');
let grid = [];
let timer = null;

// Constants to represent player types
const BRUTISH = 'red';
const NON_BRUTISH = 'blue';

// Agent constructor with fixed ability and variable brutishness
function Agent(ability, brutishness) {
    this.ability = ability; // Fixed ability across the season
    this.brutishness = brutishness; // Variable brutishness
    this.selected = false; // Whether the player is selected for the matchday squad
}

// Initialize agents with random or predefined properties
function initializeAgents() {
    grid = [];
    for (let y = 0; y < gridHeight; y++) {
        let row = [];
        for (let x = 0; x < gridWidth; x++) {
            // Randomly assign ability and brutishness
            let ability = Math.random();
            let brutishness = Math.random() < 0.5 ? BRUTISH : NON_BRUTISH;
            row.push(new Agent(ability, brutishness));
        }
        grid.push(row);
    }
    drawGrid();
}

function drawGrid() {
    // Adjust the starting position for drawing
    let currentX = columnSpacing;
    let currentY = 0;
    
    ctx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);

    for (let y = 0; y < gridHeight; y++) {
        // Adjust Y position for the gap after the third row
        if (y === 3) {
            currentY += rowGap;
        }

        for (let x = 0; x < gridWidth; x++) {
            let agent = grid[y][x];
            ctx.fillStyle = agent.brutishness === BRUTISH ? 'red' : 'blue';
            // Draw the filled rectangle for the agent
            ctx.fillRect(currentX, currentY, cellWidth, cellHeight);
            // Draw a white outline around the rectangle
            ctx.strokeStyle = 'white';
            ctx.lineWidth = cellOutline;
            ctx.strokeRect(currentX, currentY, cellWidth, cellHeight);

            // Move to the next column, adjust for spacing
            currentX += cellWidth + columnSpacing;
        }
        // Reset X position for the next row and move down
        currentX = columnSpacing;
        currentY += cellHeight;
    }

    // Draw a box around the top three rows
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    // Adjust for the outline of the top-left cell
    ctx.strokeRect(columnSpacing - cellOutline, 0, gridWidth * (cellWidth + columnSpacing) - columnSpacing, 3 * cellHeight + (cellOutline * 2));
}

// Initialize the grid when the script loads
initializeAgents();

// Selection process based on brutishness and ability
function weeklySelection() {
    // Flatten the grid to a list of agents
    let agents = grid.flat();

    // Sort agents by ability, then by brutishness within the same ability level
    agents.sort((a, b) => b.ability - a.ability || (b.brutishness === BRUTISH ? 1 : -1));

    // Select the top 23 agents
    agents.slice(0, 23).forEach(agent => agent.selected = true);
}

// Simulate a round of the game
function simulateRound() {
    weeklySelection();

    // Logic to simulate in-game performance based on brutishness and ability
    // Distribute rewards and adjust brutishness for the next round
    adjustBrutishness();
}

// Adjust the brutishness of players based on performance
function adjustBrutishness() {
    // Logic to increase or decrease brutishness based on rewards
    grid.flat().forEach(agent => {
        if (agent.selected) {
            // Simulate the effect of the game on brutishness
            agent.brutishness = adjustBrutishnessBasedOnPerformance(agent.brutishness);
        }
    });
}

// A function to adjust brutishness based on performance
function adjustBrutishnessBasedOnPerformance(currentBrutishness) {
    // Placeholder for actual performance-based adjustment logic
    return currentBrutishness; // Return the same brutishness for now
}

// Initialize the grid when the script loads
initializeAgents();