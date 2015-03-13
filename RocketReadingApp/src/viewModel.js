// ViewController v2.1
//

rocketReadingModel.myViewModelRR = ( function () {
    
    // ********* Attributes **********
	var view = {},
        name = "ViewController for Rocket Reading";
    
    return {
	
	// ************************************
	// ********* Get/Set Section **********
	// ************************************
	
	setView : function (inputView) {
		"use strict";
		if ( typeof inputView == "object" ) {
			if (this.testViewModule(inputView)){
				view = inputView;
				console.log("viewController : My View is now '" + view.getName() + "'");
				view.intitialiseView();
				return "viewController : My View is now " + view.getName();
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
			whiteListMethods = ["testViewModule", "setView", "gamesRequiredLevel"],
			count,
			error = false;
			
		console.group("myViewModelRR : testViewModule()");
        // I have changed the following line to make the conditional test return true
		// if ( typeof viewHTMLModule == "object" ){ 
		if ( typeof viewModule == "object" ){
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
		view.loginSuccessful();
	},
	
	badLogin : function () {
		"use strict"
		view.badLogin();
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
			view.displayPlayerName(username);
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
		view.displayLevelList(inputLevels);
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
		view.displayGameOptions(gameOptionsInfo);
		//view.showGameSelectScreen();
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
		view.displayMedalCounts(inputArray);
	},
	
	clearTimer : function () {
		view.clearTimer();
	},
    
    resetGameTimer: function () {
        "use strict";
        view.resetGameTimer();
    },
	
	displayTable : function (inputArray) {
		view.displayTable(inputArray);
	},
    
    displayWordsCompleted: function (progressData) {
        "use strict";
        view.displayWordsCompleted(progressData);
    },
    
    displayScore: function (score) {
        "use strict";
        view.displayScore(score);
    },
    
    displayLevelGameNumber: function (levelGame) {
        "use strict";
        view.displayLevelGameNumber(levelGame)
    },
    
    displayGameTimer: function () {
        "use strict";
        view.displayGameTimer();
    },
	
	updateCurrentWord : function (currentWord, attr, characterArray) {
        "use strict";
		view.updateCurrentWord(currentWord, attr, characterArray);
	},
    
    displayWord : function (characterArray, fontType) {
        "use strict";
        view.displayWord(characterArray, fontType);
    },
    
    clearLearnWord: function () {
        "use strict";
        view.clearLearnWord();
    },
    
    showGameScreen: function() {
        "use strict";
        viewHTMLModule.showGameScreen();
    },
	
	toggleLearnWord : function () {
		view.toggleLearnWord();
	},
	
	displayAvatar : function (avatar) {
		view.displayAvatar(avatar);
	},
	
	eventClickAdd : function () {
		view.eventClickAdd();
	},
	
	removeEventClick : function () {
		view.removeEventClick();
	},
	
	addEventLearnWord : function () {
		view.addEventLearnWord();
	},
	
	removeLearnWord : function () {
		view.removeLearnWord();
	},
    
    setLearnWordOn: function () {
        "use strict";
        view.setLearnWordOn();
    },
    
    setLearnWordNormal: function () {
        "use strict";
        view.setLearnWordNormal();
    },
    
    startBarTimer: function () {
        "use strict"; 
        view.startBarTimer();
    },
    
    hideBarTimer: function () {
        "use strict"; 
        view.hideBarTimer();
    },
    
    setUniformCellWidth: function () {
        "use strict";
        view.setUniformCellWidth();
    },
    
	correctGuess : function () {
		"use strict";
		view.correctGuess();
	},
	
	
	learnWordIsActive : function () {
		"use strict"
		view.learnWordIsActive();
	},
	
	learnWordIsFinished : function () {
		"use strict";
		view.learnWordIsFinished();
	},
    
    addEventListContinueGameBack: function () {
        "use strict";
        view.addEventListContinueGameBack();
    },
    
    addEventListGameBackReplay: function () {
        "use strict";
        view.addEventListGameStartReplay();
    },
    
    removeEventListGameStart: function () {
        "use strict";
        view.removeEventListGameStart();
    }
    /*
    displayGameIntroConfirm: function () {
        "use strict";
        myViewModelRR.view.displayGameIntroConfirm();
    },*/
    
	// *******************************************
	// ********* End Game Screen Section *********
	// *******************************************
    
    }

} () );