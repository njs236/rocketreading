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

var assignHorTableHeadings = function (entry, entryArrayBool, rowLimit, tableId) {    
    "use strict"
    var count = 0;
    if (entryArrayBool) {
        for (count = 0; count < rowLimit; count += 1) {
            document.getElementById(tableId).firstChild.firstChild.childNodes[count].textContent = entry[count];
        }
    } else {
        for (count = 0; count < rowLimit; count += 1) {
            document.getElementById(tableId).firstChild.firstChild.childNodes[count + 1].textContent = (entry + count);
        }
    }
};

var assignVertTableHeadings = function (entry, entryArrayBool, rowLimit, tableId) {    
    "use strict"
    var count = 0,
        firstChild = document.getElementById(tableId).firstChild,
        cellsLength = firstChild.childNodes.length;
    if (entryArrayBool) {
        for (count = 0; count < cellsLength; count += 1) {
            document.getElementById(tableId).firstChild.childNodes[count].firstChild.textContent = entry[count];
        } 
    } else {
        for (count = 0; count < (cellsLength - 1); count += 1) {
            document.getElementById(tableId).firstChild.childNodes[count + 1].firstChild.textContent = (entry + count);
        }
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
    // The box-sizing of the bonus table cells has been set to content-box to enable the following line to make all the cells the same width and height as the heading cells.
    for (count = 0; count < cellArray.length; count += 1) {
        cellArray[count].style.width = "calc(" + widestCellWidth + "px + 0.5em)";
        cellArray[count].style.height = highestCellHeight + "px"; 
    }
};

var resizeDivSize = function () {
    "use strict";
    var mainDivWidth = document.getElementsByClassName("highInnerLeftTable")[0].offsetWidth,
        mainDivHeight = document.getElementById("highLevelGamesTable1").offsetHeight,
        sideTableDivWidth = document.getElementById("highLevelGamesTable1").offsetWidth;
    console.log("var highInnerLeftTable: " + mainDivWidth); //test
    console.log("var highLevelGamesTable: " + sideTableDivWidth); //test
    document.getElementsByClassName("highSideLeftTable")[0].style.width = "calc((" + mainDivWidth + "px - " + sideTableDivWidth + "px) / 2)";
    document.getElementsByClassName("highSideLeftTable")[1].style.width = "calc((" + mainDivWidth + "px - " + sideTableDivWidth + "px) / 2 - 0.1em)";
    document.getElementsByClassName("highSideLeftTable")[2].style.width = "calc((" + mainDivWidth + "px - " + sideTableDivWidth + "px) / 2)";
    document.getElementsByClassName("highSideLeftTable")[3].style.width = "calc((" + mainDivWidth + "px - " + sideTableDivWidth + "px) / 2 - 0.1em)";
    document.getElementsByClassName("highSideLeftTable")[0].style.height = mainDivHeight + 'px';
    document.getElementsByClassName("highSideLeftTable")[1].style.height = mainDivHeight + 'px';
    document.getElementsByClassName("highSideLeftTable")[2].style.height = mainDivHeight + 'px';
    document.getElementsByClassName("highSideLeftTable")[3].style.height = mainDivHeight + 'px';
    console.log("RESIZE side table divs"); //test
};

var assignBonusScores = function (scores) {
    "use strict";/* Use this if the table lists the data horizontally:
    var count,
        scoreCells = document.getElementById("highBonusTable").firstChild.childNodes[1],
        limit = scoreCells.childNodes.length;
    for (count = 0; count < limit; count += 1) {
        scoreCells.childNodes[count].textContent = scores[count];
    }*/
    var count,
        scoreCells = document.getElementById("highBonusTable").firstChild.childNodes,
        limit = scoreCells.length;
    for (count = 0; count < limit; count += 1) {    
        scoreCells[count].childNodes[1].textContent =  scores[count];
    }    
};

var setTablesContainerHeight = function () {
    "use strict";
    var divHeight = document.getElementById("highBonusTableContainer").offsetHeight;
    console.log("divHeight: " + divHeight);
    document.getElementById("highContainer").style.height = divHeight + 'px';
    console.log("Setting height of tables container divs");
};

var highInitialise = function () {
	"use strict";
    var highCells = [20, 5],
        bonusCells = [12, 2],
        bonusArray = ["Alphabet", "Blends 1", "blends 2", "Short Vowels", "Long vowels", "Middle Sounds"];
    // Create the high score tables for the level games
    createHighTable(highCells, "Level", "highLevelGamesTable1");
    createHighTable(highCells, "Level", "highLevelGamesTable2");
    // Create the high score table for the bonus games
    createHighTable(bonusCells, "Bonus", "highBonusTable");
    
    // Assign headings to the level games tables
    assignHorTableHeadings(1, false, 4, "highLevelGamesTable1");
    assignVertTableHeadings(1, false, 3, "highLevelGamesTable1");
    assignHorTableHeadings(1, false, 4, "highLevelGamesTable2");
    assignVertTableHeadings(4, false, 6, "highLevelGamesTable2");
    
    // Assign headings for the bonus game tables
    //assignHorTableHeadings(bonusArray, true, 6, "highBonusTable");
    assignVertTableHeadings(bonusArray, true, 2, "highBonusTable");
    
    // Set a uniform size for the cells of the bonus table
    setStandardCellSize("highBonusCell");
    // Set the size of the left table divs
    resizeDivSize();
    
    // Add an event listener for resizing the side divs of the left hand table
    window.addEventListener("resize", resizeDivSize);
    window.addEventListener("resize", setTablesContainerHeight);
    // Assign the initial zero high scores to the bonus scores table
    assignBonusScores([0,0,0,0,0,0]);
    // Set the height of the div which contains the tables 
    setTablesContainerHeight();
};