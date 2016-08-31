// time-picker
$("#id_start_time, #id_end_time").datetimepicker({
  changeYear: true,
  changeMonth: true,
  oneLine: true,
  dateFormat: "yy-mm-dd",
  timeFormat: "HH:mm",
});

$(document).ready(function(){
    // data-input-type为DateTime的输入框初始化datetimepicker
    $('input[data-input-type="DateTime"]').datetimepicker({
        changeYear: true,
        changeMonth: true,
        dateFormat: "yy-mm-dd",
        timeFormat: "HH:mm:ss",
        oneLine: true,
    });

    // data-input-type为DateTimeRange的范围输入框初始化datetimepicker
    var rangeIdPrefixSet = {};  // 当成Set来用
    var $dateTimeRangeElems = $('input[data-input-type="DateTimeRange"]');

    $.each($dateTimeRangeElems, function(i, elem){
        var idPrefix = elem.id.replace(/\d+$/, "");
        rangeIdPrefixSet[idPrefix] = null;
    });

    $.each(rangeIdPrefixSet, function(idPrefix, val){
        var $lower = $("#" + idPrefix + "0");
        var $upper = $("#" + idPrefix + "1");
        var timepickerAttrs = {
            changeYear: true,
            changeMonth: true,
            dateFormat: "yy-mm-dd",
            timeFormat: "HH:mm:ss",
            oneLine: true,
        }
        if($lower.data("minInterval")){
            timepickerAttrs["minInterval"] = $lower.data("minInterval") * 1000;
        }
        if($lower.data("maxInterval")){
            timepickerAttrs["maxInterval"] = $lower.data("maxInterval") * 1000;
        }
        $.timepicker.datetimeRange(
            $lower,
            $upper,
            timepickerAttrs
        );
    });
});

// select2
$('select').not('[data-spec="no-select2"]').select2();

// https://docs.djangoproject.com/en/1.8/ref/csrf/#ajax
// Django AJAX CSRF
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});
