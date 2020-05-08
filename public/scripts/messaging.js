let roomID = queryResult();
console.log("Current Room ID: ", roomID);

function queryResult() {
    let queryString = decodeURIComponent(window.location.search);
    let queries = queryString.split("?");
    let id = queries[1];
    return id;
}

function initializeRoom(user) {
    roomID = localStorage.getItem("roomID");
    console.log(localStorage.getItem("roomID"));
    console.log(user.uid)
    console.log(db.collection("chatrooms/").doc(roomID).studentid)
    db.collection("chatrooms/").doc(roomID).get().then(function (docc) {
        if (user.uid == docc.data().studentid){
            $("#who").html(docc.data().tutorname)
        } else {
            $("#who").html(docc.data().studentname)
        }
        $("#what").html(docc.data().topic)
    })
}

function schedulingAllowed(user) {
    db.collection("chatrooms/").doc(roomID).get().then(function (docc) {
        localStorage.setItem("teach", docc.data().tutorid)
        localStorage.setItem("teacher", docc.data().tutorname)
        if (user.uid == docc.data().studentid) {
            $(".schedule-btn").show();
        }
    });
}

function loadRecentMessages() {
    let msgOrder = db.collection("chatrooms/").doc(roomID).collection("messages");
    // msgOrder.orderBy("actualTime").get().then(function (snap) {
    //     snap.forEach(function (doc) {
    //         $(".chat-log").html(
    //             $(".chat-log").html() + doc.data().senderName + ": " + doc.data().message + "<br>"
    //         );
    //     })
    // });
    msgOrder.orderBy("actualTime").onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            if (change.type === "added") {
                console.log("New city: ", change.doc.data());
                $(".chat-log").html(
                    $(".chat-log").html() + change.doc.data().senderName + ": " + change.doc.data().message + "<br>"
                );
                document.querySelector(".chat-window").scrollTop = document.querySelector(".chat-window").scrollHeight;
            }

            if (change.type === "removed") {
                console.log("Removed city: ", change.doc.data());
            }
        })});
}

firebase.auth().onAuthStateChanged(function (user) {

    // Create the chat room
    initializeRoom(user);

    // Check if users are allowed to create a schedule
    schedulingAllowed(user);

    // Load recent messages
    loadRecentMessages();

    // Add button event
    $(".send-btn").click(function () {
        //localStorage.removeItem("roomID");
        console.log(roomID);
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDay();
        let hour = d.getHours();
        let minute = d.getMinutes();
        let date = year + "-" + month + "-" + day + " " + hour + ":" + minute;

        // check input
        let str = document.querySelector(".chat-input").value;
        let output = document.querySelector(".chat-log");
        // udpate chat log
        // $(".chat-log").html(
        //     $(".chat-log").html() + user.displayName + ": " + str + "<br>"
        // );

        // remove input text
        $('.chat-input').val('');

        // add to database the sent chat
        db.collection('chatrooms').doc(roomID).collection("messages").add({
            message: str,
            senderID: firebase.auth().currentUser.uid,
            senderName: user.displayName,
            timestamp: date,
            actualTime: d
        });
        db.collection("chatrooms").doc(roomID).update({
            latest: d,
            latestTime: date
        })

    });

});

