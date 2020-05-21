// Get the chatroom ID from local storage
let roomID = localStorage.getItem("roomID");

/**
 * Initialize the chatroom, set up name of chatroom's other participant, a link to their profile, and the chatroom topic (from the post).
 * @param {*} user the logged in user
 */
function initializeRoom(user) {

    db.collection("chatrooms/").doc(roomID).get().then(function (docc) {
        if (user.uid == docc.data().studentid){
            $("#who").html(docc.data().tutorname)
            $("#namepic").click(function(){
                window.location.href = "/viewprofile" + "?" + docc.data().tutorid;
            })
        } else {
            $("#who").html(docc.data().studentname)
            $("#namepic").click(function(){
                window.location.href = "/viewprofile" + "?" + docc.data().studentid;
            })
        }
        $("#what").html(docc.data().topic)
    })

}

/**
 * Display the Schedule button if user is the student.
 * @param {*} user logged in user
 */
function schedulingAllowed(user) {
    db.collection("chatrooms/").doc(roomID).get().then(function (docc) {
        localStorage.setItem("teach", docc.data().tutorid)
        localStorage.setItem("teacher", docc.data().tutorname)
        if (user.uid == docc.data().studentid) {
            $(".schedule-btn").show();
        }
    });
}

/**
 * Load messages from the database.
 */
function loadRecentMessages() {
    let msgOrder = db.collection("chatrooms/").doc(roomID).collection("messages");
    // Sort messages by time sent
    msgOrder.orderBy("actualTime").onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            if (change.type === "added") {
                // The message's sender name, time, and content
                let newcontent1 = change.doc.data().senderName
                let newcontent2 = change.doc.data().timestamp
                let newcontent3 = change.doc.data().message

                let sender = change.doc.data().senderID
                let outerbox = $("<div></div>")
                $(outerbox).css({
                    "display":"flex"
                })
                let newbox = $("<div></div>")
                $(newbox).html("<b>" + newcontent1 + "</b>" + " " + newcontent2 + "<br>" + newcontent3)
                $(newbox).css({
                    "display":"inline-block"
                })
                // Create this message on the page
                createMessage(newbox, outerbox, sender)
                // Whenever a new message is added, scroll the screen to the bottom
                window.scrollTo(0,document.body.scrollHeight);
            }
        })
    });
}
/**
 * Create the new message.
 * @param {*} newbox message div containing the message content
 * @param {*} outerbox outer div containing the message div
 * @param {*} sender id of user that sent the message
 */
function createMessage(newbox, outerbox, sender){
    // CSS if this message is sent by this user
    if (firebase.auth().currentUser.uid == sender){
        $(newbox).css({
            "background-color":"#85b8cb",
            "border-radius":"10px",
            "margin":"3px",
            "padding":"5px",
            "color":"black"
        })
        $(outerbox).css({
            "justify-content":"flex-end"
        })
    // CSS if this message is sent by the other user
    } else {
        $(newbox).css({
            "background-color":"rgb(237 237 237)",
            "border-radius":"10px",
            "margin":"5px",
            "padding":"5px",
            "color":"black"
        })
        $(outerbox).css({
            "justify-content":"flex-start"
        })
    }
    $(outerbox).append($(newbox))
    $(".chat-log").append($(outerbox))
}

firebase.auth().onAuthStateChanged(function (user) {

    // Create the chat room
    initializeRoom(user);

    // Check if users are allowed to create a schedule
    schedulingAllowed(user);

    // Load recent messages
    loadRecentMessages();

    /**
     * When the Send button is clicked, write the message typed into the database.
     */
    $(".send-btn").click(function () {sendMessage(user)});

    /**
     * When the enter button is pressed in the input message box, write the message typed into the database.
     */
    $(".chat-input").keyup(function(event){
        // Determine if the key pressed is "Enter" (which has code 13)
        if (event.which == 13){
            sendMessage(user)
        }
    })
});
/**
 * Write the message typed in the input box into the database.
 * @param {*} user logged in user
 */
function sendMessage(user){
    // Only send the message if it's not empty or only white space
    if ($(".chat-input").val().trim()){
        // Get the time when the message is sent
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDate();
        let hour = d.getHours();
        let minute = d.getMinutes();
        let date = year + "-" + month + "-" + day + " " + hour + ":" + minute;

        // check input
        let str = document.querySelector(".chat-input").value;


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
        // add to database time of the most recent message
        db.collection("chatrooms").doc(roomID).update({
            latest: d,
            latestTime: date,
        })
        // turn the unread statue of the other participant to true
        db.collection("chatrooms").doc(roomID).get().then(function(doc){
            firebase.auth().onAuthStateChanged(function (user) {
            
                if (user.uid == doc.data().studentid){
                    db.collection("chatrooms").doc(roomID).update({
                        unreadtutor: true
                    })
                } else {
                    db.collection("chatrooms").doc(roomID).update({
                        unreadstudent: true
                    })
                }
            })
        })
    }
}

/**
 * Change the user's unread status to false when user clicks on the chat input box.
 */
$(".chat-input").focus(function(){
    db.collection("chatrooms").doc(roomID).get().then(function(doc){
        firebase.auth().onAuthStateChanged(function (user) {
        
            if (user.uid == doc.data().studentid){
                db.collection("chatrooms").doc(roomID).update({
                    unreadstudent: false
                })
            } else {
                db.collection("chatrooms").doc(roomID).update({
                    unreadtutor: false
                })
            }
        })
    })
})

