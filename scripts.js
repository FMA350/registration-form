var error_displayed_flag = false;
var email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var phone_regex = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/

$(document).ready(function() {
  $('input').bind("focus", function(){
      $('input').removeClass('required');
    $('.error').remove();
    error_displayed_flag = false;
  });
});

function showSignUp(){
    $("#menu-button-sign-up").addClass('menu-button-active').removeClass('menu-button');
    $("#menu-button-sign-in").addClass('menu-button').removeClass('menu-button-active');
    $( "#signUp1" ).css( "display", "block" );

    $( "#signUp2" ).css( "display", "none" );
    $( "#signIn" ).css( "display", "none" );
}

function validation1(){
    if($('#firstName').val().length < 1){
        if(!error_displayed_flag){
            $('#firstName').addClass('required');
            $('#firstName').before('<span class="error">This field is required</span>');
            error_displayed_flag = true;
        }
        return;
    }
    else if ($('#lastName').val().length < 1) {
        if(!error_displayed_flag){
            $('#lastName').addClass('required');
            $('#lastName').before('<span class="error">This field is required</span>');
            error_displayed_flag = true;
        }
        return;
    }
    else if (!email_regex.test($('#email').val())) {
        if(!error_displayed_flag){
            $('#email').addClass('required');
            $('#email').before('<span class="error">This field is required</span>');
            error_displayed_flag = true;
        }
        return;
    }
    else if(isNaN((Date.parse($('#dateOfBirth').val())))){
        if(!error_displayed_flag){
        $('#dateOfBirth').addClass('required');
        $('#dateOfBirth').before('<span class="error">This field is required</span>');
        error_displayed_flag = true;
        }
        return;
    }
    return true;
}

function validation2(){
    if($('#address').val().length < 1){
        if(!error_displayed_flag){
            $('#address').addClass('required');
            $('#address').before('<span class="error">This field is required</span>');
            error_displayed_flag = true;
        }
        return;
    }
    else if($('#postcode').val().length < 1){
        if(!error_displayed_flag){
            $('#postcode').addClass('required');
            $('#postcode').before('<span class="error">This field is required</span>');
            error_displayed_flag = true;
        }
        return;
    }
    else if(!phone_regex.test($('#phoneNumber').val())){
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
    if(validation2()){
        var data = {
            firstName   : $('#firstName').val(),
            lastName    : $('#lastName').val(),
            dateOfBirth : Date.parse($('#dateOfBirth').val()),
            email       : $('#email').val(),
            address     : $('#address').val(),
            postcode    : $('#postcode').val(),
            phoneNumber : $('#phoneNumber').val()
        };
        console.log(data);
        localStorage.setItem("SignUpData", JSON.stringify(data));
    }
}

function nextSignUp() {
  if(validation1()){
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
