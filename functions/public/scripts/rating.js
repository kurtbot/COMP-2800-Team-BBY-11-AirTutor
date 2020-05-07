function queryResult() {
    let queryString = decodeURIComponent(window.location.search);
    let queries = queryString.split("?");
    let id = queries[1];
    return id;
}

$(document).ready(function () {
    $("#yes-button").click(clickYes);
    $("#no-button").click(clickNo);
    $('#yes-submit').click(submitYesReview);
    $('#no-submit').click(submitNoReview);
})
/**
 * Shows the Yes menu on button click
 */
function clickYes() {
    $("#yes-option").show();
    $("#no-option").hide();

}
/**
 * Shows the No menu on button click
 */
function clickNo() {
    $("#no-option").show();
    $("#yes-option").hide();
}
/**
 * Takes the user home on Yes Submit
 */
function submitYesReview() {
    reviewSubmit();

}
/**
 * Takes the user home on No Submit
 */
function submitNoReview() {
    $(location).attr('href', '/home');

}


function reviewSubmit() {
    firebase.auth().onAuthStateChanged(function (user) {
        let amount = parseInt(localStorage.getItem("creditxfer"));
        let minus = amount * (-1);
        let decrement = firebase.firestore.FieldValue.increment(minus);
        let increment = firebase.firestore.FieldValue.increment(amount);
        let dbref = db.collection("users/").doc(user.uid);
        dbref.update({
            currency: decrement
        })
        let dbref2 = db.collection("users/").doc(queryResult());
        dbref2.update({
            currency: increment
        })
    })


    let professional = document.getElementById("pro").value;
    let teaching = document.getElementById("teaching-qual").value;
    let reviewedAccount = db.collection("users/").doc(queryResult());

    reviewedAccount.collection("review").add({
        professionalism: parseInt(professional) + 1,
        teachingquality: parseInt(teaching) + 1
    }).then(function(){
        window.location.href="/home";
    })

}