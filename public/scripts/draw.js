// Brush colour and size
const colour = "#3d34a5";
const strokeWidth = 5;

// Drawing state
let latestPoint;
let drawing = false;

// Set up our drawing context
const canvasDom = document.getElementById("canvas");
const ctx = canvasDom.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// Colors

var colours = {
    black : '#000000',
    white: '#ffffff',
    red: '#ff0000',
    blue: '#0000ff',
    yellow: '#ff00ff',
    green: '#00ff00',
}

console.log('draw.js loaded');

var sessionRef = firebase.database().ref('sessionrooms/' + queryResult() + '/canvasData');
let coordsJsonArr = []

// Drawing functions

const continueStroke = newPoint => {
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.moveTo(latestPoint[0], latestPoint[1]);
    ctx.strokeStyle = colour;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineTo(newPoint[0], newPoint[1]);
    ctx.stroke();


    var w = canvasDom.width;
    var h = canvasDom.height;

    // Store points
    coordsJsonArr.push({
        old: { x: latestPoint[0] / w, y: latestPoint[1] / h },
        new: { x: newPoint[0] / w, y: newPoint[1] / h },
        colour : colour,
    })

    latestPoint = newPoint;


};

// Event helpers

const beginStroke = point => {
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
    canvasDom.addEventListener("mousemove", mouseMove, false);
    beginStroke([evt.offsetX, evt.offsetY]);
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

    beginStroke(getTouchPoint(evt));
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
    var w = canvasDom.width;
    var h = canvasDom.height;
    console.log("pairPoints: ", pairPoints);
    let lastPoint;
    ctx.strokeStyle = pairPoints[i].colour;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (let i = 0; i < pairPoints.length; i++) {
        ctx.beginPath();
        ctx.moveTo(pairPoints[i].old.x * w, pairPoints[i].old.y * h);
        ctx.lineTo(pairPoints[i].new.x * w, pairPoints[i].new.y * h);
        ctx.stroke();
        ctx.closePath()
        console.log('draw');
    }
}

const setup = () => {

    // Touch
    canvasDom.addEventListener("touchstart", touchStart, false);
    canvasDom.addEventListener("touchend", touchEnd, false);
    canvasDom.addEventListener("touchcancel", touchEnd, false);
    canvasDom.addEventListener("touchmove", touchMove, false);

    // Register event handlers

    canvasDom.addEventListener("mousedown", mouseDown, false);
    canvasDom.addEventListener("mouseup", endStroke, false);
    canvasDom.addEventListener("mouseout", endStroke, false);
    canvasDom.addEventListener("mouseenter", mouseEnter, false);

    sessionRef.on('value', function (snapshot) {
        DrawUpdate(snapshot.val()['canvasData']);
    });
}

setup();