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
        let sch = db.collection("schedules/")
          sch.orderBy("time").onSnapshot(function (snapshot) {
              snapshot.docChanges().forEach(function (change) {
                if (change.type === "added") {

      
                let container = document.createElement("div");
                let inner = document.createElement("div");
                let box = document.createElement("div");
                container.setAttribute("id", change.doc.id)
                box.setAttribute("class", "card");
                let h2 = document.createElement("h2");
                h2.innerHTML = "Reminder";
                box.appendChild(h2);
                let h3 = document.createElement("h3");
                h3.innerHTML = "Just a reminder that you have a meeting at this time!"
                box.appendChild(h3);
                let title = document.createElement("p");
                title.innerHTML = "Title: " + change.doc.data().title;
                box.appendChild(title);
                let date = document.createElement("p");
                date.innerHTML = "Time: " + change.doc.data().date + " " + change.doc.data().start + "~" + change.doc.data().end;
                box.appendChild(date);
                let name = document.createElement("p");
                let str = "";
                if (change.doc.data().user == firebase.auth().currentUser.uid){
                    str = change.doc.data().name
                } else {
                    str = change.doc.data().username
                }
                name.innerHTML = "Meeting with: " + str;
                box.appendChild(name);
                inner.appendChild(box);
                container.appendChild(inner);
                if (change.doc.data().user == firebase.auth().currentUser.uid || change.doc.data().nameid == firebase.auth().currentUser.uid){
                    $("#home-content").append($(container))
                    }
            
        }
              
      if (change.type === "removed") {
        $("#" + change.doc.id).remove();
      }
    }
    )
})
    
}