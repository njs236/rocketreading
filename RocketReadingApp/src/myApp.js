var Myapp = function() {
this.levelCount = 0;
this.allMyLevels = [];
this.playerCount = 0;
this.allMyPlayers = [];
};

Myapp.prototype.addLevel = function() {
"use strict";
var newLevel = new Level();
this.allMyLevels.push (newLevel);
this.levelCount += 1;
}

Myapp.prototype.addPlayer = function (newName, newUser) {
"use strict";
var newPlayer = new Player ();
this.allMyPlayers.push (newPlayer);
this.playerCount += 1;
}

Myapp.prototype.addGame = function (list, newName) {
"use strict";
var myList = list || {},
	newGame = new Game ();
this.allMyGames.push (newGame);
this.gameCount += 1;
}

Myapp.prototype.findLevel = function (place) {
return this.allMyLevels[place];
}

Myapp.prototype.addList = function (level, game, inputlist) {
"use strict";

//This is a reference to the game that the List is part of.
myGame = Myapp.allMyLevels[level].allMyGames[game]
var wordsArray = inputlist.split(',');
//This is relating the game to the List and feeding in an CSV line.
var newList = new List(myGame, wordsArray);
this.allMyLists.push (newList);
this.listCount += 1;
}