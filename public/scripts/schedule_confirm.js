$("#date").html(localStorage.getItem("date"));
$("#start").html(localStorage.getItem("start"));
$("#end").html(localStorage.getItem("end"));
$("#title").html(localStorage.getItem("title"));
$("#name").html(localStorage.getItem("name"));


$("#back").click(function(){
    window.location.href="schedule.html";
})
firebase.auth().onAuthStateChanged(function (user) {
$("#confirm").click(function(){
    let promise = db.collection("schedules").add({
        date: localStorage.getItem("date"),
        start: localStorage.getItem("start"),
        end: localStorage.getItem("end"),
        title: localStorage.getItem("title"),
        name: user.displayName,
        user: localStorage.getItem("poster"),
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
        localStorage.removeItem("name");
        localStorage.removeItem("poster");
        localStorage.removeItem("posterName");
        localStorage.removeItem("reader");
        localStorage.removeItem("readerName");
        window.location.href="messaging.html";
    })

})
})