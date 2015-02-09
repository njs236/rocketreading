// HTML View Module v1.3
//
var viewHTMLModule = {
    name : "HTML View Module for Rocket Reading",
    displayGameOptions: function (gameOptionsData) {
        "use strict";
        var count,
            newHeading,
            newDiv,
			gameSelectMainDiv = document.getElementById("gameOptionsContainer");
			// The html inside the div containing the game options needs to be cleared each time a level's game options are selected.
		
		while ( gameSelectMainDiv.hasChildNodes() ){
		levelSelectMainDiv.removeChild(levelSelectMainDiv.firstChild);
		};
		
        for (count = 0; count < gameOptionsData[0]; count += 1) { 
            if (count % 3 === 0) {
                newDiv = document.createElement("DIV");
                newDiv.className = "gameSelectScreenRow";
                gameSelectMainDiv.appendChild(newDiv);
            };
            newDiv = document.createElement("DIV");
            newDiv.className = "gameSelectScreenGame";
            newDiv.id = "gameScreenButton" + (count + 1);
            newHeading = document.createElement("H1");
			newHeading.textContent = gameOptionsData[1][count];
            newDiv.appendChild(newHeading);
            levelSelectMainDiv.lastChild.appendChild(newDiv);
            // Adding an event-listener to the div
            document.getElementById("gameScreenButton" + (count + 1)).addEventListener("click", showGameScreen);
        }
    },
	
	displayLevelList: function (levelList) {
	"use strict"
	// displayLevelList() function v1.4
	// This function takes an input 2D array containing the
	// level data in the following format
	// ["01",avatarPath]
	// ["02",avatarPath]
	// ["03",avatarPath]
	var count,
		newDiv,
		newHeading, // Used to create a heading element in the div
		levelSelectMainDiv = document.getElementById("levelSelectScreenMainArea");
	
	console.log("displayLevelList() : Running");
	console.log(levelList);
	// Remove all HTML bits under main section
	while ( levelSelectMainDiv.hasChildNodes() ){
		levelSelectMainDiv.removeChild(levelSelectMainDiv.firstChild);
	};
	
	// Shift bonus games to the end
	if ( levelList[0][0] === 0 ) {
		console.log("displayLevelList() : Shifted Things");
		levelList.push(levelList[0]); // add first element to the end
		levelList.splice(0,1); // remove the first entry
		console.log(levelList);
	};
	
	
	// IOterate over all level info and make div boxes
	for ( count = 0; count < levelList.length; count = count + 1) {
		// create a new row if we are at 3 boxes
		if ( count % 3 === 0 ) {
			newDiv = document.createElement("DIV");
			newDiv.className = "levelSelectRow";
			levelSelectMainDiv.appendChild(newDiv);
		};
		
		// checking for last item in list, creates an empty div to center it
		if ( levelList.length === (count + 1) && levelList.length % 3 === 1 ) {
			console.log("displayLevelList() : Last Item");
			newDiv = document.createElement("DIV");
			newDiv.className = "levelSelectIconContainer";
			levelSelectMainDiv.lastChild.appendChild(newDiv);
		};
		
		
		newDiv = document.createElement("DIV");
		newDiv.className = "levelSelectIconContainer";
		newDiv.id = "level" + levelList[count][0];
		newDiv.style.backgroundImage = "url(../images/" + levelList[count][1] + ".png";
		
		newHeading = document.createElement("H1");
		newHeading.textContent = "level" + levelList[count][0];
		newDiv.appendChild(newHeading);
		newDiv.addEventListener("click", mainController.gameOptionsRequest);
		levelSelectMainDiv.lastChild.appendChild(newDiv);
	};
	
	}
	/*
	hideAllPages: function () {
		"use strict";
		var screens = [],
			count;
		screens = document.getElementsByClassName("navScreen");
		for ( count = 0; count < screens.length; count = count + 1 ) {
			console.log("hideAll() : Hiding " + screens[count].id);
			screens[count].hidden = true;
		}
	},
	
	showLoginScreen: function () {
		"use strict";
		viewHTMLModule.hideAllPages();
		document.getElementById("loginScreen").hidden = false;
	},
	
	showHomeScreen: function () {
		"use strict";
		viewHTMLModule.hideAllPages();
		document.getElementById("homeScreen").hidden = false;
	},
	
	showLevelSelectScreen: function () {
		"use strict";
		viewHTMLModule.hideAllPages();
		document.getElementById("levelSelectScreen").hidden = false;
	},
	
	showGameSelectScreen: function () {
		"use strict";
		viewHTMLModule.hideAllPages();
		document.getElementById("gameSelectScreen").hidden = false;
	},
	
	showGameScreen: function () {
		"use strict";
		viewHTMLModule.hideAllPages();
		document.getElementById("gamesScreen").hidden = false;
        gameInitialise();
	},
	
	showHighScoresScreen: function () {
		"use strict";
		viewHTMLModule.hideAllPages();
		document.getElementById("highScoresScreen").hidden = false;
	}*/
};