var Game = function (newName, newList, myLevelName) {
    this.gameName = newName || 'unnamed';
    this.myWordList = newList || [];
	this.levelName = myLevelName;
};