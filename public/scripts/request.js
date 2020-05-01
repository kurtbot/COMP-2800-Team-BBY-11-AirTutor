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

$("#cancel").click(function(){
    window.location.href = "home.html";
})


$("#submit").click(function(){
    localStorage.setItem("subject", $("#subject").val());
    localStorage.setItem("grade", $("#grade").val());
    localStorage.setItem("details", $("#details").val());
    localStorage.setItem("retitle", $("#retitle").val());
    window.location.href="request_confirm.html";

});


