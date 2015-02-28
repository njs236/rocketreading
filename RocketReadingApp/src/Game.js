var Game = function (newName, newList, myLevelName, newGameNumber, newAccessible, newBonusGameCompleted /*, newHighScore*/) {
    "use strict";
	this.gameName = newName || 'unnamed';
    this.myWordList = newList || [];
	this.levelName = myLevelName || 'unnamed';
    this.gameNumber = newGameNumber || null;
    this.accessible = newAccessible || false;
    // this.highScore = newHighScore || 0;
    this.bonusGameCompleted = newBonusGameCompleted || false;
	return this;
};

Game.prototype.getNumber = function () {
    "use strict";
	return this.gameNumber;
};

Game.prototype.getWordList = function () {
    "use strict";
	return this.myWordList;
};

Game.prototype.getGameName = function () {
    "use strict";
	return this.gameName;
};

Game.prototype.setAccessTo = function (bool) {
    "use strict";
    this.accessible = bool;
}

Game.prototype.getAccessibility = function () {
    "use strict";
    return this.accessible;
};

Game.prototype.updateHighScore = function () {
    "use strict";
    var comparison = rocketReadingModel.getCurrentGameData().getGameScore();
    if (comparison > this.highScore) {
        this.highScore = comparison;
    };
};

Game.prototype.setCompletion = function () {
    "use strict";
    this.bonusGameCompleted = true;
}

Game.prototype.getCompletion = function () {
    "use strict";
    return this.bonusGameCompleted;
}