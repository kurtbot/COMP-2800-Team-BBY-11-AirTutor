db.collection("posts/").get().then(function (snap) {
    snap.forEach(function (doc) {
        let title = doc.data().title;
        let userName = doc.data().username;
        let user = doc.data().user;
        let grade = doc.data().grade;
        let subject = doc.data().subject;
        let date = doc.data().date;
        let detail = doc.data().details;
        let card = "<div class='card bg-light text-black mx-3 my-2'>\
        <div class='card-body'>\
          <h4 class='card-title'>" + title + "</h4><hr/>\
          <span class='card-text'>" + subject + " " + grade + "</span>\
          <p class='card-text'>" + detail + "</p>\
          <p class='card-text'> posted by " + userName + "</p>\
          <a name='' id='' class='btn btn-primary' href='messaging.html' role='button'>Message</a>\
        </div>\
      </div>";
      $("#posts-dat").append(card);
    })
});