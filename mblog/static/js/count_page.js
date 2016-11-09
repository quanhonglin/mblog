$(document).ready(function() {
    $.ajax({
        type: "get",
        async: false,
        url: "http://blog.v562.com/",
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "flightHandler",
        success: function(json) {
            console.log('success');
        },
        error: function() {
            console.log('error');
        }
    });
});
