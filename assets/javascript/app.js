//Yelp Object
var yelpReqObject = JSON.stringify({ "term": "coffee", "latitude": "33.645068", "longitude": "-117.835098", "radius": "500"});


// Airbnb Object
var airReqObject = JSON.stringify({
	 location: 'Seattle, WA',
	 guests: 2,
	 page: 2,
	 ib: true
	});

//Routes: yelp, airbnb

function callAPI (route, object) {
	var queryURL = "http://localhost:3000/" + route;
	//test Yelp API call through server
	var settings = {
	  "url": queryURL,
	  "method": "POST",
	  "headers": {
	    "content-type": "application/json; charset=UTF-8",
	  },
	  "data": object
	}

	console.log(object);

	$.ajax(settings).done(function (response) {
	  console.log(route + " api response object:");
	  console.log(response);
	});
}

callAPI("yelp", yelpReqObject);
callAPI("airbnb", airReqObject);