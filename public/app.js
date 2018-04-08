

// $(document).on("click", "#save-comment", function() {

//   console.log("working until here")
//   // Grab the id associated with the article from the submit button
//   var thisId = $(this).attr("data-id");
//   var time = moment().format("YYYY-MM-DD HH:MM:SS");
//   console.log(time)

//   $.ajax({
//     method: "POST",
//     url: "/articles/" + thisId, 
//     data: {
//       body: $("#comment-input").val(),
//       created_time: time
//     }
//   })
//     // With that done
//     .done(function(data) {
//       // Log the response
//       console.log(data);
//       // Empty the notes section
//       // $("#notes").empty();
//     });

//   // Also, remove the values entered in the input and textarea for note entry
//   $("#comment-input").val("");

// });

