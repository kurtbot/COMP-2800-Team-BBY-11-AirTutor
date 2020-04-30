$("#subject").html(localStorage.getItem("subject"));
$("#grade").html(localStorage.getItem("grade"));
$("#details").html(localStorage.getItem("details"));
$("#retitle").html(localStorage.getItem("retitle"));

$("#back").click(function(){
    window.location.href="request.html";
})

$("#confirm").click(function(){
    localStorage.removeItem("subject");
    localStorage.removeItem("grade");
    localStorage.removeItem("details");
    localStorage.removeItem("retitle");
    window.location.href="home.html";
})
