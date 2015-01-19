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