var Level = function (newName) {
this.name = newName || 'unnamed';
this.gameCount = 0;
this.allMyGames = [];
};

Level.prototype.calculateScore = function () {
this.levelScore = 0;
for (aGame in this.allMyGames) {
	Level.levelScore += aGame.gameScore;
}	
};

Level.prototype.addGame = function (newName) {
"use strict";
var newGame = new Game( newName );
this.allMyGames.push (newGame);
this.gameCount += 1;
};
