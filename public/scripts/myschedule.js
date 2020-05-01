firebase.auth().onAuthStateChanged(function (user) {
db.collection("schedules/").get().then(function (snap) {
    snap.forEach(function(doc) {
        if (doc.data().user == user.uid || doc.data().nameid == user.uid){


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
        let name = document.createElement("span");
        let str = "";
        if (doc.data().user == user.uid){
            str = doc.data().name
        } else {
            str = doc.data().username
        }
        name.innerHTML = "Meeting with: " + str + " ";
        box.appendChild(name);


        let btn1 = document.createElement("button");
        btn1.innerHTML = "View User";
        btn1.onclick = function(){
            if (doc.data().user == user.uid){
                localStorage.setItem("viewing", doc.data().nameid);
            } else {
                localStorage.setItem("viewing", doc.data().user);
            }

            window.location.href = "viewprofile.html";
        }
        box.appendChild(btn1);

        let br = document.createElement("br");
        box.appendChild(br);
        let btn = document.createElement("button");
        btn.innerHTML = "Join Session";
        btn.onclick = function(){
            window.location.href = "session.html"
        }
        box.appendChild(btn)
        document.body.appendChild(box);
        document.body.appendChild(hr);
        }
    })
    })
})