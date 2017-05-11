var reqObject = JSON.stringify({ "term": "coffee", "latitude": "33.645068", "longitude": "-117.835098", "radius": "500"});
//var reqObject = JSON.stringify({ "qs": ""});

var queryRoute = "yelp";
var queryURL = "https://group-project-1.herokuapp.com/" + queryRoute;

//test Yelp API call through server
var settings = {
  "url": queryURL,
  "method": "POST",
  "headers": {
    "content-type": "application/json; charset=UTF-8",
  },
  "data": reqObject
}

$.ajax(settings).done(function (response) {
  console.log(response);
});