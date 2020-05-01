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
                    let container = document.createElement("div");
                    // container.style.display = "flex";
                    // container.style.flexDirection = "column";
                    // container.style.backgroundColor = "black"
                    let inner = document.createElement("div");
                    // inner.setAttribute("class", "leftcolumn");
                    let box = document.createElement("div");
                    box.setAttribute("class", "card");
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
                    inner.appendChild(box);
                    container.appendChild(inner);
                    document.querySelector("#home-content").appendChild(container);
                }
            })
        })
    })
}
