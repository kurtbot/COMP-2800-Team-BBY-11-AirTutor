
/**
 * Load messages from the database.
 * Delete the message after reading and loading it, since database does not save live chat messages long-term.
 */
function loadRecentMessages() {
    let currentTime = new Date();
    let msgOrder = db.collection("livechat/");
    // Sort messages by time sent
    msgOrder.orderBy("actualTime").onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            if (change.type === "added") {
                // Check if the message is sent after the user opens live chat window
                if (change.doc.data().actualTime >= currentTime.getTime()){
                // Promise function to load the message
                let promise = new Promise ((res, rej)=>{
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
                    res("success")
                })
                // After message loading is complete, delete the message from database in 1 second
                promise.then(function(){
                    setTimeout(function(){
                        db.collection("livechat").doc(change.doc.id).delete()
                    }, 1000)

                })
                // Whenever a new message is added, scroll the screen to the bottom
                window.scrollTo(0,document.body.scrollHeight);
                }
                // If the message in database is sent before user opens this window (and is not deleted yet), delete it
                else {
                    db.collection("livechat").doc(change.doc.id).delete()
                }
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
            "background-color":"rgb(69, 223, 110)",
            "border":" rgb(69, 223, 110) solid 1px",
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
            "border":"rgb(237 237 237) solid 1px",
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
})

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
        db.collection('livechat').add({
            message: str,
            senderID: firebase.auth().currentUser.uid,
            senderName: user.displayName,
            timestamp: date,
            actualTime: d.getTime()
        });
    }
}