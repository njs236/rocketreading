Title: User initiates the start of a level-game

As a user of the Rocket Reading App
I want to be able to start a new level-game
So that I can practice learning to recognise words 

/*
Scenario 1: User starts a new level game from the home page
Given that the user is on the home page
When the user clicks the start game button, chooses a level and then chooses a level game
( too many events! I  think)
Then the user will start playing the chosen level game
*/

Scenario 2: User starts a new level game from a level page 
Given that the user is on a page which shows the games of a level
When the user clicks a level game which is unlocked
Then the system will load up and display the screen for the chosen level game

Scenario 3: User replays a level game
Given that the user is on a page which shows the games of a level
When the user clicks a level game which he or she has previously completed
Then the system will load up and display the screen for the chosen level game
And the points for that table will be reset to 0
And the medal table will be cleared

Scenario 4: User attempts to play a level-game which has not been unlocked
Given that the user is on a page which shows the games of a level
When the user clicks a level game which is locked
Then the locked symbol on the level (which the user chose) will flash red (?)

*

Title: User initiates the start of a bonus game

As a user of the Rocket Reading App
I want to be able to start a new bonus game
So that I can practice learning to recognise letter, vowel and consonant sounds

Scenario 1: User starts a new bonus game from the bonus games page
Given that the user is on a page which shows the bonus games
When the user selects a bonus game which is unlocked
Then the system will load up and display the screen for the chosen bonus game
The system will display a countdown before the start of that game

Scenario 2: User attempts to play a bonus game which has not been unlocked
Given that the user is on a page which shows the bonus games
When the user selects a bonus game which is locked
Then the locked symbol on the bonus game (which the user chose) will flash red (?)