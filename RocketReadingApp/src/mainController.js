// The system creates a mainController object which aims to resolve requests that involve data analysis

var mainController = {

	validateWords : function (word) {
        "use strict";
		var myTimer = rocketReadingModel.getCurrentGameData().getTimer(),
            wordIndex = rocketReadingModel.getCurrentGameData().getIndexOfWord(word);
		myViewModelRR.clearTimer();
		myViewModelRR.removeEventClick();
		/*console.log("validateWords:" + myTimer);*/
		if (word !== null) {
			if (word === rocketReadingModel.getCurrentGameData().getCurrentWord()) {
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
					};
				alert ("Correct Word! You selected " + word);
				mainController.initialiseNextWord();
			} else {
				// this is the incorrect word selection
				myViewModelRR.displayLearnWord();
				myViewModelRR.eventLearnWord();
			}
		} else {
			// this is the too long selection
			myViewModelRR.displayLearnWord();
			myViewModelRR.eventLearnWord();
		}
	},
	
	learnWord : function () {
		mainController.exitingLearnWord();
	},
	
	exitingLearnWord : function () {
		myViewModelRR.displayLearnWord();
		mainController.initialiseNextWord();
	},
    
	initialiseNextWord : function () {
        var listArrayCount = rocketReadingModel.getCurrentGameData().getWordListLength();
		rocketReadingModel.getCurrentGameData().clearMyTimer();
		mainController.displayMedalCounts();
		mainController.displayWordsCompletedData();
		mainController.displayScore();

		if (listArrayCount > 0) {
			mainController.nextWord();
		} else if (listArrayCount === 0) {
            mainController.finishGame();
		}
	},
	
    finishGame: function () {
        "use strict";
        var levelNumber = rocketReadingModel.getCurrentGameData().getCurrentLevel().getLevelNumber(),
            gameNumber = rocketReadingModel.getCurrentGameData().getCurrentGame().getNumber();
        alert ("Game Finished! You completed Level "+ levelNumber + "Game " + gameNumber);
        // Stop the total game timer
        clearInterval(gameTimer);
        // Save the gameTimer to the currentGameData object
        rocketReadingModel.getCurrentGameData().saveGameTime();
        // Save the current game data to rocketReadingModel.myAllGamesData
        rocketReadingModel.getAllGamesData().saveGameData(levelNumber, gameNumber, rocketReadingModel.getCurrentGameData());
        // Clear the current data object
        rocketReadingModel.clearCurrentGameData();
        // Create a bare current data object and assign it as a property of the Rocket-Reading object
        mainController.resetCurrentGameData();
    },
    
    resetCurrentGameData: function () {
        "use strict";
        rocketReadingModel.addCurrentGameData(null, null, null, null, null, 0, [0,0,0], 0, 0, [], []);
    },
	
	passWord: function (word) {
		rocketReadingModel.passWord(word);
	},

    requestAllLevels: function () {
        "use strict";
        // This function gets data from the model data
        var allLevels = rocketReadingModel.getAllLevels();
        // Calls a function in the view controller
        myViewModelRR.displayLevelList(allLevels);
    },
    
    getStringNumber: function (inputId) {
        "use string";
        return Number(inputId.slice(inputId.search(/[1-9]/), inputId.length));
    },
	
	setCurrentGame : function () {
		"use strict";
		var gameNumber = mainController.getStringNumber(this.id);
		console.log("setCurrentGame() - gameNumber (regex):" + gameNumber);
		// Loading selected Game into currentGame in currentGameData
		rocketReadingModel.getCurrentGameData().setCurrentGame(rocketReadingModel.findGameByNumber(gameNumber));
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
        // The input array should be the untouched wordlist for this game. If the current game's word list is used instead, the result would be that when the user leaves a current game and comes back to that game later only the words the user has not been tested on yet will be shown in the table.
		var inputArray = rocketReadingModel.getCurrentGameData().getWholeWordList();
        // The wordlist needs to be arranged in a random order
        inputArray = this.randomiseArray(inputArray);
        // Set the randomised array as the word list for the current game
        rocketReadingModel.getCurrentGameData().passList(inputArray);
        // Display the table with the randomised wordlist
		myViewModelRR.displayTable(inputArray);
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
	
	getAvatar : function () {
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
        var levelNumber = rocketReadingModel.getCurrentGameData().getCurrentLevel().getLevelNumber(),
            gameNumber = rocketReadingModel.getCurrentGameData().getCurrentGame().getNumber(),
            listArray = rocketReadingModel.getCurrentGameData().getWordList(),
			currentWordIndex = Math.floor(Math.random() * listArray.length),
            currentWord = listArray[currentWordIndex];
        rocketReadingModel.getCurrentGameData().setCurrentWord(currentWord);
        myViewModelRR.updateCurrentWord(currentWord);
    },
	
	spliceWord : function (currentWordIndex) {
		var listArray = rocketReadingModel.getCurrentGameData().getWordList();
		listArray.splice(currentWordIndex, 1);
		rocketReadingModel.getCurrentGameData().passList(listArray);
	},
    
	createWordTimer : function () {
		var milliseconds;
		aTimer = setInterval(function () {
			milliseconds = 100;
			mainController.returnMilliseconds(milliseconds);
		}, 100)
	},
	
	returnMilliseconds : function (milliseconds) {
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

    resetGameTimers: function () {
        "use strict";
        gameTimerSecs = 0;
        gameTimerMins = 0;
        myViewModelRR.resetGameTimer();
    },
    
    resolveContinueBtn: function () {
        "use strict";
        var levelGame;
        if (rocketReadingModel.getCurrentGameData().getSavedLevelGame() === null) {
            // If the user has completed a previous game then the timers and game time display will be reset
            mainController.resetGameTimers()
            // The system will open the highest level game screen which the user has reached 
            levelGame = rocketReadingModel.getMyPlayer().getLevelGameReached();
            rocketReadingModel.getCurrentGameData().setCurrentLevel(levelGame[0]);
            rocketReadingModel.getCurrentGameData().setCurrentLevel(levelGame[1]);
            mainController.gameInitialise();
        } else if ((rocketReadingModel.getCurrentGameData().getSavedLevelGame() !== null)) {
            // If the user has a saved game then the screen for that level-game will be displayed
            mainController.loadPreviousGame();
        }
    },
    
    checkGameResumption: function () {
    // This function will check whether the user has a current saved game for the game which the user is currently choosing to play
        "use strict";
        var levelNumber = rocketReadingModel.getCurrentGameData().getCurrentLevel().getLevelNumber(),
            gameNumber = rocketReadingModel.getCurrentGameData().getCurrentGame().getNumber(),
            levelGame = [levelNumber, gameNumber];
        if (rocketReadingModel.getCurrentGameData().getSavedLevelGame() === levelGame) {
            // Check with the user whether they wish to resume the old game or start a new game
        } else {
            mainController.resetGameTimers();
            mainController.gameInitialise();
        }
    },
    
    leaveCurrentGame: function () {
        "use strict";
        var levelNumber,
            gameNumber,
            levelGame;
        // The system needs to stop the game-timer
        clearInterval(gameTimer);
        console.log("mainController: leaveCurrentGame() current word: " + rocketReadingModel.getCurrentGameData().getCurrentWord());
        if (rocketReadingModel.getCurrentGameData().getCurrentWord() !== null) {
            //If the user has not finished the current game then the system needs to save the current game timer to the current game state object
            console.log("mainController: pauseCurrentGame(): saveGameTime!");
            rocketReadingModel.getCurrentGameData().saveGameTime();
            // The current game data is recorded as having a saved game
            levelNumber = rocketReadingModel.getCurrentGameData().getCurrentLevel().getLevelNumber();
            gameNumber = rocketReadingModel.getCurrentGameData().getCurrentGame().getNumber();
            levelGame = [levelNumber, gameNumber];
            rocketReadingModel.getCurrentGameData().setSavedLevelGame(levelGame);
        } else if (rocketReadingModel.getCurrentGameData().getCurrentWord() === null) {
            // If the user has completed the current game then the game screen's total game time will be reset to 0.
            mainController.resetGameTimers();
        }
    },
    
    loadPreviousGame: function () {
        "use strict";
        // The system clears the current data's saved game data
        rocketReadingModel.getCurrentGameData().setSavedLevelGame(null);
        // The system get the user's current game details and opens the particular screen
        mainController.gameInitialise();
        myViewModelRR.showGameScreen();
        // The modal screen should then be displayed
        // When the user should clicks the Start link the game timer should then start
        // The game timer is started again
        // mainController.startGameTimer();
    },
    
    gameInitialise: function () {
        "use strict";
        //var levelNumber = rocketReadingModel.getCurrentGameData().getCurrentLevel().getLevelNumber(),
        //   gameNumber = rocketReadingModel.getCurrentGameData().getCurrentGame().getNumber(),
        //  levelGame = [levelNumber, gameNumber];
        mainController.createTable();
        mainController.displayMedalCounts();
        mainController.displayScore();
        mainController.displayWordsCompletedData();
        mainController.displayCurrentLevelGame();
        mainController.getAvatar();
        
        // The current Level-Game will be set
        //rocketReadingModel.getCurrentGameData().setCurrentLevelGame(levelGame);
        //mainController.loadGameScreenIntro();
    },
    

    gameOptionsRequest: function () {
        "use strict";
        var gameOptionsInfo = [],
            levelNumber = mainController.getStringNumber(this.id);
            console.log("gameOptionsRequest() - levelNumber (regex): " + levelNumber);
        gameOptionsInfo[0] = rocketReadingModel.findNumGamesOfLevel(levelNumber);
        gameOptionsInfo[1] = rocketReadingModel.findLevelGamesNames(levelNumber);
		//Loading selected Level into current Level in currentGameData
		rocketReadingModel.getCurrentGameData().setCurrentLevel(rocketReadingModel.findLevelByNumber(levelNumber));
        // The main controller calls a function in the view controller and passes along the relevant information about that particular level.
        myViewModelRR.displayGameOptions(gameOptionsInfo);
    },
    
    // Instead of validating the user's input with data from a web server, the system is checking the input against data in local storage. The current validation should really be performed in the model module, and not in this, the main controller module.
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
    
    // loading player data from the local storage. 
	setPlayer: function (username) {
        "use strict";
		var playerData = storageController.getPlayer(username);
		rocketReadingModel.setPlayer(playerData);
		myViewModelRR.displayPlayerName(username);
	}
	
};