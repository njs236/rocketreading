var RocketReadingController = function() {
this.levelCount = 0;
this.allMyLevels = [];
this.listCount = 0
this.allMyLists = [];
this.gameCount = 0;
this.allMyGames = [];
};
/*
var CreatePlayerCollection = function (userName) {
"use strict"
var collectionProperties = {
	playerCount : 0,
	allMyPlayers : [],
}
localStorage.setItem(userName, JSON.stringify(collectionProperties))
}
*/
rocketReadingController = new RocketReadingController();

RocketReadingController.prototype.addLevel = function(newName) {
"use strict";
var newLevel = new Level(newName);
this.allMyLevels.push (newLevel);
this.levelCount += 1;
}

RocketReadingController.prototype.addPlayer = function (newName, newLastName, newUser, newSchool, newClass) {
"use strict";
var currentUserData = {
	firstName : newName,
	lastName : newLastName,
	userName : newUser,
	school : newSchool,
	classRoom : newClass
}
localStorage.setItem(newUser, JSON.stringify(currentUserData));
var x = JSON.parse(localStorage.getItem('playerCollection'));
/*var newPlayer = JSON.parse(localStorage.getItem(newUser));
x.allMyPlayers.push(newPlayer);
x.playerCount += 1;
localStorage.setItem('playerCollection', JSON.stringify(x));*/
};

RocketReadingController.prototype.addGame = function (level, newName) {
"use strict";
var myLevel = this.allMyLevels[level],
	newGame = new Game (newName);
this.allMyGames.push (newGame);
this.gameCount += 1;
myLevel.allMyGames.push (newGame);
myLevel.gameCount += 1;
}

RocketReadingController.prototype.findLevel = function (name) {
	for (aLevel of this.allMyLevels) {
		if (aLevel.name = name) {
			return aLevel;
		}
	}
		alert("Level Not Found");
}

RocketReadingController.prototype.findGame = function (name) {
    "use strict";
    var aLevel;
	for (aLevel of this.allMyLevels) {
		for (aGame of aLevel.allMyGames) {
			if (aGame.name = name) {
				return aGame;
			}
		}
	};
		alert("Game Not Found");
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

/*
var CreatePlayerCollection = function (userName) {
"use strict"
var collectionProperties = {
	playerCount : 0,
	allMyPlayers : [],
}
localStorage.setItem(userName, JSON.stringify(collectionProperties))*/
