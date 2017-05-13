  function searchToggle(obj, evt){
  var container = $(obj).closest('.search-wrapper');

  if(!container.hasClass('active')){
      container.addClass('active');
      evt.preventDefault();
}
    else if(container.hasClass('active') && $(obj).closest('.input-holder').length == 0){
            container.removeClass('active');
            // clear input
            container.find('.search-input').val('');
            // clear and hide result container when we press close
            container.find('.result-container').fadeOut(100, function(){$(this).empty();});
}
}

function submitFn(obj, evt){
    value = $(obj).find('.search-input').val().trim();

    _html = "Searching...";
          if(!value.length){
            _html = "Please input something, I'm ready to start searching!";
}
    
    else{
          _html += "<b>" + value + "</b>";
}

$(obj).find('.result-container').html('<span>' + _html + '</span>');
$(obj).find('.result-container').fadeIn(100);

        evt.preventDefault();
}

// Hover Button Toggle
$('button[type="submit"]').click(function(){
  $(this).toggleClass('grey');
});


$(document).on('click', '.bgimg-3, .listing-div', function(){

  var listingModal = $(this).attr('list-number')
  console.log(listingModal);

})

//Page jump
 $(document).ready(function() {
  $("#searching").on("click", function (e){
    console.log(e); 
    if(e.keyCode == 13){
      $("body, html").animate({ 
      scrollTop: $(".bgimg-3").offset().top -150
    }, 600);
    }
 }); 
  $("#search-button").on("click", function( e ) {
    e.preventDefault();
    
    var expand = $("#search-button").attr("data-click") == 'true';
    if (expand) {
        $("body, html").animate({ 
      scrollTop: $(".bgimg-3").offset().top -150 //removed filter-div, restaurant-info
    }, 600);
    }
    $("#search-button").attr("data-click",!expand);
  });
   $("#SUBMIT").on("click", function( e ) {
    e.preventDefault();
  
     $("body, html").animate({ 
      scrollTop: $("#results-div").offset().top -150
    }, 600);
   }); 
});