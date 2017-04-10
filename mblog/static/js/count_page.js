$(document).ready(function() {
    $.ajax({
        type: "get",
        async: false,
        url: "http://192.168.12.31:8888/",
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
