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