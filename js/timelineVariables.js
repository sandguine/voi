/*
* timeline_variables for VoI experiment
* Sandy Tanwisuth, @sandguine, June 2020
*/

// var optionsPair = [['+12','-9'], ['+9', '-12'], ['+9', '-9'], ['+12', '-6'], ['+6', '-12'], ['+9',
// '-6'], ['+6', '-9'], ['+3', '-3'], ['+12', '-3'], ['+3', '-12']];

// var infoPrice = ['0.05', '1', '2', '3', '9']; // available options for information price

// var angles = [0, 30, 60, 120, 150]; // all available angle

// tvAll = []

// for (var i = 0; i < optionsPair.length; i++){
//   for (var j = 0; j < infoPrice.length; j++){
//     for (var k = 0; k < angles.length; k++){
//       tvAll.push('{options: [\'' + optionsPair[i][0] + '\', \'' + optionsPair[i][1] + '\'], infoPrice: \'' + infoPrice[j] + '\', angle: ' + angles[k] + '}');
//     }
//   }
// }

var tvAll = [
  {options: ['+12', '-9'], infoPrice: '0.05', angle: 0},
  {options: ['+12', '-9'], infoPrice: '0.05', angle: 30},
  {options: ['+12', '-9'], infoPrice: '0.05', angle: 60},
  {options: ['+12', '-9'], infoPrice: '0.05', angle: 120},
  {options: ['+12', '-9'], infoPrice: '0.05', angle: 150},
  {options: ['+12', '-9'], infoPrice: '1', angle: 0},
  {options: ['+12', '-9'], infoPrice: '1', angle: 30},
  {options: ['+12', '-9'], infoPrice: '1', angle: 60},
  {options: ['+12', '-9'], infoPrice: '1', angle: 120},
  {options: ['+12', '-9'], infoPrice: '1', angle: 150},
  {options: ['+12', '-9'], infoPrice: '2', angle: 0},
  {options: ['+12', '-9'], infoPrice: '2', angle: 30},
  {options: ['+12', '-9'], infoPrice: '2', angle: 60},
  {options: ['+12', '-9'], infoPrice: '2', angle: 120},
  {options: ['+12', '-9'], infoPrice: '2', angle: 150},
  {options: ['+12', '-9'], infoPrice: '3', angle: 0},
  {options: ['+12', '-9'], infoPrice: '3', angle: 30},
  {options: ['+12', '-9'], infoPrice: '3', angle: 60},
  {options: ['+12', '-9'], infoPrice: '3', angle: 120},
  {options: ['+12', '-9'], infoPrice: '3', angle: 150},
  {options: ['+12', '-9'], infoPrice: '9', angle: 0},
  {options: ['+12', '-9'], infoPrice: '9', angle: 30},
  {options: ['+12', '-9'], infoPrice: '9', angle: 60},
  {options: ['+12', '-9'], infoPrice: '9', angle: 120},
  {options: ['+12', '-9'], infoPrice: '9', angle: 150},
  {options: ['+9', '-12'], infoPrice: '0.05', angle: 0},
  {options: ['+9', '-12'], infoPrice: '0.05', angle: 30},
  {options: ['+9', '-12'], infoPrice: '0.05', angle: 60},
  {options: ['+9', '-12'], infoPrice: '0.05', angle: 120},
  {options: ['+9', '-12'], infoPrice: '0.05', angle: 150},
  {options: ['+9', '-12'], infoPrice: '1', angle: 0},
  {options: ['+9', '-12'], infoPrice: '1', angle: 30},
  {options: ['+9', '-12'], infoPrice: '1', angle: 60},
  {options: ['+9', '-12'], infoPrice: '1', angle: 120},
  {options: ['+9', '-12'], infoPrice: '1', angle: 150},
  {options: ['+9', '-12'], infoPrice: '2', angle: 0},
  {options: ['+9', '-12'], infoPrice: '2', angle: 30},
  {options: ['+9', '-12'], infoPrice: '2', angle: 60},
  {options: ['+9', '-12'], infoPrice: '2', angle: 120},
  {options: ['+9', '-12'], infoPrice: '2', angle: 150},
  {options: ['+9', '-12'], infoPrice: '3', angle: 0},
  {options: ['+9', '-12'], infoPrice: '3', angle: 30},
  {options: ['+9', '-12'], infoPrice: '3', angle: 60},
  {options: ['+9', '-12'], infoPrice: '3', angle: 120},
  {options: ['+9', '-12'], infoPrice: '3', angle: 150},
  {options: ['+9', '-12'], infoPrice: '9', angle: 0},
  {options: ['+9', '-12'], infoPrice: '9', angle: 30},
  {options: ['+9', '-12'], infoPrice: '9', angle: 60},
  {options: ['+9', '-12'], infoPrice: '9', angle: 120},
  {options: ['+9', '-12'], infoPrice: '9', angle: 150},
  {options: ['+9', '-9'], infoPrice: '0.05', angle: 0},
  {options: ['+9', '-9'], infoPrice: '0.05', angle: 30},
  {options: ['+9', '-9'], infoPrice: '0.05', angle: 60},
  {options: ['+9', '-9'], infoPrice: '0.05', angle: 120},
  {options: ['+9', '-9'], infoPrice: '0.05', angle: 150},
  {options: ['+9', '-9'], infoPrice: '1', angle: 0},
  {options: ['+9', '-9'], infoPrice: '1', angle: 30},
  {options: ['+9', '-9'], infoPrice: '1', angle: 60},
  {options: ['+9', '-9'], infoPrice: '1', angle: 120},
  {options: ['+9', '-9'], infoPrice: '1', angle: 150},
  {options: ['+9', '-9'], infoPrice: '2', angle: 0},
  {options: ['+9', '-9'], infoPrice: '2', angle: 30},
  {options: ['+9', '-9'], infoPrice: '2', angle: 60},
  {options: ['+9', '-9'], infoPrice: '2', angle: 120},
  {options: ['+9', '-9'], infoPrice: '2', angle: 150},
  {options: ['+9', '-9'], infoPrice: '3', angle: 0},
  {options: ['+9', '-9'], infoPrice: '3', angle: 30},
  {options: ['+9', '-9'], infoPrice: '3', angle: 60},
  {options: ['+9', '-9'], infoPrice: '3', angle: 120},
  {options: ['+9', '-9'], infoPrice: '3', angle: 150},
  {options: ['+9', '-9'], infoPrice: '9', angle: 0},
  {options: ['+9', '-9'], infoPrice: '9', angle: 30},
  {options: ['+9', '-9'], infoPrice: '9', angle: 60},
  {options: ['+9', '-9'], infoPrice: '9', angle: 120},
  {options: ['+9', '-9'], infoPrice: '9', angle: 150},
  {options: ['+12', '-6'], infoPrice: '0.05', angle: 0},
  {options: ['+12', '-6'], infoPrice: '0.05', angle: 30},
  {options: ['+12', '-6'], infoPrice: '0.05', angle: 60},
  {options: ['+12', '-6'], infoPrice: '0.05', angle: 120},
  {options: ['+12', '-6'], infoPrice: '0.05', angle: 150},
  {options: ['+12', '-6'], infoPrice: '1', angle: 0},
  {options: ['+12', '-6'], infoPrice: '1', angle: 30},
  {options: ['+12', '-6'], infoPrice: '1', angle: 60},
  {options: ['+12', '-6'], infoPrice: '1', angle: 120},
  {options: ['+12', '-6'], infoPrice: '1', angle: 150},
  {options: ['+12', '-6'], infoPrice: '2', angle: 0},
  {options: ['+12', '-6'], infoPrice: '2', angle: 30},
  {options: ['+12', '-6'], infoPrice: '2', angle: 60},
  {options: ['+12', '-6'], infoPrice: '2', angle: 120},
  {options: ['+12', '-6'], infoPrice: '2', angle: 150},
  {options: ['+12', '-6'], infoPrice: '3', angle: 0},
  {options: ['+12', '-6'], infoPrice: '3', angle: 30},
  {options: ['+12', '-6'], infoPrice: '3', angle: 60},
  {options: ['+12', '-6'], infoPrice: '3', angle: 120},
  {options: ['+12', '-6'], infoPrice: '3', angle: 150},
  {options: ['+12', '-6'], infoPrice: '9', angle: 0},
  {options: ['+12', '-6'], infoPrice: '9', angle: 30},
  {options: ['+12', '-6'], infoPrice: '9', angle: 60},
  {options: ['+12', '-6'], infoPrice: '9', angle: 120},
  {options: ['+12', '-6'], infoPrice: '9', angle: 150},
  {options: ['+6', '-12'], infoPrice: '0.05', angle: 0},
  {options: ['+6', '-12'], infoPrice: '0.05', angle: 30},
  {options: ['+6', '-12'], infoPrice: '0.05', angle: 60},
  {options: ['+6', '-12'], infoPrice: '0.05', angle: 120},
  {options: ['+6', '-12'], infoPrice: '0.05', angle: 150},
  {options: ['+6', '-12'], infoPrice: '1', angle: 0},
  {options: ['+6', '-12'], infoPrice: '1', angle: 30},
  {options: ['+6', '-12'], infoPrice: '1', angle: 60},
  {options: ['+6', '-12'], infoPrice: '1', angle: 120},
  {options: ['+6', '-12'], infoPrice: '1', angle: 150},
  {options: ['+6', '-12'], infoPrice: '2', angle: 0},
  {options: ['+6', '-12'], infoPrice: '2', angle: 30},
  {options: ['+6', '-12'], infoPrice: '2', angle: 60},
  {options: ['+6', '-12'], infoPrice: '2', angle: 120},
  {options: ['+6', '-12'], infoPrice: '2', angle: 150},
  {options: ['+6', '-12'], infoPrice: '3', angle: 0},
  {options: ['+6', '-12'], infoPrice: '3', angle: 30},
  {options: ['+6', '-12'], infoPrice: '3', angle: 60},
  {options: ['+6', '-12'], infoPrice: '3', angle: 120},
  {options: ['+6', '-12'], infoPrice: '3', angle: 150},
  {options: ['+6', '-12'], infoPrice: '9', angle: 0},
  {options: ['+6', '-12'], infoPrice: '9', angle: 30},
  {options: ['+6', '-12'], infoPrice: '9', angle: 60},
  {options: ['+6', '-12'], infoPrice: '9', angle: 120},
  {options: ['+6', '-12'], infoPrice: '9', angle: 150},
  {options: ['+9', '-6'], infoPrice: '0.05', angle: 0},
  {options: ['+9', '-6'], infoPrice: '0.05', angle: 30},
  {options: ['+9', '-6'], infoPrice: '0.05', angle: 60},
  {options: ['+9', '-6'], infoPrice: '0.05', angle: 120},
  {options: ['+9', '-6'], infoPrice: '0.05', angle: 150},
  {options: ['+9', '-6'], infoPrice: '1', angle: 0},
  {options: ['+9', '-6'], infoPrice: '1', angle: 30},
  {options: ['+9', '-6'], infoPrice: '1', angle: 60},
  {options: ['+9', '-6'], infoPrice: '1', angle: 120},
  {options: ['+9', '-6'], infoPrice: '1', angle: 150},
  {options: ['+9', '-6'], infoPrice: '2', angle: 0},
  {options: ['+9', '-6'], infoPrice: '2', angle: 30},
  {options: ['+9', '-6'], infoPrice: '2', angle: 60},
  {options: ['+9', '-6'], infoPrice: '2', angle: 120},
  {options: ['+9', '-6'], infoPrice: '2', angle: 150},
  {options: ['+9', '-6'], infoPrice: '3', angle: 0},
  {options: ['+9', '-6'], infoPrice: '3', angle: 30},
  {options: ['+9', '-6'], infoPrice: '3', angle: 60},
  {options: ['+9', '-6'], infoPrice: '3', angle: 120},
  {options: ['+9', '-6'], infoPrice: '3', angle: 150},
  {options: ['+9', '-6'], infoPrice: '9', angle: 0},
  {options: ['+9', '-6'], infoPrice: '9', angle: 30},
  {options: ['+9', '-6'], infoPrice: '9', angle: 60},
  {options: ['+9', '-6'], infoPrice: '9', angle: 120},
  {options: ['+9', '-6'], infoPrice: '9', angle: 150},
  {options: ['+6', '-9'], infoPrice: '0.05', angle: 0},
  {options: ['+6', '-9'], infoPrice: '0.05', angle: 30},
  {options: ['+6', '-9'], infoPrice: '0.05', angle: 60},
  {options: ['+6', '-9'], infoPrice: '0.05', angle: 120},
  {options: ['+6', '-9'], infoPrice: '0.05', angle: 150},
  {options: ['+6', '-9'], infoPrice: '1', angle: 0},
  {options: ['+6', '-9'], infoPrice: '1', angle: 30},
  {options: ['+6', '-9'], infoPrice: '1', angle: 60},
  {options: ['+6', '-9'], infoPrice: '1', angle: 120},
  {options: ['+6', '-9'], infoPrice: '1', angle: 150},
  {options: ['+6', '-9'], infoPrice: '2', angle: 0},
  {options: ['+6', '-9'], infoPrice: '2', angle: 30},
  {options: ['+6', '-9'], infoPrice: '2', angle: 60},
  {options: ['+6', '-9'], infoPrice: '2', angle: 120},
  {options: ['+6', '-9'], infoPrice: '2', angle: 150},
  {options: ['+6', '-9'], infoPrice: '3', angle: 0},
  {options: ['+6', '-9'], infoPrice: '3', angle: 30},
  {options: ['+6', '-9'], infoPrice: '3', angle: 60},
  {options: ['+6', '-9'], infoPrice: '3', angle: 120},
  {options: ['+6', '-9'], infoPrice: '3', angle: 150},
  {options: ['+6', '-9'], infoPrice: '9', angle: 0},
  {options: ['+6', '-9'], infoPrice: '9', angle: 30},
  {options: ['+6', '-9'], infoPrice: '9', angle: 60},
  {options: ['+6', '-9'], infoPrice: '9', angle: 120},
  {options: ['+6', '-9'], infoPrice: '9', angle: 150},
  {options: ['+3', '-3'], infoPrice: '0.05', angle: 0},
  {options: ['+3', '-3'], infoPrice: '0.05', angle: 30},
  {options: ['+3', '-3'], infoPrice: '0.05', angle: 60},
  {options: ['+3', '-3'], infoPrice: '0.05', angle: 120},
  {options: ['+3', '-3'], infoPrice: '0.05', angle: 150},
  {options: ['+3', '-3'], infoPrice: '1', angle: 0},
  {options: ['+3', '-3'], infoPrice: '1', angle: 30},
  {options: ['+3', '-3'], infoPrice: '1', angle: 60},
  {options: ['+3', '-3'], infoPrice: '1', angle: 120},
  {options: ['+3', '-3'], infoPrice: '1', angle: 150},
  {options: ['+3', '-3'], infoPrice: '2', angle: 0},
  {options: ['+3', '-3'], infoPrice: '2', angle: 30},
  {options: ['+3', '-3'], infoPrice: '2', angle: 60},
  {options: ['+3', '-3'], infoPrice: '2', angle: 120},
  {options: ['+3', '-3'], infoPrice: '2', angle: 150},
  {options: ['+3', '-3'], infoPrice: '3', angle: 0},
  {options: ['+3', '-3'], infoPrice: '3', angle: 30},
  {options: ['+3', '-3'], infoPrice: '3', angle: 60},
  {options: ['+3', '-3'], infoPrice: '3', angle: 120},
  {options: ['+3', '-3'], infoPrice: '3', angle: 150},
  {options: ['+3', '-3'], infoPrice: '9', angle: 0},
  {options: ['+3', '-3'], infoPrice: '9', angle: 30},
  {options: ['+3', '-3'], infoPrice: '9', angle: 60},
  {options: ['+3', '-3'], infoPrice: '9', angle: 120},
  {options: ['+3', '-3'], infoPrice: '9', angle: 150},
  {options: ['+12', '-3'], infoPrice: '0.05', angle: 0},
  {options: ['+12', '-3'], infoPrice: '0.05', angle: 30},
  {options: ['+12', '-3'], infoPrice: '0.05', angle: 60},
  {options: ['+12', '-3'], infoPrice: '0.05', angle: 120},
  {options: ['+12', '-3'], infoPrice: '0.05', angle: 150},
  {options: ['+12', '-3'], infoPrice: '1', angle: 0},
  {options: ['+12', '-3'], infoPrice: '1', angle: 30},
  {options: ['+12', '-3'], infoPrice: '1', angle: 60},
  {options: ['+12', '-3'], infoPrice: '1', angle: 120},
  {options: ['+12', '-3'], infoPrice: '1', angle: 150},
  {options: ['+12', '-3'], infoPrice: '2', angle: 0},
  {options: ['+12', '-3'], infoPrice: '2', angle: 30},
  {options: ['+12', '-3'], infoPrice: '2', angle: 60},
  {options: ['+12', '-3'], infoPrice: '2', angle: 120},
  {options: ['+12', '-3'], infoPrice: '2', angle: 150},
  {options: ['+12', '-3'], infoPrice: '3', angle: 0},
  {options: ['+12', '-3'], infoPrice: '3', angle: 30},
  {options: ['+12', '-3'], infoPrice: '3', angle: 60},
  {options: ['+12', '-3'], infoPrice: '3', angle: 120},
  {options: ['+12', '-3'], infoPrice: '3', angle: 150},
  {options: ['+12', '-3'], infoPrice: '9', angle: 0},
  {options: ['+12', '-3'], infoPrice: '9', angle: 30},
  {options: ['+12', '-3'], infoPrice: '9', angle: 60},
  {options: ['+12', '-3'], infoPrice: '9', angle: 120},
  {options: ['+12', '-3'], infoPrice: '9', angle: 150},
  {options: ['+3', '-12'], infoPrice: '0.05', angle: 0},
  {options: ['+3', '-12'], infoPrice: '0.05', angle: 30},
  {options: ['+3', '-12'], infoPrice: '0.05', angle: 60},
  {options: ['+3', '-12'], infoPrice: '0.05', angle: 120},
  {options: ['+3', '-12'], infoPrice: '0.05', angle: 150},
  {options: ['+3', '-12'], infoPrice: '1', angle: 0},
  {options: ['+3', '-12'], infoPrice: '1', angle: 30},
  {options: ['+3', '-12'], infoPrice: '1', angle: 60},
  {options: ['+3', '-12'], infoPrice: '1', angle: 120},
  {options: ['+3', '-12'], infoPrice: '1', angle: 150},
  {options: ['+3', '-12'], infoPrice: '2', angle: 0},
  {options: ['+3', '-12'], infoPrice: '2', angle: 30},
  {options: ['+3', '-12'], infoPrice: '2', angle: 60},
  {options: ['+3', '-12'], infoPrice: '2', angle: 120},
  {options: ['+3', '-12'], infoPrice: '2', angle: 150},
  {options: ['+3', '-12'], infoPrice: '3', angle: 0},
  {options: ['+3', '-12'], infoPrice: '3', angle: 30},
  {options: ['+3', '-12'], infoPrice: '3', angle: 60},
  {options: ['+3', '-12'], infoPrice: '3', angle: 120},
  {options: ['+3', '-12'], infoPrice: '3', angle: 150},
  {options: ['+3', '-12'], infoPrice: '9', angle: 0},
  {options: ['+3', '-12'], infoPrice: '9', angle: 30},
  {options: ['+3', '-12'], infoPrice: '9', angle: 60},
  {options: ['+3', '-12'], infoPrice: '9', angle: 120},
  {options: ['+3', '-12'], infoPrice: '9', angle: 150},
];

// sample for different experiment
var tvRnd = jsPsych.randomization.shuffle(tvAll);

// test for dopamine group
var tvTest = tvRnd.slice(0, 3);
