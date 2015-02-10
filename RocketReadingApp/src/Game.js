var Game = function (newName, newList, myLevelName, newGameNumber) {
	this.gameNumber = newGameNumber || null;
    this.gameName = newName || 'unnamed';
    this.myWordList = newList || [];
	this.levelName = myLevelName;
	return this;
};

Game.prototype.getNumber = function () {
	return this.gameNumber;
};

Game.prototype.getWordList = function () {
	return this.myWordList;
};