$(function() {
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

    $(".navbar-nav > li > a").each(function(index, element) {
        element = $(element);
        var hash = element[0].hash;

        element.click(function(hash) {return function(e) {
            e.preventDefault();
            scrollTo(hash);
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
});

