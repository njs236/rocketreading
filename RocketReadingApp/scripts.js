function showPage1() {
	console.log("hi");
};

var gameLists = [];

var nextWord = function() {
    "use strict";
	currentWordIndex = Math.floor(Math.random() * list.length);
	var currentWord = list[currentWordIndex],
	    audio = document.createElement('AUDIO');
	document.getElementById("gameGame").appendChild(audio);
	audio.setAttribute("src","audio/Level" + level.levelNumber + game + "/" + currentWord + ".wav")
	audio.play()
	audio.addEventListener('loadedmetadata', function(){
		var duration;
		duration = audio.duration;
		duration = duration * 1000;
		timer = setTimeout(function (){	
		}, duration);
	 });
}
	

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
    // rocketReadingModel.deleteAll(); This isn't necessary
	// Creating current Game Data and AllGamesData.
	
	rocketReadingModel.addCurrentGameData("", "", [], "", "", [], []);
	rocketReadingModel.addAllGamesData([], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []);	
	
	// It's interesting to see what happens when passing the score as 0 (and the prototype object does not set the total score as 0 if there is not input parameter for this attribute.
    rocketReadingModel.addPlayer('Maccas', 'Lucky', 'Louis', 'Lincoln Primary', 'b1', Number(null), [1, 1], 1, 400);
	rocketReadingModel.addPlayer('admin', 'Andrew', 'Papanui', 'Papanui High School', 'staff', 10000, [6,4], 5, 0);
	
    // Add levels to the system
    rocketReadingModel.addLevel("Bonus Games Level", 0, [], 0);
    rocketReadingModel.addLevel("Ice Cream World", 1, [], 0);
    rocketReadingModel.addLevel("Nature World", 2, [], 0);
    rocketReadingModel.addLevel("Water World", 3, [],  0);
    rocketReadingModel.addLevel("Lollipop World", 4, [], 0);
    rocketReadingModel.addLevel("Pirate World", 5, [], 0);
    rocketReadingModel.addLevel("Car World", 6, [], 0);
    /*

    theLevel = rocketReadingModel.findLevel("Bonus Games Level");
    theLevel.addGame("Alphabet Sounds", alphabetSoundsList);
    theLevel.addGame("Constant Blends 1", constantBlends1List);
    theLevel.addGame("Constant Blends 2", constantBlends2List);
    theLevel.addGame("Short Vowel Sounds", shortVowelsList);
    theLevel.addGame("Long Vowels Sounds", longVowelsList);
    theLevel.addGame("Middle Sounds", middleSoundsList);*/
    
    theLevel = rocketReadingModel.findLevel("Ice Cream World");
	rocketReadingModel.addAvatar("icecream", theLevel);
    theLevel.addGame("Game 1", wordList1, theLevel.name);
    theLevel.addGame("Game 2", wordList2, theLevel.name);
    theLevel.addGame("Game 3", wordList3, theLevel.name);
    theLevel.addGame("Game 4", wordList4, theLevel.name);
    
    theLevel = rocketReadingModel.findLevel("Nature World");
	rocketReadingModel.addAvatar("tree", theLevel);
    theLevel.addGame("Game 1", wordList5, theLevel.name);
    theLevel.addGame("Game 2", wordList6, theLevel.name);
    theLevel.addGame("Game 3", wordList7, theLevel.name);
    theLevel.addGame("Game 4", wordList8, theLevel.name);

    theLevel = rocketReadingModel.findLevel("Water World");
	rocketReadingModel.addAvatar("cloud", theLevel);
    theLevel.addGame(1, wordList9);
    theLevel.addGame(2, wordList10);
    theLevel.addGame(3, wordList11);
    theLevel.addGame(4, wordList12);
    
    theLevel = rocketReadingModel.findLevel("Lollipop World");
	rocketReadingModel.addAvatar("Lollipop", theLevel);
    theLevel.addGame(1, wordList13);
    theLevel.addGame(2, wordList14);
    theLevel.addGame(3, wordList15);
    theLevel.addGame(4, wordList16);
    
    theLevel = rocketReadingModel.findLevel("Pirate World");
	rocketReadingModel.addAvatar("pirate", theLevel);
    theLevel.addGame(1, wordList17);
    theLevel.addGame(2, wordList18);
    theLevel.addGame(3, wordList19);
    theLevel.addGame(4, wordList20);
    
    theLevel = rocketReadingModel.findLevel("Car World");
	rocketReadingModel.addAvatar("car", theLevel);
    theLevel.addGame(1, wordList21);
    theLevel.addGame(2, wordList22);
    theLevel.addGame(3, wordList23);
    theLevel.addGame(4, wordList24);
    
    rocketReadingModel.addCurrentGameData(0, [1, 1]);
};

var initialise = function () {
	"use strict";
	//addLevel();
	//generateLists();
	
	navigationInitialise();
	// highInitialise();
	// homeInitialise();
	// loginInitialise();

    loadGameData();
    // myViewModelRR.displayMethods.hideRequiredScreens("navScreen");
};

var eventTableClick = function () {
	
	var tableArray = document.getElementsByClassName("wordCell");
	for (clickCount = 0 ; clickCount < tableArray.length; clickCount = clickCount + 1) {
		tableArray[clickCount] = addEventListener("click", guessWord);
	}
}

var gameInitialise = function () {
	theLevel = rocketReadingModel.findLevel("Ice Cream World");
	theGame = theLevel.allMyGames[0];
	nextWord(theLevel, theGame.gameName, theGame.myWordList);
	createTable(theGame.myWordList, 5);
	eventTableClick();
}


