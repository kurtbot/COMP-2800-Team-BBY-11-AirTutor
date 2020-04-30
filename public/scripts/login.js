function login() {

    var email = document.getElementById('emailField').value;
    var password = document.getElementById('passwordField').value;

    if (email && password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function () {
                location.href = 'home.html';
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                // window.alert('Error : ' + errorMessage);
                // document.getElementById('loginHelp').innerText = 'Error : ' + errorMessage;
                // ...
            });
    }

}

