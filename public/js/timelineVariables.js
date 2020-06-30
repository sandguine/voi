/*
* timeline_variables for VoI experiment
* Sandy Tanwisuth, @sandguine, June 2020
*/

var optionsPair = [['+12','-9'], ['+9', '-12'], ['+9', '-9'],
['+12', '-6'], ['+6', '-12'], ['+9', '-6'], ['+6', '-9'],
['+3', '-3'], ['+12', '-3'], ['+3', '-12']];

var infoPrice = ['0.05', '1', '2', '3', '9']; // available options for information price

var angles = [0, 30, 60, 120, 150]; // all available angle

var outcome = [15, 45, 75, 105, 135, 165, -165, -135, -105, -75, -45, -15]

var tvAllString = [];

var tvAll = [];

// writing all possible outcomes
for (var i = 0; i < optionsPair.length; i++){
  for (var j = 0; j < infoPrice.length; j++){
    for (var k = 0; k < angles.length; k++){
      for (var l = 0; l < outcome.length; l++){
        tvAllString.push('{\"optionLeft\": \"' + optionsPair[i][0] + '\", \"optionRight\": \"' +
        optionsPair[i][1] + '\", \"infoPrice\": \"' + infoPrice[j] +
        '\", \"angle\": ' + angles[k] + ', \"outcome\": ' + outcome[l] + '}');
      }
    }
  }
}

// convert string into JSON object
for (var i = 0; i < tvAllString.length; i++){
  tvAll = tvAll.concat(JSON.parse(tvAllString[i]));
}

// sample for different experiment
var tvRnd = jsPsych.randomization.shuffle(tvAll);

// test for dopamine group
var trialVars = tvRnd.slice(0, 5);

// initiate timeline
var timeline = [];
