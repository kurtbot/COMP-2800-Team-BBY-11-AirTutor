function getUserName() {
    // TODO 5: Return the user's display name.
    return firebase.auth().currentUser.displayName;
}