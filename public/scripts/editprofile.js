//array storing uploaded file
let file = [];

$(document).ready(function () {
    $("#general-button").click(generalTab);
    $("#student-button").click(studentTab);
    $("#tutor-button").click(tutorTab);
    $("#picture-button").click(pictureTab)
    $("#submit-button").click(submit);
    $("#customFile").on("change", function(e){
        file = e.target.files;
    })
    $("#check").click(checker);
    $(".custom-file-input").on("change", displayFile);
    
})
/**
 * Switch to general tab
 */
function generalTab() {
    $("#student").hide();
    $("#general").show();
    $("#tutor").hide();
    $("#pro-pic").hide();
}
/**
 * Switch to student tab
 */
function studentTab() {
    $("#student").show();
    $("#general").hide();
    $("#tutor").hide();
    $("#pro-pic").hide();
}
/**
 * Switch to tutor tab
 */
function tutorTab() {
    $("#student").hide();
    $("#general").hide();
    $("#tutor").show();
    $("#pro-pic").hide();
}
/**
 * Switch to picture tab
 */
function pictureTab() {
    $("#student").hide();
    $("#general").hide();
    $("#tutor").hide();
    $("#pro-pic").show();
}
/**
 * Submission button, leads to profile page
 */
function submit() {
    write();

}
/**
 * Writes chosen JSON objects into the firebase, redirects to profile page
 */
function write() {
    firebase.auth().onAuthStateChanged(function (user) {
        let dbref = db.collection("users/").doc(user.uid);
        dbref.set(checkField(), { merge: true }).then(function () {
            window.location.href = "/profile";
        })
    })
}
/**
 * Checks which form fields are filled with appropriate forms
 */
function checkField() {
    let changes = {};
    if ($("#bioField").val() != undefined && $("#bioField").val() != null && $("#bioField").val().trim() != "") {
        changes['bio'] = $("#bioField").val();
    }

    if ($("#countryField").val() != undefined && $("#countryField").val() != null && $("#countryField").val().trim() != "") {
        changes['country'] = $("#countryField").val();
    }

    if ($("#languageField").val() != undefined && $("#languageField").val() != null && $("#languageField").val().trim() != "") {
        changes['language'] = $("#languageField").val();
    }

    if ($("#educationField").val() != undefined && $("#educationField").val() != null && $("#educationField").val().trim() != "") {
        changes['education'] = $("#educationField").val();
    }

    if ($("#gradeField").val() != undefined && $("#gradeField").val() != null && $("#gradeField").val().trim() != "") {
        changes['grade'] = $("#gradeField").val();
    }

    if ($("#educationCompField").val() != undefined && $("#educationCompField").val() != null && $("#educationCompField").val().trim() != "") {
        changes['educationcompleted'] = $("#educationCompField").val();
    }

    if ($("#subjectField").val() != undefined && $("#subjectField").val() != null && $("#subjectField").val().trim() != "") {
        changes['subject'] = $("#subjectField").val();
    }
    return changes;
}

function checker() {
    console.log(file);
    uploadImage();
}
/**
 * Displays file name
 */
function displayFile() {
    let fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
}

function uploadImage() {
    if(file.length !=0) {
        let filePath = firebase.auth().currentUser.uid + '/' + file[0].name;
        firebase.storage().ref(filePath).put(file)
        .then(function (fileSnapshot) {
            fileSnapshot.ref.getDownloadURL().then((url) => {
                db.collection('user').doc(firebase.auth().currentUser.uid).set({
                    profilePic: url
                },{merge:true})
            })
        })
    }
}