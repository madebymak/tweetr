$( document ).ready(function() {

  $(".text-box").keyup(function (x) {
    var charMax = 140;
    var length = $(this).val().length;
    var length = charMax - length;

    if (length <= 140){
      $(".counter").text(length).css("color", "black");
      $('.tweet').prop('disabled', false);
    }

    if (length < 0){
      $( ".counter" ).text(length).css("color", "red").text("Too many!");
      $('.tweet').attr('disabled', true);
    }
  });
});
