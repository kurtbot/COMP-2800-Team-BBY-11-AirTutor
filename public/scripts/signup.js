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
                            subject: subject
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

        /* Email link authentication*/
        var actionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be whitelisted in the Firebase Console.
            url: 'https://airtutormvp.web.app/',
            // This must be true.
            handleCodeInApp: true,
            iOS: {
                bundleId: 'com.example.ios' //not applicable
            },
            android: {
                packageName: 'com.example.android', //not applicable
                installApp: true,
                minimumVersion: '12'
            },
            dynamicLinkDomain: 'example.page.link' //not applicable
        };

        var email = document.getElementById('emailSignupField').value;

        firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
            .then(function () {
                // The link was successfully sent. Inform the user.
                // Save the email locally so you don't need to ask the user for it again
                // if they open the link on the same device.
                window.localStorage.setItem('emailForSignIn', email);
            })
            .catch(function (error) {
                // Some error occurred, you can inspect the code: error.code
            });


        // Confirm the link is a sign-in with email link.
        if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
            // Additional state parameters can also be passed via URL.
            // This can be used to continue the user's intended action before triggering
            // the sign-in operation.
            // Get the email if available. This should be available if the user completes
            // the flow on the same device where they started it.
            var email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                // User opened the link on a different device. To prevent session fixation
                // attacks, ask the user to provide the associated email again. For example:
                email = window.prompt('Please provide your email for confirmation');
            }
            // The client SDK will parse the code from the link for you.
            firebase.auth().signInWithEmailLink(email, window.location.href)
                .then(function (result) {
                    // Clear email from storage.
                    window.localStorage.removeItem('emailForSignIn');
                    // You can access the new user via result.user
                    // Additional user info profile not available via:
                    // result.additionalUserInfo.profile == null
                    // You can check if the user is new or existing:
                    // result.additionalUserInfo.isNewUser
                })
                .catch(function (error) {
                    // Some error occurred, you can inspect the code: error.code
                    // Common errors could be invalid email and invalid or expired OTPs.
                });
        }
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