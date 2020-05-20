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
                        $('#modal-cont').html(`<h3>Attention:</h3>
                        <p>You were not awarded credits because the student was not satisfied with your work. </p>
                        <p>Reason:</p>
                        <div id="reason">
                          <p><i></i></p>
                        </div>
                        <button id="close" class="btn btn-danger">I understand</button>`)
                        $("#warning").fadeIn("slow");
                        $("#reason").text(doc.data().reason);
                    }

                    if (doc.data().sessionSuccess == true) {
                        let modalContainer = $('#modal-cont');
                        modalContainer.html(`
                        <span class="close">&times;</span>
                        <h3>Are you enjoying our app? Share it with your friends</h3>
                        `)

                        modalContainer.html(fbShare());
                        modalContainer.html(twShareTutor());
                    }
                })

            })
    });
}

/**
 * Source: https://developers.facebook.com/docs/sharing/web/
 */

function fbShare() {
    let fbShare = $('<div id="fb-share">Share to Facebook</div>')
    fbShare.click(function () {
        FB.ui({
            display: 'popup',
            method: 'share',
            href: 'https://airtutormvp.web.app/',
        }, function (response) { });
    })

    return fbShare;
}

/**
 * Source: https://publish.twitter.com/
 */

function twShareTutor() {
    let twShare = $('<a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-size="large" data-text="I answered a question on Air Tutor! Join now to help students with their homework problems!" data-url="https://airtutormvp.web.app/" data-hashtags="homeworkhelp" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>');

    return twShare;
}

function twShareStudent() {
    let twShare = $('<a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-size="large" data-text="I just had my question answered on Air Tutor! Join now and you can get fast help too!" data-url="https://airtutormvp.web.app/" data-hashtags="homeworkhelp" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>');

    return twShare;
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
    $("#warning").fadeOut("slow");
}

/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("main-sidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0*/
function closeNav() {
    document.getElementById("main-sidenav").style.width = "0";
}

/* Shows the modal on the screen */
function showModal() {
    document.getElementById('myModal').style.top = "50%";
    document.getElementById('myModal').style.display = "block";
}

function hideModal() {
    document.getElementById('myModal').style.top = "0";
    document.getElementById('myModal').style.display = "none";
}

// Get the modal
var modal = document.getElementById("myModal");
var modalCont = document.getElementById('modal-cont')

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementById("close");

// When the user clicks the button, open the modal 
btn.onclick = function () {
    $(modal).fadeIn(500);
}

span.onclick = function () {
    $(modal).fadeOut(500);
}