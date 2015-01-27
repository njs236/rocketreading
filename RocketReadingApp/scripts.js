// CONSTANTS

// var HTMLTABLE; // mapped to table that displays words

function showPage1() {
	console.log("hi");
};

var createHighTable = function (tableDim, type, tableId) {
	"use strict";
	var newRow,
		newCell,
		wordCount,
        aTable;
    
    aTable = document.getElementById(tableId);
	aTable.innerHTML = ""; // clear table each time its run
	newRow = aTable.insertRow(-1);

	for ( wordCount = 0; wordCount < tableDim[0]; wordCount += 1) {
		if ( aTable.lastChild.lastChild.cells.length === tableDim[1] ) {
			newRow = aTable.insertRow(-1);
		};
		newCell = newRow.insertCell(-1);
		/*newCell.innerHTML = inputArray[wordCount];*/
		newCell.id = "cell" + type + (wordCount + 1);
        if (type === "Level") {
            newCell.className = "highLevelCell";
        } else {
            newCell.className = "highBonusCell";
        }
	}
};

var assignHorTableHeadings = function (entry, entryArray, limit, tableId) {    
    "use strict"
    var count = 0;
    if (entryArray) {
        for (count = 0; count < limit; count += 1) {
            document.getElementById(tableId).firstChild.firstChild.childNodes[count + 1].textContent = (entry + count);
        }
    } else {
        for (count = 0; count < limit; count += 1) {
            document.getElementById(tableId).firstChild.firstChild.childNodes[count].textContent = entry[count];
        }
    }
};

var assignVertTableHeadings = function (entry, limit, tableId) {    
    "use strict"
    var count = 0;
    for (count = 0; count < limit; count += 1) {
        document.getElementById(tableId).firstChild.childNodes[count + 1].firstChild.textContent = (entry + count);
    }
};

var setStandardCellSize = function (cellClass) {
	"use strict";
	var count,
		widestCell,
		widestCellWidth = 0,        
        cellArray = document.getElementsByClassName(cellClass),
        highestCellHeight = cellArray[5].offsetHeight;
        console.log("highestCellHeight: " + highestCellHeight); // test
	for ( count = 0; count < cellArray.length; count = count + 1) {
		if ( cellArray[count].offsetWidth > widestCellWidth ) {
			widestCellWidth = cellArray[count].offsetWidth;
			widestCell = count;
		};
	};
	
	console.log("Widest cell: " + widestCellWidth); // test
    for (count = 0; count < cellArray.length; count += 1) {
        cellArray[count].style.width = "calc(" + widestCellWidth + "px + 0.5em)";
        cellArray[count].style.height = highestCellHeight + "px"; // This does not make the score cells the same height as the heading cells
    }
};

var resizeDivSize = function () {
    "use strict";
    var mainDivWidth = document.getElementById("highLeftTable").offsetWidth,
        mainDivHeight = document.getElementById("highLevelGamesTable").offsetHeight,
        sideTableDivWidth = document.getElementById("highLevelGamesTable").offsetWidth;
    console.log("var highLeftTable: " + mainDivWidth); //test
    console.log("var highLevelGamesTable: " + sideTableDivWidth); //test
    document.getElementsByClassName("highSideLeftTable")[0].style.width = "calc((" + mainDivWidth + "px - " + sideTableDivWidth + "px) / 2)";
    document.getElementsByClassName("highSideLeftTable")[1].style.width = "calc((" + mainDivWidth + "px - " + sideTableDivWidth + "px) / 2 - 0.1em)";
    document.getElementsByClassName("highSideLeftTable")[0].style.height = mainDivHeight + 'px';
    document.getElementsByClassName("highSideLeftTable")[1].style.height = mainDivHeight + 'px';
    console.log("RESIZE side table divs"); //test
};

var assignBonusScores = function (scores) {
    "use strict"
    var count,
        scoreCells = document.getElementById("highBonusTable").firstChild.childNodes[1],
        limit = scoreCells.childNodes.length;
    for (count = 0; count < limit; count += 1) {
        scoreCells.childNodes[count].textContent = scores[count];
    }
}

var initialise = function () {
	"use strict";
    var highCells = [35, 5],
        bonusCells = [12, 6],
        bonusArray = ["Alphabet", "Blends 1", "blends 2", "Short Vowels", "Long vowels", "Middle Sounds"];
    // Create the high score table for the level games
    createHighTable(highCells, "Level", "highLevelGamesTable");
    // Create the high score table for the bonus games
    createHighTable(bonusCells, "Bonus", "highBonusTable");
    // Assign headings to the level games table
    assignHorTableHeadings(1, true, 4, "highLevelGamesTable");
    assignVertTableHeadings(1, 6, "highLevelGamesTable");
    // Assign horizontal headings for the bonus game tables
    assignHorTableHeadings(bonusArray, false, 6, "highBonusTable");
    // Set a uniform size for the cells of the bonus table
    setStandardCellSize("highBonusCell");
    // Set the size of the left table divs
    resizeDivSize();
    // Add an event listener for resizing the side divs of the left hand table
    window.addEventListener("resize", resizeDivSize);
    // Assign the initial zero high scores to the bonus scores table
    assignBonusScores([0,0,0,0,0,0]);
};