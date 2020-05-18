$(document).ready(function(){
    $("#understand").click(understood);
})

userInfo();
updateMessage();


function userInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
        let dbref = db.collection("users/").doc(user.uid);
        document.getElementById("dropdownId").innerHTML = user.displayName;
        dbref.get()
            .then(snap => {
                dbref.onSnapshot(function (doc) {
                    let credits = doc.data().currency;
                    $("#current-cash").text("Credits: " + credits);

                    if (doc.data().flagged == true) {
                        $("#warning").fadeIn("slow");
                        $("#reason").text(doc.data().reason);
                    }
                })

            })
    });
}


function signOut() {
    firebase.auth().signOut();
    window.location.href = ''
}


function updateMessage() {

        let dbref = db.collection('/chatrooms/');
        dbref.get().then(function (snapshot) {
            snapshot.docChanges().forEach(function (change) {
                if (change.type === "added" || change.type === "modified") {


                    if (change.doc.data().studentid == firebase.auth().currentUser.uid) {
                        console.log("help")
                        if (change.doc.data().unreadstudent == true) {
                            $("#new-message").text("Message*").css("color", "red");
                        } 
                    }

                    if (change.doc.data().tutorid == firebase.auth().currentUser.uid) {

                        if (change.doc.data().unreadtutor == true) {
                            console.log("help1")
                            $("#new-message").text("Message*").css("color", "red");
                        } 
                    }
                }
            })
        })
    
}

function understood() {
    firebase.auth().onAuthStateChanged(function (user) {
        let dbref = db.collection("users/").doc(user.uid);
        dbref.update({
            flagged:false
        })
    })
    $("#warning").fadeOut("slow");
}
