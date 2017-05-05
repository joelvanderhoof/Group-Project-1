$(function () {
    var body = $('body');
    var backgrounds = [
      'url("../images/background_img/cityscape.png")', 
      'url(../images/background_img/forest.jpeg)', 
      'url(../images/background_img/mountain-village.png)', 
      'url(../images/background_img/ocean-village.jpeg)'];
    var current = 0;

    function nextBackground() {
        body.css(
            'background',
        backgrounds[current = ++current % backgrounds.length]);

        setTimeout(nextBackground, 5000);
    }
    setTimeout(nextBackground, 5000);
    body.css('background', backgrounds[0]);
});