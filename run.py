import matplotlib.pyplot as plt
import mesa
import seaborn as sns
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import random

from model import RugbyModel  

model = RugbyModel(10)
for i in range(30):
    model.step()

### Visualizations
model = RugbyModel(10)
for i in range(30):
    model.step()

skill = model.datacollector.get_model_vars_dataframe()
#g = sns.lineplot(data=skill)
#g.set(title="Team Score over Time", ylabel="Team Score Ranking");

#########

### Developing Stuff 

# Extract the team score and agent scores from the datacollector
team_score = model.datacollector.get_model_vars_dataframe()["Team Score"]
agent_scores = model.datacollector.get_agent_vars_dataframe()

last_step = team_score.index[-1]

# Get the skill-type scores of all agents at the last step
end_scores = agent_scores.xs(last_step, level="Step")

#print(end_scores)

# Create a histogram of the skill-type scores at the last step
#g = sns.histplot(end_scores, discrete=True)
#g.set(
#    title="Distribution of Skill-Type Scores at the End of Simulation",
##    xlabel="Skill-Type Score",
#    ylabel="Number of Agents",
#)

# Show the plot


#############

### The changing type of agent 2

one_agent_scores = agent_scores.xs(5, level="AgentID")

#g = sns.lineplot(data=one_agent_scores, x = "Step", y = "Skill")
#g.set(title="Changing Type of Agent 2");


### Average Agent Scores over Time 

agent_scores_long = agent_scores.T.unstack().reset_index()
agent_scores_long.columns = ["Step", "AgentID", "Type", "Skill"]
#agent_scores_long.head(3)

# Plot the average skill over time

g = sns.lineplot(data=agent_scores_long, x="Step", y="Skill", errorbar=("ci", 95))
g.set(title="Average Skill over time")
plt.show()

