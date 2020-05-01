function showName() {
    firebase.auth().onAuthStateChanged(function (user) {
        document.getElementById("username").innerHTML = user.displayName;
    });
}

function showMeetings() {
    firebase.auth().onAuthStateChanged(function (user) {

    });
}

showName();
showPosts();

function showPosts() {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("schedules/").get().then(function (snap) {
            snap.forEach(function (doc) {
                if (doc.data().user == user.uid || doc.data().nameid == user.uid) {
                    let box = document.createElement("div");
                    let h2 = document.createElement("h2");
                    h2.innerHTML = "Reminder";
                    box.appendChild(h2);
                    let h3 = document.createElement("h3");
                    h3.innerHTML = "Just a reminder that you have a meeting at this time!"
                    box.appendChild(h3);
                    let title = document.createElement("p");
                    title.innerHTML = "Title: " + doc.data().title;
                    box.appendChild(title);
                    let date = document.createElement("p");
                    date.innerHTML = "Time: " + doc.data().date + " " + doc.data().start + "~" + doc.data().end;
                    box.appendChild(date);
                    let name = document.createElement("p");
                    let str = "";
                    if (doc.data().user == user.uid){
                        str = doc.data().name
                    } else {
                        str = doc.data().username
                    }
                    name.innerHTML = "Meeting with: " + str;
                    box.appendChild(name);
                    document.body.appendChild(box);
                    let hr = document.createElement("hr");
                    document.body.appendChild(hr);
                }
            })
        })
    })
}
