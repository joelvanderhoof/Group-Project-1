var path = require("path");
var express = require("express");
var request = require("request");
var airbnb = require('airapi')();

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

app.post("/green", function (req, res) {	
	console.log(req.body.qs);
	// var queryURL = "https://api.airbnb.com/v2/search_results?client_id=3092nxybyb0otqw18e8nh5nty" + req.body.qs;
	var options = { 
		method: 'GET',
		url: 'https://api.airbnb.com/v2/search_results',
		qs: {
			client_id: '3092nxybyb0otqw18e8nh5nty',
			locale: 'en-US',
			currency: 'USD',
			_format: 'for_search_results_with_minimal_pricing',
			_limit: '1',
			_offset: '0',
			fetch_facets: 'true',
			guests: '1',
			ib: 'false',
			ib_add_photo_flow: 'true',
			location: 'Lake Tahoe, CA, US',
			min_bathrooms: '0',
			min_bedrooms: '0',
			min_beds: '1',
			min_num_pic_urls: '10',
			price_max: '210',
			price_min: '40',
			sort: '1',
			user_lat: '37.3398634',
			user_lng: '-122.0455164' 
		},
		headers: 
		{ 'postman-token': '0f9e4a1c-61a3-f7bd-942e-d45a4d185887',
		'cache-control': 'no-cache',
		'content-type': 'application/json; charset=UTF-8' } 
	};

	request(options, function (error, response, body) {
		if (error) throw new Error(error);

		console.log(body);
	});

});



app.post("/red", function (req, res) {	
	console.log(req.body);
	res.send("/red post: hello world")
 });

app.get("/red", function (req, res) {	
	console.log(req.body);
	res.send("/red get: hello world")
 });

app.post("/lodging", function (req, res) {	
	console.log(req.body);
	var resObject;
	airbnb.search({
	 location: 'Seattle, WA',
	 checkin: '07/03/2015',
	 checkout: '07/06/2015',
	 guests: 2,
	 page: 2,
	 ib: true
	}).then(function(searchResults) {
	  console.log(searchResults);
	  resObject = searchResults;
	});
	res.send(resObject);
 });




