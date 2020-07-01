/*
* variables for VoI experiment
* Sandy Tanwisuth, @sandguine, June 2020
*/




/* static values across tasks and subjects */
var EID = 'circle'; // element id from css

var CONTEXT = '2d'; // get context 2d

var RADIUS = 150; // radius of circle on the screen always 100px

var CB = ['White', 7]; // parameter for circle border

var CANVAS = '<canvas id="circle" width="1200" height="900"> Your browser does not support the HTML5 canvas tag.</canvas>';

var CONFIRM = 1000; // duration of confirmation of choice selected

var RPLY = 3000; // duration of replay

var FONT = '48px Nunito'; // font size and color throughout the task

var FULLVEILALPHA = 0.7; // transparency of full veil

var HALFVEILALPHA = 0.9; //transparency of half veil

var DOTCOLOR = 'Lime'; // color of dot outcome

var DOTOUTLINE = 'LimeGreen'; // color of dot circle

var FULLVIEL = 'DarkGrey'; // color of full veil

var HALFVEIL = 'DimGrey'; // color of half veil

var CUTOFFLINE = 'Crimson'; // color of cut-off line

var GAMBLETEXTCOLOR = 'PaleGreen'; // text color of gamble page

var INFOTEXTCOLOR = 'Salmon'; // text color of info page

var RESULTTEXTCOLOR = 'Moccasin'; // text color for result page

var PI = Math.PI; // pi as a constant

var CENTER = 'center'; // center alignment

/* end static values */




/* all variables */
var colorOptions = ['MediumPurple', 'Gold']; // color options for gain or loss

var optionsPair = [['+12','-9'], ['+9', '-12'], ['+9', '-9'], ['+12', '-6'], ['+6', '-12'], ['+9',
'-6'], ['+6', '-9'], ['+3', '-3'], ['+12', '-3'], ['+3', '-12']]; // all availiable gambles outcomes

var yesNo = ['Yes', 'No']; // for randomization of choices on left and right

var infoPrice = ['0.05', '1', '2', '3', '9']; // available options for information price

var angles = [0, 30, 60, 120, 150]; // all available angles -60 == 120, -30 == 150

var outcomeAllAngles = [15, 45, 75, 105, 135, 165, -165, -135, -105, -75, -45, -15];

var ooba = []; // all available outcome depending on the angle
// filling all available outcome depending on the angle
for (var i = 0; i <= outcomeAllAngles.length/2; i++ ){
    ooba.push(outcomeAllAngles.slice(i, i+6));
}

var rightSideOP = [-75, -45, -15, 15, 45, 75]; //outcome position on the right side

var leftSideOP = [-105, -135, -165, 165, 135, 105]; //outcome position on the left side

var onTop = false; // boolean to keep track of which side of outcome to show

/* end all variables */




/* variables assigned at each screen */

var dotAngle; // initialized the angle for the dot outcome

var outcomeAngle; // angle of the outcome

var infoPayoff; // payoff per trial if info screen is selected

var payoff; // payoff if gamble page is selected

var totalPayoff; // total payoff

var gambleDecision; // decision to gamble or not

var infoRevealDecision; // decision to reveal info or not

var infoPlayDecision; // decision to play the gamble after info is revealed on the 1st screen

var infoOtherPlayDecision; // decision to play the gamble after info is revealed on the 2nd screen

var ool; // the left option stimulus for outcome

var oor; // the right option stimulus for outcome

var ip; // info price stimulus for outcome

var coa; // cut off angle stimulus for outcome

var oca; // angle of outcome

var gd; // gamble trial select for payment

var ird; // same index as gd but for info

var i1hd; // same index as gd but for 1st half decision

var i2hd; // same index as gd but for 2nd half decision

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
for ( var j = 0; j < outcomeAllAngles.length/2; j++){
    rndOBA.push(jsPsych.randomization.shuffle(ooba[j]));
}

/* end probabilistic variables */




/* variables for data access */

// to keep track of id and session
var idAndSession = [];

// to keep track of trial data
var trials = []; // all trial so far

// to keep track of start time
var startTime;

// index of random trial to show outcome
var trialIdx;

// to keep track of timeline variables for showing outcome
var optionLeft = [];
var optionRight = [];
var cutoffAngle = [];
var price = [];
var outcomeAngle = []; // all outcomes

for(var i = 0; i < trialVars.length; i++){
    optionLeft.push(trialVars[i].optionLeft);
    optionRight.push(trialVars[i].optionRight);
    cutoffAngle.push(trialVars[i].angle);
    price.push(trialVars[i].infoPrice);
    outcomeAngle.push(trialVars[i].outcome);
}

// to keep track of gamble decision
var gambleDecisions = [];

// to keep track of info reveal decision
var infoRevealDecisions = [];

// to keep track of info 1st half decision
var info1stHalfDecisions = [];

// to keep track of info 2nd half decision
var info2ndHalfDecisions = [];

// to keep gamble outcome stimulus
var gambleYesIdx = [];

// to keep gamble info 1st half stimulus
var info1HYesIdx = [];

// to keep gamble info 2nd half stimulus
var info2HYesIdx = [];

// to keep track of outcome parameters
var paymentParams = [];

/* end variables for data access */




/* save to database */

// initiate database and set id and session and save the experiment parameters to database
var setExpParams = {
    type: 'call-function',
    func: function() {
        db.collection('voi-in-person').doc('v1').collection('participants').doc(uid).set({
            expParams: {
                aParticipantID: idAndSession[0],
                aSessionID: idAndSession[1],
                leftColor: rndColorOptions[0],
                rightColor: rndColorOptions[1],
                choiceLeft: rndYNG[0],
                choiceRight: rndYNG[1]
            }
        });
    }
};

// save trials variables
var saveTrialsVariables = {
  type: 'call-function',
  func: function() {
    db.collection('voi-in-person').doc('v1').collection('participants').doc(uid).update({
        trialVars
    });
  }
};

// save variables by order
var saveVars = {
  type: 'call-function',
  func: function() {
    db.collection('voi-in-person').doc('v1').collection('participants').doc(uid).update({
        variables: {
            optionLeft,
            optionRight,
            cutoffAngle,
            price,
            outcomeAngle,
            gambleDecisions,
            infoRevealDecisions,
            info1stHalfDecisions,
            info2ndHalfDecisions
        }
    });
  }
};

/* save key values of the trials to the database */
var saveTrials = {
    type: 'call-function',
    func: function () {
        db.collection('voi-in-person').doc('v1').collection('participants').doc(uid).update({
            trials
        });
    }
};

/* save outcome information */
var savePayment = {
    type: 'call-function',
    func: function () {
        db.collection('voi-in-person').doc('v1').collection('participants').doc(uid).update({
            paymentParams
        });
    }
};

// function to add param on jsPsych data in parallel
function addVars(vars){
    jsPsych.data.addProperties(vars);
};

// add experiment parameters to data
addVars({
  leftColor: rndColorOptions[0],
  rightColor: rndColorOptions[1],
  gambleChoiceLeft: rndYNG[0],
  gambleChoiceRight: rndYNG[1],
  infoShowLeft: rndYNIR[0],
  infoShowRight: rndYNIR[1],
  topInfoOutcomeLeft: rndYNITP[0],
  topInfoOutcomeRight: rndYNITP[1],
  bottomInfoOutcomeLeft: rndYNIBP[0],
  bottomInfoOutcomeRight: rndYNIBP[1],
});

/* end save to database */





/* individual screens */


/* backend/ maintainance */
// load font
var loadFont = {
    type: 'call-function',
    func: function(){
        WebFont.load({
            google: {
              families: ['Nunito']
            }
        });
    }
};

// fullscreen
var fullscreen = {
  type: 'fullscreen',
  message: '<p>This window will switch to full-screen mode when you press the button below</p>',
  fullscreen_mode: true
};

// subject id
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
      var session = parseInt(data.match(strsession));

      addVars({
          participantID: participantID,
          session: session
      });

      idAndSession.push(participantID, session);
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

// welcome message
var welcome = {
  type: "html-keyboard-response",
  stimulus: "Welcome to the experiment.<br>Press any key to begin."
};

// instructions
var instructions = {
  type: "html-keyboard-response",
  stimulus: "<p>In this experiment, you need to make a couple of decisions.</p>" +
      "<p>A circle will appear in the center of the screen.</p>" +
      "<p>Press <strong>F</strong> for option on the <strong>left</strong>.</p>" +
      "<p>Press <strong>J</strong> for option on the <strong>right</strong>.</p>" +
      "<p><strong>Press any key to begin.</strong></p>",
  post_trial_gap: 200
};

// calculate outcome angle position
var calOCAP = {
    type: 'call-function',
    func: function(){
        coa = jsPsych.timelineVariable('angle', true);
        oca = jsPsych.timelineVariable('outcome', true);

        // determine which side the outcome will land depending on cutoff angle
        switch (coa) {
            case 0:
                onTop = ooba[0].includes(oca)?true:false;
                break;
            case 30:
                onTop = ooba[1].includes(oca)?true:false;
                break;
            case 60:
                onTop = ooba[2].includes(oca)?true:false;
                break;
            case 120:
                onTop = ooba[4].includes(oca)?true:false; // since we skip 90
                break;
            case 150:
                onTop = ooba[5].includes(oca)?true:false;
                break;
        }

        return coa, oca, onTop;
    }
};

// pause page before next trial
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
    response_ends_trial: true,
    on_finish: function(){
        // trials = trials.concat(trial);
    }
};

/* thanks */
var thanks = {
    type: 'html-keyboard-response',
    choices: jsPsych.NO_KEYS,
    stimulus: '<p>Thank you for your participation! </br> Your response has been recorded. </br> Close the window to exit.</p>'
};

/* end backend/ maintainance */




/* main exp */
// VoI canvas keyboard, gamble screen
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
        textGambleChoices(jsPsych.timelineVariable('optionLeft', true), jsPsych.timelineVariable('optionRight', true));
        textGambleDecision(rndYNG);

        // border of circle: color and stroke width
        function drawCB(color, stroke_width){
            ctx.strokeStyle = color;
            ctx.lineWidth = stroke_width;
        }

        // choice of gambles displayed
        function textGambleChoices(left, right){
            var l = left.slice(0, 1)+'$'+left.slice(1);
            var r = right.slice(0, 1)+'$'+right.slice(1);

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
                ctx.lineWidth = CB[1];            // HAND WIDTH.
                ctx.beginPath();

                var x1 = (x) + Math.cos(angle) * (r);
                var y1 = (y) + Math.sin(angle) * (r);
                var x2 = (x) + Math.cos(angle) * (r - (r / 7));
                var y2 = (y) + Math.sin(angle) * (r - (r / 7));

                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);

                ctx.strokeStyle = CB[0];
                ctx.stroke();
            }
        }
     },
    canvasHTML: CANVAS,
    choices: ['f', 'j'],
    on_start: function() {
        startTime = new Date().toLocaleTimeString();
    },
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
        var gambleEndTime = new Date().toLocaleTimeString();
        var toSaveGamble = [{
            gambleTrial: {
                gambleStartTime: startTime,
                gambleRT: data.rt,
                gambleKeyPress: data.response,
                gambleDecision: gambleDecision,
                gambleEndTime: gambleEndTime
            }
        }];
        // save trials
        trials = trials.concat(toSaveGamble);
        gambleDecisions = gambleDecisions.concat(gambleDecision);
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
        function textGambleChoices(left, right){
            var l = left.slice(0, 1)+'$'+left.slice(1);
            var r = right.slice(0, 1)+'$'+right.slice(1);

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
                ctx.lineWidth = CB[1];            // HAND WIDTH.
                ctx.beginPath();

                var x1 = (x) + Math.cos(angle) * (r);
                var y1 = (y) + Math.sin(angle) * (r);
                var x2 = (x) + Math.cos(angle) * (r - (r / 7));
                var y2 = (y) + Math.sin(angle) * (r - (r / 7));

                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);

                ctx.strokeStyle = CB[0];
                ctx.stroke();
            }
        }

        // check previous trial
        var data = jsPsych.data.getLastTrialData().values()[0];

        // draw screen components
        drawCB(CB[0], CB[1]);
        drawCircle(x, y, RADIUS, rndColorOptions[0], rndColorOptions[1]);
        drawMarks(x, y, RADIUS);
        textGambleChoices(jsPsych.timelineVariable('optionLeft', true), jsPsych.timelineVariable('optionRight', true));

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
        textGambleChoices(jsPsych.timelineVariable('optionLeft', true), jsPsych.timelineVariable('optionRight', true));
        textInfoDecision(rndYNIR, jsPsych.timelineVariable('infoPrice', true));
        drawVeil();
        drawCutOffLine(x, y, RADIUS, jsPsych.timelineVariable('angle', true));

        // border of circle: color and stroke width
        function drawCB(color, stroke_width){
            ctx.strokeStyle = color;
            ctx.lineWidth = stroke_width;
        }

        // choice of gambles displayed
        function textGambleChoices(left, right){
            var l = left.slice(0, 1)+'$'+left.slice(1);
            var r = right.slice(0, 1)+'$'+right.slice(1);

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
                ctx.lineWidth = CB[1];            // HAND WIDTH.
                ctx.beginPath();

                var x1 = (x) + Math.cos(angle) * (r);
                var y1 = (y) + Math.sin(angle) * (r);
                var x2 = (x) + Math.cos(angle) * (r - (r / 7));
                var y2 = (y) + Math.sin(angle) * (r - (r / 7));

                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);

                ctx.strokeStyle = CB[0];
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
            ctx.lineWidth = CB[1];
            ctx.strokeStyle = CUTOFFLINE;
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
    on_start: function() {
        startTime = new Date().toLocaleTimeString();
    },
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
        var infoRevealEndTime = new Date().toLocaleTimeString();
        var toSaveIR = [{
            infoTrial: {
                infoRevealStartTime: startTime,
                infoRevealRT: data.rt,
                infoRevealKeyPress: data.response,
                infoRevealDecision: infoRevealDecision,
                infoRevealEndTime: infoRevealEndTime
            }
        }];
        trials = trials.concat(toSaveIR);
        infoRevealDecisions = infoRevealDecisions.concat(infoRevealDecision);

        if(infoRevealDecision == 'No'){
            var toSaveI1H = [{
                info1stHalTrial: {
                    info1stHalfStartTime: 'NA',
                    info1stHalfRT: 'NA',
                    info1stHalfKeyPress: 'NA',
                    info1stHalfDecision: 'NA',
                    info1stHalfEndTime: 'NA'
                }
            }];
            trials = trials.concat(toSaveI1H);
            info1stHalfDecisions = info1stHalfDecisions.concat('NA');

            var toSaveI2H = [{
                info2ndHalTrial: {
                    info2ndHalfStartTime: 'NA',
                    info2ndHalfRT: 'NA',
                    info2ndHalfKeyPress: 'NA',
                    info2ndHalfDecision: 'NA',
                    info2ndHalfEndTime: 'NA'
                }
            }];
            trials = trials.concat(toSaveI2H);
            info2ndHalfDecisions = info2ndHalfDecisions.concat('NA');
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

        // draw screen components
        drawCB(CB[0], CB[1]);
        drawCircle(x, y, RADIUS, rndColorOptions[0], rndColorOptions[1]);
        drawMarks(x, y, RADIUS);
        textGambleChoices(jsPsych.timelineVariable('optionLeft', true), jsPsych.timelineVariable('optionRight', true));
        textInfoPrice(jsPsych.timelineVariable('infoPrice', true));
        drawVeil();
        drawCutOffLine(x, y, RADIUS, jsPsych.timelineVariable('angle', true));

        // check previous trial
        var data = jsPsych.data.getLastTrialData().values()[0];

        // to determine which side was chosen then highlight
        if (data.infoRevealDecision == 'Yes'){
            textInfoYes(rndYNIR);
        } else if (data.infoRevealDecision == 'No'){
            textInfoNo(rndYNIR);
        }

        // border of circle: color and stroke width
        function drawCB(color, stroke_width){
            ctx.strokeStyle = color;
            ctx.lineWidth = stroke_width;
        }

        // choice of gambles displayed
        function textGambleChoices(left, right){
            var l = left.slice(0, 1)+'$'+left.slice(1);
            var r = right.slice(0, 1)+'$'+right.slice(1);

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
                ctx.strokeStyle = CB[0];
                ctx.strokeText(yesNoArray[0], c.width*1/5, c.height*4/5);
                ctx.fillText(yesNoArray[1], c.width*4/5, c.height*4/5);
            } else if (yesNoArray[1] == 'Yes') {
                ctx.strokeStyle = CB[0];
                ctx.fillText(yesNoArray[0], c.width*1/5, c.height*4/5);
                ctx.strokeText(yesNoArray[1], c.width*4/5, c.height*4/5);
            }
        }

        function textInfoNo(yesNoArray){
            ctx.fillStyle = INFOTEXTCOLOR;
            ctx.font = FONT;

            if (yesNoArray[0] == 'No'){
                ctx.strokeStyle = CB[0];
                ctx.strokeText(yesNoArray[0], c.width*1/5, c.height*4/5);
                ctx.fillText(yesNoArray[1], c.width*4/5, c.height*4/5);
            } else if (yesNoArray[1] == 'No'){
                ctx.strokeStyle = CB[0];
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
                ctx.lineWidth = CB[1];            // HAND WIDTH.
                ctx.beginPath();

                var x1 = (x) + Math.cos(angle) * (r);
                var y1 = (y) + Math.sin(angle) * (r);
                var x2 = (x) + Math.cos(angle) * (r - (r / 7));
                var y2 = (y) + Math.sin(angle) * (r - (r / 7));

                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);

                ctx.strokeStyle = CB[0];
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
            ctx.lineWidth = CB[1];
            ctx.strokeStyle = CUTOFFLINE;
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
        textGambleChoices(jsPsych.timelineVariable('optionLeft', true), jsPsych.timelineVariable('optionRight', true));
        textTopInfoOutcomeDecision(rndYNITP);
        drawHalfVeil(x, y, RADIUS, jsPsych.timelineVariable('angle', true));
        drawCutOffLine(x, y, RADIUS, jsPsych.timelineVariable('angle', true));

        // border of circle: color and stroke width
        function drawCB(color, stroke_width){
            ctx.strokeStyle = color;
            ctx.lineWidth = stroke_width;
        }

        // choice of gambles displayed
        function textGambleChoices(left, right){
            var l = left.slice(0, 1)+'$'+left.slice(1);
            var r = right.slice(0, 1)+'$'+right.slice(1);

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
                ctx.lineWidth = CB[1];            // HAND WIDTH.
                ctx.beginPath();

                var x1 = (x) + Math.cos(angle) * (r);
                var y1 = (y) + Math.sin(angle) * (r);
                var x2 = (x) + Math.cos(angle) * (r - (r / 7));
                var y2 = (y) + Math.sin(angle) * (r - (r / 7));

                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);

                ctx.strokeStyle = CB[0];
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
            ctx.lineWidth = CB[1];
            ctx.strokeStyle = CUTOFFLINE;
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
    on_start: function() {
        startTime = new Date().toLocaleTimeString();
    },
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
        var info1stHalfEndTime = new Date().toLocaleTimeString();
        var toSaveI1H = [{
            info1stHalfTrial: {
                info1stHalfStartTime: startTime,
                info1stHalfRT: data.rt,
                info1stHalfKeyPress: data.response,
                info1stHalfDecision: infoPlayDecision,
                info1stHalfEndTime: info1stHalfEndTime
            }
        }];
        trials = trials.concat(toSaveI1H);
        info1stHalfDecisions = info1stHalfDecisions.concat(infoPlayDecision);

        var toSaveI2H = [{
            info2ndHalTrial: {
                info2ndHalfStartTime: 'NA',
                info2ndHalfRT: 'NA',
                info2ndHalfKeyPress: 'NA',
                info2ndHalfDecision: 'NA',
                info2ndHalfEndTime: 'NA'
            }
        }];
        trials = trials.concat(toSaveI2H);
        info2ndHalfDecisions = info2ndHalfDecisions.concat('NA');
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
        function textGambleChoices(left, right){
            var l = left.slice(0, 1)+'$'+left.slice(1);
            var r = right.slice(0, 1)+'$'+right.slice(1);

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
                ctx.lineWidth = CB[1];            // HAND WIDTH.
                ctx.beginPath();

                var x1 = (x) + Math.cos(angle) * (r);
                var y1 = (y) + Math.sin(angle) * (r);
                var x2 = (x) + Math.cos(angle) * (r - (r / 7));
                var y2 = (y) + Math.sin(angle) * (r - (r / 7));

                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);

                ctx.strokeStyle = CB[0];
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
            ctx.lineWidth = CB[1];
            ctx.strokeStyle = CUTOFFLINE;
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
        textGambleChoices(jsPsych.timelineVariable('optionLeft', true), jsPsych.timelineVariable('optionRight', true));
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
        textGambleChoices(jsPsych.timelineVariable('optionLeft', true), jsPsych.timelineVariable('optionRight', true));
        textBottomInfo(rndYNIBP);
        drawOtherHalfVeil(x, y, RADIUS, jsPsych.timelineVariable('angle', true));
        drawCutOffLine(x, y, RADIUS, jsPsych.timelineVariable('angle', true));

        // border of circle: color and stroke width
        function drawCB(color, stroke_width){
            ctx.strokeStyle = color;
            ctx.lineWidth = stroke_width;
        }

        // choice of gambles displayed
        function textGambleChoices(left, right){
            var l = left.slice(0, 1)+'$'+left.slice(1);
            var r = right.slice(0, 1)+'$'+right.slice(1);

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
                ctx.lineWidth = CB[1];            // HAND WIDTH.
                ctx.beginPath();

                var x1 = (x) + Math.cos(angle) * (r);
                var y1 = (y) + Math.sin(angle) * (r);
                var x2 = (x) + Math.cos(angle) * (r - (r / 7));
                var y2 = (y) + Math.sin(angle) * (r - (r / 7));

                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);

                ctx.strokeStyle = CB[0];
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
            ctx.lineWidth = CB[1];
            ctx.strokeStyle = CUTOFFLINE;
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
    choices: ['f', 'j'],on_start: function() {
        startTime = new Date().toLocaleTimeString();
    },
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
        var info2ndHalfEndTime = new Date().toLocaleTimeString();
        var toSaveI1H = [{
            info1stHalTrial: {
                info1stHalfStartTime: 'NA',
                info1stHalfRT: 'NA',
                info1stHalfKeyPress: 'NA',
                info1stHalfDecision: 'NA',
                info1stHalfEndTime: 'NA'
            }
        }];
        trials = trials.concat(toSaveI1H);
        info1stHalfDecisions = info1stHalfDecisions.concat('NA');

        var toSaveI2H = [{
            info2ndHalfTrial: {
                info2ndHalfStartTime: startTime,
                info2ndHalfRT: data.rt,
                info2ndHalfKeyPress: data.response,
                info2ndHalfDecision: infoOtherPlayDecision,
                info2ndHalfEndTime: info2ndHalfEndTime
            }
        }];
        trials = trials.concat(toSaveI2H);
        info2ndHalfDecisions = info2ndHalfDecisions.concat(infoOtherPlayDecision);
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
        function textGambleChoices(left, right){
            var l = left.slice(0, 1)+'$'+left.slice(1);
            var r = right.slice(0, 1)+'$'+right.slice(1);

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
                ctx.lineWidth = CB[1];            // HAND WIDTH.
                ctx.beginPath();

                var x1 = (x) + Math.cos(angle) * (r);
                var y1 = (y) + Math.sin(angle) * (r);
                var x2 = (x) + Math.cos(angle) * (r - (r / 7));
                var y2 = (y) + Math.sin(angle) * (r - (r / 7));

                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);

                ctx.strokeStyle = CB[0];
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
            ctx.lineWidth = CB[1];
            ctx.strokeStyle = CUTOFFLINE;
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
        textGambleChoices(jsPsych.timelineVariable('optionLeft', true), jsPsych.timelineVariable('optionRight', true));
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
/* end main exp */





/* payment */
// to signal the payment section
var signalPayment = {
    type: 'canvas-keyboard-response',
    stimulus: function (){
        var c = document.getElementById(EID);
        var ctx = c.getContext(CONTEXT);
        var x = c.width/2;
        var y = c.height/2;

        function textSignalPayment(){
            ctx.strokeStyle = CB[0];
            ctx.fillStyle = RESULTTEXTCOLOR;
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText('Your payment will be shown in the next section.', c.width*1/2, c.height*1/2);
            ctx.fillText('Press space bar to continue.', c.width*1/2, c.height*3/5);
        }

        textSignalPayment();
    },
    canvasHTML: CANVAS,
    choices: ' ',
    response_ends_trial: true,
    on_finish: function(){
        // trials = trials.concat(trial);
    }
};

// replay of gamble screen
// replay of gamble screen
var gambleReplay = {
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
        textGambleChoices(ool, oor);
        textGambleDecision();

        // border of circle: color and stroke width
        function drawCB(color, stroke_width){
            ctx.strokeStyle = color;
            ctx.lineWidth = stroke_width;
        }

        // choice of gambles displayed
        function textGambleChoices(left, right){
            var l = left.slice(0, 1)+'$'+left.slice(1);
            var r = right.slice(0, 1)+'$'+right.slice(1);

            ctx.fillStyle = rndColorOptions[0];
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText(l, c.width*1/3, c.height*1/3);

            ctx.fillStyle = rndColorOptions[1];
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText(r, c.width*2/3, c.height*1/3);
        }

        function textGambleDecision(){
            ctx.fillStyle = GAMBLETEXTCOLOR;
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText('These options were presented.', c.width/2, c.height*1/5);
            ctx.fillText('You selected \'' + gd + '\'.', c.width*1/2, c.height*4/5);
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
                ctx.lineWidth = CB[1];            // HAND WIDTH.
                ctx.beginPath();

                var x1 = (x) + Math.cos(angle) * (r);
                var y1 = (y) + Math.sin(angle) * (r);
                var x2 = (x) + Math.cos(angle) * (r - (r / 7));
                var y2 = (y) + Math.sin(angle) * (r - (r / 7));

                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);

                ctx.strokeStyle = CB[0];
                ctx.stroke();
            }
        }
     },
    canvasHTML: CANVAS,
    choices: jsPsych.NO_KEYS,
    trial_duration: RPLY,
    response_ends_trial: false,
    on_start: function() {
        startTime = new Date().toLocaleTimeString();
        // gambleDecisions.forEach((decision, index) => decision === 'Yes' ? gambleYesIdx.push(index) : null)
        var trialIndexes = [];
        gambleDecisions.forEach((decision, index) => trialIndexes.push(index));
        trialIdx = jsPsych.randomization.shuffle(trialIndexes)[0];
        coa = cutoffAngle[trialIdx];
        oca = outcomeAngle[trialIdx];

        // determine which side the outcome will land depending on cutoff angle
        switch (coa) {
            case 0:
                onTop = ooba[0].includes(oca)?true:false;
                break;
            case 30:
                onTop = ooba[1].includes(oca)?true:false;
                break;
            case 60:
                onTop = ooba[2].includes(oca)?true:false;
                break;
            case 120:
                onTop = ooba[4].includes(oca)?true:false; // since we skip 90
                break;
            case 150:
                onTop = ooba[5].includes(oca)?true:false;
                break;
        }


        ool = optionLeft[trialIdx];
        oor = optionRight[trialIdx];
        ip = price[trialIdx];
        coa = cutoffAngle[trialIdx];
        oca = outcomeAngle[trialIdx];
        gd = gambleDecisions[trialIdx];
        ird = infoRevealDecisions[trialIdx];
        i1hd = info1stHalfDecisions[trialIdx];
        i2hd = info2ndHalfDecisions[trialIdx];

        return coa, oca, onTop;
    }
};

// info purchase screen
var infoReplay = {
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
        textGambleChoices(ool, oor);
        textInfoDecision(rndYNIR, ip);
        drawVeil();
        drawCutOffLine(x, y, RADIUS, coa);

        // border of circle: color and stroke width
        function drawCB(color, stroke_width){
            ctx.strokeStyle = color;
            ctx.lineWidth = stroke_width;
        }

        // choice of gambles displayed
        function textGambleChoices(left, right){
            var l = left.slice(0, 1)+'$'+left.slice(1);
            var r = right.slice(0, 1)+'$'+right.slice(1);

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
            ctx.fillText('You selected \''+ird+'\' to purchase the information at $'+infoPrice+'.', c.width/2, c.height*4/5);
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
                ctx.lineWidth = CB[1];            // HAND WIDTH.
                ctx.beginPath();

                var x1 = (x) + Math.cos(angle) * (r);
                var y1 = (y) + Math.sin(angle) * (r);
                var x2 = (x) + Math.cos(angle) * (r - (r / 7));
                var y2 = (y) + Math.sin(angle) * (r - (r / 7));

                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);

                ctx.strokeStyle = CB[0];
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
            ctx.lineWidth = CB[1];
            ctx.strokeStyle = CUTOFFLINE;
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

        // draw gamble outcome dot
        function drawDot(x, y, r, a){
            ctx.fillStyle = DOTCOLOR;

            a1 = -(Math.ceil(a) * PI / 180);

            var x1 = (x) + Math.cos(a1) * (r);
            var y1 = (y) + Math.sin(a1) * (r);

            ctx.beginPath();
            ctx.globalAlpha = 1;
            ctx.arc(x1, y1, 5, 0, 2*PI);
            ctx.strokeStyle = DOTOUTLINE;
            ctx.lineWidth = CB[1];
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }

     },
    canvasHTML: CANVAS,
    choices: jsPsych.NO_KEYS,
    trial_duration: RPLY,
    response_ends_trial: false
};

// show gamble result if gamble = yes, info = no
var gambleOutcome = {
    type: 'canvas-keyboard-response',
    stimulus: function() {

        var c = document.getElementById(EID);
        var ctx = c.getContext(CONTEXT);
        var x = c.width/2;
        var y = c.height/2;
        var angle;

        // draw screen components
        drawCB(CB[0], CB[1]);
        drawCircle(x, y, RADIUS, rndColorOptions[0], rndColorOptions[1]);
        drawMarks(x, y, RADIUS);
        textGambleChoices(ool, oor);
        drawDot(x, y, RADIUS, oca);
        textGambleOutcome(oca, [ool, oor]);

        // border of circle: color and stroke width
        function drawCB(color, stroke_width){
            ctx.strokeStyle = color;
            ctx.lineWidth = stroke_width;
        }

        // choice of gambles displayed
        function textGambleChoices(left, right){
            var l = left.slice(0, 1)+'$'+left.slice(1);
            var r = right.slice(0, 1)+'$'+right.slice(1);

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

            totalPayoff = payoff;

            // check if positive add + sign then convert to string
            if(payoff >= 0){
                payoff = '+' + payoff.toString()
            } else {
                payoff = payoff.toString()
            }
            payoff = payoff.slice(0, 1)+'$'+payoff.slice(1);

            // check if select not to play
            if(gd == 'No'){
                payoff = '+$0'
                totalPayoff = '+$0'
            }

            ctx.fillStyle = RESULTTEXTCOLOR;
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText('Result', c.width/2, c.height*1/5);
            ctx.fillText('Result: '+ payoff, c.width/2, c.height*725/1000);
            ctx.fillText('Total payoff: '+ payoff, c.width/2, c.height*4/5);
            ctx.fillText('Press space bar to continue.', c.width/2, c.height*875/1000);

            return payoff, dotAngle, totalPayoff;
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
                ctx.lineWidth = CB[1];            // HAND WIDTH.
                ctx.beginPath();

                var x1 = (x) + Math.cos(angle) * (r);
                var y1 = (y) + Math.sin(angle) * (r);
                var x2 = (x) + Math.cos(angle) * (r - (r / 7));
                var y2 = (y) + Math.sin(angle) * (r - (r / 7));

                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);

                ctx.strokeStyle = CB[0];
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
            ctx.lineWidth = CB[1];
            ctx.stroke();
        }

        // draw gamble outcome dot
        function drawDot(x, y, r, a){
            ctx.fillStyle = DOTCOLOR;

            a1 = -(Math.ceil(a) * PI / 180);

            var x1 = (x) + Math.cos(a1) * (r);
            var y1 = (y) + Math.sin(a1) * (r);

            ctx.beginPath();
            ctx.globalAlpha = 1;
            ctx.arc(x1, y1, 5, 0, 2*PI);
            ctx.strokeStyle = DOTOUTLINE;
            ctx.lineWidth = CB[1];
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }
     },
    canvasHTML: CANVAS,
    choices: [' '],
    on_start: function() {
        startTime = new Date().toLocaleTimeString();
    },
    on_finish: function() {
        var paymentEndTime = new Date().toLocaleTimeString();
        var paymentParam = [{
            payment: {
                paymentStartTime: startTime,
                paymentEndTime: paymentEndTime,
                paymentOptionLeft: ool,
                paymentOptionRight: oor,
                paymentCutoffAngle: coa,
                paymentAngle: oca,
                paymentPayOff: payoff,
                paymentIndex: trialIdx
            }
        }];
        paymentParams = paymentParams.concat(paymentParam);
    }
};

// show info result if gamble no, info = no
var infoOutcome = {
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
        textGambleChoices(ool, oor);
        textInfoDecision(rndYNIR, ip);
        drawVeil();
        drawCutOffLine(x, y, RADIUS, coa);
        if(gd == 'No' && ird == 'No'){
            drawDot(x, y, RADIUS, oca);
        }

        // border of circle: color and stroke width
        function drawCB(color, stroke_width){
            ctx.strokeStyle = color;
            ctx.lineWidth = stroke_width;
        }

        // choice of gambles displayed
        function textGambleChoices(left, right){
            var l = left.slice(0, 1)+'$'+left.slice(1);
            var r = right.slice(0, 1)+'$'+right.slice(1);

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
            // if 'No' show total payoff = 0
            if(gd == 'No' && ird == 'No'){
                payoff = '+$0'

                ctx.fillStyle = RESULTTEXTCOLOR;
                ctx.font = FONT;
                ctx.textAlign = CENTER;
                ctx.fillText('Result', c.width/2, c.height*1/5);
                ctx.fillText('Result: '+ payoff, c.width/2, c.height*725/1000);
                ctx.fillText('Total payoff: '+ payoff, c.width/2, c.height*4/5);
                ctx.fillText('Press space bar to continue.', c.width/2, c.height*875/1000);

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
                ctx.lineWidth = CB[1];            // HAND WIDTH.
                ctx.beginPath();

                var x1 = (x) + Math.cos(angle) * (r);
                var y1 = (y) + Math.sin(angle) * (r);
                var x2 = (x) + Math.cos(angle) * (r - (r / 7));
                var y2 = (y) + Math.sin(angle) * (r - (r / 7));

                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);

                ctx.strokeStyle = CB[0];
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
            ctx.lineWidth = CB[1];
            ctx.strokeStyle = CUTOFFLINE;
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

        // draw gamble outcome dot
        function drawDot(x, y, r, a){
            ctx.fillStyle = DOTCOLOR;

            a1 = -(Math.ceil(a) * PI / 180);

            var x1 = (x) + Math.cos(a1) * (r);
            var y1 = (y) + Math.sin(a1) * (r);

            ctx.beginPath();
            ctx.globalAlpha = 1;
            ctx.arc(x1, y1, 5, 0, 2*PI);
            ctx.strokeStyle = DOTOUTLINE;
            ctx.lineWidth = CB[1];
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }

     },
    canvasHTML: CANVAS,
    choices: [' '],
    on_start: function() {
        startTime = new Date().toLocaleTimeString();
    },
    on_finish: function() {
        var paymentEndTime = new Date().toLocaleTimeString();
        var paymentParam = [{
            payment: {
                paymentStartTime: startTime,
                paymentEndTime: paymentEndTime,
                paymentOptionLeft: ool,
                paymentOptionRight: oor,
                paymentCutoffAngle: coa,
                paymentAngle: oca,
                paymentPayOff: payoff,
                paymentIndex: trialIdx
            }
        }];
        paymentParams = paymentParams.concat(paymentParam);
    }
};

// outcome of info screen if outcome is in the top (info = yes)
var infoTopOutcome = {
    type: 'canvas-keyboard-response',
    stimulus: function() {

        var c = document.getElementById(EID);
        var ctx = c.getContext(CONTEXT);
        var x = c.width/2;
        var y = c.height/2;
        var angle;

        // draw screen components
        drawCB(CB[0], CB[1]);
        drawCircle(x, y, RADIUS, rndColorOptions[0], rndColorOptions[1]);
        drawMarks(x, y, RADIUS);
        textGambleChoices(ool, oor);
        drawHalfVeil(x, y, RADIUS, coa);
        drawCutOffLine(x, y, RADIUS, coa);
        drawDotHalf(x, y, RADIUS, oca);
        textInfoOutcome(oca, [ool, oor]);

        // border of circle: color and stroke width
        function drawCB(color, stroke_width){
            ctx.strokeStyle = color;
            ctx.lineWidth = stroke_width;
        }

        // choice of gambles displayed
        function textGambleChoices(left, right){
            var l = left.slice(0, 1)+'$'+left.slice(1);
            var r = right.slice(0, 1)+'$'+right.slice(1);

            ctx.fillStyle = rndColorOptions[0];
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText(l, c.width*1/3, c.height*1/3);

            ctx.fillStyle = rndColorOptions[1];
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText(r, c.width*2/3, c.height*1/3);
        }

        function textInfoOutcome(dotAngle, array){
            // total payoff is either left or right
            if(rightSideOP.includes(dotAngle)){
                payoff = parseFloat(array[1]);
            } else {
                payoff = parseFloat(array[0]);
            }

            totalPayoff = payoff - parseFloat(ip);

            // check if positive add + sign then convert to string
            if(payoff >= 0){
                payoff = '+' + payoff.toString()
            } else {
                payoff = payoff.toString()
            }
            payoff = payoff.slice(0, 1)+'$'+payoff.slice(1);

            // check if select not to play
            if(ird == 'Yes' && i1hd == 'No'){
                payoff = '+$0'
                totalPayoff = 0-parseFloat(ip);
            }

            // the same goes for totalPayoff
            if(totalPayoff >= 0){
                totalPayoff = '+' + totalPayoff.toString()
            } else {
                totalPayoff = totalPayoff.toString()
            }
            totalPayoff = totalPayoff.slice(0, 1)+'$'+totalPayoff.slice(1);


            ctx.fillStyle = RESULTTEXTCOLOR;
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText('Result', c.width/2, c.height*1/5);
            ctx.fillText('Result: '+ payoff, c.width/2, c.height*725/1000);
            ctx.fillText('Total payoff: '+ totalPayoff, c.width/2, c.height*4/5);
            ctx.fillText('Press space bar to continue.', c.width/2, c.height*875/1000);

            return payoff, dotAngle, totalPayoff;
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
                ctx.lineWidth = CB[1];            // HAND WIDTH.
                ctx.beginPath();

                var x1 = (x) + Math.cos(angle) * (r);
                var y1 = (y) + Math.sin(angle) * (r);
                var x2 = (x) + Math.cos(angle) * (r - (r / 7));
                var y2 = (y) + Math.sin(angle) * (r - (r / 7));

                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);

                ctx.strokeStyle = CB[0];
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
            ctx.lineWidth = CB[1];
            ctx.strokeStyle = CUTOFFLINE;
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
            ctx.fillStyle = DOTCOLOR;

            a1 = -(Math.ceil(a) * PI / 180);

            var x1 = (x) + Math.cos(a1) * (r);
            var y1 = (y) + Math.sin(a1) * (r);

            ctx.beginPath();
            ctx.globalAlpha = 1;
            ctx.arc(x1, y1, 5, 0, 2*PI);
            ctx.strokeStyle = DOTOUTLINE;
            ctx.lineWidth = CB[1];
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }

     },
    canvasHTML: CANVAS,
    choices: [' '],
    on_start: function() {
        startTime = new Date().toLocaleTimeString();
    },
    on_finish: function() {
        var paymentEndTime = new Date().toLocaleTimeString();
        var paymentParam = [{
            payment: {
                paymentStartTime: startTime,
                paymentEndTime: paymentEndTime,
                paymentOptionLeft: ool,
                paymentOptionRight: oor,
                paymentCutoffAngle: coa,
                paymentAngle: oca,
                paymentPayOff: payoff,
                paymentTotal: totalPayoff,
                paymentIndex: trialIdx
            }
        }];
        paymentParams = paymentParams.concat(paymentParam);
    }
};

// outcome of info screen if outcome is in the bottom (info = yes)
var infoBottomOutcome = {
    type: 'canvas-keyboard-response',
    stimulus: function() {

        var c = document.getElementById(EID);
        var ctx = c.getContext(CONTEXT);
        var x = c.width/2;
        var y = c.height/2;
        var angle;

        // draw screen components
        drawCB(CB[0], CB[1]);
        drawCircle(x, y, RADIUS, rndColorOptions[0], rndColorOptions[1]);
        drawMarks(x, y, RADIUS);
        textGambleChoices(ool, oor);
        drawOtherHalfVeil(x, y, RADIUS, coa);
        drawCutOffLine(x, y, RADIUS, coa);
        drawDotHalf(x, y, RADIUS, oca);
        textInfoOtherOutcome(oca, [ool, oor]);

        // border of circle: color and stroke width
        function drawCB(color, stroke_width){
            ctx.strokeStyle = color;
            ctx.lineWidth = stroke_width;
        }

        // choice of gambles displayed
        function textGambleChoices(left, right){
            var l = left.slice(0, 1)+'$'+left.slice(1);
            var r = right.slice(0, 1)+'$'+right.slice(1);

            ctx.fillStyle = rndColorOptions[0];
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText(l, c.width*1/3, c.height*1/3);

            ctx.fillStyle = rndColorOptions[1];
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText(r, c.width*2/3, c.height*1/3);
        }

        function textInfoOtherOutcome(dotAngle, array){
            // total payoff is either left or right
            if(rightSideOP.includes(dotAngle)){
                payoff = parseFloat(array[1]);
            } else {
                payoff = parseFloat(array[0]);
            }

            totalPayoff = payoff - parseFloat(ip);

            // check if positive add + sign then convert to string
            if(payoff >= 0){
                payoff = '+' + payoff.toString()
            } else {
                payoff = payoff.toString()
            }
            payoff = payoff.slice(0, 1)+'$'+payoff.slice(1);

            // check if select not to play
            if(ird == 'Yes' && i2hd == 'No'){
                payoff = '+$0'
                totalPayoff = 0-parseFloat(ip);
            }

            // the same goes for totalPayoff
            if(totalPayoff >= 0){
                totalPayoff = '+' + totalPayoff.toString()
            } else {
                totalPayoff = totalPayoff.toString()
            }
            totalPayoff = totalPayoff.slice(0, 1)+'$'+totalPayoff.slice(1);


            ctx.fillStyle = RESULTTEXTCOLOR;
            ctx.font = FONT;
            ctx.textAlign = CENTER;
            ctx.fillText('Result', c.width/2, c.height*1/5);
            ctx.fillText('Result: '+ payoff, c.width/2, c.height*725/1000);
            ctx.fillText('Total payoff: '+ totalPayoff, c.width/2, c.height*4/5);
            ctx.fillText('Press space bar to continue.', c.width/2, c.height*875/1000);

            return payoff, dotAngle, totalPayoff;
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
                ctx.lineWidth = CB[1];            // HAND WIDTH.
                ctx.beginPath();

                var x1 = (x) + Math.cos(angle) * (r);
                var y1 = (y) + Math.sin(angle) * (r);
                var x2 = (x) + Math.cos(angle) * (r - (r / 7));
                var y2 = (y) + Math.sin(angle) * (r - (r / 7));

                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);

                ctx.strokeStyle = CB[0];
                ctx.stroke();
            }
        }

        // veil info -> this needs to be variable
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
            ctx.lineWidth = CB[1];
            ctx.strokeStyle = CUTOFFLINE;
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
            ctx.fillStyle = DOTCOLOR;

            a1 = -(Math.ceil(a) * PI / 180);

            var x1 = (x) + Math.cos(a1) * (r);
            var y1 = (y) + Math.sin(a1) * (r);

            ctx.beginPath();
            ctx.globalAlpha = 1;
            ctx.arc(x1, y1, 5, 0, 2*PI);
            ctx.strokeStyle = DOTOUTLINE;
            ctx.lineWidth = CB[1];
            ctx.stroke();
            ctx.fill();
            ctx.closePath();

            return dotAngle;
        }

     },
    canvasHTML: CANVAS,
    choices: [' '],
    on_start: function() {
        startTime = new Date().toLocaleTimeString();
    },
    on_finish: function() {
        var paymentEndTime = new Date().toLocaleTimeString();
        var paymentParam = [{
            payment: {
                paymentStartTime: startTime,
                paymentEndTime: paymentEndTime,
                paymentOptionLeft: ool,
                paymentOptionRight: oor,
                paymentCutoffAngle: coa,
                paymentAngle: oca,
                paymentPayOff: payoff,
                paymentTotal: totalPayoff,
                paymentIndex: trialIdx
            }
        }];
        paymentParams = paymentParams.concat(paymentParam);
    }
};


/* end payment */


/* end individual screen */




/* if functions */

// during regular portion

// if they decide to purchase info and outcome is in the top portion
var ifTop = {
    timeline: [revealTopInfo, saveVars, saveTrials, confirmTop],
    conditional_function: function(){
        var data = jsPsych.data.get().last(1).values()[0];
        if(data.infoRevealDecision == 'Yes' && onTop){
            return true;
        } else {
            return false;
        }
    }
};

// if they decide to purchase info and outcome is in the bottom portion
var ifBottom = {
    timeline: [revealBottomInfo, saveVars, saveTrials, confirmBottom],
    conditional_function: function(){
        var data = jsPsych.data.get().last(1).values()[0];
        if(data.infoRevealDecision == 'Yes' && !onTop){
            return true;
        } else {
            return false;
        }
    }
};




// these are for payment section

// if info is purchased, and outcome on the top during payment
var ifTopRPLY = {
    timeline: [infoTopOutcome],
    conditional_function: function(){
        if(onTop){
            return true;
        } else {
            return false;
        }
    }
};

// if info is purchased, and outcome in the bottom during payment
var ifBottomRPLY = {
    timeline: [infoBottomOutcome],
    conditional_function: function(){
        if(!onTop){
            return true;
        } else {
            return false;
        }
    }
};

// if play gamble but don't play info
var ifYesGambleNoInfo = {
    timeline: [gambleOutcome],
    conditional_function: function(){
        if (gd == 'Yes' && ird == 'No'){
            return true;
        } else {
            return false;
        }
    }
};

// if don;t play gamble and don't play info
var ifNoGambleNoInfo = {
    timeline: [infoOutcome],
    conditional_function: function(){
        if (gd == 'No' && ird == 'No'){
            return true;
        } else {
            return false;
        }
    }
};

// if play gamble and play info
var ifYesInfo = {
    timeline: [ifTopRPLY, ifBottomRPLY],
    conditional_function: function(){
        if (ird == 'Yes'){
            return true;
        } else if (ird == 'No'){
            return false;
        }
    }
};

// show gamble outcome
var showGambleOutcome = {
    timeline: [signalPayment, gambleReplay, infoReplay, ifNoGambleNoInfo, ifYesInfo, ifYesGambleNoInfo],
    conditional_function: function(){
        if(idAndSession[1] == 2){
            return true;
        } else {
            return false;
        }
    }
};

/* end if functions */



/* test procedure */
var procedure = {
    timeline: [gamble, saveVars, saveTrials, confirmGamble, info, saveVars, saveTrials, confirmInfoReveal, calOCAP, ifTop, ifBottom, pause],
    timeline_variables: trialVars
};

var endTask = {
    timeline: [showGambleOutcome, savePayment, thanks]
};

/* end test procedures */
