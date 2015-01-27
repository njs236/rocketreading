// CONSTANTS

var HTMLTABLE; // mapped to table that displays words

function showPage1() {
	console.log("hi");
};

var createHighTable = function (tableDim, type) {
	"use strict";
	var newRow,
		newCell,
		wordCount;

	HTMLTABLE.innerHTML = ""; // clear table each time its run
	newRow = HTMLTABLE.insertRow(-1);

	for ( wordCount = 0; wordCount < tableDim[0]; wordCount += 1) {
		if ( HTMLTABLE.lastChild.lastChild.cells.length === tableDim[1] ) {
			newRow = HTMLTABLE.insertRow(-1);
		};
		newCell = newRow.insertCell(-1);
		/*newCell.innerHTML = inputArray[wordCount];*/
		newCell.id = "cell" + type + (wordCount + 1);
		newCell.className = "HighCell";
	};
};

var initialise = function () {
	"use strict";
    var highCells = [24, 4],
        bonusCells = [6, 6];
    HTMLTABLE = document.getElementById("highLevelGamesTable");
    // Create the high score table for the level games
    createHighTable(highCells, "Level");
    // Create the high score table for the bonus games
    createHighTable(bounsCells, "Bonus");
};