// Display all existing posts when document is ready
$(document).ready(loadPost);

// Display relevant posts when filtered
$("#filter").click(function () {
  $(".card").remove();
  loadPost();
});

/**
 * Create the posts.
 * Read through the database for posts, and create them as cards to be displayed.
 */
function loadPost() {
  let postsOrder = db.collection("posts/");
  postsOrder.orderBy("time").onSnapshot(function (snapshot) {
    snapshot.docChanges().forEach(function (change) {
      // When a post is added to the database, create a post on this page
      if (change.type === "added") {
        let post = change.doc.id;
        let posttopic = change.doc.data().title;
        let targetUserName = change.doc.data().studentname;
        let targetUser = change.doc.data().studentid;
        let subject = change.doc.data().subject;
        let card = $("<div></div>").attr({ id: post, class: "card mx-3 my-2" }).css({
          "background-color": "rgb(154, 219, 250)",
          "color": "rgb(40, 59, 66)",
          "border": "5px ridge rgb(108, 202, 247)",
          "font-weight":"bold"
        });
        let box = $("<div></div>").attr("class", "card-body");
        let p1 = $("<h4></h4>").html(posttopic);
        let p2 = $("<p></p>").html(subject + ", Grade " + change.doc.data().grade);
        let p3 = $("<p></p>").html(change.doc.data().details);
        let p4 = $("<p></p>").html(targetUserName);
        let p5 = $("<p></p>").html(change.doc.data().date);
        let btnbox = $("<div></div>").css({
          "display": "flex",
          "justify-content": "space-between"
        });
        let btn = $("<button></button>").html("Message").click(function () {clickbtn(post, posttopic, targetUserName, targetUser);});
        createPost(btnbox, btn, card, box, p1, p2, p3, p4, p5, targetUser, subject, post);
      }
      // When a post is removed from the database, remove the post from this page
      if (change.type === "removed") {
        $("#" + change.doc.id).remove();
      }
    });
  });
}

/**
 * When the Message button is clicked, redirect to the chatroom with the messaging target.
 * @param {*} post the post's document id
 * @param {*} posttopic the post's topic
 * @param {*} targetUserName the poster's name
 * @param {*} targetUser the poster's user id
 */
function clickbtn(post, posttopic, targetUserName, targetUser) {
  let d = new Date();
  localStorage.setItem("studentid", targetUser);
  localStorage.setItem("studentname", targetUserName);
  localStorage.setItem("tutorid",  firebase.auth().currentUser.uid);
  localStorage.setItem("tutorname", firebase.auth().currentUser.displayName);
  let exist = false;
  // Look for the chatroom between these two users on this post in the database.
  db.collection("chatrooms").get().then((querySnap) => {
    querySnap.forEach(function (doc) {
      let u1 = doc.data().tutorid;
      let u2 = doc.data().studentid;
      let q = doc.data().requestid;
      // If the chatroom exists, save its roomID and requestid (the post's id).
      if (u1 == firebase.auth().currentUser.uid && u2 == targetUser && q == post) {
        exist = true;
        localStorage.setItem("roomID", doc.id);
        localStorage.setItem("requestID", doc.data().requestid);
      }
    });
    // If the chatroom does not exist, create it in the database.
    if (!exist) {
      db.collection("chatrooms").add({
        tutorid:  firebase.auth().currentUser.uid,
        studentid: targetUser,
        tutorname: firebase.auth().currentUser.displayName,
        studentname: targetUserName,
        requestid: post,
        topic: posttopic,
        time: d
      })
      .then(function (docRef) {
        localStorage.setItem("roomID", docRef.id);
        localStorage.setItem("requestID", post);
      })
      .then(function () {
        // Redirect to newly created messaging page with the poster
        window.location.href = "/messaging";
      });
    } else {
      // Redirect to existing messaging page with the poster
      window.location.href = "/messaging";
    }
  });
}

/**
 * Append this post onto the page.
 * @param {*} btnbox flexbox for the buttons
 * @param {*} btn message button
 * @param {*} card the post body
 * @param {*} box the card body inside the post
 * @param {*} p1 h4 element for post topic
 * @param {*} p2 p element for post subject
 * @param {*} p3 p element for post details
 * @param {*} p4 p element for poster name
 * @param {*} p5 p element for posted date
 * @param {*} targetUser poster user id
 * @param {*} subject post subject
 * @param {*} post post id
 */
function createPost(btnbox, btn, card, box, p1, p2, p3, p4, p5, targetUser, subject, post) {
  $(btnbox).append(btn);
  // If this post is made by the current user, add a delete button and hide the message button.
  if (firebase.auth().currentUser.uid == targetUser) {
    // Delete button to remove the post
    let del = $("<button>Delete</button>").click(function () {
      if (confirm("Are you sure you want to delete this post?")) {
        db.collection("posts").doc(post).delete();
      }
    });
    $(btnbox).append(del);
    $(btn).css({
      "visibility": "hidden",
    });
  }
  $(box).append(p1, p2, p3, p4, p5, btnbox);
  let filtersubject = $("#subjectchoice").val();
  // Check if this post should be added onto the page based on the filter.
  if (
    filtersubject == subject ||
    filtersubject == "All" ||
    (filtersubject == "My Posts" &&
      firebase.auth().currentUser.uid == targetUser)
  ) {
    $(card).append(box);
    if (!document.getElementById(post)) {
      $("#posts-dat").prepend(card);
    }
  }
}
