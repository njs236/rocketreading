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
		// Function v1.1
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
		"use strict";
		// Function clear the login fields
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
		// Function is attached as an event listener to the Login Button on the login screen
		mainController.processLogin(document.getElementById("loginUserName").value.trim(), document.getElementById("loginPassword").value.trim());
	},
	
	loginSuccessful : function() {
		"use strict";
		// Function occurs when the view is told login is successful from the controller
		this.showHomeScreen();
	},
	
	badLogin : function () {
		"use strict";
		// Function occurs when the view is told login is unsuccessful from the controller
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
	
	checkLogout: function () {
		"use strict";
		// Function displays the logout confirmation menu
		location.hash = "homeCheckLogoutModal";
	},
	
	logoutPlayer: function () {
		"use strict";
		// Added as event listener to the logout button
		mainController.logoutPlayer();
	},
	
	// ***********************************************
	// ********** End Home Screen Section ************
	// ***********************************************

	// **************************************************
	// ********** High Scores Screen Section ************
	// **************************************************
	
	highScoresPageClearScores : function () {
		"use strict";
		// this function removes all high scores from the screen
		var tableArea = document.getElementById("highScoresTableArea");
		while ( tableArea.hasChildNodes() ) {
			tableArea.removeChild(tableArea.firstChild);
		};
	},
	
	highScoresPageBuildLevelSelect : function () {
		"use strict";
		// this function removes all high scores from the screen
		var buttonArea = document.getElementById("highScoresIcons"),
			count = 0,
			levelList = [],
			newDiv,
			newHeading;
		
		console.groupCollapsed("highScoresPageBuildLevelSelect");
		
		while ( buttonArea.hasChildNodes() ){
			buttonArea.removeChild(buttonArea.lastChild);
		}
		
		console.log(mainController.requestAllLevels());
		levelList = mainController.requestAllLevels();
		for ( count = 0; count < levelList.length; count = count + 1){
			console.log("Building level " + levelList[count][0]);
			newDiv = document.createElement("DIV");
			newDiv.className = "highScoreIcon";
			newDiv.id = "highScoreScreenLevel" + levelList[count][0];
			newDiv.style.backgroundImage = "url(images/" + levelList[count][1] + ".png)";
			newDiv.addEventListener("click",this.highScoresPageParseButton);
			
			newHeading = document.createElement("H2");
			newHeading.textContent = levelList[count][2];
			
			newDiv.appendChild(newHeading);
			buttonArea.appendChild(newDiv);
		}
			
		console.groupEnd();
	},
	
	highScoresPageParseButton : function () {
		"use strict";
		// this function takes an input id from the dom and parses it for level numbers
		// and clears the table then requests a new one with the parsed value.
		var levelId;
		
		console.group("HTML View : highScoresPageParseButton()");
		console.log("Input id : " + this.id);
		levelId = mainController.getStringNumber(this.id);
		console.log("Level Id post-parse : " + levelId);
		viewHTMLModule.highScoresPageClearScores();
		console.groupEnd();
		myViewModelRR.displayHighScores(levelId);
	},
	
	displayHighScores : function (inputArray) {
		"use strict";
		var newHeading,
			newTable,
			newRow,
			newCell,
			parentDiv,
			count;
		
		parentDiv = document.getElementById("highScoresTableArea");
		
		newHeading = document.createElement("H2");
        if (inputArray[0] !== 0) {
            newHeading.textContent = "High Scores for level " + inputArray[0];
        } else if (inputArray[0] === 0){
            newHeading.textContent = "High Scores for bonus level";
        }
		
		parentDiv.appendChild(newHeading);
		
		
		newTable = document.createElement("TABLE");
		newTable.id = "highScoresTableDisplay";
		
		parentDiv.appendChild(newTable);
		newRow = newTable.insertRow(-1);
		for ( count = 1; count <= (inputArray.length -1); count = count + 1){
			newCell = newRow.insertCell(-1);
            newCell.className = "highScoresCell";
            if (count !== (inputArray.length - 1)) {
                newCell.textContent = "Game " + count;
            } else {
                newCell.textContent = "Total";
            }
		};
		
		newRow = newTable.insertRow(-1);
		for ( count = 1; count < inputArray.length; count = count + 1){
			newCell = newRow.insertCell(-1);
			newCell.textContent = inputArray[count];
            newCell.className = "highScoresCell";
		};
        
		// Setting the cells of the high scores table to a uniform size
        viewHTMLModule.setUniformCellWidth("highScoresCell");
	},
	// **************************************************
	// ************ End High Scores Section ************
	// **************************************************
	

	// ********************************************
	// ******* Level Select Screen Section ********
	// ********************************************
	
	displayLevelList: function (levelList) {
		"use strict"
		// displayLevelList() function v1.6
		// This function populates the level select screen with levels from the game
		// This function takes an input 2D array containing the
		// level data in the following format
		// [levelNumber,avatarName,levelName,unlocked]
		// for example :
		// ["1",avatarName,"Ice Cream Zone",true]
		// ["2",avatarName,"Jungle Zone",false]
		// ["3",avatarName,"Clouds Zone",false]
		var count,
			newDiv,
			newHeading,
			levelSelectMainDiv = document.getElementById("levelSelectScreenMainArea");
		
		console.group("viewModule : displayLevelList()");
		console.group("Input")
		console.log(levelList);
		console.groupEnd();
		
		if ( (levelList.length === 0 ) || ( levelList[0].length !== 4 ) ){
			console.groupEnd();
			throw "Error : Input Data does not match required format";
		};
		
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
			
			// Create a new level div
			newDiv = document.createElement("DIV");
			newDiv.className = "levelSelectIconContainer";
			if (levelList[count][3] === false) {
				newDiv.className += " locked";
			};
			newDiv.id = "level" + levelList[count][0];
			// there should be an image in the images folder matching the avatar name
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
			
			newDiv = document.createElement("DIV");
			newDiv.className = 'levelSelectLockContainer';
			newDiv.id = "divImgLockContainer" + levelList[count][0];
			if (levelList[count][3] === true) {
				newDiv.hidden = 'true';   
			}
			
			document.getElementById("level" + levelList[count][0]).appendChild(newDiv);
			
		};
		//this.showLevelSelectScreen();
		console.groupEnd();
		
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
		// This function populates the game select screen with games
		// from the previously chosen level.
		// function accepts a 2D array of games for an input level
		// in the following format.
		// [ gameNum, gameName, unlocked]
		// [ 1 , "game01", true ]
		// [ 2 , "game02", false ]
		// [ 3 , "game03", false ]
		
		"use strict";
		var count,
			newHeading,
			newDiv,
			gameSelectMainDiv = document.getElementById("gameOptionsContainer");
		// The html inside the div containing the game options needs
		// to be cleared each time a level's game options are selected.
		while ( gameSelectMainDiv.hasChildNodes() ){
			gameSelectMainDiv.removeChild(gameSelectMainDiv.firstChild);
		};
        
        // update the background image for the current level, the image for the level must be a .jpg and be saved with the same file name as the first game of the level.
        document.getElementById("gameSelectScreen").style.backgroundImage = "url(images/" + encodeURIComponent(gameOptionsData[0][1]) + ".jpg)";
        // set the foreground pictures
        document.getElementById("imgGSSLeftImage").style.backgroundImage = "url(images/left" + encodeURIComponent(gameOptionsData[0][1]) + ".png)";
        document.getElementById("imgGSSRightImage").style.backgroundImage = "url(images/right" + encodeURIComponent(gameOptionsData[0][1]) + ".png)";
		
		for (count = 0; count < gameOptionsData.length; count += 1) { 
			if (count % 3 === 0) {
				newDiv = document.createElement("DIV");
				newDiv.className = "gameSelectScreenRow";
				gameSelectMainDiv.appendChild(newDiv);
			};
			
			if ( gameOptionsData.length === (count + 1) && gameOptionsData.length % 3 === 1 ) {
				console.log("displayGameOptions() : Last Item");
				newDiv = document.createElement("DIV");
				newDiv.className = "gameSelectScreenGame gameSelectEmpty";
				gameSelectMainDiv.lastChild.appendChild(newDiv);
			};
			
			newDiv = document.createElement("DIV");
			newDiv.className = "gameSelectScreenGame";
			//console.log("gameScreenButton" + (count + 1));
			//console.log("gameScreenButton" + gameOptionsData[count][0]);
			newDiv.id = "gameScreenButton" + gameOptionsData[count][0];
            // add the background image to the div (image must be a .png with the same name as the word list)
            newDiv.style.backgroundImage = "url(images/" + encodeURIComponent(gameOptionsData[count][1]) + ".png)";
            if (gameOptionsData[count][2] === false) {
				newDiv.className += " gameSelectLocked";
			}
            
			newHeading = document.createElement("H1");
			newHeading.textContent = gameOptionsData[count][1];
			newDiv.appendChild(newHeading);
			
			gameSelectMainDiv.lastChild.appendChild(newDiv);
			
			// Adding event-listeners to the div. The setGameWordList() function now has an input parameter. Need to use closures in order to ensure the correct parameter is passed to the setGameWordList() function
			// This is looking for a tag that determines accessibility. 
			if (gameOptionsData[count][2] === true) {
				newDiv.addEventListener("click", this.setGameAndWordList);
				newDiv.addEventListener("click", mainController.checkGameResumption);
				newDiv.addEventListener("click", this.showGameScreen);
			}
            
            // add a lock to the div if it is not yet accessible to the user
            
            newDiv = document.createElement("DIV");
			newDiv.className = 'gameSelectLockContainer';
			newDiv.id = "divImgLockContainer" + gameOptionsData[count][0];
			if (gameOptionsData[count][2] === true) {
				newDiv.hidden = 'true';   
			}
			
			document.getElementById("gameScreenButton" + gameOptionsData[count][0]).appendChild(newDiv);
            
			// newDiv.addEventListener("click", mainController.setTimerGameScreenIntro);
			
		};
		this.showGameSelectScreen();
        viewHTMLModule.addEventListGameBack();
        viewHTMLModule.addEventListGameStartNew();
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
	
	/*displayTextAndScores : function () {
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
	},*/
	
	
	guessWord : function () {
		"use strict";
		//add code in here to select word based on clickable event.
		// var clickedWord = this.textContent;
		mainController.validateWords(this.textContent);
	},
	
	
	displayMedalCounts : function (inputArray) {
		"use strict";
		// Function updates the medal counters with values in the array
		// Input pattern :
		// [GoldCount,SilverCount,BronzeCount]
		
		if ( inputArray.length !== 3){
			throw "Display Medal Counts Error, Array Is the wrong length";
		};
		document.getElementById("goldStarCounter").textContent = inputArray[0];
		document.getElementById("silverStarCounter").textContent = inputArray[1];
		document.getElementById("bronzeStarCounter").textContent = inputArray[2];
	
	},
	
	setLearnWordOn: function () {
		"use strict";
		//Function Reveals the learn word button
		document.getElementById('learnWordButton').hidden = false;
	},
	
	setLearnWordNormal: function () {
		"use strict";
		//Function hides the learn word button
		document.getElementById('learnWordButton').hidden = true;
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
	
	learnWordListener: function () {
		"use strict";
		myViewModelRR.removeLearnWord();
		mainController.learnWord();
	},
	
	addEventLearnWord : function () {
		"use strict";
		//var learnWordButton = document.getElementById('learnWordButton');
		document.getElementById('learnWordButton').addEventListener("click", viewHTMLModule.learnWordListener);
	},
	
	removeLearnWord : function () {
		"use strict";
		var learnWordButton = document.getElementById('learnWordButton');
		learnWordButton.removeEventListener("click", viewHTMLModule.learnWordListener);
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
		}
        // Set the cells of the table to a uniform size
        viewHTMLModule.setUniformCellWidth("gameWordCell");
	},
	
	setUniformCellWidth: function (cellClassName) {
		"use strict";
		var count,
			cellArray,
			widestCell,
			widestCellWidth = 0;
		// Setting the cells of the table to a uniform size
		cellArray = document.getElementsByClassName(cellClassName);
		for ( count = 0; count < cellArray.length; count = count + 1) {
			if ( cellArray[count].offsetWidth > widestCellWidth ) {
				widestCellWidth = cellArray[count].offsetWidth;
				widestCell = count;
			}
		}
		console.log("displayTable(): widestCellWidth: " + widestCellWidth + "  Stylesheet: " + document.styleSheets[0]);
		document.styleSheets[0].insertRule("td." + cellClassName + " { width : calc(" + widestCellWidth + "px + 1.5em);}", 1);
	},
    
    setStandardCellSize : function (cellClass) {
        "use strict";
        var count,
            widestCell,
            widestCellWidth = 0,        
            cellArray = document.getElementsByClassName(cellClass),
            highestCellHeight = cellArray[0].offsetHeight;
            console.log("highestCellHeight: " + highestCellHeight); // test
        for ( count = 0; count < cellArray.length; count = count + 1) {
            if ( cellArray[count].offsetWidth > widestCellWidth ) {
                widestCellWidth = cellArray[count].offsetWidth;
                widestCell = count;
            }
        }
        
        console.log("Widest cell: " + widestCellWidth); // test
        // The box-sizing of the bonus table cells has been set to content-box to enable the following line to make all the cells the same width and height as the heading cells.
        for (count = 0; count < cellArray.length; count += 1) {
            cellArray[count].style.width = "calc(" + widestCellWidth + "px + 0.6em)";
            cellArray[count].style.height = highestCellHeight + "px"; 
        }
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
        var secsDisplay; 
        
        gameTimerMins = Math.floor(gameTimerSecs / 60);
        secsDisplay = gameTimerSecs % 60;
        if (secsDisplay < 10) {
			secsDisplay = '0' + secsDisplay;	
		}
        document.getElementById("gameTimer").textContent = gameTimerMins + ":" + secsDisplay;
    },
	
	incrementGameTimer: function () {
		"use strict";
		var secsDisplay;
            
		gameTimerSecs += Number(1);
		if (gameTimerSecs % 60 === 0) {
			gameTimerMins += Number(1);
		}
		secsDisplay = gameTimerSecs % 60;
		if (secsDisplay < 10) {
			secsDisplay = '0' + secsDisplay;	
		}
		document.getElementById("gameTimer").textContent = gameTimerMins + ":" + secsDisplay;
	},
	
	resetGameTimer: function () {
		"use strict";
		document.getElementById("gameTimer").textContent = "0:00";
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
			levelNumber = rocketReadingModel.getCurrentGameData().getCurrentLevelGame()[0],
			gameNumber = rocketReadingModel.getCurrentGameData().getCurrentGame().getNumber(),
			audio = document.createElement('AUDIO');
		document.getElementById("gameGame").appendChild(audio);
		audio.setAttribute("src","audio/Level" + levelNumber + "Game " + gameNumber + "/" + currentWord + ".wav")
		audio.setAttribute("id","audioPlayer");
		audio.play()
		audio.addEventListener('loadedmetadata', function(){
			duration = audio.duration;
			// duration = duration * 1000 + 1000; // Give the player a bonus second
			duration = duration * 1000;
			// It is worthwhile assigning these setTimeouts to variables because the timers will need to stopped if the user leaves the current game and moves to a different screen
			learnWordTimerA = setTimeout(function (){
				if (attr === 'normalWord') {
					viewHTMLModule.eventClickAdd();
					mainController.createWordTimer();
					mainController.requestBarTimer();
				} else if (attr === 'learnWord') {
				// this is for repeating words based on Learn Word scenario
					learnWordCount -= 1;
					if (learnWordCount === 3) {
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
						viewHTMLModule.learnWordIsFinished();
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
			wordToBeLearned = document.getElementById('gameDisplayWord');
		letters = document.createElement('H1');
		letters.id = "gameLearnWordText";
		wordToBeLearned.appendChild(letters);
		for (count; count < characterArray.length; count++) {
			string = string + characterArray[count] + "	 ";
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
	
    displayGameResults : function (levelNumber, gameNumber, medalCounts) {
        var goldStars = document.getElementById('gameNextModalGoldStar'),
            silverStars = document.getElementById('gameNextModalSilverStar'),
            bronzeStars = document.getElementById('gameNextModalBronzeStar'),
            finishMessage = document.getElementById("gameNextGameMessage");
        goldStars.textContent = medalCounts[0];
        silverStars.textContent = medalCounts[1];
        bronzeStars.textContent = medalCounts[2];
        finishMessage.textContent = "Game Finished! You completed Level "+ levelNumber + " Game " + gameNumber;
        // this.finishedGame();
        this.showFinishedGameModal();
        // mainController.finishGame(); // This function can be called from initialiseNextWord()
    },
    
    // This function may not be necessary if it is only called from one place
	finishedGame : function () {
		"use strict";
		/*this.closeModal();*/
		this.showFinishedGameModal();
	},
    
    // Event listeners:
    
    addEventListGameStartNew: function () {
    // This function should not be called if the user is returning to a previous game. These event listeners should only be added if the user is starting a new game
        "use strict";
        document.getElementById("gameStart").addEventListener("click", mainController.setSavedGameNull);
        //document.getElementById("gameStart").addEventListener("click", mainController.checkGameResumption);
        document.getElementById("gameStart").addEventListener("click", mainController.startGame);
    },
    
    addEventListStartClearSavedGame: function () {
    // This event listener will clear the record of the player having a saved game
        "use strict";
        document.getElementById("gameStart").addEventListener("click", mainController.setSavedGameNull);
    },
    
    addEventListGameStartContinue: function () {
    // The following function should not be called if the user is returning to a previous game. This event listener will only be added if the user is starting a new game
        "use strict";
        document.getElementById("gameStart").addEventListener("click", mainController.startGameContinue);
    },
    
    addEventListReplayGame: function () {
        "use strict";
        document.getElementById("gameStart").addEventListener("click", mainController.replayGame);
    },
    
    removeEventListGameStart: function () {
        "use strict";
        document.getElementById("gameStart").removeEventListener("click", mainController.setSavedGameNull);
        document.getElementById("gameStart").removeEventListener("click", mainController.startGameContinue);
        document.getElementById("gameStart").removeEventListener("click", mainController.startGame);
        document.getElementById("gameStart").removeEventListener("click", mainController.replayGame);
        document.getElementById("gameStart").removeEventListener("click", mainController.checkGameResumption);
    },
    
    addEventListGameBack: function() {
    // This event listener will be added if the user has selected a game to play from the game select screen
        "use strict";
        document.getElementById("gameBack").addEventListener("click", viewHTMLModule.showGameSelectScreen);
    },
    
    addEventListContinueGameBack: function () {
    // This event listener will be added if the user is continuing a game
        "use strict";
        document.getElementById("gameBack").addEventListener("click", viewHTMLModule.showHomeScreen);
    },
    
    addEventListGameBackReplay: function () {
        "use strict";
        document.getElementById("gameBack").addEventListener("click", viewHTMLModule.openGameOptions);
    },
    
    addEventListBackNextGame: function () {
        "use strict";
        document.getElementById("gameBack").addEventListener("click", viewHTMLModule.openNextGameModal);
    },
    
    removeEventListsGameBack: function () {
        "use strict";
        document.getElementById("gameBack").removeEventListener("click", viewHTMLModule.showHomeScreen);
        document.getElementById("gameBack").removeEventListener("click", viewHTMLModule.showGameSelectScreen);
        document.getElementById("gameBack").removeEventListener("click", viewHTMLModule.closeModal);
        document.getElementById("gameBack").removeEventListener("click", viewHTMLModule.openNextGameModal);
    },

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
		var styleSheetList = document.styleSheets;
        
        document.styleSheets[3].deleteRule(1);
        if (rocketReadingModel.getMyPlayer().getSavedLevelGame() !== null) {
            document.styleSheets[3].insertRule("#homeContinue:hover {background-image: url(images/continueIconGlow.png); cursor: pointer;}", 1);
        } else {
            document.styleSheets[3].insertRule("#homeContinue:hover { cursor: default;}", 1);
        }
        
		viewHTMLModule.hideAllPages();
		viewHTMLModule.closeModal();
		document.getElementById("homeScreen").hidden = false;
        // If the player goes back to the home screen then the game modal screen's 'gameBack' and 'gameStart' event-listeners can be removed
        viewHTMLModule.removeEventListsGameBack();
        viewHTMLModule.removeEventListGameStart();
		console.log("HTMLView.js : Showing home screen");
        
	},
	
	
	showLevelSelectScreen: function () {
		"use strict";
		viewHTMLModule.hideAllPages();
		myViewModelRR.displayLevelList(mainController.requestAllLevels());
		document.getElementById("levelSelectScreen").hidden = false;
        // If the player goes back to the level select screen then the game modal screen's 'gameBack' and 'gameStart' event-listeners can be removed
        viewHTMLModule.removeEventListsGameBack();
        viewHTMLModule.removeEventListGameStart();
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
		location.hash = "gameIntroModal";
	},
   
	showHighScoresScreen: function () {
		"use strict";
		viewHTMLModule.hideAllPages();
		document.getElementById("highScoresScreen").hidden = false;
		viewHTMLModule.highScoresPageBuildLevelSelect();
		viewHTMLModule.highScoresPageClearScores();
		console.log("HTMLView.js : Showing High Score screen");
	},
	
	showRegisterScreen : function () {
		"use strict";
		viewHTMLModule.hideAllPages();
		document.getElementById("registerScreen").hidden = false;
		console.log("HTMLView.js: Showing Register Screen");
	},
    showAchievementsScreen : function () {
		"use strict";
		viewHTMLModule.hideAllPages();
		document.getElementById("achievementsScreen").hidden = false;
        mainController.returnBadgesByType(1);
		console.log("HTMLView.js: Showing Achievements Screen");
	},
	
	closeModal : function () {
		"use strict";
		location.hash = "Close";
        viewHTMLModule.removeEventListsGameBack();
        console.log("closeModal");
	},
	
	openGameIntro : function () {
		"use strict";
		location.hash = "gameIntroModal";
	},
    
    openGameOptions : function () {
        "use strict";
        location.hash = "gameModal";
    },
    
    openNextGameModal : function () {
        "use strict";
        location.hash = "gameNextGameModal";
    },
	
	correctGuess : function() {
		"use strict";
		location.hash = "gameFeedbackModal";
		window.setTimeout(this.hideFeedbackModal, 500);
	},
	
	
	hideFeedbackModal : function() {
		"use strict";
		location.hash = "";
        console.log("hideFeedbackModal");
	},
	
	learnWordIsActive : function ()	 {
		"use strict";
		console.log("HTMLVIEW: hiding table");
		document.getElementById("gameWordTable").hidden = true;
		this.setLearnWordOn();
	},
	
	learnWordIsFinished : function ()  {
		"use strict";
		console.log("HTMLVIEW: showing table");
		document.getElementById("gameWordTable").hidden = false;
		this.setLearnWordNormal();
	},
	
	showFinishedGameModal : function () {
		"use strict";
		document.location.hash = "gameNextGameModal";
        console.log("showFinishedGameModal");
	},
    
    // ******************************************
	// ************* Badge Section **************
	// ******************************************
    
    
    displayBadge: function (array, div) {
        "use strict";
        //format of Array:
        // [0] badgeIcon
        // [1] badgeName
        // [2] badgeDescription
        var child = document.createElement('DIV');
        child.className= "badge";
        var img = document.createElement('IMG');
        img.src = array[0];
        var h1 = document.createElement('H1');
        h1.textContent = array[1];
        var p = document.createElement('P');
        p.textContent = array[2];
        
        document.getElementById(div).appendChild(child);
        child.appendChild(img);
        child.appendChild(h1);
        child.appendChild(p);
        
    },
	
	displayNotification: function (array) {
		"use strict";
		//format of Array;
		// [0] badgeIcon
		// [1] badgeName
		var div = document.createElement('DIV');
		div.className = "notification";
		var img = document.createElement('IMG');
		img.src = array[0];
		var h1 = document.createElement('H1');
		h1.textContent = array[1];
		
		document.getElementById('homeNotification').appendChild(div);
		div.appendChild(img);
		div.appendChild(h1);
		
		window.setTimeout(function () {
			document.getElementById('homeNotification').removeChild();
		}, 3000);
	},
	
	displayHighScoreForPlayer : function (sum) {
	var home = document.getElementById('homeScoreNum');
		home.textContent = sum;
	},
	
	displayNextTask : function (icon) {
		var home = document.getElementById('homeNextTask');
		home.style.backgroundImage = "url(images/" + encodeURIComponent(icon) + ".png)";
	},
    
    displayBadgeWithPossession : function (array, div) {
        //the format of the array being sent is:
        // [0] badgeIcon
        // [1] badgeName
        // [2] badgeDescription
        // [3] has
        
        var child = document.createElement('DIV');
        //test if player has badge or not
        if (array[3]) {
            child.className = 'badge';
        } else {
            child.className = 'regularBadge';
        };
        
        var img = document.createElement('IMG');
        img.src = array[0];
        var h1 = document.createElement('H1');
        h1.textContent = array[1];
        var p = document.createElement('P');
        p.textContent = array[2];
        
        document.getElementById(div).appendChild(child);
        child.appendChild(img);
        child.appendChild(h1);
        child.appendChild(p);
        
    },
    
    displayNotice: function () {
        var div = document.getElementById('achievementsDisplay');
        var child = document.createElement('DIV');
        child.textContent = "Come back here with a logged in player";
        
        div.appendChild(child);
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
		document.getElementById("homePlayGame").addEventListener("click", this.showLevelSelectScreen);
		document.getElementById("homeHighScores").addEventListener("click", this.showHighScoresScreen);
		document.getElementById("homeContinue").addEventListener("click", mainController.resolveContinueBtn);
        document.getElementById("homeContinue").addEventListener("click", this.addEventListGameStartContinue);
		document.getElementById("homeExit").addEventListener("click",this.checkLogout);
		document.getElementById("homeLogoutYes").addEventListener("click",this.showLoginScreen);
		document.getElementById("homeLogoutYes").addEventListener("click",this.closeModal);
		document.getElementById("homeLogoutYes").addEventListener("click",this.logoutPlayer);
		document.getElementById("homeLogoutNo").addEventListener("click",this.closeModal);
        
		
        // Achievements Screen
        
        
		// Level Select Screen
		document.getElementById("levelSelectHomeButton").addEventListener("click", this.showHomeScreen);
		
		// Game Select Screen
		document.getElementById("gameSelectHomeButton").addEventListener("click", this.showLevelSelectScreen);
		
		// Game Screen
		// This clears the timer of an individual test in a game if the user returns to the home page
		// document.getElementById("gameHomeLink").addEventListener("click", this.clearTimer); // - mainController.leaveCurrentGame() can call this.
		// If the user clicks the home button while playing the game then the system will have to save the user's details to the currentGameData object
		
		// Game Welcome Modal
			// Start Button
		//document.getElementById("gameStart").addEventListener("click", mainController.startGame);
		document.getElementById("gameStart").addEventListener("click", this.closeModal);
        document.getElementById("gameStart").addEventListener("click", this.removeEventListsGameBack);
			// Back Button
		//document.getElementById("gameBack").addEventListener("click", this.showGameSelectScreen);
		document.getElementById("gameBack").addEventListener("click", this.closeModal);

		// Game Menu Modal
			// Home Button
		document.getElementById("gameHomeLink").addEventListener("click", mainController.leaveCurrentGame);
		document.getElementById("gameHomeLink").addEventListener("click", this.showHomeScreen);
			// Resume Button
		document.getElementById("gameModalOptionResumeGame").addEventListener("click",this.closeModal);
			// Replay Button
		document.getElementById("gameReplay").addEventListener("click", this.openGameIntro);
        document.getElementById("gameReplay").addEventListener("click", this.addEventListStartClearSavedGame);
        document.getElementById("gameReplay").addEventListener("click", viewHTMLModule.addEventListGameStartNew);
        document.getElementById("gameReplay").addEventListener("click", viewHTMLModule.addEventListGameBackReplay);

		
		// Game Screen Next Game Modal
			// Home Button
		document.getElementById("gameNextGameButtonMenu").addEventListener("click",this.showHomeScreen);
			// Retry Button
		document.getElementById("gameNextGameButtonRetry").addEventListener("click", this.openGameIntro);
		document.getElementById("gameNextGameButtonRetry").addEventListener("click", this.addEventListStartClearSavedGame);
        document.getElementById("gameNextGameButtonRetry").addEventListener("click", viewHTMLModule.addEventListGameStartNew);
		document.getElementById("gameNextGameButtonRetry").addEventListener("click", viewHTMLModule.addEventListBackNextGame);
		
		
		// High Scores Screen
		document.getElementById("highScoreScreenHomeButton").addEventListener("click", this.showHomeScreen);
	}
};