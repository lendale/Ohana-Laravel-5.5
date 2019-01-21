/* ========================
      Variables
    ======================== */

var display_name = document.getElementById('nav_display_name');
var display_pic = document.getElementById('nav_prof_pic');
var photo;

const FIREBASE_AUTH = firebase.auth();
const fbProvider = new firebase.auth.FacebookAuthProvider();

/* ========================
      Event Listeners
    ======================== */

FIREBASE_AUTH.onAuthStateChanged(handleAuthStateChanged);

function handleAuthStateChanged(user) {
    if (user) {
        display_name.innerText = user.displayName;
        if (photo !== null) {
            var userRef = firebase.database().ref().child('users').child(user.uid).child('photoURL');
            userRef.once('value').then(function(snapshot) {
               photo = snapshot.val();
               console.log(photo)
            }).then(function () {
                display_pic.src = photo;
                console.log(photo)
            })
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