firebase.auth().onAuthStateChanged(function (user) {
    document.getElementById("username").innerHTML = user.displayName;
});