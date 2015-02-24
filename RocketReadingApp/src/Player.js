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
    //this.currentGameData = {};
    //this.allGamesData = {};
    
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
