// Creating a viewModel object for the system

var myViewModelRR = {
    displayMethods: {
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
        }
    }
};