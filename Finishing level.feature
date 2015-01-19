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
    AAnd the system has displayed on the screen the user's total points for that level
    And the system has displayed on the screen the user's total points for all levels
    When the user clicks the 'Next' button
    Then the system hides the previous screen information
    And the system displays a message that the user has insufficient points to proceed to the next level
    And the system advises the user to replay some of the games in this level
    And the system displays a button for displaying the level-game options for that level
    
   