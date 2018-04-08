
$(document).ready(function() {
  $("#saveComment").click(function() {
    console.log("working until here")
      let body = $("#comment").val().trim();
      let articleId = $("#article-id").data("id");
      let time = moment().format("YYYY-MM-DD HH:MM:SS");

      if (!comment) {
        location.reload();
      } else {
        $.ajax({
          url: "/articles/:id" + articleId,
          method: "PUT",
          data: {
           comment: body,
           created_time: time
          },
        });
      }
      // location.reload("/articles");
  })

});

