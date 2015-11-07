var Player = function (newUser, newFirstName, newLastName, newSchool, newClassRoom,  newTotalScore, newLevelGameReached, newBonusGameReached, newPointsToPassLevel, newSavedLevelGame, newSavedGameData) {
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
    this.savedLevelGame = newSavedLevelGame || null;
    this.savedGameData = newSavedGameData || {};
    this.badges = [];
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

Player.prototype.setBadges = function (newBadges) {

//	I can't get a length of an array of objects. newBadges is an array of objects
	console.log(newBadges);
	console.log(newBadges[0]);
	var length = 0;
	while (newBadges[length] != undefined) {
		length++;
	}
	console.log(length);
	for (n=0; n < length; n++) {
		badge = new UserBadge(newBadges[n].badgeId, newBadges[n].date);
		this.badges.push(badge);
		this.badges.sort(function (a,b) {
            if (a.getDate() < b.getDate()) {
                return 1;
            }
                return 0;
        })
	}
    
};

Player.prototype.findBadgeById = function (id) {
var n;
    for (n=0; n < this.badges.length; n++) {
        if (this.badges[n].getId() == id ) {
            return true;
        }
    }
    return false;
};

Player.prototype.setLevelGameReached = function (temp) {
    "use strict";
    this.levelGameReached = [];
    this.levelGameReached.push(temp[0]);
    this.levelGameReached.push(temp[1]);
};

Player.prototype.addBadge = function (badgeId) {
    badge = new UserBadge(badgeId, Date());
    this.badges.push (badge);
		this.badges.sort(function (a,b) {
            if (a.getDate() < b.getDate()) {
                return 1;
            }
                return 0;
        })
};

Player.prototype.getBadges = function () {
    return this.badges;
} ;

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
};

Player.prototype.setSavedLevelGame = function (levelGame) {
    "use strict";
    this.savedLevelGame = levelGame;
},

Player.prototype.getSavedLevelGame = function () {
    "use strict";
    return this.savedLevelGame;
};

Player.prototype.addSavedGameData = function (newLevel, newGame, newWordList, newCurrentWord, newCurrentLevelGame, newGameScore, newGameMedals, newLastTestTime, newTotalGameTime, newWordsSoundsCorrect, newWordsSoundsIncorrect, newIncorrectWord) {
    "use strict";
    this.savedGameData = new CurrentGameData(newLevel, newGame, newWordList, newCurrentWord, newCurrentLevelGame, newGameScore, newGameMedals, newLastTestTime, newTotalGameTime, newWordsSoundsCorrect, newWordsSoundsIncorrect, newIncorrectWord);
};

Player.prototype.getSavedGameData = function () {
    "use strict";
    return this.savedGameData;
};