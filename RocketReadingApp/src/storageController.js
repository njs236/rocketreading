rocketReadingModel.storageController = ( function () {
	var controllerType = {};
    
    return {
        
	getPlayer : function (uname) {
        //uname is a static string that is passed from the owning function.
        return controllerType.getPlayer(uname);	
    },
	setControllerType : function (object) {
		controllerType = object;
		// return controllerType;
	},
    
    registerPlayer : function (player) {
        controllerType.registerPlayer(player);
    },
    
    saveAllGamesData : function () {
        controllerType.saveAllGamesData();
    },
    
    saveCurrentGameData : function () {
        controllerType.saveCurrentGameData();
    }
    
    }
}());