var Level = function (newName, newLevelNumber, newGames, newNumberGames) {
    this.name = newName || 'unnamed';
    this.levelNumber = newLevelNumber || 0;
    this.allMyGames = newGames || [];
    this.gameCount = newNumberGames || 0;
	
	return this;
};

Level.prototype.calculateScore = function () {
    this.levelScore = 0;
    for (aGame in this.allMyGames) {
        Level.levelScore += aGame.gameScore;
    }	
};

Level.prototype.addGame = function (newName, newList, myLevelName) {
"use strict";
    var newGame = new Game( newName, newList, myLevelName );
    /*JSON.parse(localStorage.getItem(this.name));*/
    this.allMyGames.push (newGame);
    this.gameCount += Number(1);
	console.log(this);
    // Add the game to the file in LS which contains the data about the level
    /*localStorage.setItem(this.name, JSON.stringify(this));*/
};

Level.prototype.setAvatar = function (avatar) {
	this.myAvatar = avatar;
}