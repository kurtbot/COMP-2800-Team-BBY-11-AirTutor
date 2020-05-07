let postsOrder = db.collection("posts/")
postsOrder.orderBy("time", "desc").get().then(function (snap) {
    snap.forEach(function (doc) {
        let post = doc.id;
        let posttopic = doc.data().title;
        let title = doc.data().title;
        let targetUserName = doc.data().studentname;
        let targetUser = doc.data().studentid;
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
            let d = new Date();
            localStorage.setItem("studentid", targetUser);
            localStorage.setItem("studentname", targetUserName);


            let currentUser = firebase.auth().currentUser.uid;
            let currentUserName = firebase.auth().currentUser.displayName;
            localStorage.setItem("tutorid", currentUser);
            localStorage.setItem("tutorname", firebase.auth().currentUser.displayName)

            let chatrooms = db.collection("chatrooms");
            let exist = false;
            chatrooms.get().then((querySnap) => {
                querySnap.forEach(function (doc) {
                    let u1 = doc.data().tutorid
                    let u2 = doc.data().studentid;
                    let q = doc.data().requestid
                    if ((u1 == currentUser && u2 == targetUser && q == post)){
                        exist = true;
                        localStorage.setItem("roomID", doc.id);
                    }
                    
                })
                if (!exist){
                    chatrooms.add({
                        tutorid: currentUser,
                        studentid: targetUser,
                        tutorname: currentUserName,
                        studentname: targetUserName,
                        requestid: post,
                        topic: posttopic,
                        time: d


                    })
                    .then(function(docRef){
                        db.collection("users/").doc(targetUser).update({
                            chatrooms: firebase.firestore.FieldValue.arrayUnion(docRef.id)
                        })

                        db.collection("users/").doc(currentUser).update({
                            chatrooms: firebase.firestore.FieldValue.arrayUnion(docRef.id)
                        })
                        localStorage.setItem("roomID", docRef.id);
                    }).then(function(){
                        window.location.href = "/messaging";
                    })

                } else {
                    window.location.href = "/messaging";
                }
               
            })
                    
                
                    
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

$("#filter").click(function(){
    let filtersubject = $("#subjectchoice").val();
    
    console.log(filtersubject)
    $(".card").remove()
    let postsOrder = db.collection("posts/")
postsOrder.orderBy("time", "desc").get().then(function (snap) {
snap.forEach(function (doc) {
let post = doc.id;
let posttopic = doc.data().title;
let title = doc.data().title;
let targetUserName = doc.data().studentname;
let targetUser = doc.data().studentid;
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
let d = new Date();
localStorage.setItem("studentid", targetUser);
localStorage.setItem("studentname", targetUserName);


let currentUser = firebase.auth().currentUser.uid;
let currentUserName = firebase.auth().currentUser.displayName;
localStorage.setItem("tutorid", currentUser);
localStorage.setItem("tutorname", firebase.auth().currentUser.displayName)

let chatrooms = db.collection("chatrooms");
let exist = false;
chatrooms.get().then((querySnap) => {
    querySnap.forEach(function (doc) {
        let u1 = doc.data().tutorid
        let u2 = doc.data().studentid;
        let q = doc.data().requestid
        if ((u1 == currentUser && u2 == targetUser && q == post)){
            exist = true;
            localStorage.setItem("roomID", doc.id);
        }
        
    })
    if (!exist){
        chatrooms.add({
            tutorid: currentUser,
            studentid: targetUser,
            tutorname: currentUserName,
            studentname: targetUserName,
            requestid: post,
            topic: posttopic,
            time: d


        })
        .then(function(docRef){
            db.collection("users/").doc(targetUser).update({
                chatrooms: firebase.firestore.FieldValue.arrayUnion(docRef.id)
            })

            db.collection("users/").doc(currentUser).update({
                chatrooms: firebase.firestore.FieldValue.arrayUnion(docRef.id)
            })
            localStorage.setItem("roomID", docRef.id);
        }).then(function(){
            window.location.href = "/messaging";
        })

    } else {
        window.location.href = "/messaging";
    }
   
})
        
    
        
}

if (filtersubject == subject | filtersubject == "All"){
box.appendChild(btn);
card.appendChild(box);
document.body.appendChild(card);
}

})
});
})