var AllGamesData = function (newLevel1Game1, newLevel1Game2, newLevel1Game3, newLevel1Game4, newLevel2Game1, newLevel2Game2, newLevel2Game3, newLevel2Game4, newLevel3Game1, newLevel3Game2, newLevel3Game3, newLevel3Game4, newLevel4Game1,  newLevel4Game2, newLevel4Game3, newLevel4Game4, newLevel5Game1, newLevel5Game2, newLevel5Game3, newLevel5Game4, newLevel6Game1, newLevel6Game2, newLevel6Game3, newLevel6Game4, newBonusGame1, newBonusGame2, newBonusGame3, newBonusGame4, newBonusGame5, newBonusGame6) {
    "use strict";
    this.level0Game1 = newBonusGame1;
    this.level0Game2 = newBonusGame2;
    this.level0Game3 = newBonusGame3;
    this.level0Game4 = newBonusGame4;
    this.level0Game5 = newBonusGame5;
    this.level0Game6 = newBonusGame6;
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
    
    return this;
};

AllGamesData.prototype.getGameDataArray = function (levelNumber, gameNumber) {
    "use strict";
    var arrayName = "level" + levelNumber + "Game" + gameNumber;
    // The break statements probably are not necessary
    switch (arrayName) {
        case ("level0Game1"): 
            return this.level0Game1;
            break;
        case ("level0Game2"): 
            return this.level0Game2;
            break;
        case ("level0Game3"): 
            return this.level0Game3;
            break;
        case ("level0Game4"): 
            return this.level0Game4;
            break;
        case ("level0Game5"): 
            return this.level0Game5;
            break;
        case ("level0Game6"): 
            return this.level0Game6;
            break;
        case ("level1Game1"): 
            return this.level1Game1;
            break;
        case ("level1Game2"): 
            return this.level1Game2;
            break;
        case ("level1Game3"): 
            return this.level1Game3;
            break;
        case ("level1Game4"): 
            return this.level1Game4;
            break;
        case ("level2Game1"): 
            return this.level2Game1;
            break;
        case ("level2Game2"): 
            return this.level2Game2;
            break;
        case ("level2Game3"): 
            return this.level2Game3;
            break;
        case ("level2Game4"): 
            return this.leve2Game4;
            break;
        case ("level3Game1"): 
            return this.level3Game1;
            break;
        case ("level3Game2"): 
            return this.level3Game2;
            break;
        case ("level3Game3"): 
            return this.level3Game3;
            break;
        case ("level3Game4"): 
            return this.level3Game4;
            break;
        case ("level4Game1"): 
            return this.level4Game1;
            break;
        case ("level4Game2"): 
            return this.level4Game2;
            break;
        case ("level4Game3"): 
            return this.level4Game3;
            break;
        case ("level4Game4"): 
            return this.level4Game4;
            break;        
        case ("level5Game1"): 
            return this.level5Game1;
            break;
        case ("level5Game2"): 
            return this.level5Game2;
            break;
        case ("level5Game3"): 
            return this.level5Game3;
            break;
        case ("level5Game4"): 
            return this.level5Game4;
            break;        
        case ("level6Game1"): 
            return this.level6Game1;
            break;
        case ("level6Game2"): 
            return this.level6Game2;
            break;
        case ("level6Game3"): 
            return this.level6Game3;
            break;
        case ("level6Game4"): 
            return this.level6Game4;
            break;                    
    }
};

AllGamesData.prototype.saveGameData = function (levelNumber, gameNumber, currentGameData) {
    "use strict";
    this.getGameDataArray(levelNumber, gameNumber).push(currentGameData);
};


AllGamesData.prototype.updateAllGamesData = function (username, gameData) {
    "use strict";
    var playerData = JSON.parse(localStorage.getItem(username));
    playerData.allGamesData.gameData.currentLevelGame.push(gameData);
    localStorage.setItem(username, JSON.stringify(playerData));
};

/* itemAndTime may be a global var
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
};*/