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
    this.currentGameData = {};
    this.allGamesData = {};
    
    return this;
};

Player.prototype.getLevelGameReached = function () {
    "use strict";
    return this.levelGameReached;
};

Player.prototype.setLevelGameReached = function () {
    "use strict";
    // Happy Day Scenario
    var level = rocketReadingModel.getCurrentGameData().getCurrentLevel(),
    game = rocketReadingModel.getCurrentGameData().getCurrentGame();
    if (game.gameNumber === level.allMyGames.length) {
        this.levelGameReached[0] += 1;
        this.levelGameReached[1] = 1;
    } else {
        
    }
};

Player.prototype.getPointsToPassLevel = function () {
    return this.pointsToPassLevel;
}

Player.prototype.getUserName = function () {
    return this.userName;
}