// Display all existing schedules when document is ready
$(document).ready(loadSchedule);
/**
 * Create the schedules.
 * Read through the database for schedules, and create them as cards to be displayed.
 */
function loadSchedule(){

  let sch = db.collection("schedules/");
  sch.orderBy("time").onSnapshot(function (snapshot) {
    snapshot.docChanges().forEach(function (change) {
      // When a schedule is added to the database, create a schedule on this page
      if (change.type === "added") {
        let check = change.doc.data().time;
        let scheduleid = change.doc.id;
        let studentid = change.doc.data().nameid;
        let student = change.doc.data().name;
        let tutorid = change.doc.data().user;
        let tutor = change.doc.data().username;
        let request = change.doc.data().requestID;
        let creditval = change.doc.data().credit;
        let chat = change.doc.data().chatroom;  
        let box = $("<div></div>").attr({"id":change.doc.id, "class":"card mx-3 my-2"}).css({
          "background-color": "rgb(154, 219, 250)",
          "color": "rgb(40, 59, 66)",
          "border": "5px ridge rgb(108, 202, 247)",
          "padding": "15px",
          "font-weight": "bold"
        });
        let date = $("<p></p>").html("Date: " + change.doc.data().date);
        let start = $("<p></p>").html("Start time: " + change.doc.data().start);
        let end = $("<p></p>").html("End time: " + change.doc.data().end);
        let title = $("<p></p>").html("Title: " + change.doc.data().title);
        let str = tutorid == firebase.auth().currentUser.uid? student : tutor
        let name = $("<p></p>").html("Meeting with: " + str);
        let role = tutorid == firebase.auth().currentUser.uid? $("<p>My Role: Tutor</p>") : $("<p>My Role: Student</p>");
        let credit = $("<p></p>").html("Credit: " + creditval);
        let btnbox = $("<div></div>").css({
          "display": "flex",
          "justify-content": "space-between"
        });
        let btn = $("<button></button>").html("Join Session").click(function(){join(check, scheduleid, studentid, student, tutorid, tutor, request, creditval, chat)})
        createSchedule(scheduleid, btnbox, btn, box, date, start, end, title, name, role, credit, tutorid, studentid);
 
      }
      // When a schedule is removed from the database, remove the schedule from this page
      if (change.type === "removed") {
        $("#" + change.doc.id).remove();
      }
    })
    console.log($(".card").length)
    if ($(".card").length == 0){
      $("#nosch").show();
    } else {
      $("#nosch").hide();
    }
  });
  

}

/**
 * When the Join Session button is clicked, check if it's meeting time yet.
 * If it is, allow the tutor to open a session room.
 * @param {*} check the meeting's scheduled starting time
 * @param {*} scheduleid the schedule's id
 * @param {*} studentid the student's user id
 * @param {*} student the student's name
 * @param {*} tutorid the tutor's user id
 * @param {*} tutor the tutor's name
 * @param {*} request the original post's id
 * @param {*} creditval the credit assigned for this meeting
 * @param {*} chat id of the chatroom that created schedule
 */
function join(check, scheduleid, studentid, student, tutorid, tutor, request, creditval, chat){
  let d = new Date();
  let checktime = d.getTime();
  // Check if current time is after meeting time
  if (checktime >= check) {
    // If current time is after meeting time, search for the database for a session room
    let exist = false;
    db.collection("sessionrooms").get().then((querySnap) => {
      querySnap.forEach(function (doc) {
        let q = doc.data().requestid;
        // If the session room exists, save the sessionID
        if (q == request) {
          exist = true;
          localStorage.setItem("sessionID", doc.id);
        }
      });
      if (!exist) {
        // If the session room doesn't exist and the user is the tutor, create a session room in the database
        if (firebase.auth().currentUser.uid == tutorid) {
          db.collection("sessionrooms").add({
            tutorid: tutorid,
            studentid: studentid,
            tutorname: tutor,
            studentname: student,
            requestid: request,
            time: d,
            credit: creditval,
            scheduleid: scheduleid,
            chatroom: chat,
            tutorCallId: "",
            studentCallId: ""
          })
          .then(function (docRef) {
            localStorage.setItem("sessionID", docRef.id);
          })
          .then(function () {
            // Redirect to newly created session room
            window.location.href =
              "/session" + "?" + localStorage.getItem("sessionID");
          });
          // If the session room doesn't exist and the user is the student, alert the user to let tutor start session room
        } else {
          window.alert("Let the tutor start the session room first!");
        }
      } else {
        // Redirect to existing session room
        window.location.href = "/session" + "?" + localStorage.getItem("sessionID");
      }
    });
  } else {
    // If current time is not after meeting time, alert to user it is not meeting time yet
    window.alert("It's not meeting time yet!");
  }
}

/**
 * If the current user is one of the participants in this scheduled meeting, append the schedule to this page.
 * @param {*} scheduleid the schedule's id
 * @param {*} btnbox flexbox for the buttons
 * @param {*} btn the Join Session button
 * @param {*} box the schedule card body
 * @param {*} date p element for meeting date
 * @param {*} start p element for meeting start time
 * @param {*} end p element for meeting end time
 * @param {*} title p element for meeting title
 * @param {*} name p elmeent for who the user is meeting
 * @param {*} role p element for user's role for this meeting, student or teacher
 * @param {*} credit p element for how much credit is assigned to the meeting
 * @param {*} tutorid tutor's user id
 * @param {*} studentid student's user id
 */
function createSchedule(scheduleid, btnbox, btn, box, date, start, end, title, name, role, credit, tutorid, studentid){
  // Delete button to remove the schedule
  let del = $("<button>Delete</button>").click(function () {
    if (
      confirm(
        "Are you sure you want to delete this schedule? (It will be deleted for the other user too)"
      )
    ) {
      db.collection("schedules").doc(scheduleid).delete();
    }
  });
  $(btnbox).append(btn, del);
  $(box).append(date, start, end, title, name, role, credit, btnbox)
  // Append this schedule to the page if the user is one of the meeting's participants
  if (
    tutorid == firebase.auth().currentUser.uid ||
    studentid == firebase.auth().currentUser.uid
  ) {
    $("#schedules").append($(box));
  }
}