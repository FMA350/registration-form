//  add comments
//  create popup for login / signup
// fix current media queries and add new ones
// use single signup form




let time = 750;
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
    noErrors:function(){
        return !(this.firstName || this.lastName || this.email || this.dateOfBirth || this.gender || this.phoneNumber || this.password1 || this.password2);
    },
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
    if($( "#signUp1" ).css("display")=='block'){
        return;
    }
    $("#menu-button-sign-up").addClass('menu-button-active').removeClass('menu-button');
    $("#menu-button-sign-in").addClass('menu-button').removeClass('menu-button-active');

    $("#signUp2").addClass('animatedOut');
    $("#signIn").addClass('animatedOut');

    setTimeout(function() {
      $( "#signUp1" ).css( "display", "block" );
      $("#signUp1").addClass('animatedIn');

      $("#signUp2").removeClass('animatedOut');
      $("#signIn").removeClass('animatedOut');
      $( "#signUp2" ).css( "display", "none" );
      $( "#signIn" ).css( "display", "none" );
  }, time);
    setTimeout(function() {
        $("#signUp1").removeClass('animatedIn');
    }, time*2);
}

function signUpFormValidation(){
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



    return errorDisplayedFlags.noErrors();
}

function signUp(){
    if(signUpFormValidation()){
        let data = {
            firstName   : $('#firstName').val().trim(),
            lastName    : $('#lastName').val().trim(),
            dateOfBirth : $('#dateOfBirth').val(),
            email       : $('#email').val().trim(),
            gender      : $("input[name='genders']:checked").val(),
            phoneNumber : $('#phoneNumber').val(),
            password    : sha3_384($('#password1').val()),
            lastLogin   : new Date()
        };
        localStorage.setItem($('#email').val().trim(), JSON.stringify(data));
        // clearing fields
        $("#firstName").val("");
        $("#lastName").val("");
        $("#email").val("");
        $('#dateOfBirth').val("");
        $('#phoneNumber').val("");
        $("input[name='genders']:checked").prop('checked', false);
        $('#password1').val("");
        $('#password2').val("");

        let savedData = localStorage.getItem(data.email);
        savedData = JSON.parse(savedData);
        showSignUpPane(savedData);
    }
}

function showNextSignUp() {
    if(signUpFormValidation1()){
        $("#signUp2").addClass('animatedIn');
        $("#signUp1").addClass('animatedOut');
        setTimeout(function() {
          $("#signUp1").removeClass('animatedOut');
          $( "#signUp1" ).css( "display", "none" );
          $( "#signUp2" ).css( "display", "block" );
        }, time);
        setTimeout(function() {
            $("#signUp2").removeClass('animatedIn');
        }, time*2);
    }
    else{
        $('#backButton').addClass('buttonError');
        setTimeout(function(){
            $('#backButton').removeClass('buttonError');
        }, 1000);
    }
}

function showPreviousSignUp(){

    $("#signUp1").addClass('animatedIn');
    $("#signUp2").addClass('animatedOut');
    setTimeout(function() {
    $( "#signUp2" ).css( "display", "none" );
    $( "#signUp1" ).css( "display", "block" );
    $("#signUp2").removeClass('animatedOut');
    }, time);
  setTimeout(function() {
      $("#signUp1").removeClass('animatedIn');
  }, time*2);

}

function showSignIn(){
    // if sign in is already present, do nothing
    if($( "#signIn" ).css( "display") == 'block'){
        return;
    }
    // change button style
    $("#menu-button-sign-up").addClass('menu-button').removeClass('menu-button-active');
    $("#menu-button-sign-in").addClass('menu-button-active').removeClass('menu-button');
    // create animation for the signup forms

    $("#signUp2").addClass('animatedOut');
    $("#signUp1").addClass('animatedOut');

    setTimeout(function() {
        $( "#signUp1" ).css( "display", "none" );
        $( "#signUp2" ).css( "display", "none" );
        $("#signUp1").removeClass('animatedOut');
        $("#signUp2").removeClass('animatedOut');

        $("#signIn").addClass('animatedIn');
        $("#signIn" ).css( "display", "block" );
  }, time);
  setTimeout(function() {
        $("#signIn").removeClass('animatedIn');
  }, time*2);
}

function signIn(){
    let email = $('#signInEmail').val();
    let savedData = JSON.parse(localStorage.getItem(email));
    if(savedData == undefined){
        alert("Wrong username or password");
        return;
    }
    if(savedData.password != sha3_384($('#signInPassword').val())){
        alert("Wrong username or password");
        return;
    }
    showLoginPane(savedData);
    savedData.lastLogin = new Date();
}

function showSignUpPane(txt){
    // Create the signUp pane that will show when the user completes the signup
    let alertPane = "<div id='pane' class='pane'><h2>"+ txt.firstName +"has signed up!</h2><br><br><div>Signup information:</div><br><div>First Name: "+txt.firstName+"</div><br>\
    <div>Last Name: "+txt.lastName+"</div><br> <div>Email: "+txt.email+"</div><br> <div>Date of birth: "+txt.dateOfBirth+"</div><br>\
    <button class='button' onclick='closePane()'>Proceed to the portal</button></div>"
    $(".wrapper").append(alertPane);
}

function showLoginPane(txt) {
    let lastLogin = new Date(txt.lastLogin);
    // Creates a pane for the signin.
    let alertPane = "<div id='pane' class='pane'><h2>Welcome "+ txt.firstName +"<br><br><div>you last access was the "+lastLogin.getDay() +" - "+(lastLogin.getMonth() +1)+" - "+
    lastLogin.getFullYear()+" at "+lastLogin.getHours()+":"+lastLogin.getMinutes()+".</div></h2><button \
    class='button' onclick='closePane()'>Proceed to the portal</button></div>"
    $(".wrapper").append(alertPane);
}

function closePane(){
    $('#pane').remove();
}
