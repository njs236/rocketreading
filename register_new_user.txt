Title: Student attempts to register a new user profile in the system

As a student
I want to register a new user profile in the system
So that I can start playing the word-recognition games

Scenarios:

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


N.B. 
1: The school and class fields could have a select list for the user to choose an item from.
2: Fields of the registration form: first name, last name, username, password, duplicate password, class and school. Should they all the required? Probably.