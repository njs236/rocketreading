var Game = function (newName, newList, myLevelName, newGameNumber, newAccessible) {
	this.gameNumber = newGameNumber || null;
    this.gameName = newName || 'unnamed';
    this.myWordList = newList || [];
	this.levelName = myLevelName;
    this.accessible = newAccessible;
	return this;
};

Game.prototype.getNumber = function () {
	return this.gameNumber;
};

Game.prototype.getWordList = function () {
	return this.myWordList;
};

Game.prototype.getGameName = function () {
	return this.gameName;
};

Game.prototype.setAccessTo = function (bool) {
    this.accessible = bool;
}

Game.prototype.getAccessibility = function () {
    return this.accessible;
}