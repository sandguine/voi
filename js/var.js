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

/* VoI static stimuli */
var static_stim = {
        type: "html-keyboard-response",
        stimulus: function() {

            var c = document.getElementById("circle");
            var ctx = c.getContext("2d");
            var x = c.width/2;
            var y = c.height/2;
            var radius = 100;
            var angle;

            // Line stroke style and width
            ctx.strokeStyle = "#FFFFFF";
            ctx.lineWidth = 5;

            drawCircle(x, y, radius, "MediumPurple", "Gold");
            drawMarks(x, y, radius);
            //document.body.appendChild(c);

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

            return '<canvas id="circle" width="800" height="600"> Your browser does not support the HTML5 canvas tag.</canvas>'
        },
        choices: ['f', 'j']
};

/* VoI test canvas slider */
var canvas_slider = {
    type: 'canvas-sliders-response',
    stimulus: function() {

        var c = document.getElementById("circle");
        var ctx = c.getContext("2d");
        var x = c.width/2;
        var y = c.height/2;
        var radius = 100;
        var angle;

        // Line stroke style and width
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 5;

        drawCircle(x, y, radius, "MediumPurple", "Gold");
        drawMarks(x, y, radius);
        //document.body.appendChild(c);

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
    canvasHTML: '<canvas id="circle"> Your browser does not support the HTML5 canvas tag.</canvas>',
    canvasId: 'circle',
    canvasWidth: 800,
    canvasHeight: 600,
    prompt: 'Do you accept the gamble?',
    sliderCount: 0,
    min: 0,
    max: 100,
    labels: [['Yes'], ['No']],
    trial_duration: 5000000
}


/* VoI test canvas slider */
var canvas_keyboard = {
    type: 'canvas-keyboard-response',
    stimulus: function() {

        var c = document.getElementById("circle");
        var ctx = c.getContext("2d");
        var x = c.width/2;
        var y = c.height/2;
        var radius = 100;
        var angle;

        // Line stroke style and width
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 5;

        drawCircle(x, y, radius, "MediumPurple", "Gold");
        drawMarks(x, y, radius);
        //document.body.appendChild(c);

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

        return '<canvas id="circle" width="800" height="600"> Your browser does not support the HTML5 canvas tag.</canvas>'

     },
    canvasHTML: '<canvas id="circle" width="800" height="600"> Your browser does not support the HTML5 canvas tag.</canvas>',
    prompt: 'Do you accept the gamble?',
    choices: ['y', 'n'],
    sliderCount: 1,
    trial_duration: 5000000
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
