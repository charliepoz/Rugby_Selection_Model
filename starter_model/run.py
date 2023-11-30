#from money_model.ipynb import MoneyModel

#starter_model = MoneyModel(10)
#starter_model.step()
import mesa
import seaborn as sns
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import copy

from mesa import Agent, Model
from mesa.time import RandomActivation
import random
### Working CODE!! 

import copy
import random
import numpy as np
import mesa

class PlayerAgent(mesa.Agent):
    """A player with fixed initial type and skill."""

    def __init__(self, unique_id, model, agent_type, skill, group):
        super().__init__(unique_id, model)
        self.skill = skill
        self.agent_type = agent_type
        self.group = group

    def fight(self):
        self_combined_score = self.skill * self.agent_type  # Calculate the agent's combined score
        group_ranked = self.model.group_ranked[self.group]  # Get the ranked list from the model

        # Select eligible opponents within the combined score range
        competition = [agent for agent in group_ranked if abs((agent.skill * agent.agent_type) - self_combined_score) <= 0.1]
        if not competition or len(competition) == 1:  # If no or only one agent in competition, no fight occurs
            return

        index = group_ranked.index(self)  # Find self in the ranked list
        adjacent = [agent for i, agent in enumerate(group_ranked) if abs(i - index) == 1 and agent in competition]

        if not adjacent:  # If no adjacent agents in competition, no fight occurs
            return

        opponent = random.choice(adjacent)  # Randomly choose an adjacent agent in competition

        # Randomly decide the outcome of the fight
        winner, loser = (self, opponent) if random.random() < 0.5 else (opponent, self)

        # Winner increases type score by 0.05, capped at 1
        winner.agent_type = min(winner.agent_type + 0.05, 1)

        # Loser decreases type score by 0.08, not falling below 0
        loser.agent_type = max(loser.agent_type - 0.08, 0)

        # For demonstration purposes, print the outcome
        print(f"Player {winner.unique_id} won the fight against player {loser.unique_id}.")
    
    def develop(self):
        # Increase the skill score by 0.05, ensure it does not exceed 5
        self.skill = min(self.skill + 0.05, 5)
    
    def step(self):
        # Randomly choose to fight or develop
        action = random.choice(['F', 'D'])
        if action == 'F':
            self.fight()
        else:
            self.develop()
        
        # Print the agent's action for demonstration purposes
        print(f"I am player {self.unique_id}. I chose to {'fight' if action == 'F' else 'develop'}. My type is {self.agent_type}, and my skill is {self.skill}.")

    def self_combined_score(self):
        return self.skill * self.agent_type



class RugbyModel(mesa.Model):
    """A model with some number of players."""

    def __init__(self, N):
        self.num_agents = N
        # Create scheduler and assign it to the model
        self.schedule = mesa.time.RandomActivation(self)

        mu_type, sigma_type = 0.5, 0.15  # mean and standard deviation for type
        mu_skill, sigma_skill = 2.5, 1.0  # mean and standard deviation for skill


        # Create agents
        for i in range(self.num_agents):
            group = '1' if i % 2 == 0 else '2'
            
            agent_type = np.clip(np.random.normal(mu_type, sigma_type), 0, 1)
            skill = np.clip(np.random.normal(mu_skill, sigma_skill), 0, 5)

            a = PlayerAgent(i, self, agent_type, skill, group)
            # Add the agent to the scheduler
            self.schedule.add(a)

    def rank_agents(self):
        # This function will be called to rank agents before they take their steps.
        self.group_ranked = {}
        for group_id in set(agent.group for agent in self.schedule.agents):
            # Create a ranked list for each group
            self.group_ranked[group_id] = sorted(
                [agent for agent in self.schedule.agents if agent.group == group_id],
                key=lambda x: x.skill * x.agent_type
            )

    def step(self):
        """Advance the model by one step."""
        # Rank agents at the start of each step
        self.rank_agents()
        
        # The model's step will go here for now this will call the step method of each agent and print the agent's unique_id
        self.schedule.step()

