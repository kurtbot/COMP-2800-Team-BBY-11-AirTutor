function signIn() {
    // alert('TODO: Implement Google Sign-In');
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
}

function initFirebaseAuth() {
    // TODO 3: Initialize Firebase.
    firebase.auth().onAuthStateChanged(function (user) {
        if(!!firebase.auth().currentUser) {
            window.location.href = '/home';
        }
    });
}

initFirebaseAuth();