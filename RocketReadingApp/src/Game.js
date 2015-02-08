var Game = function (newNumber, newList, myLevel) {
    this.gameNumber = newNumber || 'unnamed';
    this.myWordList = newList || [];
	this.level = myLevel;
	
	return this;
};

