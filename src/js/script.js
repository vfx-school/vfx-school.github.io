$(function() {
    var SCROLL_DURATION = 500;
    var currentPage = 1;

    $('#body').on('activate.bs.scrollspy', function (e) {
        activatePage($(e.target).data("x-page"));
    });

    var activatePage = function(pageNumber) {
        $('#body').removeClass("page-" + currentPage).addClass("page-" + pageNumber);
        currentPage = pageNumber;
    }

    activatePage(currentPage);

    var scrollTo = function(pageId) {
        $.scrollTo($(pageId), SCROLL_DURATION);
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
});

