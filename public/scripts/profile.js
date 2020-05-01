let displayCountry = document.getElementById("country");
let displayEducation = document.getElementById("education");
let displayGrade = document.getElementById("grade");
let displayLanguage = document.getElementById("language");
userInfo();

/**
 * Shows the user information of the user.
 */
function userInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
        let dbref = db.collection("users/").doc(user.uid);
        document.getElementById("name").innerHTML = user.displayName;
        
        dbref.get()
            .then(snap => {
                let country = snap.data().country;
                let education = snap.data().education;
                let grade = snap.data().grade;
                let language = snap.data().language;
                if(country != ""){
                    displayCountry.innerHTML = "Country: " + country;
                }
                if(education != ""){
                    displayEducation.innerHTML = "Education Level: " + education;
                }
                if(grade != ""){
                    displayGrade.innerHTML = "Grade: " + grade;
                }
                if(language != ""){
                    displayLanguage.innerHTML = "Language: " + language;
                }                
            })
    })
}