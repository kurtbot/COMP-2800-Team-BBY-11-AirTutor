
document.getElementById("go-rating").onclick = gotoNext;


function queryResult() {
    let queryString = decodeURIComponent(window.location.search);
    let queries = queryString.split("?");
    let id = queries[1];
    return id;
}
let tutor;
let student;



function gotoNext() {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("/sessionrooms").doc(queryResult()).get().then(function(doc){
            tutor = doc.data().tutorid;
            student = doc.data().studentid;
        }).then(function(){
            if (user.uid == tutor){
                window.location.href = "/home"
            } else {
                window.location.href = "/rating" + "?" + tutor;
            
            }
        })
    })
}