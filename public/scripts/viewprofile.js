let displayCountry = document.getElementById("country");
let displayEducation = document.getElementById("education");
let displayGrade = document.getElementById("grade");
let displayLanguage = document.getElementById("language");

userInfo();
viewRating();
function queryResult() {
    let queryString = decodeURIComponent(window.location.search);
    let queries = queryString.split("?");
    let id = queries[1];
    return id;
}

/**
 * Shows the user information of the user.
 */
function userInfo() {
    db.collection("users/").doc(queryResult())
        .get()
        .then(snap => {
            document.getElementById("name").innerHTML = snap.data().firstName + " " + snap.data().lastName;
            if (country != "") {
                displayCountry.innerHTML = "Country: " + snap.data().country;
            }
            if (education != "") {
                displayEducation.innerHTML = "Education Level: " + snap.data().education;
            }
            if (grade != "") {
                displayGrade.innerHTML = "Grade: " + snap.data().grade;
            }
            if (language != "") {
                displayLanguage.innerHTML = "Language: " + snap.data().language;
            }
        })
}

/** 
 * View Ratings
 */
function viewRating() {
    averagePro();
    averageTQ();

}

/** 
 * Reads all the professional ratings using a promise then stores all snapshots of the scores in an array
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
        document.getElementById("pro").innerHTML = "Professionalism: " + average.toFixed(1);
    });
}

/** 
 * Reads all the teaching quality ratings using a promise then stores all snapshots of the scores in an array
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
        document.getElementById("tq").innerHTML = "Teaching Quality: " + average.toFixed(1);
    });
}