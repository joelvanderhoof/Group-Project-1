//Yelp Object
var yelpReqObject = { "term": "coffee", "latitude": "33.645068", "longitude": "-117.835098", "radius": "500"};

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

//Routes: yelp, airbnb

//Use these strings for the routes: yelp, airbnb

 //URLs
 	//heroku: https://group-project-1.herokuapp.com/
 	var herokuURL = "https://group-project-1.herokuapp.com/";
 	//local: 
	var localURL = "http://localhost:3000/";
 
 function callAPI (route, object) {
<<<<<<< HEAD
 	var queryURL = localURL + route;

=======
 	var queryURL = herokuURL + route;

function callAPI (route, object) {
	var queryURL = "http://localhost:3000/" + route;
>>>>>>> 009d16ad5f60fcca52b9a53ea811430fa5adf567
	//test Yelp API call through server
	var settings = {
	  "url": queryURL,
	  "method": "POST",
	  "headers": {
	    "content-type": "application/json; charset=UTF-8",
	  },
	  "data": object
	}

	console.log(route + " query parameter object:" + object);

	$.ajax(settings).done(function (response) {
	  console.log(route + " api response object:");
	  console.log(response);
	});
};

//callAPI("yelp", yelpReqObject);


// Capture string for airbnb location
var clicks = 0;
$(".search-icon").on("click", function() {
	if (clicks < 1) {
		clicks++;
	} else {
		//Call airbnb with input location
		airReqObject.location = $(".search-input").val();
		airReqObject = JSON.stringify(airReqObject);
		console.log(airReqObject);
		callAPI("airbnb", airReqObject);

		//call yelp with the location of the first response object lat/long
	}
});
