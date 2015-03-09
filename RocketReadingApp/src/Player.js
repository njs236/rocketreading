var Player = function (newUser, newFirstName, newLastName, newSchool, newClassRoom,  newTotalScore, newLevelGameReached, newBonusGameReached, newPointsToPassLevel) {
    "use strict";
    // If 'this' is used instead of 'player' does this mean that the object will be a global var and will not need to be returned? 
    this.userName = newUser || null;
    this.firstName = newFirstName || 'unnamed';
    this.lastName = newLastName || 'unlastnamed';
    this.school = newSchool || 'school';
    this.classRoom = newClassRoom || 'class';
    this.totalScore = newTotalScore || 0;
    this.levelGameReached = newLevelGameReached || '';
    this.bonusGameReached = newBonusGameReached || '';
    this.pointsToPassLevel = newPointsToPassLevel || '';
    // The following properties belong to Player, but are created in the course of a game
    // this.highScores = newHighScores || {};
    // this.currentGameData = {};
    // this.allGamesData = {};
    
    return this;
};

Player.prototype.getLevelGameReached = function () {
    "use strict";
    return this.levelGameReached;
};

Player.prototype.setLevelGameReached = function (temp) {
    "use strict";
    this.levelGameReached = [];
    this.levelGameReached.push(temp[0]);
    this.levelGameReached.push(temp[1]);
};

Player.prototype.getPointsToPassLevel = function () {
    "use strict";
    return this.pointsToPassLevel;
};

Player.prototype.getUserName = function () {
    "use strict";
    return this.userName;
};

Player.prototype.getAllGamesData = function () {
    "use strict";
    return this.allGamesData;
};

Player.prototype.setAllGamesData = function (dataObject) {
    "use strict";
    this.allGamesData = dataObject;
};

Player.prototype.getCurrentGameData = function () {
    "use strict";
    return this.currentGameData;
};

Player.prototype.setCurrentGameData = function (dataObject) {
    "use strict";
    this.currentGameData = dataObject;
};

Player.prototype.addHighScores = function (newBonusGame1HS, newBonusGame2HS, newBonusGame3HS, newBonusGame4HS, newBonusGame5HS, newBonusGame6HS, newLevel1Game1HS, newLevel1Game2HS, newLevel1Game3HS, newLevel1Game4HS, newLevel2Game1HS, newLevel2Game2HS, newLevel2Game3HS, newLevel2Game4HS, newLevel3Game1HS, newLevel3Game2HS, newLevel3Game3HS, newLevel3Game4HS, newLevel4Game1HS, newLevel4Game2HS, newLevel4Game3HS, newLevel4Game4HS, newLevel5Game1HS, newLevel5Game2HS, newLevel5Game3HS, newLevel5Game4HS, newLevel6Game1HS, newLevel6Game2HS, newLevel6Game3HS, newLevel6Game4HS) {
    "use strict";
    var newHighScores = new HighScores(newBonusGame1HS, newBonusGame2HS, newBonusGame3HS, newBonusGame4HS, newBonusGame5HS, newBonusGame6HS, newLevel1Game1HS, newLevel1Game2HS, newLevel1Game3HS, newLevel1Game4HS, newLevel2Game1HS, newLevel2Game2HS, newLevel2Game3HS, newLevel2Game4HS, newLevel3Game1HS, newLevel3Game2HS, newLevel3Game3HS, newLevel3Game4HS, newLevel4Game1HS, newLevel4Game2HS, newLevel4Game3HS, newLevel4Game4HS, newLevel5Game1HS, newLevel5Game2HS, newLevel5Game3HS, newLevel5Game4HS, newLevel6Game1HS, newLevel6Game2HS, newLevel6Game3HS, newLevel6Game4HS);
    this.highScores = newHighScores;
};

Player.prototype.checkHighScore = function (levelNumber, gameNumber) {
    "use strict";
    var comparison = rocketReadingModel.getCurrentGameData().getGameScore();
    if (comparison > this.highScores.getHighScore(levelNumber, gameNumber)) {
        console.log("checkHighScore(): current high score = " + this.highScores.getHighScore(levelNumber, gameNumber));
        this.highScores.setHighScore(levelNumber, gameNumber, comparison);
    }  
};

Player.prototype.calculateSumHighScores = function (levelNumber) {
    "use strict";
    var count,
        sum = 0,
        numGamesInLevel = rocketReadingModel.findLevelByNumber(levelNumber).getAllGames().length;
    for (count = 1; count <= numGamesInLevel; count += 1) {
        sum += this.highScores.getHighScore(levelNumber, count);
    }
    console.log("calculateSumHighScores(): " + sum);
    return sum;
};

Player.prototype.getHighScores = function () {
    "use strict";
    return this.highScores;
}
