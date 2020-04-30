userInfo

function userInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
       let dbref = db.collection("users/").doc(user.uid);
       document.getElementById("dropdownId").innerHTML = user.displayName;
    });
}