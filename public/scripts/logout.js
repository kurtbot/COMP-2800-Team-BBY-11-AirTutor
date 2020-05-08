function logout() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        location.href = '/';
      }).catch(function(error) {
        // An error happened.
      });
}