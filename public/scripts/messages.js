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
                    let docRef = db.collection("users/").doc(n2);
                    docRef.get().then(function(docc){
                        name.innerHTML = docc.data().firstName + docc.data().lastName;
                    })
                    
                } else {
                    let docRef = db.collection("users/").doc(n1);
                    docRef.get().then(function(docc){
                        name.innerHTML = docc.data().firstName + docc.data().lastName;

                     })
                }
                link.onclick = function(){
                    localStorage.setItem("roomID", doc.id);
                    if (doc.data().user1 == user.uid){
                        let docRef = db.collection("users/").doc(n2);
                        docRef.get().then(function(docc){
                         localStorage.setItem("teach", docc.data().userID)
                         localStorage.setItem("teacher", docc.data().firstName + " " + docc.data().lastName)
                        }).then(function(){
                            window.location.href = "messaging.html";
                        })
                        
                    } else {
                        let docRef = db.collection("users/").doc(n1);
                        docRef.get().then(function(docc){
                            name.innerHTML = docc.data().firstName + docc.data().lastName;
                             localStorage.setItem("teach", docc.data().userID)
                             localStorage.setItem("teacher", docc.data().firstName + " " + docc.data().lastName)
                         }).then(function(){
                            window.location.href = "messaging.html";
                        })
                    }
                    
                }
                container.appendChild(name);
                container.appendChild(link);
                document.querySelector("#msgs").appendChild(container);
            }
        })
    })
})