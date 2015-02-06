//
// NAVIGATION SECTION
//
// Contains the code for hiding the divs

var HTMLView = function (newName, theViewModel) {
	this.name = newName || "unnamed";
	this.myViewModel = theViewModel || {};
};

HTMLView.prototype.hideAll = function () {
	"use strict";
	var screens = [],
		count;
	
	screens = document.getElementsByClassName("navScreen");
	for ( count = 0; count < screens.length; count = count + 1 ) {
		console.log("hideAll() : Hiding " + screens[count].id);
		screens[count].hidden = true;
	};
};