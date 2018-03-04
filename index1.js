const fs = require('fs');
var natural = require('natural');
var path = require('path');
var tokenizer = new natural.WordTokenizer();
var stringSimilarity = require('string-similarity');
var similarity =0;
var dec=0;
var fileq = 'nv.txt';

var dataA;var tokenArrayA=[];
var base_folder = path.join(path.dirname(require.resolve("natural")), "brill_pos_tagger");
var rulesFilename = base_folder + "/data/English/tr_from_posjs.txt";
var lexiconFilename = base_folder + "/data/English/lexicon_from_posjs.json";
var defaultCategory = 'N';
 
var lexicon = new natural.Lexicon(lexiconFilename, defaultCategory);
var rules = new natural.RuleSet(rulesFilename);
var tagger = new natural.BrillPOSTagger(lexicon, rules);

//initialize the file names
var file = 'nv.txt';//my document
var file1 = 'nv1.txt';//standard document
var file2 = 'stopwords.txt';
var file3 = 'dict.txt';
//reading the text files
var data = fs.readFileSync(file, 'utf8');
var data1 = fs.readFileSync(file1, 'utf8');
var stopp = fs.readFileSync(file2,'utf8');
var dict = fs.readFileSync(file3,'utf8');
//split the documents into keywords
var wordsArray = splitByWords(data);
var wrdc = wordsArray.length;
var wordsArray1 = splitByWords(data1);
var wrdc1 = wordsArray1.length;

var stopsArray = splitByWords(stopp);
var dictArray = splitByWords(dict);
var stop= new Array();
var mistakesArray= new Array();
console.log(wordsArray);
//preprocess the files
var prcdata = stopword(wordsArray);
var prcdata1 = stopword(wordsArray1);
//decision on document
if(mod(prcdata1.length - prcdata.length)>1000)
console.log("Document rejected");
else console.log("Document Accepted");
//check the document for spelling mistakes
var natural = require('natural');
var spellcheck=new natural.Spellcheck(dictArray);
var mistakes=0;
for (var i = prcdata.length - 1; i >= 0; i--) {
	if(!spellcheck.isCorrect(prcdata[i]))
	{
		mistakes++;
		mistakesArray.push(prcdata[i]);
	}
}
console.log("number of mistakes are:"+mistakes);
var text= fs.readFileSync(fileq,'utf8');

  var json=tagger.tag(tokenizer.tokenize(text));

 
  
    tokenArrayA=tokenizer.tokenize(text);
  //counting word
  wordcount=(tokenizer.tokenize(text)).length;
  //counting nouns
  var count=0;
  for(i=0;i<wordcount;i++){
    if(json[i][1]=='NN'||json[i][1]=='NNP'||json[i][1]=='NNPS'||json[i][1]=='NNS')
      count++;    
  }
  nounsCount=count;

  //counting verbs
  var count=0;
  for(i=0;i<wordcount;i++){
    if(json[i][1]=='VB'||json[i][1]=='VBD'||json[i][1]=='VBG'||json[i][1]=='VBP'||json[i][1]=='VBN'||json[i][1]=='VBZ')
      count++;    
  }
  verbCount=count;

  //counting adjectives
  var count=0;
  for(i=0;i<wordcount;i++){
    if(json[i][1]=='JJ'||json[i][1]=='JJR'||json[i][1]=='JJS')
      count++;    
  }
  adjCount=count;

console.log(nounsCount,verbCount,adjCount);

calSim();
Cjson();

function mod(number)
{
	if(number > 0)
		return number;
	else if (number = 0)
		return number;
	else return -number;
}
function stopword(text)
{ 
	for (var i = text.length - 1; i >= 0; i--) {
		for (var j = stopsArray.length - 1; j >= 0; j--) {
			if(!(text[i] === stopsArray[j]))
				stop[i]=text[i];	}
}
return stop;
}

function splitByWords (text) {
  // split string by spaces (including spaces, tabs, and newlines)
  var wordsArray = text.split(/\s+/);
  return wordsArray;
}

function calSim() {
	similarity = (stringSimilarity.compareTwoStrings(file, file1)) * 100;
	console.log(similarity);
}
function Cjson()
{
	var output = {
		Wordcount:{Standard: wrdc,
					Text : wrdc1},
		Decision:  {Accepted: dec} ,
		Spellcheck:{NumberofMistakes: mistakes,
					Mistakes: mistakesArray },
		DocumentsSimilarity: {Percentage: similarity },
		PartsofSpeechCounts:{Nouns:nounsCount ,
								Verbs:verbCount ,
							     Adjectives: adjCount }}

	let json = JSON.stringify(output,null,2);
	fs.writeFile('output.json',json,'utf8',(err) =>{
		if(err){
			console.log("error");
		}console.log("success");
	})				

	
//console.log("Created JSON");
}