$(document).ready(function() {
  $("#basicDate").flatpickr({
    enableTime: true,
    dateFormat: "F, d Y H:i"
  });

  $("#new-event-link").on("click", function(event) {
    event.preventDefault();
    var profileID = $(event.target).attr("data-id")
    console.log("test")
    
    $.get("/newevent/" + profileID).then(function(res) {
      console.log("test")
      window.location.replace("/newevent/" + profileID)
    })
  });

});