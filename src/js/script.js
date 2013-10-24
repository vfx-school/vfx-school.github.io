$(function() {
    var SIGNUP = "#signup";
    var currentPage = 1;

    var handHeld = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    var adjustScroll = function(scrolled) {
        $('.large-bg').css('background-position', '0px ' + scrolled + 'px');
    }

    var s = skrollr.init({
        "beforerender": function(data) {
            adjustScroll(data.curTop);
        },
        "smoothScrolling": true
    });

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

});

