/*
* randomized variables for VoI experiment
* Sandy Tanwisuth, @sandguine, June 2020
*/

/* vars needed be randomized

// colorOptions, sample: 'without-replacement' or 'shuffle'
var rndColorOptions = jsPsych.randomization.sampleWithoutReplacement(colorOptions);

// optionsPair, sample: 'without-replacement' or 'shuffle' to gaurantee equal distribution
var rndOptionsPair = jsPsych.randomization.sampleWithoutReplacement(optionsPair);

// yesNO, sample: 'without-replacement' or 'shuffle'
var rndYesNo = jsPsych.randomization.sampleWithoutReplacement(yesNo);

// infoPrice, sample: 'with-replacement' -> this doesn't work
var rndInfoPrice = jsPsych.randomization.shuffle(infoPrice);

// angles, sample: 'without-replacement' or 'shuffle'
var rndAngles = jsPsych.randomization.shuffle(angles);

// outcomeAllAngles, sample: 'without-replacement' or 'shuffle'
var rndOutcomeAllAngles = jsPsych.randomization.shuffle(outcomeAllAngles);

var rndOBA = []; // all available outcome depending on the angle randomized

// outcomeByAngles[j], sample: 'without-replacement' or 'shuffle'
// fill-in all available outcome depending on the angle randomized
for ( var j = 0; j < angles.length; j++){
    rndOBA.push(jsPsych.randomization.shuffle(outcomeByAngles[j]));
},

end vars needed to be randomized */

var colorOptions = ['MediumPurple', 'Gold']; // color options for gain or loss

var optionsPair = [['+12','-9'], ['+9', '-12'], ['+9', '-9'], ['+12', '-6'], ['+6', '-12'], ['+9',
'-6'], ['+6', '-9'], ['+3', '-3'], ['+12', '-3'], ['+3', '-12']]; // all availiable gambles outcomes

var yesNo = ['Yes', 'No']; // for randomization of choices on left and right

var infoPrice = ['0.05', '1', '2', '3', '9']; // available options for information price

var angles = [0, 30, 60, 120, 150, 180]; // all available angles

var outcomeAllAngles = [-15, -45, -75, -105, -135, -165, 165, 135, 105, 75, 45, 15];

var outcomeByAngles = []; // all available outcome depending on the angle
for (var i = 0; i <= outcomeAllAngles.length/2; i++ ){
    outcomeByAngles.push(outcomeAllAngles.slice(i, i+6));
}

var rightSideOP = [-75, -45, -15, 15, 45, 75]; //outcome position on the right side

var leftSideOP = [-105, -135, -165, 165, 135, 105]; //outcome position on the left side




var rndColorOptions = jsPsych.randomization.sampleWithoutReplacement(colorOptions);

var rndOptionsPair = jsPsych.randomization.sampleWithoutReplacement(optionsPair);

var rndYesNo = jsPsych.randomization.sampleWithoutReplacement(yesNo);

var rndInfoPrice = jsPsych.randomization.shuffle(infoPrice);

var rndAngles = jsPsych.randomization.shuffle(angles);

var rndOutcomeAllAngles = jsPsych.randomization.shuffle(outcomeAllAngles);

var rndOBA = []; // all available outcome depending on the angle randomized
// fill-in all available outcome depending on the angle randomized
for ( var j = 0; j < angles.length; j++){
    rndOBA.push(jsPsych.randomization.shuffle(outcomeByAngles[j]));
}


// var repeatProcedures = {
//     timeline: [procedure],
//     timeline_variables: {[
//         { face: 'person-1.jpg', name: 'Alex' },
//         { face: 'person-2.jpg', name: 'Beth' },
//         { face: 'person-3.jpg', name: 'Chad' },
//         { face: 'person-4.jpg', name: 'Dave' }
//     ]},
//     repetitions: 3
// }




// might be useful
// var face_name_procedure = {
//     timeline: [
//         {
//             type: 'html-keyboard-response',
//             stimulus: '+',
//             choices: jsPsych.NO_KEYS,
//             trial_duration: 500
//         },
//         {
//             type: 'html-keyboard-response',
//             stimulus: jsPsych.timelineVariable('name'),
//             trial_duration: 1000,
//             choices: jsPsych.NO_KEYS
//         },
//         {
//             type: 'html-keyboard-response',
//             stimulus: function(){
//                 var html="<img src='"+jsPsych.timelineVariable('face', true)+"'>";
//                 html += "<p>"+jsPsych.timelineVariable('name', true)+"</p>";
//                 return html;
//             },
//             choices: jsPsych.NO_KEYS,
//             trial_duration: 2500
//         }
//     ],
//     timeline_variables: [
//         { face: 'person-1.jpg', name: 'Alex' },
//         { face: 'person-2.jpg', name: 'Beth' },
//         { face: 'person-3.jpg', name: 'Chad' },
//         { face: 'person-4.jpg', name: 'Dave' }
//     ]
// }
