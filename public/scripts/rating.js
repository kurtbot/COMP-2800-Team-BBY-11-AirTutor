$(document).ready(function(){
    $("#yes-button").click(clickYes);
    $("#no-button").click(clickNo);
    $('#yes-submit').click(submitYesReview);
    $('#no-submit').click(submitNoReview);
})
/**
 * Shows the Yes menu on button click
 */
function clickYes(){
    $("#yes-option").show();
    $("#no-option").hide();

}
/**
 * Shows the No menu on button click
 */
function clickNo(){
    $("#no-option").show();
    $("#yes-option").hide();
}
/**
 * Takes the user home on Yes Submit
 */
function submitYesReview(){
    $(location).attr('href','home.html');

}
/**
 * Takes the user home on No Submit
 */
function submitNoReview(){
    $(location).attr('href','home.html');

}


function reviewSubmit() {
    let professional = document.getElementById("pro");
    let teaching = document.getElementById("teaching-qual");

    let reviewedAccount = db.collection("users/").doc(user.uid);

    reviewedAccount.collection("review").add({
        professionalism: parseInt(professional),
        teachingquality: parseInt(teaching)
    })

}