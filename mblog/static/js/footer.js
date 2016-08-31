$(document).ready(function() {
  var a = $("#footer").position();
  console.log(a);
  var height = $(document).height() * 0.57;
  $("#section").css("min-height", height);
  $(window).resize(function(){
    var height = $(document).height() * 0.57;
    $("#section").css("min-height", height);
  });
});
