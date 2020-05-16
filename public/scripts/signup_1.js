$('.signup-button').click(signInWithGoogle);

function signInWithGoogle() {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(function () {

            var docRef = db.collection("users").doc(firebase.auth().currentUser.uid);

            docRef.get().then(function (doc) {
                if (doc.exists) {
                    window.location.href = '/home'
                } else {
                    window.location.href = '/signup'
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });

        });
}