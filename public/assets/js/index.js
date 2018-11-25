/* ========================
      Variables
    ======================== */

const FIREBASE_AUTH = firebase.auth();
const FIREBASE_DATABASE = firebase.database();

const fbProvider = new firebase.auth.FacebookAuthProvider();

/* ========================
      Event Listeners
    ======================== */

FIREBASE_AUTH.onAuthStateChanged(handleAuthStateChanged);

function handleAuthStateChanged(user) {
    if (user) {
        checkForFirstTime(user);
    } else {}
}

function userFirstTimeCallback(user, exists) {
    if (!exists) {
        window.location = '/build-profile';
    } else {
        window.location = '/genealogy';
    }
}

function checkForFirstTime(user) {
    var exists;
    FIREBASE_DATABASE
        .ref()
        .child("users")
        .child(user.uid)
        .once("value")
        .then(function(snapshot) {
            exists = snapshot.val() !== null;
        })
        .then(function() {
            userFirstTimeCallback(user, exists);
        });
}

/* ========================
      Functions
    ======================== */

function signUpWithEmailAndPass() {
    var email = $("#reg_email").val();
    var password = $("#reg_password").val();

    console.log(email)

    FIREBASE_AUTH.createUserWithEmailAndPassword(email, password)
        .then(function() {
            console.log('sign up success'); })
        .catch(function(error) {
            $("#error_details")
                .modal('show');

            $("#error_details_node")
                .empty()
                .append(error.message);

            if(error.message == "The email address is already in use by another account.") {
                setTimeout(function() {
                    $("#error_details")
                        .modal('hide');
                }, 1000);

                setTimeout(function() {
                    $("#modal_register")
                        .modal('hide');
                }, 1000);

                setTimeout(function() {
                    $("#modal_login")
                        .modal('show');
                }, 1500);
            }

            console.log('error', error); })
}

function signInWithEmailAndPass() {
    var email = $("#login_email").val();
    var password = $("#login_password").val();

    FIREBASE_AUTH.signInWithEmailAndPassword(email, password).catch(function(error) {
            $("#error_details")
                .modal('show');

            $("#error_details_node")
                .empty()
                .append(error.message);

            console.log(error);
    });
}

function authWithFb() {
    fbProvider.addScope("public_profile, user_birthday, user_hometown");
    FIREBASE_AUTH.signInWithPopup(fbProvider);
}

$(document).ready(function() {
    $(".auth_with_fb").click(function() {
        authWithFb();
    });
    $("#btn_signin").click(function() {
        signInWithEmailAndPass();
    });
    $("#btn_register").click(function() {
        signUpWithEmailAndPass();
    });
});

// setTimeout(function() {
//     $('#error_details').modal('hide');
// }, 20000);
// window.location.href = "/build-profile";