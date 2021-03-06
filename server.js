
var path = require("path");
var express = require("express");
var request = require("request");
var airbnb = require('airapi');


var app = express();
var port = process.env.PORT || 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//


//Serves the root directory relative to the directory that the express app is run from
app.use(express.static(path.join(__dirname, "/")));

app.listen(port, function () {
    console.log("The server is listening on port " + port);
});

// Sends the index.html file as response when the "/" route is called
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

//Yelp route can receive a json object and make the API call
//DO NOT CHANGE!!!!!!!!!!!!!!!!!!!!!!
app.post("/yelp", function (req, res) {	
	console.log(req.body);

	var queryURL = "https://api.yelp.com/v3/businesses/search?";
	var options = { 
		method: "GET",
		url: queryURL,
		qs: req.body,
		headers: { 
	   		//"postman-token": "d4acc441-7e71-ad84-dddb-e88e563ba45b",
	     	"cache-control": "no-cache",
	     	"authorization": "Bearer S7LImio1bL-jYfN1zzz6z6iKmrFE95eCDH9nQodFeB2Ms2vW4UYYaBTX256MW0B52uqk1_N1w4F2FunzAR89rXa6-3L0r1TCr7bfsUKtAQtApnyZUhfwtb3D5OgLWXYx",
	     	"content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW" 
	     },
	  		"formData": { 
	  			oauth_token: "S7LImio1bL-jYfN1zzz6z6iKmrFE95eCDH9nQodFeB2Ms2vW4UYYaBTX256MW0B52uqk1_N1w4F2FunzAR89rXa6-3L0r1TCr7bfsUKtAQtApnyZUhfwtb3D5OgLWXYx" 
			} 
	};

	request(options).pipe(res);

 });

app.post("/airbnb", function (req, res) {	
	console.log(req.body);
	var resObject;
	airbnb.search(req.body).then(function(searchResults) {
	  //console.log(searchResults);
	 res.send(searchResults);
	});
 });
