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
    let sch = db.collection("schedules/")
    sch.orderBy("time").onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            // When a schedule is added, add it to this page
            if (change.type === "added") {
                let h2 = $("<h2></h2>").html("Reminder");
                let h3 = $("<h3></h3>").html("Just a reminder that you have a meeting at this time!");
                let title = $("<p></p>").html("Title: " + change.doc.data().title);
                let date = $("<p></p>").html("Time: " + change.doc.data().date + " " + change.doc.data().start + "~" + change.doc.data().end);
                let str = change.doc.data().user == firebase.auth().currentUser.uid? change.doc.data().name : change.doc.data().username;
                let name = $("<p></p>").html("Meeting with: " + str)
                let box = $("<div></div>").attr("class", "card sche").append(h2, h3, title, date, name);
                let inner = $("<div></div>").append(box)
                let container = $("<div></div>").attr("id", change.doc.id).append(inner)
                if (change.doc.data().user == firebase.auth().currentUser.uid || change.doc.data().nameid == firebase.auth().currentUser.uid) {
                    $("#rightcolumn").append(container)
                }

            }
            // When a schedule is removed, remove it from this page
            if (change.type === "removed") {
                $("#" + change.doc.id).remove();
            }
        })
        // Show the number of schedules this user has
        $("#count").html($(".sche").length)
        // Show the no schedule prompt when user has 0 schedules
        if ($(".sche").length==0){
            $("#prompt").show();
        } else {
            $("#prompt").hide();
        }
    })


}
/**
 * Show the user's profile picture.
 */
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