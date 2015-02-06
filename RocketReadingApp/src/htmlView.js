//
// NAVIGATION SECTION
//
// Contains the code for hiding the divs

var viewHTMLModule = {
	hideAllPages: function (inputClassName) {
		"use strict";
		var screens = [],
			count;
		screens = document.getElementsByClassName(inputClassName);
		for ( count = 0; count < screens.length; count = count + 1 ) {
			console.log("hideAll() : Hiding " + screens[count].id);
			screens[count].hidden = true;
		};
	};
	
	showLoginScreen: function () {
		"use strict";
		hideAllPages();
		document.getElementById("loginScreen").hidden = false;
	};
	
	showHomeScreen: function () {
		"use strict";
		hideAllPages();
		document.getElementById("homeScreen").hidden = false;
	};
	
	showLevelSelectScreen: function () {
		"use strict";
		hideAllPages();
		document.getElementById("levelSelectScreen").hidden = false;
	};
	
	showGameSelectScreen: function () {
		"use strict";
		hideAllPages();
		document.getElementById("gameSelectScreen").hidden = false;
	};
	
	showGameScreen: function () {
		"use strict";
		hideAllPages();
		document.getElementById("gamesScreen").hidden = false;
	};
	
	showHighScoresScreen: function () {
		"use strict";
		hideAllPages();
		document.getElementById("highScoresScreen").hidden = false;
	};
	
	
}