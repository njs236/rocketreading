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
  Then the learn word button is activated
  
Scenario: timer expires
  When timer has elapsed 8 or more seconds
  Then the learn word button is activated
