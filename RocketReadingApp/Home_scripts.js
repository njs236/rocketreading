// CONSTANTS

var HTMLTABLE; // mapped to table that displays words

function showPage1() {
	console.log("hi");
};

var resizeImage = function () {
    "use strict";
    var avatarDivWidth = document.getElementById("homeAvatar").offsetWidth - 2;
    document.getElementById("homeAvatarPic").style.width = avatarDivWidth + 'px';
};

var initialise = function () {
	"use strict";
    // Set the size of the image of the avatar on the home page
    resizeImage();
    
    // Add an event listener for resizing the side divs of the left hand table
    window.addEventListener("resize", resizeImage);
};