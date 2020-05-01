let displayCountry = document.getElementById("country");
userInfo();

function userInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
        let dbref = db.collection("users/").doc(user.uid);
        document.getElementById("name").innerHTML = user.displayName;
        
        dbref.get()
            .then(snap => {
                let country = snap.data().country;
                let education = snap.data().education;
                let grade = snap.data().grade;
                
                displayCountry.innerHTML = "Country: " + country;
                
            })
    })
}