
var canvasWidth = 500;
var canvasHeight = 500;
var canvas = null;
var bounds = null;
var ctx = null;
var hasLoaded = false;

var startX = 0;
var startY = 0;
var mouseX = 0;
var mouseY = 0;
var isDrawing = false;
var existingLines = [];
var existingCenter = [];


function draw() {
    ctx.fillStyle = "#b2d6bb";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (var i = 0; i < existingLines.length; ++i) {
        var line = existingLines[i];
    
        ctx.moveTo(line.startX, line.startY);
        ctx.lineTo(line.endX, line.endY);
    }

    ctx.stroke();

    if (isDrawing) {
        ctx.strokeStyle = "darkred";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(mouseX, mouseY);
        ctx.stroke();
    }
}

function draw_node() {
    for (var i = 0; i < existingCenter.length; ++i) {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(existingCenter[i].X, existingCenter[i].Y, 20, 0, 2 * Math.PI);
        ctx.stroke();
    }    
}


function onmousedown(e) {
    if (hasLoaded && e.button === 0) {
        if (!isDrawing) {
            startX = e.clientX - bounds.left;
            startY = e.clientY - bounds.top;
            isDrawing = true;
        }

        draw();
    }
}

function onmouseup(e) {
    if (hasLoaded && e.button === 0) {
        if (isDrawing) {
            existingLines.push({
                startX: startX,
                startY: startY,
                endX: mouseX,
                endY: mouseY
            });

            existingCenter.push({
                X: mouseX,
                Y: mouseY
            });
            
            isDrawing = false;
        }
        draw();
        draw_node();

    }
}

function onmousemove(e) {
    if (hasLoaded) {
        mouseX = e.clientX - bounds.left;
        mouseY = e.clientY - bounds.top;

        if (isDrawing) {
            draw();
        }
    }
}

window.onload = function () {
    canvas = document.getElementById("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.onmousedown = onmousedown;
    canvas.onmouseup = onmouseup;
    canvas.onmousemove = onmousemove;

    bounds = canvas.getBoundingClientRect();
    ctx = canvas.getContext("2d");
    hasLoaded = true;

    draw();
}
