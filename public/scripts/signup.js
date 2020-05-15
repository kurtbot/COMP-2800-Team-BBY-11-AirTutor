$(document).ready(function () {
    $("#yes-button").click(clickYes);
    $("#no-button").click(clickNo);
})


function clickYes() {
    $('#student').show();
    $('#submit').show();
    $('#not-student').hide();
}

function clickNo() {
    $('#not-student').show();
    $('#submit').show();
    $('#student').hide();
}


