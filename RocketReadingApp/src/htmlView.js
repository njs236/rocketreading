// HTMLView Module v1.9
//
var viewHTMLModule = {
	
	// ********* Attributes **********
	name : "HTML View Module",
	
	
	// ************************************
	// ********* Get/Set Section **********
	// ************************************
	
	getName : function() {
		return this.name;
	},
	
	// **********************************
	// ********* Tests Section **********
	// **********************************
	
	listExtraFunctions : function() {
		"use strict"
		// Functiom v1.1
		// Function compares this modules methods against the controllers methods
		// this test wont throw exceptions and is only used to check for unneeded functions
		var controllerFunctions = [],
			myFunctions = [],
			count;
			
			myFunctions = testController.getAllMethods(this);
			controllerFunctions = testController.getAllMethods(myViewModelRR);
			
			
			console.group("HTML View : testModule()");
			for ( count = 0; count < myFunctions.length; count = count + 1) {
				if (( controllerFunctions.indexOf(myFunctions[count]) == -1) && ( myFunctions[count] !== "listExtraFunctions")){
					console.log("%cExtra Method : " + myFunctions[count],"color:red");
				}
			};
			console.groupEnd();
		
	
	},
	
	
	
	// **********************************
	// ******* End Tests Section ********
	// **********************************
    
    // Register Screen Section
    
    clearFields : function () {
        document.getElementById('registerUserName').value = '';
        document.getElementById('registerFirstName').value = '';
        document.getElementById('registerLastName').value = '';
        document.getElementById('registerSchool').value = '';
        document.getElementById('registerClass').value = '';
    },
	// *************************************
	// ******* Login Screen Section ********
	// *************************************
	
	attemptLogin : function() {
		"use strict";
		mainController.processLogin(document.getElementById("loginUserName").value, document.getElementById("loginPassword").value);
	},
	
	loginSuccessful : function() {
		"use strict";
		this.showHomeScreen();
	},
	
	badLogin : function () {
		"use strict";
		document.getElementById("loginPassword").value = "";
	},
	
	// *************************************
	// ***** End Login Screen Section ******
	// *************************************
	
	// ***********************************************
	// ************ Home Screen Section **************
	// ***********************************************
	
	displayPlayerName : function (username) {
		"use strict";
		console.groupCollapsed("viewModule : displayPlayerName()")
		//console.log(username);
		//document.getElementById('welcome').textContent = 'Welcome, ' + username;
		console.groupEnd();
	},
	
	// ***********************************************
	// ********** End Home Screen Section ************
	// ***********************************************
	
	// ********************************************
	// ******* Level Select Screen Section ********
	// ********************************************
	
	displayLevelList: function (levelList) {
		"use strict"
		// displayLevelList() function v1.6
		// This function takes an input 2D array containing the
		// level data in the following format
		// ["01",avatarName,"Ice Cream Zone"]
		// ["02",avatarName,"Jungle Zone"]
		// ["03",avatarName,"Clouds Zone"]
		var count,
			newDiv,
			newHeading,
			levelSelectMainDiv = document.getElementById("levelSelectScreenMainArea");
		
		console.groupCollapsed("viewModule : displayLevelList()");
		console.groupCollapsed("Input")
		console.log(levelList);
		console.groupEnd();
		
		if ( (levelList.length > 0 ) && ( levelList[0].length === 4 ) ){
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
				
				newHeading = document.createElement("H2");
				newHeading.textContent = levelList[count][2];
				newDiv.appendChild(newHeading);
				
				
				levelSelectMainDiv.lastChild.appendChild(newDiv);
                // This is for setting access to the Levels based on
                // accessibility methods in the level.
				if (levelList[count][3] === true) {
                    newDiv.addEventListener("click", mainController.setCurrentLevel);
                    newDiv.addEventListener("click", mainController.requestAllGamesForLevel);
                };
			};
			this.showLevelSelectScreen();
			console.groupEnd();
		} else {
			console.groupEnd();
			throw "Error : Input Data does not match required format";
		};
		
	},
	// ********************************************
	// ***** End Level Select Screen Section ******
	// ********************************************
	
	// *******************************************
	// ******* Game Select Screen Section ********
	// *******************************************
    
    setGameAndWordList: function () {
        "use strict";
        mainController.setGameAndWordList(this.id);
    },
	
	displayGameOptions: function (gameOptionsData) {
		// displayGameOptions() Function v1.3
		//
		// function accepts a 2D array of games for an input level
		// in the following format.
        // [ 1 , "game01", true ]
		// [ 2 , "game02", false ]
		// [ 3 , "game03", false ]
		
		"use strict";
		var count,
			newHeading,
            newAnchor,
			newDiv,
			gameSelectMainDiv = document.getElementById("gameOptionsContainer");
		// The html inside the div containing the game options needs
		// to be cleared each time a level's game options are selected.
		while ( gameSelectMainDiv.hasChildNodes() ){
			gameSelectMainDiv.removeChild(gameSelectMainDiv.firstChild);
		};
		
		for (count = 0; count < gameOptionsData.length; count += 1) { 
			if (count % 3 === 0) {
				newDiv = document.createElement("DIV");
				newDiv.className = "gameSelectScreenRow";
				gameSelectMainDiv.appendChild(newDiv);
			};
			
			if ( gameOptionsData.length === (count + 1) && gameOptionsData.length % 3 === 1 ) {
				console.log("displayGameOptions() : Last Item");
				newDiv = document.createElement("DIV");
				newDiv.className = "gameSelectScreenGame";
				gameSelectMainDiv.lastChild.appendChild(newDiv);
			};
			
            newAnchor = document.createElement("A");
            newAnchor.href = "#gameIntroModal";
			newDiv = document.createElement("DIV");
			newDiv.className = "gameSelectScreenGame";
			//console.log("gameScreenButton" + (count + 1));
			//console.log("gameScreenButton" + gameOptionsData[count][0]);
			newDiv.id = "gameScreenButton" + gameOptionsData[count][0];
			newHeading = document.createElement("H1");
            newHeading.textContent = gameOptionsData[count][1];
			newDiv.appendChild(newHeading);
            
            newAnchor.appendChild(newDiv);
			
			gameSelectMainDiv.lastChild.appendChild(newAnchor);
			
			// Adding event-listeners to the div. The setGameWordList() function now has an input parameter. Need to use closures in order to ensure the correct parameter is passed to the setGameWordList() function
            newDiv.addEventListener("click", this.setGameAndWordList);
            newDiv.addEventListener("click", mainController.checkGameResumption);
			newDiv.addEventListener("click", this.showGameScreen);
            // This is looking for a tag that determines accessibility. 
            if (gameOptionsData[count][2] === true) {
                newDiv.addEventListener("click", this.setGameAndWordList);
                newDiv.addEventListener("click", mainController.checkGameResumption);
                newDiv.addEventListener("click", this.showGameScreen);
            }
            // newDiv.addEventListener("click", mainController.setTimerGameScreenIntro);
			
		};
		this.showGameSelectScreen();
	},
	// *******************************************
	// ***** End Game Select Screen Section ******
	// *******************************************
	
	// *******************************************
	// ********** Game Screen Section ************
	// *******************************************
	
	clearTimer: function () {
		window.clearInterval(aTimer);
		console.log("clearTimer: Removed Timer");
	},
	
	displayTextAndScores : function () {
		var startGame,
		goldMedal,
		silverMedal,
		bronzeMedal,
		timer,
		score,
		wordCount,
		game,
		level,
		avatar;
		startGame = document.getElementById('startGameText');
		
	},
	
	
	guessWord : function () {
        "use strict";
		//add code in here to select word based on clickable event.
		// var clickedWord = this.textContent;
		mainController.validateWords(this.textContent);
	},
	
	
	displayMedalCounts : function (inputArray) {
		"use strict";
		document.getElementById("goldStarCounter").textContent = inputArray[0];
		document.getElementById("silverStarCounter").textContent = inputArray[1];
		document.getElementById("bronzeStarCounter").textContent = inputArray[2];
	
	},
    
    setLearnWordOn: function () {
        "use strict";
        document.getElementById('learnWordText').className = "learning";
    },
    
    setLearnWordNormal: function () {
        "use strict";
        document.getElementById('learnWordText').className = "normal";
    },
	
	toggleLearnWord : function () {
        "use strict";
		var learnWordButton = document.getElementById('learnWordText');
		if (learnWordButton.className === "normal") {
			learnWordButton.className = "learning";
		} else if (learnWordButton.className === "learning"){
			learnWordButton.className = "normal";
		}
	},
	
	addEventLearnWord : function () {
        "use strict";
		var learnWordButton = document.getElementById('learnWordText');
		learnWordListener = function () {
			myViewModelRR.removeLearnWord();
			mainController.learnWord();
		};
		learnWordButton.addEventListener("click", learnWordListener);
	},
	
	removeLearnWord : function () {
        "use strict";
		var learnWordButton = document.getElementById('learnWordText');
		learnWordButton.removeEventListener("click", learnWordListener);
	},
	
	displayTable : function (inputArray) {
        // "use strict";
		var newRow,
			newCell,
			wordCount,
			clickCount,
			tableWidth = 5,
			cells,
			htmlTable;
		
		console.log("displayTable(): " + inputArray);
		htmlTable = document.getElementById("gameWordTable");

		htmlTable.innerHTML = ""; // clear table each time its run
		newRow = htmlTable.insertRow(-1);

		for ( wordCount = 0; wordCount < inputArray.length; wordCount = wordCount + 1) {
			if ( htmlTable.lastChild.lastChild.cells.length === tableWidth ) {
				newRow = htmlTable.insertRow(-1);
			};
			newCell = newRow.insertCell(-1);
			newCell.innerHTML = inputArray[wordCount];
			newCell.id = "cell" + wordCount;
			newCell.className = "gameWordCell";
		}/*
        var count,
            cellArray,
            widestCell,
            widestCellWidth = 0;
        // Setting the cells of the table to a uniform size
        cellArray = document.getElementsByClassName("gameWordCell");
        for ( count = 0; count < cellArray.length; count = count + 1) {
            if ( cellArray[count].offsetWidth > widestCellWidth ) {
                widestCellWidth = cellArray[count].offsetWidth;
                widestCell = count;
            }
        }
        console.log("hi");
        console.log("displayTable(): widestCellWidth: " + widestCellWidth + "  Stylesheet: " + document.styleSheets[0]);
        document.styleSheets[0].insertRule("td.wordCell { width : calc(" + widestCellWidth + "px + 1.5em);}", 1);*/
    },
    
    setUniformCellWidth: function () {
        "use strict";
        var count,
            cellArray,
            widestCell,
            widestCellWidth = 0;
        // Setting the cells of the table to a uniform size
        cellArray = document.getElementsByClassName("gameWordCell");
        for ( count = 0; count < cellArray.length; count = count + 1) {
            if ( cellArray[count].offsetWidth > widestCellWidth ) {
                widestCellWidth = cellArray[count].offsetWidth;
                widestCell = count;
            }
        }
        console.log("displayTable(): widestCellWidth: " + widestCellWidth + "  Stylesheet: " + document.styleSheets[0]);
        document.styleSheets[0].insertRule("td.gameWordCell { width : calc(" + widestCellWidth + "px + 1.5em);}", 0);
	},
	
	eventClickAdd : function () {
        "use strict";
		var cellCount,
            cells = document.getElementsByClassName('gameWordCell');
		for (cellCount = 0; cellCount < cells.length; cellCount = cellCount + 1) {
			cells[cellCount].addEventListener("click", viewHTMLModule.guessWord);
			/*console.log("displayTable(inputArray): newCell.text: " + cells[cellCount].textContent)*/
		};
	},
	
	removeEventClick : function () {
        "use strict";
		var cellCount,
            cells = document.getElementsByClassName('gameWordCell');
		for (cellCount = 0; cellCount < cells.length; cellCount = cellCount + 1) {
			cells[cellCount].removeEventListener("click", viewHTMLModule.guessWord);
			/*console.log("displayTable(inputArray): newCell.text: " + cells[cellCount].textContent)*/
		};
	},
	 
    displayWordsCompleted: function (progressData) {
        "use strict";
        document.getElementById("gameProgressText").textContent = progressData[0] + "/" + progressData[1] + " Words Complete";   
    },
    
    displayScore: function (score) {
        "use strict";
        document.getElementById("gameScore").textContent = score;
    },
    
    displayLevelGameNumber: function (levelGame) {
        "use strict";
        if (levelGame[0] === 0) {
            levelGame[0] = "Bonus";
        }
        document.getElementById("gameLevelIDText").textContent = "Level " + levelGame[0] + " - Game " + levelGame[1];
    },
	
	displayAvatar: function (avatar) {
		var theAvatar = document.getElementById('gameAvatar');
		theAvatar.src = "images/" + avatar.getName() + ".png";
	},
    
    displayGameTimer: function () {
        "use strict";
        var secsDisplay,
            minsDisplay;
        gameTimerSecs += Number(1);
        if (gameTimerSecs % 60 === 0) {
            gameTimerMins += Number(1);
        }
        secsDisplay = gameTimerSecs % 60;
        if (secsDisplay < 10) {
            secsDisplay = '0' + secsDisplay;    
        }
        document.getElementById("gameTimer").textContent = gameTimerMins + " : " + secsDisplay;
    },
    
    resetGameTimer: function () {
        "use strict";
        document.getElementById("gameTimer").textContent = "0 : 00";
    },
    
    playWordInSentence: function (currentWord, attr, characterArray) {
        "use strict";
        // Clear the display of the word which the player has to learn
        myViewModelRR.clearLearnWord();
        // The system will play an audio recording of a sentence containing the current word to be learned
        // and possibly the word will flash when the word is spoken - that would be hard to get right for every different sentence!
        
        // Then after the sentence is finished the word will disappear
        
        // And then the word will be announced one last time
        learnWordTimerE = setTimeout(function() { viewHTMLModule.updateCurrentWord(currentWord, attr, characterArray); }, 1000); 
    },
    
    displayDottedWord: function (currentWord, attr, characterArray) {
        "use strict";
        // Clear the display of the word which the player has to learn
        myViewModelRR.clearLearnWord();
        // Display the current word on the game screen in JarmanDotted font
        viewHTMLModule.displayWord(characterArray, "JarmanDotted");
        // The word is spoken at the same time it is displayed in dotted letters
        viewHTMLModule.updateCurrentWord(currentWord, attr, characterArray);
    },
	
	updateCurrentWord : function (currentWord, attr, characterArray) {
        "use strict";
		var duration,
            levelNumber = rocketReadingModel.getCurrentGameData().getCurrentLevel().getLevelNumber(),
            gameNumber = rocketReadingModel.getCurrentGameData().getCurrentGame().getNumber(),
			audio = document.createElement('AUDIO');
		document.getElementById("gameGame").appendChild(audio);
        audio.setAttribute("src","audio/Level" + levelNumber + "Game " + gameNumber + "/" + currentWord + ".wav")
        audio.setAttribute("id","audioPlayer");
        audio.play()
        audio.addEventListener('loadedmetadata', function(){
            duration = audio.duration;
            duration = duration * 1000 + 1000; // Give the player a bonus second
            // duration = duration * 1000;
            learnWordTimerA = setTimeout(function (){	
                if (attr === 'normalWord') {
                    viewHTMLModule.eventClickAdd();
                    mainController.createWordTimer();
                    mainController.requestBarTimer();
                } else if (attr === 'learnWord') {
                // this is for repeating words based on Learn Word scenario
                    learnWordCount -= 1;
                    if (learnWordCount === 3) {
                        // It may not be worthwhile assigning these setTimeouts to variables because it seems that these timers should not be stopped - the sequence will play through and then the user will have a go at identifying the word
                        learnWordTimerB = setTimeout(function() { viewHTMLModule.updateCurrentWord(currentWord, attr, characterArray); }, 100);
                    } else if (learnWordCount === 2) {
                        // The word to be learned is displayed in dotted lines and the word will have been announced again
                        learnWordTimerC = setTimeout(function() { viewHTMLModule.displayDottedWord(currentWord, attr, characterArray); }, 1000);
                    } else if (learnWordCount === 1) {
                        // The word is included as part of a spoken sentence
                        learnWordTimerD = setTimeout(function() { viewHTMLModule.playWordInSentence(currentWord, attr, characterArray); }, 1500);
                    } else if (learnWordCount === 0) {
                        // Then the user should be given the chance to identify the word in the table after the word has been spoken for the last time. The cells of the table will be enabled
                        viewHTMLModule.eventClickAdd();
                    }
                }
            }, duration);
        });
    },
  
    displayWord : function (characterArray, fontType) {
        "use strict";
        var count = 0,
            letters,
            string = '',
            displayWord = document.getElementById('gameDisplayWord');
        letters = document.createElement('P');
        letters.id = "gameLearnWordText";
        displayWord.appendChild(letters);
        for (count; count < characterArray.length; count++) {
            string = string + characterArray[count] + "  ";
        };
        letters.textContent = string;
        
        if (fontType === "Comic Sans MS") {
            document.getElementById("gameLearnWordText").className = "fontComicSansMS";
        } else if (fontType === "JarmanDotted") {
            document.getElementById("gameLearnWordText").className = "fontJarmanDotted";
        }
    },
    
    clearLearnWord: function () {
        "use strict";
        var learnWord = document.getElementById("gameDisplayWord");
        while ( learnWord.hasChildNodes() ){
            learnWord.removeChild(learnWord.firstChild);
	    };
    },
    
    animateBarTimer: function (lastTime, myTimerBar) {
        "use strict";
        var canvas = document.getElementById("gameTimerCanvas"),
            context = canvas.getContext("2d"),
            date = new Date(),
            time = date.getTime(),
            timeDiff = time - lastTime,
            linearSpeed = canvas.height / 8, // pixels per second
            linearDistEachFrame = linearSpeed * timeDiff / 1000;
     
        if (myTimerBar.y < canvas.height) {
            myTimerBar.y += linearDistEachFrame;
        }
        lastTime = time;
     
        // clear
        context.clearRect(0, 0, canvas.width, canvas.height);
     
        // draw
        context.beginPath();
        context.rect(myTimerBar.x, myTimerBar.y, myTimerBar.width, myTimerBar.height);
     
        context.fillStyle = barColour;
        context.fill();
        context.lineWidth = myTimerBar.borderWidth;
        context.strokeStyle = barBorderColour;
        context.stroke();
     
        // request new frame
        requestAnimFrame(function(){
            viewHTMLModule.animateBarTimer(lastTime, myTimerBar);
        });
    },
    
    changeBarSilver: function () {
        "use strict"
        console.log("changeBarBronsze() has run");
        barColour = "silver";
        barBorderColour = "silver";
    },

    changeBarBronze: function () {
        "use strict"
        console.log("changeBarBronze() has run");
        barColour = "Peru";
        barBorderColour = "Peru";
    },
    
    hideBarTimer: function () {
        "use strict";    
        document.getElementById("gameTimerCanvas").style.display = "none";
    },
    
    startBarTimer: function () {
        "use strict"; 
        var myTimerBar = {
                x: 0,
                y: 0,
                width: 50,
                borderWidth: 1,
            }, 
            date = new Date(),
            time = date.getTime();
        
        document.getElementById("gameTimerCanvas").style.display = "block";  
        myTimerBar.height = document.getElementById("gameTimerCanvas").height;
        barColour = "gold";
        barBorderColour = "gold";
        // Call the function to animate the timer-bar
        viewHTMLModule.animateBarTimer(time, myTimerBar);
        
        silverBar = setTimeout("viewHTMLModule.changeBarSilver()", 2000);
        bronzeBar = setTimeout("viewHTMLModule.changeBarBronze()", 4000);
    },
    
    /*displayGameIntroConfirm: function () {
        "use strict";
        var userChoice = confirm("Click OK to start the game. Or click Cancel to go back to the previous page");
        if (userChoice) {
            mainController.startGame();    
        } else {
            this.showGameSelectScreen();
        }
    },*/
    
	// *******************************************
	// ********* End Game Screen Section *********
	// *******************************************
	
	// ******************************************
	// *********** Show Pages Section ***********
	// ******************************************
	
	hideAllPages: function () {
		"use strict";
		console.groupCollapsed("viewModule : hideAll()");
		var screens = [],
			count;
		screens = document.getElementsByClassName("navScreen");
		for ( count = 0; count < screens.length; count = count + 1 ) {
			console.log("hideAll() : Hiding " + screens[count].id);
			screens[count].hidden = true;
		};
		console.groupEnd();
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
	},
   
	showHighScoresScreen: function () {
		"use strict";
		viewHTMLModule.hideAllPages();
		document.getElementById("highScoresScreen").hidden = false;
		console.log("HTMLView.js : Showing High Score screen");
	},
    
    showRegisterScreen : function () {
        "use strict";
        viewHTMLModule.hideAllPages();
        document.getElementById("registerScreen").hidden = false;
        console.log("HTMLView.js: Showing Register Screen");
    },
	// ******************************************
	// ********** Initialise Section ************
	// ******************************************
	
	intitialiseView : function()  {
        // Register Screen
        
        document.getElementById("registerData").addEventListener("click", mainController.registerPlayer);
        document.getElementById("registerData").addEventListener("click", this.clearFields);
        document.getElementById("registerData").addEventListener("click",this.showLoginScreen);
        document.getElementById("registerExit").addEventListener("click",this.showLoginScreen);
       
		// Login Screen
		document.getElementById("loginEnterBtn").addEventListener("click", this.attemptLogin, false);
        document.getElementById("loginRegisterBtn").addEventListener("click", this.showRegisterScreen);
		
		// Home Screen
		document.getElementById("homePlayGame").addEventListener("click", mainController.requestAllLevels);
		document.getElementById("homeHighScores").addEventListener("click", this.showHighScoresScreen);
		document.getElementById("homeExit").addEventListener("click",this.showLoginScreen);
        document.getElementById("homeContinue").addEventListener("click", mainController.resolveContinueBtn);
		
		// Level Select Screen
		document.getElementById("levelSelectHomeButton").addEventListener("click", this.showHomeScreen);
		
		// Game Select Screen
		document.getElementById("gameSelectHomeButton").addEventListener("click", this.showLevelSelectScreen);
		
		// Game Screen
		document.getElementById("gameHomeLink").addEventListener("click", this.showHomeScreen);
        // This clears the timer of an individual test in a game if the user returns to the home page
		// document.getElementById("gameHomeLink").addEventListener("click", this.clearTimer); // mainController.leaveCurrentGame() can call this
        // If the user clicks the home button while playing the game then the system will have to save the user's details to the currentGameData object
        document.getElementById("gameHomeLink").addEventListener("click", mainController.leaveCurrentGame);
        document.getElementById("gameHomeLink").addEventListener("click", this.showHomeScreen);
        document.getElementById("gameBack").addEventListener("click", this.showGameSelectScreen);
        document.getElementById("gameStart").addEventListener("click", mainController.startGame);
        document.getElementById("gameReplay").addEventListener("click", mainController.replayGame);
		
		// High Scores Screen
		document.getElementById("highScoreScreenHomeButton").addEventListener("click", this.showHomeScreen);
	}
};