$(document).ready(function() {
  var eventOptions = $(".event-options");
  var holidayOptions = $("#holidays");
  var specialOccasionOptions = $("#special");
  var createEventBtn =  $(".create-event-btn");

  var selected;
  var eventName;

  $("#event-date").flatpickr({
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
    minDate: "today"
});

  eventOptions.on("input", function(event) {
    selected = event.target.value;

    if (selected === "anniversary") {
      $("#list-of-holidays").addClass("hide");
      $("#list-of-occasions").addClass("hide");

    } else if (selected === "special-occasion") {
      $("#list-of-holidays").addClass("hide");
      $("#list-of-occasions").removeClass("hide");

    } else if (selected === "annual-holdiay") {
      $("#list-of-occasions").addClass("hide");
      $("#list-of-holidays").removeClass("hide");
    }

  });

  holidayOptions.on("input", function(event) {
    eventName = event.target.value;
  });

  specialOccasionOptions.on("input", function(event) {
    eventName = event.target.value;
  });


  $(".create-event-btn").on("click", function(event) {
    event.preventDefault();

    var profileID = createEventBtn.attr("data-id");
    var eventDate = $("#event-date").val();

    if (!eventDate && !specialOccasionOptions.val()) {
      $(".alert").removeClass("hide");
      $(".alert").text("Please enter a special occasion type & event date.");
      window.scrollTo(0, 0);
      return;
    }

    if (!specialOccasionOptions.val()) {
      $(".alert").removeClass("hide");
      $(".alert").text("Please select a special occasion type.");
      window.scrollTo(0, 0);
      return;
    }

    if (!eventDate) {
      $(".alert").removeClass("hide");
      $(".alert").text("Please enter the event date.");
      window.scrollTo(0, 0);
      return;
    }

    $.post("/api/newevent/" + profileID, {
      type: selected,
      name: eventName,
      start_date: eventDate
    }).then(function(res) {
      window.location.replace("/view/" + res);
    });
   
  });

  $(".viewdash").on("click", function(event) {
    var user = JSON.parse(localStorage.getItem("user"));
    window.location.replace("/dashboard/" + user.id);
  })

});