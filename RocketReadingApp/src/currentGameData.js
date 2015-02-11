var CurrentGameData = function (newLevel, newGame, newWordList, newCurrentWord, newCurrentLevelGame, newGameScore, newGameMedals, newLastTestTime, newTotalGameTime, newWordsSoundsCorrect, newWordsSoundsIncorrect) {
    "use strict";
	this.myLevel = newLevel || {};
	this.myGame = newGame || {};
	this.wordList = newWordList || "wordList1";
	this.currentWord = newCurrentWord || null;
    this.currentLevelGame = newCurrentLevelGame || [1,1];
    this.gameScore = newGameScore || 0;
    this.gameMedals = newGameMedals || [0,0,0];
    this.lastTestTime = newLastTestTime || 0;
    this.totalGameTime = newTotalGameTime|| 0;
    this.wordsSoundsCorrect = newWordsSoundsCorrect || [];
    this.wordsSoundsIncorrect = newWordsSoundsIncorrect || [];
    // Have to return 'this' and not 'currentGameData' - that's the name of the var
    //return this;
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
};

CurrentGameData.prototype.getWordList = function () {
	return this.wordList;
};

CurrentGameData.prototype.getCurrentLevel = function () {
	return this.myLevel;
};

CurrentGameData.prototype.getCurrentGame = function () {
	return this.myGame;
};

CurrentGameData.prototype.getMedalCounts = function () {
	return this.gameMedals;
};

CurrentGameData.prototype.getWordsCompleted = function () {
    // Just need to get the words answered correctly value, because in each test the user will eventually correctly identify words if they initially incorrectly identify them (game rule idea)
    "use strict";
	return this.wordsSoundsCorrect.length;
};

CurrentGameData.prototype.getWordListCount = function () {
	"use strict";
	return this.wordList.length;
};

CurrentGameData.prototype.getScore = function () {
	"use strict";
	return this.gameScore;
};