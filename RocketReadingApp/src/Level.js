var Level = function (newName, newLevelNumber, newGames, newNumberGames, newAccessible) {
    this.description = newName || 'unnamed';
    this.levelNumber = newLevelNumber || 0;
    this.allMyGames = newGames || [];
    this.gameCount = newNumberGames || 0;
	this.accessible = newAccessible;
	return this;
};

Level.prototype.calculateScore = function () {
    this.levelScore = 0;
    for (aGame in this.allMyGames) {
        Level.levelScore += aGame.gameScore;
    }	
};

Level.prototype.addGame = function (newName, newList, myLevelName, newGameNumber, newAccessible) {
"use strict";
    var newGame = new Game( newName, newList, myLevelName, newGameNumber, newAccessible);
    /*JSON.parse(localStorage.getItem(this.name));*/
    this.allMyGames.push (newGame);
    this.gameCount += Number(1);
	//console.log(this);
    // Add the game to the file in LS which contains the data about the level
    /*localStorage.setItem(this.name, JSON.stringify(this));*/
};

Level.prototype.setAvatar = function (avatar) {
	this.myAvatar = avatar;
};

Level.prototype.getAvatar = function () {
	return this.myAvatar;
};

Level.prototype.getLevelNumber = function () {
	return this.levelNumber;
};

Level.prototype.getDescription = function () {
	return this.description;
};

Level.prototype.getMyLevels = function () {
	return this.allMyGames;
};