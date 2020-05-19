
var peer = new Peer({ key: 'lwjd5qra8257b9' });

var peerID;
peer.on('open', function (id) {
    console.log('My peer ID is: ' + id);
    peerID = "" + id;
    tutorTest();
});

function queryResult() {
    let queryString = decodeURIComponent(window.location.search);
    let queries = queryString.split("?");
    let id = queries[1];
    return id;
}
let tutor;
let student;

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

function gotoNext() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user.uid == tutor) {
            window.location.href = "/home"
        } else {
            window.location.href = "/rating" + "?" + tutor;

        }

    })
}

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

videoDom.addEventListener('play', function () {
    var $this = this; //cache
    (function loop() {
        if (!$this.paused && !$this.ended) {
            canvasContext.drawImage($this, 0, 0);
            setTimeout(loop, 1000 / 30); // drawing at 30fps
        }
    })();
}, 0);

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
                    // conn.send('hi from tutor');
                    conn.send({ stream: canvasStream });
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

// answer call
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

// Create Connection
peer.on('connection', function (conn) {
    console.log('connected to: ' + conn);
    console.log(conn);
    conn.on('data', function (data) {
        console.log(data);

        if (data['stream']) {
            console.log('checking data stream');
            // videoDom.srcObject = data['stream'];
            // videoDom.onloadedmetadata = function (e) {
            //     console.log('now playing the video');
            //     videoDom.play();
            // }
        }
    })

})


// Buttons
// const screenShareBtn = document.querySelector('#screen-share-btn');
const canvasBrushBtn = document.querySelector('#canvas-brush-btn');
const micMuteBtn = document.querySelector('#mic-mute-btn');
const phoneCallBtn = document.querySelector('#phone-call-btn');

canvasBrushBtn.addEventListener('click', function () {
    openNav();
})

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
phoneCallBtn.addEventListener('click', gotoNext)

console.log('loaded event listeners');


/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("palette-trigger").style.height = "100%";
    document.getElementById("palette").style.height = "auto";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("palette-trigger").style.height = "0";
    document.getElementById("palette").style.height = "0";
}

$(document).ready(function () {
    closeNav();
})