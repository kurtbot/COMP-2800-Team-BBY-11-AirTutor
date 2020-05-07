firebase.auth().onAuthStateChanged(function (user) {
    db.collection("chatrooms/").get().then(function (snap) {
        snap.forEach(function (doc) {
            if (doc.data().studentid == user.uid || doc.data().tutorid == user.uid) {
                let n1 = doc.data().tutorid;
                console.log(n1)
                let n2 = doc.data().studentid;
                let container = document.createElement("div");
                let name = document.createElement("h4");
                let link = document.createElement("button");
                let topic = document.createElement("h6");
                topic.innerHTML = doc.data().topic;
                link.innerHTML = "view";
                if (doc.data().tutorid == user.uid){
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
                    localStorage.setItem("requestID", doc.data().requestid)
                    window.location.href="/messaging"
                    // if (doc.data().tutorid == user.uid){
                    //     let docRef = db.collection("users/").doc(n2);
                    //     docRef.get().then(function(docc){
                    //      localStorage.setItem("teach", docc.data().userID)
                    //      localStorage.setItem("teacher", docc.data().firstName + " " + docc.data().lastName)
                    //     }).then(function(){
                    //         window.location.href = "/messaging";
                    //     })
                        
                    // } else {
                    //     let docRef = db.collection("users/").doc(n1);
                    //     docRef.get().then(function(docc){
                    //         name.innerHTML = docc.data().firstName + docc.data().lastName;
                    //          localStorage.setItem("teach", docc.data().userID)
                    //          localStorage.setItem("teacher", docc.data().firstName + " " + docc.data().lastName)
                    //      }).then(function(){
                    //         window.location.href = "/messaging";
                    //     })
                    // }
                    
                }
                container.appendChild(name);
                container.appendChild(topic);
                container.appendChild(link);
                document.querySelector("#msgs").appendChild(container);
            }
        })
    })
})