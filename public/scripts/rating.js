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
async function submitNoReview() {
    let promise = new Promise((res, rej)=>{
        let dbref2 = db.collection("users/").doc(queryResult());
        // let up = firebase.firestore.FieldValue.increment(1)
        let reason = $("#complaint").val()
        dbref2.set({
            flagged: true,
            reason: reason
        }, {merge: true})
        
        db.collection("sessionrooms").doc(localStorage.getItem("session")).delete().then(function(){
            db.collection("schedules").doc(localStorage.getItem("schedule")).delete().then(function() {
                db.collection("chatrooms").doc(localStorage.getItem("chat")).collection("messages")
                .get().then(function(snap){
                    snap.forEach(function(docc){
                        db.collection("chatrooms").doc(localStorage.getItem("chat")).collection("messages").doc(docc.id).delete()
                    })

                }).then(function(){
                    db.collection("chatrooms").doc(localStorage.getItem("chat")).delete().then(function(){
                        res("success")
                    })
                })

          })
        })
        // db.collection("sessionrooms").doc(localStorage.getItem("session")).delete()
        // db.collection("schedules").doc(localStorage.getItem("schedule")).delete()
        console.log("step 1")

    }
    )

    promise.then(result =>{
        window.location.href = "/home"
        console.log("step 2")
    })

}


function reviewSubmit() {
    firebase.auth().onAuthStateChanged(function (user) {
        let promise = new Promise((res, rej) =>{
            
        
        let amount = parseInt(localStorage.getItem("creditxfer"));
        let minus = amount * (-1);
        let decrement = firebase.firestore.FieldValue.increment(minus);
        let increment = firebase.firestore.FieldValue.increment(amount);
        let up = firebase.firestore.FieldValue.increment(1)
        let dbref = db.collection("users/").doc(user.uid);
        dbref.update({
            currency: decrement
        })
        let dbref2 = db.collection("users/").doc(queryResult());

        dbref2.set({
            currency: increment,
            answeredQuestion: up
        }, {merge: true})
        let request = localStorage.getItem("request");
        console.log(request)
        let professional = document.getElementById("pro").value;
        let teaching = document.getElementById("teaching-qual").value;
        let reviewedAccount = db.collection("users/").doc(queryResult());
    
        reviewedAccount.collection("review").add({
            professionalism: parseInt(professional) + 1,
            teachingquality: parseInt(teaching) + 1
        })
        db.collection("posts").doc(request).delete().then(function(){
        db.collection("sessionrooms").doc(localStorage.getItem("session")).delete().then(function(){
            db.collection("schedules").doc(localStorage.getItem("schedule")).delete().then(function() {
                db.collection("chatrooms").doc(localStorage.getItem("chat")).collection("messages")
                .get().then(function(snap){
                    snap.forEach(function(docc){
                        db.collection("chatrooms").doc(localStorage.getItem("chat")).collection("messages").doc(docc.id).delete()
                    })

                }).then(function(){
                    if ($("#deletechat").val() == "Yes"){
                    db.collection("chatrooms").doc(localStorage.getItem("chat")).delete().then(function(){
                        res("success")
                    })
                } else {
                    res("success")
                }
                })

          })
        })
    })

    })

        promise.then(function(){
            localStorage.removeItem("creditxfer")
            localStorage.removeItem("request")
            window.location.href="/home";
        })
        
    })




}