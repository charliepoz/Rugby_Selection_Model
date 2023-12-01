import matplotlib.pyplot as plt
import mesa
import seaborn as sns
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import random

from model import RugbyModel  


from mesa.visualization.modules import CanvasGrid
from mesa.visualization.ModularVisualization import ModularServer
#from mesa.visualization.UserParam import UserSettableParameter
from mesa.visualization.modules import ChartModule



#team_score_balance = UserSettableParameter('slider', "Team Score (skill vs brutality)", value=50, min_value=1, max_value=100, step=1)
#fight_winner_payoff = UserSettableParameter('slider', "Brutality Payoff (Winner)", value=0.1, min_value=0.01, max_value=1, step=0.01)
#fight_loser_payoff = UserSettableParameter('slider', "Brutality Payoff (Winner)", value=0.1, min_value=0.01, max_value=1, step=0.01)


# Define a chart for the team score
team_score_chart = ChartModule([{"Label": "Team Score", "Color": "Black"}],
                               data_collector_name='datacollector')

# Define a chart for the agent skills
agent_skill_chart = ChartModule([{"Label": "Skill", "Color": "Blue"}],
                                data_collector_name='datacollector')

# Define a chart for the agent skills
agent_type_chart = ChartModule([{"Label": "Type", "Color": "Red"}],
                                data_collector_name='datacollector')


def agent_portrayal(agent):
    portrayal = {"Shape": "circle",
                 "Filled": "true",
                 "r": 0.5,
                 "Color": "red",  # You can set the color based on certain conditions
                 "Layer": 0,
                 "text": f'{agent.skill:.2f}\nID: {agent.unique_id}',  # Displaying score and ID
                 "text_color": "black"}

    # Additional logic to customize the portrayal based on agent properties
    # ...

    return portrayal


# Assuming your grid is 2x5
grid = CanvasGrid(agent_portrayal, 2, 5, 500, 250)

server = ModularServer(RugbyModel,
                       [grid, team_score_chart, agent_skill_chart, agent_type_chart],
                       "Rugby Model",
                       {"N": 10})

server.launch()
