db.collection("posts/").get().then(function (snap) {
    snap.forEach(function (doc) {
        let title = doc.data().title;
        let targetUserName = doc.data().username;
        let targetUser = doc.data().user;
        let grade = doc.data().grade;
        let subject = doc.data().subject;
        let date = doc.data().date;
        let detail = doc.data().details;
        let card = document.createElement("div");
        card.setAttribute("class", "card bg-light text-black mx-3 my-2");
        let box = document.createElement("div");
        box.setAttribute("class", "card-body");
        let p1 = document.createElement("h4");
        p1.innerHTML = title;
        box.appendChild(p1);
        let p2 = document.createElement("p");
        p2.innerHTML = subject + ", Grade " + grade;
        box.appendChild(p2);
        let p3 = document.createElement("p");
        p3.innerHTML = detail;
        box.appendChild(p3);
        let p4 = document.createElement("p");
        p4.innerHTML = targetUserName;
        box.appendChild(p4);
        let p5 = document.createElement("p");
        p5.innerHTML = date;

        box.appendChild(p5);
        let btn = document.createElement("button");
        btn.innerHTML = "Message";
        btn.onclick = function () {
            localStorage.setItem("poster", targetUser);
            localStorage.setItem("posterName", targetUserName);

            let currentUser = firebase.auth().currentUser.uid;
            let chatrooms = db.collection("chatrooms");
            let exist = false;
            chatrooms.get().then((querySnap) => {
                querySnap.forEach(function (doc) {
                    let u1 = doc.data().user1;
                    let u2 = doc.data().user2;
                    // var arr = doc.data().users;
                    // console.log(arr);
                    console.log(targetUser);
                    console.log(currentUser);
                    console.log(currentUser == u1)
                    console.log(targetUser == u2)
                    let con1 = currentUser == u1;
                    let con2 = currentUser == u2;
                    let con3 = targetUser == u1;
                    let con4 = targetUser == u2;
                    console.log(!((con1 && con4) || (con2 && con3)))
                    if (((con1 && con4) || (con2 && con3))){
                        exist = true;
                    }
                    
                    // if (!((arr[0] == targetUser && arr[1] == currentUser) || (arr[1] == targetUser && arr[0] == currentUser))) {
                    //     // if() {
                    //         chatrooms.add({
                    //             users: [currentUser, targetUser],
                    //             // user1: currentUser,
                    //             // user1name: getUserName(),
                    //             // user2: targetUser,
                    //             // user2name: targetUserName
                    //         }).then(function() {
                    //             db.collection("users/").doc(targetUser).update({
                    //                 chatrooms: firebase.firestore.FieldValue.arrayUnion(doc.id)
                    //             });
                    //         });
    
                            
    
                    //         // db.collection("users/").doc(currentUser).update({
                    //         //     chatrooms: firebase.firestore.FieldValue.arrayUnion(doc.id)
                    //         // });
                    //     // }
                    // } 
                })
                if (!exist){
                    chatrooms.add({
                        user1: currentUser,
                        user2: targetUser

                    })
                    .then(function(docRef){
                        db.collection("users/").doc(targetUser).update({
                            chatrooms: firebase.firestore.FieldValue.arrayUnion(docRef.id)
                        })
                        
                        db.collection("users/").doc(currentUser).update({
                            chatrooms: firebase.firestore.FieldValue.arrayUnion(docRef.id)
                        })

                    })

                }
            });

            

            // alert("memes")
            // db.firestore().collection('messages').add({
            //     name: getUserName(),
            //     text: messageText,
            //     timestamp: db.firestore.FieldValue.serverTimestamp()
            // }).catch(function (error) {
            //     console.error('Error writing new message to database', error);
            // });

           window.location.href = "messaging.html";
        }
        box.appendChild(btn);
        card.appendChild(box);
        document.body.appendChild(card);
        //     let card = "<div class='card bg-light text-black mx-3 my-2'>\
        //     <div class='card-body'>\
        //       <h4 class='card-title'>" + title + "</h4><hr/>\
        //       <span class='card-text'>" + subject + " " + grade + "</span>\
        //       <p class='card-text'>" + detail + "</p>\
        //       <p class='card-text'> posted by " + userName + "</p>\
        //       <p class='card-text'>" + date + "</p>\
        //       <button class='btn btn-primary' onclick = 'localStorage.setItem(\'poster\', user);window.location.href=\'messaging.html\''>Message</button>\
        //     </div>\
        //   </div>";
        //   $("#posts-dat").append(card);
    })
});