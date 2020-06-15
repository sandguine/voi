var check_consent = function (elem) {
  if (document.getElementById('consent_yes').checked == true && document.getElementById('consent_no').checked == false) {
      //get subject ID from prolific or generate one
      if (window.location.search.indexOf('PROLIFIC_PID') > -1) {
        var ID = getQueryVariable('PROLIFIC_PID');
      }
      else {
        var ID = getRandomIntInclusive(0,2000000); // if no prolific ID, generate random ID (for testing)
      }
      //create reference to the data base & subject document
      db.collection('voi-in-person').doc('v1').collection('participants').doc(uid).set({
        ID: ID,  // this refers to the subject's ID from prolific
        date: new Date().toLocaleDateString(),
        time_start: new Date().toLocaleTimeString(),
        consent: {
          yes_box: document.getElementById('consent_yes').checked,
          no_box: document.getElementById('consent_no').checked
        }
      })

      timeline.push(fullscreen, welcome, loopID, instructions);
      timeline.push(procedure);
      timeline.push(submit);


      jsPsych.init({
          timeline: timeline
      });
  }
  else {
    alert("Unfortunately you will not be unable to participate in this research study if you do " +
        "not consent to the above. Thank you for your time.");
    return false;
  }
};

// window settings?
function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

// consent form
document.getElementById('header_title').innerHTML = "Welcome! We need your consent to proceed.";
document.getElementById('consent').innerHTML = "<p>\n" +
    "You are invited to participate in a brief experiment that will be conducted online\n" +
    "from the University of California, Berkley in the laboratory of Prof. Ming Hsu.\n" +
    "</p>\n" +
    "<p>\n" +
    "This study has been evaluated by the University of California, Berkley, Institutional Review Board\n" +
    "(IRB) and had been deemed exempt.\n" +
    "This task is a game where you can collect play game, followed by a few questionnaires.\n" +
    "</p>\n" +
    "<p>\n" +
    "The data you provide will be collected through Firebase's secure online system.\n" +
    "The collected data will be fully anonymized and confidentiality will be maintained. We may report\n" +
    "the data in scientific publications and the data may ultimately be stored in online repositories so\n" +
    "that other researchers can utilize this information in future research. However, any such data will\n" +
    "be completely anonymized and you will not in any way be identifiable from the data stored online or\n" +
    "reported in publications.\n" +
    "</p>\n" +
    "<p>\n" +
    "Your participation in this research study is voluntary. You are free to terminate your participation\n" +
    "and forgo the compensation at any time. If you have any questions or concerns, feel free to\n" +
    "contact Sandy Tanwisuth at kst[at]berkley.edu.\n" +
    "</p>\n" +
    "<p>\n" +
    "Please click below, to provide your consent to participate in this online survey or to decline to\n" +
    "participate:\n" +
    "</p>\n" +
    "<button type=\"button\" class=\"btn btn-default btn-sm\" onClick=\"window.print();\">\n" +
        "<span class=\"glyphicon glyphicon-print\"></span> Print a copy of this\n" +
    "</button>\n" +
    "<hr/>\n" +
    "<h4>Do you understand and consent to these terms?</h4>\n" +
    "\n" +
    "<label class=\"container\">I agree.\n" +
        "<input type=\"checkbox\" id=\"consent_yes\">\n" +
    "</label>\n" +
    "\n" +
    "<label class=\"container\">No thanks, I do not want to do this task.\n" +
        "<input type=\"checkbox\" id=\"consent_no\">\n" +
    "</label>\n" +
    "<p>\n" +
    "<h3> It will take a moment to load the next page. Please be patient.</h3>\n" +
    "</p>\n" +
    "<br><br>\n" +
    "<button type=\"button\" id=\"start\" class=\"submit_button\">continue</button>\n" +
    "<br><br>";

/*******************
 * Run Task
 ******************/
document.getElementById("start").onclick = check_consent;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    alert("Sorry, this experiment does not work on mobile devices");
    document.getElementById('consent').innerHTML = "";
}
