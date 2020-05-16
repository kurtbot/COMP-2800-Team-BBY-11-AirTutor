let currentTime = new Date();

function loadRecentMessages() {
    let msgOrder = db.collection("livechat/");

    msgOrder.orderBy("actualTime").onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            if (change.type === "added") {
                if (change.doc.data().actualTime >= currentTime.getTime()){
                let promise = new Promise ((res, rej)=>{
                    let newcontent1 = change.doc.data().senderName
                    let newcontent2 = change.doc.data().timestamp
                    let newcontent3 = change.doc.data().message
                    let outerbox = $("<div></div>")
                    $(outerbox).css({
                        "display":"flex"
                    })
                    let newbox = $("<div></div>")
                    $(newbox).html("<b>" + newcontent1 + "</b>" + " " + newcontent2 + "<br>" + newcontent3)
                    $(newbox).css({
                        "display":"inline-block"
                    })
                    console.log(newbox)
                    if (firebase.auth().currentUser.uid == change.doc.data().senderID){
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

                    // $(".chat-log").html(
                    //     $(".chat-log").html() + newbox
                    //     );
                    $(outerbox).append($(newbox))
                    $(".chat-log").append($(outerbox))
                        res("success")
                })
                promise.then(function(){
                    setTimeout(function(){
                        db.collection("livechat").doc(change.doc.id).delete()
                    }, 1000)

                })
                   
                
                window.scrollTo(0,document.body.scrollHeight);
                }
                else {
                    db.collection("livechat").doc(change.doc.id).delete()
                }
            }

        })});
}

firebase.auth().onAuthStateChanged(function (user) {

    // Load recent messages
    loadRecentMessages();

    // Add button event
    $(".send-btn").click(function () {

        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDate();
        let hour = d.getHours();
        let minute = d.getMinutes();
        let date = year + "-" + month + "-" + day + " " + hour + ":" + minute;

        // check input
        let str = document.querySelector(".chat-input").value;
        let output = document.querySelector(".chat-log");

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


    });

});

firebase.auth().onAuthStateChanged(function (user) {
$(".chat-input").on('keyup', function (e) {
    if (e.keyCode === 13) {
        console.log("ahhhhh")
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDate();
        let hour = d.getHours();
        let minute = d.getMinutes();
        let date = year + "-" + month + "-" + day + " " + hour + ":" + minute;

        // check input
        let str = document.querySelector(".chat-input").value;
        let output = document.querySelector(".chat-log");

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
});
})