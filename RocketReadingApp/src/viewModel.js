// ViewController v2.1
//

var myViewModelRR = {
	
	// ********* Attributes **********
	view : {},
	name : "ViewController for Rocket Reading",
	
	// ************************************
	// ********* Get/Set Section **********
	// ************************************
	
	setView : function (inputView) {
		"use strict";
		if ( typeof inputView == "object" ) {
			if (this.testViewModule(inputView)){
				this.view = inputView;
				console.log("viewController : My View is now '" + this.view.getName() + "'");
				this.view.intitialiseView();
				return "viewController : My View is now " + this.view.getName();
			};
		} else {
			throw "viewController : setView() : I only take objects!";
		};
	},
	// ******************************
	// ******* Tests Section ********
	// ******************************
	
	testViewModule : function(viewModule) {
		"use strict"
		// Method tests the currently assigned view object's methods against
		// the controller's and throws an error if any are missing
		var myMethods = [],
			viewMethods = [],
			// put any methods in here that viewModules should not have
			whiteListMethods = ["testViewModule", "setView", "displayHighScores"],
			count,
			error = false;
			
		console.group("myViewModelRR : testViewModule()");
		if ( typeof viewHTMLModule == "object" ){
			console.log("Testing " + viewModule.getName());
			myMethods = testController.getAllMethods(this);
			viewMethods = testController.getAllMethods(viewModule);
			
			console.group("Testing Module Methods")
			for ( count = 0; count < myMethods.length; count = count + 1 ) {
				if ( (viewMethods.indexOf(myMethods[count]) == -1 ) && whiteListMethods.indexOf(myMethods[count]) == -1 ) {
					error = true;
					console.log("%ctestViewModule() : Module Error : " + myMethods[count] , "color: red");
				};
			};
			console.groupEnd();
			if (error) {
				throw viewModule.getName() + " had errors!";
			} else {
				console.log("%ctestViewModule() : " + viewModule.getName() + " passed","color:green");
				console.groupEnd();
				return true;
			};
		} else {
			throw "viewController : testViewModule() : I only take objects!";
		};
	},
	
	// ******************************
	// ***** End Tests Section ******
	// ******************************
	
	// ****************************************************
	// ************** Login Screen Section ****************
	// ****************************************************
	
	loginSuccessful : function () {
		"use strict"
		this.view.loginSuccessful();
	},
	
	badLogin : function () {
		"use strict"
		this.view.badLogin();
	},
	
	// ****************************************************
	// ************ End Login Screen Section **************
	// ****************************************************
	
	// ***********************************************
	// ************ Home Screen Section **************
	// ***********************************************
	
	displayPlayerName : function (username) {
		"use strict";
		if ( typeof username == "string" ) {
			this.view.displayPlayerName(username);
		} else {
			throw "Error : viewController : displayPlayerName() : Input must be a string";
		};
	},
	// ***********************************************
	// ********** End Home Screen Section ************
	// ***********************************************
	
	// ********************************************
	// ******* Level Select Screen Section ********
	// ********************************************
	
	displayLevelList: function (inputLevels) {
		"use strict";
		this.view.displayLevelList(inputLevels);
	},

	// ********************************************
	// ***** End Level Select Screen Section ******
	// ********************************************
	
	// *******************************************
	// ******* Game Select Screen Section ********
	// *******************************************
	
	displayGameOptions: function (gameOptionsInfo) {
		"use strict";
		// HTML view output
		// If the user has selected a level, then the game options screen show be displayed and the level options screen should be hidden
		// function accepts a 2D array of games for an input level
		// in the following format.
		// [ 1 , "game01" ]
		// [ 2 , "game02" ]
		// [ 3 , "game03" ]
		// Console view output
		this.view.displayGameOptions(gameOptionsInfo);
		//this.view.showGameSelectScreen();
	},
	// *******************************************
	// ***** End Game Select Screen Section ******
	// *******************************************
	
	// *******************************************
	// ********** Game Screen Section ************
	// *******************************************
	
	displayMedalCounts : function (inputArray) {
		"use strict";
		//Function v 1.1
		// Takes input of an array which contains medal counts
		// [ 5 , 6 , 9 ]
		// Assumes and order of highest value to lowest eg
		// gold silver bronze
		var count;
		console.groupCollapsed("viewController : displayMedalCounts()");
		console.log(inputArray);
		if ( inputArray.length !== 3 ) {
			console.groupEnd();
			throw "viewController : displayMedalCounts() : Array is the wrong size";
		};
		for ( count = 0; count < inputArray.length; count = count + 1) {
			if ( /[^0-9]+/.test(inputArray[count]) || typeof inputArray[count] !== "number" ) {
				console.groupEnd();
				throw "displayMedalCounts() : Input Error, function only takes whole numbers";
			};
		};
		console.groupEnd();
		this.view.displayMedalCounts(inputArray);
	},
	
	clearTimer : function () {
		this.view.clearTimer();
	},
    
    resetGameTimer: function () {
        "use strict";
        this.view.resetGameTimer();
    },
	
	displayTable : function (inputArray) {
		this.view.displayTable(inputArray);
	},
    
    displayWordsCompleted: function (progressData) {
        "use strict";
        this.view.displayWordsCompleted(progressData);
    },
    
    displayScore: function (score) {
        "use strict";
        this.view.displayScore(score);
    },
    
    displayLevelGameNumber: function (levelGame) {
        "use strict";
        this.view.displayLevelGameNumber(levelGame)
    },
    
    displayGameTimer: function () {
        "use strict";
        this.view.displayGameTimer();
    },
    
    incrementGameTimer: function () {
        "use strict";
        this.view.incrementGameTimer();
    },
	
	updateCurrentWord : function (currentWord, attr, characterArray) {
        "use strict";
		this.view.updateCurrentWord(currentWord, attr, characterArray);
	},
    
    displayWord : function (characterArray, fontType) {
        "use strict";
        this.view.displayWord(characterArray, fontType);
    },
    
    clearLearnWord: function () {
        "use strict";
        this.view.clearLearnWord();
    },
    
    showGameScreen: function() {
        "use strict";
        viewHTMLModule.showGameScreen();
    },
	
	toggleLearnWord : function () {
		this.view.toggleLearnWord();
	},
	
	displayAvatar : function (avatar) {
		this.view.displayAvatar(avatar);
	},
	
	eventClickAdd : function () {
		this.view.eventClickAdd();
	},
	
	removeEventClick : function () {
		this.view.removeEventClick();
	},
	
	addEventLearnWord : function () {
		this.view.addEventLearnWord();
	},
	
	removeLearnWord : function () {
		this.view.removeLearnWord();
	},
    
    setLearnWordOn: function () {
        "use strict";
        this.view.setLearnWordOn();
    },
    
    setLearnWordNormal: function () {
        "use strict";
        this.view.setLearnWordNormal();
    },
    
    startBarTimer: function () {
        "use strict"; 
        this.view.startBarTimer();
    },
    
    hideBarTimer: function () {
        "use strict"; 
        this.view.hideBarTimer();
    },
    
    setUniformCellWidth: function (cellClassName) {
        "use strict";
        this.view.setUniformCellWidth(cellClassName);
    },
    
    setStandardCellSize: function (cellClassName) {
        "use strict";
        this.view.setStandardCellSize(cellClassName);
    },
    
	correctGuess : function () {
		"use strict";
		this.view.correctGuess();
	},
	
	
	learnWordIsActive : function () {
		"use strict"
		this.view.learnWordIsActive();
	},
	
	
	learnWordIsFinished : function () {
		"use strict";
		this.view.learnWordIsFinished();
	},
    
    displayGameResults : function (levelNumber, gameNumber, medalCounts) {
        this.view.displayGameResults(levelNumber, gameNumber, medalCounts);
    },
    
    /*
    displayGameIntroConfirm: function () {
        "use strict";
        myViewModelRR.view.displayGameIntroConfirm();
    },*/
    
	finishedGame : function () {
		"use strict";
		this.view.finishedGame();
	},
    
    addEventListContinueGameBack: function () {
        "use strict";
        this.view.addEventListContinueGameBack();
    },
    
    addEventListGameBackReplay: function () {
        "use strict";
        this.view.addEventListGameStartReplay();
    },
    
    removeEventListGameStart: function () {
        "use strict";
        this.view.removeEventListGameStart();
    },
	
	// *******************************************
	// ********* End Game Screen Section *********
	// *******************************************
	// **************************************************
	// ************* High Scores Section ****************
	// **************************************************
	
	displayHighScores : function (levelNumer){
		"use strict";
		var outputArray = [];
		console.group("ViewController : displayHighScores");
		console.log("Input level is " + levelNumer);
		outputArray = mainController.getHighScoresForLevel(levelNumer);
		
		console.groupEnd();
		this.view.displayHighScores(outputArray);
	}
	
	
	// **************************************************
	// ************ End High Scores Section *************
	// **************************************************
};