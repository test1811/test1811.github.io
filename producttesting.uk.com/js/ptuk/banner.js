
$(document).ready(function () {

    /// Main Menu for Desktop ////////////////
    $(document).click(function() {
        $('#bannerCategories ul li').removeClass('show_item');
    });
    $('#bannerCategories > ul').on('click', function (e) {
        e.stopPropagation();
    });

    $('.view_products').on('click', function () {

        if ($(window).width() < 940) {
            $("#bannerCategories").slideToggle();
        }
        $("#bannerCategories").removeClass("active");
        $("#bannerCategories ul li").removeClass('show_item');
        $("#navLinks > a").removeClass('active');
        $('#bannerCategories  ul a').removeClass('active');
    });


    $('#navLinks > a').on('click', function (e) {

        var menuItemID = $(this).data('menu-id');
        if(!$(this).attr('href')) {
            e.preventDefault();
        }

        if($(this).hasClass('active')){
            $('#bannerCategories ul li').removeClass('show_item');
            $('#bannerCategories').find("[data-menu-id='" + menuItemID + "']").removeClass('show_item');
            $(this).removeClass('active');
        } else {
            $('#navLinks > a').removeClass('active');
            $('#bannerCategories ul li').removeClass('show_item');
            $('#bannerCategories').find("[data-menu-id='" + menuItemID + "']").addClass('show_item');
            $(this).addClass('active');
        }

        e.stopPropagation();

    });




    ////END////////////////////////

    /// Mobile nav button ////////////////
    $("#categoriesButtonMobile").on("click", function (e) {
        $("#bannerCategories").slideToggle();
        $("#bannerCategories").toggleClass("active");
    });
    $('#bannerCategories > ul  li > a').on('click', function (e) {
        $('#bannerCategories > ul  li > a').removeClass('active');
        $(this).addClass('active');

        if($(this).parent().hasClass('show_item')){
            $('#bannerCategories > ul  li').removeClass('show_item');
        } else {
            $('#bannerCategories > ul  li').removeClass('show_item');
            $(this).parent().addClass('show_item');
        }

    });
    ////END////////////////////////

    /// Search button ////////////////
    $('#searchDesktop').on('click', function (e) {
        $('#bannerContent').toggleClass('show_search');
        e.stopPropagation();
    });


});




