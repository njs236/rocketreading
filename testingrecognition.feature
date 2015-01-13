Title: Testing Recognition
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
