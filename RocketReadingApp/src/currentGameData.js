var currentGameData = function (newCurrentLevelGame, newGameScore, newGameMedals, newLastTestTime, newTotalGameTime, newWordsSoundsCorrect, newWordsSoundsIncorrect) {
    "use strict";
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

currentGameData.prototype.passWord = function (word) {
    this.currentWord = word;
}

currentGameData.prototype.passList = function (list) {
    this.wordList = list;
}