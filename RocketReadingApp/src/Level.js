var Level = function (newDescription, newLevelNumber, newGames, newNumberGames, newAccessible) {
    this.description = newDescription || 'unnamed';
    this.levelNumber = newLevelNumber || 0;
    this.allMyGames = newGames || [];
    this.gameCount = newNumberGames || 0;
	this.accessible = newAccessible;
    //this.myAvatar 
    
	return this;
};

Level.prototype.calculateScore = function () {
    var temp = 0;
    for (aGame of this.allMyGames ){
        temp += aGame.highScore
    };
    console.log("Total scores of level: " + temp);
    return temp;
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

Level.prototype.setAllGames = function (allGames) {
    "use strict";
    this.allMyGames = allGames;
};

Level.prototype.getAllGames = function () {
    return this.allMyGames;
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

Level.prototype.getMyGames = function () {
	return this.allMyGames;
};

Level.prototype.setAccessTo = function (bool) {
    this.accessible = bool;
};

Level.prototype.getAccessibility = function () {
    return this.accessible;
};