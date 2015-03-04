var HighScores = function (newBonusGame1HS, newBonusGame2HS, newBonusGame3HS, newBonusGame4HS, newBonusGame5HS, newBonusGame6HS, newLevel1Game1HS, newLevel1Game2HS, newLevel1Game3HS, newLevel1Game4HS, newLevel2Game1HS, newLevel2Game2HS, newLevel2Game3HS, newLevel2Game4HS, newLevel3Game1HS, newLevel3Game2HS, newLevel3Game3HS, newLevel3Game4HS, newLevel4Game1HS, newLevel4Game2HS, newLevel4Game3HS, newLevel4Game4HS, newLevel5Game1HS, newLevel5Game2HS, newLevel5Game3HS, newLevel5Game4HS, newLevel6Game1HS, newLevel6Game2HS, newLevel6Game3HS, newLevel6Game4HS) {
    "use strict";  
    this.level0Game1HS = newBonusGame1HS || 0;
    this.level0Game2HS = newBonusGame2HS || 0;
    this.level0Game3HS = newBonusGame3HS || 0;
    this.level0Game4HS = newBonusGame4HS || 0;
    this.level0Game5HS = newBonusGame5HS || 0;
    this.level0Game6HS = newBonusGame6HS || 0;
    this.level1Game1HS = newLevel1Game1HS || 0;
    this.level1Game2HS = newLevel1Game2HS || 0;
    this.level1Game3HS = newLevel1Game3HS || 0;
    this.level1Game4HS = newLevel1Game4HS || 0;
    this.level2Game1HS = newLevel2Game1HS || 0;
    this.level2Game2HS = newLevel2Game2HS || 0;
    this.level2Game3HS = newLevel2Game3HS || 0;
    this.level2Game4HS = newLevel2Game4HS || 0;
    this.level3Game1HS = newLevel3Game1HS || 0;
    this.level3Game2HS = newLevel3Game2HS || 0;
    this.level3Game3HS = newLevel3Game3HS || 0;
    this.level3Game4HS = newLevel3Game4HS || 0;
    this.level4Game1HS = newLevel4Game1HS || 0;
    this.level4Game2HS = newLevel4Game2HS || 0;
    this.level4Game3HS = newLevel4Game3HS || 0;
    this.level4Game4HS = newLevel4Game4HS || 0;
    this.level5Game1HS = newLevel5Game1HS || 0;
    this.level5Game2HS = newLevel5Game2HS || 0;
    this.level5Game3HS = newLevel5Game3HS || 0;
    this.level5Game4HS = newLevel5Game4HS || 0;
    this.level6Game1HS = newLevel6Game1HS || 0;
    this.level6Game2HS = newLevel6Game2HS || 0;
    this.level6Game3HS = newLevel6Game3HS || 0;
    this.level6Game4HS = newLevel6Game4HS || 0;
    
    return this;
};

HighScores.prototype.setHighScore = function (levelNumber, gameNumber, score) {
    "use strict";
    var arrayName = "level" + levelNumber + "Game" + gameNumber + "HS"; 
    switch (arrayName) {
        case ("level0Game1HS"):
            this.level0Game1HS = score;
            break;
        case ("level0Game2HS"):
            this.level0Game2HS = score;
            break;    
        case ("level0Game3HS"):
            this.level0Game3HS = score;
            break;
        case ("level0Game4S"):
            this.level0Game4S = score;
            break;
        case ("level0Game5HS"):
            this.level0Game5HS = score;
            break;
        case ("level0Game6HS"):
            this.level0Game6HS = score;
            break; 
        case ("level1Game1HS"):
            this.level1Game1HS = score;
            break;
        case ("level1Game2HS"):
            this.level1Game2HS = score;
            break;
        case ("level1Game3HS"):
            this.level1Game3HS = score;
            break;
        case ("level1Game4HS"):
            this.level1Game4HS = score;
            break;
        case ("level2Game1HS"):
            this.level2Game1HS = score;
            break; 
        case ("level2Game2HS"):
            this.level2Game2HS = score;
            break; 
        case ("level2Game3HS"):
            this.level2Game3HS = score;
            break; 
        case ("level2Game4HS"):
            this.level2Game4HS = score;
            break; 
        case ("level3Game1HS"):
            this.level3Game1HS = score;
            break; 
        case ("level3Game2HS"):
            this.level3Game2HS = score;
            break;
        case ("level3Game3HS"):
            this.level3Game3HS = score;
            break;
        case ("level3Game4HS"):
            this.level3Game4HS = score;
            break;
        case ("level4Game1HS"):
            this.level4Game1HS = score;
            break; 
        case ("level4Game2HS"):
            this.level4Game2HS = score;
            break;
        case ("level4Game3HS"):
            this.level4Game3HS = score;
            break;            
        case ("level4Game4HS"):
            this.level4Game4HS = score;
            break;
        case ("level5Game1HS"):
            this.level5Game1HS = score;
            break;
        case ("level5Game2HS"):
            this.level5Game2HS = score;
            break;
        case ("level5Game3HS"):
            this.level5Game3HS = score;
            break;
        case ("level5Game4HS"):
            this.level5Game4HS = score;
            break;
        case ("level6Game1HS"):
            this.level6Game1HS = score;
            break;
        case ("level6Game2HS"):
            this.level6Game2HS = score;
            break;
        case ("level6Game3HS"):
            this.level6Game3HS = score;
            break;
        case ("level6Game4HS"):
            this.level6Game4HS = score;
            break;
    }            
};

HighScores.prototype.getHighScore = function (levelNumber, gameNumber) {
    "use strict";
    var arrayName = "level" + levelNumber + "Game" + gameNumber + "HS"; 
    switch (arrayName) {
        case ("level0Game1HS"):
            return this.level0Game1HS;
            
        case ("level0Game2HS"):
            return this.level0Game2HS;
                
        case ("level0Game3HS"):
            return this.level0Game3HS;
            
        case ("level0Game4HS"):
            return this.level0Game4HS;
            
        case ("level0Game5HS"):
            return this.level0Game5HS;
            
        case ("level0Game6HS"):
            return this.level0Game6HS;
             
        case ("level1Game1HS"):
            return this.level1Game1HS;
            
        case ("level1Game2HS"):
            return this.level1Game2HS;
            
        case ("level1Game3HS"):
            return this.level1Game3HS;
            
        case ("level1Game4HS"):
            return this.level1Game4HS;
            
        case ("level2Game1HS"):
            return this.level2Game1HS;
             
        case ("level2Game2HS"):
            return this.level2Game2HS;
             
        case ("level2Game3HS"):
            return this.level2Game3HS;
             
        case ("level2Game4HS"):
            return this.level2Game4HS;
             
        case ("level3Game1HS"):
            return this.level3Game1HS;
             
        case ("level3Game2HS"):
            return this.level3Game2HS;
            
        case ("level3Game3HS"):
            return this.level3Game3HS;
            
        case ("level3Game4HS"):
            return this.level3Game4HS;
            
        case ("level4Game1HS"):
            return this.level4Game1HS;
             
        case ("level4Game2HS"):
            return this.level4Game2HS;
            
        case ("level4Game3HS"):
            return this.level4Game3HS;
                        
        case ("level4Game4HS"):
            return this.level4Game4HS;
            
        case ("level5Game1HS"):
            return this.level5Game1HS;
            
        case ("level5Game2HS"):
            return this.level5Game2HS;
            
        case ("level5Game3HS"):
            return this.level5Game3HS;
            
        case ("level5Game4HS"):
            return this.level5Game4HS;
            
        case ("level6Game1HS"):
            return this.level6Game1HS;
        
         case ("level6Game2HS"):
            return this.level6Game2HS;
            
        case ("level6Game3HS"):
            return this.level6Game3HS;
            
        case ("level6Game4HS"):
            return this.level6Game4HS;
    }
};

HighScores.prototype.getHighScoresForLevel = function (levelNumber) {
	"use strict";
	var outputArray = [],
		gameCount = 0,
		count;
	console.group("HighScores.proto.getHighScoresForLevel");
	console.log("Input level : " + levelNumber);
	gameCount = rocketReadingModel.getAllGamesFromLevel(levelNumber).length;
	
	outputArray.push(levelNumber);
	for ( count = 1; count <= gameCount; count = count + 1){
		console.log("Count is : " + count);
		console.log("The score for game " + count + " is " + this.getHighScore(levelNumber, count));
		outputArray.push(this.getHighScore(levelNumber, count));
		console.log("getHighScoresForLevel: Added to array : " + this.getHighScore(levelNumber, count));
		console.log(outputArray);
	};
	console.groupEnd();
	return outputArray;
};