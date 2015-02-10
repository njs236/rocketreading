var localStorageController =  {
	Communication : '',
	getPlayer : function (uname) {
		return JSON.parse(localStorage.getItem(uname));
	}
};