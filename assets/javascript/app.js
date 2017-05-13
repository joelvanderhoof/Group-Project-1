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

var responseObject;
var imgListArr;

//Routes: yelp, airbnb

//Use these strings for the routes: yelp, airbnb

 //URLs
 //heroku: https://group-project-1.herokuapp.com/
 var herokuURL = "https://group-project-1.herokuapp.com/";
 //local: 
 var localURL = "http://localhost:3000/";
 
 function callAPI (route, object) {
 	var queryURL = herokuURL + route;

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
	  responseObject = response;
	  console.log(responseObject);

	  for(var i = 0; i < 4; i++){
	  imgListArr = responseObject.results_json.search_results[i].listing.picture_urls[i];
	  imgListName = responseObject.results_json.search_results[i].listing.name;

	  //modal information
	  imgListBedroom = responseObject.results_json.search_results[0].listing.bedrooms;
	  imgListRate = responseObject.results_json.search_results[0].pricing_quote.rate_type;
	  imgListGuestNo = responseObject.results_json.search_results[0].listing.person_capacity;
	  imgListRating = responseObject.results_json.search_results[0].listing.star_rating;


	  var listings = $('<div>').addClass('listing-div')
	  listings.attr('list-number', i);
	  var listingInfo = $('<p>').text(imgListName)
	  var listingImg = $('<img>').attr('src', imgListArr)
	  listingImg.addClass('listImg');
	  listings.append(listingInfo);
	  listings.append(listingImg);
	  $('.bgimg-3').append(listings);
	  }

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
})

















