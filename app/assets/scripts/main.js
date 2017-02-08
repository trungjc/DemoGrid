'use strict';

var isDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isAndroid = /Android/i.test(navigator.userAgent),
    isIos = /iPhone|iPad|iPod/i.test(navigator.userAgent),
    isMobile = $(window).width() < 768,
    mobileWidth = 767,
    deviceWidth = 1024;

var isMobileScreen = function() {
    return document.body.clientWidth < 768;
};
var isTabletAndMobile = function() {
    return document.body.clientWidth < 1024;
};
var isMobileMenuBreakpoint = function() {
    return document.body.clientWidth < 1200;
};

var    isIE11 = !!(navigator.userAgent.match(/Trident/) && navigator.userAgent.match(/rv[ :]11/));
var FE = {
    global: {
        equalHeightByRow: function (obj, notRunMobile) {
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
        detectDevices: function() {
            var a = isDevice === true ? ' device' : ' pc',
                b = isAndroid === true ? ' android' : ' not-android',
                c = isIos === true ? ' ios' : ' not-ios',
                d = isMobile ? ' mobile' : ' desktop',
                e = isIE11 ? ' ie11' : ' ',
                htmlClass = a + b + c + d + e;
            $('html').addClass(htmlClass);
        },
        replaceImgToBackgroundBreadcumb: function(img) {
            $(img).each(function () {
                if ($(this).css('visibility') == 'visible') {
                    $(this).css({'visibility':'hidden','opacity':'0'});
                    $(this).closest('#breadcrumb').addClass('container-background').css('background-image', 'url(' + $(this).attr('src') + ')');
                };
            });
        },
        replaceImgToBackground: function(img) {
            $(img).each(function () {
                if ($(this).css('visibility') == 'visible') {
                    $(this).css({'visibility':'hidden','opacity':'0'});
                    $(this).closest('.bg-container').addClass('container-background').css('background-image', 'url(' + $(this).attr('src') + ')');
                };
            });
        },
        slider: function() {
           $('.hero-slider').slick({
                infinite: true,
                arrows: false,
                vertical: true,
                autoplay: false,
                dots: true,
                slidesToShow: 1,
                responsive: [
                    {
                        breakpoint: 767,
                          settings: {
                            dots: false,
                            autoplay: true,
                          }
                    }
                ],
            });
        },
        masonry:function() {
            $('.grid').masonry({
              // options
              itemSelector: '.grid-item',
              columnWidth: 190
            });
        },
        menuMobile: function() {
          /* var myaccount= $('#myaccount > ul > li').clone();
               if(! $('#menu-mobile-parent').find('.item-account').length) {
                 $('#menu-mobile-parent').prepend(myaccount);
               }*/
            //if (isMobileScreen()) {
                $('#menu-mobile').mmenu();
                var API = $('#menu-mobile').data('mmenu');
                $('#menu-button').click(function() {
                    API.open();
                })
                /*$('#menu-mobile').mmenu({
                   'slidingSubmenus': true,
                   'offCanvas': {
                        'position': 'left'
                     }
                });*/
               
         //   } 
        },
        sliderArticle: function() {
           $('#consultants .list-consultants').slick({
                arrows: true,
                autoplay: false,
                dots: false,
                slidesToShow: 3,
                slidesToScroll: 3,
                responsive: [
                    {
                        breakpoint: 767,
                          settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                          }
                    }
                ],
            });
        },
        
        validateForm: function() {
            $( "#contact-form" ).validate( {
              rules: {
                firstname: {
                  required: true
                },
                lastname: {
                  required: true
                },
                message : {
                    required: true
                }
              }
            } );

        },
        stickyHeader: function() {
            // $("#header").sticky({topSpacing:0});
        },
        init: function() {
          //  FE.global.replaceImgToBackgroundBreadcumb('.feature-image');
            FE.global.replaceImgToBackground('.feature-image');
            //FE.global.slider();
            FE.global.sliderArticle();
           // FE.global.stickyHeader();
            FE.global.menuMobile();
            FE.global.masonry();
            FE.global.validateForm();
        },
        loaded: function() {
           // FE.global.slider();
           //FE.global.sliderArticle();
           FE.global.menuMobile();
        },
        resize: function() {
          //   FE.global.menuMobile();
        },
        scroll: function() {
            
        }
    }
};
