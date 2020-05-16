//firebase.auth().onAuthStateChanged(function (user) {
  let sch = db.collection("schedules/")
  sch.orderBy("time").onSnapshot(function (snapshot) {
    snapshot.docChanges().forEach(function (change) {
      if (change.type === "added") {



          let box = document.createElement("div");
          box.setAttribute("id", change.doc.id)
          console.log(change.doc.id)
          console.log(box.id)
          box.setAttribute("class", "card mx-3 my-2")
          $(box).css({
            "background-color":"rgb(154, 219, 250)",
            "color":"rgb(40, 59, 66)",
            "border":"5px ridge rgb(108, 202, 247)",
            "padding":"15px",
            "font-weight":"bold"
          })
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
          let name = document.createElement("p");
          let str = "";

          let check = change.doc.data().time;

          if (change.doc.data().user == firebase.auth().currentUser.uid) {
            str = change.doc.data().name;
          } else {
            str = change.doc.data().username;
          }
          name.innerHTML = "Meeting with: " + str + " ";
          box.appendChild(name);

          let role;
          if (change.doc.data().user == firebase.auth().currentUser.uid) {
            role = $("<p>My Role: Tutor</p>")
          } else {
            role = $("<p>My Role: Student</p>")
          }

          $(box).append($(role))

          let credit = $("<p></p>").html("Credit: " + change.doc.data().credit)
          $(box).append($(credit))

          let br = document.createElement("br");
          box.appendChild(br);
          let btnbox = $("<div></div>")
          $(btnbox).css({
            "display":"flex",
            "justify-content":"space-between"
          })
          let btn = document.createElement("button");
          btn.innerHTML = "Join Session";
          btn.onclick = function () {
            //Check if it's meeting time
            let d = new Date();
            let checktime = d.getTime();

            if (check < checktime) {

              //*************
              let d = new Date();
              let scheduleid = change.doc.id;
              let studentid = change.doc.data().nameid;
              let student = change.doc.data().name;
              let tutorid = change.doc.data().user;
              let tutor = change.doc.data().username;
              let request = change.doc.data().requestID;
              let credit = change.doc.data().credit;

              let sessionrooms = db.collection("sessionrooms");
              let exist = false;
              let u1;
              sessionrooms.get().then((querySnap) => {
                querySnap.forEach(function (doc) {
                  let q = doc.data().requestid;
                  if (q == request) {
                    exist = true;
                    localStorage.setItem("sessionID", doc.id);

                  }
                });
                if (!exist) {
                  if (firebase.auth().currentUser.uid == tutorid) {
                    sessionrooms
                      .add({
                        tutorid: tutorid,
                        studentid: studentid,
                        tutorname: tutor,
                        studentname: student,
                        requestid: request,
                        time: d,
                        credit: credit,
                        scheduleid: scheduleid,
                        tutorCallId: '',
                        studentCallId: ''
                      })
                      .then(function (docRef) {
                        
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
          $(btnbox).append($(btn))

          let del = $("<button>Delete</button>")

          $(del).click(function(){
            if (confirm("Are you sure you want to delete this schedule? (It will be deleted for the other user too)")){
            
            
              db.collection("schedules").doc(change.doc.id).delete()
  
            }
          })
          $(btnbox).append($(del))



          $(box).append($(btnbox))


          if (change.doc.data().user == firebase.auth().currentUser.uid || change.doc.data().nameid == firebase.auth().currentUser.uid){
          $("#schedules").append($(box))
          }

        }
      
      if (change.type === "removed") {
        $("#" + change.doc.id).remove();
      }
    });


  });
//});
