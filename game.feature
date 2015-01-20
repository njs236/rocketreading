Title: I want to Know a Game
  As a User
  I want to know a game
  so that I might learn a level
  
Scenario: Level 1 Game
  Given that a game is part of a level
  And a game knows its list of words
  And game can record its state
  And Game has a resume and continue function
  When I play a game
  Then I will record its state
  And produce a list of words
