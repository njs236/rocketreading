// The system creates a mainController object which aims to resolve requests that involve data analysis

var mainController = {
    
    // *************************************
	// ******* Register Screen Section *****
	// *************************************
    
    registerPlayer : function () {
        "use strict";
        var userName = document.getElementById('registerUserName').value,
            firstName = document.getElementById('registerFirstName').value,
            lastName = document.getElementById('registerLastName').value,
            school = document.getElementById('registerSchool').value,
            classroom = document.getElementById('registerClass').value;
        rocketReadingModel.registerPlayer(userName, firstName, lastName, school, classroom, 0, [1,1], 1, 450);
    },    
    
    // *************************************
	// ******* Login Screen Section ********
	// *************************************
    
    loginMethods: {
        validateLogin: function (userName, userPassword) {
            "use strict";
           if  (( storageController.getPlayer(userName).userName === userName) && ( storageController.getPlayer(userName).firstName === userPassword )) {
                return true;
            } else {
                return false;
            };
        },
        
        validateUserExists: function (userName) {
            "use strict";
            // Data is sent to the view controller to be displayed in the console
            //myViewModelRR.loginOutputData("name: " + nameElement.value);
            
            var result = JSON.parse(localStorage.getItem(userName));
            if ( result !== null ) {
                // Data is sent to the view controller to be displayed in the console
                //myViewModelRR.loginOutputData("User exists: " + result + " - true!");
                return true;
            } else {
                //document.getElementById("loginMessage").innerHTML = "Unknown username. Please try entering your username again or create an account.";
                return false;
            }
        },
            
        validateFieldInput: function (userName, userPassword) {
            "use strict";
            if (userName === "" && userPassword === "") {
                document.getElementById("loginMessage").innerHTML = "Please enter a username and a password.";
            } else if (userName === "") {
                document.getElementById("loginMessage").innerHTML = "Please enter a username.";    
            } else if (userPassword === "") {
                document.getElementById("loginMessage").innerHTML = "Please enter a password.";
            } else {
                return true;
            }
        }
    },
    
    // Processing login function
    
    processLogin: function (userName,userPassword) {
        "use strict";
		console.group("Login Process");
		console.log(userName + userPassword);
        if (mainController.loginMethods.validateFieldInput(userName, userPassword)) {
			console.log("Fields Valid");
            if (mainController.loginMethods.validateUserExists(userName)) {
				console.log("User Exists");
				if ( mainController.loginMethods.validateLogin( userName, userPassword ) ){
					console.groupEnd();
					myViewModelRR.loginSuccessful();
					mainController.setPlayer(userName);
                    mainController.setAccessTo();
				} else {
					console.log("%cprocessLogin : Bad Password","color:red");
					myViewModelRR.badLogin();
				};
				
            } else {
                console.log("No login ...");
				console.groupEnd();
				myViewModelRR.badLogin();
            }
        }
		
    },
    
    
	setPlayer: function (username) {
    // This function is for loading player data from the local storage 
        "use strict";
		var playerData = storageController.getPlayer(username);
        console.log("mainController.setPlayer(): setPlayer() player's school - " + playerData.school);
        // It's interesting to see what happens when passing the score as 0 (and the constructor does not set the total score as 0 if there is not input parameter for this attribute.
		rocketReadingModel.setPlayer(playerData);
		myViewModelRR.displayPlayerName(username);
	},
    
    setAccessTo : function () {
        "use strict";
        /* This function receives three inputs;
        levelGameReached
        pointsToPassLevel
        checkForBonusGameCompletion */
        var aGame,
        aLevel, 
        levelGameReached = rocketReadingModel.getMyPlayer().getLevelGameReached();
        // pointsToPassLevel = rocketReadingModel.getMyPlayer().getPointsToPassLevel();
        /*bonusGame = mainController.checkForBonusGameCompletion(level, game);*/
        /*We need to account for these eventualities:
        when a player access his login, the script will enable access to the games that they have available. This will be setting access to all games and levels they are allowed to access. */
        for (aLevel of rocketReadingModel.getAllLevels()) {
            //The total array is made up of levels that are accessible, and the games in them as accessible, the Level that the current User is upto, being accessible, and its games being accessible upto the reached game, the level that inaccessible and all the games of that level are inaccessible;
            if (aLevel.getLevelNumber() < levelGameReached[0]) {
                aLevel.setAccessTo(true);
                for (aGame of aLevel.getAllGames()) {
                    aGame.setAccessTo(true);
                };
            } else if (aLevel.getLevelNumber() === levelGameReached[0]) {
                aLevel.setAccessTo(true)
                for (aGame of aLevel.getAllGames()) {
                    if (aGame.gameNumber <= levelGameReached[1]) {
                        aGame.setAccessTo(true);
                    } else {
                        aGame.setAccessTo(false);
                    }
                }
            } else {
                aLevel.setAccessTo(false);
                for (aGame of aLevel.getAllGames()) {
                    aGame.setAccessTo(false);
                }
            }
        }
    },
    
    setLevelGameReached: function (currentLevel, gameNumber) {      
        "use strict";
        // When a player finishes a game, the script will enable access to the next game and the next level (if bonus game has been completed too and the player has achieved enough points)
    
        // if (finishedGame === true) {
        var temp = [],
            bonusGameCheck = false,
            levelGameReached = rocketReadingModel.getMyPlayer().getLevelGameReached(),
            level = rocketReadingModel.findLevelByNumber(levelGameReached[0]),
            // currentLevel = rocketReadingModel.getCurrentGameData().getCurrentLevel(),
            // currentLevel = rocketReadingModel.findLevelByNumber(levelGameReached[0]),
            game = rocketReadingModel.getCurrentGameData().getCurrentGame(),
            pointsToPassLevel = rocketReadingModel.getMyPlayer().getPointsToPassLevel();
            
            // There needs to be a check that there is data for a bonus game in allGamesData which corresponds to the level number of the game the user has just played. This condition will check that there is at least one object in allGamesData for the appropriate levelGame object. So: 'currentLevel.getLevelNumber())[0]'
            if (rocketReadingModel.getAllGamesData().getGameDataArray(0, currentLevel.getLevelNumber())[0] !== undefined) {
                // Get the bonusGameCompleted property from the allGamesData property
                bonusGameCheck = rocketReadingModel.getAllGamesData().getGameDataArray(0, 1)[0].getCurrentGame().getCompletion(), 
                // If data is loaded from LS then the data inside the allGamesData property will not be of the currentGameData class. So, that is why the end of the following line has 'myGame.bonusGameCompleted' instead of 'getCurrentGame().getCompletion()'
                // bonusGameCheck = rocketReadingModel.getAllGamesData().getGameDataArray(0, currentLevel.getLevelNumber())[0].myGame.bonusGameCompleted; /* This is no longer necessary - data encapsulation is now in place */
                console.log("setLevelGameReached() - bonusGameCheck = " + rocketReadingModel.getAllGamesData().getGameDataArray(0, currentLevel.getLevelNumber())[0].getCurrentGame().getCompletion());
            }
            
            // There should also be a check that the current level number is not the maximum level number
            if ((bonusGameCheck === true) 
                    && (pointsToPassLevel <= Number(rocketReadingModel.getMyPlayer().calculateSumHighScores(currentLevel.getLevelNumber()))) 
                    && (levelGameReached[1] === level.getAllGames().length)) {
                console.log("setLevelGameReached(): level's total high scores" + rocketReadingModel.getMyPlayer().calculateSumHighScores(currentLevel.getLevelNumber()));
                temp.push(rocketReadingModel.findLevelByNumber(levelGameReached[0] + 1).getLevelNumber());
                temp.push(1);
                console.log("setAccessTo: " + temp);
                rocketReadingModel.getMyPlayer().setLevelGameReached(temp);
                // The next conditional test should not be called if the game number of the player's levelGameReached is higher than the game number of the current game
            } else if ((gameNumber < currentLevel.getAllGames().length) && (levelGameReached[1] <= gameNumber)){
                temp.push(level.getLevelNumber());
                temp.push((game.gameNumber) + 1);
                console.log("setAccessTo: " + temp);
                rocketReadingModel.getMyPlayer().setLevelGameReached(temp);
            } else {
                // If the above two conditions do not apply then do not call rocketReadingModel.getMyPlayer().setLevelGameReached(temp)
                console.log("Nothing has been set in setLevelGameReached()");
            }               
            // If the above two conditions do not apply then do not call rocketReadingModel.getMyPlayer().setLevelGameReached(temp)
                   
            /*then the mainpart of the function is going into all the games
            and setting access to.
            setAccessTo (in game and level objects)
            it outputs to display the locked or unlocked pictures of levels and games. and adds or removes event Listeners for those buttons.
            Finally, it outputs with updating the LevelGameReached.(if the user has achieved the right results. )
            */
            // rocketReadingModel.getMyPlayer().setLevelGameReached(temp);
            
        //};
    },   
   
    // ***********************************************
	// ************ Home Screen Section **************
	// ***********************************************
    
    checkAdvanceNextGame: function () {
    // This function checks whether the player needs to complete a bonus game before advancing to the next level
        "use strict";
        
    },
    
   
    loadPreviousGame: function () {
        "use strict";
        // The system clears the current data's saved game data
        // rocketReadingModel.getCurrentGameData().setSavedLevelGame(null);
        // The system gets the user's current game details and opens the particular screen
        mainController.gameInitialise();
        myViewModelRR.showGameScreen();
        // Event listeners for the 'back' button of the game intro modal window will be added
        myViewModelRR.addEventListContinueGameBack();
        
        // The following code is not necessary - the game will now start when the user clicks the start link of the modal screen (which will display now when the game screen opens)
        /*
        // Ideally, when the user clicks the Continue button and returns to the saved game the modal screen should be displayed. And so, when the user clicks the Start link on the modal page the game timer should then start
        // The game timer is started again
        mainController.startGameTimer();
        // The current word from the saved game is set as the current word for the first test which the user will have to do when they return to playing their saved game
        mainController.setNextWord();*/
    },    
    
    
    resolveContinueBtn: function () {
        "use strict";
        var levelGame;
        if (rocketReadingModel.getCurrentGameData().getSavedLevelGame() === null) {
            // If the user has completed a previous game then the timers and game time display will be reset
            mainController.resetGameTimers();
            // The system will open the highest level game screen which the user has reached. What if the user needs to complete a bonus game before starting the next level-game?
            if (mainController.checkAdvanceNextGame()) {
                console.log("mainController.resolveContinueBtn() getMyPlayer(): " + rocketReadingModel.getMyPlayer().getLevelGameReached());
                levelGame = rocketReadingModel.getMyPlayer().getLevelGameReached();
                rocketReadingModel.getCurrentGameData().setCurrentLevel(rocketReadingModel.findLevelByNumber(levelGame[0]));
                rocketReadingModel.getCurrentGameData().setGameAndWordList(rocketReadingModel.findGameByNumber(levelGame[1]));
                mainController.gameInitialise();
                // The game screen is displayed
                myViewModelRR.showGameScreen();
                // Ideally an introduction modal screen should be displayed when the game screen is first opened
                
                // The game timer is started and the current word is selected
                mainController.startGame();
            } else {
                // The user will have to complete a bonus game before advancing to the next level
            }
        } else if ((rocketReadingModel.getCurrentGameData().getSavedLevelGame() !== null)) {
            // If the user has a saved game then the screen for that level-game will be displayed
            mainController.loadPreviousGame();
        }
    },
	
    disableBarTimer: function () {
    // The timers for the bar timer are cleared and the bar is hidden
        "use strict";        
        myViewModelRR.hideBarTimer();
        clearTimeout(silverBar);
        clearTimeout(bronzeBar);
    },
    
    logoutPlayer: function () {
        "use strict";
        // Clear the myLevel property of the currentGamesData object to null or an empty object to prevent a 'converting circular structure to JSON' error from happening
        rocketReadingModel.getCurrentGameData().setCurrentLevel({});
        // The currentGameData should be saved to the player's local storage file, so that the player can return to their un-finished game when they log back in (although this is not possible atm).
        storageController.saveCurrentGameData();
        // Save the player's allGamesData in case this has not already been done, ie a player has not finished any games.
        storageController.saveAllGamesData();
        // Clear the data 
        rocketReadingModel.addAllGamesData([], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []);
        rocketReadingModel.addCurrentGameData(null, null, null, null, null, null, 0, [0,0,0], null, null, [], []);
        rocketReadingModel.registerPlayer(null, null, null, null, null, null, null, null, null);
    },
    
    
    // ********************************************
	// ******* Level Select Screen Section ********
	// ********************************************
    
    
    setCurrentLevel : function () {
		"use strict";
		var levelNumber = mainController.getStringNumber(this.id),
			levelGame = [levelNumber, null];
		
		rocketReadingModel.getCurrentGameData().setCurrentLevel(rocketReadingModel.findLevelByNumber(levelNumber));
		rocketReadingModel.getCurrentGameData().setCurrentLevelGame(levelGame);
	},
    
    requestAllLevels: function () {
        "use strict";
		// function will send the level number,avatarname, and level description
		// in a 2d array formatted as follows
		// level data in the following format
		// ["01",avatarName,"Ice Cream Zone"]
		// ["02",avatarName,"Jungle Zone"]
		// ["03",avatarName,"Clouds Zone"]
		var allLevels = [],
			count,
			outputArray = [],
			transientArray = [];
        // This function gets data from the model data
        allLevels = rocketReadingModel.getAllLevels();
        // Calls a function in the view controller
		
		for ( count = 0; count < allLevels.length; count = count + 1) {
			transientArray[0] = allLevels[count].getLevelNumber();
			transientArray[1] = allLevels[count].getAvatar().getName();
			transientArray[2] = allLevels[count].getDescription();
            transientArray[3] = allLevels[count].getAccessibility();
			outputArray.push(transientArray);
			transientArray = [];
		};
		return outputArray;
		//myViewModelRR.displayLevelList(outputArray);
		
        //myViewModelRR.displayLevelList(allLevels);
    },   
    
    // *******************************************
	// ******* Game Select Screen Section ********
	// *******************************************
    
    
    getStringNumber: function (inputId) {
        "use string";
        return Number(inputId.slice(inputId.search(/[1-9]/), inputId.length));
    },
	
    
	setGameAndWordList : function (gameString) {
		"use strict";
        // Using this.id as the argument for getStringNumber() will not work now because this function is being called by other functions
		var gameNumber = mainController.getStringNumber(gameString),
            levelGames = rocketReadingModel.getCurrentGameData().getCurrentLevelGame();
        levelGames[1] = gameNumber;
		console.log("setGameAndWordList() - gameNumber (regex):" + gameNumber);
		// Loading selected Game into currentGame in currentGameData
		rocketReadingModel.getCurrentGameData().setGameAndWordList(rocketReadingModel.findGameByNumber(gameNumber));
        // The game part of currentGameData.currentLevelGame needs to be set
        rocketReadingModel.getCurrentGameData().setCurrentLevelGame(levelGames);
	},
    
    requestAllGamesForLevel : function () {
		"use strict"
		// function returns a 2D array of games for an input level
		// in the following format.
		// [ 1 , "game01" ]
		// [ 2 , "game02" ]
		// [ 3 , "game03" ]
		var outputGameOptions = [],
			levelNumber = mainController.getStringNumber(this.id),
			count,
			tempArray = [],
			gamesArray = [];
		
		console.group("mainController :requestAllGamesForLevel()");
		console.log("requestAllGamesForLevel() : level number is:" + levelNumber);
		gamesArray = rocketReadingModel.getAllGamesFromLevel(levelNumber);
		console.log("Found level's games :");
		console.log(gamesArray);
		
		for ( count = 0; count < gamesArray.length; count = count + 1) {
			tempArray[0] = gamesArray[count].getNumber();
			tempArray[1] = gamesArray[count].getGameName();
            tempArray[2] = gamesArray[count].getAccessibility();
			console.log("requestAllGamesForLevel() : added '" + tempArray + "' to list");
			outputGameOptions.push(tempArray);
			tempArray = [];
		};
		console.groupEnd();
		myViewModelRR.displayGameOptions(outputGameOptions);
	},    
    
     checkGameResumption: function () {
    // This function will check whether the user has a current saved game for the game which the user is currently choosing to play
        "use strict";
        var game = rocketReadingModel.getCurrentGameData().getCurrentGame(),
            // level = rocketReadingModel.getCurrentGameData().getCurrentLevel(),
            level = rocketReadingModel.findLevelByNumber(rocketReadingModel.getCurrentGameData().getCurrentLevelGame()[0]),
            wordList = rocketReadingModel.getCurrentGameData().getWordList(),
            levelGame = rocketReadingModel.getCurrentGameData().getCurrentLevelGame();
        if (rocketReadingModel.getCurrentGameData().getSavedLevelGame() === levelGame) {
            // Check with the user whether they wish to resume the old game or start a new game
        } else {
            // The data for the previous game in the current object needs to be cleared and data for the new game set
            // Not all properties will be clobbered by the resetCurrentGameData() function - all the properties of currentGameData should really be set-able by addCurrentGameData()
            rocketReadingModel.clearCurrentGameData();
            // Create a new current data object, setting it the appropriate values for the currentLevelGame, myGame, myLevel and wordList properties, and then assign it as a property of the Rocket-Reading object
            mainController.resetCurrentGameData(level, game, wordList, levelGame);
            // The system will disable and turn off the learn word mode in case it was turned on when the user was playing another game and then the user left that game without successfully answering that word
            mainController.disableLearnWord();
            mainController.resetGameTimers();
            mainController.gameInitialise();
        }
    },
    
    
    // *******************************************
	// ********** Game Screen Section ************
	// *******************************************
   
    
    checkForBonusGameCompletion : function (/*levelReached*/) {
    //This method both sets and ensures that the BonusGame completed will result in a successful attempt at unlocking the next level.
        "use strict";
        // If the currentLevel that is being played is the bonus level ...
        var result = false,
            // levelNumber = rocketReadingModel.getCurrentGameData().getCurrentLevel().getLevelNumber();
            levelNumber = rocketReadingModel.getCurrentGameData().getCurrentLevelGame()[0];
        if (levelNumber === 0) {
            // ... then look for the current game and set it to completed.
            rocketReadingModel.getCurrentGameData().getCurrentGame().setCompletion();
        };/*
        // If the bonusGame for the level is completed, then it will return the value 'true'
        if (rocketReadingModel.getBonusGame(levelReached).getCompletion() === true ) {
            console.log("checkForBonusGameCompletion:" + rocketReadingModel.getBonusGame(levelReached).getCompletion());
            result = true;
            console.log("checkForBonusGameCompletion(): " + result);
            return result;
           
        } else {
            console.log("checkForBonusGameCompletion:" + rocketReadingModel.getBonusGame(levelReached).getCompletion());
            result = false;
            console.log("checkForBonusGameCompletion(): " + result);
            return result;
        };*/
    },
    
    /*
    finishGameScreen : function () {
        "use strict";
        var game = rocketReadingModel.getCurrentGameData().getCurrentGame(),
            gameNumber = game.getNumber(),
            level = rocketReadingModel.findLevelByNumber(rocketReadingModel.getCurrentGameData().getCurrentLevelGame()[0]),
            levelNumber = level.getLevelNumber(),
            medalCounts = rocketReadingModel.getCurrentGameData().getMedalCounts();
        window.setTimeout(function () {
            myViewModelRR.displayGameResults(levelNumber, gameNumber, medalCounts);
        }
        ,700); 
    },*/

    finishGame: function () {
        "use strict";
        var game = rocketReadingModel.getCurrentGameData().getCurrentGame(),
            gameNumber = game.getNumber(),
            // level = rocketReadingModel.getCurrentGameData().getCurrentLevel(),
            level = rocketReadingModel.findLevelByNumber(rocketReadingModel.getCurrentGameData().getCurrentLevelGame()[0]),
            levelNumber = level.getLevelNumber(),
            wordList = game.getWordList().slice(0),
            levelGame = rocketReadingModel.getCurrentGameData().getCurrentLevelGame(),
            playerName = rocketReadingModel.getMyPlayer().getUserName(),
            levelGameReached = rocketReadingModel.getMyPlayer().getLevelGameReached(),
            medalCounts = rocketReadingModel.getCurrentGameData().getMedalCounts();
        // The game results screen is displayed (after the game-feedback modal has been shown)
        window.setTimeout(function () {
            myViewModelRR.displayGameResults(levelNumber, gameNumber, medalCounts);
        }
        ,700);
        // Stop the total game timer
        clearInterval(gameTimer);
        // Save the gameTimer to the currentGameData object
        rocketReadingModel.getCurrentGameData().saveGameTime();

        // Check to see if the high-score should be updated
        rocketReadingModel.getMyPlayer().checkHighScore(levelNumber, gameNumber);
        // The system checks whether a user has completed a bonus game and if so sets the bonus game as being completed
        mainController.checkForBonusGameCompletion(levelGame[0]);
        // Save the current game data to rocketReadingModel.myAllGamesData
        rocketReadingModel.getAllGamesData().saveGameData(levelNumber, gameNumber, rocketReadingModel.getCurrentGameData());
        
        // If the number of the player's level reached is the same as the level number of the level-game which the player has just played then the system will check to see whether to update the user's levelGameReached property
        if (levelGameReached[0] === rocketReadingModel.getCurrentGameData().getCurrentLevelGame()[0] 
                // There needs to be a test whether the user has completed the last game for the current level. Actually, this is not actually true - a player could be replaying an earlier game in that level
                // && levelGameReached[1] === rocketReadingModel.getCurrentGameData().getCurrentLevelGame()[1]
                // Also, the player's levelGameReached will not be updated if the player is on the last and final level
                && ((levelNumber !== rocketReadingModel.getAllLevels().length - 1) || (gameNumber !== level.getAllGames().length))) {
            // If the player has unlocked a new level-game then the system will have to make this level-game accessible to the player 
            mainController.setLevelGameReached(level, gameNumber);
            mainController.setAccessTo();
        }
        // There also needs to be a check if the user has completed a bonus game (and the games for the level which has the level number which matches the bonus game number have been completed, and the points for those games is above the threshold)
        // Although the call of checkLevelGamesCompleted() takes gameNumber as a parameter, the function will actually use this value to determine the number of the level it will check for all-games completion
        if ( (levelNumber === 0) 
                && (rocketReadingModel.getAllGamesData().checkLevelGamesCompleted(gameNumber) === true) 
                && (levelGameReached[0] === gameNumber) 
                && (levelGameReached[0] !== rocketReadingModel.getAllLevels().length - 1) ) {
            // Passing setLevelGameReached() the gameNumber to determine the level which will be looked at. Passing null for the second parameter - will this work? Seems to
            mainController.setLevelGameReached(rocketReadingModel.findLevelByNumber(gameNumber), null);
            mainController.setAccessTo();
        }
        
        // Clear the myLevel property of the currentGamesData object to null or an empty object to prevent a 'converting circular structure to JSON' error from happening
        rocketReadingModel.getCurrentGameData().setCurrentLevel({});
        // Save data to local storage (which will also be done when a player logs out)
        // Saving currentGameData should not be necessary to do but it's good to call this function here in case a player exits the program by closing the window of the browser and not logging out through the game (& see below: the currentGameData will soon be cleared):
        storageController.saveCurrentGameData(); 
        storageController.saveAllGamesData();
        // Clear the current data object
        rocketReadingModel.clearCurrentGameData();
        // Create a new currentGameData object, setting the values for the currentLevelGame, myGame, myLevel and wordList properties which match the level-game which the user has just played - in case the player would like to replay this game.
        mainController.resetCurrentGameData(level, game, wordList, levelGame);
		// myViewModelRR.finishedGame(); // This method has already been called from viewHTMLModule.displayGameResults()
    },
    
    setSavedGameNull: function () {
        "use strict";
        // The system clears the current data's saved game data
        rocketReadingModel.getCurrentGameData().setSavedLevelGame(null);    
    },

    
    disableLearnWordTimers: function () {
        "use strict";
        // This function will disable all of the timers which are used in the learn word sequence
        clearTimeout(learnWordTimerA);
        clearTimeout(learnWordTimerB);
        clearTimeout(learnWordTimerC);
        clearTimeout(learnWordTimerD);
    },
    
    leaveCurrentGame: function () {
        "use strict";
        var levelNumber,
            gameNumber,
            levelGame = rocketReadingModel.getCurrentGameData().getCurrentLevelGame();
        // The system needs to stop the game-timer
        clearInterval(gameTimer);
        // In case the learn word sequence is running when the player leaves the game, the timers which are involved in this sequence are all turned off
        mainController.disableLearnWordTimers();
        console.log("mainController: leaveCurrentGame() current word: " + rocketReadingModel.getCurrentGameData().getCurrentWord());
        if (rocketReadingModel.getCurrentGameData().getCurrentWord() !== null) {
            //If the user has not finished the current game then the system needs to save the current game timer to the current game state object
            console.log("mainController: pauseCurrentGame(): saveGameTime!");
            rocketReadingModel.getCurrentGameData().saveGameTime();
            // The timer for the game's last test needs to be cleared, and the currentGameData's timer needs to be cleared
            clearInterval(aTimer);
            rocketReadingModel.getCurrentGameData().clearMyTimer();
            // The timers for the bar timer are hidden and cleared 
            myViewModelRR.hideBarTimer();
            clearTimeout(silverBar);
            clearTimeout(bronzeBar);
            // The current game data is recorded as having a saved game
            rocketReadingModel.getCurrentGameData().setSavedLevelGame(levelGame);
        } else if (rocketReadingModel.getCurrentGameData().getCurrentWord() === null) {
            // If the user has completed the current game then the game screen's properties will be cleared and reset, eg the total game time will be reset to 0.
            mainController.resetGameTimers();
        }
    },
    
    randomiseArray: function (inputArray) {
        "use strict";
        var wordIndex,
            count,
            wordlist = [],
            arrayLength = inputArray.length;        
        for (count = 0; count < arrayLength; count += 1) {
            wordIndex = Math.floor(Math.random() * inputArray.length);
            wordlist.push(inputArray[wordIndex]);
            inputArray.splice(wordIndex, 1); 
        }
        return wordlist;
    },
    
    createTable : function () {
        "use strict";
        // Use the complete word list array to build the table (in case the player is returning to the game)
		/*var completeWordList = rocketReadingModel.getCurrentGameData().getCompleteWordList();
        // The complete word list needs to be arranged in a random order 
        completeWordList = this.randomiseArray(completeWordList); // The words in lists no longer need to be randomly arranged before being displayed on the game screen table
        // After the wordlist has been randomised, the complete word list needs to be repopulated. This is necessary because the complete word list may need to be used in validateWords()
        mainController.resetCompleteWordList(); // Because randomiseArray() is no longer run, the complete word list no longer needs to be reset.*/
        // Display the table with the (un-)randomised complete wordlist
		myViewModelRR.displayTable(rocketReadingModel.getCurrentGameData().getCompleteWordList());
        // Set the cells of the table to have a uniform width - the function to do this is called by the above method
        // myViewModelRR.setStandardCellSize("gameWordCell");
	},
	
	displayMedalCounts : function () {
		var medals = rocketReadingModel.getCurrentGameData().getMedalCounts();
		console.log("getMedalCounts:" + medals)
		myViewModelRR.displayMedalCounts(medals);
	},
	
	displayScore : function() {
        "use strict";
		var score = rocketReadingModel.getCurrentGameData().getScore();
		myViewModelRR.displayScore(score);
	},
	
	displayWordsCompletedData : function () {
        "use strict";
		var progressData = [];
        progressData.push(rocketReadingModel.getCurrentGameData().getWordsCompleted());
        // progressData.push(rocketReadingModel.getCurrentGameData().getWordListCount());
        progressData.push(rocketReadingModel.getCurrentGameData().getCompleteWordList().length);
        // Or: progressData.push(rocketReadingModel.getCurrentGameData().getCurrentGame().getWordList().length);
		myViewModelRR.displayWordsCompleted(progressData);
	},
    
    displayCurrentLevelGame: function () {
        "use strict";
        var levelGame = [];
        // levelGame.push( rocketReadingModel.getCurrentGameData().getCurrentLevel().getLevelNumber() );
        levelGame.push( rocketReadingModel.getCurrentGameData().getCurrentLevelGame()[0] );
        levelGame.push( rocketReadingModel.getCurrentGameData().getCurrentGame().getNumber() );
        // Or could just access the currentLevelGame property of currentGameData (if this property is set every time a level or game is set)
        myViewModelRR.displayLevelGameNumber(levelGame);
    },
	
    // Is this function used?
	getLevelNumber : function () {
        "use strict";
		var levelNumber = rocketReadingModel.getCurrentGameData().getCurrentLevel().getLevelNumber();
		myViewModelRR.displayLevelNumber(levelNumber);
	},
	
	getGameNumber : function () {
        "use strict";
		var gameNumber = rocketReadingModel.getCurrentGameData().getCurrentGame().getNumber();
		myViewModelRR.displayGameNumber(gameNumber);
	},
	
	displayAvatar : function () {
        "use strict";
		// var avatar = rocketReadingModel.getCurrentGameData().getCurrentLevel().getAvatar();
        var avatar = rocketReadingModel.findLevelByNumber(rocketReadingModel.getCurrentGameData().getCurrentLevelGame()[0]).getAvatar();
		myViewModelRR.displayAvatar(avatar);
	},
	
	getWordListCount : function () {
        "use strict";
		var wordListCount = rocketReadingModel.getCurrentGameData().getWordListCount();
		myViewModelRR.displayWordListCount(wordListCount);
	},
    
    /* setTimerGameScreenIntro: function () {
        // This function could use a timer to make the modal screen which appears at the beginning of the game screen open slightly after the game screen is unhidden
        "use strict";
        timerModal = setTimeout();
    },*/
    
    nextWord: function() {
        "use strict";
        var listArray = rocketReadingModel.getCurrentGameData().getWordList(),
			currentWordIndex = Math.floor(Math.random() * listArray.length),
            currentWord = listArray[currentWordIndex];
        // The system checks to see whether the user has a current word - if not the system select a current word and uses this for the first test of the user's new game. To make this work, the current word will need to be cleared at the end of each test & once the user has successfully identified the word.
        if (rocketReadingModel.getCurrentGameData().getCurrentWord() === null) {
            rocketReadingModel.getCurrentGameData().setCurrentWord(currentWord);
            learnWordCount = 0;
            myViewModelRR.updateCurrentWord(currentWord, 'normalWord', null);
        } else if (rocketReadingModel.getCurrentGameData().getCurrentWord() !== null) {
            //  The system checks to see whether the user has an incorrect word. 
            if (rocketReadingModel.getCurrentGameData().getIncorrectWord() === null) {
            learnWordCount = 0;
            myViewModelRR.updateCurrentWord(rocketReadingModel.getCurrentGameData().getCurrentWord(), 'normalWord', null);
            // If the user has an incorrect word, the user will have to learn this word when he or she returns to their game.
            } else if (rocketReadingModel.getCurrentGameData().getIncorrectWord() !== null) {
                // If the currentGameData has an incorrect word (ie the user got a word wrong just before the user left the game and this word was recorded as being the incorrect word in the saved game's data) then the learn word word will be enabled and the user will have to click this to proceed. 
                mainController.enableLearnWord();
                // The cells of the table will be disabled - no this is not necessary
                // Any text in the space for displaying the word to be learned will be cleared
                myViewModelRR.clearLearnWord();
            }
        }
    },
   
	spliceWord : function (currentWordIndex) {
        "use strict";
		var listArray = rocketReadingModel.getCurrentGameData().getWordList();
		listArray.splice(currentWordIndex, 1);
		rocketReadingModel.getCurrentGameData().passList(listArray);
	},
    
    requestBarTimer: function () {
        "use strict"; 
        myViewModelRR.startBarTimer();
    },
    
	createWordTimer : function () {
        "use strict";
		var milliseconds;
		aTimer = setInterval(function () {
			milliseconds = 100;
			mainController.returnMilliseconds(milliseconds);
		}, 100)
	},
	
	returnMilliseconds : function (milliseconds) {
        "use strict";
		rocketReadingModel.getCurrentGameData().incrementTimer(milliseconds);
		if (rocketReadingModel.getCurrentGameData().getTimer() >= 8000) {
			mainController.validateWords();
		}
		/*console.log("returnMilliseconds:" + rocketReadingModel.getCurrentGameData().getTimer())*/
	},
	
    startGameTimer: function () {
        "use strict";
        gameTimer = setInterval("myViewModelRR.displayGameTimer()", 1000);
    },
    
    startGame: function () {
        "use strict";
        var game = rocketReadingModel.getCurrentGameData().getCurrentGame(),
            // level = rocketReadingModel.getCurrentGameData().getCurrentLevel(),
            level = rocketReadingModel.findLevelByNumber(rocketReadingModel.getCurrentGameData().getCurrentLevelGame()[0]),
            wordList = rocketReadingModel.getCurrentGameData().getWordList(),
            levelGame = rocketReadingModel.getCurrentGameData().getCurrentLevelGame();
            
        // The data for the previous game in the current object needs to be cleared and data for the new game set. Not all properties will be clobbered by the resetCurrentGameData() function - all the properties of currentGameData should really be set-able by addCurrentGameData()
        rocketReadingModel.clearCurrentGameData();
        // Create a new current data object, setting it the appropriate values for the currentLevelGame, myGame, myLevel and wordList properties, and then assign it as a property of the Rocket-Reading object. 
        mainController.resetCurrentGameData(level, game, wordList, levelGame);
        
        // Start the game timer
        mainController.startGameTimer();
        // Determine which word the user will be tested on
        mainController.nextWord();
        // The event listener which led to this function being called will be removed
        // An event listener is added to the start game button to do this
        // myViewModelRR.removeEventListGameStart(); 
    },
    
    startGameContinue: function () {
        "use strict";
        // Start the game timer
        mainController.startGameTimer();
        // Determine which word the user will be tested on
        mainController.nextWord();
		myViewModelRR.learnWordIsFinished();
    },
    
    enableLearnWord: function () {
        "use strict";
        // The event listener for learning a word is added
        myViewModelRR.addEventLearnWord();
        // The learn word heading is highlighted
        myViewModelRR.setLearnWordOn();
    },
    
    disableLearnWord: function () {
        "use strict";
        // The event listener for learning a word is removed
        myViewModelRR.removeLearnWord();
        // The learn word heading is un-highlighted
        //myViewModelRR.setLearnWordNormal();
    },
    
    replayGame: function () {
        "use strict";
        var game = rocketReadingModel.getCurrentGameData().getCurrentGame(),
            // level = rocketReadingModel.getCurrentGameData().getCurrentLevel(),
            level = rocketReadingModel.findLevelByNumber(rocketReadingModel.getCurrentGameData().getCurrentLevelGame()[0]),
            wordList = rocketReadingModel.getCurrentGameData().getCurrentGame().getWordList().slice(0),
            levelGame = rocketReadingModel.getCurrentGameData().getCurrentLevelGame();
        // In case the learn word sequence is running when the player leaves the game, the timers which are involved in this sequence are all turned off
        mainController.disableLearnWordTimers();
        // Also, any text in the space for displaying the word to be learned will be cleared
        myViewModelRR.clearLearnWord();
        // The system checks to see if the user has data in the currentGameData object
        if (rocketReadingModel.getCurrentGameData().getCurrentWord() !== null) {
            // If so, then the system will wipe this data
            rocketReadingModel.clearCurrentGameData();
            // Clear the timer for the last word test
            myViewModelRR.clearTimer();
            // Stop the total game timer
            clearInterval(gameTimer);
            // The bar timer needs to be disabled and cleared
            mainController.disableBarTimer();
            // In case the game is in learn word mode when the user clicks the replay button, the system will disable this mode
            mainController.disableLearnWord();
            // The incorrect property of currentGameData is set to null in case it has a value
            // rocketReadingModel.getCurrentGameData().setIncorrectWord(null); // This should not be necessary
        }
        // Create a new currentGameData object, setting the values for the currentLevelGame, myGame, myLevel and wordList properties which match the particular level-game the user will be replaying.
        mainController.resetCurrentGameData(level, game, wordList, levelGame);
        // The system clears the timer vars and timer display
        mainController.resetGameTimers();
        // The system starts a new game and initialises the game screen - really, the completeWordList could be set by resetCurrentGameData() - a bit of refactoring to achieve this
        mainController.gameInitialise();
        // mainController.startGame(); // If the 'gameIntroModal' modal window opens then the game will start when the player clicks the start link.
        
        // Start the game timer
        mainController.startGameTimer();
        // Determine which word the user will be tested on
        mainController.nextWord();
        // The event listener which led to this function being called will be removed
        myViewModelRR.removeEventListGameStart(); 
    },

    resetGameTimers: function () {
        "use strict";
        gameTimerSecs = 0;
        gameTimerMins = 0;
        myViewModelRR.resetGameTimer();
    },
    
    gameInitialise: function () {
        "use strict";
        var wordList = rocketReadingModel.getCurrentGameData().getWordList(),
            completeWordList = rocketReadingModel.getCurrentGameData().getCurrentGame().getWordList().slice(0),
            // levelNumber = rocketReadingModel.getCurrentGameData().getCurrentLevel().getLevelNumber(),
            levelNumber = rocketReadingModel.getCurrentGameData().getCurrentLevelGame()[0],
            gameNumber = rocketReadingModel.getCurrentGameData().getCurrentGame().getNumber(),
            levelGame = [levelNumber, gameNumber];
        // Set the currentLevelGame property of currentGameData
        rocketReadingModel.getCurrentGameData().setCurrentLevelGame(levelGame);
        // Set the complete word list as a copy of currentGameData.myGame.myWordList
        rocketReadingModel.getCurrentGameData().setCompleteWordList(completeWordList);
        
        // The game screen is setup
        mainController.createTable();
        mainController.displayMedalCounts();
        mainController.displayScore();
        mainController.displayWordsCompletedData();
        mainController.displayCurrentLevelGame();
        mainController.displayAvatar();
        //mainController.loadGameScreenIntro();
    },
    
    newGameInitialise: function () {
        "use strict";
        var wordList = rocketReadingModel.getCurrentGameData().getWordList(),
            completeWordList = rocketReadingModel.getCurrentGameData().getCurrentGame().getWordList().slice(0),
            // levelNumber = rocketReadingModel.getCurrentGameData().getCurrentLevel().getLevelNumber(),
            levelNumber = rocketReadingModel.getCurrentGameData().getCurrentLevelGame()[0],
            gameNumber = rocketReadingModel.getCurrentGameData().getCurrentGame().getNumber(),
            levelGame = [levelNumber, gameNumber];
        // Set the currentLevelGame property of currentGameData
        rocketReadingModel.getCurrentGameData().setCurrentLevelGame(levelGame);
        // Set the complete word list as a copy of currentGameData.myGame.myWordList
        rocketReadingModel.getCurrentGameData().setCompleteWordList(completeWordList);
        
        // A game screen will be displayed containing default values for a new game
        mainController.createTable();
        myViewModelRR.displayMedalCounts([0,0,0]);
		myViewModelRR.displayScore(0);
        myViewModelRR.displayWordsCompleted(0, rocketReadingModel.getCurrentGameData().getCompleteWordList().length);
        // These two will be tricky to get round
        mainController.displayCurrentLevelGame(); 
        mainController.displayAvatar();
        //mainController.loadGameScreenIntro();
        // The event listener which led to this function being called will be removed
        // myViewModelRR.removeEventListGameStart();
    },
    
 	validateWords : function (word) {
        "use strict";
		var incorrectWordListArray = [],
            randomWordIndex,
            count = 0,
            currentWord = rocketReadingModel.getCurrentGameData().getCurrentWord(),
            myTimer = rocketReadingModel.getCurrentGameData().getTimer(),
            wordIndex = rocketReadingModel.getCurrentGameData().getIndexOfWord(word),
			incorrectWord = rocketReadingModel.getCurrentGameData().getIncorrectWord();

		/*console.log("validateWords:" + myTimer);*/
        // This is the happy day scenario
        if (incorrectWord === null) {
            myViewModelRR.clearTimer();
            // The timers for the bar timer are hidden and cleared 
            myViewModelRR.hideBarTimer();
            clearTimeout(silverBar);
            clearTimeout(bronzeBar);
            // If the user has run out of time to answer a test this function will be called with a null argument
            if (word !== null) {
                if (word === currentWord) {
                    mainController.spliceWord(wordIndex);
                    rocketReadingModel.getCurrentGameData().addToWordSoundsCorrect(word);
                        if (myTimer <= 2000) {
                            //do things here
                            rocketReadingModel.getCurrentGameData().setMedal('gold');
                            rocketReadingModel.getCurrentGameData().setScore(5);
                        } else if ( 2000 < myTimer && myTimer <= 4000 ) {
                            //do things here
                            rocketReadingModel.getCurrentGameData().setMedal('silver');
                            rocketReadingModel.getCurrentGameData().setScore(3);
                        } else if ( 4000 < myTimer && myTimer < 8000 ) {
                            //do things here
                            rocketReadingModel.getCurrentGameData().setMedal('bronze');
                            rocketReadingModel.getCurrentGameData().setScore(1);
                        }
                    //alert ("Correct Word! You selected " + word);
                    // Display the correct guess feedback modal 
					myViewModelRR.correctGuess();
                    mainController.initialiseNextWord();
                } else {
                    // this is the incorrect word selection
                    rocketReadingModel.getCurrentGameData().setIncorrectWord(currentWord);
                    // Add the current word to the incorrect words / sounds property of the currentGameData
                    rocketReadingModel.getCurrentGameData().addWordsSoundsIncorrect(currentWord);
                    // All of the event listeners for the cells of the table should be removed - so that the user has to click the learn word button to proceed
                    myViewModelRR.removeEventClick();
                    //myViewModelRR.toggleLearnWord();
					myViewModelRR.learnWordIsActive();
                    myViewModelRR.addEventLearnWord();
                }
            } else {
                // this is the too long selection
                rocketReadingModel.getCurrentGameData().setIncorrectWord(currentWord);
                // All of the event listeners for the cells of the table should be removed - so that the user has to click the learn word button to proceed
                myViewModelRR.removeEventClick();
                myViewModelRR.toggleLearnWord();
                myViewModelRR.addEventLearnWord();
            }
        // This is the rules for the Learn Word function: if the user has previously chosen the wrong word when trying to identify the current word
        } else {
            // The event listener for the button to learn a word is removed, in case the user did not click the learn word button previously - although if the player chooses the wrong word then they really should click the learn word button
            // myViewModelRR.removeLearnWord();
            if (word === currentWord) {
                // What happens when you select the right word after you have previously got it incorrect
				mainController.spliceWord(wordIndex);
				rocketReadingModel.getCurrentGameData().addToWordSoundsCorrect(word);
                mainController.initialiseNextWord();
                // The completeWordList property of currentGameData needs to be repopulated 
                    // mainController.resetCompleteWordList(); // - actually this does not need to be done at this point. It only needs to be done in the createTable() function after the array has been randomised
                // The incorrect property of currentGameData can be set to null
                rocketReadingModel.getCurrentGameData().setIncorrectWord(null);
                // Display the correct guess feedback modal 
				myViewModelRR.correctGuess();
                //alert ("Correct Word! You selected " + word);
                mainController.exitingLearnWord();
            } else {
                // This is reducing the table contents if the word selected is wrong. 
                incorrectWordListArray = rocketReadingModel.getCurrentGameData().getCompleteWordList();
                // The current word will be removed from the list
                incorrectWordListArray.splice(incorrectWordListArray.indexOf(currentWord), 1);
                // Use the full word-list array to get the value of the length of the array
                for (count = 0; count < (rocketReadingModel.getCurrentGameData().getWordListCount() / 3); count += 1) {
                    randomWordIndex = Math.floor(Math.random() * incorrectWordListArray.length);
                    incorrectWordListArray.splice(randomWordIndex, 1);
                }
                // A random position needs to be found to put the currentWord back into the list
                randomWordIndex = Math.floor(Math.random() * (incorrectWordListArray.length + 1));
                // This works even if the index of the array in which the data is going to be placed is one more than its current size
                incorrectWordListArray[randomWordIndex] = currentWord;
                console.log("validateWords(): incorrectWordListArray after getting choice incorrect again - " + incorrectWordListArray);
                myViewModelRR.displayTable(incorrectWordListArray);
                
                // All of the event listeners for the cells of the table should be removed - so that the user has to click the learn word button to proceed
                // myViewModelRR.removeEventClick(); // This is not needed if the eventClickAdd() is not added in exitingLearnWord()
                myViewModelRR.eventClickAdd();
            };
		};

	},
    
    resetCompleteWordList: function () {
    // This function will repopulate the contents of the completeWordList property of the currentGameData object
        "use strict";
        rocketReadingModel.getCurrentGameData().setCompleteWordList(rocketReadingModel.getCurrentGameData().getCurrentGame().getWordList().slice(0));
    },
	
	learnWord : function () {
        "use strict";
        var currentWord = rocketReadingModel.getCurrentGameData().getCurrentWord(),
            characterArray = currentWord.split('');
		myViewModelRR.learnWordIsActive();
        myViewModelRR.displayWord(characterArray, "Comic Sans MS");
        learnWordCount = 4;
        myViewModelRR.updateCurrentWord(currentWord, 'learnWord', characterArray);
	},
	
	exitingLearnWord : function () {
        "use strict";
		rocketReadingModel.getCurrentGameData().setIncorrectWord(null);
		myViewModelRR.toggleLearnWord();
        myViewModelRR.clearLearnWord();
	},
    
	initialiseNextWord : function () {
        "use strict";
        var listArrayCount = rocketReadingModel.getCurrentGameData().getWordListLength();
		myViewModelRR.removeEventClick();
		rocketReadingModel.getCurrentGameData().clearMyTimer();
		mainController.displayMedalCounts();
		mainController.displayWordsCompletedData();
		mainController.displayScore();

		if (listArrayCount > 0) {
            mainController.gameInitialise();
             // The current word property is cleared or set to null - to enable the nextWord() to select a new currentWord for the next test in the game
            rocketReadingModel.getCurrentGameData().setCurrentWord(null);
            // Putting in a short gap between the end of a test and the next word-test
            window.setTimeout(function () {
                mainController.nextWord();
            }
            , 650); 
			// mainController.nextWord();
		} else if (listArrayCount === 0) {
            // The game results modal is displayed and the system determines whether the user has unlocked a new game or level
            // mainController.finishGameScreen(); // The function which displays the finish-game modal can be called from finishGame()
            mainController.finishGame();
		}
	},
    
    updateLevelGameReached: function () {
        "use strict";
        if (rocketReadingModel.getMyPlayer().getLevelGameReached()) {
            // If the player has not reached the top levelgame or bonus game then the levelGameReached or bonusGameReached property will be incremented by 1
            rocketReadingModel.getMyPlayer().setLevelGameReached();
        }
    },

    
    resetCurrentGameData: function (newLevel, newGame, newWordList, newCurrentLevelGame) {
        "use strict";
        rocketReadingModel.addCurrentGameData(newLevel, newGame, newWordList, null, newCurrentLevelGame, null, 0, [0,0,0], 0, 0, [], []);
    },
    
    // **********************************************
	// ************ High Scores Section *************
	// **********************************************
    
	getHighScoresForLevel : function(levelNumber) {
		"use strict";
		var outputArrayLength,
            outputArray = [],
            index = 1,
            totalLevelHS = 0;
		console.group("Maincontroller : getAllHighScores()");
		outputArray = rocketReadingModel.getMyPlayer().getHighScores().getHighScoresForLevel(levelNumber);
        
        outputArrayLength = outputArray.length;
        // Start the index at 1 because the first item in the array is the level number
        for (index = 1; index < outputArrayLength; index += 1) {
            totalLevelHS += outputArray[index];
        }
        // The total of the high scores for that level is added to the end of the output array
        outputArray.push(totalLevelHS);
		console.log("High Scores :");
		console.log(outputArray);
		console.groupEnd();
		return outputArray;
	}
	
	
    // **********************************************
	// ********** End High Scores Section ***********
	// **********************************************
    //Instructions Screen

    

    

	 
};