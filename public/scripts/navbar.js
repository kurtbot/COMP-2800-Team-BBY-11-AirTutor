userInfo();
loggedIn();


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

function loggedIn() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $("#hideme").show();
            $("#hideme").css('display', 'flex')
        }
    })
}