var CurrentGameData = function (newCurrentLevelGame, newGameScore, newGameMedals, newLastTestTime, newTotalGameTime, newWordsSoundsCorrect, newWordsSoundsIncorrect) {
    "use strict";
	this.myLevel = {};
	this.myGame = {};
	this.wordList = [];
	this.currentWord = '';
    this.currentLevelGame = newCurrentLevelGame;
    this.gameScore = newGameScore;
    this.gameMedals = newGameMedals;
    this.lastTestTime = newLastTestTime;
    this.totalGameTime = newTotalGameTime;
    this.wordsSoundsCorrect = newWordsSoundsCorrect;
    this.wordsSoundsIncorrect = newWordsSoundsIncorrect;
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
	this.wordList = this.myGame.getWordList();
};

CurrentGameData.prototype.loadGame = function () {
	return this.myGame;
}

CurrentGameData.prototype.getWordList = function () {
	return this.wordList;
}

CurrentGameData.prototype.getCurrentLevel = function () {
	return this.myLevel;
}

CurrentGameData.prototype.getCurrentGame = function () {
	return this.myGame;
}

CurrentGameData.prototype.getMedalCounts = function () {
	return this.gameMedals;
}

CurrentGameData.prototype.getWordsCompleted = function () {
	var wordsCompleted = this.wordsSoundsCorrect.length +  this.wordsSoundsIncorrect.length;
	return wordsCompleted;
}

CurrentGameData.prototype.getWordListCount = function () {
	var wordListCount = this.wordList.length;
	return wordListCount;
}