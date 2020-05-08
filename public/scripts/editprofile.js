$(document).ready(function () {
    $("#general-button").click(generalTab);
    $("#student-button").click(studentTab);
    $("#tutor-button").click(tutorTab);
    $("#submit-button").click(submit);
})

function generalTab() {
    $("#student").hide();
    $("#general").show();
    $("#tutor").hide();
}

function studentTab() {
    $("#student").show();
    $("#general").hide();
    $("#tutor").hide();
}

function tutorTab() {
    $("#student").hide();
    $("#general").hide();
    $("#tutor").show();
}

function submit() {
    write()
    .then(function(){
        window.location.href="/profile";
    });
}


function write() {
    firebase.auth().onAuthStateChanged(function (user) {
        let dbref = db.collection("users/").doc(user.uid);

        if ($("#firstNameField").val() != undefined && $("#firstNameField").val() != null && $("#firstNameField").val().trim() != "") {
            dbref.set({
                firstName: $("#firstNameField").val()
            }, { merge: true })
        }

        if ($("#lastNameField").val() != undefined && $("#lastNameField").val() != null && $("#lastNameField").val().trim() != "") {
            dbref.set({
                lastName: $("#lastNameField").val()
            }, { merge: true })
        }

        if ($("#emailSignupField").val() != undefined && $("#emailSignupField").val() != null && $("#emailSignupField").val().trim() != "") {
            dbref.set({
                email: $("#emailSignupField").val()
            }, { merge: true })
        }    

        if ($("#bioField").val() != undefined && $("#bioField").val() != null && $("#bioField").val().trim() != "") {
            dbref.set({
                bio: $("#bioField").val()
            }, { merge: true })
        }  

        if ($("#countryField").val() != undefined && $("#countryField").val() != null && $("#countryField").val().trim() != "") {
            dbref.set({
                country: $("#countryField").val()
            }, { merge: true })
        }  

        if ($("#languageField").val() != undefined && $("#languageField").val() != null && $("#languageField").val().trim() != "") {
            dbref.set({
                language: $("#languageField").val()
            }, { merge: true })
        }  

        if ($("#educationField").val() != undefined && $("#educationField").val() != null && $("#educationField").val().trim() != "") {
            dbref.set({
                education: $("#educationField").val()
            }, { merge: true })
        }  

        if ($("#gradeField").val() != undefined && $("#gradeField").val() != null && $("#gradeField").val().trim() != "") {
            dbref.set({
                grade: $("#gradeField").val()
            }, { merge: true })
        }  

        if ($("#educationCompField").val() != undefined && $("#educationCompField").val() != null && $("#educationCompField").val().trim() != "") {
            dbref.set({
                educationcompleted: $("#educationCompField").val()
            }, { merge: true })
        }  

        if ($("#subjectField").val() != undefined && $("#subjectField").val() != null && $("#subjectField").val().trim() != "") {
            dbref.set({
                subject: $("#subjectField").val()
            }, { merge: true })
        }  
    })
}
// userDoc.set({
//         firstName: firstName,
//         lastName: lastName,
//         email: user.email,
//         country: country,
//         grade: grade,
//         language: language,
//         education: education,
//         educationcompleted: educationComp,
//         subject: subject
//     }, { merge: true })