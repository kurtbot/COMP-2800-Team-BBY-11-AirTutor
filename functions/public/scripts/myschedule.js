firebase.auth().onAuthStateChanged(function (user) {
  db.collection("schedules/")
    .get()
    .then(function (snap) {
      snap.forEach(function (doc) {
        if (doc.data().user == user.uid || doc.data().nameid == user.uid) {
          let test1 = new Date(2020, 4, 7, 12, 55);
          console.log(test1.getTime());
          let test2 = new Date();
          console.log(test2.getTime());

          let box = document.createElement("div");
          let hr = document.createElement("hr");
          document.body.appendChild(hr);
          let date = document.createElement("p");
          date.innerHTML = "Date: " + doc.data().date;
          box.appendChild(date);
          let start = document.createElement("p");
          start.innerHTML = "Start time: " + doc.data().start;
          box.appendChild(start);
          let end = document.createElement("p");
          end.innerHTML = "End time: " + doc.data().end;
          box.appendChild(end);
          let title = document.createElement("p");
          title.innerHTML = "Title: " + doc.data().title;
          box.appendChild(title);
          let name = document.createElement("span");
          let str = "";
          let year = doc.data().date.substring(0, 4);
          let month = doc.data().date.substring(5, 7);
          let day = doc.data().date.substring(8, 10);
          console.log(year + " " + month + " " + day);
          let hour = doc.data().start.substring(0, 2);
          let minute = doc.data().start.substring(3, 5);
          let AP = doc.data().start.substring(6, 8);
          if (hour == "12") {
            hour = "00";
          }
          if (AP == "PM") {
            hour = parseInt(hour) + 12;
          }
          console.log(hour + " " + minute);
          let stamp = new Date(year, month - 1, day, hour, minute);
          let check = stamp.getTime();
          console.log(check);
          if (doc.data().user == user.uid) {
            str = doc.data().name;
          } else {
            str = doc.data().username;
          }
          name.innerHTML = "Meeting with: " + str + " ";
          box.appendChild(name);

          let btn1 = document.createElement("button");
          btn1.innerHTML = "View User";
          btn1.onclick = function () {
            // if (doc.data().user == user.uid){
            //     localStorage.setItem("viewing", doc.data().nameid);
            // } else {
            //     localStorage.setItem("viewing", doc.data().user);
            // }
            if (doc.data().user == user.uid) {
              window.location.href = "/viewprofile" + "?" + doc.data().nameid;
            } else {
              window.location.href = "/viewprofile" + "?" + doc.data().user;
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
              let studentid = doc.data().nameid;
              let student = doc.data().name;
              let tutorid = doc.data().user;
              let tutor = doc.data().username;
              let request = doc.data().requestID;
              let credit = doc.data().credit;

              let sessionrooms = db.collection("sessionrooms");
              let exist = false;
              let u1;
              console.log(user.uid)
              console.log(u1)
              sessionrooms.get().then((querySnap) => {
                querySnap.forEach(function (doc) {
                  let q = doc.data().requestid;
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

            // if (doc.data().user == user.uid) {
            //     window.location.href = "/session" + "?" + doc.data().nameid;
            // } else {
            //     window.location.href = "/session" + "?" + doc.data().user;
            // }
          };
          box.appendChild(btn);
          document.body.appendChild(box);
          document.body.appendChild(hr);
        }
      });
    });
});
