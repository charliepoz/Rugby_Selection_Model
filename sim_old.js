class Agent {
    constructor(id, skill, type) {
        this.id = id;
        this.skill = skill; // Skill score of the agent
        this.type = type; // Type score of the agent
        this.foughtThisRound = false; // Tracks if the agent has fought in the current round
    }

        makeDecision() {
            // Implement decision logic here. For now, let's return a random decision.
            // You can make this more sophisticated by taking into account the agent's current state,
            // the state of other agents, or even the global state of the game.
            return Math.random() > 0.5 ? 'fight' : 'develop';
        }

        // Method to choose an opponent from a list of agents
        chooseOpponent(agents) {
            // Filter out potential opponents who are within 1 skill point
            let potentialOpponents = agents.filter(other => 
                other !== this && Math.abs(this.skill - other.skill) <= 1
            );
            // Randomly select an opponent from those filtered
            return potentialOpponents[Math.floor(Math.random() * potentialOpponents.length)];
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

        // Method for the agent to decide whether to fight or develop
        makeDecision() {
            // Implement decision logic here. For now, let's return a random decision.
            // You can make this more sophisticated by taking into account the agent's current state,
            // the state of other agents, or even the global state of the game.
            return Math.random() > 0.5 ? 'fight' : 'develop';
        }


        // Method to choose an opponent from a list of agents
        chooseOpponent(agents) {
            // Filter out potential opponents who are within 1 skill point
            let potentialOpponents = agents.filter(other => 
                other !== this && Math.abs(this.skill - other.skill) <= 1
            );
            // Randomly select an opponent from those filtered
            return potentialOpponents[Math.floor(Math.random() * potentialOpponents.length)];
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

    // Assuming you have a method to initialize your agents
    function initializeAgents() {
        // Create and return your agents
        // For the purpose of this example, I'm creating them with random S and T scores
        let agents = [];
        for (let i = 0; i < 10; i++) {
            agents.push(new Agent(i, Math.floor(Math.random() * 5) + 1, Math.random()));
        }
        return agents;
    }

    let agents = initializeAgents();
    let group1 = agents.slice(0, 5);
let group2 = agents.slice(5);
    

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


// Assuming you have a method to initialize your agents
function initializeAgents() {
    // Create and return your agents
    // For the purpose of this example, I'm creating them with random S and T scores
    let agents = [];
    for (let i = 0; i < 10; i++) {
        agents.push(new Agent(i, Math.random() * 4 + 1, Math.random()));
    }
    return agents;
}


// Placeholder functions for simulation control
function startSimulation() {
    // Start or resume the simulation
    // Here you would set up your simulation loop, which may involve setInterval or requestAnimationFrame
    updateScores();
    updateUI();
}

function stopSimulation() {
    // Pause the simulation
    // Here you would clear the interval or cancel the animation frame set in startSimulation
}

function updateUI(agents) {
    // Assuming first 5 agents are in group 1 and the rest in group 2
    const group1Agents = agents.slice(0, 5);
    const group2Agents = agents.slice(5);

    const group1Container = document.getElementById('group1');
    const group2Container = document.getElementById('group2');

    // Clear previous state
    group1Container.innerHTML = '';
    group2Container.innerHTML = '';

    // Add agents to their respective groups
    group1Agents.forEach(agent => {
        const agentDiv = document.createElement('div');
        agentDiv.className = 'agent';
        agentDiv.style.backgroundColor = getColorByType(agent.type);
        group1Container.appendChild(agentDiv);
    });

    group2Agents.forEach(agent => {
        const agentDiv = document.createElement('div');
        agentDiv.className = 'agent';
        agentDiv.style.backgroundColor = getColorByType(agent.type);
        group2Container.appendChild(agentDiv);
    });
}
// Function to update the scores in each round
function updateScores() {
    // Iterate over all agents and apply their decisions for this round
    agents.forEach(agent => {
        // Let's assume we have a simple decision-making function for each agent
        let decision = makeDecision(agent);

        // Apply the decision: fight or develop
        if (decision === 'fight' && agent.canFight(agents)) {
            // Agent chooses to fight with a close rival
            let opponent = agent.chooseOpponent(agents);
            agent.fight(opponent);
        } else {
            // Agent chooses to develop
            agent.develop();
        }
    });

    // After all agents have made their moves, update the UI
    updateUI();
}

// Helper function to make a decision for an agent
function makeDecision(agent) {
    // Here you could implement a strategy for the agents to decide
    // For now, let's randomly choose to fight or develop
    return Math.random() > 0.5 ? 'fight' : 'develop';
}

// Extend the Agent class with decision-related methods
Agent.prototype.canFight = function(agents) {
    // Check if there is an opponent within 1 skill point
    return agents.some(other => other !== this && Math.abs(this.skill - other.skill) <= 1);
};

Agent.prototype.chooseOpponent = function(agents) {
    // Choose an opponent within 1 skill point
    let potentialOpponents = agents.filter(other => other !== this && Math.abs(this.skill - other.skill) <= 1);
    // Randomly select an opponent
    return potentialOpponents[Math.floor(Math.random() * potentialOpponents.length)];
};

// Function to calculate group utility
function calculateGroupUtility(group) {
    // Assume the utility is a combination of average skill and type scores
    let averageSkill = group.reduce((acc, agent) => acc + agent.skill, 0) / group.length;
    let averageType = group.reduce((acc, agent) => acc + agent.type, 0) / group.length;
    let numberOfFights = group.reduce((acc, agent) => acc + (agent.foughtThisRound ? 1 : 0), 0);

    // The utility function needs to be defined. For now, let's assume it's a simple average.
    // Depending on the model, you may want to factor in the number of fights and other parameters.
    return averageSkill + averageType - numberOfFights;
}

// Add a foughtThisRound property to the Agent class for tracking
Agent.prototype.foughtThisRound = false;

// Set up the event listeners for DOM content loaded
document.addEventListener('DOMContentLoaded', (event) => {
    updateLabel('similarSlider', 'similarValue', '%');
    updateLabel('ratioSlider', 'ratioValue', '%');
    updateLabel('emptySlider', 'emptyValue', '%');
    updateLabel('sizeSlider', 'sizeValue', ''); // No units for size, adjust as needed
    updateLabel('delaySlider', 'delayValue', 'ms');
    
    // Set up the simulation control buttons
    document.getElementById("startButton").addEventListener("click", startSimulation);
    document.getElementById("stopButton").addEventListener("click", stopSimulation);

    // Initialize the UI with the initial state of agents
    updateUI();
});