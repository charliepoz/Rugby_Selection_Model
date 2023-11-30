
import mesa
import seaborn as sns
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

from mesa import Agent, Model
from mesa.time import RandomActivation
import random

def compute_team_score(model):
    # Calculate the average of the product of skill and agent type
    team_score_sum = sum(agent.skill * agent.agent_type for agent in model.schedule.agents)
    N = model.num_agents
    average_team_score = team_score_sum / N if N else 0

    # Calculate the percentage of agents who have fought
    agents_fought = sum(agent.won_last_fight for agent in model.schedule.agents)
    percent_fought = (agents_fought / N) * 100 if N else 0

    # Subtract the percentage from the average team score
    adjusted_team_score = average_team_score - percent_fought

    return adjusted_team_score

class PlayerAgent(mesa.Agent):
    """A player with fixed initial type and skill."""

    def __init__(self, unique_id, model, agent_type, skill, group):
        super().__init__(unique_id, model)
        self.skill = skill
        self.agent_type = agent_type
        self.group = group
        self.won_last_fight = False  # Track whether the agent won the last fight
    
    def fight(self):
        self_combined_score = self.skill * self.agent_type  # Calculate the agent's combined score
        group_ranked = self.model.group_ranked[self.group]  # Get the ranked list from the model
        
        
        # Select eligible opponents within the combined score range
        competition = [agent for agent in group_ranked if abs((agent.skill * agent.agent_type) - self_combined_score) <= 0.1]
        if not competition:
            print("I had no competition")  # If no or only one agent in competition, no fight occurs
            return
        
        index = group_ranked.index(self)  # Find self in the ranked list
        adjacent = [agent for i, agent in enumerate(group_ranked) if abs(i - index) == 1 and agent in competition]


        if not adjacent:
            #print("I had no adjacent competition")  # If no adjacent agents in competition, no fight occurs
            return

        opponent = random.choice(competition)  # Randomly choose an adjacent agent in competition

        # Randomly decide the outcome of the fight
        winner, loser = (self, opponent) if random.random() < 0.5 else (opponent, self)

        # Find the indices of the winner and loser in the ranked list
        winner_index = self.model.group_ranked[self.group].index(winner)
        loser_index = self.model.group_ranked[self.group].index(loser)

        # Check if the loser is ranked higher than the winner
        if loser_index < winner_index:
            # Swap positions of winner and loser in the grid
            winner_pos = winner.pos
            loser_pos = loser.pos
            self.model.grid.move_agent(winner, loser_pos)
            self.model.grid.move_agent(loser, winner_pos)

            # Also swap their positions in the group_ranked list to reflect the new rankings
            self.model.group_ranked[self.group][winner_index], self.model.group_ranked[self.group][loser_index] = \
            self.model.group_ranked[self.group][loser_index], self.model.group_ranked[self.group][winner_index]
            # Winner increases type score by 0.05, capped at 1
            winner.agent_type = min(winner.agent_type + 0.05, 1)

            # Loser decreases type score by 0.08, not falling below 0
            loser.agent_type = max(loser.agent_type - 0.08, 0)
            #print("I beat someone better than me")

        # Check if self is the winner
        if winner == self:
            self.won_last_fight = True

        # For demonstration purposes, print the outcome
        #print(f"Player {winner.unique_id} won the fight against player {loser.unique_id}.")
    
    def develop(self):
        # Increase the skill score by 0.05, ensure it does not exceed 5
        self.skill = min(self.skill + 0.02, 5)
    
    def move(self):
        # Move the agent only if they won the last fight
        if self.won_last_fight:
            current_x, current_y = self.pos
            possible_steps = [(current_x, current_y - 1), (current_x, current_y + 1)]  # Up/Down movement only
            # Filter out out-of-bounds positions
            self.won_last_fight = False  # Reset the flag after moving

    def self_combined_score(self):
        return self.skill * self.agent_type

    def step(self):
        self.move()
        # Randomly choose to fight or develop
        action = random.choice(['F', 'D'])
        if action == 'F':
            self.fight()
            #print("I fought")
        else:
            self.develop()
            #print("I developed")
        
        # Print the agent's action for demonstration purposes
        #print(f"I am player {self.unique_id}. I chose to {'fight' if action == 'F' else 'develop'}. My type is {self.agent_type}, and my skill is {self.skill}.")

class RugbyModel(mesa.Model):
    """A model with some number of players."""

    def __init__(self, N):
        self.num_agents = N
        self.grid = mesa.space.MultiGrid(2, 5, False)
        self.schedule = mesa.time.RandomActivation(self)
        self.group_ranked = {'1': [], '2': []}

        # Mean and standard deviation for type and skill
        mu_type, sigma_type = 0.5, 0.15
        mu_skill, sigma_skill = 2.5, 1.0

        # Create agents
        for i in range(self.num_agents):
            group = '1' if i % 2 == 0 else '2'
            agent_type = np.clip(np.random.normal(mu_type, sigma_type), 0, 1)
            skill = np.clip(np.random.normal(mu_skill, sigma_skill), 0, 5)
            a = PlayerAgent(i, self, agent_type, skill, group)
            self.group_ranked[group].append(a)  # Add the agent to the group_ranked

        # Rank agents in each group
        self.rank_agents()

        # Place agents on the grid based on their group and rank
        for group, agents in self.group_ranked.items():
            x = 0 if group == '1' else 1
            for y, agent in enumerate(agents):
                self.grid.place_agent(agent, (x, y))
                self.schedule.add(agent)  # Add the agent to the scheduler

        self.datacollector = mesa.DataCollector(
            model_reporters={"Team Score": compute_team_score},
            agent_reporters={"Type": "agent_type", "Skill": "skill"}
        )
        

    def rank_agents(self):
        # Rank the agents in each group by their combined score
        for group_id, agents in self.group_ranked.items():
            sorted_agents = sorted(agents, key=lambda a: (a.skill * a.agent_type, -a.unique_id))
            self.group_ranked[group_id] = sorted_agents  # Update the dictionary with sorted lists


    def step(self):
        """Advance the model by one step."""
        # Rank agents at the start of each step
        for group_id in self.group_ranked:
            self.group_ranked[group_id].sort(key=lambda x: x.skill * x.agent_type)
        
        self.datacollector.collect(self)

        # The model's step will go here for now this will call the step method of each agent and print the agent's unique_id
        self.schedule.step()
