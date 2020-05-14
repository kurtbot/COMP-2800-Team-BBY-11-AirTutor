//firebase.auth().onAuthStateChanged(function (user) {
    let chat = db.collection("chatrooms/");
    chat.orderBy("latest").onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            if (change.type === "added" || change.type === "modified") {

                let n1 = change.doc.data().tutorid;
                let n2 = change.doc.data().studentid;
                let container = document.createElement("div");
                container.setAttribute("id", change.doc.id);
                let inner = $("<div></div>")
                $(inner).css({
                    "display":"inline"
                })
                $(container).css({
                    "border": "#EEEEEE solid 1px",
                    "padding": "5px",

                })
                $(container).hover(function(){
                    $(this).addClass("hover")
                }, function(){
                    $(this).removeClass("hover")
                })


                let name = document.createElement("b");
                $(name).css({
                    "display":"inline-block",
                    "width":"20%",
                    "margin-left":"3%"
                })
                let topic = document.createElement("span");
                topic.innerHTML = "Topic: " +  change.doc.data().topic;
                $(topic).css({
                    "display":"inline-block",
                    "width":"40%"
                })
                let msgtime = document.createElement("span")
                msgtime.innerHTML = change.doc.data().latestTime
                $(msgtime).css({
                    "display":"inline-block",
                    "width":"30%"
                })
                if (change.doc.data().tutorid == firebase.auth().currentUser.uid){
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

                let del = $("<input type=image>")

                $(del).click(function(){
                  if (confirm("Are you sure you want to delete this chat and all its history? (It will be deleted for the other user too)")){
                  
                  
                    db.collection("chatrooms").doc(change.doc.id).delete()
        
                  }
                })

                //if ($(window).width() > 550){
                    $(del).attr("src", "./src/no.png")

                    $(del).css({
                        "position":"absolute",
                        //"background":"url('/src/no.png')",
                        "right":"20px",
                        "border":"none",
                        "width":"20px",
                        "height":"20px",
                    })
                //}

                $(inner).click(function(){
                    localStorage.setItem("roomID", change.doc.id);
                    localStorage.setItem("requestID", change.doc.data().requestid)
                    window.location.href="/messaging"
                })

                $(inner).append($(name))
                $(inner).append($(topic))
                $(inner).append($(msgtime))
                $(container).append($(inner))
                $(container).append(del)
                if (change.doc.data().studentid == firebase.auth().currentUser.uid || change.doc.data().tutorid == firebase.auth().currentUser.uid) {
                if (!document.getElementById(change.doc.id)){
                    if (firebase.auth().currentUser.uid == change.doc.data().studentid){
                        if (change.doc.data().unreadstudent){
                            $(container).css({
                                "background-color":"lightblue"
                            })
                        }
        
                    } else {
                        if (change.doc.data().unreadtutor){
                            $(container).css({
                                "background-color":"lightblue"
                            })
                        }
                    }
                $("#msgs").prepend(container)

                } else {
                    if (firebase.auth().currentUser.uid == change.doc.data().studentid){
                        if (change.doc.data().unreadstudent){
                            $(container).css({
                                "background-color":"lightblue"
                            })
                        }
        
                    } else {
                        if (change.doc.data().unreadtutor){
                            $(container).css({
                                "background-color":"lightblue"
                            })
                        }
                    }
                    $("#" + change.doc.id).remove();

                    $("#msgs").prepend(container)
                }
            }
            
        }
        if (change.type === "removed"){
            console.log("reeeeee")
            $("#" + change.doc.id).remove()
        }
        })
    })
//})