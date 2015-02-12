// The system creates a mainController object which aims to resolve requests that involve data analysis

var mainController = {

	validateWords : function (word) {
		var myTimer = rocketReadingModel.getCurrentGameData().getTimer(),
			levelNumber = rocketReadingModel.getCurrentGameData().getCurrentLevel().getLevelNumber(),
            gameNumber = rocketReadingModel.getCurrentGameData().getCurrentGame().getNumber(),
			listArrayCount = rocketReadingModel.getCurrentGameData().getWordListLength();
		mainController.spliceWord(word);
		console.log("validateWords:" + myTimer);
		myViewModelRR.clearTimer();
		if (word !== null) {
			if (word === rocketReadingModel.getCurrentGameData().getCurrentWord()) {
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

			} else {
				// this is the incorrect word selection
			}
		} else {
			// this is the too long selection
		}
		/*myViewModelRR.displayLearnWord();*/
		rocketReadingModel.getCurrentGameData().clearMyTimer();
		mainController.getMedalCounts();
		mainController.getWordsCompletedData();
		mainController.getScore();
		if (listArrayCount > 0) {
			mainController.nextWord();
		} else if (listArrayCount = 0) {
			alert ("Game Finished! You completed Level "+ levelNumber + "Game " + gameNumber);
		}
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
	
	createTable : function () {
		var inputArray = rocketReadingModel.getCurrentGameData().getWordList();
		myViewModelRR.displayTable(inputArray);
	},
	
	getMedalCounts : function () {
		var medals = rocketReadingModel.getCurrentGameData().getMedalCounts();
		console.log("getMedalCounts:" + medals)
		myViewModelRR.displayMedalCounts(medals);
	},
	
	getScore : function() {
        "use strict";
		var score = rocketReadingModel.getCurrentGameData().getScore();
		myViewModelRR.displayScore(score);
	},
	
	getWordsCompletedData : function () {
        "use strict";
		var progressData = [];
        progressData.push(rocketReadingModel.getCurrentGameData().getWordsCompleted());
        progressData.push(rocketReadingModel.getCurrentGameData().getWordListCount());
		myViewModelRR.displayWordsCompleted(progressData);
	},
    
    getCurrentLevelGame: function () {
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
    
    nextWord: function(levelNumber, gameNumber, listArray) {
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
		aTimer = setInterval(function () {
			var milliseconds = 100;
			mainController.returnMilliseconds(milliseconds)
		}, 100)
	},
	
	returnMilliseconds : function (milliseconds) {
		rocketReadingModel.getCurrentGameData().setTimer(milliseconds);
		if (rocketReadingModel.getCurrentGameData().getTimer() >= 8000) {
			mainController.validateWords();
		}
		console.log("returnMilliseconds:" + rocketReadingModel.getCurrentGameData().getTimer())
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
    
    pauseCurrentGame: function () {
        "use strict";
        // The system needs to stop the game-timer
        clearInterval(gameTimer);
        // The system needs to save the user's current game details to the current game state object
        rocketReadingModel.saveGameTime();
    },
    
    loadPreviousGame: function () {
        "use strict";
        // The system get the user's current game details and opens the particular screen
        mainController.gameInitialise();
        myViewModelRR.showGameScreen();
        // The game timer is started again
        mainController.startGameTimer();
    },
    
    gameInitialise: function () {
        "use strict";
        mainController.createTable();
        mainController.getMedalCounts();
        mainController.getScore();
        mainController.getWordsCompletedData();
        mainController.getCurrentLevelGame();
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
    
    /*
    gameOptionsRequest: function (levelBtnId) {
        "use strict";
        var levelName,
            gameOptionsInfo = [];
        switch (levelBtnId) {
            case ("levelSelectIconContainer00"):
                levelName = "Bonus Games Level";
                break;
            case ("levelSelectIconContainer01"):
                levelName = "Ice Cream World";
                break;
            case ("levelSelectIconContainer02"):
                levelName = "Nature World";
                break;
            case ("levelSelectIconContainer03"):
                levelName = "Water World";
                break;
            case ("levelSelectIconContainer04"):
                levelName = "Lollipop World";
                break;
            case ("levelSelectIconContainer05"):
                levelName = "Pirate World";
                break;
            case ("levelSelectIconContainer06"):
                levelName = "Car World";
                break;
        }
        // The main controller requests data from the model (where all of the data is stored about instances of classes.
        gameOptionsInfo[0] = rocketReadingModel.findNumGamesOfLevel(levelName);
        gameOptionsInfo[1] = rocketReadingModel.findLevelGamesNames(levelName);
        
        // The main controller calls a function in the view controller and passes along the relevant information about that particular level.
        myViewModelRR.displayGameOptions(gameOptionsInfo);
    },*/
    
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