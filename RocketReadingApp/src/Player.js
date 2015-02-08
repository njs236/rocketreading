var Player = function (newUser, newFirstName, newLastName, newSchool, newClassRoom,  newTotalScore, newLevelGameReached, newBonusGameReached, newPointsToPassLevel) {
    "use strict";
    // If 'this' is used instead of 'player' does this mean that the object will be a global var and will not need to be returned? 
    this.userName = newUser || 'user';
    this.firstName = newFirstName || 'unnamed';
    this.lastName = newLastName || 'unlastnamed';
    this.school = newSchool || 'school';
    this.classRoom = newClassRoom || 'class';
    this.totalScore = newTotalScore || 0;
    this.levelGameReached = newLevelGameReached || '';
    this.bonusGameReached = newBonusGameReached || '';
    this.pointsToPassLevel = newPointsToPassLevel || '';
    
    return this;
};

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
    return this;
};

var allGamesData = function (newLevel1Game1, newLevel1Game2, newLevel1Game3, newLevel1Game4, newLevel2Game1, newLevel2Game2, newLevel2Game3, newLevel2Game4, newLevel3Game1, newLevel3Game2, newLevel3Game3, newLevel3Game4, newLevel4Game1,  newLevel4Game2, newLevel4Game3, newLevel4Game4, newLevel5Game1, newLevel5Game2, newLevel5Game3, newLevel5Game4, newLevel6Game1, newLevel6Game2, newLevel6Game3, newLevel6Game4, newBonusGame1, newBonusGame2, newBonusGame3, newBonusGame4, newBonusGame5, newBonusGame6) {
    "use strict";
    this.level1Game1 = newLevel1Game1;
    this.level1Game2 = newLevel1Game2;
    this.level1Game3 = newLevel1Game3;
    this.level1Game4 = newLevel1Game4;
    this.level2Game1 = newLevel2Game1;
    this.level2Game2 = newLevel2Game2;
    this.level2Game3 = newLevel2Game3;
    this.level2Game4 = newLevel2Game4;
    this.level3Game1 = newLevel3Game1;
    this.level3Game2 = newLevel3Game2;
    this.level3Game3 = newLevel3Game3;
    this.level3Game4 = newLevel3Game4;
    this.level4Game1 = newLevel4Game1;
    this.level4Game2 = newLevel4Game2;
    this.level4Game3 = newLevel4Game3;
    this.level4Game4 = newLevel4Game4;
    this.level5Game1 = newLevel5Game1;
    this.level5Game2 = newLevel5Game2;
    this.level5Game3 = newLevel5Game3;
    this.level5Game4 = newLevel5Game4;
    this.level6Game1 = newLevel6Game1;
    this.level6Game2 = newLevel6Game2;
    this.level6Game3 = newLevel6Game3;
    this.level6Game4 = newLevel6Game4;
    this.bonusGame1 = newBonusGame1;
    this.bonusGame2 = newBonusGame2;
    this.bonusGame3 = newBonusGame3;
    this.bonusGame4 = newBonusGame4;
    this.bonusGame5 = newBonusGame5;
    this.bonusGame6 = newBonusGame6;
    
    return this;
};

//setAllGamesData

var updateAllGamesData = function (username, gameData) {
    "use strict";
    var playerData = JSON.parse(localStorage.getItem(username));
    playerData.allGamesData.gameData.currentLevelGame.push(gameData);
    localStorage.setItem(username, JSON.stringify(playerData));
};

// itemAndTime may be a global var
var updateCurrentGameCorrectWords = function (itemAndTime) {
    "use strict";
    var playerData = JSON.parse(localStorage.getItem(player.username));
    playerData.currentGameData.wordsSoundsCorrect.push(itemAndTime);
    localStorage.setItem(username, JSON.stringify(playerData));
};

// itemAndBadAttempts may be a global var
var updateCurrentGamesIncorrectWords = function (itemAndBadAttempts) {
    "use strict";
    var playerData = JSON.parse(localStorage.getItem(player.username));
    playerData.currentGameData.wordsSoundsCorrect.push(itemAndBadAttempts);
    localStorage.setItem(username, JSON.stringify(playerData));
};

var updateScore = function () {
    "use strict";
    
};