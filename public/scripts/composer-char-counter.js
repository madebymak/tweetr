$( document ).ready(function() {
 console.log("load ok!");

 $(".textBox").keyup(function (x) {
  var charMax =140;
  var length = $(this).val().length;
  var length = charMax - length;
  $(".counter").text(length)
    if(length < 0){
      $(".counter").text(length).css("color", "red");
    }
  });
});


