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

                })

            })
    });
}


function signOut() {
    firebase.auth().signOut();
    window.location.href = ''
}


function updateMessage() {
    firebase.auth().onAuthStateChanged(function (user) {
        let dbref = db.collection('/chatrooms/');
        dbref.get().then(function (snapshot) {
            snapshot.docChanges().forEach(function (change) {
                if (change.type === "added" || change.type === "modified") {

                    if (change.doc.data().studentid == user.uid) {
                        if (change.doc.data().unreadstudent == true) {
                            $("#new-message").text("Message*").css("color", "red");
                        } else {
                            $("#new-message").text("Message").css("color", "grey");
                        }
                    }

                    if (change.doc.data().tutorid == user.uid) {
                        if (change.doc.data().unreadtutor == true) {
                            $("#new-message").text("Message*").css("color", "red");
                        } else {
                            $("#new-message").text("Message").css("color", "grey");
                        }
                    }
                }
            })
        })
    })
}

function getNotified() {
    
}