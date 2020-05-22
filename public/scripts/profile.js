
userInfo();
viewRating();
studentInfo();
tutorInfo();
bestSubject();
viewPic();
$("#edit").click(editProfile);


/**
 * Go to edit profile page
 */
function editProfile() {
    window.location.href = "/editprofile";
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
                let language = snap.data().language;
                let bio = snap.data().bio;

                if (country != "" && country != undefined) {
                    $("#country").text("Country: " + country);
                }
                if (language != "" && language != undefined) {
                    $("#language").text("Language: " + language);
                }
                if (bio != "" && bio != undefined) {
                    $("#biotitle").text("About me");
                    $("#bio").text(bio)
                }

            })
    })
}
/**
 * Displays student information on profile page if it is present.
 */
function studentInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
        let dbref = db.collection("users/").doc(user.uid);

        dbref.get()
            .then(snap => {
                let education = snap.data().education;
                let grade = snap.data().grade;

                if (education != "" && education != undefined) {
                    $("#education").show();
                    $("#education").text("Education Level: " + education);
                }
                if (grade != "" && grade != undefined) {
                    $("#grade").show();
                    $("#grade").text("Grade Level: " + grade);
                }
            })
    })
}
/**
 * Display tutor information on profile page if it is present
 */
function tutorInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
        let dbref = db.collection("users/").doc(user.uid);

        dbref.get()
            .then(snap => {
                let eduComplete = snap.data().educationcompleted;

                if (eduComplete != "" && eduComplete != undefined) {
                    $("#educomplete").show();
                    $("#educomplete").text("Education Completed: " + eduComplete);
                }
            })
    })
}
/**
 * Display the user's best subject if that field is filled.
 */
function bestSubject() {
    firebase.auth().onAuthStateChanged(function (user) {
        let dbref = db.collection("users/").doc(user.uid);

        dbref.get()
            .then(snap => {
                let subject = snap.data().subject;

                if (subject != "" && subject != undefined) {
                    $("#subject").show();
                    $("#subject").text("Best Subject: " + subject);
                }

            })
    })
}
/** 
 * View Ratings on the profile page
 */
function viewRating() {
    getAllProReviews();
    getAllTQReviews();
}

/** 
 * Reads all the professional ratings using query and averages and prints to database
 *  * I made this code for a similar project in COMP 1800 Sunny Side Cooking to average ratings
 * found in a database
 * 
 * @author Dylan Sung
 * @see https://github.com/dys907/Sunny-Side-Cooking
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
                if (average != 0) {
                    $("#pro").text("Professionalism: " + average.toFixed(1));
                } else {
                    $("#norate").text("No ratings yet, tutor others to get some!");
                }

            });
    })
}

/** 
 * Reads all the professional ratings using query and averages and prints to database.
 * I made this code for a similar project in COMP 1800 Sunny Side Cooking to average ratings
 * found in a database
 * 
 * @author Dylan Sung
 * @see https://github.com/dys907/Sunny-Side-Cooking
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
                if (average != 0) {
                    $("#tq").text("Teaching Quality : " + average.toFixed(1));
                }
            });
    })
}
/**
 * Displays the image file found in database.
 */
function viewPic() {
    firebase.auth().onAuthStateChanged(function (user) {
        const dbref = db.collection("users/").doc(user.uid)

        dbref.get()
            .then(snap => {
                let picture = snap.data().profilePic;

                if (picture != "" && picture != undefined) {
                    $("#imagefile").attr("src", picture);
                }

            })

    })

}