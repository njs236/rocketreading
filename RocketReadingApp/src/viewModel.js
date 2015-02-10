// Creating a viewModel object for the system
// Actually, this module seems to be more of a view controller, which determines what information is passed to the view module. - What is the definition and role of a view model?

var myViewModelRR = {
	view : {},
	name : "ViewController for Rocket Reading",
	
	setView : function (inputView) {
		this.view = inputView;
		return "myViewModelRR : My View is now " + this.view.getName();	
	},
	
	testView : function() {
		var myMethods = [],
			viewMethods = [],
			count,
			error = "";
			
		//this.view.greet();
		
		myMethods = Object.getOwnPropertyNames(this)
		viewMethods = Object.getOwnPropertyNames(this.view)
		
		for ( count = 0; count < myMethods.length; count = count + 1 ) {
			if ( viewMethods.indexOf(myMethods[count]) == -1 ) {
				error = this.view.name + "Module Missing " + myMethods[count];
				//console.log('%c' + error + ,'"color:red"');
			};
		};
		if (error !== "" ) {
			return "Module Had Errors!";
		} else {
			return "Module Passed!";
		}
	},
	
    /*displayMethods: {*/
		displayPlayerName : function (username) {
            document.getElementById('welcome').textContent = 'Welcome, ' + username;
		},
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
        hideRequiredScreens: function (hiddenScreens) {
            "use strict";
            var result;
            if (hiddenScreens === "navScreen") {
                // This will result in all of the screens being hidden
                viewHTMLModule.hideAllPages("navScreen");
                // Console View:
                console.log("All navScreen divs are hidden.");
            } else if (hiddenScreens === "loginLabel") {
                // This will result in all of the login labels being hidden
                viewHTMLModule.hideAllPages("navScreen");
                // Console View:
                console.log("All loginLabel divs are hidden.");
            }
        },*/
		
		displayTable : function (inputArray) {
			viewHTMLModule.displayGameTable(inputArray);
		},
        
        displayGameOptions: function (gameOptionsInfo) {
            "use strict";
            // HTML view output
            // If the user has selected a level, then the game options screen show be displayed and the level options screen should be hidden
            
            // Console view output
            console.log("myViewModelRR.displayGameOptions() Find number of games: " + gameOptionsInfo[0]);
            console.log("myViewModelRR.displayGameOptions() Find names of games: " + gameOptionsInfo[1]);
            
            viewHTMLModule.displayGameOptions(gameOptionsInfo);
            viewHTMLModule.showGameSelectScreen();
        },
        
        loginOutputData: function (inputData) {
            "use strict";
            // Data to be displayed in the console
            console.log("loginOutputData() - Login data messages: " + inputData);
        },
        
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
		
		
		initialiseView : function () {
			console.log("initialiseView() : Running");
			viewHTMLModule.intitialise();
		}
};