$(function() {
    var SIGNUP = "#signup";
    var currentPage = 1;

    var handHeld = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    var adjustScroll = function(scrolled) {
        $('.large-bg').css('background-position', '0px ' + scrolled + 'px');
    }

    $('#body').on('activate.bs.scrollspy', function (e) {
        var tab = $(e.target);
        activatePage(tab.data("x-page"));
    });

    var activatePage = function(pageNumber) {
        $('body').removeClass("page-" + currentPage).addClass("page-" + pageNumber);
        currentPage = pageNumber;
    }


    var scrollTo = function(pageId) {
        var navHeight = $("#navigation").outerHeight() - 20;
        $('html,body').animate({scrollTop: $(pageId).offset().top - navHeight}, 'slow');
    }


    $(".navbar-nav > li > a").each(function(index, element) {
        element = $(element);
        var hash = element[0].hash;

        element.click(function(hash) {return function(e) {
            e.preventDefault();
            scrollTo(hash);
            history.pushState({ path: this.path }, '', this.href)
        }}(hash));

        if(!handHeld) {
            var li = element.parent();
            li.hover(
                function(element) {return function() {
                    element.addClass("active");
                }}(li),

                function(element) {return function() {
                    var pageNumber = element.data("x-page");
                    if(pageNumber != currentPage) {
                        element.removeClass("active");
                    }
                }}(li)
            );
        }
    });

    $(".signup-button").click(function(e) {
        e.preventDefault();
        return scrollTo(SIGNUP);
    });

    if(!handHeld) {
        $(window).bind('scroll', function(e) {
            var val = $(this).scrollTop();
            adjustScroll(val);
        });
    }

    ymaps.ready(function() {
        var map = new ymaps.Map ("map", {
            center: [59.945035, 30.270128],
            zoom: 16
        });

        var location = new ymaps.Placemark(
            [59.945035, 30.270128],
            {hintContent: "vfx-school", balloonContent: "<b>Факультет Искусств СПБГУ</b><br/>Россия, Санкт-Петербург, В.О.,10 линия, д. 49"}
        );

        map.geoObjects.add(location);
        map.controls.add(
            new ymaps.control.ZoomControl()
        );

        location.balloon.open();
    });

    var resizeCircles = function() {
        $('.circled, .encircled').each(function() {
            var e = $(this);
            var cw = e.outerWidth();
            var ch = e.outerHeight();
            var max = Math.max(cw, ch) + 'px';

            e.css({'min-height': max, 'min-width': max});

        });
    }


    $(window).resize(resizeCircles);
    resizeCircles();
});

