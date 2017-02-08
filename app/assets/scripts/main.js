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
        helpslider: function() {
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
            })    
        },
        selectpickerStyle: function() {
             $('.selectpicker').selectpicker({
                  style: 'btn-info',
                  size: 4
                });

         },
        filterData:function() {
            var $filterSelect = $('.selectpicker'),
            $container = $('#grid-masonry');
            var mixer = mixitup($container, {
              selectors: {
                target: '.mix',
                control: '[data-mixitup-control]'
              }
             
            });

            $filterSelect.on('change', function(){
                $container.mixItUp('filter', this.value);
            });
            
        },
        viewMore: function() {
            $('#view-more').on('click',function(e){
                e.preventDefault();

                var html='<div class="grid-item mix Business"><div class="panel"><div class="image"><img src="assets/images/img01.png"></div><div class="category"><a class="grey" href="">Business</a></div><div class="panel-body"><h3><a href="">Lorem ipsum dolor sit amet</a></h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris faucibus mauris sit amet libero commodo fringilla vel a ipsum. Vestibulum bibendum tincidunt ipsum...</p></div><div class="panel-footer"><span class="author">Article by Scott Cain </span><span class="date">21 Nov. 2016</span></div></div></div><div class="grid-item mix Business"><div class="panel"><div class="image"><img src="assets/images/img01.png"></div><div class="category"><a class="grey" href="">Business</a></div><div class="panel-body"><h3><a href="">Lorem ipsum dolor sit amet</a></h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris faucibus mauris sit amet libero commodo fringilla vel a ipsum. Vestibulum bibendum tincidunt ipsum...</p></div><div class="panel-footer"><span class="author">Article by Scott Cain </span><span class="date">21 Nov. 2016</span></div></div></div>';
                var container =  $('#grid-masonry');
                container.append(html);
                //destroy mixItup 
                container.mixItUp('destroy');
                //init mixitup function again
                FE.global.filterData();
            });
        },
        menuMobile: function() {
          
                $('#menu-mobile').mmenu({
                    offCanvas : {
                        position : "left", // changing this alters the position of the menu
                        zposition : "front"
                    }
                });
                var API = $('#menu-mobile').data('mmenu');
                $('#menu-button').click(function() {
                    API.open();
                })
                
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
            $( '#contact-form' ).validate( {
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
            FE.global.helpslider();
            FE.global.selectpickerStyle();
            FE.global.viewMore();
           // FE.global.stickyHeader();
            FE.global.menuMobile();
            FE.global.filterData();
            FE.global.validateForm();
        },
        loaded: function() {
           // FE.global.slider();
           //FE.global.sliderArticle();
           FE.global.menuMobile();
        },
        resize: function() {
          //   FE.global.menuMobile();
         // console.log('reszing....');
          //FE.global.masonry();
        },
        scroll: function() {
            
        }
    }
};
