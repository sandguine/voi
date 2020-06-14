// Initialize database
//allow anonymous authentication with Firebase
firebase.auth().signInAnonymously().catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
});
//create user ID
var uid;
//when signed in, get the user ID
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var isAnonymous = user.isAnonymous;
    uid = user.uid;
  }
});
//create reference to database as db variable
var db = firebase.firestore();
