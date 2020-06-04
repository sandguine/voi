/*
* randomized variables for VoI experiment
* Sandy Tanwisuth, @sandguine, June 2020
*/


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
