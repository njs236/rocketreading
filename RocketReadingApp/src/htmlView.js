//
// NAVIGATION SECTION
//
// Contains the code for hiding the divs

var HTMLView = function (newName, theViewModel) {
	this.name = newName || "unnamed";
	this.myViewModel = theViewModel || {};
};

HTMLView.prototype.hideAllPages = function (inputDivClass) {
	// This function takes a class name of the divs used to created 'pages'
	// and hides all elements with that class name
	"use strict";
	var screens = [],
		count;
	screens = document.getElementsByClassName(inputDivClass);
	for ( count = 0; count < screens.length; count = count + 1 ) {
		console.log("hideAll() : Hiding " + screens[count].id);
		screens[count].hidden = true;
	};
};