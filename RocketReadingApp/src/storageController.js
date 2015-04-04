var storageController = {
	ControllerType : {},
	getPlayer : function (uname) {
        //uname is a static string that is passed from the owning function.
        return this.ControllerType.getPlayer(uname);	
    },
	setControllerType : function (string) {
		this.ControllerType = string;
		return this.ControllerType;
	},
    
    registerPlayer : function (player) {
        this.ControllerType.registerPlayer(player);
    },
    
    saveAllGamesData : function () {
        this.ControllerType.saveAllGamesData();
    },
    
    saveCurrentGameData : function () {
        this.ControllerType.saveCurrentGameData();
    }
};

storageController.setControllerType(localStorageController);