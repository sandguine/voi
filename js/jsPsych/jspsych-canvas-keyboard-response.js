/**
 * jspsych-canvas-sliders-response
 *
 * a jspsych plugin for free response to questions presented using canvas
 * drawing tools. This version uses multiple sliders to record responses. All
 * slider values will be included in the final data.
 * Sliders can be designated into groups of various kinds. These groups specify
 * which sliders need to be moved before the trial can be completed, and
 * which sliders get reset when other sliders are moved. E.g. one may want to
 * give a participant a split confidence scale where a response is required on
 * one of two sliders (but not both). Setting these two sliders to have the
 * same require_change group and the same exclusive_group identifier will
 * accomplish this.
 *
 * the canvas drawing is done by a function which is supplied as the stimulus.
 * this function is passed the id of the canvas on which it will draw.
 *
 * the canvas can either be supplied as customised HTML, or a default one
 * can be used. If a customised on is supplied, its ID must be specified
 * in a separate variable.
 *
 * Matt Jaquiery - https://github.com/mjaquiery/ - Feb 2018
 *
 * documentation: docs.jspsych.org
 *
 */


jsPsych.plugins['canvas-keyboard-response'] = (function() {

    let plugin = {};

    plugin.info = {
        name: 'canvas-keyboard-response',
        description: 'Collect keyboard responses to stimuli '+
        'drawn on an HTML canvas',
        parameters: {
            stimulus: {
                type: jsPsych.plugins.parameterType.FUNCTION,
                pretty_name: 'Stimulus',
                default: undefined,
                description: 'The function to be called with the canvas ID. '+
                'This should handle drawing operations.'
            },
            canvasHTML: {
                type: jsPsych.plugins.parameterType.HTML_STRING,
                pretty_name: 'Canvas HTML',
                default: null,
                description: 'HTML for drawing the canvas. '+
                'Overrides canvas width and height settings.'
            },
            // canvasId: {
            //     type: jsPsych.plugins.parameterType.STRING,
            //     pretty_name: 'Canvas ID',
            //     default: false,
            //     description: 'ID for the canvas. Only necessary when '+
            //     'supplying canvasHTML. This is required so that the ID '+
            //     'can be passed to the stimulus function.'
            // },
            prompt: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Prompt',
                default: null,
                description: 'Content to display below the stimulus.'
            },
            choices: {
                type: jsPsych.plugins.parameterType.KEYCODE,
                array: true,
                pretty_name: 'Choices',
                default: jsPsych.ALL_KEYS,
                description: 'The keys the subject is allowed to press to respond to the stimulus.'
              },
            trial_duration: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Trial duration',
                default: null,
                description: 'How long to show the trial.'
            },
            response_ends_trial: {
                type: jsPsych.plugins.parameterType.BOOL,
                pretty_name: 'Response ends trial',
                default: true,
                description: 'If true, trial will end when user makes a response.'
            },
        }
    };

    plugin.trial = function(display_element, trial) {
        let canvas = '';
        // Use the supplied HTML for constructing the canvas, if supplied
        if(trial.canvasId !== false) {
            canvas = trial.canvasHTML;
        } else {
            // Otherwise create a new default canvas
            trial.canvasId = 'jspsych-canvas-sliders-response-canvas';
            canvas = '<canvas id="'+trial.canvasId+'" height="'+trial.canvasHeight+
                '" width="'+trial.canvasWidth+'"></canvas>';
        }
        //let html = '<div id="jspsych-html-keyboard-response-stimulus">'+trial.stimulus
        let html = '<div id="jspsych-canvas-sliders-response-wrapper" class="jspsych-sliders-response-wrapper">';
        html += '<div id="jspsych-canvas-sliders-response-stimulus">'+canvas+'</div>';

        // Prompt text
        if (trial.prompt !== null) {
            html += '<div id="jspsych-sliders-response-prompt">'+trial.prompt+'</div>';
        }

        // basic styling
        html += '<style type="text/css">table.jspsych-sliders-table {width: 100%}'+
            'div.jspsych-sliders-row {display: inline-flex; width: 100%}'+
            'div.jspsych-sliders-col {width: 100%}</style>';

        display_element.innerHTML += html;

        let response = {
            startTime: performance.now(),
            rt: null,
            response: null,
            stimulus_properties: null
        };

        // Execute the supplied drawing function
        response.stimulus_properties = trial.stimulus(trial.canvasId);

        function end_trial(){

            // save data
            let trialdata = {
                "startTime": response.startTime,
                "rt": response.rt,
                "response": response.response,
                "stimulus_properties": response.stimulus_properties
            };

            let okay = false;
            if(trial.check_response === null)
                okay = true;
            else
                okay = trial.check_response(trialdata);

            if(okay === false)
                return;

            jsPsych.pluginAPI.clearAllTimeouts();

            if(trial.stimulus_duration !== null)
                trialdata.stimulusOffTime = response.stimulusOffTime;

            display_element.innerHTML = '';

            // next trial
            jsPsych.finishTrial(trialdata);
        }

        // function to handle responses by the subject
        var after_response = function(info) {

        // after a valid response, the stimulus will have the CSS class 'responded'
        // which can be used to provide visual feedback that a response was recorded
        display_element.querySelector('#jspsych-html-keyboard-response-stimulus').className += ' responded';

        // only record the first response
        if (response.key == null) {
        response = info;
        }

        if (trial.response_ends_trial) {
        end_trial();
        }
        };

        // start the response listener
        if (trial.choices != jsPsych.NO_KEYS) {
        var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.choices,
        rt_method: 'performance',
        persist: false,
        allow_held_key: false
        });
        }

        // hide stimulus if stimulus_duration is set
        if (trial.stimulus_duration !== null) {
        jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-html-keyboard-response-stimulus').style.visibility = 'hidden';
        }, trial.stimulus_duration);
        }



        // end trial if trial_duration is set
        if (trial.trial_duration !== null) {
            jsPsych.pluginAPI.setTimeout(function() {
                end_trial();
            }, trial.trial_duration);
        }
    };

    return plugin;
})();
