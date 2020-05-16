/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("main-sidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("main-sidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

// ========================
// DEV TOOLS
// ========================

const auth = firebase.auth();

/**
 * Login using email and password
 * @param {String} email email
 * @param {String} password password 
 */
function loginAsDev(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(goToHome);
}

/**
 * Sign Up a student account
 * @param {String} firstName first name
 * @param {String} lastName last name
 * @param {String} email email
 * @param {String} password password
 */
function signUpAsDevStudent(firstName, lastName, email, password) {
    console.log('firstName: ', firstName);
    console.log('lastName: ', lastName);
    
    let data = {
        currency: 0,
        language: 'English',
        country: 'Canada',
        email: email,
        education: 'Middle School',
        grade: '8',

        firstName: firstName,
        lastName: lastName,
    }

    signUpEmailPass(email, password, data);
}

/**
 * Sign Up a tutor account
 * @param {String} firstName first name
 * @param {String} lastName last name
 * @param {String} email email
 * @param {String} password password
 */
function signUpAsDevTutor(firstName, lastName, email, password) {
    let data = {
        currency: 0,
        language: 'English',
        country: 'Canada',
        email: email,
        subject: 'Math',
        educationcompleted: 'Bachelor\'s Degree',

        firstName: firstName,
        lastName: lastName,
    }

    signUpEmailPass(email, password, data);
}

// Helper Functions

/**
 * Creates a new user then logs them in to the home page
 * @param {String} email email
 * @param {String} password password
 * @param {JSON} data user data fields
 */
function signUpEmailPass(email, password, data) {
    auth.createUserWithEmailAndPassword(email, password)
        .then(function () {

            // get curremt created user
            let user = firebase.auth().currentUser;
            let userDoc = db.collection('users').doc(user.uid);

            data['userID'] = user.uid;

            alert('setting up account')
            userDoc.set(data, { merge: true })
                .then(function () {
                    user.updateProfile({
                        displayName: data['firstName'] + ' ' + data['lastName'],
                    }).then(function() {
                        alert('logging in')
                        loginAsDev(email, password);
                    })
                }).catch(function (err) {
                    console.log(err);
                })

        })
}

/**
 * Change window location to home
 */
function goToHome() {
    window.location.href = '/home'
}