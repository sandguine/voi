/*
* functions necessary for VoI experiments
* this is for testing only
* can't be called since the variable scoped is limited to each screen
* Sandy Tanwisuth, @sandguine, May 2020
*/

var angles = [0, 30, 60, -60, -30];

var outcomeAllAngles = [15, 45, 75, 105, 135, 165, -165, -135, -105, -75, -45, -15];

var outcomeByAngles = []; // all available outcome depending on the angle
// filling all available outcome depending on the angle
for (var i = 0; i < outcomeAllAngles.length/2; i++ ){
    outcomeByAngles.push(outcomeAllAngles.slice(i, i+6));
}

var ooaar = outcomeAllAngles.reverse();

var rndOBA = []; // all available outcome depending on the angle randomized
// fill-in all available outcome depending on the angle randomized
for ( var j = 0; j < angles.length; j++){
    rndOBA.push(jsPsych.randomization.shuffle(outcomeByAngles[j]));
}


var oobar = []; // all available outcome depending on the angle
// filling all available outcome depending on the angle
for (var i = 0; i < ooaa.length/2; i++ ){
    ooba.push(ooaa.slice(i, i+6));
}


var rndOOBA = []; // all available outcome depending on the angle randomized
// fill-in all available outcome depending on the angle randomized
for ( var j = 0; j < angles.length; j++){
    rndOOBA.push(jsPsych.randomization.shuffle(ooba[j]));
}



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
    ctx.closePath();
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
        ctx.closePath();
    }
}


// draw cut-off line inputs: center at x coordinate, y coordinate, radius of a circle,
// and angle 0 at horizontal-clockwise [options: 30, 60, 120, 150]
function drawCutOffLine(x, y, r, a, color){
    ctx.lineWidth = 5;
    ctx.strokeStyle = color;
    ctx.beginPath();

    a1 = -(Math.ceil(a/30) * (2 * Math.PI) / 12);
    a2 = -(Math.ceil((a/30)+6) * (2 * Math.PI) / 12);

    var x1 = (x) + Math.cos(a1) * (r);
    var y1 = (y) + Math.sin(a1) * (r);
    var x2 = (x) + Math.cos(a2) * (r);
    var y2 = (y) + Math.sin(a2) * (r);

    ctx.moveTo(x1, y1);
    ctx.lineTo(x, y);
    ctx.moveTo(x2, y2);
    ctx.lineTo(x, y);

    ctx.globalAlpha = 1;
    ctx.stroke();
    ctx.closePath();
}

// draw the veil side
function drawHalfVeil(x, y, r, a, color){
    a1 = -(Math.ceil(a/30) * (2 * Math.PI) / 12);
    a2 = -(Math.ceil((a/30)+6) * (2 * Math.PI) / 12);

    ctx.beginPath()
    ctx.arc(x, y, r, a1, a2);
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawOtherHalfVeil(x, y, r, a, color){
    a1 = -(Math.ceil(a/30) * (2 * Math.PI) / 12);
    a2 = -(Math.ceil((a/30)+6) * (2 * Math.PI) / 12);

    ctx.beginPath()
    ctx.arc(x, y, r, a2, a1);
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

// draw the place of the outcome
function drawDot(x, y, r, a){
    ctx.fillStyle = "Lime";

    a1 = -(Math.ceil(a) * Math.PI / 180);

    var x1 = (x) + Math.cos(a1) * (r);
    var y1 = (y) + Math.sin(a1) * (r);

    ctx.beginPath();
    ctx.globalAlpha = 1;
    ctx.arc(x1, y1, 5, 0, 2*Math.PI);
    ctx.strokeStyle = 'LimeGreen';
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}


function drawDotHalf(x, y, r, a){
    ctx.fillStyle = "Lime";

    // determine possible outcome options from angle
    if (a == 0) {
        dotAngle = outcomeByAngles[0];
    } else if (a == 30) {
        dotAngle = outcomeByAngles[1];
    } else if (a == 60){
        dotAngle = outcomeByAngles[2];
    } else if (a == 120){
        dotAngle = outcomeByAngles[4];
    } else if (a == 150){
        dotAngle = outcomeByAngles[5];
    }

    for (var i = 0; i < dotAngle.length; i++){
        a1 = -(Math.ceil(dotAngle[i]) * Math.PI / 180);

        var x1 = (x) + Math.cos(a1) * (r);
        var y1 = (y) + Math.sin(a1) * (r);

        ctx.beginPath();
        ctx.globalAlpha = 1;
        ctx.arc(x1, y1, 5, 0, 2*Math.PI);
        ctx.strokeStyle = 'LimeGreen';
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

    }
} // all is correct


function drawDotOtherHalf(x, y, r, a){
    ctx.fillStyle = "Lime";

    // determine possible outcome options from angle
    if (a == 0) {
        dotAngle = ooba[0];
    } else if (a == 30) {
        dotAngle = ooba[1];
    } else if (a == 60){
        dotAngle = ooba[2];
    } else if (a == 120){
        dotAngle = ooba[4];
    } else if (a == 150){
        dotAngle = ooba[5];
    }

    for (var i = 0; i < dotAngle.length; i++){
        a1 = -(Math.ceil(dotAngle[i]) * Math.PI / 180)+Math.PI;

        var x1 = (x) + Math.cos(a1) * (r);
        var y1 = (y) + Math.sin(a1) * (r);

        ctx.beginPath();
        ctx.globalAlpha = 1;
        ctx.arc(x1, y1, 5, 0, 2*Math.PI);
        ctx.strokeStyle = 'LimeGreen';
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

    }
} // only 0 is correct



/* to do:
    - randomizations
    - storing data for next screen
    - storing data for analysis
*/


// choice of gambles displayed
function textGambleChoices(choicesArray){
    ctx.fillStyle = "MediumPurple";
    ctx.font = "28px Arial";
    ctx.textAlign = "center";
    ctx.fillText(choicesArray[0], c.width*1/3, c.height*1/3); // +3 is a variable, and save this

    ctx.fillStyle = "Gold";
    ctx.font = "28px Arial";
    ctx.textAlign = "center";
    ctx.fillText(choicesArray[1], c.width*2/3, c.height*1/3); // -3 is a variable, and save this
}
