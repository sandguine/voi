/*
* variables for VoI experiment
* Sandy Tanwisuth, @sandguine, May 2020
*/

/* create timeline */
var timeline = [];

/* welcome message */
var welcome = {
  type: "html-keyboard-response",
  stimulus: "Welcome to the experiment. Press any key to begin."
};

/* instructions */
var instructions = {
  type: "html-keyboard-response",
  stimulus: "<p>In this experiment, a circle will appear in the center " +
      "of the screen.</p><p>If the circle is <strong>blue</strong>, " +
      "press the letter F on the keyboard as fast as you can.</p>" +
      "<p>If the circle is <strong>orange</strong>, press the letter J " +
      "as fast as you can.</p>" +
      "<p class='small'><strong>Press the F key</strong></p></div>" +
      "<p class='small'><strong>Press the J key</strong></p></div>" +
      "</div>"+
      "<p>Press any key to begin.</p>",
  post_trial_gap: 200
};

/* VoI canvas keyboard, first screen*/
var gamble = {
    type: 'canvas-keyboard-response',
    stimulus: function() {

        var c = document.getElementById("circle");
        var ctx = c.getContext("2d");
        var x = c.width/2;
        var y = c.height/2;
        var radius = 100;
        var angle;

        // draw screen components
        drawCircleBorder("White", 5);
        drawMarks(x, y, radius);
        drawCircle(x, y, radius, "MediumPurple", "Gold");
        textGambleChoices("+3", "-3");
        textGambleDecision("Yes", "No");

        // border of circle: color and stroke width
        function drawCircleBorder(color, stroke_width){
            ctx.strokeStyle = color;
            ctx.lineWidth = stroke_width;
        }

        // choice of gambles displayed
        function textGambleChoices(left, right){
            ctx.fillStyle = "MediumPurple";
            ctx.font = "28px Arial";
            ctx.textAlign = "center";
            ctx.fillText(left, c.width*1/3, c.height*1/3); // +3 is a variable, and save this

            ctx.fillStyle = "Gold";
            ctx.font = "28px Arial";
            ctx.textAlign = "center";
            ctx.fillText(right, c.width*2/3, c.height*1/3); // -3 is a variable, and save this
        }

        function textGambleDecision(left, right){
            ctx.fillStyle = "PaleGreen";
            ctx.font = "28px Arial";
            ctx.textAlign = "center";
            ctx.fillText('Would you like to play this gamble?', c.width/2, c.height*1/5);
            ctx.fillText(left, c.width*1/5, c.height*4/5); // Yes, No swap position, and save this
            ctx.fillText(right, c.width*4/5, c.height*4/5); // Yes, No swap position, and save this
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
    canvasHTML: '<canvas id="circle" width="800" height="600"> Your browser does not support the HTML5 canvas tag.</canvas>',
    choices: ['f', 'j']
}

/* VoI canvas keyboard, if yes */
var info = {
    type: 'canvas-keyboard-response',
    stimulus: function() {

        var c = document.getElementById("circle");
        var ctx = c.getContext("2d");
        var x = c.width/2;
        var y = c.height/2;
        var radius = 100;
        var angle;

        // draw screen components
        drawCircleBorder("White", 5);
        drawMarks(x, y, radius);
        drawCircle(x, y, radius, "MediumPurple", "Gold");
        textGambleChoices("+3", "-3");
        textInfoDecision("Yes", "No", "$1");

        // border of circle: color and stroke width
        function drawCircleBorder(color, stroke_width){
            ctx.strokeStyle = color;
            ctx.lineWidth = stroke_width;
        }

        // choice of gambles displayed
        function textGambleChoices(left, right){
            ctx.fillStyle = "MediumPurple";
            ctx.font = "28px Arial";
            ctx.textAlign = "center";
            ctx.fillText(left, c.width*1/3, c.height*1/3); // +3 is a variable, and save this

            ctx.fillStyle = "Gold";
            ctx.font = "28px Arial";
            ctx.textAlign = "center";
            ctx.fillText(right, c.width*2/3, c.height*1/3); // -3 is a variable, and save this
        }

        // info decision: left choice, right choice, price of the info
        function textInfoDecision(left, right, infoPrice){
            ctx.fillStyle = "Salmon";
            ctx.font = "28px Arial";
            ctx.textAlign = "center";
            ctx.fillText('Would you like to purchase the information?', c.width/2, c.height*1/5);
            ctx.fillText(infoPrice, c.width/2, c.height*4/5); // $1 is a variable, and save this
            ctx.fillText(left, c.width*1/5, c.height*4/5); // Yes, No swap position, and save this
            ctx.fillText(right, c.width*4/5, c.height*4/5); // Yes, No swap position, and save this
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

        // ctx
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "DarkGrey";
        ctx.fill();

        // Line to reveal gambling info
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.moveTo(x-radius, y); // y is a variable, need to be saved
        ctx.lineTo(x+radius, y); // y is a variable, need to be saved
        ctx.strokeStyle = "Crimson";
        ctx.lineWidth = 5;
        ctx.stroke();

     },
    canvasHTML: '<canvas id="circle" width="800" height="600"> Your browser does not support the HTML5 canvas tag.</canvas>',
    choices: ['f', 'j']
}

/* fixation */
var fixation = {
        type: 'html-keyboard-response',
        stimulus: '<div style="font-size:60px;">+</div>',
        choices: jsPsych.NO_KEYS,
        trial_duration: function(){
        return jsPsych.randomization.sampleWithoutReplacement([250, 500, 750, 1000, 1250, 1500, 1750, 2000], 1)[0];
        },
        data: {test_part: 'fixation'}
};
