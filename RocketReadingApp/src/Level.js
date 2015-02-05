var Level = function (newName, newLevelNumber, newGames, newNumberGames) {
    this.name = newName || 'unnamed';
    this.levelNumber = newLevelNumber || 'No Level Number';
    this.allMyGames = newGames || [];
    this.gameCount = newNumberGames || 0;
};

Level.prototype.calculateScore = function () {
    this.levelScore = 0;
    for (aGame in this.allMyGames) {
        Level.levelScore += aGame.gameScore;
    }	
};

Level.prototype.addGame = function (newNumber, newList) {
"use strict";
    var newGame = new Game( newNumber, newList );
    /*JSON.parse(localStorage.getItem(this.name));*/
    this.allMyGames.push (newGame);
    this.gameCount += 1;
	console.log(this);
    // Add the game to the file in LS which contains the data about the level
    localStorage.setItem(this.name, JSON.stringify(this));
};
