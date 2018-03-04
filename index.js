function getData() {
	var xmlhttp = new XMLHttpRequest();
	var url = "http://localhost:3000/db";
	xmlhttp.open("GET",url,true);
	xmlhttp.send();

	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myArr = JSON.parse(this.responseText);
			var dataObj = JSON.stringify(myArr);
			document.getElementById('msg').innerHTML = dataObj;
		}
	};
}