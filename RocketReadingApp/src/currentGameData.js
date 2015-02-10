var CurrentGameData = function (newCurrentLevelGame, newGameScore, newGameMedals, newLastTestTime, newTotalGameTime, newWordsSoundsCorrect, newWordsSoundsIncorrect, newLevel) {
    "use strict";
    this.currentLevelGame = newCurrentLevelGame;
    this.gameScore = newGameScore;
    this.gameMedals = newGameMedals;
    this.lastTestTime = newLastTestTime;
    this.totalGameTime = newTotalGameTime;
    this.wordsSoundsCorrect = newWordsSoundsCorrect;
    this.wordsSoundsIncorrect = newWordsSoundsIncorrect;
    this.myLevel = newLevel;
    // Have to return 'this' and not 'currentGameData' - that's the name of the var
    // return this;
};

CurrentGameData.prototype.passWord = function (word) {
    this.currentWord = word;
};

CurrentGameData.prototype.passList = function (list) {
    this.wordList = list;
};

CurrentGameData.prototype.setCurrentLevel = function (level) {
    "use strict";
	this.myLevel = level;
};

CurrentGameData.prototype.setCurrentGame = function (game) {
	this.myGame = game;
};

CurrentGameData.prototype.loadGame = function () {
	return this.myGame;
};