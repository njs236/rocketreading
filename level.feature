Title: I want to know a level
  As a user
  I want to know a level
  so that I can play games
  
Scenario: Level 2 or over
  Given Level knows its games
  And Level knows its controller
  And Level has conditions upon its access being given
  And Level has points 450 or over
  When I load a level
  Then I have access to it
  And User can continue playing its games

Scenario: Level 1
  Given Level knows its games
  And Level knows its controller
  When I load Level 1
  Then I have access to it
  And User can continue playing its games
  
Scenario: Bonus Games
  Given Level knows its bonus game
  And Level knows its controller
  When I Load bonus game
  Then I have access to it
  And User can advance to Level 2 or over
