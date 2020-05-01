userInfo();



function userInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
        let dbref = db.collection("users/").doc(user.uid);
       document.getElementById("dropdownId").innerHTML = user.displayName;
       dbref.get()
           .then(snap => {
               let credits = snap.data().currency;
               document.getElementById("current-cash").innerHTML = "Credits: " + credits; 
           })
    });
}
