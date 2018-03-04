const fs = require('fs');
var stringSimilarity = require('string-similarity');
var similarity =0;
var dec=0;
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
		DocumentsSimilarity: {Percentage: similarity }}

	let json = JSON.stringify(output,null,2);
	fs.writeFile('output.json',json,'utf8',(err) =>{
		if(err){
			console.log("error");
		}console.log("success");
	})				

	
//console.log("Created JSON");
}