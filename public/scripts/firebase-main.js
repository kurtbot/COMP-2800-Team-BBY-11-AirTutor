/**
 * Gets the current user of the app
 */
function getCurrentUser() {
    return firebase.auth().currentUser
}

/**
 * Get the user name of the current logged in user.
 */
function getUserName() {
    return firebase.auth().currentUser.displayName;
}

$(document).ready(function() {
    firebase.auth().onAuthStateChanged(function (user) {
        if(user == undefined)
            window.location.href = '/';
    })
})
