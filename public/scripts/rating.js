$(document).ready(function(){
    $("#yes-button").click(clickYes);
    $("#no-button").click(clickNo);
    $('#yes-submit').click(submitYesReview);
    $('#no-submit').click(submitNoReview);
})

function clickYes(){
    $("#yes-option").show();
    $("#no-option").hide();

}

function clickNo(){
    $("#no-option").show();
    $("#yes-option").hide();
}

function submitYesReview(){
    $(location).attr('href','home.html');

}

function submitNoReview(){
    $(location).attr('href','home.html');

}
