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

function nextWord(list) {
	currentWordIndex = Math.floor(Math.random() * currentGameList.length);
	var audio = document.createElement('AUDIO');
	document.appendChild(audio)
	audio.setAttribute("src","audio/List " + list + "/" + myGameController.allMyLists[list] + currentWordIndex + ".wav")
	audio.play()
	audio.addEventListener('loadedmetadata', function(){
		var duration;
		duration = audio.duration;
		duration = duration * 1000;
		timer = setTimeout(function (){
			document.getElementById("audioDesc").textContent = 'Audio Ended ' + currentWord;
			timer = setTimeout (function () {
				document.getElementById("audioDesc").textContent = "";
			}, 500);
		}, duration);
	 });
}
	
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


//Load Level and Games

var addLevel = function () {
	"use strict";
	myGameController.addLevel("Secret Level");
	myGameController.addLevel("Icecream");
	myGameController.addGame(1, "Fruity Loops");
}
// load lists

function generateLists() {
	"use strict"
	var wordList = ''
	// Bonus Game
	wordList = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z';
	myGameController.addList(1,0,wordList);
	// List 1
	wordList = "I,am,the,go,going,to,shop,car,at,in,is,Mum,here,and,see,Dad,a,cat,can,said,run,running,jump,jumping,school";
	myGameController.addList(1,1,wordList)
	// List 2
	wordList = "we,are,look,dog,come,bus,play,this,there,went,with,asked,bat,hit,ball,kicked,red,boy,girls,big,like,computer,TV,watch,home";
	myGameController.addList(1,2,wordList)
	// List 3
	wordList = "an,away,books,call,called,came,eat,father,food,for,from,green,has,have,he,help,house,lost,mother,my,off,on,was,will,you";
	myGameController.addList(1,3,wordList)
	// List 4
	wordList = "children,door,game,had,if,man,old,one,other,over,plane,please,road,saw,she,thankyou,that,then,they,town,two,what,when,where,yes";
	myGameController.addList(1,4,wordList)
	// List 5
	wordList = "all,apple,bad,bed,bee,but,cold,did,do,get,good,happy,her,his,into,it,little,no,put,smiled,sun,up,were,why,your";
	myGameController.addList(1,5,wordList)
};

var initialise = function () {
	"use strict";
	addLevel();
	generateLists();
	
	navigationInitialise();
	// highInitialise();
	// homeInitialise();
	// loginInitialise();
    
    addUserLS();

};
