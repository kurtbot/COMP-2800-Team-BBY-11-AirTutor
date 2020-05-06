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
$("#sch").hide();


firebase.auth().onAuthStateChanged(function (user) {
    let roomID;
    roomID = localStorage.getItem("roomID");
    console.log(localStorage.getItem("roomID"));
    console.log(user.uid)
    console.log(db.collection("chatrooms/").doc(roomID).studentid)

    db.collection("chatrooms/").doc(roomID).get().then(function(docc){
        localStorage.setItem("teach", docc.data().tutorid)
        localStorage.setItem("teacher", docc.data().tutorname)
        if (user.uid == docc.data().studentid){
            $("#sch").show();
        }
    })




db.collection("chatrooms/").doc(roomID).collection("messages").get().then(function (snap) { snap.forEach(function (doc) {
        document.getElementById("chat").innerHTML += doc.data().senderName + ": " + doc.data().message + "<br>";
     })});

    $("#send").click(function () {

        //localStorage.removeItem("roomID");
        console.log(roomID);
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDay();
        let hour = d.getHours();
        let minute = d.getMinutes();
        let date = year + "-" + month + "-" + day + " " + hour + ":" + minute;

        let str = document.querySelector("#textbox").value;
        document.getElementById("chat").innerHTML += user.displayName + ": " + str + "<br>";
        document.querySelector("#textbox").value = "";
        db.collection('chatrooms').doc(roomID).collection("messages").add({
            message: str,
            senderID: firebase.auth().currentUser.uid,
            senderName: user.displayName,
            timestamp: date,
            actualTime: d
        })

    });
})