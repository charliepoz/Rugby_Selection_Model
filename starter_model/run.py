#from money_model.ipynb import MoneyModel

#starter_model = MoneyModel(10)
#starter_model.step()
import mesa
import seaborn as sns
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

from mesa import Agent, Model
from mesa.time import RandomActivation
import random

class PlayerAgent(mesa.Agent):
    """A player with fixed initial type and skill."""

    def __init__(self, unique_id, model, agent_type, skill, group):
        # Pass the parameters to the parent class.
        super().__init__(unique_id, model)

        # Create the agent's attribute and set the initial values.
        self.skill = skill
        self.agent_type = agent_type
        self.group = group

    def step(self):
        # The agent's step will go here.
        # For demonstration purposes we will print the agent's unique_id
        print(f"I am player {str(self.unique_id)}. My type is {self.agent_type}, my skill is {self.skill}, and my group is {self.group}.")


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

    def step(self):
        """Advance the model by one step."""

        # The model's step will go here for now this will call the step method of each agent and print the agent's unique_id
        self.schedule.step()

# Example of running the model
model = RugbyModel(10)
for i in range(20):  # Run for 20 steps
    model.step()