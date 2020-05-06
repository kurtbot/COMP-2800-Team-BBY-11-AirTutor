$("#date").html(localStorage.getItem("date"));
$("#start").html(localStorage.getItem("start"));
$("#end").html(localStorage.getItem("end"));
$("#title").html(localStorage.getItem("title"));
$("#name").html(localStorage.getItem("name"));
$("#credit").html(localStorage.getItem("credit"));

$("#back").click(function(){
    window.location.href="/schedule";
})
firebase.auth().onAuthStateChanged(function (user) {
$("#confirm").click(function(){
    let promise = db.collection("schedules").add({
        date: localStorage.getItem("date"),
        start: localStorage.getItem("start"),
        end: localStorage.getItem("end"),
        title: localStorage.getItem("title"),
        credit: localStorage.getItem("credit"),
        name: user.displayName,
        user: localStorage.getItem("teach"),
        username:localStorage.getItem("name"),
        nameid: user.uid
    })
    promise.then(function(){
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
        localStorage.removeItem("teacher")
        window.location.href="/messaging";
    })

})
})