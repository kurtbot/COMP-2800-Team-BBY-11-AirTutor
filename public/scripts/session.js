/**
 * Peer.js Documentation: https://peerjs.com/docs.html#api
 */
var peer = new Peer({ key: 'lwjd5qra8257b9' });
let tutor;
let student;
var peerID;
peer.on('open', function (id) {
    console.log('My peer ID is: ' + id);
    peerID = "" + id;
    tutorTest();
});

/**
 * Gets the query of the page url
 */
function queryResult() {
    let queryString = decodeURIComponent(window.location.search);
    let queries = queryString.split("?");
    let id = queries[1];
    return id;
}

/**
 * Passes the info into the rating page
 */
db.collection("sessionrooms/").doc(queryResult()).get().then(function (doc) {
    credit = doc.data().credit;
    tutor = doc.data().tutorid;
    student = doc.data().studentid;
    localStorage.setItem("creditxfer", credit);
    localStorage.setItem("request", doc.data().requestid)
    localStorage.setItem("session", doc.id)
    localStorage.setItem("schedule", doc.data().scheduleid)
    localStorage.setItem("chat", doc.data().chatroom)
})

/**
 * Redirects the user after click on the hang up button
 */
function gotoNext() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user.uid == tutor) {
            window.location.href = "/home"
        } else {
            window.location.href = "/rating" + "?" + tutor;
        }
    })
}

/**
 * Checks if the user is a tutor
 */
function checkIfTutor() {
    let isTutor = false;
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("sessionrooms/").doc(queryResult()).get().then(function (doc) {
            isTutor = (firebase.auth().currentUser.uid == doc.data().tutorid);
            console.log("is a tutor? ", isTutor);
        })
    })
    return isTutor;
}

// Media Stream Elements
const canvasDom = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');
const canvasStream = canvas.captureStream(60);
const audioDom = document.querySelector('audio');
const videoDom = document.querySelector('video');

// Call Function from here

var mediaStream;
var conn;

/**
 * Is called once every time the user enters the session room
 */
function tutorTest() {
    db.collection("sessionrooms/").doc(queryResult()).get().then(function (doc) {
        isTutor = (firebase.auth().currentUser.uid == doc.data().tutorid);
        console.log("is a tutor? ", isTutor);
        if (isTutor) {
            db.collection('sessionrooms/').doc(queryResult()).update({
                tutorCallId: peerID
            }).catch(function (err) {
                console.log(err);
            })
        } else {
            db.collection('sessionrooms/').doc(queryResult()).update({
                studentCallId: peerID
            }).catch(function (err) {
                console.log(err);
            })
        }
    })

    createRoomSnapshot();
}

/**
 * The create room snapshot is used to automatically call the other user when they enter the room.
 */
function createRoomSnapshot() {
    db.collection("sessionrooms/").doc(queryResult()).onSnapshot(function (doc) {

        // if the current user is a tutor

        if (firebase.auth().currentUser.uid == doc.data().tutorid) {

            console.log('Im a tutor');

            // if student's peer id changes
            if (doc.data().studentCallId !== '') {

                // =======================
                // Reconnect
                // =======================
                conn = peer.connect(doc.data().studentCallId);
                conn.on('open', function () {
                    conn.send('hi from tutor');
                    // conn.send({ stream: canvasStream });
                })

                call(doc.data().studentCallId);
            }
        }
        // else if the user is a student
        else {

            console.log('Im a student');

            // if the tutor's peer id changes
            if (doc.data().tutorCallId !== '') {

                // =======================
                // Reconnect
                // =======================
                conn = peer.connect(doc.data().tutorCallID);
                conn.on('open', function () {
                    conn.send('hi from student');
                })

                call(doc.data().tutorCallId);
            }
        }
    })
}

/**
 * Calls the user based on their peerID which is saved from the database
 * @param {String} peerID 
 */
function call(peerID) {

    navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(function (stream) {

        canvas.captureStream().getTracks().forEach(track => {
            stream.addTrack(track);
        })
        mediaStream = stream;
        var call = peer.call(peerID, stream);

        call.on('stream', function (remoteStream) {
            var audio = document.querySelector('audio');
            audio.srcObject = remoteStream;
            audio.volume = 0.5;
            audio.onloadedmetadata = function (e) {
                console.log('now playing the audio');
                audio.play();
            }
            console.log(remoteStream);

            // videoDom.srcObject = remoteStream;
            // videoDom.onloadedmetadata = function (e) {
            //     console.log('now playing the videooooo');
            //     videoDom.play();
            // }

        });
    }).catch(function (err) {
        console.log('Failed to get local stream', err);
    });

}

/**
 * Listens for a incoming call and answers it.
 */
peer.on('call', function (mediaConnection) {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(function (stream) {
        mediaStream = stream;
        // stream.addTrack(canvasDom.captureStream(60));
        console.log('someone called');

        // console.log(stream)
        // console.log(stream.getAudioTracks());
        mediaConnection.answer(stream); // Answer the call with an A/V stream.
        mediaConnection.on('stream', function (remoteStream) {
            var audio = document.querySelector('audio');
            audio.srcObject = remoteStream;
            audio.volume = 0.5;
            audio.onloadedmetadata = function (e) {
                console.log('now playing the audio');
                audio.play();
            }
            // videoDom.srcObject = remoteStream;
            // videoDom.onloadedmetadata = function (e) {
            //     console.log('now playing the videooooo');
            //     videoDom.play();
            // }
        });
    }).catch(function (err) {
        console.log('Failed to get local stream', err);
    });
});

/**
 * Used to check if a connection is made between the student and the tutor
 */
peer.on('connection', function (conn) {
    console.log('connected to: ' + conn);
    console.log(conn);
    conn.on('data', function (data) {
        console.log(data);
    })

})


// Buttons
// const screenShareBtn = document.querySelector('#screen-share-btn');
const canvasBrushBtn = document.querySelector('#canvas-brush-btn');
const micMuteBtn = document.querySelector('#mic-mute-btn');
const phoneCallBtn = document.querySelector('#phone-call-btn');

/**
 * Add canvas brush events to open and close the palette
 */
canvasBrushBtn.addEventListener('click', function () {
    openPalette();
})


/**
 * Add mic mute events to the mic mute button
 */
let muted = false;
micMuteBtn.addEventListener('click', function () {
    if (muted == false) {
        micMuteBtn.style.backgroundColor = "rgb(187, 20, 20)";
        muted = true;
        mediaStream.getAudioTracks().map(function (t) {
            t.enabled = false;
        });
    } else {
        micMuteBtn.style.backgroundColor = "#262834";
        muted = false;
        mediaStream.getAudioTracks().map(function (t) {
            t.enabled = true;
        });
    }
})

/**
 * When the user clicks on the hang up button, they are redirected to either the rating page if they're a student or to the home page if they are a student
 */
phoneCallBtn.addEventListener('click', gotoNext)

console.log('loaded event listeners');


/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openPalette() {
    document.getElementById("palette-trigger").style.height = "100%";
    document.getElementById("palette").style.height = "auto";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closePalette() {
    document.getElementById("palette-trigger").style.height = "0";
    document.getElementById("palette").style.height = "0";
}

/* Closes the palette on load */
$(document).ready(function () {
    closePalette();
})