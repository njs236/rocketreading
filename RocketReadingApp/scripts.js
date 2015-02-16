// Global vars

var gameTimerSecs = 0,
    gameTimerMins = 0,
    gameTimer,
    timer,
	aTimer,
	learnWordListener,
    timerModal,
    barColour,
    barBorderColour,
    silverBar,
    bronzeBar,
    // repeatSpoken,
    learnWordCount;

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
        wordList24 = ["preview","protein","roast","spill","shoulder","skull","scared","towel","salt","soup","hundred","seize","sulk","stung","cellphone","cracked","float","fainted","fetch","internet","browse","world","wrong","galaxy","wrapped"],
        
        alphabetSoundsList = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
        constantBlends1List = ["bl","br","ch","cl","cr","dr","dw","fl","fr","gl","gr","kn","ph","pl","pr","qu","sc","scr"],
        // I'm not sure at which point of the blends sound list it should be divided into two
        constantBlends2List= ["sh","shr","sk","sl","sm","sn","sp","spl","spr","squ","st","str","sw","th","thr","tr","tw","wh","wr"],
        
        shortVowelsList = [],
        shortVowelsList_a = ["an","man","bat","tap","and","sad","am","bag","ran","had","that","drag","slap","slam","brat"],
        shortVowelsList_e = ["get","net","beg","red","pen","yes","fed","bed","ten","egg","then","went","bled","Greg","step"],
        shortVowelsList_i = ["pin","hit","rip","rib","nip","his","six","did","big","if","chin","think","spit","this","hit"],
        shortVowelsList_o = ["got","job","hog","box","mop","Tom","sob","from","pot","dog","shop","stop","blog","shot","blob"],
        shortVowelsList_u = ["fun","cup","bus","hug","tub","mud","us","up","mum","but","shut","slug","club","drum","under"],
        
        longVowelsList = [],
        longVowelsList_a = ["made","bake","came","gave","Jane","ate","base","space","safe","grape","play","say","bay","ray","away"],
        longVowelsList_e = ["see","we","she","bee","sea","meat","keep","please","teacher","read","been","tree","each","three","people"],
        longVowelsList_i = ["I","ride","bike","time","ripe","rise","bite","wipe","fire","mice","kind","fine","white","while","climb"],
        longVowelsList_o = ["go","home","nose","over","hope","vote","rode","don't","open","joke","bone","hole","note","old","know"],
        longVowelsList_u = ["use","usually","rule","rude","pupil","truth","tune","cute","music","refuse","uniform","universe","future","amused","dune"],
        longVowelsList_y = ["by","why","my","cry","fly","shy","happy","baby","very","many","ready","only","pretty","key","tiny"],
        
        middleSoundsList = [],
        middleSoundsList_oo1 = ["look","cook","good","shook","stood","wool"],
        middleSoundsList_ay = ["day","play","may","say","away","pray"],
        middleSoundsList_ee = ["see","bee","feed","meet","teeth","sleep"],
        middleSoundsList_all = ["ball","call","fall","small","wall", "shall"],
        middleSoundsList_ar = ["car","star","farm","shark","party","garden"],
        middleSoundsList_er = ["her","were","mother","term","person","fern"],
        middleSoundsList_ow_1 = ["how","now","town","down","brown","flower"],
        middleSoundsList_or = ["for","horse","sport","more","storm","shore"],
        middleSoundsList_ai_1 = ["rain","tail","train","painting","wait","faint"],
        middleSoundsList_oy = ["boy","toy","joy","enjoy","annoy","voyage"],
        middleSoundsList_oo_2 = ["moon","food","boot","choose","soon","blood"],
        middleSoundsList_oa = ["boat","float","road","roast","soap","coat"],
        middleSoundsList_ew = ["new","few","chew","blew","flew","grew"],
        middleSoundsList_ow_2 = ["slow","blow","grow","know","throw","follow"],
        middleSoundsList_aw = ["saw","awful","draw","raw","awesome","lawn"],
        middleSoundsList_ill_ell = ["hill","will","fell","spell","smell","spill"],
        middleSoundsList_ea1 = ["meat","seat","beach","team","feast","cheat"],
        middleSoundsList_ou_1 = ["out","house","found","shout","ground","ouch"],
        middleSoundsList_ou_2 = ["your","four","brought","thought","fourteen","fought"],
        middleSoundsList_ou_3 = ["enough","trouble","cousin","touch","young","courage"],
        middleSoundsList_ou_4 = ["you","through","group","soup","cough","trough"],
        middleSoundsList_ou_5 = ["would","could","should","although","shoulder","mould"],
        middleSoundsList_ir = ["girl","bird","birthday","first","thirty","dirt"],
        middleSoundsList_oll_ull = ["doll","roll","skull","seagull","troll","dull"],
        middleSoundsList_one = ["one","done","love","oven","cover","none"],
        middleSoundsList_ue = ["blue","glue","argue","true","rescue","continue"],
        middleSoundsList_ie_1 = ["pie","die","lie","tried","cried","fried"],
        middleSoundsList_eel = ["eel","feel","heel","wheel","steel","kneel"],
        middleSoundsList_ea_2 = ["head","bear","dead","meal","ready","weather"],
        middleSoundsList_ur = ["burn","hurt","turning","nurse","surfer","church"],
        middleSoundsList_oi = ["oil","join","toilet","soil","noise","point"],
        middleSoundsList_ai_2 = ["said","hair","chair","stair","air","unfair"],
        middleSoundsList_au = ["caught","naughty","saucer","daughter","because","laugh"],
        middleSoundsList_ie_2 = ["chief","thief","piece","believe","field","shield"],
        middleSoundsList_ei_1 = ["receive","seize","protein","deceive","ceiling","their"],
        middleSoundsList_ei_2 = ["eight","weigh","reindeer","neighbour","weight","vein"],
        middleSoundsList_ui = ["fruit","nuisance","build","tui","quiet","guide"],
        middleSoundsList_ea_3 = ["learn","heard","early","earth","earn","pearl"],
        middleSoundsList_are = ["care","dare","stare","careful","scared","bare"],
        middleSoundsList_oe = ["toe","poem","poetry","ice-floe","shoe","does"],
        middleSoundsList_ow = ["owl","growl","towel","fowl","howl","foul"],
        middleSoundsList_igh = ["high","night","bright","sighed","knight","Friday"],
        middleSoundsList_lk = ["milk","talk","walk","sulk","folk","elk"],
        middleSoundsList_st = ["fast","best","most","mustn't","list","ghostly"],
        middleSoundsList_ck = ["blackness","lucky","check","bricks","blocked","cracked"],
        middleSoundsList_ch = ["watch","catch","fetch","which","such","kitchen"],
        middleSoundsList_ng = ["song","sing","ring","bang","longest","stung"];
        
    // Add all of the short vowel lists to one array
    shortVowelsList.push(shortVowelsList_a);    
    shortVowelsList.push(shortVowelsList_e);
    shortVowelsList.push(shortVowelsList_i);
    shortVowelsList.push(shortVowelsList_o);
    shortVowelsList.push(shortVowelsList_u);
    
    // Add all of the long vowel lists to one array
    longVowelsList.push(longVowelsList_a);
    longVowelsList.push(longVowelsList_e);
    longVowelsList.push(longVowelsList_i);
    longVowelsList.push(longVowelsList_o);
    longVowelsList.push(longVowelsList_u);
    longVowelsList.push(longVowelsList_y);
    
    // Add all of the middle sounds lists to one array
    middleSoundsList.push(middleSoundsList_oo1);
    /* and so on ... */
    
    // The system will delete any old instances of objects in the system
    // rocketReadingModel.deleteAll(); This isn't necessary - previous data will be clobbered by the new

    // rocketReadingModel.addPlayer('Maccas', 'Lucky', 'Louis', 'Lincoln Primary', 'b1', Number(null), [1, 1], 1, 400);
    // The player will be added to the root object when he or she logs in. Still need to add the player to local storage when the program loads:
    localStorage.setItem("Maccas", JSON.stringify({userName: "Maccas", firstName: "Lucky", lastName: "Louis", school: "Lincoln Primary", classRoom: "b1", totalScore: 0, levelGameReached: [1, 1], bonusGameReached: 1, pointsToPassLevel: 400}));
	rocketReadingModel.addPlayer('admin', 'Andrew', 'Papanui', 'Papanui High School', 'staff', 10000, [6,4], 5, 0);
	
    // Add levels to the system
    rocketReadingModel.addLevel("Bonus Games Level", 0, [], 0);
    rocketReadingModel.addLevel("Ice Cream World", 1, [], 0);
    rocketReadingModel.addLevel("Nature World", 2, [], 0);
    rocketReadingModel.addLevel("Water World", 3, [],  0);
    rocketReadingModel.addLevel("Lollipop World", 4, [], 0);
    rocketReadingModel.addLevel("Pirate World", 5, [], 0);
    rocketReadingModel.addLevel("Car World", 6, [], 0);
    
    theLevel = rocketReadingModel.findLevelByNumber(0);
    rocketReadingModel.addAvatar("star", theLevel);
    theLevel.addGame("Alphabet Sounds", alphabetSoundsList, theLevel.getDescription(), 1);
    theLevel.addGame("Constant Blends 1", constantBlends1List, theLevel.getDescription(), 2);
    theLevel.addGame("Constant Blends 2", constantBlends2List, theLevel.getDescription(), 3);
    theLevel.addGame("Short Vowel Sounds", shortVowelsList, theLevel.getDescription(), 4);
    theLevel.addGame("Long Vowels Sounds", longVowelsList, theLevel.getDescription(), 5);
    theLevel.addGame("Middle Sounds", middleSoundsList, theLevel.getDescription(), 6);
	
    theLevel = rocketReadingModel.findLevelByNumber(1);
	rocketReadingModel.addAvatar("icecream", theLevel);
    theLevel.addGame("Game 1", wordList1, theLevel.getDescription(), 1);
    theLevel.addGame("Game 2", wordList2, theLevel.getDescription(), 2);
    theLevel.addGame("Game 3", wordList3, theLevel.getDescription(), 3);
    theLevel.addGame("Game 4", wordList4, theLevel.getDescription(), 4);
    
    theLevel = rocketReadingModel.findLevelByNumber(2);
	rocketReadingModel.addAvatar("tree", theLevel);
    theLevel.addGame("Game 1", wordList5, theLevel.getDescription(), 1);
    theLevel.addGame("Game 2", wordList6, theLevel.getDescription(), 2);
    theLevel.addGame("Game 3", wordList7, theLevel.getDescription(), 3);
    theLevel.addGame("Game 4", wordList8, theLevel.getDescription(), 4);

    theLevel = rocketReadingModel.findLevelByNumber(3);
	rocketReadingModel.addAvatar("cloud", theLevel);
    theLevel.addGame("Game 1", wordList9, theLevel.getDescription(), 1);
    theLevel.addGame("Game 2", wordList10, theLevel.getDescription(), 2);
    theLevel.addGame("Game 3", wordList11, theLevel.getDescription(), 3);
    theLevel.addGame("Game 4", wordList12, theLevel.getDescription(), 4);
    
    theLevel = rocketReadingModel.findLevelByNumber(4);
	rocketReadingModel.addAvatar("lollipop", theLevel);
    theLevel.addGame("Game 1", wordList13, theLevel.getDescription(), 1);
    theLevel.addGame("Game 2", wordList14, theLevel.getDescription(), 2);
    theLevel.addGame("Game 3", wordList15, theLevel.getDescription(), 3);
    theLevel.addGame("Game 4", wordList16, theLevel.getDescription(), 4);
    
    theLevel = rocketReadingModel.findLevelByNumber(5);
	rocketReadingModel.addAvatar("pirate", theLevel);
    theLevel.addGame("Game 1", wordList17, theLevel.getDescription(), 1);
    theLevel.addGame("Game 2", wordList18, theLevel.getDescription(), 2);
    theLevel.addGame("Game 3", wordList19, theLevel.getDescription(), 3);
    theLevel.addGame("Game 4", wordList20, theLevel.getDescription(), 4);
    
    theLevel = rocketReadingModel.findLevelByNumber(6);
	rocketReadingModel.addAvatar("car", theLevel);
    theLevel.addGame("Game 1", wordList21, theLevel.getDescription(), 1);
    theLevel.addGame("Game 2", wordList22, theLevel.getDescription(), 2);
    theLevel.addGame("Game 3", wordList23, theLevel.getDescription(), 3);
    theLevel.addGame("Game 4", wordList24, theLevel.getDescription(), 4);
    
};

var initialise = function () {
	"use strict";
	//addLevel();
	//generateLists();
	
	//navigationInitialise();
	// highInitialise();
	// homeInitialise();
	// loginInitialise();

    loadGameData();
	//mainController.initialiseView();
    myViewModelRR.setView(viewHTMLModule);
};

window.requestAnimFrame = (function(callback){
    "use strict";
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback){
        window.setTimeout(callback, 1000 / 60);
    };
})();

