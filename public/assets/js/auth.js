/* ========================
      Variables
    ======================== */

var display_name = document.getElementById('nav_display_name');
var display_pic = document.getElementById('nav_prof_pic');

const FIREBASE_AUTH = firebase.auth();

const fbProvider = new firebase.auth.FacebookAuthProvider();

/* ========================
      Event Listeners
    ======================== */

FIREBASE_AUTH.onAuthStateChanged(handleAuthStateChanged);

function handleAuthStateChanged(user) {
    if (user) {
        display_name.innerText = user.displayName;
        if (user.photoURL !== null) {
            display_pic.src = user.photoURL;
        }
    } else {
        location.replace("/");
    }
}

/* ========================
      Functions
    ======================== */

function signOut() {
    firebase.auth().signOut()
}

$(document).ready(function() {
    $('#sign_out').click(function() {
        signOut();
    });
})