firebase.auth().onAuthStateChanged(function (user) {
    db.collection("chatrooms/").get().then(function (snap) {
        snap.forEach(function (doc) {
            if (doc.data().studentid == user.uid || doc.data().tutorid == user.uid) {
                let n1 = doc.data().tutorid;
                console.log(n1)
                let n2 = doc.data().studentid;
                let container = document.createElement("div");
                $(container).css({
                    "border": "#EEEEEE solid 1px",
                    "padding": "5px",

                })
                $(container).hover(function(){
                    $(this).css({
                        "background-color":"#EEEEEE",
                        "box-shadow":"1px 2px #E2E2E2"
                    })
                }, function(){
                    $(this).css({
                        "background-color":"",
                        "box-shadow":""
                    })
                })

                //container.style.display = "grid";
                //container.style.gridTemplateColumn = "1fr 1fr"
                let name = document.createElement("b");
                $(name).css({
                    "display":"inline-block",
                    "width":"15%",
                    "margin-left":"3%"
                })
                let topic = document.createElement("span");
                topic.innerHTML = "Topic: " +  doc.data().topic;
                if (doc.data().tutorid == user.uid){
                    let docRef = db.collection("users/").doc(n2);
                    docRef.get().then(function(docc){
                        name.innerHTML = "User: " + docc.data().firstName + " " + docc.data().lastName;
                    })
                    
                } else {
                    let docRef = db.collection("users/").doc(n1);
                    docRef.get().then(function(docc){
                        name.innerHTML = "User: " +  docc.data().firstName + " " + docc.data().lastName;

                     })
                }
                container.onclick = function(){
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
                document.querySelector("#msgs").appendChild(container);
            }
        })
    })
})