$("#subject").html(localStorage.getItem("subject"));
$("#grade").html(localStorage.getItem("grade"));
$("#details").html(localStorage.getItem("details"));

$("#back").click(function(){
    window.location.href="request.html";
})

$("#confirm").click(function(){
    localStorage.removeItem("subject");
    localStorage.removeItem("grade");
    localStorage.removeItem("details");
    window.location.href="home.html";
})
