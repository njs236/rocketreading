// Creating a viewModel object for the system
// Actually, this module seems to be more of a view controller, which determines what information is passed to the view module. - What is the definition and role of a view model?

var myViewModelRR = {
	
	
	// ********* Attributes **********
	view : {},
	name : "ViewController for Rocket Reading",
	
	// ************************************
	// ********* Get/Set Section **********
	// ************************************
	
	setView : function (inputView) {
		this.testViewModule(inputView);
		this.view = inputView;
		this.view.greet();
		this.view.intitialiseView();
		return "myViewModelRR : My View is now " + this.view.getName();	
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
			error = "";
			
		//this.view.greet();
		console.group("myViewModelRR : testViewModule()");

		myMethods = testController.getAllMethods(this);
		viewMethods = testController.getAllMethods(viewModule);
		
		console.groupCollapsed("Testing Module Methods")
		for ( count = 0; count < myMethods.length; count = count + 1 ) {
			if ( (viewMethods.indexOf(myMethods[count]) == -1 ) && whiteListMethods.indexOf(myMethods[count]) == -1 ) {
				error = this.view.name + "Module Missing " + myMethods[count];
				console.log("%ctestViewModule() : Module Error : " + myMethods[count] , "color: red");
			};
		};
		console.groupEnd();
		if (error !== "" ) {
			throw viewModule.name + " had errors!";
		} else {
			return viewModule.name + " Passed!";
		}
		console.groupEnd();
	},
	
	// ******************************
	// ***** End Tests Section ******
	// ******************************
	
	
	// ***********************************************
	// ************ Home Screen Section **************
	// ***********************************************
	
	displayPlayerName : function (username) {
		"use strict";
		if ( typeof username == "String" ) {
			this.view.displayPlayerName(username);
		} else {
			throw "viewController : displayPlayerName() : Input must be a string";
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
		var count,
			string,
			tempArray = [],
			levelListArray = [],
			listLength = inputLevels.length;
		console.log(listLength);
		for (count = 0; count < listLength; count += 1) {
			tempArray.push(inputLevels[count].levelNumber);
			tempArray.push(inputLevels[count].getAvatar().getName());
			levelListArray.push(tempArray);
			tempArray = [];
		}
		
		// Console view of the data being passed
		console.log("displayLevelList(): " + levelListArray);
		console.log("displayLevelList() length of array: " + levelListArray.length);
		
		viewHTMLModule.displayLevelList(levelListArray);
		
		//Display the level screen
		viewHTMLModule.showLevelSelectScreen();
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
		
		// Console view output
		console.log("myViewModelRR.displayGameOptions() Find number of games: " + gameOptionsInfo[0]);
		console.log("myViewModelRR.displayGameOptions() Find names of games: " + gameOptionsInfo[1]);
		
		this.view.displayGameOptions(gameOptionsInfo);
		this.view.showGameSelectScreen();
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
		console.log(inputArray);
		for ( count = 0; count < inputArray.length; count = count + 1) {
			if ( /[^0-9]+/.test(inputArray[count]) || typeof inputArray[count] !== "number" ) {
				throw "displayMedalCounts() : Input Error, function only takes whole numbers";
			};
		};
		
		this.view.displayMedalCounts(inputArray);
	},
	
	displayTable : function (inputArray) {
		viewHTMLModule.displayGameTable(inputArray);
	},

	// *******************************************
	// ********* End Game Screen Section *********
	// *******************************************
	
	gamesRequiredLevel: function (levelType) {
		"use strict";
		var result;
		// There are two ways of displaying the selection of games based on the type of level which the user is looking at
		if (levelType === "WordList") {
			result = "displayWordListGames";
			// Console view:
			console.log("Type of games to be displayed: WordListGames.");
		} else if (levelType === "BonusList") {
			result[0] = "displayBonusListGames";
			// The variable / array could be assigned an array containing the titles of the specific bonus games 
			result[1] = ["Alphabet Sounds", "Constant Blends 1","Constant Blends 2","Short Vowel Sounds","Long Vowel Sounds","Middle Sounds"];
			
			// Console View:
			console.log("myViewModelRR.gamesRequiredLevel() - Type of games to be displayed: BonusGames.");
			console.log("myViewModelRR.gamesRequiredLevel() - Titles of bonus games to be displayed: Alphabet Sounds", "Constant Blends 1","Constant Blends 2","Short Vowel Sounds","Long Vowel Sounds","Middle Sounds");
		}
		// A function in the viewHTML object is then called, which determines how to display the selection of games in the UI
		displayGamesSelection(result);
	},
		
		
		
		/*
		
		loginOutputData: function (inputData) {
			"use strict";
			// Data to be displayed in the console
			console.log("loginOutputData() - Login data messages: " + inputData);
		},
		*/
};