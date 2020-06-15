/*
* variables for VoI experiment
* Sandy Tanwisuth, @sandguine, May 2020
*/

/* static values across tasks and subjects */
var EID = 'circle'; // element id from css

var CONTEXT = '2d'; // get context 2d

var RADIUS = 100; // radius of circle on the screen always 100px

var CB = ['White', 5]; // parameter for circle border

var CANVAS = '<canvas id="circle" width="800" height="600"> Your browser does not support the HTML5 canvas tag.</canvas>';

var CONFIRM = 1000; // duration of confirmation of choice selected

var FONT = '32px Helvetica'; // font size and color throughout the task

var FULLVEILALPHA = 0.7; // transparency of full veil

var HALFVEILALPHA = 0.9; //transparency of half veil

var FULLVIEL = 'DarkGrey'; // color of full veil

var HALFVEIL = 'DimGrey'; // color of half veil

var GAMBLETEXTCOLOR = 'PaleGreen'; // text color of gamble page

var INFOTEXTCOLOR = 'Salmon'; // text color of info page

var PI = Math.PI; // pi as a constant

var CENTER = 'center'; // center alignment

/* end static values */



/* all variables */
var colorOptions = ['MediumPurple', 'Gold']; // color options for gain or loss

var optionsPair = [['+12','-9'], ['+9', '-12'], ['+9', '-9'], ['+12', '-6'], ['+6', '-12'], ['+9',
'-6'], ['+6', '-9'], ['+3', '-3'], ['+12', '-3'], ['+3', '-12']]; // all availiable gambles outcomes

var yesNo = ['Yes', 'No']; // for randomization of choices on left and right

var infoPrice = ['0.05', '1', '2', '3', '9']; // available options for information price

var angles = [0, 30, 60, -60, -30]; // all available angles -60 == 120, -30 == 150

var outcomeAllAngles = [15, 45, 75, 105, 135, 165, -165, -135, -105, -75, -45, -15];

var outcomeByAngles = []; // all available outcome depending on the angle
// filling all available outcome depending on the angle
for (var i = 0; i <= outcomeAllAngles.length/2; i++ ){
    outcomeByAngles.push(outcomeAllAngles.slice(i, i+6));
}

var rightSideOP = [-75, -45, -15, 15, 45, 75]; //outcome position on the right side

var leftSideOP = [-105, -135, -165, 165, 135, 105]; //outcome position on the left side
/* end all variables */



/* variables assigned at each screen */

var dotAngle; // initialized the angle for the dot outcome

var outcomeAngle; // angle of the outcome

var infoPayoff; // payoff per trial if info screen is selected

var payoff; // payoff if gamble page is selected

var gambleDecision; // decision to gamble or not

var infoRevealDecision; // decision to reveal info or not

var infoPlayDecision; // decision to play the gamble after info is revealed on the 1st screen

var infoOtherPlayDecision; // // decision to play the gamble after info is revealed on the 2nd screen

/* end variable assigned at each screen */



/* probabilistic variables for stimuli */
var rndColorOptions = jsPsych.randomization.sampleWithoutReplacement(colorOptions);

var rndOptionsPair = jsPsych.randomization.sampleWithoutReplacement(optionsPair);

var rndYNG = jsPsych.randomization.sampleWithoutReplacement(yesNo); // at the 1st gamble screen

var rndYNIR = rndYNG; // if want to reveal info

var rndYNITP = rndYNG; // if want to play after top info is revealed

var rndYNIBP = rndYNG; // if want to play after bottom info is revealed

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
  gambleChoiceLeft: rndYNG[0],
  gambleChoiceRight: rndYNG[1],
  infoShowLeft: rndYNIR[0],
  infoShowRight: rndYNIR[1],
  // topInfoOutcomeLeft: rndYNITP[0],
  // topInfoOutcomeRight: rndYNITP[1],
  // bottomInfoOutcomeLeft: rndYNIBP[0],
  // bottomInfoOutcomeRight: rndYNIBP[1],
  infoOutcomeAngle: outcomeAngle,
  infoPayoff: infoPayoff,
  outcomeAngle: rndOutcomeAllAngles[0],
  payoff: payoff
});


db.collection('voi-in-person').doc('v1').collection('participants').doc(uid).set({
  leftColor: rndColorOptions[0],
  rightColor: rndColorOptions[1],
  gambleChoiceLeft: rndYNG[0],
  gambleChoiceRight: rndYNG[1],
  infoShowLeft: rndYNIR[0],
  infoShowRight: rndYNIR[1],
  // topInfoOutcomeLeft: rndYNITP[0],
  // topInfoOutcomeRight: rndYNITP[1],
  // bottomInfoOutcomeLeft: rndYNIBP[0],
  // bottomInfoOutcomeRight: rndYNIBP[1],
  infoOutcomeAngle: outcomeAngle,
  infoPayoff: infoPayoff,
  outcomeAngle: rndOutcomeAllAngles[0],
  payoff: payoff
});
/* end save global variables */



/* individual screen */
/* create timeline */
var timeline = [];

/* fullscreen */
var fullscreen = {
  type: 'fullscreen',
  fullscreen_mode: true
};

/* subject id */
var id = {
  type: 'survey-text',
  questions: [{
      prompt: "Answer the information below, then press \'Enter\' or click on \'Continue\' to proceed. </br> </br> </br> <b>Your ID:</b>",
      columns: 5,
      required: true,
      name: 'ID'
  }, {
      prompt: "<b>Session number:</b>",
      columns: 5,
      required: true,
      name: 'session'
  }],
  on_finish: function(data){
      var data = jsPsych.data.getLastTrialData().values()[0].responses;
      var strid = /(?<="ID":")\d+/g;
      var participantID = parseInt(data.match(strid));
      var strsession = /(?<="session":")\d/g;
      var session = parseInt(data.match(strsession))

      addVars({
          participantID: participantID,
          session: session
      });

      db.collection('voi-in-person').doc('v1').collection('participants').doc(uid).set({
          participantID: participantID,
          session: session
      });
  }
};

var loopID = {
    timeline: [id],
    loop_function: function(data){
        var str = jsPsych.data.getLastTrialData().values()[0].responses;
        var session = /(?<="session":")\d/g;
        var match = parseInt(str.match(session));
        if( match < 1 || match > 2){
            return true;
        } else {
            return false;
        }
    }
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
    type: 'canvas-keyboard-response',
    stimulus: function (){
        var c = document.getElementById(EID);
        var ctx = c.getContext(CONTEXT);
        var x = c.width/2;
        var y = c.height/2;

        function textPause(){
            ctx.strokeStyle = CB[0];
            ctx.fillStyle = CB[0];
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText('Press space bar for the next trial.', c.width*1/2, c.height*1/2);
        }

        textPause();
    },
    canvasHTML: CANVAS,
    choices: ' ',
    response_ends_trial: true
};

/* VoI canvas keyboard, gamble screen */
var gamble = {
    type: 'canvas-keyboard-response',
    stimulus: function() {

        var c = document.getElementById(EID);
        var ctx = c.getContext(CONTEXT);
        var x = c.width/2;
        var y = c.height/2;

        // draw screen components
        drawCB(CB[0], CB[1]);
        drawCircle(x, y, RADIUS, rndColorOptions[0], rndColorOptions[1]);
        drawMarks(x, y, RADIUS);
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
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText(l, c.width*1/3, c.height*1/3);

            ctx.fillStyle = rndColorOptions[1];
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText(r, c.width*2/3, c.height*1/3);
        }

        function textGambleDecision(yesNoArray){
            ctx.fillStyle = GAMBLETEXTCOLOR;
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText('Play this gamble?', c.width/2, c.height*1/5);
            ctx.fillText(yesNoArray[0], c.width*1/5, c.height*4/5);
            ctx.fillText(yesNoArray[1], c.width*4/5, c.height*4/5);
        }

        function drawCircle(x, y, r, color_left, color_right){
            // Right half of the circle
            ctx.beginPath();
            ctx.arc(x, y, r, 0.5*PI, 1.5*PI);
            ctx.fillStyle = color_left;
            ctx.fill();
            ctx.stroke();

            // Left half of the circle
            ctx.beginPath();
            ctx.arc(x, y, r, 1.5*PI, 0.5*PI);
            ctx.fillStyle = color_right;
            ctx.fill();
            ctx.stroke();
        }

        // draw marks inputs: center at x coordinate, y coordinate, and radius of a circle
        function drawMarks(x, y, r){
            for (var i = 0; i < 12; i++) {
                angle = (i - 3) * (PI * 2) / 12;       // THE ANGLE TO MARK.
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

/* confirm the choice selected on gamble screen */
var confirmGamble = {
    type: 'canvas-keyboard-response',
    stimulus: function() {
        var c = document.getElementById(EID);
        var ctx = c.getContext(CONTEXT);
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
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText(l, c.width*1/3, c.height*1/3);

            ctx.fillStyle = rndColorOptions[1];
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText(r, c.width*2/3, c.height*1/3);
        }

        function textGambleYes(yesNoArray){
            ctx.fillStyle = GAMBLETEXTCOLOR;
            ctx.font = FONT;
            ctx.textAlign = CENTER;
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
            ctx.fillStyle = GAMBLETEXTCOLOR;
            ctx.font = FONT;
            ctx.textAlign = CENTER;
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
            ctx.arc(x, y, r, 0.5*PI, 1.5*PI);
            ctx.fillStyle = color_left;
            ctx.fill();
            ctx.stroke();

            // Left half of the circle
            ctx.beginPath();
            ctx.arc(x, y, r, 1.5*PI, 0.5*PI);
            ctx.fillStyle = color_right;
            ctx.fill();
            ctx.stroke();
        }

        // draw marks inputs: center at x coordinate, y coordinate, and radius of a circle
        function drawMarks(x, y, r){
            for (var i = 0; i < 12; i++) {
                angle = (i - 3) * (PI * 2) / 12;       // THE ANGLE TO MARK.
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

        // draw screen components
        drawCB(CB[0], CB[1]);
        drawCircle(x, y, RADIUS, rndColorOptions[0], rndColorOptions[1]);
        drawMarks(x, y, RADIUS);
        textGambleChoices(jsPsych.timelineVariable('options', true));

        if (data.gambleDecision == 'Yes'){
            textGambleYes(rndYNG);
        } else if (data.gambleDecision == 'No'){
            textGambleNo(rndYNG);
        }
     },
    canvasHTML: CANVAS,
    choices: jsPsych.NO_KEYS,
    trial_duration: CONFIRM,
    response_ends_trial: false
};

/* show gamble results, if yes to gamble or if yes gamble and to info */
var gambleOutcome = {
    type: 'canvas-keyboard-response',
    stimulus: function() {
        if (false){
            // if not last trial keeps showing nothing
        } else {
            var c = document.getElementById(EID);
            var ctx = c.getContext(CONTEXT);
            var x = c.width/2;
            var y = c.height/2;
            var RADIUS = 100;
            var angle;

            // draw screen components
            drawCB(CB[0], CB[1]);
            drawCircle(x, y, RADIUS, rndColorOptions[0], rndColorOptions[1]);
            drawMarks(x, y, RADIUS);
            textGambleChoices(jsPsych.timelineVariable('options', true));
            drawDot(x, y, RADIUS);
            textGambleOutcome(rndOutcomeAllAngles[0], jsPsych.timelineVariable('options', true));

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
                ctx.font = FONT;
                ctx.textAlign = CENTER;
                ctx.fillText(l, c.width*1/3, c.height*1/3);

                ctx.fillStyle = rndColorOptions[1];
                ctx.font = FONT;
                ctx.textAlign = CENTER;
                ctx.fillText(r, c.width*2/3, c.height*1/3);
            }

            // info decision: left choice, right choice, price of the info
            function textGambleOutcome(dotAngle, array){

                // total payoff is either left or right
                if(rightSideOP.includes(dotAngle)){
                    payoff = parseFloat(array[1]);
                } else {
                    payoff = parseFloat(array[0]);
                }

                ctx.fillStyle = "Moccasin";
                ctx.font = FONT;
                ctx.textAlign = CENTER;
                ctx.fillText('Result', c.width/2, c.height*1/5);
                ctx.fillText('Total payoff this round: $'+payoff, c.width/2, c.height*4/5);

                return payoff, dotAngle;
            }

            // draw based circle, inputs: center at x coordinate, y coordinate, radius of a circle, color on the left and color on the right
            function drawCircle(x, y, r, color_left, color_right){
                // Right half of the circle
                ctx.beginPath();
                ctx.arc(x, y, r, 0.5*PI, 1.5*PI);
                ctx.fillStyle = color_left;
                ctx.fill();
                ctx.stroke();

                // Left half of the circle
                ctx.beginPath();
                ctx.arc(x, y, r, 1.5*PI, 0.5*PI);
                ctx.fillStyle = color_right;
                ctx.fill();
                ctx.stroke();
            }


            // draw marks, inputs: center at x coordinate, y coordinate, and radius of a circle
            function drawMarks(x, y, r){
                for (var i = 0; i < 12; i++) {
                    angle = (i - 3) * (PI * 2) / 12;       // THE ANGLE TO MARK.
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
                ctx.arc(x, y, RADIUS, 0, 2 * PI);
                ctx.globalAlpha = FULLVEILALPHA;
                ctx.fillStyle = FULLVIEL;
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

                a1 = -(Math.ceil(a) * PI / 180);

                var x1 = (x) + Math.cos(a1) * (r);
                var y1 = (y) + Math.sin(a1) * (r);

                ctx.beginPath();
                ctx.globalAlpha = 1;
                ctx.arc(x1, y1, 5, 0, 2*PI);
                ctx.strokeStyle = 'LimeGreen';
                ctx.lineWidth = 5;
                ctx.stroke();
                ctx.fill();
                ctx.closePath();
            }
        }

     },
    canvasHTML: CANVAS,
    choices: ['f', 'j']
};

/* VoI info purchase screen, if yes to gamble, if no next trial */
var info = {
    type: 'canvas-keyboard-response',
    stimulus: function() {

        var c = document.getElementById(EID);
        var ctx = c.getContext(CONTEXT);
        var x = c.width/2;
        var y = c.height/2;

        // draw screen components
        drawCB(CB[0], CB[1]);
        drawCircle(x, y, RADIUS, rndColorOptions[0], rndColorOptions[1]);
        drawMarks(x, y, RADIUS);
        textGambleChoices(jsPsych.timelineVariable('options', true));
        textInfoDecision(rndYNIR, jsPsych.timelineVariable('infoPrice', true));
        drawVeil();
        drawCutOffLine(x, y, RADIUS, jsPsych.timelineVariable('angle', true));

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
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText(l, c.width*1/3, c.height*1/3);

            ctx.fillStyle = rndColorOptions[1];
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText(r, c.width*2/3, c.height*1/3);
        }

        // info decision: left choice, right choice, price of the info
        function textInfoDecision(yesNoArray, infoPrice){
            ctx.fillStyle = INFOTEXTCOLOR;
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText('Purchase this information?', c.width/2, c.height*725/1000);
            ctx.fillText('$'+infoPrice, c.width/2, c.height*4/5);
            ctx.fillText(yesNoArray[0], c.width*1/5, c.height*4/5);
            ctx.fillText(yesNoArray[1], c.width*4/5, c.height*4/5);
        }

        function drawCircle(x, y, r, color_left, color_right){
            // Right half of the circle
            ctx.beginPath();
            ctx.arc(x, y, r, 0.5*PI, 1.5*PI);
            ctx.fillStyle = color_left;
            ctx.fill();
            ctx.stroke();

            // Left half of the circle
            ctx.beginPath();
            ctx.arc(x, y, r, 1.5*PI, 0.5*PI);
            ctx.fillStyle = color_right;
            ctx.fill();
            ctx.stroke();
        }

        // draw marks inputs: center at x coordinate, y coordinate, and radius of a circle
        function drawMarks(x, y, r){
            for (var i = 0; i < 12; i++) {
                angle = (i - 3) * (PI * 2) / 12;       // THE ANGLE TO MARK.
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
            ctx.arc(x, y, RADIUS, 0, 2 * PI);
            ctx.globalAlpha = FULLVEILALPHA;
            ctx.fillStyle = FULLVIEL;
            ctx.fill();
            ctx.closePath();
        }

        // cut-off line to reveal gambling info
        function drawCutOffLine(x, y, r, a){
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'Crimson';
            ctx.beginPath();

            a1 = -(Math.ceil(a/30) * (2 * PI) / 12);
            a2 = -(Math.ceil((a/30)+6) * (2 * PI) / 12);

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

/* confirm the choice selected on info screen */
var confirmInfoReveal = {
    type: 'canvas-keyboard-response',
    stimulus: function() {
        var c = document.getElementById(EID);
        var ctx = c.getContext(CONTEXT);
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
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText(l, c.width*1/3, c.height*1/3);

            ctx.fillStyle = rndColorOptions[1];
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText(r, c.width*2/3, c.height*1/3);
        }

        function textInfoPrice(infoPrice){
            ctx.fillStyle = INFOTEXTCOLOR;
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText('Purchase this information?', c.width/2, c.height*725/1000);
            ctx.fillText('$'+infoPrice, c.width/2, c.height*4/5);
        }

        function textInfoYes(yesNoArray){
            ctx.fillStyle = INFOTEXTCOLOR;
            ctx.font = FONT;

            if (yesNoArray[0] == 'Yes'){
                ctx.strokeText(yesNoArray[0], c.width*1/5, c.height*4/5);
                ctx.fillText(yesNoArray[1], c.width*4/5, c.height*4/5);
            } else if (yesNoArray[1] == 'Yes') {
                ctx.fillText(yesNoArray[0], c.width*1/5, c.height*4/5);
                ctx.strokeText(yesNoArray[1], c.width*4/5, c.height*4/5);
            }
        }

        function textInfoNo(yesNoArray){
            ctx.fillStyle = INFOTEXTCOLOR;
            ctx.font = FONT;

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
            ctx.arc(x, y, r, 0.5*PI, 1.5*PI);
            ctx.fillStyle = color_left;
            ctx.fill();
            ctx.stroke();

            // Left half of the circle
            ctx.beginPath();
            ctx.arc(x, y, r, 1.5*PI, 0.5*PI);
            ctx.fillStyle = color_right;
            ctx.fill();
            ctx.stroke();
        }

        // draw marks inputs: center at x coordinate, y coordinate, and radius of a circle
        function drawMarks(x, y, r){
            for (var i = 0; i < 12; i++) {
                angle = (i - 3) * (PI * 2) / 12;       // THE ANGLE TO MARK.
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

        // draw screen components
        drawCB(CB[0], CB[1]);
        drawCircle(x, y, RADIUS, rndColorOptions[0], rndColorOptions[1]);
        drawMarks(x, y, RADIUS);
        textGambleChoices(jsPsych.timelineVariable('options', true));
        textInfoPrice(jsPsych.timelineVariable('infoPrice', true));

        // to determine which side was chosen then highlight
        if (data.infoRevealDecision == 'Yes'){
            textInfoYes(rndYNIR);
        } else if (data.infoRevealDecision == 'No'){
            textInfoNo(rndYNIR);
        }
     },
    canvasHTML: CANVAS,
    choices: jsPsych.NO_KEYS,
    trial_duration: CONFIRM,
    response_ends_trial: false
};

/* VoI info purchase screen, if yes to info, if no next trial this is basically one side is grey and the other is not*/
var revealTopInfo = {
    type: 'canvas-keyboard-response',
    stimulus: function() {

        var c = document.getElementById(EID);
        var ctx = c.getContext(CONTEXT);
        var x = c.width/2;
        var y = c.height/2;

        // draw screen components
        drawCB(CB[0], CB[1]);
        drawCircle(x, y, RADIUS, rndColorOptions[0], rndColorOptions[1]);
        drawMarks(x, y, RADIUS);
        textGambleChoices(jsPsych.timelineVariable('options', true));
        textTopInfoOutcomeDecision(rndYNITP);
        drawHalfVeil(x, y, RADIUS, jsPsych.timelineVariable('angle', true));
        drawCutOffLine(x, y, RADIUS, jsPsych.timelineVariable('angle', true));

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
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText(l, c.width*1/3, c.height*1/3);

            ctx.fillStyle = rndColorOptions[1];
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText(r, c.width*2/3, c.height*1/3);
        }

        // info decision: left choice, right choice, price of the info
        function textTopInfoOutcomeDecision(yesNoArray){
            ctx.fillStyle = INFOTEXTCOLOR;
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText('Play this gamble?', c.width/2, c.height*1/5);
            ctx.fillText(yesNoArray[0], c.width*1/5, c.height*4/5);
            ctx.fillText(yesNoArray[1], c.width*4/5, c.height*4/5);
        }

        function drawCircle(x, y, r, color_left, color_right){
            // Right half of the circle
            ctx.beginPath();
            ctx.arc(x, y, r, 0.5*PI, 1.5*PI);
            ctx.fillStyle = color_left;
            ctx.fill();
            ctx.stroke();

            // Left half of the circle
            ctx.beginPath();
            ctx.arc(x, y, r, 1.5*PI, 0.5*PI);
            ctx.fillStyle = color_right;
            ctx.fill();
            ctx.stroke();
        }

        // draw marks inputs: center at x coordinate, y coordinate, and radius of a circle
        function drawMarks(x, y, r){
            for (var i = 0; i < 12; i++) {
                angle = (i - 3) * (PI * 2) / 12;       // THE ANGLE TO MARK.
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
            a1 = -(Math.ceil(a/30) * (2 * PI) / 12);
            a2 = -(Math.ceil((a/30)+6) * (2 * PI) / 12);

            ctx.beginPath()
            ctx.arc(x, y, r, a1, a2);
            ctx.globalAlpha = HALFVEILALPHA;
            ctx.fillStyle = HALFVEIL;
            ctx.fill();
            ctx.closePath();
        }

        // cut-off line to reveal gambling info
        function drawCutOffLine(x, y, r, a){
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'Crimson';
            ctx.beginPath();

            a1 = -(Math.ceil(a/30) * (2 * PI) / 12);
            a2 = -(Math.ceil((a/30)+6) * (2 * PI) / 12);

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
                addVars({infoPlayTop: infoPlayDecision})
            } else {
                infoPlayDecision = 'No'
                addVars({infoPlayTop: infoPlayDecision})
            }
        } else if (data.response == 74){
            if (data.topInfoOutcomeRight == 'Yes'){
                infoPlayDecision = 'Yes'
                addVars({infoPlayTop: infoPlayDecision})
            }
            else {
                infoPlayDecision = 'No'
                addVars({infoPlayTop: infoPlayDecision})
            }
        }
    }
};

/* confirm the choice selected on info-play screen */
var confirmTop = {
    type: 'canvas-keyboard-response',
    stimulus: function() {
        var c = document.getElementById(EID);
        var ctx = c.getContext(CONTEXT);
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
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText(l, c.width*1/3, c.height*1/3);

            ctx.fillStyle = rndColorOptions[1];
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText(r, c.width*2/3, c.height*1/3);
        }

        // info decision: left choice, right choice, price of the info
        function textTopInfo(){
            ctx.fillStyle = INFOTEXTCOLOR;
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText('Play this gamble?', c.width/2, c.height*1/5);
        }

        // info decision: left choice, right choice, price of the info
        function textTopInfoYes(yesNoArray){
            ctx.strokeStyle = CB[0];
            ctx.fillStyle = INFOTEXTCOLOR;
            ctx.font = FONT;
            ctx.textAlign = CENTER;

            if (yesNoArray[0] == 'Yes'){
                ctx.strokeText(yesNoArray[0], c.width*1/5, c.height*4/5);
                ctx.fillText(yesNoArray[1], c.width*4/5, c.height*4/5);
            } else if (yesNoArray[1] == 'Yes') {
                ctx.fillText(yesNoArray[0], c.width*1/5, c.height*4/5);
                ctx.strokeText(yesNoArray[1], c.width*4/5, c.height*4/5);
            }
        }

        function textTopInfoNo(yesNoArray){
            ctx.strokeStyle = CB[0];
            ctx.fillStyle = INFOTEXTCOLOR;
            ctx.font = FONT;
            ctx.textAlign = CENTER;

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
            ctx.arc(x, y, r, 0.5*PI, 1.5*PI);
            ctx.fillStyle = color_left;
            ctx.fill();
            ctx.stroke();

            // Left half of the circle
            ctx.beginPath();
            ctx.arc(x, y, r, 1.5*PI, 0.5*PI);
            ctx.fillStyle = color_right;
            ctx.fill();
            ctx.stroke();
        }

        // draw marks inputs: center at x coordinate, y coordinate, and radius of a circle
        function drawMarks(x, y, r){
            for (var i = 0; i < 12; i++) {
                angle = (i - 3) * (PI * 2) / 12;       // THE ANGLE TO MARK.
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
            a1 = -(Math.ceil(a/30) * (2 * PI) / 12);
            a2 = -(Math.ceil((a/30)+6) * (2 * PI) / 12);

            ctx.beginPath()
            ctx.arc(x, y, r, a1, a2);
            ctx.globalAlpha = HALFVEILALPHA;
            ctx.fillStyle = HALFVEIL;
            ctx.fill();
            ctx.closePath();
        }

        // cut-off line to reveal gambling info
        function drawCutOffLine(x, y, r, a){
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'Crimson';
            ctx.beginPath();

            a1 = -(Math.ceil(a/30) * (2 * PI) / 12);
            a2 = -(Math.ceil((a/30)+6) * (2 * PI) / 12);

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

        var data = jsPsych.data.getLastTrialData().values()[0];

        // draw screen components
        drawCB(CB[0], CB[1]);
        drawCircle(x, y, RADIUS, rndColorOptions[0], rndColorOptions[1]);
        drawMarks(x, y, RADIUS);
        textGambleChoices(jsPsych.timelineVariable('options', true));
        drawHalfVeil(x, y, RADIUS, jsPsych.timelineVariable('angle', true));
        drawCutOffLine(x, y, RADIUS, jsPsych.timelineVariable('angle', true));
        textTopInfo();

        if (data.infoPlayTop == 'Yes'){
            textTopInfoYes(rndYNITP);
        } else if (data.infoPlayTop == 'No'){
            textTopInfoNo(rndYNITP);
        }
    },
    canvasHTML: CANVAS,
    choices: jsPsych.NO_KEYS,
    trial_duration: CONFIRM,
    response_ends_trial: false
};

/* Show the other side of the veil */
var revealBottomInfo = {
    type: 'canvas-keyboard-response',
    stimulus: function() {

        var c = document.getElementById(EID);
        var ctx = c.getContext(CONTEXT);
        var x = c.width/2;
        var y = c.height/2;

        // draw screen components
        drawCB(CB[0], CB[1]);
        drawCircle(x, y, RADIUS, rndColorOptions[0], rndColorOptions[1]);
        drawMarks(x, y, RADIUS);
        textGambleChoices(jsPsych.timelineVariable('options', true));
        textBottomInfo(rndYNIBP);
        drawOtherHalfVeil(x, y, RADIUS, jsPsych.timelineVariable('angle', true));
        drawCutOffLine(x, y, RADIUS, jsPsych.timelineVariable('angle', true));

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
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText(l, c.width*1/3, c.height*1/3);

            ctx.fillStyle = rndColorOptions[1];
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText(r, c.width*2/3, c.height*1/3);
        }

        // info decision: left choice, right choice, price of the info
        function textBottomInfo(yesNoArray){
            ctx.fillStyle = INFOTEXTCOLOR;
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText('Play this gamble?', c.width/2, c.height*1/5);
            ctx.fillText(yesNoArray[0], c.width*1/5, c.height*4/5);
            ctx.fillText(yesNoArray[1], c.width*4/5, c.height*4/5);
        }

        function drawCircle(x, y, r, color_left, color_right){
            // Right half of the circle
            ctx.beginPath();
            ctx.arc(x, y, r, 0.5*PI, 1.5*PI);
            ctx.fillStyle = color_left;
            ctx.fill();
            ctx.stroke();

            // Left half of the circle
            ctx.beginPath();
            ctx.arc(x, y, r, 1.5*PI, 0.5*PI);
            ctx.fillStyle = color_right;
            ctx.fill();
            ctx.stroke();
        }

        // draw marks inputs: center at x coordinate, y coordinate, and radius of a circle
        function drawMarks(x, y, r){
            for (var i = 0; i < 12; i++) {
                angle = (i - 3) * (PI * 2) / 12;       // THE ANGLE TO MARK.
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
            a1 = -(Math.ceil(a/30) * (2 * PI) / 12);
            a2 = -(Math.ceil((a/30)+6) * (2 * PI) / 12);

            ctx.beginPath()
            ctx.arc(x, y, r, a2, a1);
            ctx.globalAlpha = HALFVEILALPHA;
            ctx.fillStyle = HALFVEIL;
            ctx.fill();
            ctx.closePath();
        }

        // cut-off line to reveal gambling info
        function drawCutOffLine(x, y, r, a){
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'Crimson';
            ctx.beginPath();

            a1 = -(Math.ceil(a/30) * (2 * PI) / 12);
            a2 = -(Math.ceil((a/30)+6) * (2 * PI) / 12);

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
                addVars({infoPlayBottom: infoOtherPlayDecision})
            } else {
                infoOtherPlayDecision = 'No'
                addVars({infoPlayBottom: infoOtherPlayDecision})
            }
        } else if (data.response == 74){
            if (data.bottomInfoOutcomeRight == 'Yes'){
                infoOtherPlayDecision = 'Yes'
                addVars({infoPlayBottom: infoOtherPlayDecision})
            }
            else {
                infoOtherPlayDecision = 'No'
                addVars({infoPlayBottom: infoOtherPlayDecision})
            }
        }
    }
};

// /* confirm the choice selected on other info-play screen */
var confirmBottom = {
    type: 'canvas-keyboard-response',
    stimulus: function() {
        var c = document.getElementById(EID);
        var ctx = c.getContext(CONTEXT);
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
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText(l, c.width*1/3, c.height*1/3);

            ctx.fillStyle = rndColorOptions[1];
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText(r, c.width*2/3, c.height*1/3);
        }

        // info decision: left choice, right choice, price of the info
        function textBottomInfo(){
            ctx.fillStyle = INFOTEXTCOLOR;
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText('Play this gamble?', c.width/2, c.height*1/5);
        }

        // info decision: left choice, right choice, price of the info
        function textBottomInfoYes(yesNoArray){
            ctx.strokeStyle = CB[0];
            ctx.fillStyle = INFOTEXTCOLOR;
            ctx.font = FONT;
            ctx.textAlign = CENTER;

            if (yesNoArray[0] == 'Yes'){
                ctx.strokeText(yesNoArray[0], c.width*1/5, c.height*4/5);
                ctx.fillText(yesNoArray[1], c.width*4/5, c.height*4/5);
            } else if (yesNoArray[1] == 'Yes') {
                ctx.fillText(yesNoArray[0], c.width*1/5, c.height*4/5);
                ctx.strokeText(yesNoArray[1], c.width*4/5, c.height*4/5);
            }
        }

        function textBottomInfoNo(yesNoArray){
            ctx.strokeStyle = CB[0];
            ctx.fillStyle = INFOTEXTCOLOR;
            ctx.font = FONT;
            ctx.textAlign = CENTER;

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
            ctx.arc(x, y, r, 0.5*PI, 1.5*PI);
            ctx.fillStyle = color_left;
            ctx.fill();
            ctx.stroke();

            // Left half of the circle
            ctx.beginPath();
            ctx.arc(x, y, r, 1.5*PI, 0.5*PI);
            ctx.fillStyle = color_right;
            ctx.fill();
            ctx.stroke();
        }

        // draw marks inputs: center at x coordinate, y coordinate, and radius of a circle
        function drawMarks(x, y, r){
            for (var i = 0; i < 12; i++) {
                angle = (i - 3) * (PI * 2) / 12;       // THE ANGLE TO MARK.
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
            a1 = -(Math.ceil(a/30) * (2 * PI) / 12);
            a2 = -(Math.ceil((a/30)+6) * (2 * PI) / 12);

            ctx.beginPath()
            ctx.arc(x, y, r, a2, a1);
            ctx.globalAlpha = HALFVEILALPHA;
            ctx.fillStyle = HALFVEIL;
            ctx.fill();
            ctx.closePath();
        }

        // cut-off line to reveal gambling info
        function drawCutOffLine(x, y, r, a){
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'Crimson';
            ctx.beginPath();

            a1 = -(Math.ceil(a/30) * (2 * PI) / 12);
            a2 = -(Math.ceil((a/30)+6) * (2 * PI) / 12);

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

        var data = jsPsych.data.getLastTrialData().values()[0];

        // draw screen components
        drawCB(CB[0], CB[1]);
        drawCircle(x, y, RADIUS, rndColorOptions[0], rndColorOptions[1]);
        drawMarks(x, y, RADIUS);
        textGambleChoices(jsPsych.timelineVariable('options', true));
        drawOtherHalfVeil(x, y, RADIUS, jsPsych.timelineVariable('angle', true));
        drawCutOffLine(x, y, RADIUS, jsPsych.timelineVariable('angle', true));
        textBottomInfo();

        if (data.infoPlayBottom == 'Yes'){
            textBottomInfoYes(rndYNIBP);
        } else if (data.infoPlayBottom == 'No'){
            textBottomInfoNo(rndYNIBP);
        }
    },
    canvasHTML: CANVAS,
    choices: jsPsych.NO_KEYS,
    trial_duration: CONFIRM,
    response_ends_trial: false
};

/* VoI info outcome screen, if yes on info */
var infoOutcome = {
    type: 'canvas-keyboard-response',
    stimulus: function() {

        var c = document.getElementById(EID);
        var ctx = c.getContext(CONTEXT);
        var x = c.width/2;
        var y = c.height/2;
        var RADIUS = 100;
        var angle;

        // draw screen components
        drawCB(CB[0], CB[1]);
        drawCircle(x, y, RADIUS, rndColorOptions[0], rndColorOptions[1]);
        drawMarks(x, y, RADIUS);
        textGambleChoices(jsPsych.timelineVariable('options', true));
        drawHalfVeil(x, y, RADIUS, jsPsych.timelineVariable('angle', true));
        drawCutOffLine(x, y, RADIUS, jsPsych.timelineVariable('angle', true));
        drawDotHalf(x, y, RADIUS, jsPsych.timelineVariable('angle', true));
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
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText(l, c.width*1/3, c.height*1/3);

            ctx.fillStyle = rndColorOptions[1];
            ctx.font = FONT;
            ctx.textAlign = CENTER;
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
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText('Result', c.width/2, c.height*1/5);
            ctx.fillText('Total payoff this round: $'+infoPayoff, c.width/2, c.height*4/5);

            return infoPayoff, outcomeAngle;
        }

        function drawCircle(x, y, r, color_left, color_right){
            // Right half of the circle
            ctx.beginPath();
            ctx.arc(x, y, r, 0.5*PI, 1.5*PI);
            ctx.fillStyle = color_left;
            ctx.fill();
            ctx.stroke();

            // Left half of the circle
            ctx.beginPath();
            ctx.arc(x, y, r, 1.5*PI, 0.5*PI);
            ctx.fillStyle = color_right;
            ctx.fill();
            ctx.stroke();
        }


        // draw marks inputs: center at x coordinate, y coordinate, and radius of a circle
        function drawMarks(x, y, r){
            for (var i = 0; i < 12; i++) {
                angle = (i - 3) * (PI * 2) / 12;       // THE ANGLE TO MARK.
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
            a1 = -(Math.ceil(a/30) * (2 * PI) / 12);
            a2 = -(Math.ceil((a/30)+6) * (2 * PI) / 12);

            ctx.beginPath()
            ctx.arc(x, y, r, a1, a2);
            ctx.globalAlpha = HALFVEILALPHA;
            ctx.fillStyle = HALFVEIL;
            ctx.fill();
            ctx.closePath();
        }

        // cut-off line to reveal gambling info
        function drawCutOffLine(x, y, r, a){
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'Crimson';
            ctx.beginPath();

            a1 = -(Math.ceil(a/30) * (2 * PI) / 12);
            a2 = -(Math.ceil((a/30)+6) * (2 * PI) / 12);

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
                dotAngle = rndOBA[4][0];
            } else if (a == 150){
                dotAngle = rndOBA[5][0];
            }

            a1 = -(Math.ceil(dotAngle) * PI / 180);

            var x1 = (x) + Math.cos(a1) * (r);
            var y1 = (y) + Math.sin(a1) * (r);

            ctx.beginPath();
            ctx.globalAlpha = 1;
            ctx.arc(x1, y1, 5, 0, 2*PI);
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

/* submit */
var submit = {
    type: 'html-button-response',
    choices: ['Submit'],
    prompt: 'You are done! Thanks so much for your participation! Click the button below to submit your response.',
    on_finish: function(){
        jsPsych.data.addProperties(tvTest);

        var alldata = jsPsych.data.get().values();
        var participantID = alldata[0].participantID;
        var session = alldata[0].session;

        db.collection('voi-in-person').doc('v1').collection('participants').doc(uid).set(alldata);

    },
    on_load: function(data){
        db.collection('voi-in-person').doc('v1').collection('participants').doc(uid).update({
            'time_end': new Date().toLocaleTimeString(),
        })
    }
}

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
    timeline: [revealTopInfo, confirmTop, revealBottomInfo, confirmBottom],
    conditional_function: function(){
        var data = jsPsych.data.get().last(1).values()[0];
        if(data.infoRevealDecision == 'Yes'){
            return true;
        } else {
            return false;
        }
    }
}

// if gamble is play but, info is not purchase
// var ifGambleNoInfo = {
//     timeline: [gambleOutcome],
//     timeline_variables: function(){
//         var yesGambleNoInfo = jsPsych.data.get().filter({gambleDecision: 'Yes'}, {infoRevealDecision: 'No'});
//         var str = yesGambleNoInfo.values();
//     },
//     conditional_function: function(){
//         var yesGambleNoInfo = jsPsych.data.get().filter({gambleDecision: 'Yes'}, {infoRevealDecision: 'No'});
//         var rndYGNI = jsPsych.randomization.shuffle(yesGambleNoInfo);
//         var trial = yesGambleNoInfo.values()[0];
//
//         if(trial.gambleDecision == 'Yes' && trial.infoRevealDecision == 'No'){
//             return true;
//         } else {
//             return false;
//         }
//
//     }
// }

// show gamble outcome
var showGambleOutcome = {
    timeline: [gambleOutcome],
    conditional_function: function(){
        var data = jsPsych.data.get().last(1).values()[0];
        if(data.gambleDecision == 'Yes' && data.infoRevealDecision == 'No'){
            return true;
        } else {
            return false;
        }
    }
}

// show info-gamble outcome if played first half
// var showInfoOutcome = {
//     timeline: [infoOutcome],
//     conditional_function: function(){
//         var data = jsPsych.data.get().last(1).values()[0];
//         if(data.infoRevealDecision == 'Yes' && data.infoPlayDecision == 'Yes'){
//             return true;
//         } else {
//             return false;
//         }
//     }
// }

// show info-gamble outcome if played second half
// var showInfoOtherOutcome = {
//     timeline: [infoOtherOutcome],
//     conditional_function: function(){
//         var data = jsPsych.data.get().last(1).values()[0];
//         if(data.infoRevealDecision == 'Yes' && data.infoOtherPlayDecision == 'Yes'){
//             return true;
//         } else {
//             return false;
//         }
//     }
// }

// if they decide to play after info is revealed
// var ifInfoPlay = {
//     timeline: [revealTopInfo],
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
    timeline: [gamble, confirmGamble, info, confirmInfoReveal, ifInfoReveal, pause],
    timeline_variables: tvTest,
    on_finish: function(){
        var options = jsPsych.timelineVariable('options', true); // -> not working properly
        var angle = jsPsych.timelineVariable('angle', true);
        var infoPrice = jsPsych.timelineVariable('infoPrice', true);

        addVars({
            optionLeft: options[0],
            optionRight: options[1],
            angle: angle[0],
            infoPrice: infoPrice[0]
        })

    }
};

// var outcomeProcedure = {
//     timeline: [ifGambleNoInfo]
// };

/* end test procedures */
