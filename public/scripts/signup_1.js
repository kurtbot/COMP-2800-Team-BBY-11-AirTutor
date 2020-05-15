$('.signup-button').click(signInWithGoogle);

function signInWithGoogle() {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(function () {
            window.location.href = '/signup'
        })
}