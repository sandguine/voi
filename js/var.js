/*
* variables for VoI experiment
* Sandy Tanwisuth, @sandguine, May 2020
*/

/* static values across tasks and subjects */
var RADIUS = 100; // radius of circle on the screen always 100px

var CB = ['White', 5]; // parameter for circle border

var CANVAS = '<canvas id="circle" width="800" height="600"> Your browser does not support the HTML5 canvas tag.</canvas>';

/* end static values */



/* all variables */
var colorOptions = ['MediumPurple', 'Gold']; // color options for gain or loss

var optionsPair = [['+12','-9'], ['+9', '-12'], ['+9', '-9'], ['+12', '-6'], ['+6', '-12'], ['+9',
'-6'], ['+6', '-9'], ['+3', '-3'], ['+12', '-3'], ['+3', '-12']]; // all availiable gambles outcomes

var yesNo = ['Yes', 'No']; // for randomization of choices on left and right

var infoPrice = ['0.05', '1', '2', '3', '9']; // available options for information price

var angles = [0, 30, 60, 90, 120, 150]; // all available angles

var outcomeAllAngles = [-15, -45, -75, -105, -135, -165, 165, 135, 105, 75, 45, 15];

var outcomeByAngles = []; // all available outcome depending on the angle
// filling all available outcome depending on the angle
for (var i = 0; i <= outcomeAllAngles.length/2; i++ ){
    outcomeByAngles.push(outcomeAllAngles.slice(i, i+6));
}

var rightSideOP = [-75, -45, -15, 15, 45, 75]; //outcome position on the right side

var leftSideOP = [-105, -135, -165, 165, 135, 105]; //outcome position on the left side
/* end all variables */



/* timeline variables */
var tvOptions = [
    {options: ['+12','-9']},
    {options: ['+9', '-12']},
    {options: ['+9', '-9']},
    {options: ['+12', '-6']},
    {options: ['+6', '-12']},
    {options: ['+9', '-6']},
    {options: ['+6', '-9']},
    {options: ['+3', '-3']},
    {options: ['+12', '-3']},
    {options: ['+3', '-12']}
];

var tvInfoPrice = [
    {infoPrice: '0.05'},
    {infoPrice: '1'},
    {infoPrice: '2'},
    {infoPrice: '3'},
    {infoPrice: '9'}
];

var tvCutOffAngles = [
    {angle: 0},
    {angle: 30},
    {angle: 60},
    {angle: 120},
    {angle: 150},
    {angle: 180}
];

/* end timeline variables */



/* variables assigned at each screen */

var dotAngle; // initialized the angle for the dot outcome

var outcomeAngle;

var infoPayoff;

var payoff;

var gambleDecision;

var infoRevealDecision;

var infoPlayDecision;

/* end variable assigned at each screen */



/* probabilistic variables for stimuli */
var rndColorOptions = jsPsych.randomization.sampleWithoutReplacement(colorOptions);

var rndOptionsPair = jsPsych.randomization.sampleWithoutReplacement(optionsPair);

var rndYNG = jsPsych.randomization.sampleWithoutReplacement(yesNo); // at the 1st gamble screen

var rndYNIR = jsPsych.randomization.sampleWithoutReplacement(yesNo); // if want to reveal info

var rndYNITP = jsPsych.randomization.sampleWithoutReplacement(yesNo); // if want to play after top info is revealed

var rndYNIBP = jsPsych.randomization.sampleWithoutReplacement(yesNo); // if want to play after bottom info is revealed

var rndInfoPrice = jsPsych.randomization.shuffle(infoPrice);

var rndAngles = jsPsych.randomization.shuffle(angles);

var rndOutcomeAllAngles = jsPsych.randomization.shuffle(outcomeAllAngles);

var rndOBA = []; // all available outcome depending on the angle randomized
// fill-in all available outcome depending on the angle randomized
for ( var j = 0; j < angles.length; j++){
    rndOBA.push(jsPsych.randomization.shuffle(outcomeByAngles[j]));
}

/* end probabilistic variables */



/* save global variables */
function addVars(vars){
    jsPsych.data.addProperties(vars);
};

addVars({
  leftColor: rndColorOptions[0],
  rightColor: rndColorOptions[1],
  optionLeft: rndOptionsPair[0][0],
  optionRight: rndOptionsPair[0][1],
  gambleChoiceLeft: rndYNG[0],
  gambleChoiceRight: rndYNG[1],
  infoShowLeft: rndYNIR[0],
  infoShowRight: rndYNIR[1],
  infoPrice: rndInfoPrice[0],
  cutoffAngle: rndAngles[0],
  topInfoOutcomeLeft: rndYNITP[0],
  topInfoOutcomeRight: rndYNITP[1],
  bottomInfoOutcomeLeft: rndYNIBP[0],
  bottomInfoOutcomeRight: rndYNIBP[1],
  infoOutcomeAngle: outcomeAngle,
  infoPayoff: infoPayoff,
  outcomeAngle: rndOutcomeAllAngles[0],
  payoff: payoff
});
/* end save global variables */



/* individual screen */
/* create timeline */
var timeline = [];

/* subject id */
var id = {
  type: 'survey-text',
  questions: [{
      prompt: "<b>Please enter your ID.",
      columns: 5,
      required: true,
      name: 'ID'
  }, {
      prompt: "<b>Please enter the session number.</b><br>Then, press \'Enter\' or click on \'Continue\' to proceed.",
      columns: 5,
      required: true,
      name: 'session'
  }],
};

/* welcome message */
var welcome = {
  type: "html-keyboard-response",
  stimulus: "Welcome to the experiment.<br>Press any key to begin."
};

/* instructions */
var instructions = {
  type: "html-keyboard-response",
  stimulus: "<p>In this experiment, you need to make a couple of decisions.</p>" +
      "<p>A circle will appear in the center of the screen.</p>" +
      "<p>Press <strong>F</strong> for option on the <strong>left</strong>.</p>" +
      "<p>Press <strong>J</strong> for option on the <strong>right</strong>.</p>" +
      "<p><strong>Press any key to begin.</strong></p>",
  post_trial_gap: 200
};

/* pause page before next trial */
var pause = {
    type: 'html-keyboard-response',
    stimulus: 'Press spacebar for the next trial.',
    choices: ' ',
    response_ends_trial: true
};

/* VoI canvas keyboard, gamble screen */
var gamble = {
    type: 'canvas-keyboard-response',
    stimulus: function() {

        var c = document.getElementById("circle");
        var ctx = c.getContext("2d");
        var x = c.width/2;
        var y = c.height/2;

        // draw screen components
        drawCB(CB[0], CB[1]);
        drawCircle(x, y, RADIUS, rndColorOptions[0], rndColorOptions[1]);
        drawMarks(x, y, RADIUS);
        // textGambleChoices(rndOptionsPair[0]);
        textGambleChoices(jsPsych.timelineVariable('options', true));
        textGambleDecision(rndYNG);

        // border of circle: color and stroke width
        function drawCB(color, stroke_width){
            ctx.strokeStyle = color;
            ctx.lineWidth = stroke_width;
        }

        // choice of gambles displayed
        function textGambleChoices(choicesArray){
            var l = choicesArray[0].slice(0, 1)+'$'+choicesArray[0].slice(1);
            var r = choicesArray[1].slice(0, 1)+'$'+choicesArray[1].slice(1);

            ctx.fillStyle = rndColorOptions[0];
            ctx.font = "28px Arial";
            ctx.textAlign = "center";
            ctx.fillText(l, c.width*1/3, c.height*1/3);

            ctx.fillStyle = rndColorOptions[1];
            ctx.font = "28px Arial";
            ctx.textAlign = "center";
            ctx.fillText(r, c.width*2/3, c.height*1/3);
        }

        function textGambleDecision(yesNoArray){
            ctx.fillStyle = "PaleGreen";
            ctx.font = "28px Arial";
            ctx.textAlign = "center";
            ctx.fillText('Play this gamble?', c.width/2, c.height*1/5);
            ctx.fillText(yesNoArray[0], c.width*1/5, c.height*4/5);
            ctx.fillText(yesNoArray[1], c.width*4/5, c.height*4/5);
        }

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

     },
    canvasHTML: CANVAS,
    choices: ['f', 'j'],
    on_finish: function(data){

        var data = jsPsych.data.getLastTrialData().values()[0];
        if(data.response == 70){
            if (data.gambleChoiceLeft == 'Yes'){
                gambleDecision = 'Yes'
                addVars({gambleDecision: gambleDecision})
            } else {
                gambleDecision = 'No'
                addVars({gambleDecision: gambleDecision})
            }
        } else if (data.response == 74){
            if (data.gambleChoiceRight == 'Yes'){
                gambleDecision = 'Yes'
                addVars({gambleDecision: gambleDecision})
            }
            else {
                gambleDecision = 'No'
                addVars({gambleDecision: gambleDecision})
            }
        }
    }
};

/* confirm choice selected for gamble screen */
var confirmGamble = {
    type: 'canvas-keyboard-response',
    stimulus: function() {
        var c = document.getElementById("circle");
        var ctx = c.getContext("2d");
        var x = c.width/2;
        var y = c.height/2;

        // border of circle: color and stroke width
        function drawCB(color, stroke_width){
            ctx.strokeStyle = color;
            ctx.lineWidth = stroke_width;
        }

        // choice of gambles displayed
        function textGambleChoices(choicesArray){
            var l = choicesArray[0].slice(0, 1)+'$'+choicesArray[0].slice(1);
            var r = choicesArray[1].slice(0, 1)+'$'+choicesArray[1].slice(1);

            ctx.fillStyle = rndColorOptions[0];
            ctx.font = "28px Arial";
            ctx.textAlign = "center";
            ctx.fillText(l, c.width*1/3, c.height*1/3);

            ctx.fillStyle = rndColorOptions[1];
            ctx.font = "28px Arial";
            ctx.textAlign = "center";
            ctx.fillText(r, c.width*2/3, c.height*1/3);
        }

        function textGambleYes(yesNoArray){
            ctx.fillStyle = "PaleGreen";
            ctx.font = "28px Arial";
            ctx.textAlign = "center";
            ctx.fillText('Play this gamble?', c.width/2, c.height*1/5);

            if (yesNoArray[0] == 'Yes'){
                ctx.strokeText(yesNoArray[0], c.width*1/5, c.height*4/5);
                ctx.fillText(yesNoArray[1], c.width*4/5, c.height*4/5);
            } else if (yesNoArray[1] == 'Yes') {
                ctx.fillText(yesNoArray[0], c.width*1/5, c.height*4/5);
                ctx.strokeText(yesNoArray[1], c.width*4/5, c.height*4/5);
            }
        }

        function textGambleNo(yesNoArray){
            ctx.fillStyle = "PaleGreen";
            ctx.font = "28px Arial";
            ctx.textAlign = "center";
            ctx.fillText('Play this gamble?', c.width/2, c.height*1/5);

            if (yesNoArray[0] == 'No'){
                ctx.strokeText(yesNoArray[0], c.width*1/5, c.height*4/5);
                ctx.fillText(yesNoArray[1], c.width*4/5, c.height*4/5);
            } else if (yesNoArray[1] == 'No'){
                ctx.fillText(yesNoArray[0], c.width*1/5, c.height*4/5);
                ctx.strokeText(yesNoArray[1], c.width*4/5, c.height*4/5);
            }
        }

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

        // check previous trial
        var data = jsPsych.data.getLastTrialData().values()[0];

        if (data.gambleDecision == 'Yes'){
            // draw screen components
            drawCB(CB[0], CB[1]);
            drawCircle(x, y, RADIUS, rndColorOptions[0], rndColorOptions[1]);
            drawMarks(x, y, RADIUS);
            textGambleChoices(jsPsych.timelineVariable('options', true));
            textGambleYes(rndYNG);
        } else if (data.gambleDecision == 'No'){
            // draw screen components
            drawCB(CB[0], CB[1]);
            drawCircle(x, y, RADIUS, rndColorOptions[0], rndColorOptions[1]);
            drawMarks(x, y, RADIUS);
            textGambleChoices(jsPsych.timelineVariable('options', true));
            textGambleNo(rndYNG);
        }
     },
    canvasHTML: CANVAS,
    choices: jsPsych.NO_KEYS,
    trial_duration: 250,
    response_ends_trial: true
};

/* show gamble results, if yes to gamble or if yes gamble and to info */
var gambleOutcome = {
    type: 'canvas-keyboard-response',
    stimulus: function() {

        var c = document.getElementById("circle");
        var ctx = c.getContext("2d");
        var x = c.width/2;
        var y = c.height/2;
        var RADIUS = 100;
        var angle;

        // draw screen components
        drawCB(CB[0], CB[1]);
        drawCircle(x, y, RADIUS, rndColorOptions[0], rndColorOptions[1]);
        drawMarks(x, y, RADIUS);
        // textGambleChoices(rndOptionsPair[0]);
        textGambleChoices(jsPsych.timelineVariable('options', true));
        drawDot(x, y, RADIUS);
        textGambleOutcome(rndOutcomeAllAngles[0]);

        // border of circle: color and stroke width
        function drawCB(color, stroke_width){
            ctx.strokeStyle = color;
            ctx.lineWidth = stroke_width;
        }

        // choice of gambles displayed
        function textGambleChoices(choicesArray){
            var l = choicesArray[0].slice(0, 1)+'$'+choicesArray[0].slice(1);
            var r = choicesArray[1].slice(0, 1)+'$'+choicesArray[1].slice(1);

            ctx.fillStyle = rndColorOptions[0];
            ctx.font = "28px Arial";
            ctx.textAlign = "center";
            ctx.fillText(l, c.width*1/3, c.height*1/3);

            ctx.fillStyle = rndColorOptions[1];
            ctx.font = "28px Arial";
            ctx.textAlign = "center";
            ctx.fillText(r, c.width*2/3, c.height*1/3);
        }

        // info decision: left choice, right choice, price of the info
        function textGambleOutcome(dotAngle){

            // total payoff is either left or right
            if(rightSideOP.includes(dotAngle)){
                payoff = parseFloat(rndOptionsPair[0][1]);
            } else {
                payoff = parseFloat(rndOptionsPair[0][0]);
            }

            ctx.fillStyle = "Moccasin";
            ctx.font = "28px Arial";
            ctx.textAlign = "center";
            ctx.fillText('Result', c.width/2, c.height*1/5);
            ctx.fillText('Total payoff this round: $'+payoff, c.width/2, c.height*4/5);

            return payoff, dotAngle;
        }

        // draw based circle, inputs: center at x coordinate, y coordinate, radius of a circle, color on the left and color on the right
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


        // draw marks, inputs: center at x coordinate, y coordinate, and radius of a circle
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

        // veil information with grey veil on top of the circle
        function drawVeil(){
            ctx.beginPath()
            ctx.arc(x, y, RADIUS, 0, 2 * Math.PI);
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = "DarkGrey";
            ctx.fill();
        }

        // cut-off line to reveal gambling info
        function drawCutOff(angleX, angleY){
            ctx.beginPath();
            ctx.lineCap = "round";
            ctx.moveTo(angleX-RADIUS, angleY); // y is a variable, need to be saved
            ctx.lineTo(angleX+RADIUS, angleY); // y is a variable, need to be saved
            ctx.strokeStyle = "Crimson";
            ctx.lineWidth = 5;
            ctx.stroke();
        }

        // draw gamble outcome dot
        function drawDot(x, y, r){
            ctx.fillStyle = "Lime";

            a = rndOutcomeAllAngles[0];

            a1 = Math.ceil(a) * Math.PI / 180;

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

     },
    canvasHTML: CANVAS,
    choices: ['f', 'j']
};

/* VoI info purchase screen, if yes to gamble, if no next trial */
var info = {
    type: 'canvas-keyboard-response',
    stimulus: function() {

        var c = document.getElementById("circle");
        var ctx = c.getContext("2d");
        var x = c.width/2;
        var y = c.height/2;

        // draw screen components
        drawCB(CB[0], CB[1]);
        drawCircle(x, y, RADIUS, rndColorOptions[0], rndColorOptions[1]);
        drawMarks(x, y, RADIUS);
        textGambleChoices(jsPsych.timelineVariable('options', true));
        // textGambleChoices(rndOptionsPair[0]);
        textInfoDecision(rndYNIR, jsPsych.timelineVariable('infoPrice', true));
        // textInfoDecision(rndYNIR, rndInfoPrice[0]);
        drawVeil();
        drawCutOffLine(x, y, RADIUS, jsPsych.timelineVariable('angle', true));
        // drawCutOffLine(x, y, RADIUS, rndAngles[0]);

        // border of circle: color and stroke width
        function drawCB(color, stroke_width){
            ctx.strokeStyle = color;
            ctx.lineWidth = stroke_width;
        }

        // choice of gambles displayed
        function textGambleChoices(choicesArray){
            var l = choicesArray[0].slice(0, 1)+'$'+choicesArray[0].slice(1);
            var r = choicesArray[1].slice(0, 1)+'$'+choicesArray[1].slice(1);

            ctx.fillStyle = rndColorOptions[0];
            ctx.font = "28px Arial";
            ctx.textAlign = "center";
            ctx.fillText(l, c.width*1/3, c.height*1/3);

            ctx.fillStyle = rndColorOptions[1];
            ctx.font = "28px Arial";
            ctx.textAlign = "center";
            ctx.fillText(r, c.width*2/3, c.height*1/3);
        }

        // info decision: left choice, right choice, price of the info
        function textInfoDecision(yesNoArray, infoPrice){
            ctx.fillStyle = "Salmon";
            ctx.font = "28px Arial";
            ctx.textAlign = "center";
            ctx.fillText('Purchase this information?', c.width/2, c.height*1/5);
            ctx.fillText('$'+infoPrice, c.width/2, c.height*4/5);
            ctx.fillText(yesNoArray[0], c.width*1/5, c.height*4/5);
            ctx.fillText(yesNoArray[1], c.width*4/5, c.height*4/5);
        }

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

        // veil info
        function drawVeil(){
            ctx.beginPath();
            ctx.arc(x, y, RADIUS, 0, 2 * Math.PI);
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = "DarkGrey";
            ctx.fill();
            ctx.closePath();
        }

        // cut-off line to reveal gambling info
        function drawCutOffLine(x, y, r, a){
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'Crimson';
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

     },
    canvasHTML: CANVAS,
    choices: ['f', 'j'],
    on_finish: function(data){
        var data = jsPsych.data.getLastTrialData().values()[0];
        if(data.response == 70){
            if (data.infoShowLeft == 'Yes'){
                infoRevealDecision = 'Yes'
                addVars({infoRevealDecision: infoRevealDecision})
            } else {
                infoRevealDecision = 'No'
                addVars({infoRevealDecision: infoRevealDecision})
            }
        } else if (data.response == 74){
            if (data.infoShowRight == 'Yes'){
                infoRevealDecision = 'Yes'
                addVars({infoRevealDecision: infoRevealDecision})
            }
            else {
                infoRevealDecision = 'No'
                addVars({infoRevealDecision: infoRevealDecision})
            }
        }
    }
};

/* VoI info purchase screen, if yes to info, if no next trial this is basically one side is grey and the other is not*/
var revealInfo = {
    type: 'canvas-keyboard-response',
    stimulus: function() {

        var c = document.getElementById("circle");
        var ctx = c.getContext("2d");
        var x = c.width/2;
        var y = c.height/2;

        // draw screen components
        drawCB(CB[0], CB[1]);
        drawCircle(x, y, RADIUS, rndColorOptions[0], rndColorOptions[1]);
        drawMarks(x, y, RADIUS);
        textGambleChoices(jsPsych.timelineVariable('options', true));
        // textGambleChoices(rndOptionsPair[0]);
        textTopInfoOutcomeDecision(rndYNITP);
        drawHalfVeil(x, y, RADIUS, jsPsych.timelineVariable('angle', true));
        // drawHalfVeil(x, y, RADIUS, rndAngles[0]);
        drawCutOffLine(x, y, RADIUS, jsPsych.timelineVariable('angle', true));
        // drawCutOffLine(x, y, RADIUS, rndAngles[0]);

        // border of circle: color and stroke width
        function drawCB(color, stroke_width){
            ctx.strokeStyle = color;
            ctx.lineWidth = stroke_width;
        }

        // choice of gambles displayed
        function textGambleChoices(choicesArray){
            var l = choicesArray[0].slice(0, 1)+'$'+choicesArray[0].slice(1);
            var r = choicesArray[1].slice(0, 1)+'$'+choicesArray[1].slice(1);

            ctx.fillStyle = rndColorOptions[0];
            ctx.font = "28px Arial";
            ctx.textAlign = "center";
            ctx.fillText(l, c.width*1/3, c.height*1/3);

            ctx.fillStyle = rndColorOptions[1];
            ctx.font = "28px Arial";
            ctx.textAlign = "center";
            ctx.fillText(r, c.width*2/3, c.height*1/3);
        }

        // info decision: left choice, right choice, price of the info
        function textTopInfoOutcomeDecision(yesNoArray){
            ctx.fillStyle = "Salmon";
            ctx.font = "28px Arial";
            ctx.textAlign = "center";
            ctx.fillText('Play this gamble?', c.width/2, c.height*1/5);
            ctx.fillText(yesNoArray[0], c.width*1/5, c.height*4/5);
            ctx.fillText(yesNoArray[1], c.width*4/5, c.height*4/5);
        }

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

        // reveal veil info
        function drawHalfVeil(x, y, r, a){
            a1 = -(Math.ceil(a/30) * (2 * Math.PI) / 12);
            a2 = -(Math.ceil((a/30)+6) * (2 * Math.PI) / 12);

            ctx.beginPath()
            ctx.arc(x, y, r, a1, a2);
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = "DarkGrey";
            ctx.fill();
            ctx.closePath();
        }

        // cut-off line to reveal gambling info
        function drawCutOffLine(x, y, r, a){
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'Crimson';
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

     },
    canvasHTML: CANVAS,
    choices: ['f', 'j'],
    on_finish: function(data){
        var data = jsPsych.data.getLastTrialData().values()[0];
        if(data.response == 70){
            if (data.topInfoOutcomeLeft == 'Yes'){
                infoPlayDecision = 'Yes'
                addVars({infoPlayDecision: infoPlayDecision})
            } else {
                infoPlayDecision = 'No'
                addVars({infoPlayDecision: infoPlayDecision})
            }
        } else if (data.response == 74){
            if (data.topInfoOutcomeRight == 'Yes'){
                infoPlayDecision = 'Yes'
                addVars({infoPlayDecision: infoPlayDecision})
            }
            else {
                infoPlayDecision = 'No'
                addVars({infoPlayDecision: infoPlayDecision})
            }
        }
    }
};

/* Show the other side of the veil */
var revealOtherInfo = {
    type: 'canvas-keyboard-response',
    stimulus: function() {

        var c = document.getElementById("circle");
        var ctx = c.getContext("2d");
        var x = c.width/2;
        var y = c.height/2;

        // draw screen components
        drawCB(CB[0], CB[1]);
        drawCircle(x, y, RADIUS, rndColorOptions[0], rndColorOptions[1]);
        drawMarks(x, y, RADIUS);
        textGambleChoices(jsPsych.timelineVariable('options', true));
        // textGambleChoices(rndOptionsPair[0]);
        textBottomInfoOutcomeDecision(rndYNIBP);
        drawOtherHalfVeil(x, y, RADIUS, jsPsych.timelineVariable('angle', true));
        // drawOtherHalfVeil(x, y, RADIUS, rndAngles[0]);
        drawCutOffLine(x, y, RADIUS, jsPsych.timelineVariable('angle', true));
        // drawCutOffLine(x, y, RADIUS, rndAngles[0]);


        // border of circle: color and stroke width
        function drawCB(color, stroke_width){
            ctx.strokeStyle = color;
            ctx.lineWidth = stroke_width;
        }

        // choice of gambles displayed
        function textGambleChoices(choicesArray){
            var l = choicesArray[0].slice(0, 1)+'$'+choicesArray[0].slice(1);
            var r = choicesArray[1].slice(0, 1)+'$'+choicesArray[1].slice(1);

            ctx.fillStyle = rndColorOptions[0];
            ctx.font = "28px Arial";
            ctx.textAlign = "center";
            ctx.fillText(l, c.width*1/3, c.height*1/3);

            ctx.fillStyle = rndColorOptions[1];
            ctx.font = "28px Arial";
            ctx.textAlign = "center";
            ctx.fillText(r, c.width*2/3, c.height*1/3);
        }

        // info decision: left choice, right choice, price of the info
        function textBottomInfoOutcomeDecision(yesNoArray){
            ctx.fillStyle = "Salmon";
            ctx.font = "28px Arial";
            ctx.textAlign = "center";
            ctx.fillText('Play this gamble?', c.width/2, c.height*1/5);
            ctx.fillText(yesNoArray[0], c.width*1/5, c.height*4/5);
            ctx.fillText(yesNoArray[1], c.width*4/5, c.height*4/5);
        }

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

        // reveal veil info
        function drawOtherHalfVeil(x, y, r, a){
            a1 = -(Math.ceil(a/30) * (2 * Math.PI) / 12);
            a2 = -(Math.ceil((a/30)+6) * (2 * Math.PI) / 12);

            ctx.beginPath()
            ctx.arc(x, y, r, a2, a1);
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = "DarkGrey";
            ctx.fill();
            ctx.closePath();
        }

        // cut-off line to reveal gambling info
        function drawCutOffLine(x, y, r, a){
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'Crimson';
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

     },
    canvasHTML: CANVAS,
    choices: ['f', 'j'],
    on_finish: function(data){
        var data = jsPsych.data.getLastTrialData().values()[0];
        if(data.response == 70){
            if (data.bottomInfoOutcomeLeft == 'Yes'){
                infoOtherPlayDecision = 'Yes'
                addVars({infoOtherPlayDecision: infoOtherPlayDecision})
            } else {
                infoOtherPlayDecision = 'No'
                addVars({infoOtherPlayDecision: infoOtherPlayDecision})
            }
        } else if (data.response == 74){
            if (data.bottomInfoOutcomeRight == 'Yes'){
                infoOtherPlayDecision = 'Yes'
                addVars({infoOtherPlayDecision: infoOtherPlayDecision})
            }
            else {
                infoOtherPlayDecision = 'No'
                addVars({infoOtherPlayDecision: infoOtherPlayDecision})
            }
        }
    }
};

/* VoI info outcome screen, if yes on info */
var infoOutcome = {
    type: 'canvas-keyboard-response',
    stimulus: function() {

        var c = document.getElementById("circle");
        var ctx = c.getContext("2d");
        var x = c.width/2;
        var y = c.height/2;
        var RADIUS = 100;
        var angle;

        // draw screen components
        drawCB(CB[0], CB[1]);
        drawCircle(x, y, RADIUS, rndColorOptions[0], rndColorOptions[1]);
        drawMarks(x, y, RADIUS);
        textGambleChoices(jsPsych.timelineVariable('options', true));
        // textGambleChoices(rndOptionsPair[0]);
        drawHalfVeil(x, y, RADIUS, rndAngles[0]);
        drawCutOffLine(x, y, RADIUS, rndAngles[0]);
        drawDotHalf(x, y, RADIUS, rndAngles[0]);
        textInfoOutcome(dotAngle);

        // border of circle: color and stroke width
        function drawCB(color, stroke_width){
            ctx.strokeStyle = color;
            ctx.lineWidth = stroke_width;
        }

        // choice of gambles displayed
        function textGambleChoices(choicesArray){
            var l = choicesArray[0].slice(0, 1)+'$'+choicesArray[0].slice(1);
            var r = choicesArray[1].slice(0, 1)+'$'+choicesArray[1].slice(1);

            ctx.fillStyle = rndColorOptions[0];
            ctx.font = "28px Arial";
            ctx.textAlign = "center";
            ctx.fillText(l, c.width*1/3, c.height*1/3);

            ctx.fillStyle = rndColorOptions[1];
            ctx.font = "28px Arial";
            ctx.textAlign = "center";
            ctx.fillText(r, c.width*2/3, c.height*1/3);
        }

        function textInfoOutcome(outcomeAngle){

            // determine total payoff
            if(rightSideOP.includes(outcomeAngle)){
                infoPayoff = parseFloat(rndOptionsPair[0][1]) - parseFloat(rndInfoPrice[0]);
            } else {
                infoPayoff = parseFloat(rndOptionsPair[0][0]) - parseFloat(rndInfoPrice[0]);
            }

            ctx.fillStyle = "Moccasin";
            ctx.font = "28px Arial";
            ctx.textAlign = "center";
            ctx.fillText('Result', c.width/2, c.height*1/5);
            ctx.fillText('Total payoff this round: $'+infoPayoff, c.width/2, c.height*4/5);

            return infoPayoff, outcomeAngle;
        }

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

        // veil info -> this needs to be variable
        function drawHalfVeil(x, y, r, a){
            a1 = -(Math.ceil(a/30) * (2 * Math.PI) / 12);
            a2 = -(Math.ceil((a/30)+6) * (2 * Math.PI) / 12);

            ctx.beginPath()
            ctx.arc(x, y, r, a1, a2);
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = "DarkGrey";
            ctx.fill();
            ctx.closePath();
        }

        // cut-off line to reveal gambling info
        function drawCutOffLine(x, y, r, a){
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'Crimson';
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

        // draw outcome position
        function drawDotHalf(x, y, r, a){
            ctx.fillStyle = "Lime";

            // determine possible outcome options from angle
            if (a == 0) {
                dotAngle = rndOBA[0][0];
            } else if (a == 30) {
                dotAngle = rndOBA[1][0];
            } else if (a == 60){
                dotAngle = rndOBA[2][0];
            } else if (a == 120){
                dotAngle = rndOBA[3][0];
            } else if (a == 150){
                dotAngle = rndOBA[4][0];
            } else {
                dotAngle = rndOBA[5][0];
            }

            a1 = Math.ceil(dotAngle) * Math.PI / 180;

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

     },
    canvasHTML: CANVAS,
    choices: ['f', 'j']
};

/* confirm the choice selected on gamble screen */
// var confirmGamble = {
//     type: 'html-keyboard-response',
//     stimulus: function(){
//         var data = jsPsych.data.getLastTrialData().values()[0];
//         if (gambleDecision == 'Yes'){
//             return '<b>Yes</b>'
//         } else {
//             return '<b>No</b>'
//         }
//     },
//     trial_duration: 3000,
//     response_ends_trial: true
// }
//
// /* confirm the choice selected on info screen */
// var confirmInfoReveal = {
//     type: 'html-keyboard-response',
//     stimulus: function(){
//         var data = jsPsych.data.getLastTrialData().values()[0];
//         if (infoRevealDecision == 'Yes'){
//             return '<b>Yes</b>'
//         } else {
//             return '<b>No</b>'
//         }
//     },
//     trial_duration: 3000,
//     response_ends_trial: true
// }
//
// /* confirm the choice selected on info-play screen */
// var confirmInfoPlay = {
//     type: 'html-keyboard-response',
//     stimulus: function(){
//         var data = jsPsych.data.getLastTrialData().values()[0];
//         if (infoPlayDecision == 'Yes'){
//             return '<b>Yes</b>'
//         } else {
//             return '<b>No</b>'
//         }
//     },
//     trial_duration: 3000,
//     response_ends_trial: true
// }
//
// /* confirm the choice selected on other info-play screen */
// var confirmOtherInfoPlay = {
//     type: 'html-keyboard-response',
//     stimulus: function(){
//         var data = jsPsych.data.getLastTrialData().values()[0];
//         if (infoOtherPlayDecision == 'Yes'){
//             return '<b>Yes</b>'
//         } else {
//             return '<b>No</b>'
//         }
//     },
//     trial_duration: 3000,
//     response_ends_trial: true
// }

/* fixation */
var fixation = {
        type: 'html-keyboard-response',
        stimulus: '<div style="font-size:60px;">+</div>',
        choices: jsPsych.NO_KEYS,
        trial_duration: function(){
            return jsPsych.randomization.sampleWithReplacement([250, 500], 1)[0];
        },
        data: {test_part: 'fixation'}
};

/* end individual screen */


/* if functions */

// if they decide to play the gamble
// var ifGamble = {
//     timeline: [info, confirmInfoReveal],
//     conditional_function: function(){
//         var data = jsPsych.data.get().last(1).values()[0];
//         if(data.gambleDecision == 'Yes'){
//             return true;
//         } else {
//             return false;
//         }
//     }
// }

// if they decide to purchase info
var ifInfoReveal = {
    timeline: [revealInfo, revealOtherInfo],
    conditional_function: function(){
        var data = jsPsych.data.get().last(1).values()[0];
        if(data.infoRevealDecision == 'Yes'){
            return true;
        } else {
            return false;
        }
    }
}

// if they decide to play after info is revealed
// var ifInfoPlay = {
//     timeline: [revealInfo],
//     conditional_function: function(){
//         var data = jsPsych.data.get().last(1).values()[0];
//         if(data.infoRevealDecision == 'Yes'){
//             return true;
//         } else {
//             return false;
//         }
//     }
// }

/* end if functions */



/* test procedure */
var procedure = {
    timeline: [gamble, confirmGamble, info, ifInfoReveal, pause],
    timeline_variables: tvRnd
};

/* end test procedures */
