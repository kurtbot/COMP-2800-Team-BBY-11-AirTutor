function logout() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        location.href = '/index';
      }).catch(function(error) {
        // An error happened.
      });
}