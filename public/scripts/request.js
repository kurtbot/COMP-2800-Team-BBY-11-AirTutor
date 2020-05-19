// If local storage already have the following info, display them
if (localStorage.getItem("subject") != null){
    $("#subject").val(localStorage.getItem("subject"));
}

if (localStorage.getItem("grade") != null){
    $("#grade").val(localStorage.getItem("grade"));
}

if (localStorage.getItem("details") != null){
    $("#details").val(localStorage.getItem("details"));
}

if (localStorage.getItem("retitle") != null){
    $("#retitle").val(localStorage.getItem("retitle"));
}

/**
 * Clicking cancel leaves the request page and goes back to home page
 */
$("#cancel").click(function(){
    window.location.href = "/home";
})

/**
 * Clicking submit leads to a confirmation page, where the entered info is displayed
 */
$("#submit").click(function(){
    // Check if title and details (required fields) are filled
    let condition1 = $("#retitle").val().trim();
    let condition2 = $("#details").val().trim();
    if (condition1 && condition2){
        // Get these values from the input fields and save them into local storage to be displayed on confirmation page
        localStorage.setItem("subject", $("#subject").val());
        localStorage.setItem("grade", $("#grade").val());
        localStorage.setItem("details", $("#details").val());
        localStorage.setItem("retitle", $("#retitle").val());
        // Go to confirmation page
        window.location.href="/request_confirm";
    // Alert user to fill the required fields if they are not filled
    } else {
        showMissing(condition1, condition2)
        alert("Please fill out the required fields")
    }
});

/**
 * Turn the missing required field red.
 * @param {*} condition1 if the title field is filled
 * @param {*} condition2 if the details field is filled
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