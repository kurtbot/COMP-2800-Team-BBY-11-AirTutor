db.collection("posts/").get().then(function (snap) {
    snap.forEach(function(doc) {
        let box = document.createElement("div");
        let hr = document.createElement("hr");
        document.body.appendChild(hr);
        let date = document.createElement("p");
        date.innerHTML = "Date: " + doc.data().date;
        box.appendChild(date);
        let subject = document.createElement("p");
        subject.innerHTML = "Subject: " + doc.data().subject;
        box.appendChild(subject);
        let grade = document.createElement("p");
        grade.innerHTML = "Grade: " + doc.data().grade;
        box.appendChild(grade);
        let title = document.createElement("p");
        title.innerHTML = "Title: " + doc.data().title;
        box.appendChild(title);
        let details = document.createElement("p");
        details.innerHTML = "Details: " + doc.data().details;
        box.appendChild(details);
        let userid = document.createElement("p");
        userid.innerHTML = "User ID: " + doc.data().user;
        box.appendChild(userid);
        let username = document.createElement("p");
        username.innerHTML = "User Name: " + doc.data().username;
        box.appendChild(username);
        let btn = document.createElement("button");
        btn.innerHTML = "Message";
        btn.onclick = function(){
            window.location.href = "messaging.html"
        }
        box.appendChild(btn)
        document.body.appendChild(box);
        document.body.appendChild(hr);
    })
    });