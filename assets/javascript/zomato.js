//Zomato API


  var apiKey = '13fbf6ef629a0503ea53a58541a8b255';
  var queryURL = 'https://developers.zomato.com/api/v2.1/restaurant?res_id=16774318'

$.ajax({
         url: queryURL,
         type: 'GET',
         beforeSend: function(xhr){xhr.setRequestHeader('user-key', apiKey);},
         success: function() { console.log("success"); }
      }).done(function(json){

        console.log(json);
        var image = json.thumb;
        var name = json.name;
        var location = json.location.city;

        $("#the-img").append('<p>'+name+'</p>')
        $("#the-img").append('<p>'+location+'</p>')
        $("#the-img").prepend($('<img>', {id: 'img', src: image}));

      });