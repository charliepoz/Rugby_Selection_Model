class Agent {
    constructor(id, skill, type) {
        this.id = id;
        this.skill = skill;
        this.type = type;
    }

    fight(opponent) {
        // Determine the outcome of the fight, possibly based on skill and type scores
        let winProbability = this.skill / (this.skill + opponent.skill); // Example calculation
        let didWin = Math.random() < winProbability; // Random outcome based on probability

        if (didWin) {
            this.type += 0.1; // Winner gains in type score
            this.skill += 0.5; // Winner gains in skill score
            opponent.type -= 0.1; // Loser loses in type score
            opponent.skill -= 0.5; // Loser loses in skill score
        } else {
            opponent.type += 0.1;
            opponent.skill += 0.5;
            this.type -= 0.1;
            this.skill -= 0.5;
        }

        // Ensure scores remain within bounds
        this.type = Math.max(0, Math.min(this.type, 1));
        this.skill = Math.max(1, Math.min(this.skill, 5));
        opponent.type = Math.max(0, Math.min(opponent.type, 1));
        opponent.skill = Math.max(1, Math.min(opponent.skill, 5));
    }

    develop() {
        // Increase skill score by a fixed amount
        this.skill += 0.05;

        // Ensure the skill score does not exceed the maximum limit
        this.skill = Math.min(this.skill, 5);
    }
}

let agents = [];
for (let i = 0; i < 10; i++) {
    agents.push(new Agent(i, Math.random() * 4 + 1, Math.random())); // Random S and T scores
}

// Group agents into two groups
let group1 = agents.slice(0, 5);
let group2 = agents.slice(5);

function updateScores() {
    // Implement the logic for each round
    // Update S and T scores based on agent decisions
    // Calculate fight outcomes
}

function calculateGroupUtility(group) {
    // Calculate and return the utility for a group
}


document.getElementById("startButton").addEventListener("click", startSimulation);
document.getElementById("stopButton").addEventListener("click", stopSimulation);

function startSimulation() {
    // Start or resume the simulation
}

function stopSimulation() {
    // Pause the simulation
}


