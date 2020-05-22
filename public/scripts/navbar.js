/**
 * Runs functions when document is fully loaded.
 */
$(document).ready(function () {
    userInfo();
    updateMessage();
    $("#signout").click(signOut);
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
                        $('#modal-cont').html(`<h3>Attention:</h3>
                        <p>You were not awarded credits because the student was not satisfied with your work. </p>
                        <p>Reason:</p>
                        <div id="reason">
                          <p><i></i></p>
                        </div>
                        <button id="close-understood" class="btn">I understand</button>`)
                        $('#myModal').fadeIn(500);
                        $("#reason").text(doc.data().reason);
                        $("#close-understood").click(understood);
                    }

                })

            })
    });
}

/**
 * Signs the user out of their account.
 */
function signOut() {
    let promise = new Promise((res, rej) => {
        firebase.auth().signOut();
        res('sign out')
    })

    promise.then(function(res) {
        console.log(res);
        window.location.href = '/';
    })
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
                        $("#new-message").text("Message*").css("color", "orange");
                    }
                }

                if (change.doc.data().tutorid == firebase.auth().currentUser.uid) {
                    if (change.doc.data().unreadtutor == true) {
                        $("#new-message").text("Message*").css("color", "orange");
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
    $('#myModal').fadeOut(500);
}

/**
 * Open and close side navigation
 * Source: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_sidenav
 */

/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("main-sidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0*/
function closeNav() {
    document.getElementById("main-sidenav").style.width = "0";
}
