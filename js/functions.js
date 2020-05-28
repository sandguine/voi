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
}


// draw marks inputs: center at x coordinate, y coordinate, and radius of a circle
function drawMarks(x, y, r){
    for (var i = 0; i < 12; i++) {
        angle = (i - 3) * (Math.PI * 2) / 12;       // THE ANGLE TO MARK.
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
    }
}
