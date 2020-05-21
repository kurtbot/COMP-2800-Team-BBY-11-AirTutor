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

/**
 * If the user is not logged in but trying to access a login required page, they will be redirected to index page.
 */
firebase.auth().onAuthStateChanged(function (user) {
    if(user == undefined)
        window.location.href = '/';
})

