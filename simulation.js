const gridWidth = 8;
const gridHeight = 6;
const cellWidth = 50;
const cellHeight = 50;
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

// Draw the grid on canvas
function drawGrid() {
    ctx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            let agent = grid[y][x];
            ctx.fillStyle = agent.brutishness === BRUTISH ? 'red' : 'blue';
            ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
        }
    }
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