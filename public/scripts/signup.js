function signup() {
    // let firstName = $("#firstNameField");
    // firstName = firstName.charAt(0).toUpperCase() + firstName.substring(1).toLowerCase();
    // let lastName = $("#lastNameField");
    // lastName = lastName.charAt(0).toUpperCase() + lastName.substring(1).toLowerCase();
    // let email = $("#emailSignupField");
    // let password = $("#passwordSignupField");
    // let name = firstName + " " + lastName;

    let firstName = document.getElementById('firstNameField').value;
    firstName = firstName.charAt(0).toUpperCase() + firstName.substring(1).toLowerCase();
    let lastName = document.getElementById('lastNameField').value;
    lastName = lastName.charAt(0).toUpperCase() + lastName.substring(1).toLowerCase();
    let email = document.getElementById('emailSignupField').value;
    let password = document.getElementById('passwordSignupField').value;
    let country = document.getElementById('countryField').value;
    let language = document.getElementById('languageField').value;
    let education = document.getElementById('educationField').value;
    let educationComp = document.getElementById('educationCompField').value;
    let grade = document.getElementById('gradeField').value;
    let subject = document.getElementById('subjectField').value;
    let name = firstName + " " + lastName;
    // Check for errors in inputs
    if (!(firstName === "") && !(lastName === "") && !(email === "") && !(password === "")) {
        // Check if email is the right format
        // if (email.includes('@email.com')) {
        alert("signing in")
        // Create user with email and pass.
        // [START createwithemail]
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function () {

                alert("signing in new user")
                // Sign in newly created user
                firebase.auth().signInWithEmailAndPassword(email, password)
                    .then(function () {
                        // get current user
                        var user = firebase.auth().currentUser;

                        // add initial data to firebase database
                        var userDoc = db.collection('users').doc(user.uid);
                        console.log(user);
                        userDoc.set({
                            firstName: firstName,
                            lastName: lastName,
                            email: user.email,
                            userID: user.uid,
                            country: country,
                            currency: 0.0,
                            grade: grade,
                            language: language,
                            education: education,
                            educationcompleted: educationComp,
                            subject:subject
                        }, { merge: true })
                            .then(function () {
                                // for testing purposes
                                alert("Profile creation done");

                                // update main profile data
                                user.updateProfile({
                                    displayName: name,
                                }).then(function () {

                                    // enter home page
                                    location.href = '/home';


                                }).catch(function (error) {
                                    // an error occured
                                });
                            });
                    }).catch(function (error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // [START_EXCLUDE]
                        if (errorCode === 'auth/wrong-password') {
                            alert('Wrong password.');
                        } else {
                            alert(errorMessage);
                        }
                        console.log(error);
                        document.getElementById('quickstart-sign-in').disabled = false;
                        // [END_EXCLUDE]
                    });
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
                // [END_EXCLUDE]
            });
        // [END createwithemail]

        // } else {

        //     // testing
        //     alert('email must end with @gmail.com');
        // }


    }
}

$(document).ready(function () {
    $("#yes-button").click(clickYes);
    $("#no-button").click(clickNo);
})


function clickYes() {
    $('#student').show();
    $('#submit').show();
    $('#not-student').hide();


}

function clickNo() {
    $('#not-student').show();
    $('#submit').show();
    $('#student').hide();
}
