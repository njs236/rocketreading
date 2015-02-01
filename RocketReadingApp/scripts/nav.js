var showScreen = function () {
	"use strict";
	var screens = [],
		count;
	
	screens = document.getElementsByClassName("navScreen");
	for ( count = 0; count < screens.length; count = count + 1 ) {
		screen[count].hidden = true;
	};
}
	if ( this.id === "loginEnterBtn" ) {
		document.getElementById("homeScreen").hidden 
	}
	
function hideAll() {
	"use strict";
	var screens = [],
		count;
	
	screens = document.getElementsByClassName("navScreen");
	for ( count = 0; count < screens.length; count = count + 1 ) {
		screen[count].hidden = true;
	};
}

function navigationInitialise() {
	document.getElementById("loginEnterBtn").addEventListener("click", showScreen);
}