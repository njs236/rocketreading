Title: Student attempts to register a new user profile in the system

  As a student
  I want to register a new user profile in the system
  So that I can start playing the word-recognition games

  Scenario 1: User creates a new user profile
    Given the user has clicked the button to create and register a new user profile in the system
    And the system has displayed the registration form 
    And the username which the user is going to use for the new profile is distinct and different from other usernames in the system
    When the user enters data into all of the fields of the registration form and clicks the register button 
    Then the system creates a new user profile
    And the system displays a message which says that a new profile for the user has been created in the system

  Scenario 2: User omits data from one or more of the required fields 
    Given the user has clicked the button to create and register a new user profile in the system
    And the system has displayed the registration form 
    And the username which the user is going to use for the new profile is distinct and different from other usernames in the system
    When the user enters data into only some or none of the required fields of the registration form and clicks the register button 
    Then the system displays a message which says that the user has not provided data for all of the required fields of the registration form

  Scenario 3: User enters a username which already exists
    Given the user has clicked the button to create and register a new user profile in the system
    And the system has displayed the registration form 
    And the username which the user is going to use for the new profile is the same as another username in the system
    When the user enters data into all of the fields of the registration form and clicks the register button
    Then the system displays a message which says that the new user cannot be created because another user has already chosen that username
    And the system asks the user to enter a different username

  Scenario 4: User enters data which match those of an existing user
    Given the user has clicked the button to create and register a new user profile in the system
    And the system has displayed the registration form 
    And the username which the user is going to use for the new profile is distinct and different from other usernames in the system
    And the first and last names, school and class data which the user will enter are the same as those of an already exisiting user
    When the user enters data into all of the fields of the registration form and clicks the register button
    Then the system displays a message which says that the new user cannot be created because another user already has the same first and last names, school and class
    And the system asks whether the user has already registered a user profile for themselves

  Scenario 5: User fails to confirm password
    Given the user has clicked the button to create and register a new user profile in the system
    And the system has displayed the registration form 
    And the username which the user is going to use for the new profile is distinct and different from other usernames in the system
    And the data entered into the password and confirm password fields do not match
    When the user enters data into all of the fields of the registration form and clicks the register button
    Then the system displays a message which says that the password which has been entered does not match the confirmed password
    And the system asks the user to enter the password into the two fields again

N.B. 
1: The school and class fields could have a select list for the user to choose an item from.
2: Fields of the registration form: first name, last name, username, password, duplicate password, class and school. Should they all the required? Probably.

*

Cucumber-style syntax

Title: Student attempts to login to the system

  As a user (student?)
  I want log in to the system
  So that I can start playing the word-recognition games

  Scenario 1: User enters correct username and password
    Given the system has loaded up the app 
    And the login screen has been launched
    And the user's username and password exist in the database
    When a user enters a username and the correct password into the login fields
    Then the system validates the username and firstname 
    And logs in the player successfully
    And the system will load up the home page
    And the user's name will be displayed in the appropriate position on the home page (good idea?)

  Scenario 2: User enters correct username and incorrect password
    Given the system has loaded up the app 
    And the login screen has been launched
    And the user's username and password exist in the database
    When a user enters their username and an incorrect password into the login fields 
    Then the system does not validate the username and firstname 
    And the system alerts the user that he or she has entered an invalid username and / or invalid password into the login fields

  Scenario 3: User enters incorrect username and correct password
    Given the system has loaded up the app 
    And the login screen has been launched
    And the user's username and password exist in the database
    When a user enters a different username and the correct password into the login fields
    Then the system does not validate the username and firstname 
    And the system alerts the user that he or she has entered an invalid username and / or invalid password into the login fields

  Scenario 4: User fails to include data in one or all of the fields
    Given the system has loaded up the app 
    And the login screen has been launched
    And the user's username and password exist in the database
    When a user enters data into only one or none of the login fields
    Then the system does not validate the username and firstname 
    And the system alerts the user that he or she has entered an invalid username and / or invalid password into the login fields

  Scenario 5: The user does not have a username and password in the system
    Given the system has loaded up the app
    And the login screen has been launched
    And a username and password do not exist for the user in the database
    When a user enters a username and a password into the login fields
    Then the system does not validate the username and firstname 
    And the system alerts the user that he or she has entered an invalid username and / or invalid password into the login fields

*

Feature: User views the instructions page

  AS a user of the Rocket Reading app
  I want to be able to view the instructions page
  So that I can learn how to use the app properly

  Scenario 1: User clicks the Instructions button 
    Given the user is logged on
    And the user is on the home page screen
    When the instructions button is clicked
    The the system will display the intructions screen

*

Feature: User views the high scores

  As a user of the Rocket Reading App
  I want to be able to view the high scores page
  So that I can see what high scores I have achieved so far

  Scenario 1: user clicks the high scores button
    Given the user is logged in
    And the user is on the home page screen
    When the user clicks the high scores button
    Then the system will display the page with the high scores

*

Feature: Play demo
  As a user
  I want to see how the program works
  So that I might be able to use the program

Scenario: Play Demo
  Given user is logged in
  Given User is on home screen
  When Demo button is pressed
  Then go into Demo
  
*

Feature: Exiting the game validation page

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

Feature: Viewing the Levels Screen

  As a user of the Rocket Reading app
  I want to be able to view the levels page
  So that I can choose which level of game(s) I will play

  Sceanrio 1: User clicks the start button 
    Given the user is logged in
    And the user is on the home page screen
    When the user clicks the Start button
    Then the system will load and display the levels options


*

Feature: Viewing the games in a level

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
    Then a locked symbol on the level option will flash
  
  Scenario 3: User clicks a level which requires a bonus game to be played first
    Given the user is logged in 
    And the user is on a level options screen
    When the user clicks a level option which requires a bonus game to be played first
    Then the system will display a message which says that the user must play a bonus game first
    And the system will display a button which will link to the bonus games options screen 

*

Feature: User initiates the start of a game

  As a user of the Rocket Reading App
  I want to be able to start a game
  So that I can practice learning to recognise words 
  
  Scenario 2: User starts a game from the home page 
    Given that the user is on the home page screen
    When the user clicks the Start button
    And the user click a level which is unlocked
    And the system displays the user's best score and top medal for this level (1)
    And the user clicks a game which is unlocked
    And the system displays the top score(s) which the user has achieved for that game
    And the user clicks the button to start this game (play game)
    Then the system will load and display the screen for the chosen game
    And the system will display a countdown before the start of that game
    And the system (avatar) will announce the seconds of the countdown 

  Scenario 2: User starts a game from a level page 
    Given that the user is on the games selection screen for a level
    And the system displays the user's best score and top medal for this level (1)
    When the user clicks a game which is unlocked
    And the system displays the top score(s) which the user has achieved for that game
    And the user clicks the button to start this game (play game)
    Then the system will load and display the screen for the chosen game
    And the system will display a countdown before the start of that game
    And the system (avatar) will announce the seconds of the countdown 

  Scenario 3: User replays a game
    Given that the user is currently playing a game
    When the user clicks the replay button
    Then the system will clear the piggy bank of any words it might contain
    And the points will be reset to 0
    And the medal table will be cleared
    And the system will display the cleared points and medal table
    And the system will display a countdown before the start of that game
    And the system (avatar) will announce the seconds of the countdown 

  Scenario 4: User attempts to play a game which has not been unlocked
    Given that the user is on the games selection screen for a level
    When the user clicks a game which is locked
    Then the locked symbol on the game (which the user chose) will flash red (ok?)

(1) The user's current score for a level is the total of the user's top scores for the games of this level.
*

Title: Testing Word Recognition
As a User
  I want to test my recognition of words
  so that I might learn words

Scenario: Selects word in under 2 secs
  Given the timer has started
  Given timer is under 2 seconds
  Given the word matches the spoken or visual word
  When I select the word
  then I receive gold star and 5 points
  
Scenario: Selects word between 2 and 4 seconds
  Given the timer has started
  Given timer is between 2 and 4 seconds
  Given the word matches the spoken or visual word
  When I select the word
  then I receive silver star and 3 poinst

Scenario: Selects correct word between 4 and 8 seconds
  Given the timer has started
  Given timer is between 4 and 8 seconds
  Given the word matches the spoken or visual word
  When I select the word
  Then I receive bronze star and 1 point

Scenario: Over 8 seconds
  Given the timer has started
  Given timer is above 8 seconds
  When timer is above 8 seconds
  Then Learn Word flashes
  
Scenario: Incorrect word
  Given the timer has started
  Given incorrect word
  When select word
  then Learn Word flashes

*

Feature: Learning words
  As a child (user)
  I want the app to test me on words I have failed to identify correctly
  so that I can learn words I do not know well

  Scenario 1: Learn word after timer finishes
    Given timer is over 8 secs
    And the Learn Word option has flashed on the screen
    And I have clicked the Learn word button
    Then it displays the word
    Then correct word is announced 2 times
    Then letters of word are shown in dotted letters
    Then the word is announced again
    And the word flashes on the screen
    And a voice reads a sentence containing the word
    Then the word disappears 
    And a voice speaks the word again
    When child selects the correct word from the list / table
    Then correct word goes into piggy bank
    And no points awarded
    
// Having the sentence appear on the screen would probably be too confusing for the users  
// I should include a specific word for this test - eg a word from Basic Sight list 1
  
  Scenario 2: Learn word after choosing incorrect word
    Given I have selected an incorrect word
    And the timer is less than 8 secs
    And the Learn Word option has flashed on the screen
    And I have clicked the Learn word button
    Then it displays the word
    Then correct word is announced 2 times
    Then letters of word are shown in dotted letters
    Then the word is announced again
    And the word flashes on the screen
    And a voice reads a sentence containing the word
    Then the word disappears 
    And a voice speaks the word again
    When child selects the correct word from the list / table
    Then correct word goes into piggy bank
    And no points awarded

  Scenario 3: User fails to identify the correct word which is being learned
    Given the user has entered the learn words mode
    And the system has displayed the word
    And the word has been announced two times
    And the letters of the word are shown in dotted letters
    And the word is announced again
    And the word flashes on the screen
    And a voice reads a sentence containing the word
    (And the word in the sentence is shown on the screen before disappearing)
    And the word is spoken again
    When the user chooses a word which is different from the selected word
    Then the system displays a message which says that the user has failed to identify the correct word
    And the system encourages the user to try again
    And this scenario repeats
    And the next time the system displays the list of words for the user to identify the word from, the list will be reduced by eight  

  Scenario 4: After 3 attempts the user must succeed
    Given the user has entered the learn words mode
    And the user has failed to identify the word correctly three times
    And the learn word routine has repeated three times
    And the system will display only one word for the user to choose
    When the user chooses the correct word
    Then the system displays a message which congratulates the user for identifying the correct word
    And the correct word goes into the piggy bank
    (And no points are awarded)

// or: let's move on to something else

*

Feature: User views the bonus games screen

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

Feature: User initiates the start of a bonus game

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

Title: Testing Recognition of Sounds
  As a User
  i want to test my ability to recognize Alphabet sounds
  so that I will improve my literacy

Scenario: Chooses correct Letter in 2 seconds or less
  Given timer has started
  Given timer is less than 2 seconds
  When I select I when the letter is I
  Then the word goes in the piggy bank
  Then a sound is played
  Then 10 points are awarded
  Then a gold star is given

Scenario: Chooses correct Letter between 2 and 4 seconds
  Given timer has started
  Given timer is between 2 and 4 seconds
  When I select I when the letter is I
  Then the word goes in the piggy bank
  Then a sound is played
  Then 6 points are awarded
  Then a silver star is given
  
Scenario: Chooses correct Letter between 4 and 8 seconds
  Given timer has started
  Given timer is between 4 and 8 seconds
  When I select I when the letter is I
  Then the word goes in the piggy bank
  Then a sound is played
  Then 2 points are awarded
  Then a bronze star is given
  
Scenario: Chooses incorrect word
  Given timer has started
  When I select I when the letter is A
  Then the learn sound button is activated
  
Scenario: timer expires
  When timer has elapsed 8 or more seconds
  Then the learn sound button is activated

*

Feature: Using the Continue buttons
  As a user of the Rocket Reading App
  I want to be able to use the Continue buttons
  So that I can return to word or bonus games which I have not finished
  
  Scenario 1: User returns to an unfinished word games
    Given that the user has only partly finished one of their word games
    And the system will display the Continue Word Game button on the home page
    And the user is on the home page
    When the user clicks the Continue Word Game button
    Then the system will hide the home page screen
    And the system will return the user to the point in the previously played word game which the user had got up to
    
  Scenario 2: User returns to an unfinished bonus game
    Given that the user has only partly finished one of their bonus games 
    And the system will display the Continue Bonus Game button on the home page
    And the user is on the home page screen
    When the user clicks the Continue Bonus Game button
    Then the system will hide the home page screen
    And the system will return the user to the point in the previously played bonus game which the user had got up to
    
  Scenario 3: User returns to one of their unfinished word games
    Given that the user has only partly finished one of many word games
    And the system will display the Continue Word Game button on the home page
    And the user is on the home page
    When the user clicks the Continue Word Game button
    And the user chooses which partly completed word game he or she will resume
    Then the system will hide the partly completed word games screen
    And the system will return the user to the point in the selected word game which the user had got up to 
    
  Scenario 4: User returns to one of their unfinished bonus games
    Given that the user has only partly finished one of many bonus games
    And the system will display the Continue Bonus Game button on the home page
    And the user is on the home page
    When the user clicks the Continue Bonus Game button
    And the user chooses which partly completed bonus game he or she will resume
    Then the system will hide the partly completed bonus games screen
    And the system will return the user to the point in the selected bonus game which the user had got up to 
    
*

Feature: Finishing a game (but not the last game for the whole level)
  As a user of the Rocket Reading App
  I want to get the results of playing a game
  so that I can see how well I did in the game
  
  Scenario 1: User finishes a game with a gold medal / star
    Given the user has only one test to go before finishing a game
    And the system has been calculating the user's total points for that game
    And the system has been calculating the user's medals for the game
    And the best medal the user has received so far or will receive in the final test is a gold medal
    When the user finishes the last test for the game
    (And the user has successfully learned the word for the last test if the user got it wrong)
    Then the system will hide the game screen
    And the system will calculate the user's total points for that game
    And the system determines that the best medal the user receives for that game was a gold medal
    And the system displays a message congratulating the user for finishing the game with a gold medal
    And the system displays the gold medal
    And the system displays the total points which the user got for this game
    And the system displays the user's overall total points

  Scenario 2: User finishes a game with a silver medal / star
    Given the user has only one test to go before finishing a game
    And the system has been calculating the user's total points for that game
    And the system has been calculating the user's medals for the game
    And the best medal the user has received so far or will receive in the final test is a silver medal
    When the user completes the last test for the game
    (And the user has successfully learned the word for the last test if the user got it wrong)
    Then the system will hide the game screen
    And the system will calculate the user's total points for that game
    And the system determines that the best medal the user receives for that game was a silver medal
    And the system displays a message congratulating the user for finishing the game with a silver medal 
    And the system displays the silver medal
    And the system displays the total points which the user got for this game
    And the system displays the user's overall total points 
    
  Scenario 3: User finishes a game with a bronze medal / star
    Given the user has only one test to go before finishing a game
    And the system has been calculating the user's total points for that game
    And the system has been calculating the user's medals for the game
    And the best medal the user has received so far or will receive in the final test is a bronze medal
    When the user completes the last test for the game
    (And the user has successfully learned the word for the last test if the user got it wrong)
    Then the system will hide the game screen
    And the system will calculate the user's total points for that game
    And the system determines that the best medal the user receives for that game was a bronze medal
    And the system displays a message congratulating the user for finishing the game with a bronze medal
    And the system displays the bronze medal 
    And the system displays the total points which the user got for this game
    And the system displays the user's overall total points 

  Scenario 4: User finishes a game with no medals
    Given the user has only one test to go before finishing a game
    And the system has been calculating the user's total points for that game
    And the system has been calculating the user's medals for the game
    And the user has not and will not receive any medals in any of the tests for this game
    When the user completes the last test for the game
    (And the user has successfully learned the word for the last test)
    Then the system will hide the game screen
    And the system calculates the user's total points for that game
    And the system determines that the user has not received any medals for this game
    And the system displays a message congratulating the user for finishing the game
    And the system displays the total points which the user got for this game
    And the system displays the user's overall total points

*

Feature: Finishing and completing a level
  As a user of the Rocket Reading App
  I want to get at least 450 points
  so that I can progress to the next level
  
  Scenario 1: User must complete bonus game to advance to the next level
    Given the user has just finished the last game in a level
    And the system has calculated the user's total points for that level as being at least 450 or higher
    And the system has displayed on the screen a message that the user has finished game 4 
    And the system has displayed on the screen the user's total points for that level
    And the system has displayed on the screen the user's total points for all levels
    And the user has not completed the bonus game which is also required to unlock the next level
    When the user clicks the 'Next' button
    Then the system hides the previous screen information
    And the system displays a message that the user must complete a bonus game before proceeding to the next level
    And the system displays a button which will open up the bonus game screen
    
  Scenario 2: User can advance to the next level
    Given the user has just finished the last game in a level
    And the system has calculated the user's total points for that level as being at least 450 or higher
    And the system has displayed on the screen a message that the user has finished game 4 
    And the system has displayed on the screen the user's total points for that level
    And the system has displayed on the screen the user's total points for all levels
    And the user has completed the bonus game which is also required to unlock the next level
    When the user clicks the 'Next' button
    Then the system hides the previous screen information
    And the system displays a message that the user can proceed to the next level
    And the system displays a button for advancing to the next level
    
  Scenario 3: User fails to get enough points
    Given the user has just finished the last game in a level
    And the system has calculated the user's total points for that level as being under 450
    And the system has displayed on the screen a message that the user has finished game 4 
    And the system has displayed on the screen the user's total points for that level
    And the system has displayed on the screen the user's total points for all levels
    When the user clicks the 'Next' button
    Then the system hides the previous screen information
    And the system displays a message that the user has insufficient points to proceed to the next level
    And the system advises the user to replay some of the games in this level
    And the system displays a button which will link to the games options screen for that level
