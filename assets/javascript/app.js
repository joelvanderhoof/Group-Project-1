var reqObject = JSON.stringify({ "term": "coffee", "latitude": "33.645068", "longitude": "-117.835098", "radius": "500"});
//TO DO: build a string of valid parameters to pass into the queryURL
//var reqObject = JSON.stringify({ "qs": "&locale=en-US&currency=USD&_format=for_search_results_with_minimal_pricing&_limit=10&_offset=0&fetch_facets=true&guests=1&ib=false&ib_add_photo_flow=true&location=Lake%20Tahoe%2C%20CA%2C%20US&min_bathrooms=0&min_bedrooms=0&min_beds=1&min_num_pic_urls=10&price_max=210&price_min=40&sort=1&user_lat=37.3398634&user_lng=-122.0455164"});

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