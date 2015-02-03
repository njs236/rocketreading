function showPage1() {
	console.log("hi");
};

var gameLists = [],
    myRocketReading = {
        event: {},
        commonMethod: {
            validateLogin: function (nameElement, passwordElement) {
                "use strict";
                if  (( JSON.parse(localStorage.getItem(nameElement.value)).userName === nameElement.value) && ( JSON.parse(localStorage.getItem(nameElement.value)).firstName === passwordElement.value )) {
                    // The system lets the user login
                    console.log("Through!");
                    showHomeScreen();
                } else {
                    passwordElement.value = "";
                    passwordElement.focus();
                    document.getElementById("loginMessage").innerHTML = "Invalid username or password. Please try again";
                }  
            },
                    
            validateUserExists: function (nameElement, passwordElement) {
                "use strict";
                console.log("name: " + nameElement.value);
                var result = JSON.parse(localStorage.getItem(nameElement.value));
                if ( result !== null ) {
                    console.log("test: " + result + " - true!");
                    return true;
                } else {
                    console.log(result);
                    document.getElementById("loginMessage").innerHTML = "Unknown username. Please try entering your username again or create an account.";
                    passwordElement.value = "";
                    return false;
                }
            },
            
            validateFieldInput: function (nameElement, passwordElement) {
                "use strict";
                if (nameElement.value === "" && passwordElement.value === "") {
                    document.getElementById("loginMessage").innerHTML = "Please enter a username and a password.";
                } else if (nameElement.value === "") {
                    document.getElementById("loginMessage").innerHTML = "Please enter a username.";    
                } else if (passwordElement.value === "") {
                    document.getElementById("loginMessage").innerHTML = "Please enter a password.";
                } else {
                    return true;
                }
            }
        }
    };

function showPage1() {
	console.log("hi");
};

// Processing login function

var processLogin = function () {
    "use strict";
    if (myRocketReading.commonMethod.validateFieldInput(document.getElementById("loginUserName"), document.getElementById("loginPassword"))) { 
        if (myRocketReading.commonMethod.validateUserExists(document.getElementById("loginUserName"), document.getElementById("loginPassword"))) {
            myRocketReading.commonMethod.validateLogin( document.getElementById("loginUserName"), document.getElementById("loginPassword") );
        } else {
            console.log("No login ...");
        }
    }
};

// Adding a user to local storage

var addUserLS = function () {
    "use strict";
    myGameController.addPlayer('bloppy400', 'squishy', 'Maccas', 'lincoln primary', 'b1');
};

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
};

var initialise = function () {
	"use strict";
	
	generateLists();
	
	navigationInitialise();
	//highInitialise();
	homeInitialise();
	loginInitialise();
    
    addUserLS();
};
