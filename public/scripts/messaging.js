$("#bot").css({
    "display": "block",
    "width": "100%",
    "position": "absolute",
    "bottom": "0"
})
$("#sch").css({
    "display": "block"
})

$("#textbox").css({
    "width": "80%"
})

$("#send").css({
    "width": "15%",
    "position": "absolute",
    "right": "0"
})

firebase.auth().onAuthStateChanged(function (user) {
    $("#send").click(function () {
        console.log("1");
        let str = document.querySelector("#textbox").value;
        document.getElementById("chat").innerHTML += user.displayName + ": " + str + "<br>";
        document.querySelector("#textbox").value = "";
    });
})