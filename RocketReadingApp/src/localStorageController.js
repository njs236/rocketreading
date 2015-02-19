var localStorageController =  {
	Communication : '',
	getPlayer : function (uname) {
		return JSON.parse(localStorage.getItem(uname));
	},
    registerPlayer : function (player) {
        localStorage.setItem(player.uname, JSON.stringify(player));
    },
    
    saveAllGamesData : function () {
        var player = rocketReadingModel.getMyPlayer();
        player.allGamesData = rocketReadingModel.getAllGamesData();
        localStorage.setItem(rocketReadingModel.getMyPlayer().getUserName(), JSON.stringify(player));
    },
    
    saveCurrentGameData : function () {
        var player = rocketReadingModel.getMyPlayer();
        player.currentGameData = rocketReadingModel.getCurrentGameData();
        localStorage.setItem(rocketReadingModel.getMyPlayer().getUserName(), JSON.stringify(player));
    },
    
};