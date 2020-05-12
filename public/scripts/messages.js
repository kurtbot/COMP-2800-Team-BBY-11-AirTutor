firebase.auth().onAuthStateChanged(function (user) {
    let chat = db.collection("chatrooms/");
    chat.orderBy("latest").onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            if (change.type === "added" || change.type === "modified") {
            if (change.doc.data().studentid == user.uid || change.doc.data().tutorid == user.uid) {
                let n1 = change.doc.data().tutorid;
                console.log(n1)
                let n2 = change.doc.data().studentid;
                let container = document.createElement("div");
                container.setAttribute("id", change.doc.id);
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


                let name = document.createElement("b");
                $(name).css({
                    "display":"inline-block",
                    "width":"30%",
                    "margin-left":"3%"
                })
                let topic = document.createElement("span");
                topic.innerHTML = "Topic: " +  change.doc.data().topic;
                $(topic).css({
                    "display":"inline-block",
                    "width":"30%"
                })
                let msgtime = document.createElement("span")
                msgtime.innerHTML = change.doc.data().latestTime
                if (change.doc.data().tutorid == user.uid){
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
                    localStorage.setItem("roomID", change.doc.id);
                    localStorage.setItem("requestID", change.doc.data().requestid)
                    window.location.href="/messaging"

                    
                }
                container.appendChild(name);
                container.appendChild(topic);
                container.appendChild(msgtime)
                if (!document.getElementById(change.doc.id)){
                $("#msgs").prepend(container)
                } else {
                    $("#" + change.doc.id).remove();
                    $("#msgs").prepend(container)
                }
            }
        }
        if (change.type === "removed"){
            $("#" + change.doc.id).remove()
        }
        })
    })
})