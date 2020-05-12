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
    write();

}

function write() {
    firebase.auth().onAuthStateChanged(function (user) {
        let dbref = db.collection("users/").doc(user.uid);
        dbref.set(checkField(), { merge: true }).then(function () {
            window.location.href = "/profile";
        })

    })
}

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