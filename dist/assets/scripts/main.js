'use strict';

var isDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isAndroid = /Android/i.test(navigator.userAgent),
    isIos = /iPhone|iPad|iPod/i.test(navigator.userAgent),
    isMobile = $(window).width() < 768,
    mobileWidth = 767,
    deviceWidth = 1024;

var isMobileScreen = function isMobileScreen() {
    return document.body.clientWidth < 768;
};
var isTabletAndMobile = function isTabletAndMobile() {
    return document.body.clientWidth < 1024;
};
var isMobileMenuBreakpoint = function isMobileMenuBreakpoint() {
    return document.body.clientWidth < 1200;
};

var isIE11 = !!(navigator.userAgent.match(/Trident/) && navigator.userAgent.match(/rv[ :]11/));
var FE = {
    global: {
        equalHeightByRow: function equalHeightByRow(obj, notRunMobile) {
            var widthTarget = 0;
            if ($(obj).length) {
                $(obj).height('auto');
                widthTarget = notRunMobile === true ? 768 : 0;
                if ($(window).width() >= widthTarget) {
                    var currentTallest = 0,
                        currentRowStart = 0,
                        rowDivs = [],
                        currentDiv = 0,
                        $el,
                        topPosition = 0;
                    $(obj).each(function () {
                        if ($(this).is(':visible') === true) {
                            $el = $(this);
                            topPosition = $el.offset().top;
                            if (currentRowStart !== topPosition) {
                                for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                                    rowDivs[currentDiv].innerHeight(currentTallest);
                                }
                                rowDivs = [];
                                currentRowStart = topPosition;
                                currentTallest = $el.innerHeight();
                                rowDivs.push($el);
                            } else {
                                rowDivs.push($el);
                                currentTallest = currentTallest < $el.innerHeight() ? $el.innerHeight() : currentTallest;
                            }
                            for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                                rowDivs[currentDiv].innerHeight(currentTallest);
                            }
                        }
                    });
                }
            }
        },
        detectDevices: function detectDevices() {
            var a = isDevice === true ? ' device' : ' pc',
                b = isAndroid === true ? ' android' : ' not-android',
                c = isIos === true ? ' ios' : ' not-ios',
                d = isMobile ? ' mobile' : ' desktop',
                e = isIE11 ? ' ie11' : ' ',
                htmlClass = a + b + c + d + e;
            $('html').addClass(htmlClass);
        },
        replaceImgToBackgroundBreadcumb: function replaceImgToBackgroundBreadcumb(img) {
            $(img).each(function () {
                if ($(this).css('visibility') == 'visible') {
                    $(this).css({ 'visibility': 'hidden', 'opacity': '0' });
                    $(this).closest('#breadcrumb').addClass('container-background').css('background-image', 'url(' + $(this).attr('src') + ')');
                };
            });
        },
        replaceImgToBackground: function replaceImgToBackground(img) {
            $(img).each(function () {
                if ($(this).css('visibility') == 'visible') {
                    $(this).css({ 'visibility': 'hidden', 'opacity': '0' });
                    $(this).closest('.bg-container').addClass('container-background').css('background-image', 'url(' + $(this).attr('src') + ')');
                };
            });
        },
        slider: function slider() {
            $('.hero-slider').slick({
                infinite: true,
                arrows: false,
                autoplay: false,
                dots: true,
                slidesToShow: 1,
                responsive: [{
                    breakpoint: 767,
                    settings: {
                        dots: false,
                        autoplay: true
                    }
                }]
            });
        },
        helpslider: function helpslider() {
            var $slick = $('.help-sticker');
            $slick.slick({
                infinite: true,
                arrows: true,
                autoplay: false,
                dots: false,
                slidesToShow: 1
            });
            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                e.target; // newly activated tab
                $slick.slick('unslick');
                $slick.slick({
                    infinite: true,
                    arrows: true,
                    autoplay: false,
                    dots: false,
                    slidesToShow: 1
                });
                $('.help-sticker').unslick();
                e.relatedTarget; // previous active tab
            });
        },

        masonry: function masonry() {
            //if ($(window).width() >= 768) {
            /*$('.grid').masonry({
              // options
              itemSelector: '.grid-item',
              columnWidth: 190
            });*/
            $('#Container').mixItUp({
                animation: {
                    animateResizeTargets: true
                }
            });
            // }
        },
        menuMobile: function menuMobile() {
            /* var myaccount= $('#myaccount > ul > li').clone();
                 if(! $('#menu-mobile-parent').find('.item-account').length) {
                   $('#menu-mobile-parent').prepend(myaccount);
                 }*/
            //if (isMobileScreen()) {
            $('#menu-mobile').mmenu({
                offCanvas: {
                    position: "left", // changing this alters the position of the menu
                    zposition: "front"
                }
            });
            var API = $('#menu-mobile').data('mmenu');
            $('#menu-button').click(function () {
                API.open();
            });
            /*$('#menu-mobile').mmenu({
               'slidingSubmenus': true,
               'offCanvas': {
                    'position': 'left'
                 }
            });*/

            //   } 
        },
        sliderArticle: function sliderArticle() {
            $('#consultants .list-consultants').slick({
                arrows: true,
                autoplay: false,
                dots: false,
                slidesToShow: 3,
                slidesToScroll: 3,
                responsive: [{
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
            });
        },

        validateForm: function validateForm() {
            $('#contact-form').validate({
                rules: {
                    firstname: {
                        required: true
                    },
                    lastname: {
                        required: true
                    },
                    message: {
                        required: true
                    }
                }
            });
        },
        stickyHeader: function stickyHeader() {
            // $("#header").sticky({topSpacing:0});
        },
        init: function init() {
            //  FE.global.replaceImgToBackgroundBreadcumb('.feature-image');
            FE.global.replaceImgToBackground('.feature-image');
            //FE.global.slider();
            FE.global.sliderArticle();
            FE.global.helpslider();
            // FE.global.stickyHeader();
            FE.global.menuMobile();
            FE.global.masonry();
            FE.global.validateForm();
        },
        loaded: function loaded() {
            // FE.global.slider();
            //FE.global.sliderArticle();
            FE.global.menuMobile();
        },
        resize: function resize() {
            //   FE.global.menuMobile();
            // console.log('reszing....');
            //FE.global.masonry();
        },
        scroll: function scroll() {}
    }
};

$(function () {
    FE.global.init();
});

$(window).load(function () {
    // FE.global.loaded();
});

// Window resize
var width = $(window).width();
var resize = 0;
$(window).resize(function () {
    var _self = $(undefined);
    resize++;
    setTimeout(function () {
        resize--;
        if (resize === 0) {
            // Done resize ... 
            if (_self.width() !== width) {
                width = _self.width();
                // Done resize width ...
                FE.global.resize();
            }
        }
    }, 100);
});

$(window).scroll(function () {
    FE.global.scroll();
});
//# sourceMappingURL=main.js.map
