$("#subject").html(localStorage.getItem("subject"));
$("#grade").html(localStorage.getItem("grade"));
$("#details").html(localStorage.getItem("details"));
$("#retitle").html(localStorage.getItem("retitle"));

$("#back").click(function(){
    window.location.href="request.html";
})

firebase.auth().onAuthStateChanged(function (user) {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDay();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let date = year + "-" + month + "-" + day + " " + hour + ":" + minute;
$("#confirm").click(function(){
    let promise = db.collection("posts").add({
        title: localStorage.getItem("retitle"),
        subject: localStorage.getItem("subject"),
        grade: localStorage.getItem("grade"),
        details: localStorage.getItem("details"),
        user: user.uid,
        username: user.displayName,
        time: d,
        date: date
    })
    promise.then(function(){
        localStorage.removeItem("subject");
        localStorage.removeItem("grade");
        localStorage.removeItem("details");
        localStorage.removeItem("retitle");
        window.location.href="post.html";
    })

})
})