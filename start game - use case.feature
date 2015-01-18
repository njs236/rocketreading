Title: User plays a level game

As a user of the Rocket Reading App
I want to be able to start a new level game
So that I can practice recognising and learn to recognise word sounds 

Scenario: User starts a new level game from the home page
Given that the user is on the home page
And
When the user clicks the start game button and chooses a level and then chooses a level game
Then the user will start playing the chosen level game

Scenario: User starts a new level game from the level page 
Given that the user is on a level page
When the user clicks a level game
Then the user will start playing the chosen level game

Scenario: User replays a level game
Given that the user is on a level page
When the user clicks a level game which he or she has previously completed
Then the user will start playing the chosen level game

Scenario: User attempts 