/**
 * Runs functions when document is fully loaded.
 */
$(document).ready(function () {
    $("#understand").click(understood);
    userInfo();
    updateMessage();
    $("signout").click(signOut);
})



/**
 * Shows the current logged in user's name on the nav bar
 * Real-time updates the credits a user has in their account
 * Real-time updates a user if he gets flagged for tutoring misconduct.
 */
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

/**
 * Signs the user out of their account.
 */
function signOut() {
    firebase.auth().signOut();
}

/**
 * Gets the state of the user's read messages from the database. If there
 * is a new message in the database, the message button on navbar will
 * display red until the message is read.
 */
function updateMessage() {
    let dbref = db.collection('/chatrooms/');
    dbref.get().then(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            if (change.type === "added" || change.type === "modified") {
                if (change.doc.data().studentid == firebase.auth().currentUser.uid) {
                    if (change.doc.data().unreadstudent == true) {
                        $("#new-message").text("Message*").css("color", "red");
                    }
                }
                if (change.doc.data().tutorid == firebase.auth().currentUser.uid) {
                    if (change.doc.data().unreadtutor == true) {
                        $("#new-message").text("Message*").css("color", "red");
                    }
                }
            }
        })
    })

}
/**
 * Clears the flagged state found in the users database when they receive a negative rating.
 * Removes the alert message they get from the top of their screen
 */
function understood() {
    firebase.auth().onAuthStateChanged(function (user) {
        let dbref = db.collection("users/").doc(user.uid);
        dbref.update({
            flagged: false
        })
    })
    $("#warning").fadeOut("slow");
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("main-sidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("main-sidenav").style.width = "0";
}