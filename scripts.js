var errorDisplayedFlags = {};

const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phone_regex = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/

$(document).ready(function() {

    // errorDisplayedFlags init
    errorDisplayedFlags.firstName = false;
    errorDisplayedFlags.lastName  = false;
    errorDisplayedFlags.email     = false;


  $('input').on("focus",  function(){
      var name = '#'+event.target.id;
      $(name).removeClass('required');
      name += 'Error';
      $(name).remove();
      errorDisplayedFlags.getAttribute(name) = false;
  });
});

function showSignUp(){
    $("#menu-button-sign-up").addClass('menu-button-active').removeClass('menu-button');
    $("#menu-button-sign-in").addClass('menu-button').removeClass('menu-button-active');
    $( "#signUp1" ).css( "display", "block" );

    $( "#signUp2" ).css( "display", "none" );
    $( "#signIn" ).css( "display", "none" );
}

function signUpFormValidation1(){
    if($('#firstName').val().length < 1){
        if(!error_displayed_flag.name){
            $('#firstName').addClass('required');
            $('#firstName').before('<span id="firstNameError" class="error">This field is required</span>');
            errorDisplayedFlags.firstName = true;
        }
    }
    if ($('#lastName').val().length < 1) {
        if(!error_displayed_flag.lastName){
            $('#lastName').addClass('required');
            $('#lastName').before('<span id="lastNameError" class="error">This field is required</span>');
            error_displayed_flag = true;
        }
    }
    if (!email_regex.test($('#email').val())) {
        if(!error_displayed_flag.email){
            $('#email').addClass('required');
            $('#email').before('<span class="error">This field is required</span>');
            error_displayed_flag = true;
        }
        return;
    }
    if(isNaN((Date.parse($('#dateOfBirth').val())))){
        if(!error_displayed_flag.dateOfBirth){
        $('#dateOfBirth').addClass('required');
        $('#dateOfBirth').before('<span class="error">This field is required</span>');
        error_displayed_flag = true;
        }
        return;
    }
    return true;
}

function signUpFormValidation2(){
    if($('#address').val().length < 1){
        if(!error_displayed_flag){
            $('#address').addClass('required');
            $('#address').before('<span class="error">This field is required</span>');
            error_displayed_flag = true;
        }
        return;
    }
    if($('#postcode').val().length < 1){
        if(!error_displayed_flag){
            $('#postcode').addClass('required');
            $('#postcode').before('<span class="error">This field is required</span>');
            error_displayed_flag = true;
        }
        return;
    }
    if(!phone_regex.test($('#phoneNumber').val())){
        if(!error_displayed_flag){
            $('#phoneNumber').addClass('required');
            $('#phoneNumber').before('<span class="error">This field is required</span>');
            error_displayed_flag = true;
        }
        return;
    }
    return true;
}

function finalSignUp(){
    if(signUpFormValidation2()){
        var data = {
            firstName   : $('#firstName').val(),
            lastName    : $('#lastName').val(),
            dateOfBirth : $('#dateOfBirth').val(),
            email       : $('#email').val(),
            address     : $('#address').val(),
            postcode    : $('#postcode').val(),
            phoneNumber : $('#phoneNumber').val()
        };
        localStorage.setItem("signUpData", JSON.stringify(data));

        $("#firstName").val("");
        $("#lastName").val("");
        $("#email").val("");
        $('#dateOfBirth').val("");
        $('#address').val("");
        $('#postcode').val("");
        $('#phoneNumber').val("");

        var savedData = localStorage.getItem('signUpData');
        savedData = JSON.parse(savedData);

        $("#firstName").val(savedData.firstName);
        $("#lastName").val(savedData.lastName);
        $("#email").val(savedData.email);
        $('#dateOfBirth').val(savedData.dateOfBirth);
        $('#address').val(savedData.address);
        $('#postcode').val(savedData.postcode);
        $('#phoneNumber').val(savedData.phoneNumber);
    }
}

function nextSignUp() {
  if(signUpFormValidation1()){
    $( "#signUp2" ).css( "display", "block" );
    $( "#signUp1" ).css( "display", "none" );
  }
}

function previousSignUp(){
  $( "#signUp2" ).css( "display", "none" );
  $( "#signUp1" ).css( "display", "block" );
}

function showSignIn(){
    $("#menu-button-sign-up").addClass('menu-button').removeClass('menu-button-active');
    $("#menu-button-sign-in").addClass('menu-button-active').removeClass('menu-button');
    $( "#signIn" ).css( "display", "block" );
    $( "#signUp1" ).css( "display", "none" );
    $( "#signUp2" ).css( "display", "none" );
}
