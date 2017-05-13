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
var imgListArr;
var yelpResObject
 //URLs for switching between test and production environments
 var herokuURL = "https://group-project-1.herokuapp.com/";
 var localURL = "http://localhost:3000/";


//-------------------------------------------------------------

//create array of images from airResObject
function buildImgDisplay() {
	  for(var i = 0; i < 4; i++){
	  imgListArr = airResObject.results_json.search_results[i].listing.picture_urls[i];
	  imgListName = airResObject.results_json.search_results[i].listing.name;

	  //modal information
	  imgListBedroom = airResObject.results_json.search_results[0].listing.bedrooms;
	  imgListRate = airResObject.results_json.search_results[0].pricing_quote.rate_type;
	  imgListGuestNo = airResObject.results_json.search_results[0].listing.person_capacity;
	  imgListRating = airResObject.results_json.search_results[0].listing.star_rating;

    //create and append div tags containing img tags for airbnb images
	  var listings = $('<div>').addClass('listing-div')
	  listings.attr('list-number', i);
	  var listingInfo = $('<p>').text(imgListName)
	  var listingImg = $('<img>').attr('src', imgListArr)
	  listingImg.addClass('listImg');
	  listings.append(listingInfo);
	  listings.append(listingImg);
	  $('.bgimg-3').append(listings);
	  }
};
 
//-------------------------------------------------------------

//Call Airbnb API
function callAirbnb () {
 	var queryURL = herokuURL + "airbnb";

	//Airbnb route API call settings
	var settings = {
	  "url": queryURL,
	  "method": "POST",
	  "headers": {
	    "content-type": "application/json; charset=UTF-8",
	  },
	  "data": airReqObject
	}

	console.log("airbnb query parameter object:" + airReqObject);
  
  //make the call
	$.ajax(settings).done(function (response) {
	  console.log("airbnb api response object:");
	  //console.log(response);
	  airResObject = response;
	  console.log(typeof airResObject);
	  console.log(airResObject);
    buildImgDisplay();
	});
};

//-----------------------------------------------------

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



