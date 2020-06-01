/*
* functions necessary for VoI experiments
* Sandy Tanwisuth, @sandguine, May 2020
*/


// draw circle halves of circle with two different color
function drawCircle(x, y, r, color_left, color_right){
    // Right half of the circle
    ctx.beginPath();
    ctx.arc(x, y, r, 0.5*Math.PI, 1.5*Math.PI);
    ctx.fillStyle = color_left;
    ctx.fill();
    ctx.stroke();

    // Left half of the circle
    ctx.beginPath();
    ctx.arc(x, y, r, 1.5*Math.PI, 0.5*Math.PI);
    ctx.fillStyle = color_right;
    ctx.fill();
    ctx.stroke();
    ctx.closePath()
}


// draw marks inputs: center at x coordinate, y coordinate, and radius of a circle
function drawMarks(x, y, r){
    for (var i = 0; i < 12; i++) {
        angle = (i - 3) * (2 * Math.PI) / 12;       // THE ANGLE TO MARK.
        ctx.lineWidth = 5;            // HAND WIDTH.
        ctx.beginPath();

        var x1 = (x) + Math.cos(angle) * (r);
        var y1 = (y) + Math.sin(angle) * (r);
        var x2 = (x) + Math.cos(angle) * (r - (r / 7));
        var y2 = (y) + Math.sin(angle) * (r - (r / 7));

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);

        ctx.strokeStyle = 'White';
        ctx.stroke();
        ctx.closePath()
    }
}


// draw marks inputs: center at x coordinate, y coordinate, and radius of a circle
function drawLine(x, y, r, a){
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'Crimson';
    ctx.beginPath();

    a1 = Math.ceil(a/30) * (2 * Math.PI) / 12;
    a2 = Math.ceil((a/30)+6) * (2 * Math.PI) / 12;

    var x1 = (x) + Math.cos(a1) * (r);
    var y1 = (y) + Math.sin(a1) * (r);
    var x2 = (x) + Math.cos(a2) * (r);
    var y2 = (y) + Math.sin(a2) * (r);

    ctx.moveTo(x1, y1);
    ctx.lineTo(x, y);
    ctx.moveTo(x2, y2);
    ctx.lineTo(x, y);

    ctx.stroke();
    ctx.closePath()
}


function drawDot(x, y, r, a){
    ctx.fillStyle = "SpringGreen";

    a1 = Math.ceil(a/30) * (2 * Math.PI) / 12;

    var x1 = (x) + Math.cos(a1) * (r);
    var y1 = (y) + Math.sin(a1) * (r);

    ctx.beginPath();
    ctx.arc(x1, y1, 7.5, 0, 2*Math.PI);
    ctx.fill();
    ctx.closePath()
}
