// Creating a viewModel object for the system
// Actually, this module seems to be more of a view controller, which determines what information is passed to the view module. - What is the definition and role of a view model?

var myViewModelRR = {
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
                console.log("Type of games to be displayed: BonusGames.");
                console.log("Titles of bonus games to be displayed: Alphabet Sounds", "Constant Blends 1","Constant Blends 2","Short Vowel Sounds","Long Vowel Sounds","Middle Sounds");
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
        
        displayGameOptions: function (gameOptionsInfo) {
            "use strict";
            // HTML view output
            // If the user has selected a level, then the game options screen show be displayed and the level options screen should be hidden
            
            viewHTMLModule.displayGameOptions(gameOptionsInfo);
            showGameSelectScreen();
           
            // Console view output
            console.log("Find number of games: " + gameOptionsInfo[0]);
            console.log("Find names of games: " + gameOptionsInfo[1]);
        },
        
        loginOutputData: function (inputData) {
            "use strict";
            // Data to be displayed in the console
            console.log("Login data messages: " + inputData);
        },
        
        displayLevelList: function (inputList) {
            "use strict";
            var count,
                string,
                tempArray = [],
                levelListArray = [],
                listLength = inputList.length;
            console.log(listLength);
            for (count = 0; count < listLength; count += 1) {
                string = "Level0" + inputList[count];
                tempArray.push(string);
                tempArray.push("avatarPathTempString" + count);
                levelListArray.push(tempArray);
                tempArray = [];
            }
            viewHTMLModule.displayLevelList(levelListArray);
            // Console view of the data being passed
            console.log("displayLevelList(): " + levelListArray[0][0] + ' ' + levelListArray[0][1]);
            console.log("displayLevelList() length of array: " + levelListArray.length);
            
            //Display the level screen
            showLevelScreen();
        }
};