// Creating a viewModel object for the system

var myViewModelRR = {
    displayHTMLMethods: {
        // I am thinking of giving all methods which will involve the display of HTML elements the suffix (or prefix) HTML
        gamesRequiredLevelHTML: function (levelType) {
            "use strict";
            var result;
            // There are two ways of displaying the selection of games based on the type of level which the user is looking at
            if (levelType === "WordList") {
                result = "displayWordListGames";
            } else if (levelType === "BonusList") {
                result[0] = "displayBonusListGames";
                // The variable / array could be assigned an array containing the titles of the specific bonus games 
                result[1] = ["Alphabet Sounds", "Constant Blends 1","Constant Blends 2","Short Vowel Sounds","Long Vowel Sounds","Middle Sounds"];
            }
            // A function in the viewHTML object is then called, which determines how to display the selection of games in the UI
            displayGamesSelection(result);
        }
    },
    
 
    
    displayConsoleMethods: {
        // I am thinking of giving all methods which will involve displaying data in the console the suffix (or prefix) Console
        gamesRequiredLevelConsole: function (levelType) {
            "use strict";
            var result;
            if (levelType === "WordList") {
                console.log("Type of games to be displayed: WordListGames."
                // Is the following too much information for the viewModel to know about or determine. However, the number of games to be displayed should or could be passed to it from the mainController. The number of games would then be used by the viewModel to determine the functions and arguments which will then be called.
                console.log("Number of games to be displayed: 4");
            } else if (levelType === "BonusList") {
                console.log("Type of games to be displayed: BonusGames.");
                console.log("Titles of bonus games to be displayed: Alphabet Sounds", "Constant Blends 1","Constant Blends 2","Short Vowel Sounds","Long Vowel Sounds","Middle Sounds");
            }
        }
    }
};