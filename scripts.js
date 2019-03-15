const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phone_regex = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/

var errorDisplayedFlags = {
    firstName   : false,
    lastName    : false,
    email       : false,
    dateOfBirth : false,
    phoneNumber : false,
    password    : false,

    getAttribute: function(name){
        switch (name) {
            case "#firstName":
                return this.firstName;
                break;
            case "#lastName":
                return this.lastName;
                break;
            case "#email":
                return this.email;
                break;
            case "#dateOfBirth":
                return this.dateOfBirth;
                break;
            default: return null;
        }
    },
    setAttribute: function(name, bool){
        switch (name) {
            case "#firstName":
                this.firstName = bool;
                break;
            case "#lastName":
                this.lastName = bool;
                break;
            case "#email":
                this.email = bool;
                break;
            case "#dateOfBirth":
                this.dateOfBirth = bool;
                break;
            case '#phoneNumber':
                this.phoneNumber = bool;
            default:
        }
    },
    checkFirstFormFlags: function(){
        return (this.firstName || this.lastName || this.email || this.dateOfBirth);
    },
    checkSecondFormFlags: function(){
        return !(this.phoneNumber || this.password);
    }
};

function dateFromToday(modifier){
    var today = new Date();
    var month = today.getMonth()
    var day  = today.getDate();
    if(month < 10){
        month = "0" + month;
    }
    if(day < 10){
        day = "0" + day;
    }
    return (today.getFullYear() - modifier)+'-' + month +'-'+ day;
}

function getMaxDate(){
    return dateFromToday(18);
}
function getMinDate(){
    return dateFromToday(100);
}

$(document).ready(function() {
    //set date picker min and max date 100 and 18 years from today
    $('#dateOfBirth').attr('max', getMaxDate());
    $('#dateOfBirth').attr('min', getMinDate());

// add triggers on the input fields
  $('input').on("focus",  function(){
    //   put in the name variable the input element id that triggered the function
        var name = '#' + event.target.id;
        $(name).removeClass('required');
        errorDisplayedFlags.setAttribute(name, false);
        name += 'Error';
        $(name).remove();
  });
  $('input[name=genders]').on("focus", function(){
      $('#genderWrapper').removeClass('required');
      errorDisplayedFlags.genders = false;
      $('#genderWrapperError').remove();
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
    if(!errorDisplayedFlags.firstName){
        if($('#firstName').val().trim().length < 1){
            $('#firstName').addClass('required');
            $('#firstName').before('<span id="firstNameError" class="error">This field is required</span>');
            errorDisplayedFlags.firstName = true;
        }
    }
    if(!errorDisplayedFlags.lastName){
        if ($('#lastName').val().trim().length < 1) {
            $('#lastName').addClass('required');
            $('#lastName').before('<span id="lastNameError" class="error">This field is required</span>');
            errorDisplayedFlags.lastName = true;
        }
    }
    if(!errorDisplayedFlags.email){
        if($('#email').val().trim().length < 1){
            $('#email').addClass('required');
            $('#email').before('<span id="emailError" class="error">This field is required</span>');
            errorDisplayedFlags.email = true;
        }
        else if (!email_regex.test($('#email').val())) {
            $('#email').addClass('required');
            $('#email').before('<span id="emailError" class="error">This is not a valid email address!</span>');
            errorDisplayedFlags.email = true;
        }
    }
    if(!errorDisplayedFlags.dateOfBirth){
        if(isNaN(Date.parse($('#dateOfBirth').val()))){
            $('#dateOfBirth').addClass('required');
            $('#dateOfBirth').before('<span id="dateOfBirthError" class="error">This field is required</span>');
            errorDisplayedFlags.dateOfBirth = true;
        }
        else if(Date.parse($('#dateOfBirth').val()) < Date.parse(getMinDate())|| Date.parse($('#dateOfBirth').val()) > Date.parse(getMaxDate())){
            $('#dateOfBirth').addClass('required');
            $('#dateOfBirth').before('<span id="dateOfBirthError" class="error">This date is invalid!</span>');
            errorDisplayedFlags.dateOfBirth = true;
        }
    }
    return errorDisplayedFlags.checkFirstFormFlags();
}

function signUpFormValidation2(){
    if(!errorDisplayedFlags.genders){
        if($('input[name=genders]:checked').val() == undefined){
            $('#genderWrapper').addClass('required');
            $('#genderWrapper').before('<span class="error" id="genderWrapperError">This field is required</span><br>');
            errorDisplayedFlags.genders = true;
        }
    }
    if(!errorDisplayedFlags.phoneNumber){
        if($('#phoneNumber').val() < 1){
            $('#phoneNumber').addClass('required');
            $('#phoneNumber').before('<span class="error "id="phoneNumberError">This field is required</span>');
            errorDisplayedFlags.phoneNumber = true;
        }
        else if(!phone_regex.test($('#phoneNumber').val())){
            $('#phoneNumber').addClass('required');
            $('#phoneNumber').before('<span class="error "id="phoneNumberError">Invalid number</span>');
            errorDisplayedFlags.phoneNumber = true;
        }
    }
    return errorDisplayedFlags.checkSecondFormFlags();
}

function finalSignUp(){
    if(signUpFormValidation2()){
        var data = {
            firstName   : $('#firstName').val().trim(),
            lastName    : $('#lastName').val().trim(),
            dateOfBirth : $('#dateOfBirth').val(),
            email       : $('#email').val().trim(),
            // TODO
            phoneNumber : $('#phoneNumber').val()
        };
        localStorage.setItem("signUpData", JSON.stringify(data));

        $("#firstName").val("");
        $("#lastName").val("");
        $("#email").val("");
        $('#dateOfBirth').val("");
        $('#phoneNumber').val("");

        var savedData = localStorage.getItem('signUpData');
        savedData = JSON.parse(savedData);

        $("#firstName").val(savedData.firstName);
        $("#lastName").val(savedData.lastName);
        $("#email").val(savedData.email);
        $('#dateOfBirth').val(savedData.dateOfBirth);

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
