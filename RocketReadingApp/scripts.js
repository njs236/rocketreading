function showPage1() {
	console.log("hi");
};

var gameLists = [];

function showPage1() {
	console.log("hi");
}

// load lists

function generateLists() {
	"use strict"
	var wordList = [],
		count;
	
	gameLists = [];
	// List 1
	wordList = ["I","am","the","go","going","to","shop","car","at","in","is","Mum","here","and","see","Dad","a","cat","can","said","run","running","jump","jumping","school"];
	
	gameLists.push(wordList);

	wordList = ["we","are","look","dog","come","bus","play","this","there","went","with","asked","bat","hit","ball","kicked","red","boy","girls","big","like","computer","TV","watch","home"];
	
	gameLists.push(wordList);
}

var initialise = function () {
	"use strict";
	
	generateLists();
	
	//document.getElementById("homeScreen").hidden = true;
	document.getElementById("gamesScreen").hidden = true;
	//document.getElementById("highScoresScreen").hidden = true;
	//document.getElementById("gameSelectScreen").hidden = true;document.getElementById("gamesScreen").hidden = true;
	//document.getElementById("").hidden = true;
	navigationInitialise();
}
