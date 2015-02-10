

var testController = {
	name: "Test Controller",
	
	getAllMethods : function (object) {
			return Object.getOwnPropertyNames(object).filter(function(property) {
				return typeof object[property] == 'function';
			});
		}
}