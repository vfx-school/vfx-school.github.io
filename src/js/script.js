$(function() {

    var touchSupported = (('ontouchstart' in window) ||
        window.DocumentTouch && document instanceof DocumentTouch);

    var SIGNUP = "#signup";

    var currentPage = 1;

    $('#body').on('activate.bs.scrollspy', function (e) {
        var tab = $(e.target);
        activatePage(tab.data("x-page"));
    });

    var activatePage = function(pageNumber) {
        $('body').removeClass("page-" + currentPage).addClass("page-" + pageNumber);
        currentPage = pageNumber;
    }


    var scrollTo = function(pageId) {
        $('html,body').animate({scrollTop: $(pageId).offset().top}, 'slow');
    }

    var parallax = function(scrolled) {
        $('.large-bg').css('background-position', '0px ' + scrolled + 'px');
    }

    $(".navbar-nav > li > a").each(function(index, element) {
        element = $(element);
        var hash = element[0].hash;

        element.click(function(hash) {return function(e) {
            e.preventDefault();
            scrollTo(hash);
            history.pushState({ path: this.path }, '', this.href)
        }}(hash));

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
    });

    $(".signup-button").click(function(e) {
        e.preventDefault();
        return scrollTo(SIGNUP);
    });

    if (touchSupported) {
        $(window).bind('touchmove', function(e) {
            var val = e.currentTarget.scrollY;
            parallax(val);

            $('[data-spy="scroll"]').each(function () {
                var $spy = $(this).scrollspy('refresh')
            })
        });
    }

    $(window).bind('scroll', function(e) {
        var val = $(this).scrollTop();
        parallax(val);
    });
});

