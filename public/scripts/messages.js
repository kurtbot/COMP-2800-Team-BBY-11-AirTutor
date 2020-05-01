firebase.auth().onAuthStateChanged(function (user) {
    db.collection("chatrooms/").get().then(function (snap) {
        snap.forEach(function (doc) {
            if (doc.data().user1 == user.uid || doc.data().user2 == user.uid) {
                let n1 = doc.data().user1;
                let n2 = doc.data().user2;
                let container = document.createElement("div");
                let name = document.createElement("h4");
                let link = document.createElement("button");
                link.innerHTML = "view";
                if (doc.data().user1 == user.uid){
                   // name.innerHTML = db.collection("users/").doc(n2).data().firstName + db.collection("users/").doc(n2).data().lastName
                    
                } else {
                   //name.innerHTML = db.collection("users/").doc(n1).data().firstName + db.collection("users/").doc(n1).data().lastName
                }
                link.onclick = function(){
                    localStorage.setItem("roomID", doc.id);
                    window.location.href = "messaging.html";
                }
                container.appendChild(name);
                container.appendChild(link);
                document.querySelector("#msgs").appendChild(container);
            }
        })
    })
})