var RocketReadingModel = function() {
	this.levelCount = 0;
	this.allMyLevels = [];
    this.name = "MyRocketReadingApp";
    this.listCount = 0
    this.allMyLists = [];
    this.playerCount = 0;
    this.myPlayer = {};
	this.myCurrentGameData = {};
    this.allMyBadges = [];
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

RocketReadingModel.prototype.getLevelCount = function () {
	return this.levelCount;
};

RocketReadingModel.prototype.getAllLevels = function () {
    "use strict";
    return this.allMyLevels;
};

RocketReadingModel.prototype.findBadgeById = function (id) {
	for (n=0; n < this.allMyBadges.length; n++) {
        if (this.allMyBadges[n].getId() == id ) {
            return this.allMyBadges[n];
        }
    }
    return;
}

RocketReadingModel.prototype.addBadge = function (newBadgeId, newBadgeIcon, newBadgeName, newBadgeDescription) {
    var badge = new Badge (newBadgeId, newBadgeIcon, newBadgeName, newBadgeDescription);
    this.allMyBadges.push(badge);
};

RocketReadingModel.prototype.getAllMyBadges = function () {
    "use strict";
    return this.allMyBadges;
};

RocketReadingModel.prototype.getBadgeCount = function () {
	return this.allMyBadges.length;
}

RocketReadingModel.prototype.checkBadge = function (badge) {
		console.log("Check Badge " + badge);
		// initialise needed data for checking badge requirements
		var player = rocketReadingModel.getMyPlayer(),
			allGamesData = rocketReadingModel.getAllGamesData();
        // check for badge in Player
		if (player.findBadgeById(badge)) {
			return;
		}
		// case statements for badges
		switch (badge) {
			case 1:
			/* for clarification on why I have used this way.
			when using this function, it returns an object if there are 1 in the array, but all subsequent ones failed because they were not empty when instanced. they were an empty array
			for some reason trying array.length is also undefined
			 but the array is treated as an array in that the first index can be isolated. Undefined means that this object is undefined. for empty array of type CurrentGameData, this returns
			 undefined.*/
			if (allGamesData.getGameDataArray(1, 1)[0] != undefined) {
				player.addBadge(badge);
				return rocketReadingModel.findBadgeById(badge);
			}
			break;
			case 2:
			if (allGamesData.getGameDataArray(1, 2)[0] != undefined) {
				player.addBadge(badge);
				return rocketReadingModel.findBadgeById(badge);
			}
			break;
			case 3:
			if (allGamesData.getGameDataArray(1, 3)[0] != undefined) {
				player.addBadge(badge);
				return rocketReadingModel.findBadgeById(badge);
			}
			break;
			case 4:
			if (allGamesData.getGameDataArray(1, 4)[0] != undefined) {
				player.addBadge(badge);
				return rocketReadingModel.findBadgeById(badge);
			}
			break;
			case 5:
			if (allGamesData.getGameDataArray(2, 1)[0] != undefined) {
				player.addBadge(badge);
				return rocketReadingModel.findBadgeById(badge);
			}
			break;
			case 6:
			
			break;
			case 7:
			
			break;
			case 8:
			
			break;
			case 9:
			
			break;
			case 10:
			
			break;
			
			case 11:
			
			break;
			
			default: 
			console.log("invalid case");
			
			break;
		}
		return null;

    };

RocketReadingModel.prototype.addCurrentGameData = function (newLevel, newGame, newWordList, newCurrentWord, newCurrentLevelGame, newGameScore, newGameMedals, newLastTestTime, newTotalGameTime, newWordsSoundsCorrect, newWordsSoundsIncorrect, newIncorrectWord) {
	var newCurrentGameData = new CurrentGameData(newLevel, newGame, newWordList, newCurrentWord, newCurrentLevelGame, newGameScore, newGameMedals, newLastTestTime, newTotalGameTime, newWordsSoundsCorrect, newWordsSoundsIncorrect, newIncorrectWord);
	this.myCurrentGameData = newCurrentGameData;
    return newCurrentGameData;
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
    "use strict";
    var theGame,
        level = this.findLevelByNumber(0);
    for (theGame of level.getAllGames()) {
        if (theGame.gameNumber === levelNumber) {
            console.log("getBonusGame: " +theGame);
            return theGame;
        };
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


RocketReadingModel.prototype.registerPlayer = function (newUser, newFirstName, newLastName, newSchool, newClassRoom, newTotalScore, newLevelReached, newBonusGameReached, newPointsToPassLevel, newSavedLevelGame, newSavedGameData) {
    "use strict";
    var newPlayer = new Player(newUser, newFirstName, newLastName, newSchool, newClassRoom, newTotalScore, newLevelReached, newBonusGameReached, newPointsToPassLevel, newSavedLevelGame, newSavedGameData);
    
    newPlayer.addHighScores(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
	newPlayer.currentGameData = this.myCurrentGameData;
	newPlayer.allGamesData = this.myAllGamesData;
    // Save the player in local storage
    storageController.registerPlayer(newPlayer);
};

RocketReadingModel.prototype.loadGameData = function (gameData) {
    "use strict";
    var gameData = new Game(gameData.gameName, gameData.myWordList, gameData.levelName, gameData.gameNumber, gameData.accessible, gameData.bonusGameCompleted);
    
    return gameData;
};

RocketReadingModel.prototype.loadCurrentGameData = function (gameDataArray) {
    /* This function will create currentGameData type objects for each array in a player's
    allGamesData level-game property */
    "use strict";
    var index,
        gameData = [],
        aLength = gameDataArray.length;    
    // console.log("Test loadCurrentGameData():" + aLength); // Test 
    
    for (index = 0; index < aLength; index += 1) {
        gameData[index] = new CurrentGameData( gameDataArray[index].myLevel, this.loadGameData(gameDataArray[index].myGame), gameDataArray[index].wordList, gameDataArray[index].currentWord, gameDataArray[index].currentLevelGame, gameDataArray[index].gameScore, gameDataArray[index].gameMedals, gameDataArray[index].lastTestTime, gameDataArray[index].totalGameTime, gameDataArray[index].wordsSoundsCorrect, gameDataArray[index].wordsSoundsIncorrect, gameDataArray[index].incorrectWord );
    }
    return gameData;
};


RocketReadingModel.prototype.setPlayer = function (player) {
    "use strict";
	console.log(player.badges);
    var newPlayer = new Player( player.userName, player.firstName, player.lastName, player.school, player.classRoom, player.totalScore, player.levelGameReached, player.bonusGameReached, player.pointsToPassLevel, player.savedLevelGame, player.savedGameData),
    
    newAllGamesData = new AllGamesData(this.loadCurrentGameData(player.allGamesData.level0Game1), this.loadCurrentGameData(player.allGamesData.level0Game2), this.loadCurrentGameData(player.allGamesData.level0Game3), this.loadCurrentGameData(player.allGamesData.level0Game4), this.loadCurrentGameData(player.allGamesData.level0Game5),  this.loadCurrentGameData(player.allGamesData.level0Game6), this.loadCurrentGameData(player.allGamesData.level1Game1), this.loadCurrentGameData(player.allGamesData.level1Game2), this.loadCurrentGameData(player.allGamesData.level1Game3), this.loadCurrentGameData(player.allGamesData.level1Game4), this.loadCurrentGameData(player.allGamesData.level2Game1), this.loadCurrentGameData(player.allGamesData.level2Game2), this.loadCurrentGameData(player.allGamesData.level2Game3), this.loadCurrentGameData(player.allGamesData.level2Game4), this.loadCurrentGameData(player.allGamesData.level3Game1), this.loadCurrentGameData(player.allGamesData.level3Game2), this.loadCurrentGameData(player.allGamesData.level3Game3), this.loadCurrentGameData(player.allGamesData.level3Game4), this.loadCurrentGameData(player.allGamesData.level4Game1),  this.loadCurrentGameData(player.allGamesData.level4Game2), this.loadCurrentGameData(player.allGamesData.level4Game3), this.loadCurrentGameData(player.allGamesData.level4Game4), this.loadCurrentGameData(player.allGamesData.level5Game1), this.loadCurrentGameData(player.allGamesData.level5Game2), this.loadCurrentGameData(player.allGamesData.level5Game3), this.loadCurrentGameData(player.allGamesData.level5Game4), this.loadCurrentGameData(player.allGamesData.level6Game1), this.loadCurrentGameData(player.allGamesData.level6Game2), this.loadCurrentGameData(player.allGamesData.level6Game3), this.loadCurrentGameData(player.allGamesData.level6Game4)),
    
    newCurrentGameData = new CurrentGameData(player.currentGameData.myLevel, this.loadGameData(player.currentGameData.myGame), player.currentGameData.wordList, player.currentGameData.currentWord, player.currentGameData.currentLevelGame, player.currentGameData.savedLevelGame, player.currentGameData.gameScore, player.currentGameData.gameMedals, player.currentGameData.lastTestTime, player.currentGameData.totalGameTime, player.currentGameData.wordsSoundsCorrect, player.currentGameData.wordsSoundsIncorrect, player.currentGameData.incorrectWord );
	
    newPlayer.addHighScores(player.highScores.level0Game1HS, player.highScores.level0Game2HS, player.highScores.level0Game3HS, player.highScores.level0Game4HS, player.highScores.level0Game5HS, player.highScores.level0Game6HS, player.highScores.level1Game1HS, player.highScores.level1Game2HS, player.highScores.level1Game3HS, player.highScores.level1Game4HS, player.highScores.level2Game1HS, player.highScores.level2Game2HS, player.highScores.level2Game3HS, player.highScores.level2Game4HS, player.highScores.level3Game1HS, player.highScores.level3Game2HS, player.highScores.level3Game3HS, player.highScores.level3Game4HS,player.highScores.level4Game1HS, player.highScores.level4Game2HS, player.highScores.level4Game3HS, player.highScores.level4Game4HS, player.highScores.level5Game1HS, player.highScores.level5Game2HS, player.highScores.level5Game3HS, player.highScores.level5Game4HS, player.highScores.level6Game1HS, player.highScores.level6Game2HS, player.highScores.level6Game3HS, player.highScores.level6Game4HS);
    
	newPlayer.setBadges(player.badges);
    if (newPlayer.savedLevelGame !== null) {
        newPlayer.addSavedGameData( this.findLevelByNumber(player.savedLevelGame[0]), this.loadGameData(player.savedGameData.myGame), player.savedGameData.wordList, player.savedGameData.currentWord, player.savedGameData.currentLevelGame, player.savedGameData.gameScore, player.savedGameData.gameMedals, player.savedGameData.lastTestTime, player.savedGameData.totalGameTime, player.savedGameData.wordsSoundsCorrect, player.savedGameData.wordsSoundsIncorrect,  player.savedGameData.incorrectWord );
    }
    
    this.myPlayer = newPlayer;
    this.myAllGamesData = newAllGamesData;
    this.myCurrentGameData = newCurrentGameData;
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
    // var aLevel = this.getCurrentGameData().getCurrentLevel(),
    var aLevel = rocketReadingModel.findLevelByNumber(rocketReadingModel.getCurrentGameData().getCurrentLevelGame()[0]),
	aGame;
    for (aGame of aLevel.allMyGames) {
		if (aGame.getNumber() === number) {
		console.log("aGame:" + aGame);
			return aGame;
		}
	}
		alert("Game Not Found");
};

RocketReadingModel.prototype.findGameByLevelAndNumber = function (levelNumber, gameNumber) {
	var aLevel = rocketReadingModel.findLevelByNumber(levelNumber);
	var aGame;
	for (aGame of aLevel.allMyGames) {
		if (aGame.getNumber() == gameNumber) {
			console.log("aGame:" + aGame);
				return aGame;
		}
	}
	
	alert("Game Not Found");
}

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
	return this.findLevelByNumber(inputLevelNumber).getMyGames();
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