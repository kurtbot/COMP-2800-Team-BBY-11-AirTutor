
var peer = new Peer({ key: 'lwjd5qra8257b9' });
var peerID;
peer.on('open', function (id) {
    console.log('My peer ID is: ' + id);
    peerID = "" + id;
    tutorTest();
});

document.getElementById("go-rating").onclick = gotoNext;


function queryResult() {
    let queryString = decodeURIComponent(window.location.search);
    let queries = queryString.split("?");
    let id = queries[1];
    return id;
}
let tutor;
let student;



function gotoNext() {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("sessionrooms/").doc(queryResult()).get().then(function (doc) {
            credit = doc.data().credit;
            tutor = doc.data().tutorid;
            student = doc.data().studentid;
            localStorage.setItem("creditxfer", credit);
            localStorage.setItem("request", doc.data().requestid)
            localStorage.setItem("session", doc.id)
            localStorage.setItem("schedule", doc.data().scheduleid)
        }).then(function () {
            if (user.uid == tutor) {
                window.location.href = "/home"
            } else {
                window.location.href = "/rating" + "?" + tutor;

            }
        })
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
    db.collection("sessionrooms/").doc(queryResult()).onSnapshot(function (doc) {
        if (firebase.auth().currentUser.uid == doc.data().tutorid) {
            if (doc.data().studentCallId !== '') {
                navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(function (stream) {
                    var call = peer.call(doc.data().studentCallId, stream);
                    call.on('stream', function (remoteStream) {
                        var audio = document.querySelector('audio');
                        audio.srcObject = remoteStream;
                        audio.onloadedmetadata = function (e) {
                            console.log('now playing the audio');
                            audio.play();
                        }
                    });
                }).catch(function (err) {
                    console.log('Failed to get local stream', err);
                });
            }
        } else {
            if (doc.data().tutorCallId !== '') {
                navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(function (stream) {
                    var call = peer.call(doc.data().tutorCallID, stream);
                    call.on('stream', function (remoteStream) {
                        var audio = document.querySelector('audio');
                        audio.srcObject = remoteStream;
                        audio.onloadedmetadata = function (e) {
                            console.log('now playing the audio');
                            audio.play();
                        }
                    });
                }).catch(function (err) {
                    console.log('Failed to get local stream', err);
                });
            }
        }
    })
}

// answer call
peer.on('call', function (mediaConnection) {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(function (stream) {
        mediaConnection.answer(stream); // Answer the call with an A/V stream.
        mediaConnection.on('stream', function (remoteStream) {
            var audio = document.querySelector('audio');
            audio.srcObject = remoteStream;
            audio.onloadedmetadata = function (e) {
                console.log('now playing the audio');
                audio.play();
            }
        });
    }).catch(function (err) {
        console.log('Failed to get local stream', err);
    });
});

// connect
// connect.addEventListener('click', function () {
//     // var conn = peer.connect(userIDConn.value);
//     // // on open will be launch when you successfully connect to PeerServer
//     // conn.on('open', function () {
//     //     // here you have conn.id
//     //     conn.send('hi!');
//     // });
// })