$(function() {
    var SIGNUP = "#signup";

    var currentPage = 1;

    $('#body').on('activate.bs.scrollspy', function (e) {
        var tab = $(e.target);

        console.log("spied: ", tab);

        //highlightPage(tab);
        activatePage(tab.data("x-page"));
    });

    var activatePage = function(pageNumber) {
        $('body').removeClass("page-" + currentPage).addClass("page-" + pageNumber);
        currentPage = pageNumber;
    }

    /*var highlightPage = function(tab) {
        tab.addClass("active");
    }*/

    var scrollTo = function(pageId) {
        $('html,body').animate({scrollTop: $(pageId).offset().top}, 'slow');
        return false;
    }

    $(".navbar-nav > li > a").each(function(index, element) {
        element = $(element);
        var hash = element[0].hash;

        element.click(function(hash) {return function(e) {
            e.preventDefault();
            return scrollTo(hash);
        }}(hash));
    });

    $(".signup-button").click(function(e) {
        e.preventDefault();
        return scrollTo(SIGNUP);
    });
});

