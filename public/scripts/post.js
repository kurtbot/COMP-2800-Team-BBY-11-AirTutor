db.collection("posts/").get().then(function (snap) {
    snap.forEach(function (doc) {
        let title = doc.data().title;
        let userName = doc.data().username;
        let user = doc.data().user;
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
        p4.innerHTML = userName;
        box.appendChild(p4);
        let p5 = document.createElement("p");
        p5.innerHTML = date;
        
        box.appendChild(p5);
        let btn = document.createElement("button");
        btn.innerHTML = "Message";
        btn.onclick = function(){
            localStorage.setItem("poster", user);
            localStorage.setItem("posterName", userName);
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