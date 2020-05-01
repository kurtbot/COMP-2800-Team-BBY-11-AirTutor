function login() {

    var email = document.getElementById('emailLoginField').value;
    var password = document.getElementById('passwordLoginField').value;

    if (email && password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function () {
                location.href = 'home.html';
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                window.alert('Error : ' + errorMessage);
                // document.getElementById('loginHelp').innerText = 'Error : ' + errorMessage;
                // ...
            });
    }

}
