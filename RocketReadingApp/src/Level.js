var Level = function () {
this.gameCount = 0;
this.allMyGames = [];
};

Level.prototype.addGame = function (newName) {
"use strict";
var newGame = new Game( newName );
this.allMyGames.push (newGame);
this.gameCount += 1;
};
