
$(function () {
    FE.global.init();
});

/*$(window).load(function () {
   // FE.global.loaded();
});*/

// Window resize
var width = $(window).width();
var resize = 0;
$(window).resize(function () {
    var _self = $(undefined);
     FE.global.tabSlick();
    resize++;
    setTimeout(function () {
        resize--;
        if (resize === 0) {
            // Done resize ... 
            if (_self.width() !== width) {
                width = _self.width();
                //alert();
                // Done resize width ...
               // FE.global.resize();
                //console.log('fuck');
               
            }
        }
    }, 100);
}); 

$(window).scroll(function () {
   FE.global.scroll();
});