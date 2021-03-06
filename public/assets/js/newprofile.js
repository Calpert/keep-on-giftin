$(document).ready(function() {
  // Capture the user input from create profile form
  var profileForm = $("form.profile");
  var firstName = $("input.first-name");
  var lastName = $("input.last-name");
  var relationship = $("#relationship");
  var phoneNumber = $("#inputNum");
  var email = $("#inputEmail")
  var birthday = $("#birthday");
  var address = $("#inputAddress");
  var address2 = $("#inputAddress2");
  var city = $("#inputCity");
  var state = $("#inputState");
  var zip = $("#inputZip");

  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "5000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  // Determine if holidays are checked or unchecked
  $("#valentines_day").on("change", function(event) {
    var selected = $("#valentines_day");
    var currentState = selected.attr("data-id");
    if (currentState === "0") {
      selected.attr("data-id", "1")
    } else {
      selected.attr("data-id", "0")
    };
  });

  $("#hanukkah").on("change", function(event) {
    var selected = $("#hanukkah");
    var currentState = selected.attr("data-id");
    if (currentState === "0") {
      selected.attr("data-id", "1")
    } else {
      selected.attr("data-id", "0")
    };
  });

  $("#christmas").on("change", function(event) {
    var selected = $("#christmas");
    var currentState = selected.attr("data-id");
    if (currentState === "0") {
      selected.attr("data-id", "1")
    } else {
      selected.attr("data-id", "0")
    };
  });

  $("#mothers_day").on("change", function(event) {
    var selected = $("#mothers_day");
    var currentState = selected.attr("data-id");
    if (currentState === "0") {
      selected.attr("data-id", "1")
    } else {
      selected.attr("data-id", "0")
    };
  });

  $("#fathers_day").on("change", function(event) {
    var selected = $("#fathers_day");
    var currentState = selected.attr("data-id");
    if (currentState === "0") {
      selected.attr("data-id", "1")
    } else {
      selected.attr("data-id", "0")
    };
  });

  $("#halloween").on("change", function(event) {
    var selected = $("#halloween");
    var currentState = selected.attr("data-id");
    if (currentState === "0") {
      selected.attr("data-id", "1")
    } else {
      selected.attr("data-id", "0")
    };
  });

  // Create a function for flatpickr
  $("#birthday").flatpickr({
    altInput: true,
    altFormat: "F d",
    dateFormat: "m-d"
  });
 
  // On submit, send the user input to the /api/newprofile route using a POST method
  profileForm.on("submit", function(event) {
    event.preventDefault();
    
    // Validation to ensure good user data
    if (!firstName.val() || !lastName.val() || !relationship.val()) {
      $(".alert").removeClass("hide");
      $(".alert").text("Please complete all required fields.");
      window.scrollTo(0, 0);
      return;
    }

    if(email.val()) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email.val()).toLowerCase()) === false) {
          $(".alert").removeClass("hide");
          $(".alert").text("Please enter a valid email.");
          window.scrollTo(0, 0);
          return;
        }
    }

    if(phoneNumber.val()) {
        const re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
        if (re.test(String(phoneNumber.val()).toLowerCase()) === false) {
          $(".alert").removeClass("hide");
          $(".alert").text("Please enter a valid phone number.");
          window.scrollTo(0, 0);
          return;
        }
    }
    
    if(address.val() &&( !city.val() || !state.val() || !zip.val())) {
      $(".alert").removeClass("hide");
      $(".alert").text("Please enter street, city, state, & zip, if including an address.");
      window.scrollTo(0, 0);
      return;
    }

    // Capture the user input and trim off any white space
    var profileData = {
      first_name: firstName.val(),
      last_name: lastName.val(),
      relationship: relationship.val(),
      birthday: birthday.val(),
      phone_number:phoneNumber.val(),
      email: email.val(), 
      address: address.val(),
      address_other: address2.val(),
      city: city.val(),
      state: state.val(),
      zip: zip.val(),
      valentines_day: $("#valentines_day").attr("data-id"),
      hanukkah: $("#hanukkah").attr("data-id"),
      christmas: $("#christmas").attr("data-id"),
      mothers_day: $("#mothers_day").attr("data-id"),
      fathers_day: $("#fathers_day").attr("data-id"),
      halloween: $("#halloween").attr("data-id"),
    };

    // Send new profile to backend via post route
      $.post("/api/newprofile", {
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        relationship: profileData.relationship,
        birthday: profileData.birthday,
        phone_number: profileData.phone_number,
        email: profileData.email,
        address: profileData.address,
        address_other: profileData.address_other,
        city: profileData.city,
        state: profileData.state,
        zip: profileData.zip,
        valentines_day: profileData.valentines_day,
        hanukkah: profileData.hanukkah,
        christmas: profileData.christmas,
        mothers_day: profileData.mothers_day,
        fathers_day: profileData.fathers_day,
        halloween: profileData.fathers_day
       
        // Redirect the user to their dashboard after they create a new profile
      

      }).then(function(res) {
        toastr.success("You've added a new profile!", "YAY! ")
        window.location.replace("/dashboard/" + res.id)
        
      });
  });

  $(".viewdash").on("click", function(event) {
    var user = localStorage.getItem('user');
    window.location.replace("/dashboard/" + user.id);
  })

});