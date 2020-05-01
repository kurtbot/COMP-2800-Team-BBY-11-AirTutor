function showName() {
    firebase.auth().onAuthStateChanged(function(user) {
        document.getElementById("username").innerHTML = user.displayName;
    });
}

function showMeetings() {
    firebase.auth().onAuthStateChanged(function(user) {

    });
}