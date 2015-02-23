var RocketReadingModel = function() {
	this.levelCount = 0;
	this.allMyLevels = [];
    this.name = "MyRocketReadingApp";
    this.listCount = 0
    this.allMyLists = [];
    this.playerCount = 0;
    this.myPlayer = {};
	this.myCurrentGameData = {};
	this.myAllGamesData = {};
	this.allMyAvatars = [];
	this.avatarCount = 0;
    this.levelThreshold = 450;
};

    // A single instance of the Rocket Reading Model is instantiated
rocketReadingModel = new RocketReadingModel();


RocketReadingModel.prototype.addLevel = function (newDescription, newLevelNumber, newGames, newNumberGames, newAccessible) {
    "use strict";
    var newLevel = new Level(newDescription, newLevelNumber, newGames, newNumberGames, newAccessible);
    this.allMyLevels.push (newLevel);
    this.levelCount += Number(1);
};

RocketReadingModel.prototype.getAllLevels = function () {
    "use strict";
    return this.allMyLevels;
};

RocketReadingModel.prototype.addCurrentGameData = function (newLevel, newGame, newWordList, newCurrentWord, newCurrentLevelGame, newSavedLevelGame, newGameScore, newGameMedals, newLastTestTime, newTotalGameTime, newWordsSoundsCorrect, newWordsSoundsIncorrect) {
	var newCurrentGameData = new CurrentGameData(newLevel, newGame, newWordList, newCurrentWord, newCurrentLevelGame, newSavedLevelGame, newGameScore, newGameMedals, newLastTestTime, newTotalGameTime, newWordsSoundsCorrect, newWordsSoundsIncorrect);
	this.myCurrentGameData = newCurrentGameData;
};

RocketReadingModel.prototype.getCurrentGameData = function () {
	"use strict";
    return this.myCurrentGameData;
};

RocketReadingModel.prototype.clearCurrentGameData = function () {
    "use strict";
    this.myCurrentGameData = {};
};

RocketReadingModel.prototype.getBonusGame = function (levelNumber) {
    var level = rocketReadingModel.findLevelByNumber(0),
    aGame;
    for (aGame of level.getAllGames) {
        if (aGame.gameNumber === levelNumber) {
            return aGame;
        }
    };
};

RocketReadingModel.prototype.addAllGamesData = function (newLevel1Game1, newLevel1Game2, newLevel1Game3, newLevel1Game4, newLevel2Game1, newLevel2Game2, newLevel2Game3, newLevel2Game4, newLevel3Game1, newLevel3Game2, newLevel3Game3, newLevel3Game4, newLevel4Game1,  newLevel4Game2, newLevel4Game3, newLevel4Game4, newLevel5Game1, newLevel5Game2, newLevel5Game3, newLevel5Game4, newLevel6Game1, newLevel6Game2, newLevel6Game3, newLevel6Game4, newBonusGame1, newBonusGame2, newBonusGame3, newBonusGame4, newBonusGame5, newBonusGame6) {
    "use strict";
    //These are purely for memory basis, when you load the program and there is no player Data. But it's also used to load into local storage when registering a player. 
	var newAllGamesData = new AllGamesData(newLevel1Game1, newLevel1Game2, newLevel1Game3, newLevel1Game4, newLevel2Game1, newLevel2Game2, newLevel2Game3, newLevel2Game4, newLevel3Game1, newLevel3Game2, newLevel3Game3, newLevel3Game4, newLevel4Game1,  newLevel4Game2, newLevel4Game3, newLevel4Game4, newLevel5Game1, newLevel5Game2, newLevel5Game3, newLevel5Game4, newLevel6Game1, newLevel6Game2, newLevel6Game3, newLevel6Game4, newBonusGame1, newBonusGame2, newBonusGame3, newBonusGame4, newBonusGame5, newBonusGame6);
	this.myAllGamesData = newAllGamesData;
};

RocketReadingModel.prototype.getAllGamesData = function () {
	return this.myAllGamesData;
};


RocketReadingModel.prototype.registerPlayer = function (newUser, newFirstName, newLastName, newSchool, newClassRoom, newTotalScore, newLevelReached, newBonusGameReached, newPointsToPassLevel) {
    "use strict";
    var newPlayer = new Player(newUser, newFirstName, newLastName, newSchool, newClassRoom, newTotalScore, newLevelReached, newBonusGameReached, newPointsToPassLevel);
	newPlayer.currentGameData = this.myCurrentGameData;
	newPlayer.allGamesData = this.myAllGamesData;
    // Save the player in local storage
    storageController.registerPlayer(newPlayer);
};


RocketReadingModel.prototype.setPlayer = function (player) {
    "use strict";
    var newPlayer = new Player(player.userName, player.firstName, player.lastName, player.school, player.class, player.totalScore, player.levelGameReached, player.bonusGameReached, player.pointsToPassLevel),
    
    newAllGamesData = new AllGamesData(player.allGamesData.level0Game1, player.allGamesData.level0Game2, player.allGamesData.level0Game3, player.allGamesData.level0Game4, player.allGamesData.level0Game5,  player.allGamesData.level0Game6, player.allGamesData.level1Game1, player.allGamesData.level1Game2, player.allGamesData.level1Game3, player.allGamesData.level1Game4, player.allGamesData.level2Game1, player.allGamesData.level2Game2, player.allGamesData.level2Game3, player.allGamesData.level2Game4, player.allGamesData.level3Game1, player.allGamesData.level3Game2, player.allGamesData.level3Game3, player.allGamesData.level3Game4, player.allGamesData.level4Game1,  player.allGamesData.level4Game2, player.allGamesData.level4Game3, player.allGamesData.level4Game4, player.allGamesData.level5Game1, player.allGamesData.level5Game2, player.allGamesData.level5Game3, player.allGamesData.level5Game4, player.allGamesData.level6Game1, player.allGamesData.level6Game2, player.allGamesData.level6Game3, player.allGamesData.level6Game4 ),
    
    newCurrentGameData = new CurrentGameData(player.currentGameData.myLevel, player.currentGameData.myGame, player.currentGameData.wordList, player.currentGameData.currentWord, player.currentGameData.currentLevelGame, player.currentGameData.savedLevelGame, player.currentGameData.gameScore, player.currentGameData.gameMedals, player.currentGameData.lastTestTime, player.currentGameData.totalGameTime, player.currentGameData.wordsSoundsCorrect, player.currentGameData.wordsSoundsIncorrect);
	
    this.myPlayer = newPlayer;
    this.myAllGamesData = newAllGamesData;
    this.myCurrentGameData = newCurrentGameData;
    //console.log("RocketReadingModel.setPlayer() level reached - " + rocketReadingModel.getMyPleyer());
};

RocketReadingModel.prototype.getMyPlayer = function () {
	return this.myPlayer;
};


RocketReadingModel.prototype.findLevelByName = function (name) {
    "use strict";
    var aLevel;
	for (aLevel of this.allMyLevels) {
		if (aLevel.description === name) {
            // This should be outputted from the viewController module
            console.log("findLevel() - Have found: " + aLevel + ". Level name: " + aLevel.description); // test
            console.log("findLevel() - Level " + aLevel.name + "'s allMyGames: " + aLevel.allMyGames); // test
			return aLevel;
		}
	}
    alert("Level Not Found");
};

RocketReadingModel.prototype.findLevelByNumber = function (levelNumber) {
    "use strict";
    var aLevel;
	for (aLevel of this.allMyLevels) {
		if (aLevel.levelNumber === levelNumber) {
            // This should be outputted from the viewController module
            console.log("findLevel() - Have found: " + aLevel + ". Level name: " + aLevel.description); // test
            console.log("findLevel() - Level " + aLevel.description + "'s allMyGames: " + aLevel.allMyGames); // test
			return aLevel;
		}
	}
    alert("Level Not Found");
};

RocketReadingModel.prototype.findGameByNumber = function (number) {
    "use strict";
    var aLevel = this.getCurrentGameData().getCurrentLevel(),
	aGame;
    for (aGame of aLevel.allMyGames) {
		if (aGame.getNumber() === number) {
		console.log("aGame:" + aGame);
			return aGame;
		}
	}
		alert("Game Not Found");
};

/*RocketReadingModel.prototype.findGame = function (levelName, name) {
    "use strict";
    var aLevel = this.findLevel(levelName);
    for (aGame of aLevel.allMyGames) {
        if (aGame.name === name) {
			return aGame;
		}
	}
}    
*/

RocketReadingModel.prototype.findNumGamesOfLevel = function (levelNumber) {
    "use strict";
    /*var aLevel = this.findLevel(levelName);
	return aLevel.gameCount;*/
    // Should a get method be used to access the gameCount once the level has been found?
    return Number(this.findLevelByNumber(levelNumber).gameCount);
	alert("Number of games not found");
};

RocketReadingModel.prototype.findLevelGamesNames = function (levelNumber) {
    "use strict";
    var count,
        gameNames = [],
        theLevel = this.findLevelByNumber(levelNumber);
        // gamesLength = this.findLevel(levelName).allMyGames.length;
    for (count = 0; count < (theLevel.gameCount); count += 1) {
        gameNames.push(theLevel.allMyGames[count].gameName);
    }
    return gameNames;
};

RocketReadingModel.prototype.getAllGamesFromLevel = function (inputLevelNumber) {
	"use strict"
	// Function returns a collection of games from a found level
	return this.findLevelByNumber(inputLevelNumber).getMyLevels();
};


RocketReadingModel.prototype.addList = function (level, game, inputlist) {
"use strict";
    //This is a reference to the game that the List is part of.
    myGame = RocketReadingModel.allMyLevels[level].allMyGames[game]
    var wordsArray = inputlist.split(',');
    //This is relating the game to the List and feeding in an CSV line.
    var newList = new List(myGame, wordsArray);
    this.allMyLists.push (newList);
    this.listCount += 1;
};

RocketReadingModel.prototype.findLevelGamesLists = function (levelName, gameName) {
    "use strict";
    var aGame,
        result = [],
        theLevel = this.findLevelByName(levelName);  
    result[0] = levelName;
    result[1] = gameName;
    for (aGame of theLevel.allMyGames) {
        if (aGame.gameName === gameName) {
            result[2] = aGame.myWordList;
			return result;
		}
	}
};

// Adding a student's current data to the student's allGamesData property, and also saving this data to the players' LS file
RocketReadingModel.prototype.setCurrentGameData = function (playerIndex, levelGame) {
    "use strict";
    var levelGame = "level" + levelGame[0] + "Game" + levelGame[1],
        studentData = JSON.parse(localStorage.getItem(myPlayer.userName));
        console.log("aPlayer: " + myPlayer);
        console.log(" Adding current game data - aPlayer.allGamesData: " + aPlayer.allGamesData);
        console.log("studentData: " + studentData);
    switch (levelGame) {
        case ("level1Game1"): 
            myPlayer.allGamesData.level1Game1.push(this.allMyPlayers[playerIndex].currentGameData);
            break;
        // There would need to be case statements for all of the other level-stages too
    }
    
    // This data should also be saved to LS too
    studentData.allGamesData.level1Game1.push(this.allMyPlayers[playerIndex].currentGameData);
    /*localStorage.setItem(aPlayer.userName, JSON.stringify(studentData));*/
};

RocketReadingModel.prototype.addAvatar = function (newName, myLevel) {
	var newAvatar = new Avatar (newName, myLevel);
	this.allMyAvatars.push (newAvatar);
	this.avatarCount += 1;
	myLevel.setAvatar(newAvatar);
};

RocketReadingModel.prototype.getAvatar = function (number) {
    // Having getAvatar at the end - circular function call?
	return this.findLevelByNumber(number).getAvatar;
};

RocketReadingModel.prototype.passWord = function (word) {
	myCurrentGameData.passWord(word);
};

RocketReadingModel.prototype.saveGameTime = function () {
    "use strict";
    this.getCurrentGameData().saveGameTime();
};