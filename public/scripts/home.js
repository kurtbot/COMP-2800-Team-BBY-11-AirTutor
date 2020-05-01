function showName() {
    firebase.auth().onAuthStateChanged(function (user) {
        document.getElementById("username").innerHTML = user.displayName;
    });
}

function showMeetings() {
    firebase.auth().onAuthStateChanged(function (user) {

    });
}

function showPosts() {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("schedules/").get().then(function (snap) {
            snap.forEach(function (doc) {
                if (doc.data().user == user.uid) {
                    let box = document.createElement("div");
                    let hr = document.createElement("hr");
                    document.body.appendChild(hr);
                    let date = document.createElement("p");
                    date.innerHTML = "Date: " + doc.data().date;
                    box.appendChild(date);
                    let start = document.createElement("p");
                    start.innerHTML = "Start time: " + doc.data().start;
                    box.appendChild(start);
                    let end = document.createElement("p");
                    end.innerHTML = "End time: " + doc.data().end;
                    box.appendChild(end);
                    let title = document.createElement("p");
                    title.innerHTML = "Title: " + doc.data().title;
                    box.appendChild(title);
                    let name1 = document.createElement("p");
                    name1.innerHTML = "Participant 1: " + doc.data().name;
                    box.appendChild(name1);
                    let name2 = document.createElement("p");
                    name2.innerHTML = "Participant 2: " + doc.data().username;
                    box.appendChild(name2);
                    let btn = document.createElement("button");
                    btn.innerHTML = "Join Session";
                    btn.onclick = function () {
                        window.location.href = "session.html"
                    }
                    box.appendChild(btn)
                    document.body.appendChild(box);
                    document.body.appendChild(hr);
                }
            })
        })
    })
}
