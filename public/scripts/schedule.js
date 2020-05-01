
let d = new Date();
let month = d.getMonth() + 1 + "";
let day = d.getDate();
let year = d.getFullYear();

if (month.length == 1){
    month = "0" + month;
}

if (day.length == 1){
    day = "0" + day;
}

$("#date").val(year + "-" + month + "-" + day);


$("#name").val(localStorage.getItem("posterName"));






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


$("#cancel").click(function(){
    window.location.href = "messaging.html";
})



$("#submit").click(function(){
    let startHour = $("#start-hour").val();
    let startMinute = $("#start-minute").val();
    let startAP = $("#start-ap").val();
    let start = startHour + ":" + startMinute + " " + startAP;
    
    let endHour = $("#end-hour").val();
    let endMinute = $("#end-minute").val();
    let endAP = $("#end-ap").val();
    let end = endHour + ":" + endMinute + " " + endAP;
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
    window.location.href="schedule_confirm.html";
});