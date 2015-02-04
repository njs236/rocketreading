var Myapp = function() {
    this.name = "MyRocketReadingApp";
    this.levelCount = 0;
    this.playerCount = 0;
    this.allMyLevels = [];
    this.allMyPlayers = [];
    // localStorage.setItem(this.name, JSON.stringify(this)); // Actually, I don't think you can save a function to LS
};

Myapp.prototype.addLevel = function(newName, newNumber, newGames) {
    "use strict";
    var newLevel = new Level(newName, newNumber, newGames);
    this.allMyLevels.push(newLevel);
    this.levelCount += 1;
    localStorage.setItem(newName,JSON.stringify(newLevel));
};

Myapp.prototype.addPlayer = function (newUser, newFirstName, newLastName, newSchool, newClassRoom, newTotalScore, newLevelReached, newBonusGameReached, newPointsToPassLevel) {
    "use strict";
    var newCurrentGameData = new currentGameData("", "", [], "", "", [], []),
        newAllGamesData = new allGamesData([], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []),
        newPlayer = new Player(newUser, newFirstName, newLastName, newSchool, newClassRoom, newTotalScore, newLevelReached, newBonusGameReached, newPointsToPassLevel, newCurrentGameData, newAllGamesData);
    this.allMyPlayers.push(newPlayer); 
    this.playerCount += 1;
    localStorage.setItem(newUser, JSON.stringify(newPlayer));
};

Myapp.prototype.addGame = function (list, newName) {
    "use strict";
    var myList = list || {},
        newGame = new Game (newName);
    this.allMyGames.push (newGame);
    this.gameCount += 1;
};

Myapp.prototype.findLevel = function (name) {
    "use strict";
    var aLevel;
	for (aLevel of this.allMyLevels) {
		if (aLevel.name === name) {
            console.log("Have found: " + aLevel + ". Level name: " + aLevel.name); // test
            console.log("Level " + aLevel.name + "'s allMyGames: " + aLevel.allMyGames); // test
			return aLevel;
		}
	}
    alert("Level Not Found");
};

Myapp.prototype.findGame = function (levelName, gameName) {
    "use strict";
    var aLevel = this.findLevel(levelName),
        aGame;
	for (aGame of aLevel.allMyGames) {
		if (aGame.name = name) {
	        return aGame;
		}
	}   alert("Game Not Found");
};

Myapp.prototype.addList = function (level, game, inputlist) {
"use strict";
    //This is a reference to the game that the List is part of.
    myGame = Myapp.allMyLevels[level].allMyGames[game]
    var wordsArray = inputlist.split(',');
    //This is relating the game to the List and feeding in an CSV line.
    var newList = new List(myGame, wordsArray);
    this.allMyLists.push (newList);
    this.listCount += 1;
};

// Adding a student's current data to the student's allGamesData property, and also saving this data to the players' LS file
Myapp.prototype.addCurrentGameData = function (playerIndex, levelGame) {
    "use strict";
    // Should really have a find player function
    var aPlayer = this.allMyPlayers[playerIndex],
        studentData = JSON.parse(localStorage.getItem(aPlayer.userName));
        console.log("aPlayer: " + aPlayer);
        console.log(" Adding current game data - aPlayer.allGamesData: " + aPlayer.allGamesData);
        console.log("studentData: " + studentData);
    switch (levelGame) {
        case ("level1Game1"): 
            aPlayer.allGamesData.level1Game1.push(this.allMyPlayers[playerIndex].currentGameData);
            break;
    }
    
    // This data should also be saved to LS too
    studentData.allGamesData.level1Game1.push(this.allMyPlayers[playerIndex].currentGameData);
    localStorage.setItem(aPlayer.userName, JSON.stringify(studentData));
};

/*
myGameController.allMyPlayers[0].allGamesData.

var CreatePlayerCollection = function (userName) {
"use strict"
var collectionProperties = {
	playerCount : 0,
	allMyPlayers : [],
}
localStorage.setItem(userName, JSON.stringify(collectionProperties))*/