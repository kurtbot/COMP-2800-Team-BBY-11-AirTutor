$(document).ready(function () {
    $("#yes-button").click(clickYes);
    $("#no-button").click(clickNo);
})


// Check if student

let isStudent = false;

// I'm a Student
function clickYes() {
    $('#student').show();
    $('#submit').show();
    $('#subjectField').prop('selectedIndex', 0);
    $('#subjectField').trigger('change');
    $('#educationCompField').prop('selectedIndex', 0);
    $('#educationCompField').trigger('change');
    $('#not-student').hide();
    $('#yes-button').css('background-color', '#85b8cb');
    $('#no-button').css('background-color', '#1d6a96');
    updateSubmit();
    isStudent = true;
}

// I'm a Tutor
function clickNo() {
    $('#not-student').show();
    $('#submit').show();
    $('#gradeField').prop('selectedIndex', 0);
    $('#gradeField').trigger('change');
    $('#educationField').prop('selectedIndex', 0);
    $('#educationField').trigger('change');
    $('#student').hide();
    $('#no-button').css('background-color', '#85b8cb');
    $('#yes-button').css('background-color', '#1d6a96');
    updateSubmit();
    isStudent = false;
}

let gradeField = false;
let educationField = false;
let subjectField = false;
let educationCompField = false;
let languageField = false;
let countryField = false;

$(document).ready(function () {

    // ==============================
    // Student
    // ==============================

    // check for grade field changes
    $('#gradeField').change(function () {
        if ($(this).val())
            gradeField = true;
        else
            gradeField = false;

        updateSubmit();
    })

    // check for education field changes
    $('#educationField').change(function () {
        if ($(this).val())
            educationField = true;
        else
            educationField = false;

        updateSubmit();
    })


    // ==============================
    // Tutor
    // ==============================

    // check for subject field changes
    $('#subjectField').change(function () {
        if ($(this).val())
            subjectField = true;
        else
            subjectField = false;

        updateSubmit();
    })

    // check for education completed changes
    $('#educationCompField').change(function () {
        if ($(this).val())
            educationCompField = true;
        else
            educationCompField = false;

        updateSubmit();
    })


    $('#languageField').change(function () {
        if ($(this).val())
            languageField = true;
        else
            languageField = false;

        updateSubmit();
    })

    $('#countryField').change(function () {
        if ($(this).val())
            countryField = true;
        else
            countryField = false;

        updateSubmit();
    })

    updateSubmit();
})

// Update the submit button
function updateSubmit() {

    let studentComplete = (gradeField && educationField);
    let tutorComplete = (subjectField && educationCompField);
    let countryLangComplete = (countryField && languageField);

    if ((studentComplete || tutorComplete) && countryLangComplete) {
        $("#submit").prop('disabled', false);
        $("#submit").css('background-color', "#1d6a96");
        $("#submit").css('transition', "background-color 0.1s linear");
    }
    else {
        $("#submit").prop('disabled', true);
        $("#submit").css('background-color', "#283b42");
        $("#submit").css('transition', "background-color 0.1s linear");
    }

}

function signup() {

    if (isStudent) {
        signupAsStudent();
    } else {
        signupAsTutor();
    }

}

function signupAsStudent() {

    let gradeData = $('#gradeField').val();
    let educationData = $('#educationField').val();
    let languageData = $('#languageField').val();
    let countryData = $('#countryField').val();

    let userRef = db.collection('users').doc(firebase.auth().currentUser.uid);

    let name = firebase.auth().currentUser.displayName.split(' ');
    console.log(firebase.auth().currentUser);

    userRef.set({
        currency: 0,
        language: languageData,
        country: countryData,

        education: educationData,
        grade: gradeData,

        firstName: name[0],
        lastName: name[name.length - 1],
        userID: firebase.auth().currentUser.uid
    }, {merge: true}).then(function () {
        window.location.href = '/home'
    });
    

}


function signupAsTutor() {

    let subjectData = $('#subjectField').val();
    let educationCompData = $('#educationCompField').val();
    let languageData = $('#languageField').val();
    let countryData = $('#countryField').val();

    let userRef = db.collection('users').doc(firebase.auth().currentUser.uid);

    let name = firebase.auth().currentUser.displayName.split(' ');
    console.log(firebase.auth().currentUser);

    userRef.set({
        currency: 0,
        language: languageData,
        country: countryData,
        
        subject: subjectData,
        educationcompleted: educationCompData,

        firstName: name[0],
        lastName: name[name.length - 1],
        userID: firebase.auth().currentUser.uid
    },{merge: true}).then(function () {
        window.location.href = '/home'
    });

}