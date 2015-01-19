Cucumber-style syntax

Feature: Student attempts to login to the system
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


N.B.: However, the use case talks about the user providing a username and firstname (instead of password) to login - so 'password' may have to be replaced with 'firstname'. How well is this going to work with an app?
