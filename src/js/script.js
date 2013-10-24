var currentPage = 1;

$('#body').on('activate.bs.scrollspy', function (e) {
    activatePage($(e.target).data("x-page"));
});

var activatePage = function(pageNumber) {
    $('#body').removeClass("page-" + currentPage).addClass("page-" + pageNumber);
    currentPage = pageNumber;
}

activatePage(currentPage);