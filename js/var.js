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

            return '<canvas id="circle" width="800" height="600"> Your browser does not support the HTML5 canvas tag.</canvas>'

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
            document.body.appendChild(c);

         },
        choices: ['f', 'j']
};

/* VoI test canvas slider */
var canvas_slider = {
    type: 'canvas-sliders-response',



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
