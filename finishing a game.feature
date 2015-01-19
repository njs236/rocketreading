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
