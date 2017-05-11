var path = require("path");
var bodyParser = require("body-parser");
//var Yelp = require("yelp");
var express = require("express");
var request = require("request");


var app = express();
var port = process.env.PORT || 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//


//Serves the root directory relative to the directory that the express app is run from
app.use(express.static(path.join(__dirname, "/")));

// app.use(function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Method", "GET, POST");
// 	res.header("Access-Control-Allow-Headers", "Content-Type");
// 	next();
// });

// CORS
app.use(function(req, res, next) {
  if ('OPTIONS' !== req.method) {
    if ('origin' in req.headers) {
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    }
    next();
  } else {
    var body = '{}\n';
    if ('origin' in req.headers) {
      if (ALLOWED_ORIGINS.indexOf(req.headers.origin) >= 0) {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Length', body.length);
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        if (req.headers['access-control-request-method']) {
          res.setHeader('Access-Control-Allow-Method', req.headers['access-control-request-method']);
        }
        if (req.headers['access-control-request-methods']) {
          res.setHeader('Access-Control-Allow-Methods', req.headers['access-control-request-methods']);
        }
        res.setHeader('Access-Control-Max-Age', (60));
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.end(body);
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Length', body.length);
        res.send(403, body);
        res.end();
      }
    }
  }

app.listen(port, function () {
    console.log("The server is listening on port " + port);
});

// Sends the index.html file as response when the "/" route is called
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/yelp", function (req, res) {	
	// console.log(req.body);
	// var queryObj = JSON.stringify(req.body);
	// var queryURL = "https://api.yelp.com/v3/businesses/search?";
	// var options = { 
	// 	"method": "GET",
	// 	"url": queryURL,
	// 	"qs": queryObj,
	// 	"headers": { 
	//    		//"postman-token": "d4acc441-7e71-ad84-dddb-e88e563ba45b",
	//      	"cache-control": "no-cache",
	//      	"authorization": "Bearer S7LImio1bL-jYfN1zzz6z6iKmrFE95eCDH9nQodFeB2Ms2vW4UYYaBTX256MW0B52uqk1_N1w4F2FunzAR89rXa6-3L0r1TCr7bfsUKtAQtApnyZUhfwtb3D5OgLWXYx",
	//      	"content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW" 
	//      },
	//   		"formData": { 
	//   			"oauth_token": "S7LImio1bL-jYfN1zzz6z6iKmrFE95eCDH9nQodFeB2Ms2vW4UYYaBTX256MW0B52uqk1_N1w4F2FunzAR89rXa6-3L0r1TCr7bfsUKtAQtApnyZUhfwtb3D5OgLWXYx" 
	// 		} 


	// };

	// request(options).on('error', function(err) {
 //    console.log(err)
 //  })
 //  .pipe(res);
	res.send("hello world");


 });

app.post("/green", function (req, res) {	
	console.log(req.body.qs);
	// var queryURL = "https://api.airbnb.com/v2/search_results?client_id=3092nxybyb0otqw18e8nh5nty" + req.body.qs;
	// var options = { 
	// 	method: "GET",
	// 	url: queryURL,

	// };

	// request(options).pipe(res);
	res.send('hello world');

 });


app.get("/red", function (req, res) {	
	console.log(req.body.qs);

	res.send('hello world');

 });







