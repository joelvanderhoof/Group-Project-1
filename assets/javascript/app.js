// $(function () {
//     var body = $('body');
//     var backgrounds = [
//       'url("assets/images/background_img/cityscape.png")', 
//       'url("assets/images/background_img/forest.jpg")', 
//       'url("assets/images/background_img/mountain-village.png")', 
//       'url("assets/images/background_img/ocean-village.jpg")'];
//     var current = 0;

//     function nextBackground() {
//         body.css(
//             'background',
//         backgrounds[current = ++current % backgrounds.length]);

//         setTimeout(nextBackground, 5000);
//     }
//     setTimeout(nextBackground, 5000);
//     body.css('background', backgrounds[0]);
// });

//var reqObject = JSON.stringify({ "term": "coffee", "latitude": "33.645068", "longitude": "-117.835098", "radius": "500"});

//Query Yelp
$(".search-icon").on("click", function() {
var searchString = $(".search-input").val();
var reqObject = JSON.stringify({ "location": searchString});
console.log(typeof reqObject);
console.log(reqObject);
//test Yelp API call through server
var settings = {
  // "url": "https://group-project-1.herokuapp.com/yelp",
    "url": "https://group-project-1.herokuapp.com/",

  "method": "POST",
  "headers": {
     "content-type": "application/json; charset=UTF-8",
   },
  "data": reqObject
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

});

//Query Airbnb API
// $(".search-icon").on("click", function() {
// var searchString = encodeURI($(".search-input").val());
// var reqObject = JSON.stringify({ "qs": searchString});
// console.log(typeof reqObject);
// console.log(reqObject);
// //test Yelp API call through server
// var settings = {
//   "url": "http://localhost:3000/red",
//   "method": "POST",
//   "headers": {
//      "content-type": "application/json; charset=UTF-8",
//    },
//   "data": reqObject
// }

// $.ajax(settings).done(function (response) {
//   console.log(response);
// });



// });
