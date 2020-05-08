
var peer = new Peer({ key: 'lwjd5qra8257b9' });

peer.on('open', function (id) {
    console.log('My peer ID is: ' + id);
    // document.getElementById('userID').innerHTML = id;
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
        db.collection("/sessionrooms").doc(queryResult()).get().then(function(doc){
            credit = doc.data().credit;
            tutor = doc.data().tutorid;
            student = doc.data().studentid;
            localStorage.setItem("creditxfer", credit);
        }).then(function(){
            if (user.uid == tutor){
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
        db.collection("/sessionrooms").doc(queryResult()).get().then(function(doc){

            isTutor = firebase.auth().currentUser.uid == doc.data().tutorid;
        })
    })

    return isTutor;
}

if(checkIfTutor()) {
    db.collection('/sessionrooms').doc(queryResult()).update({
        tutorCallID: peer.id
    })
} else {

    db.collection("/sessionrooms").doc(queryResult()).get().then(function(doc){
        console.log(doc.data().tutorCallID);
        
        navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(function (stream) {
            var call = peer.call(doc.data().tutorCallID, stream);
            call.on('stream', function (remoteStream) {
                // Show stream in some video/canvas element.
            });
        }).catch(function (err) {
            console.log('Failed to get local stream', err);
        });
    })
}


var conn = null;


// var mediaStream = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;


navigator.mediaDevices.enumerateDevices()
    .then(gotDevices)
    .catch(function (err) {
        console.log(err);
    });

function gotDevices(deviceInfos) {
    for (var i = 0; i !== deviceInfos.length; ++i) {
        var deviceInfo = deviceInfos[i];
        var option = document.createElement('option');
        option.value = deviceInfo.deviceId;

        if (deviceInfo.kind === 'audioinput') {
            console.log(deviceInfo.label);

            //   option.text = deviceInfo.label ||
            //     'Microphone ' + (audioInputSelect.length + 1);
            //   audioInputSelect.appendChild(option);
        } else if (deviceInfo.kind === 'audiooutput') {
            console.log(deviceInfo.label);

            //   option.text = deviceInfo.label || 'Speaker ' +
            //     (audioOutputSelect.length + 1);
            //   audioOutputSelect.appendChild(option);
        } else if (deviceInfo.kind === 'videoinput') {
            console.log(deviceInfo.label);

            //   option.text = deviceInfo.label || 'Camera ' +
            //     (videoSelect.length + 1);
            //   videoSelect.appendChild(option);
        }
    }
}

// answer call
peer.on('call', function (mediaConnection) {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(function (stream) {
        mediaConnection.answer(stream); // Answer the call with an A/V stream.
        mediaConnection.on('stream', function (stream) {
            var audio = document.querySelector('audio');
            audio.srcObject = stream;
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