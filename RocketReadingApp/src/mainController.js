// The system creates a mainController object which aims to resolve requests that involve data analysis

var mainController = {
    
    //Register Screen
    registerPlayer : function () {
        "use strict";
        var userName = document.getElementById('registerUserName').value,
            firstName = document.getElementById('registerFirstName').value,
            lastName = document.getElementById('registerLastName').value,
            school = document.getElementById('registerSchool').value,
            classroom = document.getElementById('registerClass').value;
        rocketReadingModel.registerPlayer(userName, firstName, lastName, school, classroom, 0, [1,1], 1, 450);
    },    
    
    //Login Screen
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
        /* This function receives three inputs;
        levelGameReached
        pointsToPassLevel
        checkForBonusGameCompletion */
        var aGame,
        aLevel, 
        levelGameReached = rocketReadingModel.getMyPlayer().getLevelGameReached(),
        level = rocketReadingModel.getCurrentGameData().getCurrentLevel(),
        game = rocketReadingModel.getCurrentGameData().getCurrentGame(),
        pointsToPassLevel = rocketReadingModel.getMyPlayer().getPointsToPassLevel();
        /*bonusGame = mainController.checkForBonusGameCompletion(level, game);*/
        /*We need to account for these eventualities:
        when a player access his login, the script will enable access to the games that they have available. This will be setting access to all games and levels. */
        for (aLevel of rocketReadingModel.getAllLevels()) {
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
                    };
                };
            };
        };
        /*
        When a player finishes a game, the script will enable access to the next game and the next level (if bonusgame has been reached)
        */
        /*then the mainpart of the function is going into all the games
        and setting access to.
        setAccessTo (in game and level objects)
        it outputs to display the locked or unlocked pictures of levels and games. and adds or removes event Listeners for those buttons.
        Finally, it outputs with updating the LevelGameReached.(if the user has achieved the right results. )
        */
    },
    
    
	    
    
    //Home Screen
    
        checkAdvanceNextGame: function () {
    // This function checks whether the player needs to complete a bonus game before advancing to the next level
        "use strict";
        
    },
    
    setNextWord: function() {
        "use strict";
        if (rocketReadingModel.getCurrentGameData().getIncorrectWord() === null) {
            learnWordCount = 0;
            myViewModelRR.updateCurrentWord(rocketReadingModel.getCurrentGameData().getCurrentWord(), 'normalWord', null);
        } else if (rocketReadingModel.getCurrentGameData().getIncorrectWord() !== null) {
            // If the currentGameData has an incorrect word (ie the user got a word wrong just before the user left the game and this word was recorded as being the incorrect word in the saved game's data) then the learn word word will be enabled and the user will have to click this to proceed. 
            mainController.enableLearnWord();
            // The cells of the table will be disabled - no this is not necessary
            // Any text in the space for displaying the word to be learned will be cleared
            myViewModelRR.clearLearnWord();
        }
    },
   
    loadPreviousGame: function () {
        "use strict";
        // The system clears the current data's saved game data
        rocketReadingModel.getCurrentGameData().setSavedLevelGame(null);
        // The system get the user's current game details and opens the particular screen
        mainController.gameInitialise();
        myViewModelRR.showGameScreen();
        // Ideally, when the user clicks the Continue button and returns to the saved game the modal screen should be displayed. And so, when the user clicks the Start link on the modal page the game timer should then start
        // The game timer is started again
        mainController.startGameTimer();
        // The current word from the saved game is set as the current word for the first test which the user will have to do when they return to playing their saved game
        mainController.setNextWord();
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
    
    
    //Level Select Screen
    
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
		
		myViewModelRR.displayLevelList(outputArray);
		
        //myViewModelRR.displayLevelList(allLevels);
    },   
    
    //Game Select Screen
    
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
    
    
    //Game Screen
    
    
    finishGame: function () {
        "use strict";
        var game = rocketReadingModel.getCurrentGameData().getCurrentGame(),
            gameNumber = game.getNumber(),
            level = rocketReadingModel.getCurrentGameData().getCurrentLevel(),
            levelNumber = level.getLevelNumber(),
            wordList = game.getWordList().slice(0),
            levelGame = rocketReadingModel.getCurrentGameData().getCurrentLevelGame(),
            playerName = rocketReadingModel.getMyPlayer().getUserName();
        alert ("Game Finished! You completed Level "+ levelNumber + "Game " + gameNumber);
        // Stop the total game timer
        clearInterval(gameTimer);
        // Save the gameTimer to the currentGameData object
        rocketReadingModel.getCurrentGameData().saveGameTime();
        // Save the current game data to rocketReadingModel.myAllGamesData
        rocketReadingModel.getAllGamesData().saveGameData(levelNumber, gameNumber, rocketReadingModel.getCurrentGameData());
        storageController.saveAllGamesData();
        // The player's levelGameReached or bonusGameReached property should be updated (if applicable)
        
        // If the player has unlocked a new level-game then the system will have to make this level-game accessible to the player 
        /*if (rocketReadingModel.getCurrentGameData().getLevelGameReached()[0] !== 0) {*/
        mainController.updateLevelGameReached();
        /*} else {
            
        }*/
        // Clear the current data object
        rocketReadingModel.clearCurrentGameData();
        // Create a bare current data object and assign it as a property of the Rocket-Reading object
        // mainController.resetCurrentGameData(null, null, null, null); // No, see the following:
        // Create a new currentGameData object, setting the values for the currentLevelGame, myGame, myLevel and wordList properties which match the level-game which the user has just played - in case the player would like to replay this.
        mainController.resetCurrentGameData(level, game, wordList, levelGame);
    },
    
    
    checkGameResumption: function () {
    // This function will check whether the user has a current saved game for the game which the user is currently choosing to play
        "use strict";
        var game = rocketReadingModel.getCurrentGameData().getCurrentGame(),
            level = rocketReadingModel.getCurrentGameData().getCurrentLevel(),
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
        // Set the cells of the table to have a uniform width
        myViewModelRR.setUniformCellWidth();
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
        progressData.push(rocketReadingModel.getCurrentGameData().getWordListCount());
        // Or: progressData.push(rocketReadingModel.getCurrentGameData().getCurrentGame().getWordList().length);
		myViewModelRR.displayWordsCompleted(progressData);
	},
    
    displayCurrentLevelGame: function () {
        "use strict";
        var levelGame = [];
        levelGame.push( rocketReadingModel.getCurrentGameData().getCurrentLevel().getLevelNumber() );
        levelGame.push( rocketReadingModel.getCurrentGameData().getCurrentGame().getNumber() );
        // Or could just access the currentLevelGame property of currentGameData (if this property is set every time a level or game is set)
        myViewModelRR.displayLevelGameNumber(levelGame);
    },
	
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
		var avatar = rocketReadingModel.getCurrentGameData().getCurrentLevel().getAvatar();
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
        rocketReadingModel.getCurrentGameData().setCurrentWord(currentWord);
        learnWordCount = 0;
        myViewModelRR.updateCurrentWord(currentWord, 'normalWord', null);
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
        // Start the game timer
        mainController.startGameTimer();
        // Determine which word the user will be tested on
        mainController.nextWord();
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
        myViewModelRR.setLearnWordNormal();
    },
    
    replayGame: function () {
        "use strict";
        var game = rocketReadingModel.getCurrentGameData().getCurrentGame(),
            level = rocketReadingModel.getCurrentGameData().getCurrentLevel(),
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
        // The system clears the timers vars and timer display
        mainController.resetGameTimers();
        // The system starts a new game and initialises the game screen - really, the completeWordList could be set by resetCurrentGameData() - a bit of refactoring to achieve this
        mainController.gameInitialise();
        // mainController.startGame(); // If the 'gameIntroModal' modal window opens then the game will start when the player clicks the start link.
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
            levelNumber = rocketReadingModel.getCurrentGameData().getCurrentLevel().getLevelNumber(),
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
                    alert ("Correct Word! You selected " + word);
                    mainController.initialiseNextWord();
                } else {
                    // this is the incorrect word selection
                    rocketReadingModel.getCurrentGameData().setIncorrectWord(currentWord);
                    // Add the current word to the incorrect words / sounds property of the currentGameData
                    rocketReadingModel.getCurrentGameData().addWordsSoundsIncorrect(currentWord);
                    // All of the event listeners for the cells of the table should be removed - so that the user has to click the learn word button to proceed
                    myViewModelRR.removeEventClick();
                    myViewModelRR.toggleLearnWord();
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
                alert ("Correct Word! You selected " + word);
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
        myViewModelRR.displayWord(characterArray, "Comic Sans MS");
        learnWordCount = 4;
        myViewModelRR.updateCurrentWord(currentWord, 'learnWord', characterArray);
	},
	
	exitingLearnWord : function () {
        "use strict";
		rocketReadingModel.getCurrentGameData().setIncorrectWord(null);
		myViewModelRR.toggleLearnWord();
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
			mainController.nextWord();
		} else if (listArrayCount === 0) {
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
    }
    
    //High Scores Screen
    
    
    
    //Instructions Screen

    

    

	 
};