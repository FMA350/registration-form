// const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const ALERT_TITLE = "Oops!";
// const ALERT_BUTTON_TEXT = "Ok";
const email_regex = /^.+@\w+\.\w{2,3}$/;
const phone_regex = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/

let errorDisplayedFlags = {
    firstName   : false,
    lastName    : false,
    email       : false,
    dateOfBirth : false,
    gender      : false,
    phoneNumber : false,
    password1    : false,
    password2    : false,

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
            case "#gender":
                return this.gender;
            case "#phoneNumber":
                return this.phoneNumber;

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
                break;
            case '#password1':
                this.password1 = bool;
                break;
            case '#password2':
                this.password2 = bool;
                break;
            default:
        }
    },
    checkFirstFormFlags:function(){
        return !(this.firstName || this.lastName || this.email || this.dateOfBirth);
    },

    checkSecondFormFlags: function(){
        return !(this.gender || this.phoneNumber || this.password1 || this.password2);
    }
};

function dateFromToday(modifier){
    let today = new Date();
    let month = today.getMonth()
    let day  = today.getDate();
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

$(document).ready(function(){
    //set date picker min and max date 100 and 18 years from today
    $('#dateOfBirth').attr('max', getMaxDate());
    $('#dateOfBirth').attr('min', getMinDate());

    // add triggers on the input fields
    $('input').on("focus",  function(){
    //   put in the name variable the input element id that triggered the function
        let name = '#' + event.target.id;
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
    if($( "#signUp1" ).css( "display")== 'block'){
        return;
    }
    $("#menu-button-sign-up").addClass('menu-button-active').removeClass('menu-button');
    $("#menu-button-sign-in").addClass('menu-button').removeClass('menu-button-active');

    $( "#signUp1" ).css( "display", "block" );
    $("#signUp1").addClass('animatedIn');
    $("#signUp2").addClass('animatedOut');
    $("#signIn").addClass('animatedOut');

    setTimeout(function() {
      $("#signUp1").removeClass('animatedIn');
      $("#signUp2").removeClass('animatedOut');
      $("#signIn").removeClass('animatedOut');
      $( "#signUp2" ).css( "display", "none" );
      $( "#signIn" ).css( "display", "none" );
    }, 1500);
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
        if($('#phoneNumber').val().length < 1){
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
    if(!errorDisplayedFlags.password1){
        if($('#password1').val().length < 1){
            $('#password1').addClass('required');
            $('#password1').before('<span class="error "id="password1Error">This field is required</span>');
            errorDisplayedFlags.password1 = true;
        }
    }
    if(!errorDisplayedFlags.password2){
        if($('#password2').val().length < 1){
            $('#password2').addClass('required');
            $('#password2').before('<span class="error "id="password2Error">This field is required</span>');
            errorDisplayedFlags.password2 = true;
        }
    }
    if(!(errorDisplayedFlags.password2 || errorDisplayedFlags.password1))
        if($('#password2').val() != $('#password1').val()){
            // fields are filled, but passwords do not match
            $('#password2').addClass('required');
            $('#password2').before('<span class="error "id="password2Error">The passwords do not match!</span>');
            errorDisplayedFlags.password2 = true;
        }
    return errorDisplayedFlags.checkSecondFormFlags();
}

function finalSignUp(){
    if(signUpFormValidation2()){
        let data = {
            firstName   : $('#firstName').val().trim(),
            lastName    : $('#lastName').val().trim(),
            dateOfBirth : $('#dateOfBirth').val(),
            email       : $('#email').val().trim(),
            gender      : $("input[name='genders']:checked").val(),
            phoneNumber : $('#phoneNumber').val(),
            password    : sha3_384($('#password1').val()),
        };

        localStorage.setItem($('#email').val().trim(), JSON.stringify(data));

        $("#firstName").val("");
        $("#lastName").val("");
        $("#email").val("");
        $('#dateOfBirth').val("");
        $('#phoneNumber').val("");
        $("input[name='genders']:checked").prop('checked', false);
        $('#password1').val("");
        $('#password2').val("");

        let savedData = localStorage.getItem('signUpData');
        savedData = JSON.parse(savedData);

        // $("#firstName").val(savedData.firstName);
        // $("#lastName").val(savedData.lastName);
        // $("#email").val(savedData.email);
        // $('#dateOfBirth').val(savedData.dateOfBirth);
        // $('#phoneNumber').val(savedData.phoneNumber);
    }
}

function nextSignUp() {
  if(signUpFormValidation1()){
    $( "#signUp2" ).css( "display", "block" );

    $("#signUp2").addClass('animatedIn');
    $("#signUp1").addClass('animatedOut');
    setTimeout(function() {
      $("#signUp2").removeClass('animatedIn');
      $("#signUp1").removeClass('animatedOut');
      $( "#signUp1" ).css( "display", "none" );
    }, 1500);
  }
}

function previousSignUp(){
  $( "#signUp1" ).css( "display", "block" );
  $("#signUp1").addClass('animatedIn');
  $("#signUp2").addClass('animatedOut');
  setTimeout(function() {
    $("#signUp1").removeClass('animatedIn');
    $("#signUp2").removeClass('animatedOut');
    $( "#signUp2" ).css( "display", "none" );
  }, 1500);
}

function showSignIn(){
    if($( "#signIn" ).css( "display") == 'block'){
        return;
    }

    $("#menu-button-sign-up").addClass('menu-button').removeClass('menu-button-active');
    $("#menu-button-sign-in").addClass('menu-button-active').removeClass('menu-button');

    $("#signIn" ).css( "display", "block" );
    $("#signIn").addClass('animatedIn');
    $("#signUp2").addClass('animatedOut');
    $("#signUp1").addClass('animatedOut');

    setTimeout(function() {
      $("#signIn").removeClass('animatedIn');
      $( "#signUp1" ).css( "display", "none" );
      $( "#signUp2" ).css( "display", "none" );
      $("#signUp1").removeClass('animatedOut');
      $("#signUp2").removeClass('animatedOut');
    }, 1500);
}

function signIn(){
    let email = $('#signInEmail').val();
    let savedData = JSON.parse(localStorage.getItem(email));
    if(savedData == undefined){
        //TODO: show error
        return;
    }
    if(savedData.password != sha3_384($('#signInPassword').val())){
        //TODO:  print error
        return;
    }

    console.log(`${savedData.firstName} has logged in`);
    alert("User has logged in");
    // user has logged in!

}

function createCustomAlert(txt) {
	d = document;

	if(d.getElementById("modalContainer")) return;

	mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
	mObj.id = "modalContainer";
	mObj.style.height = d.documentElement.scrollHeight + "px";

	alertObj = mObj.appendChild(d.createElement("div"));
	alertObj.id = "alertBox";
	if(d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
	alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";
	alertObj.style.visiblity="visible";

	h1 = alertObj.appendChild(d.createElement("h1"));
	h1.appendChild(d.createTextNode(ALERT_TITLE));

	msg = alertObj.appendChild(d.createElement("p"));
	msg.innerHTML = txt;

	btn = alertObj.appendChild(d.createElement("a"));
	btn.id = "closeBtn";
	btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
	btn.href = "#";
	btn.focus();
	btn.onclick = function() { removeCustomAlert();return false; }

	alertObj.style.display = "block";

}

function removeCustomAlert() {
	document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}
