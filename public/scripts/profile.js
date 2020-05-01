let displayCountry = document.getElementById("country");
let displayEducation = document.getElementById("education");
let displayGrade = document.getElementById("grade");
let displayLanguage = document.getElementById("language");
userInfo();
viewRating();
document.getElementById("edit").onclick = editProfile;

function editProfile() {
    window.location.href = "editprofile.html";
}

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

/** 
 * View Ratings
 */
function viewRating() {
    getAllProReviews();
    getAllTQReviews();
}

/** 
 * Reads all the professional ratings using query and averages and prints to database
 */
function getAllProReviews() {
    let sum = 0;
    let counter = 0;
    firebase.auth().onAuthStateChanged(function (user) {
        const dbreviews = db.collection("users/").doc(user.uid).collection("review");
        const proReviews = dbreviews.where("professionalism", ">=", 0)
        .get()
        .then(result => {
            result.forEach(docSnapshot => {
                sum += docSnapshot.data().professionalism;
                counter++;
            });
            if (counter == 0) {
                counter = 1;
            }
            let average = sum / counter;
            document.getElementById("pro").innerHTML = "Professionalism: " + average.toFixed(1);
        });
    })
}

/** 
 * Reads all the professional ratings using query and averages and prints to database
 */
function getAllTQReviews() {
    let sum = 0;
    let counter = 0;
    firebase.auth().onAuthStateChanged(function (user) {
        const dbreviews = db.collection("users/").doc(user.uid).collection("review");
        const proReviews = dbreviews.where("teachingquality", ">=", 0)
        .get()
        .then(result => {
            result.forEach(docSnapshot => {
                sum += docSnapshot.data().teachingquality;
                counter++;
            });
            if (counter == 0) {
                counter = 1;
            }
            let average = sum / counter;
            document.getElementById("tq").innerHTML = "Teaching Quality : " + average.toFixed(1);
        });
    })
}

