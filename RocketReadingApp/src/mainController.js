// The system creates a mainController object which aims to resolve requests that involve data analysis

var mainController = {

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
        myViewModelRR.displayWord(characterArray);
        learnWordCount = 4;
        myViewModelRR.updateCurrentWord(currentWord, 'learnWord');
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
        // The player's levelGameReached or bonusGameReached property should be updated (if applicable)
        // If the player has unlocked a new level-game then the system will have to make this level-game accessible to the player 
        mainController.updateLevelGameReached();
        // Clear the current data object
        rocketReadingModel.clearCurrentGameData();
        // Create a bare current data object and assign it as a property of the Rocket-Reading object
        mainController.resetCurrentGameData(null, null, null, null);
    },
    
    resetCurrentGameData: function (newLevel, newGame, newWordList, newCurrentLevelGame) {
        "use strict";
        rocketReadingModel.addCurrentGameData(newLevel, newGame, newWordList, null, newCurrentLevelGame, null, 0, [0,0,0], 0, 0, [], []);
    },
	
	passWord: function (word) {
		rocketReadingModel.passWord(word);
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
			outputArray.push(transientArray);
			transientArray = [];
		};
		
		myViewModelRR.displayLevelList(outputArray);
		
        //myViewModelRR.displayLevelList(allLevels);
    },
    
    getStringNumber: function (inputId) {
        "use string";
        return Number(inputId.slice(inputId.search(/[1-9]/), inputId.length));
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
			console.log("requestAllGamesForLevel() : added '" + tempArray + "' to list");
			outputGameOptions.push(tempArray);
			tempArray = [];
		};
		console.groupEnd();
		myViewModelRR.displayGameOptions(outputGameOptions);
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
		var wordList = rocketReadingModel.getCurrentGameData().getWordList(),
            completeWordList = rocketReadingModel.getCurrentGameData().getCompleteWordList();
        // The wordlist needs to be arranged in a random order
        completeWordList = this.randomiseArray(completeWordList);
        // After the wordlist has been randomised, the complete word list needs to be repopulated. This is necessary because the complete word list may need to be used in validateWords()
        mainController.resetCompleteWordList();
        // Set the other wordlist array as the word list for the current game
        rocketReadingModel.getCurrentGameData().passList(wordList);
        // Display the table with the randomised complete wordlist
		myViewModelRR.displayTable(completeWordList);
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
        myViewModelRR.updateCurrentWord(currentWord, 'normalWord');
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

    resetGameTimers: function () {
        "use strict";
        gameTimerSecs = 0;
        gameTimerMins = 0;
        myViewModelRR.resetGameTimer();
    },
    
    checkAdvanceNextGame: function () {
    // This function checks whether the player needs to complete a bonus game before advancing to the next level
        "use strict";
        
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
                // The game timer is started again
                mainController.startGameTimer();
                // The next word is selected
                mainController.nextWord();
            } else {
                // The user will have to complete a bonus game before advaning to the next level
            }
        } else if ((rocketReadingModel.getCurrentGameData().getSavedLevelGame() !== null)) {
            // If the user has a saved game then the screen for that level-game will be displayed
            mainController.loadPreviousGame();
        }
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
            mainController.resetGameTimers();
            mainController.gameInitialise();
        }
    },
    
    leaveCurrentGame: function () {
        "use strict";
        var levelNumber,
            gameNumber,
            levelGame = rocketReadingModel.getCurrentGameData().getCurrentLevelGame();
        // The system needs to stop the game-timer
        clearInterval(gameTimer);
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
        // The next word is selected
        mainController.nextWord();
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
    
	setCurrentLevel : function () {
		"use strict";
		var levelNumber = mainController.getStringNumber(this.id),
			levelGame = [levelNumber, null];
		
		rocketReadingModel.getCurrentGameData().setCurrentLevel(rocketReadingModel.findLevelByNumber(levelNumber));
		rocketReadingModel.getCurrentGameData().setCurrentLevelGame(levelGame);
	},
	
	setCurrentGame : function () {
		"use strict";
		console.log("testicles");
	},
	/*
    gameOptionsRequest: function () {
        "use strict";
        var gameOptionsInfo = [],
            levelNumber = mainController.getStringNumber(this.id),
            levelGame = [levelNumber, null];
        console.log("gameOptionsRequest() - levelNumber (regex): " + levelNumber);
        gameOptionsInfo[0] = rocketReadingModel.findNumGamesOfLevel(levelNumber);
        gameOptionsInfo[1] = rocketReadingModel.findLevelGamesNames(levelNumber);
		// Loading selected Level into current Level in currentGameData
		rocketReadingModel.getCurrentGameData().setCurrentLevel(rocketReadingModel.findLevelByNumber(levelNumber));
        // The level part of currentGameData.currentLevelGame needs to be set
        rocketReadingModel.getCurrentGameData().setCurrentLevelGame(levelGame);
        // The main controller calls a function in the view controller and passes along the relevant information about that particular level.
        myViewModelRR.displayGameOptions(gameOptionsInfo);
    },
    */
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
        console.log("mainController.setPlayer(): setPlayer() player's school - " + playerData.school);
        // Creating current Game Data and AllGamesData for the new player, and then adding the player to the system.
        // It's interesting to see what happens when passing the score as 0 (and the constructor does not set the total score as 0 if there is not input parameter for this attribute.
        rocketReadingModel.addCurrentGameData(null, null, null, null, null, null, 0, [0,0,0], null, null, [], []);
        rocketReadingModel.addAllGamesData([], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []);	
		rocketReadingModel.addPlayer(playerData.userName, playerData.firstName, playerData.lastName, playerData.school, playerData.classRoom, playerData.totalScore, playerData.levelGameReached, playerData.bonusGameReached, playerData.pointsToPassLevel);
		myViewModelRR.displayPlayerName(username);
	}
	
};