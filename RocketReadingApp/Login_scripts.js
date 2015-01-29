function showPage1() {
	console.log("hi");
};

var resizeForm = function () {
    "use strict";
    var fieldsetWidth = document.getElementById("loginFieldset").offsetWidth,
        inputsWidth = document.getElementById("loginFormLabelDiv").offsetWidth;
    document.getElementById("loginFormLabelDiv").style.marginLeft = "calc((" + fieldsetWidth + "px - " + inputsWidth + "px) / 2)";
    console.log("Resize");
};

var loginInitialise = function () {
    "use strict";
    // Set the size of the left padding of the inputs field
    resizeForm();
    
    // Add an event listener for resizing the side divs of the left hand table
    window.addEventListener("resize", resizeForm);
};