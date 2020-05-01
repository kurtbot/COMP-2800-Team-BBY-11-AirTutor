let successMessage =  document.getElementById("success");
let credit500 = document.getElementById("buy-5");
let credit1100 = document.getElementById("buy-10");
let credit2300 = document.getElementById("buy-20");
let credit6000 = document.getElementById("buy-50");

/**
 * Buys 500 credits on click.
 */
credit500.onclick = function(){
    successMessage.innerHTML = "You have successfully purchased " + buy5() + " credits";
};

/**
 * Buys 1100 credits on click.
 */
credit1100.onclick = function(){
    successMessage.innerHTML = "You have successfully purchased " + buy10() + " credits";
};

/**
 * Buys 2300 credits on click.
 */
credit2300.onclick = function(){
    successMessage.innerHTML = "You have successfully purchased " + buy20() + " credits";
};

/**
 * Buys 6000 credits on click.
 */
credit6000.onclick = function(){
    successMessage.innerHTML = "You have successfully purchased " + buy50() + " credits";
};


/**
 * Adds 500 credits to the account.
 * @return the number of credits added to the account as a number.
 */
function buy5() {
    const credit = 500;
    addCredit(credit);
    return credit;
}
/**
 * Adds 1100 credits to the account.
 * @return the number of credits added to the account as a number.
 */
function buy10() {
    const credit = 1100;
    addCredit(credit);
    return credit;
}
/**
 * Adds 2300 credits to the account.
 * @return the number of credits added to the account as a number.
 */
function buy20() {
    const credit = 2300;
    addCredit(credit);
    return credit;
}
/**
 * Adds 6000 credits to the account.
 * @return the number of credits added to the account as a number.
 */
function buy50() {
    const credit = 6000;
    addCredit(credit);
    return credit;
}

/**
 * Writes the amount added to the users database.
 * @param amount 
 *      the amount added to the account.
 */
function addCredit(amount) {
    firebase.auth().onAuthStateChanged(function (user) {
        let increment = firebase.firestore.FieldValue.increment(amount);
        let dbref = db.collection("users/").doc(user.uid);
        dbref.update({
            currency: increment
        })
    })
}
