$(document).ready(function() {
  // Capture the user input from create profile form
  var profileForm = $("form.profile");
  var firstName = $("input.first-name");
  var lastName = $("input.last-name");
  var relationship = $("#relationship");
  var birthday = $("#birthday");
  var address = $("#inputAddress");
  var address2 = $("#inputAddress2");
  var city = $("#inputCity");
  var state = $("#inputState");
  var zip = $("#inputZip")

  // Create a function for flatpickr
  $("#birthday").flatpickr({
    altInput: true,
    altFormat: "F d",
    dateFormat: "m-d"
  });
 
  // On submit, send the user input to the /api/newprofile route using a POST method
  profileForm.on("submit", function(event) {
    event.preventDefault();

    // Capture the user input and trim off any white space
    var profileData = {
      first_name: firstName.val(),
      last_name: lastName.val(),
      relationship: relationship.val(),
      birthday: birthday.val(),
      address: address.val(),
      address_2: address2.val(),
      city: city.val(),
      state: state.val(),
      zip: zip.val()
    };
    console.log(profileData)

    // Call the function we created below that initiates a POST method to the db
      createNewProfile(profileData.first_name, profileData.last_name, profileData.relationship, profileData.birthday, profileData.address, profileData.address_2, profileData.city, profileData.state, profileData.zip);
  });

  // Create a function to hold the data we will send a POST request
  function createNewProfile(first_name, last_name, relationship, birthday, address, address_2, city, state, zip) {
    $.post("/api/newprofile", {
      first_name: first_name,
      last_name: last_name,
      relationship: relationship,
      birthday: birthday,
      address: address,
      address_2: address_2,
      city: city,
      state: state,
      zip: zip
      
      // Redirect the user to their dashboard after they create a new profile
    }).then(function(res) {
      window.location.replace("/dashboard/" + res.id)
    })
  };
});