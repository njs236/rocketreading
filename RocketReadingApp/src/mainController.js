// The system creates a mainController object which aims to resolve requests that involve data analysis

var mainController = {

	validateWords : function (word) {/*
		if (word === rocketReadingModel.currentGameData.getCurrentWord) {
            if (timer < 2) {
                //do things here
            } elseif ( 2 < timer < 4 ) {
                //do things here
            }elseif ( 4 < timer < 8 ) {
                //do things here
            }
		
		} else {
			
		}*/
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
        validateLogin: function (nameElement, passwordElement) {
            "use strict";
           if  (( storageController.getPlayer(nameElement.value).userName === nameElement.value) && ( storageController.getPlayer(nameElement.value).firstName === passwordElement.value )) {
                // The system lets the user login
                // Data is sent to the view controller to be displayed in the console
                //myViewModelRR.loginOutputData("Through!");
                viewHTMLModule.showHomeScreen();
				mainController.setPlayer(nameElement.value);
            } else {
                passwordElement.value = "";
                passwordElement.focus();
                document.getElementById("loginMessage").innerHTML = "Invalid username or password. Please try again";
            }  
        },
                    
        validateUserExists: function (nameElement, passwordElement) {
            "use strict";
            // Data is sent to the view controller to be displayed in the console
            //myViewModelRR.loginOutputData("name: " + nameElement.value);
            
            var result = JSON.parse(localStorage.getItem(nameElement.value));
            if ( result !== null ) {
                // Data is sent to the view controller to be displayed in the console
                //myViewModelRR.loginOutputData("User exists: " + result + " - true!");
                return true;
            } else {
                document.getElementById("loginMessage").innerHTML = "Unknown username. Please try entering your username again or create an account.";
                passwordElement.value = "";
                return false;
            }
        },
            
        validateFieldInput: function (nameElement, passwordElement) {
            "use strict";
            if (nameElement.value === "" && passwordElement.value === "") {
                document.getElementById("loginMessage").innerHTML = "Please enter a username and a password.";
            } else if (nameElement.value === "") {
                document.getElementById("loginMessage").innerHTML = "Please enter a username.";    
            } else if (passwordElement.value === "") {
                document.getElementById("loginMessage").innerHTML = "Please enter a password.";
            } else {
                return true;
            }
        }
    },
    
    // Processing login function
    
    processLogin: function () {
        "use strict";
        if (mainController.loginMethods.validateFieldInput(document.getElementById("loginUserName"), document.getElementById("loginPassword"))) { 
            if (mainController.loginMethods.validateUserExists(document.getElementById("loginUserName"), document.getElementById("loginPassword"))) {
                mainController.loginMethods.validateLogin( document.getElementById("loginUserName"), document.getElementById("loginPassword") );
            } else {
                console.log("No login ...");
            }
        }
    },
    
    // loading player data from the local storage. 
	setPlayer: function (username) {
        "use strict";
		var playerData = storageController.getPlayer(username);
		rocketReadingModel.setPlayer(playerData);
		myViewModelRR.displayPlayerName(username);
	},
	
};