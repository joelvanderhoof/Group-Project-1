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

//Set api call location for test/production
 var apiCallURL = herokuURL;


//-------------------------------------------------------------

//create array of images from airResObject
function   buildImgDisplay() {
	  for(var i = 0; i < 4; i++){
	  imgListArr = airResObject.results_json.search_results[i].listing.picture_urls[i];
	  imgListName = airResObject.results_json.search_results[i].listing.name;

	  //modal information
	  imgListBedroom = airResObject.results_json.search_results[i].listing.bedrooms;
	  imgListRate = airResObject.results_json.search_results[i].pricing_quote.rate_type;
	  imgListGuestNo = airResObject.results_json.search_results[i].listing.person_capacity;
	  imgListRating = airResObject.results_json.search_results[i].listing.star_rating;

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

//------------------------------------------------------------
//Build the Yelp request object

//set the location of the yelp to the listing selected
$(document).on("click", ".listing-div", function() {
	var listingIndex = $(this).attr("list-number");
	console.log("listingIndex: " + listingIndex);


	//update yelpReqObject with the lat/long of the airbnb listing
	yelpReqObject.latitude = airResObject.results_json.search_results[listingIndex].listing.lat;
	yelpReqObject.longitude = airResObject.results_json.search_results[listingIndex].listing.lng;
	console.log(yelpReqObject.latitude);
	console.log(yelpReqObject.longitude);


});

//update yelpReqObject with an activity from "Things To Do"
$(document).on("click", ".select-activity", function() {
	yelpReqObject.term = $(this).val();
	yelpReqObject = JSON.stringify(yelpReqObject);
	console.log("this is the yelp request object:")
	console.log(yelpReqObject);
});

//call the airbnb api on submit
$(document).on("click", "#SUBMIT", function() {
	callYelp();
});

	

 
//-------------------------------------------------------------

//Call Airbnb API
function callAirbnb () {
 	var queryURL = apiCallURL + "airbnb";

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
 	var queryURL = apiCallURL + "yelp";

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
	  yelpResObject = response;
	  console.log(typeof yelpResObject);
	  console.log(yelpResObject);
	  buildYelpDisplay();
	});

};

//------------------------------------------------------

// Capture string for airbnb location
var clicks = 0;
$(".search-icon").on("click", function() {
	if (clicks < 1) {
		clicks++;
	} else if (clicks === 1) {
		clicks++;
		//Call airbnb with input location
		airReqObject.location = $(".search-input").val();
		airReqObject = JSON.stringify(airReqObject);
		console.log(airReqObject);
		callAirbnb();
		
	}
});

//-------------------------------------------------------------

//create array of images from airResObject
function buildYelpDisplay() {
	  for(var i = 0; i < 4; i++){
	  imgListArr = yelpResObject.businesses[i].image_url;
	  imgListName = yelpResObject.businesses[i].name;

	  //modal information
	  imgListLocation = yelpResObject.businesses[i].coordinates;
	  imgListRate = yelpResObject.businesses[i].rating;
	  imgListGuestNo = yelpResObject.businesses[i].price;
	  imgListRating = yelpResObject.businesses[i].review_count;

    //create and append div tags containing img tags for airbnb images
	  var activity = $('<div>').addClass('listing-div')
	  activity.attr('list-number', i);
	  var activityInfo = $('<p>').text(imgListName)
	  var activityImg = $('<img>').attr('src', imgListArr)
	  activityImg.addClass('listImg');
	  activity.append(activityInfo);
	  activity.append(activityImg);
	  $('.bgimg-2').append(activity);
	  }
};


