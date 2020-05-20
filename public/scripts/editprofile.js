const mb = 1048576;
//array storing uploaded file
let file = [];
let changed = true;

/**
 * Runs functions after document is loaded.
 */
$(document).ready(function () {
    $("#general-button").click(generalTab);
    $("#student-button").click(studentTab);
    $("#tutor-button").click(tutorTab);
    $("#picture-button").click(pictureTab)
    $("#submit-button").click(submit);
    $("#return-button").click(returnHome);
    $("#customFile").on("change", function (event) {
        fileUpload(event);
    })
    $(".custom-file-input").on("change", displayFile);
    /**
     * Confirmation message for user so they don't lose information on page leave
     */
    $(window).bind('beforeunload', function () {
        return ' Are you sure you want to leave?'
    })
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
    uploadImage()
        .then(function () {
            write();
            $("#success").fadeIn('slow').delay(3000).fadeOut('slow');

        })

}
/**
 * Writes chosen JSON objects into the firebase, redirects to profile page
 */
function write() {
    firebase.auth().onAuthStateChanged(function (user) {
        let dbref = db.collection("users/").doc(user.uid);
        dbref.set(checkField(), { merge: true })
    })
}
/**
 * Checks which form fields are filled with appropriate forms and saves the changes into an object
 */
function checkField() {
    let changes = {};
    checker("bioField", changes, 'bio');
    checker("countryField", changes, 'country');
    checker("languageField", changes, 'language');
    checker("educationField", changes, 'education');
    checker("gradeField", changes, 'grade');
    checker("educationCompField", changes, 'educationcompleted');
    checker("subjectField", changes, 'subject');
    return changes;
}

/**
 * Checks if a field has been modified and adds its value to a JSON object
 * @param {String} field
 *          The html form field that is being checked 
 * @param {object} change    
 *          The object that holds all the changes going through
 * @param {String} changeComp
 *          The key of the change object being added
 */
function checker(field, change, changeComp) {
    console.log($("#" + field).val());
    if ($("#" + field).val() != undefined
        && $("#" + field).val() != null
        && $("#" + field).val().trim() != "") {
        change[changeComp] = $("#" + field).val();
    }
}
/**
 * Checks if an uploaded file is the right file type and under the 1MB limit. If they
 * are, the image is displayed on the profile.
 * I found snippets of this code on stackoverflow.com
 * 
 * @author Hoyen
 * @see https://stackoverflow.com/questions/29805909/jquery-how-to-check-if-uploaded-file-is-an-image-without-checking-extensions
 * 
 * @param {*} event
 *              On event the function will target the file picker 
 */
function fileUpload(e) {
    const uploaded = e.target.files[0];
    const fileType = uploaded['type'];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    if ($.inArray(fileType, validImageTypes) < 0) {
        alert("Not a valid filetype. Use gif, jpeg or png");
        changed = false;
    } else {
        if (uploaded.size <= mb) {
            file = e.target.files;
            changed = true;
            previewImage();
        } else {
            alert("Please choose a file that is smaller than 1 MB");
            changed = false;
        }
    }
}

/**
 * Displays file name after it has been loaded by the file picker
 */
function displayFile() {
    if (changed) {
        let fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    }
}
/**
 * Gives a preview of the image submitted into the file picker.
 */
function previewImage() {
    const fileCheck = file[0];
    if (fileCheck) {
        const reader = new FileReader();

        $(reader).on("load", function () {
            $("#preview").attr("src", this.result);
        })
        reader.readAsDataURL(fileCheck);
    }

}
/**
 * Uploads the image placed into the FileList and writes a profile URL to the database and also stores 
 * it to firebase storage.
 */
async function uploadImage() {
    if (file.length != 0) {
        let filePath = firebase.auth().currentUser.uid + '/' + 'profilepic';
        firebase.storage().ref(filePath).put(file[0])
            .then(function (fileSnapshot) {
                fileSnapshot.ref.getDownloadURL().then((url) => {
                    db.collection('users/').doc(firebase.auth().currentUser.uid).set({

                        profilePic: url
                    }, { merge: true })
                })
            })
    }
}
/**
 * Returns user to the profile page
 */
function returnHome() {
    window.location.href = "/profile"
}