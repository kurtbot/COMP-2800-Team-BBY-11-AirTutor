let postsOrder = db.collection("posts/");
postsOrder.orderBy("time").onSnapshot(function (snapshot) {
  snapshot.docChanges().forEach(function (change) {
    if (change.type === "added") {
      let post = change.doc.id;
      let posttopic = change.doc.data().title;
      let title = change.doc.data().title;
      let targetUserName = change.doc.data().studentname;
      let targetUser = change.doc.data().studentid;
      let grade = change.doc.data().grade;
      let subject = change.doc.data().subject;
      let date = change.doc.data().date;
      let detail = change.doc.data().details;
      let card = document.createElement("div");
      card.setAttribute("id", post);
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

      let btnbox = $("<div></div>");
      btnbox.css({
        "display":"flex",
        "justify-content":"space-between"
      })
      let btn = document.createElement("button");
      btn.innerHTML = "Message";
      btn.onclick = function () {
        let d = new Date();
        localStorage.setItem("studentid", targetUser);
        localStorage.setItem("studentname", targetUserName);

        let currentUser = firebase.auth().currentUser.uid;
        let currentUserName = firebase.auth().currentUser.displayName;
        localStorage.setItem("tutorid", currentUser);
        localStorage.setItem(
          "tutorname",
          firebase.auth().currentUser.displayName
        );

        let chatrooms = db.collection("chatrooms");
        let exist = false;
        chatrooms.get().then((querySnap) => {
          querySnap.forEach(function (doc) {
            let u1 = doc.data().tutorid;
            let u2 = doc.data().studentid;
            let q = doc.data().requestid;
            if (u1 == currentUser && u2 == targetUser && q == post) {
              exist = true;
              localStorage.setItem("roomID", doc.id);
              localStorage.setItem("requestID", doc.data().requestid);
            }
          });
          if (!exist) {
            chatrooms
              .add({
                tutorid: currentUser,
                studentid: targetUser,
                tutorname: currentUserName,
                studentname: targetUserName,
                requestid: post,
                topic: posttopic,
                time: d,
              })
              .then(function (docRef) {
                db.collection("users/")
                  .doc(targetUser)
                  .update({
                    chatrooms: firebase.firestore.FieldValue.arrayUnion(
                      docRef.id
                    ),
                  });

                db.collection("users/")
                  .doc(currentUser)
                  .update({
                    chatrooms: firebase.firestore.FieldValue.arrayUnion(
                      docRef.id
                    ),
                  });
                localStorage.setItem("roomID", docRef.id);
                localStorage.setItem("requestID", post);
              })
              .then(function () {
                window.location.href = "/messaging";
              });
          } else {
            window.location.href = "/messaging";
          }
        });
      };

      $(btnbox).append($(btn))

      if (firebase.auth().currentUser.uid == change.doc.data().studentid){
        let del = $("<button>Delete</button>")

        $(del).click(function(){
          if (confirm("Are you sure you want to delete this post?")){
          
          
            db.collection("posts").doc(change.doc.id).delete()

          }
        })
        $(btnbox).append($(del))
        $(btn).css({
          "visibility":"hidden"
        })

      }




      $(box).append($(btnbox))
      card.appendChild(box);
      $("#posts-dat").prepend(card);
    }
    if (change.type === "removed") {
      $("#" + change.doc.id).remove();
    }
  });
});

$("#filter").click(function () {
  let filtersubject = $("#subjectchoice").val();

  console.log(filtersubject);
  $(".card").remove();
  let postsOrder = db.collection("posts/");
  postsOrder.orderBy("time").onSnapshot(function (snapshot) {
    snapshot.docChanges().forEach(function (change) {
      if (change.type === "added") {
        let post = change.doc.id;
        let posttopic = change.doc.data().title;
        let title = change.doc.data().title;
        let targetUserName = change.doc.data().studentname;
        let targetUser = change.doc.data().studentid;
        let grade = change.doc.data().grade;
        let subject = change.doc.data().subject;
        let date = change.doc.data().date;
        let detail = change.doc.data().details;
        let card = document.createElement("div");
        card.setAttribute("id", post);
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
        let btnbox = $("<div></div>");
        btnbox.css({
          "display":"flex",
          "justify-content":"space-between"
        })
        let btn = document.createElement("button");
        btn.innerHTML = "Message";
        btn.onclick = function () {
          let d = new Date();
          localStorage.setItem("studentid", targetUser);
          localStorage.setItem("studentname", targetUserName);

          let currentUser = firebase.auth().currentUser.uid;
          let currentUserName = firebase.auth().currentUser.displayName;
          localStorage.setItem("tutorid", currentUser);
          localStorage.setItem(
            "tutorname",
            firebase.auth().currentUser.displayName
          );

          let chatrooms = db.collection("chatrooms");
          let exist = false;
          chatrooms.get().then((querySnap) => {
            querySnap.forEach(function (doc) {
              let u1 = doc.data().tutorid;
              let u2 = doc.data().studentid;
              let q = doc.data().requestid;
              if (u1 == currentUser && u2 == targetUser && q == post) {
                exist = true;
                localStorage.setItem("roomID", doc.id);
              }
            });
            if (!exist) {
              chatrooms
                .add({
                  tutorid: currentUser,
                  studentid: targetUser,
                  tutorname: currentUserName,
                  studentname: targetUserName,
                  requestid: post,
                  topic: posttopic,
                  time: d,
                })
                .then(function (docRef) {
                  db.collection("users/")
                    .doc(targetUser)
                    .update({
                      chatrooms: firebase.firestore.FieldValue.arrayUnion(
                        docRef.id
                      ),
                    });

                  db.collection("users/")
                    .doc(currentUser)
                    .update({
                      chatrooms: firebase.firestore.FieldValue.arrayUnion(
                        docRef.id
                      ),
                    });
                  localStorage.setItem("roomID", docRef.id);
                })
                .then(function () {
                  window.location.href = "/messaging";
                });
            } else {
              window.location.href = "/messaging";
            }
          });
        };
        $(btnbox).append($(btn))

        if (firebase.auth().currentUser.uid == change.doc.data().studentid){
          let del = $("<button>Delete</button>")
  
          $(del).click(function(){
            if (confirm("Are you sure you want to delete this post?")){
            
            
              db.collection("posts").doc(change.doc.id).delete()
  
            }
          })
          $(btnbox).append($(del))
          $(btn).css({
            "visibility":"hidden"
          })

        }
  
  
  
  
        $(box).append($(btnbox))
        if ((filtersubject == subject) || (filtersubject == "All"  ||  (filtersubject == "My Posts" && firebase.auth().currentUser.uid == change.doc.data().studentid))) {

          card.appendChild(box);
          if (!document.getElementById(post)){
          $("#posts-dat").prepend(card);
          }
        }
      }
      if (change.type === "removed") {
        $("#" + change.doc.id).remove();
      }
    });
  });
});
