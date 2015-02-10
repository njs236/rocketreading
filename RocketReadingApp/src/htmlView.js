// HTMLView Module v1.7
//
var viewHTMLModule = {
    name : "HTML View Module",
	
	getName : function() {
		return this.name;
	},
	
	greet : function() {
		console.log("viewHTMLModule : I am the current view! I am " + this.name);
	},
	
    displayGameOptions: function (gameOptionsData) {
        "use strict";
		//displayGameOptions() Function v1.3
        var count,
            newHeading,
            newDiv,
			gameSelectMainDiv = document.getElementById("gameOptionsContainer");
		// The html inside the div containing the game options needs
		// to be cleared each time a level's game options are selected.
		while ( gameSelectMainDiv.hasChildNodes() ){
		gameSelectMainDiv.removeChild(gameSelectMainDiv.firstChild);
		};
		
        for (count = 0; count < gameOptionsData[0]; count += 1) { 
            if (count % 3 === 0) {
                newDiv = document.createElement("DIV");
                newDiv.className = "gameSelectScreenRow";
                gameSelectMainDiv.appendChild(newDiv);
            };
			
			if ( gameOptionsData[0] === (count + 1) && gameOptionsData[0] % 3 === 1 ) {
				console.log("displayGameOptions() : Last Item");
				newDiv = document.createElement("DIV");
				newDiv.className = "gameSelectScreenGame";
				gameSelectMainDiv.lastChild.appendChild(newDiv);
			};
			
            newDiv = document.createElement("DIV");
            newDiv.className = "gameSelectScreenGame";
            newDiv.id = "gameScreenButton" + (count + 1);
            newHeading = document.createElement("H1");
			newHeading.textContent = gameOptionsData[1][count];
            newDiv.appendChild(newHeading);
			
            gameSelectMainDiv.lastChild.appendChild(newDiv);
			
            // Adding an event-listener to the div
			newDiv.addEventListener("click", mainController.setCurrentGame);
			newDiv.addEventListener("click", this.showGameScreen);
        }
    },
	
	displayGameTable : function (inputArray) {
		var newRow,
			newCell,
			wordCount,
			clickCount,
			tableWidth = 5;
		
		//CONSTANTS
		
		var HTMLTABLE;
		console.log(inputArray);
		HTMLTABLE = document.getElementById("gameWordTable");

		HTMLTABLE.innerHTML = ""; // clear table each time its run
		newRow = HTMLTABLE.insertRow(-1);

		for ( wordCount = 0; wordCount < inputArray.length; wordCount = wordCount + 1) {
			if ( HTMLTABLE.lastChild.lastChild.cells.length === tableWidth ) {
				newRow = HTMLTABLE.insertRow(-1);
			};
			newCell = newRow.insertCell(-1);
			newCell.innerHTML = inputArray[wordCount];
			newCell.id = "cell" + wordCount;
			newCell.className = "wordCell";
			newCell.addEventListener("click", guessWord(newCell.text));
		};
	},
	
	displayLevelList: function (levelList) {
		"use strict"
		// displayLevelList() function v1.6
		// This function takes an input 2D array containing the
		// level data in the following format
		// ["01",avatarName]
		// ["02",avatarName]
		// ["03",avatarName]
		var count,
			newDiv,
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
		
		
		// Iterate over all level info and make div boxes
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
			newDiv.style.backgroundImage = "url(images/" + levelList[count][1] + ".png)";
			
			levelSelectMainDiv.lastChild.appendChild(newDiv);
			
			newDiv.addEventListener("click", mainController.setCurrentLevel);
			newDiv.addEventListener("click", mainController.gameOptionsRequest);
		};
		
	},
	
	
	hideAllPages: function () {
		"use strict";
		var screens = [],
			count;
		screens = document.getElementsByClassName("navScreen");
		for ( count = 0; count < screens.length; count = count + 1 ) {
			console.log("hideAll() : Hiding " + screens[count].id);
			screens[count].hidden = true;
		};
	},
	
	showLoginScreen: function () {
		"use strict";
		viewHTMLModule.hideAllPages();
		document.getElementById("loginScreen").hidden = false;
		console.log("HTMLView.js : Showing login screen");
	},
	
	showHomeScreen: function () {
		"use strict";
		viewHTMLModule.hideAllPages();
		document.getElementById("homeScreen").hidden = false;
		console.log("HTMLView.js : Showing home screen");
	},
	
	showLevelSelectScreen: function () {
		"use strict";
		viewHTMLModule.hideAllPages();
		document.getElementById("levelSelectScreen").hidden = false;
		console.log("HTMLView.js : Showing level select screen");
	},
	
	showGameSelectScreen: function () {
		"use strict";
		viewHTMLModule.hideAllPages();
		document.getElementById("gameSelectScreen").hidden = false;
		console.log("HTMLView.js : Showing game select screen");
	},
	
	showGameScreen: function () {
		"use strict";
		viewHTMLModule.hideAllPages();
		document.getElementById("gamesScreen").hidden = false;
		console.log("HTMLView.js : Showing game screen");
        gameInitialise();
	},
	
	showHighScoresScreen: function () {
		"use strict";
		viewHTMLModule.hideAllPages();
		document.getElementById("highScoresScreen").hidden = false;
		console.log("HTMLView.js : Showing High Score screen");
	},
	
	intitialise : function()  {
	// Login Screen
	document.getElementById("loginEnterBtn").addEventListener("click", mainController.processLogin, false);
	
	// Home Screen
	document.getElementById("homePlayGame").addEventListener("click", mainController.requestAllLevels);
	document.getElementById("homeHighScores").addEventListener("click", this.showHighScoresScreen);
	document.getElementById("homeExit").addEventListener("click",this.showLoginScreen);
	
	// Level Select Screen
	document.getElementById("levelSelectHomeButton").addEventListener("click", this.showHomeScreen);
	
	// Game Select Screen
	document.getElementById("gameSelectHomeButton").addEventListener("click", this.showLevelSelectScreen);
	
	// Game Screen
	document.getElementById("gameHomeLink").addEventListener("click", this.showHomeScreen);
	
	// High Scores Screen
	document.getElementById("highScoreScreenHomeButton").addEventListener("click", this.showHomeScreen);
	}
};