if (typeof $.fn.flowtype !== 'undefined') {
    $('.flowTypeMobileHeader').flowtype({
        fontRatio : 20,
        minFont : 22,
        maxFont : 36
    });
}

$(document).ready(function () {
    $("#emailsignupbtn").click(function(){
        $("#signupPrompt").fadeOut(500,function(){
            $("#actualForm, #desktopArrow").fadeIn();
        });
    });

    $("#fblink").click(function () {
        if ($("#termsCheckbox").prop("checked") == false) {
            alert("Please accept our Privacy Policy and Terms!");
            return false;
        }

        return true;
    });

    var intervalID = null;
    function checkTnc() {
        if ($("#termsCheckbox").prop("checked") == false) {
            alert("Please accept our Privacy Policy and Terms!");
            return false;
        }

        return true;
    }

    var dots = 0;

    function doDots() {
        if (dots < 3) {
            $("#signupDots").append('.');
            dots++;
        }
        else {
            $("#signupDots").html('');
            dots = 0;
        }
    }

    $("#form").validate({
        submitHandler: function (form) {
            if (!checkTnc()) {
                return false;
            }

            $("#title").removeAttr("disabled");
            if (!$("#title").val()) {
                $("#titleHolder").css({"background": "#FFC200"});
                alert("Please supply a Title!");
                return false;
            }

            if (!$("#firstName").val()) {
                alert("Please supply a First Name!");
                return false;
            }

            if (!$("#lastName").val()) {
                alert("Please supply a Last Name!");
                return false;
            }

            if (!$("#email").val()) {
                alert("Please supply an Email!");
                return false;
            }

            $.ajax({
                data: {
                    email: $("#email").val()
                },
                type: "POST",
                url: "/products/checkEmail",
                beforeSend: function () {
                    $("#signupText").text("PLEASE WAIT");
                    intervalID = setInterval(doDots, 500);
                    $("#signupFormBtn").attr("disabled", true);
                },
                success: function (ret) {
                    //console.log(ret);
                    $("#signupFormBtn").attr("disabled", false);
                    if (ret == "invalid") {
                        $("#signupText").text("SIGN UP");
                        clearInterval(intervalID);
                        $("#signupDots").html('');
                        $("#email").parent().removeClass("getStarted");
                        $("#userConf4").hide();
                        alert("Please supply a valid Email!");
                    }else{
                        form.submit();
                    }
                }
            });

            return false;
        }
    });
});

if ($("#articleFormHolder").length === 0) {
    $("#form #title").change(function () {
        $("#titleHolder").css({"background": "#01991a"});
        $("#getStartedText").hide();
        $("#userConf1").show();
    });

    $("#form #firstName").blur(function () {
        if ($(this).val()) {
            $(this).parent().addClass("getStarted");
            $("#userConf2").show();
        }
    });

    $("#form #lastName").blur(function () {
        if ($(this).val()) {
            $(this).parent().addClass("getStarted");
            $("#userConf3").show();
        }
    });

    $("#form #email").blur(function () {
        if ($(this).val()) {
            $(this).parent().addClass("getStarted");
            $("#userConf4").show();
        }
    });
}


/**
 * Layout 3 product sign up
 * @type {boolean}
 */
var $layout3Form = $('#formLayout3');

// link the tandc buttons
var $pageTc = $('#pageTc'),
    $formTc = $('#formTc'),
    $pagePhoneTc = $('#pagePhoneTc'),
    $formPhoneTc = $('#formPhoneTc');

$pageTc.on('click', function() {
    if( this.checked ) {
        $formTc.val(1);
    } else {
        $formTc.val(0);
    }
});
$pagePhoneTc.on('click', function() {
    if( this.checked ) {
        $formPhoneTc.val(1);
    } else {
        $formPhoneTc.val(0);
    }
});


var layout3FormObj = {
    errors: [],
    $form: $('#formLayout3'),
    $formValidatingSpin: $('.formValidatingSpin'),
    init: function() {
        //console.log('init')
        this.readyListners();
    },
    readyListners: function() {
        var self = this;
        // off listners, on listners
        $("#title, #firstName, #lastName, #email").on('blur', function (e) {
            e.stopImmediatePropagation();
            if( $(this).val() ) {
                self.displaySuccess('<i class="fa fa-check" aria-hidden="true"></i>', $(this))
            } else {
                var displayName = $(this).data('name'),
                    message = 'Your '+displayName+' is required';

                if( typeof displayName === 'undefined' ) {
                    message = 'This is a required field';
                }

                self.displayError(message, $(this));
            }
        });
        $('#submitLayout3Form').on('click', function(e) {
            e.preventDefault();
            self.checkEmail();
        });
    },
    displaySuccess: function( message, $target ) {
        var $holder = $target.closest('.holder');
        $holder.find('.errorTarget').html('');
        $holder.find('.successTarget').html(message);
    },
    displayError: function( message, $target ) {
        var $holder = $target.closest('.holder');
        $holder.find('.successTarget').html('');
        $holder.find('.errorTarget').html(message);
    },
    validateAll: function() {
        var valid = true,
            self = this;
        $('.formInput').each( function() {
            if( ! $(this).val() ) {
                var displayName = $(this).data('name'),
                    message = 'Your '+displayName+' is required';

                if( typeof displayName === 'undefined' ) {
                    message = 'This is a required field';
                }

                self.displayError(message, $(this));
                valid = false;
            }
        });
        if( $('#formTc').val() == 1 ) {
            self.displayError( '', $('#formTc') );
        } else {
            self.displayError( 'Please accept our Privacy Policy and Terms!', $('#formTc') );
            valid = false;
        }
        return valid;
    },
    checkEmail: function() {
        if( ! this.validateAll() ) {
            return;
        }
        var self = this;
        $.ajax({
            data: {
                email: $("#email").val()
            },
            type: "POST",
            url: "/products/checkEmail",
            beforeSend: function () {
                $('#submitLayout3Form').prop('disabled', true);
                self.$formValidatingSpin.show().addClass('fa-spin');
            },
            success: function (ret) {
                ret = ret.trim();
                $('#submitLayout3Form').prop('disabled', false);
                self.$formValidatingSpin.hide().removeClass('fa-spin');
                if ("invalid" === ret) {
                    self.displayError('Please supply a valid Email!', $('#email'));
                    self.$formValidatingSpin.hide().removeClass('fa-spin');
                } else {
                    self.$form.submit();
                }
            }
        });
    },
    submitForm: function() {

    }
};

layout3FormObj.init();

var signupWindow = {
    $menu: $('.menu'),
    $closeSignup: $('.closeSignup'),
    showForm: function() {
        //console.log(this);
        this.$menu.fadeIn(250);
        this.readyClose();
    },
    readyClose: function() {
        var self = this;
        this.$closeSignup.off('click');
        this.$closeSignup.on('click', function() {
            self.closeForm();
        });
    },
    closeForm: function() {
        this.$menu.fadeOut(250);
    }
};

var $signMeUpBtn =  $('.signMeUp'),
    $signMeUpBtnScroll = $('.signMeUpScroll'),
    $tcError = $('#tcError'),
    signUpError = {
        showError: function() {
            $tcError.closest('.checkbox').find('.mainTc').addClass('tc-warning');
            $tcError.fadeOut().fadeIn();
        },
        hideError: function() {
            $tcError.closest('.checkbox').find('.mainTc').removeClass('tc-warning');
            $tcError.hide();
        }
    };

$signMeUpBtn.on("click", function() {
    if( signupWindow.$menu.is('visible') ) {
        return;
    }
    if( $pageTc.is(':checked') ) {
        signUpError.hideError();
        signupWindow.showForm();
    } else {
        signUpError.showError();
        $("html, body").animate({
            scrollTop: $(".panel-1 .checkbox").offset().top - 100
        },"slow");
        return false;
    }
});

$signMeUpBtnScroll.on('click', function() {
    if( signupWindow.$menu.is('visible') ) {
        return;
    }
    if( $pageTc.is(':checked') ) {
        signUpError.hideError();
        $signMeUpBtn.fadeOut().fadeIn().fadeOut().fadeIn();
        $("html, body").animate({
            scrollTop: $(".panel-1 .checkbox").offset().top - 100
        },"slow", function() {
            $signMeUpBtn.focus();
        });
    } else {
        signUpError.showError();
        $("html, body").animate({
            scrollTop: $(".panel-1 .checkbox").offset().top - 100
        },"slow");
        return false;
    }
});


//layout1
var mobileMenuToggled = false;
$("#mobileMenu").click(function () {
    if (mobileMenuToggled) {
        $("#topBarContainer ul").slideUp();
        mobileMenuToggled = false;
    } else {
        $("#topBarContainer ul").slideDown();
        mobileMenuToggled = true;
    }
});

if( $('.foldParent').is(':visible') ) {
    $('.foldAway').hide();
}

// mobile accordion for no spam and faqs
$('.foldParent').on('click', function() {
    var $target = $(this).closest('.foldAway-container').find('.foldAway');
    if( $target.is(':visible') ) {
        //console.log('up')
        $target.slideUp('slow');
    } else {
       // console.log('down')
        $target.slideDown('slow');
    }
});

/**
 * Function changed because of too many popups for user
 * and confusion for users
 * task: [3148]
 */

/**
$('#email').on('blur', function() {

     $(this).mailcheck({

        suggested: function(element, suggestion) {
            if(confirm("Did you mean " + suggestion.full + "?")){
                $("#email").val(suggestion.full);
            }
        },
        empty: function(element) {
            // callback code
        }
    });

});
*/

$(".vidPoss").fitVids();

