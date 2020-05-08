firebase.auth().onAuthStateChanged(function (user) {
  let sch = db.collection("schedules/")
    sch.orderBy("time").onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === "added") {
        if (change.doc.data().user == user.uid || change.doc.data().nameid == user.uid) {
          let test1 = new Date(2020, 4, 7, 12, 55);
          console.log(test1.getTime());
          let test2 = new Date();
          console.log(test2.getTime());

          let box = document.createElement("div");
          let hr = document.createElement("hr");
          document.body.appendChild(hr);
          let date = document.createElement("p");
          date.innerHTML = "Date: " + change.doc.data().date;
          box.appendChild(date);
          let start = document.createElement("p");
          start.innerHTML = "Start time: " + change.doc.data().start;
          box.appendChild(start);
          let end = document.createElement("p");
          end.innerHTML = "End time: " + change.doc.data().end;
          box.appendChild(end);
          let title = document.createElement("p");
          title.innerHTML = "Title: " + change.doc.data().title;
          box.appendChild(title);
          let name = document.createElement("span");
          let str = "";

          let check = change.doc.data().time;
          console.log(check);
          if (change.doc.data().user == user.uid) {
            str = change.doc.data().name;
          } else {
            str = change.doc.data().username;
          }
          name.innerHTML = "Meeting with: " + str + " ";
          box.appendChild(name);

          let btn1 = document.createElement("button");
          btn1.innerHTML = "View User";
          btn1.onclick = function () {
            // if (change.doc.data().user == user.uid){
            //     localStorage.setItem("viewing", change.doc.data().nameid);
            // } else {
            //     localStorage.setItem("viewing", change.doc.data().user);
            // }
            if (change.doc.data().user == user.uid) {
              window.location.href = "/viewprofile" + "?" + change.doc.data().nameid;
            } else {
              window.location.href = "/viewprofile" + "?" + change.doc.data().user;
            }
          };
          box.appendChild(btn1);

          let br = document.createElement("br");
          box.appendChild(br);
          let btn = document.createElement("button");
          btn.innerHTML = "Join Session";
          btn.onclick = function () {
            //Check if it's meeting time
            let d = new Date();
            let checktime = d.getTime();
            console.log(check);
            console.log(checktime);
            if (check < checktime) {
              console.log("ok");
              //*************
              let d = new Date();
              let studentid = change.doc.data().nameid;
              let student = change.doc.data().name;
              let tutorid = change.doc.data().user;
              let tutor = change.doc.data().username;
              let request = change.doc.data().requestID;
              let credit = change.doc.data().credit;

              let sessionrooms = db.collection("sessionrooms");
              let exist = false;
              let u1;
              console.log(user.uid)
              console.log(u1)
              sessionrooms.get().then((querySnap) => {
                querySnap.forEach(function (doc) {
                  let q = change.doc.data().requestid;
                  if (q == request) {
                    exist = true;
                    localStorage.setItem("sessionID", doc.id);
                    
                  }
                });
                if (!exist) {
                  if (user.uid == tutorid) {
                    sessionrooms
                      .add({
                        tutorid: tutorid,
                        studentid: studentid,
                        tutorname: tutor,
                        studentname: student,
                        requestid: request,
                        time: d,
                        credit: credit
                      })
                      .then(function (docRef) {
                        db.collection("users/")
                          .doc(tutorid)
                          .update({
                            sessionrooms: firebase.firestore.FieldValue.arrayUnion(
                              docRef.id
                            ),
                          });

                        db.collection("users/")
                          .doc(studentid)
                          .update({
                            sessioinrooms: firebase.firestore.FieldValue.arrayUnion(
                              docRef.id
                            ),
                          });
                        localStorage.setItem("sessionID", docRef.id);
                      })
                      .then(function () {
                        window.location.href = "/session" + "?" + localStorage.getItem("sessionID");
                      });
                  } else {
                    window.alert("Let the tutor start the session room first!");
                  }
                } else {
                  window.location.href = "/session" + "?" + localStorage.getItem("sessionID");
                }
              });
              //*************

            } else {
              window.alert("It's not meeting time yet!");
            }

            // if (change.doc.data().user == user.uid) {
            //     window.location.href = "/session" + "?" + change.doc.data().nameid;
            // } else {
            //     window.location.href = "/session" + "?" + change.doc.data().user;
            // }
          };
          box.appendChild(btn);
          document.body.appendChild(box);
          document.body.appendChild(hr);
        }
    }
      });
      
    });
});
