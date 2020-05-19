$(document).ready(function(){
    showName();
    showSchedules();
    showImage();
});

/**
 * Display the user's full name in a welcome message
 */
function showName() {
    firebase.auth().onAuthStateChanged(function (user) {
        document.getElementById("username").innerHTML = user.displayName;
    });
}

/**
 * Show the list of scheduled meetings this user has as a reminder.
 */
function showSchedules() {
    let n = 0;
    let sch = db.collection("schedules/")
    sch.orderBy("time").onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            if (change.type === "added") {
                let h2 = $("<h2></h2>").html("Reminder");
                let h3 = $("<h3></h3>").html("Just a reminder that you have a meeting at this time!");
                let title = $("<p></p>").html("Title: " + change.doc.data().title);
                let date = $("<p></p>").html("Time: " + change.doc.data().date + " " + change.doc.data().start + "~" + change.doc.data().end);
                let str = change.doc.data().user == firebase.auth().currentUser.uid? change.doc.data().name : change.doc.data().username;
                let name = $("<p></p>").html("Meeting with: " + str)
                let box = $("<div></div>").attr("class", "card").append(h2, h3, title, date, name);
                let inner = $("<div></div>").append(box)
                let container = $("<div></div>").attr("id", change.doc.id).append(inner)
                if (change.doc.data().user == firebase.auth().currentUser.uid || change.doc.data().nameid == firebase.auth().currentUser.uid) {
                    $("#rightcolumn").append(container)
                    n++;
                }

            }

            if (change.type === "removed") {
                $("#" + change.doc.id).remove();
                n--;
            }
        }
        )
        console.log(n)
        $("#count").html(n)
        if (n==0){
            $("#prompt").show();
        } else {
            $("#prompt").hide();
        }
    })


}

function showImage() {
    firebase.auth().onAuthStateChanged(function (user) {
        const dbref = db.collection("users/").doc(user.uid)
        
        dbref.get()
            .then(snap => {
                let picture = snap.data().profilePic;

                if (picture != "" && picture != undefined) {
                    $("#profilePic").attr({"src": picture, "width": "200px"});
                }

            })

    })

}