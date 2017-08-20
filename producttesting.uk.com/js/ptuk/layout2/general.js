$(function() {
    $(".rslides").responsiveSlides({
        auto: true,
        pager: true,
        speed: 500,
        timeout: 10000,
        maxwidth: 940,
        namespace: "centered-btns"
    });
});

$("#stOverlay").height($(document).height());

$("#closeModal, #stOverlay").click(function () {
    $("#stOverlay").fadeOut();
});