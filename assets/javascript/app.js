//Yelp Object
var yelpReqObject = { "term": "coffee", "latitude": "33.645068", "longitude": "-117.835098", "radius": "500"};
var yelpResObject;
//Possible Airbnb search options:
	// {
	//   checkin: {String}, e.g: '04/30/2015'
	//   checkout: {String},
	//   guests: {Number},
	//   page: {Number},
	//   location: {String}, e.g: 'New York, NY' or 'Seattle, WA'
	//   price_min: {Number},
	//   price_max: {Number},
	//   min_bedrooms: {Number},
	//   min_bathrooms: {Number},
	//   min_beds: {Number},
	//   superhost: {Boolean},
	//   hosting_amenities: {Array of id}, e.g: [1,4]
	//   property_type_id: {Array of id}, e.g: [1]
	//   languages: {Array of id}, e.g: [1,64]
	//   keywords: {String}, e.g: 'ocean,view,balcony'
	//   room_types: {Array}, e.g: ['Entire home/apt', 'Private room', 'Shared room']
	//   ib: {Boolean}, instant-book
	//   neighborhoods: {Array}, e.g: ['Belltown', 'Queen Anne']
	// }


// Airbnb Object
var airReqObject = {
	 location: 'Seattle, WA',
	 guests: 2,
	 page: 2,
	 ib: true
	};
var airResObject;
//Routes: yelp, airbnb

//Use these strings for the routes: yelp, airbnb

 //URLs
 	//heroku: https://group-project-1.herokuapp.com/
 	var herokuURL = "https://group-project-1.herokuapp.com/";
 	//local: 
	var localURL = "http://localhost:3000/";
 
function callAirbnb () {
 	var queryURL = herokuURL + "airbnb";

	//test Yelp API call through server
	var settings = {
	  "url": queryURL,
	  "method": "POST",
	  "headers": {
	    "content-type": "application/json; charset=UTF-8",
	  },
	  "data": airReqObject
	}

	console.log("airbnb query parameter object:" + airReqObject);

	$.ajax(settings).done(function (response) {
	  console.log("airbnb api response object:");
	  //console.log(response);
	  airResObject = response;
	  console.log(typeof airResObject);
	  console.log(airResObject);
	});
};

function callYelp () {
 	var queryURL = herokuURL + "yelp";

 	//update yelpReqObject with the lat/long of the airbnb listing
 	yelpReqObject.latitude = airResObject.results_json.search_results[0].listing.lat;
	yelpReqObject.longitude = airResObject.results_json.search_results[0].listing.lng;
	yelpReqObject = JSON.stringify(yelpReqObject);
	console.log("this is the yelp request object:")
	console.log(yelpReqObject);

	//test Yelp API call through server
	var settings = {
	  "url": queryURL,
	  "method": "POST",
	  "headers": {
	    "content-type": "application/json; charset=UTF-8",
	  },
	  "data": yelpReqObject
	}

	console.log("yelp query parameter object:" + yelpReqObject);

	$.ajax(settings).done(function (response) {
	  console.log("yelp api response object:");
	  //console.log(response);
	  airResObject = response;
	  console.log(typeof airResObject);
	  console.log(airResObject);
	});
};



// Capture string for airbnb location
var clicks = 0;
$(".search-icon").on("click", function() {
	if (clicks < 1) {
		clicks++;
	} else if (clicks < 2) {
		clicks++;
		//Call airbnb with input location
		airReqObject.location = $(".search-input").val();
		airReqObject = JSON.stringify(airReqObject);
		console.log(airReqObject);
		callAirbnb();
		
	} else {
		callYelp();
	}
});

$(".lodging").on("click", function() {
	callYelp();
});


