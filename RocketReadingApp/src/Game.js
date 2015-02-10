var Game = function (newName, newList, myLevelName) {
    this.gameName = newName || 'unnamed';
    this.myWordList = newList || [];
	this.levelName = myLevelName;
	return this;
};

Game.prototype.setNameAsNumber = function () {
	var number;
	number = Number(this.gameName.slice(this.gameName.search(/[1-9]/), this.gameName.length));
	return number;
}

Game.prototype.getWordList = function () {
	return this.myWordList;
}