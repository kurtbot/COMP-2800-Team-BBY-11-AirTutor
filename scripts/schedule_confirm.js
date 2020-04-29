$("#date").html(localStorage.getItem("date"));
$("#start").html(localStorage.getItem("start"));
$("#end").html(localStorage.getItem("end"));
$("#title").html(localStorage.getItem("title"));
$("#name").html(localStorage.getItem("name"));


$("#back").click(function(){
    window.location.href="schedule.html";
})

$("#confirm").click(function(){
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
    window.location.href="home.html";
})
