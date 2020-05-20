// Display all existing chatrooms when document is ready
$(document).ready(loadMessages);
/**
 * Read through the database for chatrooms.
 */
function loadMessages(){
    let chat = db.collection("chatrooms/");
    chat.orderBy("latest").onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            // Add the chatroom when it's created or modified
            if (change.type === "added" || change.type === "modified") {
                // Read and save required data from the database
                let roomID = change.doc.id;
                let tutorid = change.doc.data().tutorid;
                let studentid = change.doc.data().studentid;
                let tutor = change.doc.data().tutorname;
                let student = change.doc.data().studentname;
                let unreadtutor = change.doc.data().unreadtutor;
                let unreadstudent = change.doc.data().unreadstudent;
                let topicstr = change.doc.data().topic;
                let latestTime = change.doc.data().latestTime;
                let requestid = change.doc.data().requestid;
  
                createMessage(roomID, tutorid, studentid, tutor, student, unreadtutor, unreadstudent, topicstr, latestTime, requestid)
            }
            // Remove the chatroom if it's deleted from the database
            if (change.type === "removed") {
                $("#" + change.doc.id).remove();
            }
        })
        console.log($("b").length)
        if ($("b").length == 0){
            $("#nomsg").show()
        } else {
            $("#nomsg").hide()
        }
    });
    
}
/**
 * Create the elements for this chatroom div and add them into the div.
 * @param {*} roomID the chatroom's doc id
 * @param {*} tutorid this chatroom's tutor's user id
 * @param {*} studentid this chatroom's student's user id
 * @param {*} tutor this chatroom's tutor name
 * @param {*} student this chatroom's student name
 * @param {*} unreadtutor if the tutor has not read the latest message
 * @param {*} unreadstudent if the student has not read the latest message
 * @param {*} topicstr topic of the post that led to this chat
 * @param {*} latestTime sent time of the latest message in this room
 * @param {*} requestid doc id of the post that led to this chat
 */
function createMessage(roomID, tutorid, studentid, tutor, student, unreadtutor, unreadstudent, topicstr, latestTime, requestid){    
    let str = tutorid == firebase.auth().currentUser.uid? student : tutor;
    let name = $("<b></b>").html("User: " + str).css({
        "display": "inline-block",
        "width": "20%",
        "margin-left": "3%",
    })
    let topic = $("<span></span>").html("Topic: " + topicstr).css({
        "display": "inline-block",
        "width": "40%"
    })
    let msgtime = $("<span></span>").html(latestTime).css({
        "display": "inline-block",
        "width": "30%"
    })
    let del = $("<input type=image>").click(function () {deleteChat(roomID)}).attr("src", "./src/no.png").css({
        "position": "absolute",
        "right": "20px",
        "width": "20px",
        "height": "20px"
    });
    let inner = $("<div></div>").css({
        "display": "inline"
    }).click(function () {
        localStorage.setItem("roomID", roomID);
        localStorage.setItem("requestID", requestid);
        window.location.href = "/messaging";
    }).append(name, topic, msgtime)
    let container = $("<div></div>").attr("id", roomID).css({
        "border": "#EEEEEE solid 1px",
        "padding": "5px"
    }).hover(
        function () {
            $(this).addClass("hover");
        },
        function () {
            $(this).removeClass("hover");
        }
    ).append(inner, del)
    includeMessage(studentid, tutorid, roomID, unreadstudent, unreadtutor, container)
}

/**
 * Delete this chatroom.
 * @param {*} roomID the chatroom's id
 */
function deleteChat(roomID){
    if (
        confirm(
            "Are you sure you want to delete this chat and all its history? (It will be deleted for the other user too)"
        )
        ) {
            db.collection("chatrooms").doc(roomID).collection("messages").get().then(function (snap) {
                snap.forEach(function (docc) {
                    db.collection("chatrooms").doc(roomID).collection("messages").doc(docc.id).delete();
                });
            });
            db.collection("chatrooms").doc(roomID).delete();
        }
}

/**
 * Add this chatroom div onto the page if the user is one of the chatroom participants
 * @param {*} studentid the chatroom's student's user id
 * @param {*} tutorid the chatroom's tutor's user id
 * @param {*} roomID the chatroom's id
 * @param {*} unreadstudent if the student has not read the latest message
 * @param {*} unreadtutor if the tutor has not read the latest message
 * @param {*} container div containing this chatroom on the page
 */
function includeMessage(studentid, tutorid, roomID, unreadstudent, unreadtutor, container){
    let user = firebase.auth().currentUser.uid;
    // Check if this user is one of the chatroom's participants
    if (studentid == user || tutorid == user) {
        if (firebase.auth().currentUser.uid == studentid) {
            if (unreadstudent) {
                unreadMessage(container)
            }
        } else {
            if (unreadtutor) {
                unreadMessage(container)
            }
        }
        // If this chat already exists on the page, remove it (so it can be added on top after)
        if ($("#" + roomID)){
            $("#" + roomID).remove();
        }
        $("#msgs").prepend(container);
    }
}

/**
 * CSS the chatroom if it has unread messages.
 * @param {*} container 
 */
function unreadMessage(container){
    $(container).css({
        "background-color": "lightblue",
    });
}