// This module contains shell functionality: eg page navigation. These functions do not necessarily need to be in the modelView module.
// Probably should set these functions as properties of a module object.

function hideAll() {
	"use strict";
	var screens = [],
		count;
	
	screens = document.getElementsByClassName("navScreen");
	for ( count = 0; count < screens.length; count = count + 1 ) {
		console.log("hideAll() : Hiding " + screens[count].id);
		screens[count].hidden = true;
	};
}

var showPingPong = function () {
	"use strict";
	hideAll();
	document.getElementById("pingpong").hidden = false;
    console.log("Showing ping pong screen");
}

var showHomeScreen = function () {
	"use strict";
	hideAll();
	document.getElementById("homeScreen").hidden = false;
    console.log("Showing home screen");
};

var showLevelScreen = function () {
	"use strict";
	hideAll();
	document.getElementById("levelSelectScreen").hidden = false;
    console.log("Showing level screen");
};

var showGameSelectScreen = function () {
	"use strict";
	hideAll();
	document.getElementById("gameSelectScreen").hidden = false;
    console.log("Showing game select screen");
};

var showHighScoresScreen = function () {
	"use strict";
	hideAll();
	document.getElementById("highScoresScreen").hidden = false;
    console.log("Showing high scores screen");
};

var showGameScreen = function () {
	"use strict";
	hideAll();
	document.getElementById("gamesScreen").hidden = false;
	gameInitialise();
    console.log("Showing game screen");
};

var showLoginScreen = function () {
	"use strict";
	hideAll();
	document.getElementById("loginScreen").hidden = false;
    console.log("Showing login screen");
};

function navigationInitialise() {
	"use strict";
	console.log("navigationInitialise() : Running");
	var collectionArray = [],
		count;
	// Login Screen
	document.getElementById("loginEnterBtn").addEventListener("click", mainController.processLogin, false);
	
	// Home Screen
	document.getElementById("homePlayGame").addEventListener("click", mainController.requestAllLevels);
	document.getElementById("homeHighScores").addEventListener("click", showHighScoresScreen);
	document.getElementById("homeExit").addEventListener("click",showLoginScreen);
	
	// Level Select Screen
	document.getElementById("levelSelectHomeButton").addEventListener("click", showHomeScreen);
	collectionArray = document.getElementsByClassName("levelSelectIconContainerClickable");
	
	for ( count = 0; count < collectionArray.length; count = count + 1) {
		collectionArray[count].addEventListener("click", function () {mainController.gameOptionsRequest(this.id); }, false);
	}
	collectionArray = [];
    
	// Game Select Screen
	document.getElementById("gameSelectHomeButton").addEventListener("click", showLevelScreen);
	//document.getElementById("gameScreenButton1").addEventListener("click", showGameScreen);
	
	// Game Screen
	document.getElementById("gameHomeLink").addEventListener("click", showHomeScreen);
	
	// High Scores Screen
	document.getElementById("highScoreScreenHomeButton").addEventListener("click", showHomeScreen);
}