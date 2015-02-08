var RocketReadingController = function() {
	this.levelCount = 0;
	this.allMyLevels = [];
    this.name = "MyRocketReadingApp";
    this.listCount = 0
    this.allMyLists = [];
    this.playerCount = 0;
    this.allMyPlayers = [];
};

rocketReadingController = new RocketReadingController();

RocketReadingController.prototype.addLevel = function(newName, newLevelNumber, newGames, newNumberGames) {
    "use strict";
    var newLevel = new Level(newName, newLevelNumber, newGames, newNumberGames);
    this.allMyLevels.push (newLevel);
    this.levelCount += 1;
};

RocketReadingController.prototype.addPlayer = function (newUser, newFirstName, newLastName, newSchool, newClassRoom, newTotalScore, newLevelReached, newBonusGameReached, newPointsToPassLevel) {
    "use strict";
    var newCurrentGameData = new currentGameData("", "", [], "", "", [], []),
        newAllGamesData = new allGamesData([], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []),
        newPlayer = new Player(newUser, newFirstName, newLastName, newSchool, newClassRoom, newTotalScore, newLevelReached, newBonusGameReached, newPointsToPassLevel, newCurrentGameData, newAllGamesData);
    this.allMyPlayers.push(newPlayer); 
    this.playerCount += 1;
    localStorage.setItem(newUser, JSON.stringify(newPlayer));
};

/* The addGame function in the Level.js file is used to add games to levels*/
RocketReadingController.prototype.addGame = function (level, newName) {
    "use strict";
    var myLevel = this.allMyLevels[level],
        newGame = new Game (newName);
    myLevel.allMyGames.push (newGame);
    myLevel.gameCount += 1;
};

RocketReadingController.prototype.findLevel = function (name) {
    "use strict";
    var aLevel;
	for (aLevel of this.allMyLevels) {
		if (aLevel.name === name) {
            // This should be outputted from the viewController module
            console.log("Have found: " + aLevel + ". Level name: " + aLevel.name); // test
            console.log("Level " + aLevel.name + "'s allMyGames: " + aLevel.allMyGames); // test
			return aLevel;
		}
	}
    alert("Level Not Found");
};

RocketReadingController.prototype.findGame = function (name) {
    "use strict";
    var aLevel;
	for (aLevel of this.allMyLevels) {
		for (aGame of aLevel.allMyGames) {
			if (aGame.name === name) {
				return aGame;
			}
		}
	};
		alert("Game Not Found");
};

/*RocketReadingController.prototype.findGame = function (name) {
    "use strict";
    var aLevel = this.findLevel(levelName);
    for (aGame of aLevel.allMyGames) {
        if (aGame.name === name) {
			return aGame;
		}
	}
}    
*/

RocketReadingController.prototype.findNumGamesOfLevel = function (levelName) {
    "use strict";
    /*var aLevel = this.findLevel(levelName);
	return aLevel.gameCount;*/
    return Number(this.findLevel(levelName).gameCount);
	alert("Number of games not found");
};

RocketReadingController.prototype.findLevelGamesNames = function (levelName) {
    "use strict";
    var count,
        gameNames = [],
        theLevel = this.findLevel(levelName);
        // gamesLength = this.findLevel(levelName).allMyGames.length;
    for (count = 0; count < (theLevel.gameCount); count += 1) {
        gameNames.push(theLevel.allMyGames[count].gameName);
    }
    return gameNames;
};

RocketReadingController.prototype.addList = function (level, game, inputlist) {
"use strict";
    //This is a reference to the game that the List is part of.
    myGame = RocketReadingController.allMyLevels[level].allMyGames[game]
    var wordsArray = inputlist.split(',');
    //This is relating the game to the List and feeding in an CSV line.
    var newList = new List(myGame, wordsArray);
    this.allMyLists.push (newList);
    this.listCount += 1;
};

// Adding a student's current data to the student's allGamesData property, and also saving this data to the players' LS file
RocketReadingController.prototype.addCurrentGameData = function (playerIndex, levelGame) {
    "use strict";
    var levelGame = "level" + levelGame[0] + "Game" + levelGame[1],
        aPlayer = this.allMyPlayers[playerIndex],
        studentData = JSON.parse(localStorage.getItem(aPlayer.userName));
        console.log("aPlayer: " + aPlayer);
        console.log(" Adding current game data - aPlayer.allGamesData: " + aPlayer.allGamesData);
        console.log("studentData: " + studentData);
    switch (levelGame) {
        case ("level1Game1"): 
            aPlayer.allGamesData.level1Game1.push(this.allMyPlayers[playerIndex].currentGameData);
            break;
        // There would need to be case statements for all of the other level-stages too
    }
    
    // This data should also be saved to LS too
    studentData.allGamesData.level1Game1.push(this.allMyPlayers[playerIndex].currentGameData);
    localStorage.setItem(aPlayer.userName, JSON.stringify(studentData));
};


