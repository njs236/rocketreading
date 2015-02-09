var createTable = function (inputArray, tableWidth) {
"use strict";
	var newRow,
		newCell,
		wordCount;
	
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
	};
};

var guessWord = function (word) {
	//add code in here to select word based on clickable event.
	mainController.validateWords(word);
}