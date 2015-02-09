var Avatar = function (newName, myLevel){
this.theLevel = myLevel; 
this.name = newName;
}

Avatar.prototype.getName = function() {
	return this.name;
}