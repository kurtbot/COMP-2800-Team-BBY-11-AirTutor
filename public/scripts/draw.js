/**
 * Canvas drawing functionality.
 * Source: https://socket.io/demos/whiteboard/
 */


// Brush colour and size
var colour = '#000000';
var strokeWidth = 5;

// Drawing state
let latestPoint;
let drawing = false;

// Set up our drawing context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// Colors

var colours = {
    black: '#000000',
    white: '#ffffff',
    red: '#ff0000',
    blue: '#0000ff',
    yellow: '#ffff00',
    green: '#00ff00',
}

var brushSize = [5, 15, 25];

console.log('draw.js loaded');

var sessionRef = firebase.database().ref('sessionrooms/' + queryResult() + '/canvasData');
let coordsJsonArr = []

// Drawing functions

/**
 * Continues to draw the stroke based 
 * @param {Array} newPoint 
 */
function onContinueStroke(newPoint) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.moveTo(latestPoint[0], latestPoint[1]);
    ctx.strokeStyle = colour;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineTo(newPoint[0], newPoint[1]);
    ctx.stroke();


    var w = canvas.width;
    var h = canvas.height;

    // Store points
    coordsJsonArr.push({
        old: { x: latestPoint[0] / w, y: latestPoint[1] / h },
        new: { x: newPoint[0] / w, y: newPoint[1] / h },
        colour: colour,
        strokeWidth: strokeWidth,
    })

    latestPoint = newPoint;

    firebase.database().ref('sessionrooms/' + queryResult() + '/canvasData').set({
        canvasData: coordsJsonArr
    });
};

// Event helpers

/**
 * On begin stroke set the selected point as current point
 * @param {Array} point 
 */
function onBeginStroke(point) {
    drawing = true;
    latestPoint = point;
};

const BUTTON = 0b01;
const mouseButtonIsDown = buttons => (BUTTON & buttons) === BUTTON;

// Event handlers

/**
 * the mouse move event is triggered when the user is moving while drawing at the same time
 * @param {MouseEvent} evt 
 */
function onMoveMouse(evt) {
    if (!drawing) {
        return;
    }
    onContinueStroke([evt.offsetX, evt.offsetY]);
};

/**
 * the mouse down event triggers when the mouse is pressed
 * @param {MouseEvent} evt 
 */
function onDownMouse(evt) {
    if (drawing) {
        return;
    }
    evt.preventDefault();
    canvas.addEventListener("mousemove", onMoveMouse, false);
    onBeginStroke([evt.offsetX, evt.offsetY]);
};

/**
 * the on enter mouse event
 * @param {MouseEvent} evt 
 */
function onEnterMouse(evt) {
    if (!mouseButtonIsDown(evt.buttons) || drawing) {
        return;
    }
    onDownMouse(evt);
};

/**
 * the on end stroke event triggers when the user is not drawing
 * @param {MouseEvent} evt 
 */
function onEndStroke(evt) {
    if (!drawing) {
        return;
    }
    drawing = false;
    evt.currentTarget.removeEventListener("mousemove", onMoveMouse, false);
};

/**
 * the get touch coords gets the position of the user's click
 * @param {MouseEvent} evt 
 */
function getTouchCoords(evt) {
    if (!evt.currentTarget) {
        return [0, 0];
    }
    const rect = evt.currentTarget.getBoundingClientRect();
    const touch = evt.targetTouches[0];
    return [touch.clientX - rect.left, touch.clientY - rect.top];
};

/**
 * the touch down event triggers when the mouse is pressed
 * @param {MouseEvent} evt 
 */
function onStartTouch(evt) {
    if (drawing) {
        return;
    }
    evt.preventDefault();
    console.log('hello');

    onBeginStroke(getTouchCoords(evt));
};

/**
 * the touch move event is triggered when the user is moving while drawing at the same time
 * @param {MouseEvent} evt 
 */
function onMoveTouch(evt) {
    if (!drawing) {
        return;
    }
    onContinueStroke(getTouchCoords(evt));
};

/**
 * the on end touch event triggers when the user is not drawing
 * @param {MouseEvent} evt 
 */
function onEndTouch(evt) {
    drawing = false;
    firebase.database().ref('sessionrooms/' + queryResult() + '/canvasData').set({
        canvasData: coordsJsonArr
    });
};


// Firebase Draw Events

/**
 * DrawUpdate runs whenever the database is updated
 * @param {JSON} pairPoints 
 */
function DrawUpdate(pairPoints) {
    var w = canvas.width;
    var h = canvas.height;
    let lastPoint;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (let i = 0; i < pairPoints.length; i++) {
        ctx.strokeStyle = pairPoints[i].colour;
        ctx.lineWidth = pairPoints[i].strokeWidth;
        ctx.beginPath();
        ctx.moveTo(pairPoints[i].old.x * w, pairPoints[i].old.y * h);
        ctx.lineTo(pairPoints[i].new.x * w, pairPoints[i].new.y * h);
        ctx.stroke();
        ctx.closePath()
        console.log('draw');
    }
}

/**
 * sets the document listeners
 */
function setup() {

    // Mobile 
    canvas.addEventListener("touchstart", onStartTouch, false);
    canvas.addEventListener("touchend", onEndTouch, false);
    canvas.addEventListener("touchcancel", onEndTouch, false);
    canvas.addEventListener("touchmove", onMoveTouch, false);

    // Register event handlers

    canvas.addEventListener("mousedown", onDownMouse, false);
    canvas.addEventListener("mouseup", onEndStroke, false);
    canvas.addEventListener("mouseout", onEndStroke, false);
    canvas.addEventListener("mouseenter", onEnterMouse, false);

    // adds click event listeners to the brush sizes
    let brushes = document.getElementsByClassName('brush');
    console.log(brushes);
    for (let i = 0; i < 3; i++) {
        brushes[i].addEventListener('click', function () {

            switch (i) {
                case 0:
                    document.querySelector('.small').innerHTML = '✓';
                    document.querySelector('.medium').innerHTML = ' ';
                    document.querySelector('.large').innerHTML = ' ';
                    break;
                case 1:
                    document.querySelector('.small').innerHTML = ' ';
                    document.querySelector('.medium').innerHTML = '✓';
                    document.querySelector('.large').innerHTML = ' ';
                    break;
                case 2:
                    document.querySelector('.small').innerHTML = ' ';
                    document.querySelector('.medium').innerHTML = ' ';
                    document.querySelector('.large').innerHTML = '✓';
                    break;
                default:
                    break;
            }

            strokeWidth = brushSize[i];
            console.log(strokeWidth);
        })
    }

    // adds click event listeners to the palette
    let colorsDom = document.getElementsByClassName('color');
    console.log(colorsDom);
    for (let i = 0; i < 6; i++) {

        colorsDom[i].addEventListener('click', function () {
            console.log(colorsDom[i].className);

            let colorKey = colorsDom[i].className.split(' ')[1];
            switch (i) {
                case 0:
                    document.querySelector('.black').innerHTML = '✓';
                    $('.white, .red, .blue, .yellow, .green').text(' ');
                    break;
                case 1:
                    document.querySelector('.white').innerHTML = '✓';
                    $('.black, .red, .blue, .yellow, .green').text(' ');
                    break;
                case 2:
                    document.querySelector('.red').innerHTML = '✓';
                    $('.white, .black, .blue, .yellow, .green').text(' ');
                    break;
                case 3:
                    document.querySelector('.blue').innerHTML = '✓';
                    $('.white, .red, .black, .yellow, .green').text(' ');
                    break;
                case 4:
                    document.querySelector('.yellow').innerHTML = '✓';
                    $('.white, .red, .blue, .black, .green').text(' ');
                    break;
                case 5:
                    document.querySelector('.green').innerHTML = '✓';
                    $('.white, .red, .blue, .yellow, .black').text(' ');
                    break;
                default:
                    break;
            }

            colour = colours[colorKey];
        })
    }

    // updates when the value in the real time database changes
    sessionRef.on('value', function (snapshot) {
        coordsJsonArr.concat(snapshot.val()['canvasData']);
        DrawUpdate(snapshot.val()['canvasData']);
    })
}

/**
 * Runs the setup when the document is ready
 */
$(document).ready(function () {
    setup();
})
