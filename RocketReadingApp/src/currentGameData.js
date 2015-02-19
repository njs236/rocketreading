var CurrentGameData = function (newLevel, newGame, newWordList, newCurrentWord, newCurrentLevelGame, newSavedLevelGame, newGameScore, newGameMedals, newLastTestTime, newTotalGameTime, newWordsSoundsCorrect, newWordsSoundsIncorrect) {
    "use strict";
	this.myLevel = newLevel || {};
	this.myGame = newGame || {};
	this.myTimer = 0;
	this.wordList = newWordList || [];
    this.wordListCount = this.wordList.length;
	this.currentWord = newCurrentWord || null;
    this.completeWordList = [];
    this.currentLevelGame = newCurrentLevelGame || [];
    this.savedLevelGame = newSavedLevelGame || null;
    this.gameScore = newGameScore || 0;
    this.gameMedals = newGameMedals || [0,0,0];
    this.lastTestTime = newLastTestTime || 0;
    this.totalGameTime = newTotalGameTime|| 0;
    this.wordsSoundsCorrect = newWordsSoundsCorrect || [];
    this.wordsSoundsIncorrect = newWordsSoundsIncorrect || [];
	this.incorrectWord = null;
    
    return this;
};

CurrentGameData.prototype.passWord = function (word) {
    "use strict";
    this.currentWord = word;
};

CurrentGameData.prototype.passList = function (list) {
    "use strict";
    this.wordList = list;
};

CurrentGameData.prototype.getCompleteWordList = function () {
    "use strict";
	return this.completeWordList;
};

CurrentGameData.prototype.setCompleteWordList = function (list) {
    "use strict";
    this.completeWordList = list;
};

CurrentGameData.prototype.setCurrentLevel = function (level) {
    "use strict";
	this.myLevel = level;
};

CurrentGameData.prototype.setGameAndWordList = function (game) {
    "use strict";
	this.myGame = game;
	this.wordList = this.myGame.getWordList().slice(0);
	this.wordListCount = this.wordList.length;
};

CurrentGameData.prototype.setCurrentWord = function (currentWord) {
    "use strict";
    this.currentWord = currentWord;
};

CurrentGameData.prototype.getCurrentWord = function () {
    "use strict";
	return this.currentWord;
};

CurrentGameData.prototype.loadGame = function () {
    "use strict";
	return this.myGame;
};

CurrentGameData.prototype.getWordList = function () {
    "use strict";
	return this.wordList;
};

CurrentGameData.prototype.getCurrentLevel = function () {
    "use strict";
	return this.myLevel;
};

CurrentGameData.prototype.getCurrentGame = function () {
    "use strict";
	return this.myGame;
};

CurrentGameData.prototype.getMedalCounts = function () {
    "use strict";
	return this.gameMedals;
};

CurrentGameData.prototype.getWordsCompleted = function () {
    // Just need to get the words answered correctly value, because in each test the user will eventually correctly identify words if they initially incorrectly identify them (game rule idea)
    "use strict";
	return this.wordsSoundsCorrect.length;
};

CurrentGameData.prototype.getSavedLevelGame = function () {
    "use strict";
    return this.savedLevelGame;
};

CurrentGameData.prototype.setSavedLevelGame = function (levelGame) {
    "use strict";
    this.savedLevelGame = levelGame;
},

CurrentGameData.prototype.getWordListCount = function () {
	"use strict";
	return this.wordListCount;
};

CurrentGameData.prototype.getScore = function () {
	"use strict";
	return this.gameScore;
};

CurrentGameData.prototype.incrementTimer = function (milliseconds) {
    "use strict";
	this.myTimer += Number(milliseconds);
};

CurrentGameData.prototype.clearMyTimer = function () {
    "use strict";
	this.myTimer = 0;
};

CurrentGameData.prototype.getTimer = function () {
    "use strict";
	return this.myTimer;
};

CurrentGameData.prototype.getCurrentWord = function () {
    "use strict";
	return this.currentWord;
};

CurrentGameData.prototype.setScore = function (score) {
    "use strict";
	this.gameScore += score;
};

CurrentGameData.prototype.setMedal = function (attr) {
    "use strict";
	if (attr === 'gold') {
		this.gameMedals[0] += 1;
	} else if (attr === 'silver') {
		this.gameMedals[1] += 1;
	} else if (attr === 'bronze') {
		this.gameMedals[2] += 1;
	}
};

CurrentGameData.prototype.saveGameTime = function () {
    "use strict";
    this.totalGameTime = gameTimerSecs;
};

CurrentGameData.prototype.addToWordSoundsCorrect = function (word){
    "use strict";
	this.wordsSoundsCorrect.push(word);
}

CurrentGameData.prototype.getWordListLength = function () {
    "use strict";
	return this.wordList.length;
}

CurrentGameData.prototype.getIndexOfWord = function (word) {
    "use strict";
    return this.wordList.indexOf(word);
};

CurrentGameData.prototype.setCurrentLevelGame = function (levelGame) {
    "use strict";
    this.currentLevelGame = levelGame;
};

CurrentGameData.prototype.getCurrentLevelGame = function () {
    "use strict";
    return this.currentLevelGame;
};

CurrentGameData.prototype.setIncorrectWord = function (word) {
    "use strict";
	this.incorrectWord = word;
};

CurrentGameData.prototype.getIncorrectWord = function () {
    "use strict";
	return this.incorrectWord;
};

CurrentGameData.prototype.addWordsSoundsIncorrect = function (word) {
    "use strict";
    this.wordsSoundsIncorrect.push(word);
};    