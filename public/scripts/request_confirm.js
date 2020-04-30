$("#subject").html(localStorage.getItem("subject"));
$("#grade").html(localStorage.getItem("grade"));
$("#details").html(localStorage.getItem("details"));
$("#retitle").html(localStorage.getItem("retitle"));

$("#back").click(function(){
    window.location.href="request.html";
})

$("#confirm").click(function(){
    let promise = db.collection("posts").add({
        title: localStorage.getItem("retitle"),
        subject: localStorage.getItem("subject"),
        grade: localStorage.getItem("grade"),
        details: localStorage.getItem("details"),
        user: "placeholder"
    })
    promise.then(function(){
        localStorage.removeItem("subject");
        localStorage.removeItem("grade");
        localStorage.removeItem("details");
        localStorage.removeItem("retitle");
        window.location.href="home.html";
    })

})
