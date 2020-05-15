// Brush colour and size
const colour = "#3d34a5";
const strokeWidth = 5;

// Drawing state
let latestPoint;
let drawing = false;

// Set up our drawing context
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.canvas.width = window.innerWidth;
context.canvas.height = window.innerHeight;
// function draw() {
//     var ctx = (a canvas context);

//     //...drawing code...
// }


console.log('draw.js loaded');


/**
 * 
 * 
 * i
 * {
 *      old: {x: 0, y: 0},
 *      new: {x: 0, y: 0}
 * },
 * i+1
 * {
 *      old: {x: 0, y: 0},
 *      new: {x: 0, y: 0}
 * },
 * 
 * 
 * 
 */


var sessionRef = firebase.database().ref('sessionrooms/' + queryResult() + '/canvasData');
let coordsJsonArr = []

// Drawing functions

const continueStroke = newPoint => {
    context.beginPath();
    context.moveTo(0,0);
    context.moveTo(latestPoint[0], latestPoint[1]);
    context.strokeStyle = colour;
    context.lineWidth = strokeWidth;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineTo(newPoint[0], newPoint[1]);
    context.stroke();


    var w = canvas.width;
    var h = canvas.height;

    // Store points
    coordsJsonArr.push({
        old: { x: latestPoint[0] / w, y: latestPoint[1] / h },
        new: { x: newPoint[0] / w, y: newPoint[1] / h },
    })

    latestPoint = newPoint;


};

// Event helpers

const startStroke = point => {
    drawing = true;
    latestPoint = point;
};

const BUTTON = 0b01;
const mouseButtonIsDown = buttons => (BUTTON & buttons) === BUTTON;

// Event handlers

const mouseMove = evt => {
    if (!drawing) {
        return;
    }
    continueStroke([evt.offsetX, evt.offsetY]);
};

const mouseDown = evt => {
    if (drawing) {
        return;
    }
    evt.preventDefault();
    canvas.addEventListener("mousemove", mouseMove, false);
    startStroke([evt.offsetX, evt.offsetY]);
};

const mouseEnter = evt => {
    if (!mouseButtonIsDown(evt.buttons) || drawing) {
        return;
    }
    mouseDown(evt);
};

const endStroke = evt => {
    if (!drawing) {
        return;
    }
    drawing = false;
    evt.currentTarget.removeEventListener("mousemove", mouseMove, false);
    firebase.database().ref('sessionrooms/' + queryResult() + '/canvasData').set({
        canvasData: coordsJsonArr
    });
};

const getTouchPoint = evt => {
    if (!evt.currentTarget) {
        return [0, 0];
    }
    const rect = evt.currentTarget.getBoundingClientRect();
    const touch = evt.targetTouches[0];
    return [touch.clientX - rect.left, touch.clientY - rect.top];
};

const touchStart = evt => {
    if (drawing) {
        return;
    }
    evt.preventDefault();
    console.log('hello');

    startStroke(getTouchPoint(evt));
};

const touchMove = evt => {
    if (!drawing) {
        return;
    }
    continueStroke(getTouchPoint(evt));
};

const touchEnd = evt => {
    drawing = false;
    firebase.database().ref('sessionrooms/' + queryResult() + '/canvasData').set({
        canvasData: coordsJsonArr
    });
};


// Firebase Draw Events

const DrawUpdate = (pairPoints) => {
    var w = canvas.width;
    var h = canvas.height;
    console.log("pairPoints: ", pairPoints);
    let lastPoint;
    context.strokeStyle = colour;
    context.lineWidth = strokeWidth;
    context.lineCap = "round";
    context.lineJoin = "round";
    for (let i = 0; i < pairPoints.length; i++) {
        context.beginPath();
        context.moveTo(pairPoints[i].old.x * w, pairPoints[i].old.y * h);
        context.lineTo(pairPoints[i].new.x * w, pairPoints[i].new.y * h);
        context.stroke();
        context.closePath()
        console.log('draw');

    }
}

const DrawUpdatePoint = (points) => {
    console.log("pairPoints: ", points);
    for (let i = 0; i < points.length; i++) {
        context.beginPath();
        context.moveTo(points[i].old.x, points[0].old.y);
        context.strokeStyle = colour;
        context.lineWidth = strokeWidth;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.lineTo(points[i].new.x, points[i].new.y);
        context.stroke();
        console.log('draw');
    }
}

const setup = () => {
    canvas.addEventListener("touchstart", touchStart, false);
    canvas.addEventListener("touchend", touchEnd, false);
    canvas.addEventListener("touchcancel", touchEnd, false);
    canvas.addEventListener("touchmove", touchMove, false);

    // Register event handlers

    canvas.addEventListener("mousedown", mouseDown, false);
    canvas.addEventListener("mouseup", endStroke, false);
    canvas.addEventListener("mouseout", endStroke, false);
    canvas.addEventListener("mouseenter", mouseEnter, false);

    // db.collection("sessionrooms/").doc(queryResult()).onSnapShot(function (snapshot) {
    //     snapshot.docChanges().forEach(change => {
    //         if (change.type === 'modified') {
    //             // updatePage() function
    //         }
    //     })
    // })

    sessionRef.on('value', function (snapshot) {
        // console.log(snapshot.val());

        DrawUpdate(snapshot.val()['canvasData']);
    });
}


setup();