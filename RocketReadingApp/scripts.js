function showPage1() {
	console.log("hi");
};

var gameLists = [],
    myRocketReading = {
        event: {},
        loginMethod: {
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

var loadGameData = function () {
    "use strict";
    var theLevel,
        wordList1 = ["I","am","the","go","going","to","shop","car","at","in","is","Mum","here","and","see","Dad","a","cat","can","said","run","running","jump","jumping","school"],
        wordList2 = ["we","are","look","dog","come","bus","play","this","there","went","with","asked","bat","hit","ball","kicked","red","boy","girls","big","like","computer","TV","watch","home"],
        wordList3 =["away","an","have","books","came","you","call","called","eat","food","for","from","father","mother","green","he","has","house","will","help","was","lost","my","on","off"],
        wordList4 =["old","other","road","please","plane","over","had","game","saw","they","she","that","if","one","two","when","then","thank you","town","where","door","man","what","children","yes"],
        wordList5 = ["no","happy","your","were","all","apple","be","but","did","why","do","into","get","good","bad","his","it","her","put","little","up","smile","sun","bed","cold"],
 	    wordList6 = ["zoo","woman","getting","time","day","sad","hill","kind","pig","angry","fish","say","give","milk","our","now","face","name","gone","bike","ride","catch","after","moon","very"],
        wordList7 = ["water","icecream","leg","arm","foot","feet","as","room","around","drive","truck","of","some","toy","him","grow","hurt","stop","clothes","finger","cut","boat","sea","beach","horse"],
        wordList8 = ["yellow","blue","brown","black","orange","grass","sky","quiet","three","ten","bread","small","box","ate","dinner","lunch","breakfast","cheese","Mr","Mrs","us","hand","under","sleep","beautiful"],
        wordList9 = ["again","before","year","walk","white","class","know","morning","hello","hand","cried","every","bird","egg","friend","open","Grandma","Grandpa","party","police","hungry","thing","pizza","table","today"],
        wordList10 = ["always","better","colour","weather","rain","teacher","brother","sister","oh","cloudy","family","climb","jacket","dress","singing","clean","because","baby","fast","don't","tree","bought","brought","river","money"],
        wordList11 = ["gold","by","chips","down","elephant","find","want","work","their","took","take","same","so","didn't","ran","pretty","place","ouch","not","new","me","live","four","kitten","jelly"],
        wordList12 = ["just","must","insect","I'm","how","garage","farm","hear","garden","plant","funny","found","each","different","dollar","eye","could","couldn't","back","buy","animal","any","engine","flower","five"],
        wordList13 = ["another","favourite","sport","bridge","bring","brick","slow","heavy","hour","zebra","who","which","until","use","train","together","shoe","soon","shouted","right","read","rabbit","pick","playing","painting"],
        wordList14 = ["picture","push","pull","nurse","made","make","left","king","kite","its","I'll","warm","won't","talk","tell","smash","stay","swim","rugby","paper","rainbow","need","next","mouse","love"],
        wordList15 = ["let","lady","key","knock","I've","answered","busy","cry","chair","carry","danger","high","grew","giant","forward","fire","fell","also","battle","can't","city","auntie","uncle","behind","caught"],
        wordList16 = ["eel","eight","enjoy","awful","break","began","biscuit","circus","straight","drink","finish","fern","fall","gentle","heard","usually","umbrella","tail","told","tea","start","shark","ocean","remember","once"],
        wordList17 = ["only","storm","suddenly","knife","light","laugh","meat","more","night","never","strong","show","still","street","tomorrow","throw","television","try","would","write","window","unhappy","wolf","sells","full"],
        wordList18 = ["wasn't","wash","wait","these","those","toilet","above","blood","burn","chin","cousin","half","guess","growled","scissors","front","few","doll","dance","wheel","thought","through","soldier","army","ghostly"],
        wordList19 = ["gull","seagull","argue","nothing","naughty","think","than","unfair","well","wouldn't","zero","teeth","yawn","twelve","trouble","tried","shut","stood","joke","kiwi","shirt","listen","lamb","motorbike","mountain"],
        wordList20 = ["cow","chew","between","early","first","great","fourteen","field","draw","turning","thief","video","text","phone","people","person","should","sure","team","whose","xray","myself","mice","meal","magic"],
        wordList21 = ["join","soil","space","chimney","cute","comb","group","although","belong","choose","country","toe","thirsty","smell","shell","rules","ruler","outside","believe","newspaper","nearly","shove","square","queen","quick"],
        wordList22 = ["petrol","notice","neighbour","wool","voyage","fruit","fried","feel","enough","dirt","care","careful","large","meeting","lose","nuisance","piece","parcel","hole","whole","troll","life","leaf","yacht","weigh"],
        wordList23 = ["bridge","cupboard","both","ceiling","fierce","follow","loud","stroll","stair","tui","feast","mould","mistake","kneel","learn","minute","luck","owl","overeat","point","pie","question","rescue","return","poem"],
        wordList24 = ["preview","protein","roast","spill","shoulder","skull","scared","towel","salt","soup","hundred","seize","sulk","stung","cellphone","cracked","float","fainted","fetch","internet","browse","world","wrong","galaxy","wrapped"];
    
    // The system will delete any old instances of objects in the system
    // myGameController.deleteAll(); This isn't necessary
    // It's interesting to see what happens when passing the score as 0 (and the prototype object does not set the total score as 0 if there is not input parameter for this attribute.
    myGameController.addPlayer('Maccas', 'Lucky', 'Louis', 'Lincoln Primary', 'b1', Number(null), [1, 1], 1, 400, null, null);
    // Load up a list
    myGameController.addLevel("Ice Cream World", 1, []);
    myGameController.addLevel("Nature World", 2, []);
    myGameController.addLevel("Water World", 3, []);
    myGameController.addLevel("Lollipop World", 4, []);
    myGameController.addLevel("Pirate World", 5, []);
    myGameController.addLevel("Car World", 6, []);
    
    theLevel = myGameController.findLevel("Ice Cream World");
    theLevel.addGame(1, wordList1);
    theLevel.addGame(2, wordList2);
    theLevel.addGame(3, wordList3);
    theLevel.addGame(4, wordList4);
    
    theLevel = myGameController.findLevel("Nature World");
    theLevel.addGame(1, wordList5);
    theLevel.addGame(2, wordList6);
    theLevel.addGame(3, wordList7);
    theLevel.addGame(4, wordList8);
    
    theLevel = myGameController.findLevel("Water World");
    theLevel.addGame(1, wordList9);
    theLevel.addGame(2, wordList10);
    theLevel.addGame(3, wordList11);
    theLevel.addGame(4, wordList12);
    
    theLevel = myGameController.findLevel("Lollipop World");
    theLevel.addGame(1, wordList13);
    theLevel.addGame(2, wordList14);
    theLevel.addGame(3, wordList15);
    theLevel.addGame(4, wordList16);
    
    theLevel = myGameController.findLevel("Pirate World");
    theLevel.addGame(1, wordList17);
    theLevel.addGame(2, wordList18);
    theLevel.addGame(3, wordList19);
    theLevel.addGame(4, wordList20);
    
    theLevel = myGameController.findLevel("Car World");
    theLevel.addGame(1, wordList21);
    theLevel.addGame(2, wordList22);
    theLevel.addGame(3, wordList23);
    theLevel.addGame(4, wordList24);
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

    loadGameData();
};
