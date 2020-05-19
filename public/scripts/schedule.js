// Get current date
let d = new Date();
let month = d.getMonth() + 1 + "";
let day = d.getDate() + "";
console.log(day)
let year = d.getFullYear();

if (month.length == 1){
    month = "0" + month;
}

if (day.length == 1){
    day = "0" + day;
}
// Set the datepicker's value as current date
$("#date").val(year + "-" + month + "-" + day);
// Set the tutor name as tutor named passed from local storage
$("#name").val(localStorage.getItem("teacher"));

// If local storage already have the following info, display them
if (localStorage.getItem("date") != null){
    $("#date").val(localStorage.getItem("date"));
}

if (localStorage.getItem("startHour") != null){
    $("#start-hour").val(localStorage.getItem("startHour"));
}

if (localStorage.getItem("startMinute") != null){
    $("#start-minute").val(localStorage.getItem("startMinute"));
}

if (localStorage.getItem("startAP") != null){
    $("#start-ap").val(localStorage.getItem("startAP"));
}

if (localStorage.getItem("endHour") != null){
    $("#end-hour").val(localStorage.getItem("endHour"));
}

if (localStorage.getItem("endMinute") != null){
    $("#end-minute").val(localStorage.getItem("endMinute"));
}

if (localStorage.getItem("endAP") != null){
    $("#end-ap").val(localStorage.getItem("endAP"));
}

if (localStorage.getItem("title") != null){
    $("#title").val(localStorage.getItem("title"));
}

if (localStorage.getItem("name") != null){
    $("#name").val(localStorage.getItem("name"));
}

if (localStorage.getItem("credit") != null){
    $("#credit").val(localStorage.getItem("credit"));
}

/**
 * Clicking cancel leaves the schedule page and goes back to messaging page
 */
$("#cancel").click(function(){
    window.location.href = "/messaging";
})

/**
 * Clicking submit leads to a confirmation page, where the entered info is displayed
 */
$("#submit").click(function(){
    // Check if date and title (required fields) are filled
    let condition1 = $("#date").val().trim();
    let condition2 = $("#title").val().trim();
    if (condition1 && condition2){
        // Get the start and end time of the meeting
        let startHour = $("#start-hour").val();
        let startMinute = $("#start-minute").val();
        let startAP = $("#start-ap").val();
        let start = startHour + ":" + startMinute + " " + startAP;
        let endHour = $("#end-hour").val();
        let endMinute = $("#end-minute").val();
        let endAP = $("#end-ap").val();
        let end = endHour + ":" + endMinute + " " + endAP;
        goConfirm(startHour, startMinute, startAP, start, endHour, endMinute, endAP, end);
    // Alert user to fill the required fields if they are not filled
    } else {
        showMissing(condition1, condition2)
        alert("Please fill out the required fields")
    }
});
/**
 * Save the values into local storage to be displayed on confirmation page
 * @param {*} startHour starting hour of meeting
 * @param {*} startMinute starting minute of meeting
 * @param {*} startAP starting time - AM or PM for meeting
 * @param {*} start starting time
 * @param {*} endHour ending hour of meeting
 * @param {*} endMinute ending minute of meeting
 * @param {*} endAP ending time - AM or PM for meeting
 * @param {*} end ending time
 */
function goConfirm(startHour, startMinute, startAP, start, endHour, endMinute, endAP, end){
    localStorage.setItem("date", $("#date").val());
    localStorage.setItem("startHour", startHour);
    localStorage.setItem("startMinute", startMinute);
    localStorage.setItem("startAP", startAP);
    localStorage.setItem("start", start);
    localStorage.setItem("endHour", endHour);
    localStorage.setItem("endMinute", endMinute);
    localStorage.setItem("endAP", endAP);
    localStorage.setItem("end", end);
    localStorage.setItem("title", $("#title").val());
    localStorage.setItem("name", $("#name").val());
    localStorage.setItem("credit", $("#credit").val());
    // Go to confirmation page
    window.location.href="/schedule_confirm";
}

/**
 * Turn the missing required field red.
 * @param {*} condition1 if the date field is filled
 * @param {*} condition2 if the title field is filled
 */
function showMissing(condition1, condition2){
    if (!condition1){
        $("#require1").css({
            "color":"red"
        })
    } else {
        $("#require1").css({
            "color":"black"
        })
    }
    if (!condition2){
        $("#require2").css({
            "color":"red"
        })
    } else {
        $("#require2").css({
            "color":"black"
        })
    }
}