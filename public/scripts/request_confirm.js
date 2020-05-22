// Display the info user entered on request page
$("#subject").html(localStorage.getItem("subject"));
$("#grade").html(localStorage.getItem("grade"));
$("#details").html(localStorage.getItem("details"));
$("#retitle").html(localStorage.getItem("retitle"));

/**
 * Clicking back leads user back to request page
 */
$("#back").click(function(){
    window.location.href="/request";
})

firebase.auth().onAuthStateChanged(function (user) {
    /**
     * Clicking confirm saves this request into the database
     */
    $("#confirm").click(function(){
        // Get the time when the request is posted
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDate();
        let hour = d.getHours();
        let minute = d.getMinutes();
        let date = year + "-" + month + "-" + day + " " + hour + ":" + minute;
        // Save this request into the database
        let promise = db.collection("posts").add({
            title: localStorage.getItem("retitle"),
            subject: localStorage.getItem("subject"),
            grade: localStorage.getItem("grade"),
            details: localStorage.getItem("details"),
            studentid: user.uid,
            studentname: user.displayName,
            time: d,
            date: date
        })
        // Remove saved data of this request from local storage and go to post page
        promise.then(function(){
            localStorage.removeItem("subject");
            localStorage.removeItem("grade");
            localStorage.removeItem("details");
            localStorage.removeItem("retitle");
            window.location.href="/post";
        })
    })
})