/* ========================
      Variables
    ======================== */

var display_name = document.getElementById("nav_display_name");
var display_pic = document.getElementById("nav_prof_pic");

const FIREBASE_AUTH = firebase.auth();
const FIREBASE_DATABASE = firebase.database();

const fbProvider = new firebase.auth.FacebookAuthProvider();

/* ========================
      Event Listeners
    ======================== */

FIREBASE_AUTH.onAuthStateChanged(handleAuthStateChanged);

function handleAuthStateChanged(user) {
    if (user) {
        console.log("user is signed in");
        checkForFirstTime(user);
        display_name.innerText = user.displayName;
        if (user.photoURL !== null) {
            display_pic.src = user.photoURL;
        }
    } else {
        console.log("user is signed out");
    }
}

function userFirstTimeCallback(user, exists) {
    if (!exists) {
        // window.location = 'build-profile.html';
    } else {
        window.location = "genealogy.html";
    }
}

function checkForFirstTime(user) {
    var exists;
    firebase
        .database()
        .ref()
        .child("users")
        .child(user.uid)
        .once("value")
        .then(function(snapshot) {
            exists = snapshot.val() !== null;
            // if (!exists) {
            //     checkProvider(user);
            // }
        })
        .then(function() {
            userFirstTimeCallback(user, exists);
        });
}

function checkProvider(user) {
    if (user.providerData[0].providerId === "facebook.com") {
        createAcctWithFacebook();
    } else if (user.providerData[0].providerId === "password") {
        createAcctWithEmailAndPass(user);
    }
}

/* ========================
      Functions
    ======================== */

function signUpWithEmailAndPass() {
    var email = $("#reg_email").value;
    var password = $("#reg_password").value;

    FIREBASE_AUTH.createUserWithEmailAndPassword(email, password).catch(function(error) {
        console.log(error);
    });
}

function signInWithEmailAndPass() {
    var email = $("#login_email").value;
    var password = $("#login_password").value;

    FIREBASE_AUTH.signInWithEmailAndPassword(email, password).catch(function(error) {
        console.log(error);
    });
}

function authWithFb() {
    fbProvider.addScope("public_profile, user_birthday, user_hometown, user_relationships");
    FIREBASE_AUTH.signInWithPopup(fbProvider);
}

function signOut() {
    firebase
        .auth()
        .signOut()
        .then(function() {
            // Sign-out successful.
            window.location = "index.html";
        })
        .catch(function(error) {
            // An error happened.
            console.log(error);
        });
}

$(document).ready(function() {
    $(".auth_with_fb").click(function() {
        authWithFb();
    });
    $(".btn_signin").click(function() {
        signInWithEmailAndPass();
    });
    $("#btn_register").click(function() {
        signUpWithEmailAndPass();
    });
    $("#sign_out").click(function() {
        signOut();
    });
});