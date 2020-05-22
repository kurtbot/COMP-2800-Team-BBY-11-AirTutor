// Display the info user entered on schedule page
$("#date").html(localStorage.getItem("date"));
$("#start").html(localStorage.getItem("start"));
$("#end").html(localStorage.getItem("end"));
$("#title").html(localStorage.getItem("title"));
$("#name").html(localStorage.getItem("name"));
$("#credit").html(localStorage.getItem("credit"));

/**
 * Clicking back leads user back to schedule page
 */
$("#back").click(function () {
    window.location.href = "/schedule";
})

firebase.auth().onAuthStateChanged(function (user) {
    /**
     * Clicking confirm saves this schedule into the database
     */
    $("#confirm").click(function () {
        // Get the starting time of this meeting
        let year = localStorage.getItem("date").substring(0, 4);
        let month = localStorage.getItem("date").substring(5, 7);
        let day = localStorage.getItem("date").substring(8, 10);
        let hour = localStorage.getItem("start").substring(0, 2);
        let minute = localStorage.getItem("start").substring(3, 5);
        let AP = localStorage.getItem("start").substring(6, 8);
        if (hour == "12") {
            hour = "00";
        }
        if (AP == "PM") {
            hour = parseInt(hour) + 12;
        }
        // Create timestamp for the starting time of this meeting
        let stamp = new Date(year, month - 1, day, hour, minute);
        let check = stamp.getTime();
        completeSchedule(user, check)

    });
});

/**
 * Complete creating a schedule.
 * @param {*} user logged in user
 * @param {*} check timestamp of meeting start time
 */
function completeSchedule(user, check){
    // Add this schedule into the database
    let promise = db.collection("schedules").add({
        date: localStorage.getItem("date"),
        start: localStorage.getItem("start"),
        end: localStorage.getItem("end"),
        title: localStorage.getItem("title"),
        credit: localStorage.getItem("credit"),
        name: user.displayName,
        user: localStorage.getItem("teach"),
        username: localStorage.getItem("name"),
        nameid: user.uid,
        requestID: localStorage.getItem("requestID"),
        time: check,
        chatroom: localStorage.getItem("roomID"),
    });
    // Remove saved data of this schedule from the database and go back to messaging page
    promise.then(function () {
        localStorage.removeItem("date");
        localStorage.removeItem("startHour");
        localStorage.removeItem("startMinute");
        localStorage.removeItem("startAP");
        localStorage.removeItem("start");
        localStorage.removeItem("endHour");
        localStorage.removeItem("endMinute");
        localStorage.removeItem("endAP");
        localStorage.removeItem("end");
        localStorage.removeItem("title");
        localStorage.removeItem("credit");
        localStorage.removeItem("name");
        localStorage.removeItem("teach");
        localStorage.removeItem("teacher");
        localStorage.removeItem("requestID");
        window.location.href = "/messaging";
    });
}