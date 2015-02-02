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

var showHomeScreen = function () {
	"use strict";
	hideAll();
	document.getElementById("homeScreen").hidden = false;
};

var showLevelScreen = function () {
	"use strict";
	hideAll();
	document.getElementById("levelSelectScreen").hidden = false;
};

var showGameSelectScreen = function () {
	"use strict";
	hideAll();
	document.getElementById("gameSelectScreen").hidden = false;
};

var showHighScoresScreen = function () {
	"use strict";
	hideAll();
	document.getElementById("highScoresScreen").hidden = false;
};

var showGameScreen = function () {
	"use strict";
	hideAll();
	document.getElementById("gamesScreen").hidden = false;
};

var showLoginScreen = function () {
	"use strict";
	hideAll();
	document.getElementById("loginScreen").hidden = false;
};

function navigationInitialise() {
	"use strict";
	console.log("navigationInitialise() : Running");
	document.getElementById("loginEnterBtn").addEventListener("click", processLogin, false);
	document.getElementById("homePlayGame").addEventListener("click", showLevelScreen);
	document.getElementById("levelSelectDivLevel1").addEventListener("click", showGameSelectScreen);
	document.getElementById("gameScreenButton1").addEventListener("click", showGameScreen);
	document.getElementById("homeHighScores").addEventListener("click", showHighScoresScreen);
	document.getElementById("homeExit").addEventListener("click", showLoginScreen);
	
	document.getElementById("gameHomeLink").addEventListener("click", showHomeScreen);
	
	document.getElementById("highScoreScreenHomeButton").addEventListener("click", showHomeScreen);
}