Title: User views the instructions page

AS a user of the Rocket Reading app
I want to be able to view the instructions page
So that I can learn how to use the app properly

Scenario 1: User clicks the Instructions button 
Given the user is logged on
And the user is on the home page screen
When the instructions button is clicked
The the system will load up and display the intructions page

*

Title: User views the high scores

As a user of the Rocket Reading App
I want to be able to view the hgh scores page
So that I can see what high scores I have achieved so far

Scenario 1: user clicks the high scores button
Given the user is logged in
And the user is on the home page screen
When the user clicks the high scores button
Then the system will load up and display the page with the high scores

*

Title: Exiting the game

As a user of the Rocket Reading app
I want to be able to exit the app
So that I can finish using the app when I want to

Scenario 1: user clicks the yes button
Given the user is logged in
And the user is on the home page screen
And the user has clicked the exit button
And the system has loaded up the exit validation options
When the user clicks the yes button
Then the system will close the app

Scenario 2: User decides not to exit the app and clicks the no button
Given the user is logged in
And the user is on the home page screen
And the user has clicked the exit button
And the system has loaded up the exit validation options
When the user clicks the no button
Then the system will close the exit-validation option
And the system will display the home page screen

*

Title: Viewing the Levels page

As a user of the Rocket Reading app
I want to be able to view the levels page
So that I can choose which level of game(s) I will play

Sceanrio 1: User clicks the start button 
Given the user is logged in
And the user is on the home page screen
When the user clicks the Start button
Then the system will load and display the levels options


*

Title: Viewing the games in a level

As a user of the Rocket Reading App
I want to be able to view the games in a level
So that I can choose which level-games I will play

Scenario 1: User clicks a level
Given the user is logged in
And the user is on a level options screen
When the user clicks an unlocked level option
Then the system will hide the level options screen
And the system will display the level-games options screen

Scenario 2: User clicks a locked level
Given the user is logged in 
And the user is on a level options screen
When the user clicks a locked level option
then a locked symbol on the level option will flash


*

Title: User initiates the start of a level-game

As a user of the Rocket Reading App
I want to be able to start a new level-game
So that I can practice learning to recognise words 


Scenario 1: User starts a new level game from a level page 
Given that the user is on the level-games options screen
When the user clicks a level-game which is unlocked
Then the system will load and display the screen for the chosen level-game
And the system will display a countdown before the start of that level-game
And the system (avatar) will announce the countdown before the start of that level-game

Scenario 2: User replays a level game
Given that the user is on the level-games options screen
When the user clicks a level-game which he or she has previously completed
Then the system will display the screen for the chosen level-game
And the points for that table will be (reset to) 0
And the medal table will be cleared

Scenario 3: User attempts to play a level-game which has not been unlocked
Given that the user is on the level-games options screen
When the user clicks a level-game which is locked
Then the locked symbol on the level-game (which the user chose) will flash red (ok?)

*

Title: User views the bonus games screen

As a user of the Rocket Reading App
I want to be able to view the bonus games options screen
So that I can choose which bonus game I will play

Scenario 1: User views the bonus games screen from the home page
Given that the user is on the home page screen
when the user clicks the bonus games button
Then the system will hide the home page screen
And the system will display the bonus games options screen

Scenario 2: User views the bonus games screen after completing a level
Given that the user has just completed all of the games in a level
And the user has not played and completed the bonus game which must be completed before the next level can be unlocked
And the system is displaying a message that the user should play a bonus game before advancing to the next level
When the user clicks the bonus game button
Then the system will hide the current screen
And the system will display the bonus games options screen 

*

Title: User initiates the start of a bonus game

As a user of the Rocket Reading App
I want to be able to start a new bonus game
So that I can practice learning to recognise letter, vowel or consonant sounds

Scenario 1: User starts a bonus game from the bonus games page
Given that the user is on a page which shows the bonus games
When the user selects a bonus game which is unlocked
Then the system will load up and display the screen for the chosen bonus game
And the system will display a countdown before the start of that bonus game
And the system (avatar) will announce the countdown before the start of that bonus game

Scenario 2: User attempts to play a bonus game which has not been unlocked
Given that the user is on a page which shows the bonus games
When the user selects a bonus game which is locked
Then the locked symbol on the bonus game (which the user chose) will flash red (or just turn red?)

*