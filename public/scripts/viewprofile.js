/**
 * Loads function after document is fully loaded
 */
$(document).ready(function(){
    userInfo();
    viewRating();
    studentInfo();
    tutorInfo();
    bestSubject();
    viewPic();
})

/**
 * Grabs the user id of the other user attending the session with current user
 * using a query string split from the URL
 * @return user id of other user
 */
function queryResult() {
    let queryString = decodeURIComponent(window.location.search);
    let queries = queryString.split("?");
    let id = queries[1];
    return id;
}

/**
 * Shows the user's basic information.
 * @param queryResult()
 *          returns the user id of the targetted user on page load
 */
function userInfo() {
    db.collection("users/").doc(queryResult())
        .get()
        .then(snap => {
            $("#name").text(snap.data().firstName + " " + snap.data().lastName);
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
}
/**
 * Shows the user's student information if available.
 * @param queryResult()
 *          returns the user id of the targetted user on page load
 */
function studentInfo() {
    let dbref = db.collection("users/").doc(queryResult());
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

}

/**
 * Shows the user's tutor information if available.
 * @param queryResult()
 *          returns the user id of the targetted user on page load
 */
function tutorInfo() {
    let dbref = db.collection("users/").doc(queryResult());

    dbref.get()
        .then(snap => {
            let eduComplete = snap.data().educationcompleted;

            if (eduComplete != "" && eduComplete != undefined) {
                $("#educomplete").show();
                $("#educomplete").text("Education Completed: " + eduComplete);
            }
        })
}

/**
 * Shows the user's best subject if available.
 * @param queryResult()
 *          returns the user id of the targetted user on page load
 */
function bestSubject() {
    let dbref = db.collection("users/").doc(queryResult());
    dbref.get()
        .then(snap => {
            let subject = snap.data().subject;

            if (subject != "" && subject != undefined) {
                $("#subject").show();
                $("#subject").text("Best Subject: " + subject);
            }
        })
}
/** 
 * View Ratings of the targetted user
 */
function viewRating() {
    averagePro();
    averageTQ();
}
/** 
 * Reads all the professional ratings using a promise then stores all snapshots of the scores in an array
 *  * I made this code for a similar project in COMP 1800 Sunny Side Cooking to average ratings
 * found in a database
 * 
 * @author Dylan Sung
 * @see https://github.com/dys907/Sunny-Side-Cooking
 * @return array with all the read professionalism
 */
async function getAllProReviews() {
    const dbreviews = db.collection("users/").doc(queryResult()).collection("review");
    const proReviews = dbreviews.where("professionalism", ">=", 0).get();
    const [proQuerySnapshot] = await Promise.all([
        proReviews
    ]);
    let proArray = proQuerySnapshot.docs;
    return proArray;
}

/**
 * Reads associated values from firebase. Sums up the average professionalism using a for each of all 
 * elements in the array.
 */
function averagePro() {
    let sum = 0;
    let counter = 0;
    getAllProReviews().then(result => {
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
            $("#norate").text("This is a new tutor!")
        }

    });
}

/** 
 * Reads all the teaching quality ratings using a promise then stores all snapshots of the scores in an array
 *  * I made this code for a similar project in COMP 1800 Sunny Side Cooking to average ratings
 * found in a database
 * 
 * @author Dylan Sung
 * @see https://github.com/dys907/Sunny-Side-Cooking
 * @return array with all the read teaching quality
 */
async function getAllTQReviews() {
    const dbreviews = db.collection("users/").doc(queryResult()).collection("review");
    const tqReviews = dbreviews.where("teachingquality", ">=", 0).get();
    const [tqQuerySnapshot] = await Promise.all([
        tqReviews
    ]);
    let tqArray = tqQuerySnapshot.docs;
    return tqArray;
}

/**
 * Reads associated values from firebase. Sums up the average professionalism using a for each of all 
 * elements in the array.
 */
function averageTQ() {
    let sum = 0;
    let counter = 0;
    getAllTQReviews().then(result => {
        result.forEach(docSnapshot => {
            sum += docSnapshot.data().teachingquality;
            counter++;
        });
        if (counter == 0) {
            counter = 1;
        }
        let average = sum / counter;
        if (average != 0) {
            $("#tq").text("Teaching Quality: " + average.toFixed(1));
        }
    });
}
/**
 * Displays the image file found in database for the targetted user.
 */
function viewPic() {
    const dbref = db.collection("users/").doc(queryResult())
    dbref.get()
        .then(snap => {
            let picture = snap.data().profilePic;

            if (picture != "" && picture != undefined) {
                $("#imagefile").attr("src", picture);
            }
        })
}