var localStorageController =  {
	Communication : '',
	getPlayer : function (uname) {
		return JSON.parse(localStorage.getItem(uname));
	},
    registerPlayer : function (player) {
        localStorage.setItem(player.getUserName(), JSON.stringify(player));
    },
    
    saveAllGamesData : function () {
        "use strict";
        var player = rocketReadingModel.getMyPlayer();
        player.setAllGamesData(rocketReadingModel.getAllGamesData());
        
        console.groupCollapsed("localStorageController : saveAllGamesData()");
        console.log("player userName: " + player.userName);
        console.log("player firstName: " + player.firstName);
        console.log("player lastName: " + player.lastName);
        console.log("player school: " + player.school);
        console.log("player classRoom: " + player.classRoom);
        console.log("player totalScore: " + player.totalScore);
        console.log("player levelGameReached: " + player.levelGameReached);
        console.log("player bonusGameReached: " + player.bonusGameReached);
        console.log("player pointsToPassLevel: " + player.pointsToPassLevel);
        console.log("player currentGameData: " + player.currentGameData);
        console.log("player allGamesData: " + player.allGamesData);
        console.groupEnd();
        
        localStorage.setItem(rocketReadingModel.getMyPlayer().getUserName(), JSON.stringify(player));
    },
    
    saveCurrentGameData : function () {
        "use strict";
        var player = rocketReadingModel.getMyPlayer();
        player.setCurrentGameData(rocketReadingModel.getCurrentGameData());
        localStorage.setItem(rocketReadingModel.getMyPlayer().getUserName(), JSON.stringify(player));
    },
    
};