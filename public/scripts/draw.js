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

const continueStroke = newPoint => {
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
    canvas.addEventListener("mousemove", mouseMove, false);
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

const setup = () => {

    // Mobile 
    canvas.addEventListener("touchstart", touchStart, false);
    canvas.addEventListener("touchend", touchEnd, false);
    canvas.addEventListener("touchcancel", touchEnd, false);
    canvas.addEventListener("touchmove", touchMove, false);

    // Register event handlers

    canvas.addEventListener("mousedown", mouseDown, false);
    canvas.addEventListener("mouseup", endStroke, false);
    canvas.addEventListener("mouseout", endStroke, false);
    canvas.addEventListener("mouseenter", mouseEnter, false);

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


    sessionRef.on('value', function(snapshot) {
        coordsJsonArr.concat(snapshot.val()['canvasData']);
        DrawUpdate(snapshot.val()['canvasData']);
    })
}

$(document).ready(function() {
    setup();
})
