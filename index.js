function getData() {
	var xmlhttp = new XMLHttpRequest();
	var url = "http://localhost:3000/db";
	xmlhttp.open("GET",url,true);
	xmlhttp.send();

	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myArr = JSON.parse(this.responseText);
			var dataObj = JSON.stringify(myArr);
			//document.getElementById('msg').innerHTML = dataObj;
			document.getElementById('wc').innerHTML = myArr.Wordcount.Standard;
			document.getElementById('wc1').innerHTML =  myArr.Wordcount.Text;
			document.getElementById('nom').innerHTML =  myArr.Spellcheck.NumberofMistakes;
			document.getElementById('mis').innerHTML =  myArr.Spellcheck.Mistakes;
			document.getElementById('sim').innerHTML =  myArr.DocumentsSimilarity.Percentage;
			document.getElementById('nn').innerHTML =  myArr.PartsofSpeechCounts.Nouns;
			document.getElementById('vb').innerHTML =  myArr.PartsofSpeechCounts.Verbs;
			document.getElementById('ad').innerHTML =  myArr.PartsofSpeechCounts.Adjectives;



		}
	};
}