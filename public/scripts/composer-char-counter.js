$( document ).ready(function() {
 console.log("load ok!");

 $(".text-box").keyup(function (x) {
  var charMax = 140;
  var length = $(this).val().length;
  var length = charMax - length;


  $(".counter").text(length)
  // if no characters are entered
    if (length === null){
      $(".counter").text("Nothing entered.").text
    }

    if (length <= 140){
      $(".counter").text(length).css("color", "black").text;
    }

    if (length < 0){
      $(".counter").text(length).css("color", "red").text("Too many.");
    }

  });
});


