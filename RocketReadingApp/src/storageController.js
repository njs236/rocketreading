var storageController = {
	ControllerType : {},
	getPlayer : function (uname) {
	//uname is a static string that is passed from the owning function.
	return this.ControllerType.getPlayer(uname);	
},
	setControllerType : function (string) {
		this.ControllerType = string;
		return this.ControllerType;
	}
}

storageController.setControllerType(localStorageController);