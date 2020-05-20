//timer to prevent overpurchase of credits
const timer = 3000;
//locks buttons when false
let clickable = true;

$(document).ready(function () {
    /**
     * Buys 500 credits on click.
     */
    $("#buy-5").click(function () {
        if (clickable) {
        purchase(buy5())
        clickable = false;
        setTimeout(function () {
            clickable = true;
        }, timer);
    }
    });

    /**
     * Buys 1100 credits on click.
     */
    $("#buy-10").click(function () {
        if (clickable) {
            purchase(buy10())
            clickable = false;
            setTimeout(function () {
                clickable = true;
            }, timer);
        }
    });

    /**
     * Buys 2300 credits on click.
     */
    $("#buy-20").click(function () {
        if (clickable) {
            purchase(buy20())
            clickable = false;
            setTimeout(function () {
                clickable = true;
            }, timer);
        }
    });

    /**
     * Buys 6000 credits on click.
     */
    $("#buy-50").click(function () {
        if (clickable) {
            purchase(buy50())
            clickable = false;
            setTimeout(function () {
                clickable = true;
            }, timer);
        }
    });
})



/**
 * Adds credits to the user's account and displays a success message on purchase. While the 
 * message is displayed the buy buttons are disabled.
 * @param {*} amount 
 *          functiont that writes a numerical value to the database 
 *          and prints the amount added.
 */
function purchase(amount) {

        $("#success").text("You have successfully purchased " + amount + " credits");
        $("#success").show().delay(timer).fadeOut('slow');

}

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
