// Toggle Navbar

$('.sidebar-toggle').on('click', function () {
    $('.sidebar').toggleClass('sidebar-open');
    $('#toggle-icon').toggleClass('fa-times');
});

$('.remove-sidebar-mobile').on('click', function () {
    $('.sidebar').removeClass('sidebar-open');
    $('#toggle-icon').toggleClass('fa-times');
});

$('.sidebar-toggle').on('click', function (event) {
    event.stopPropagation();
});

$('.sidebar').on('click', function (event) {
    event.stopPropagation();
});

//when clicking the where of window
// $(window).click(function () {
//     $('.sidebar').removeClass('sidebar-open');
//     $('#toggle-icon').addClass('fa-bars');
//     $('#toggle-icon').removeClass('fa-times');
// });