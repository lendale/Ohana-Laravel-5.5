/* ========================
      Variables
    ======================== */

var gen_tree = firebase.database().ref().child('gen_tree_id');
var clan_id = gen_tree.push().getKey();
var family_id = gen_tree.push().getKey();
var extended_id = gen_tree.push().getKey();

var FB;
var fbAccessToken;
var fbResponse;
var fbUser = new Object();
var fbFamily = [];

var potentialUser;
var potentialFlag = false;
var currentUser;
var provider;

const FIREBASE_AUTH = firebase.auth();
const FIREBASE_DATABASE = firebase.database();
const FIREBASE_STORAGE = firebase.storage();

const rootRef = FIREBASE_DATABASE.ref();
const usersRef = rootRef.child("users");
const userFamilyRef = rootRef.child('user_family');
const displayPicStorageRef = FIREBASE_STORAGE.ref().child("display_pics")

/* ========================
      Event Listeners
    ======================== */

FIREBASE_AUTH.onAuthStateChanged(handleAuthStateChanged);

function handleAuthStateChanged(user) {
    if (user) {
        currentUser = user;
        checkPotentialUser();
        if (user.providerData[0].providerId === "facebook.com") {
            provider = user.providerData[0].providerId;
            segregateFbData(fbResponse, currentUser.uid);
        } else if (user.providerData[0].providerId === "password") {
            provider = user.providerData[0].providerId;
            assignSignUpDataToForm();
        }
        console.log("user is signed in");
    } else {
        console.log("user is signed out");
    }
}

function checkPotentialUser() {
    rootRef
        .child('potential_users')
        .once('value')
        .then(snapshot => {
            snapshot.forEach(childSnapshot => {
                if (currentUser.email === childSnapshot.val().email) {
                    potentialUser = childSnapshot.val();
                    potentialFlag = true;
                }
            })
        })
        .then(() => {
            assignUserDataToForm();
        })
}

// $('#wizard_picture').change(handleWizardPic);

$('#finish').click(function() {
    if (provider === "facebook.com") {
        createAcctWithFacebook();
    } else if (provider === "password") {
        createAcctWithEmailAndPass();
    }
});

/* ========================
      Functions
    ======================== */

window.fbAsyncInit = function() {
    FB.init({
        appId: "191076844735433",
        autoLogAppEvents: true,
        xfbml: false,
        version: "v2.10"
    });
    FB.getLoginStatus(function(response) {
        if (response.status === "connected") {
            fbAccessToken = response.authResponse.accessToken;
            FB.api(
                "/me",
                "GET", {
                    fields: "name,first_name,middle_name,last_name,picture.height(961),email,birthday,hometown,gender",
                    access_token: fbAccessToken
                },
                function(response) {
                    fbResponse = response;
                    FIREBASE_AUTH.onAuthStateChanged(handleAuthStateChanged);
                }
            );
        } else if (response.status === "not_authorized") {
            // the user is logged in to Facebook,
            // but has not authenticated your app
        } else {
            // the user isn't logged in to Facebook.
        }
    });
    FB.AppEvents.logPageView();
};

(function(d, s, id) {
    var js,
        fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, "script", "facebook-jssdk"));

function segregateFbData(response, uid) {

    //Check for undefined fields
    if (response.middle_name === undefined) {
        if (response.hometown === undefined) {
            fbUser = {
                uid: uid,
                fbId: response.id,
                firstName: response.first_name,
                lastName: response.last_name,
                displayName: response.name,
                email: response.email,
                birthDate: response.birthday,
                gender: response.gender,
                photoURL: response.picture.data.url,
                clanId: clan_id,
                familyId : family_id,
                extendedId : extended_id,
                merged: false,
                livingStatus: "Living"
            };
        } else {
            fbUser = {
                uid: uid,
                fbId: response.id,
                firstName: response.first_name,
                lastName: response.last_name,
                displayName: response.name,
                email: response.email,
                birthDate: response.birthday,
                birthPlace: response.hometown.name,
                gender: response.gender,
                photoURL: response.picture.data.url,
                clanId: clan_id,
                familyId : family_id,
                extendedId : extended_id,
                merged: false,
                livingStatus: "Living"
            };
        }
    } else if (response.hometown === undefined) {
        if (response.middle_name === undefined) {
            fbUser = {
                uid: uid,
                fbId: response.id,
                firstName: response.first_name,
                lastName: response.last_name,
                displayName: response.name,
                email: response.email,
                birthDate: response.birthday,
                gender: response.gender,
                photoURL: response.picture.data.url,
                clanId: clan_id,
                familyId : family_id,
                extendedId : extended_id,
                merged: false,
                livingStatus: "Living"
            };
        } else {
            fbUser = {
                uid: uid,
                fbId: response.id,
                firstName: response.first_name,
                middleName: response.middle_name,
                lastName: response.last_name,
                displayName: response.name,
                email: response.email,
                birthDate: response.birthday,
                gender: response.gender,
                photoURL: response.picture.data.url,
                clanId: clan_id,
                familyId : family_id,
                extendedId : extended_id,
                merged: false,
                livingStatus: "Living"
            };
        }
    } else {
        fbUser = {
            uid: uid,
            fbId: response.id,
            firstName: response.first_name,
            middleName: response.middle_name,
            lastName: response.last_name,
            displayName: response.name,
            email: response.email,
            birthDate: response.birthday,
            birthPlace: response.hometown.name,
            gender: response.gender,
            photoURL: response.picture.data.url,
            clanId: clan_id,
            familyId : family_id,
            extendedId : extended_id,
            merged: false,
            livingStatus: "Living"
        };
    }
}

function assignSignUpDataToForm() {
    $("#group_email").addClass("is-focused");
    $("#email").val(currentUser.email);
}

function createAcctWithFacebook() {
    var middle_name = $("#middle_name").val();
    var birth_place = $("#birth_place").val();
    var street_address = $("#street_address").val();
    var barangay = $("#barangay").val();
    var city = $("#city").val();
    var postal_code = $("#postal_code").val();

    if (middle_name !== "") {
        fbUser.middleName = middle_name;
    }

    if (birth_place !== "") {
        fbUser.birthPlace = birth_place;
    }

    if (street_address !== "") {
        fbUser.street_address = street_address;
    }

    if (barangay !== "") {
        fbUser.barangay = barangay;
    }

    if (city !== "") {
        fbUser.city = city;
    }

    if (postal_code !== "") {
        fbUser.postal_code = postal_code;
    }

    if (potentialFlag) {
        fbUser.tempKeyInClan = potentialUser.tempKeyInClan;
        fbUser.clanId = potentialUser.clanId;
        fbUser.wasPotential = true;
    }

    if (fbResponse.family !== undefined) {
        console.log(fbUser)
        usersRef.child(currentUser.uid).set(fbUser);
    } else {
        //Set user data to 'users' node in database
        usersRef.child(currentUser.uid).set(fbUser);
        showSuccess();
    }
}

// function createAcctWithEmailAndPass(downloadURL) {
function createAcctWithEmailAndPass() {
    var person = new Object();
    var middle_name = $('#middle_name').val();
    var birth_place = $('#birth_place').val();
    var displayName = $("#first_name").val() + " " + $("#last_name").val();
    var street_address = $("#street_address").val();
    var barangay = $("#barangay").val();
    var city = $("#city").val();
    var postal_code = $("#postal_code").val();

    currentUser.updateProfile({ displayName: displayName });

    person = {
        uid: currentUser.uid,
        firstName: $('#first_name').val(),
        lastName: $('#last_name').val(),
        displayName: displayName,
        email: $('#email').val(),
        birthDate: $('#birth_date').val(),
        // photoURL: downloadURL,
        clanId: clan_id,
        familyId : family_id,
        extendedId : extended_id,
        merged: false,
        livingStatus: "Living"
    }

    if ($("input:checked").val() === "male") {
        person.gender = "male";
    } else {
        person.gender = "female"
    }

    if (middle_name !== "") {
        person.middleName = middle_name;
    }

    if (birth_place !== "") {
        person.birthPlace = birth_place;
    }

    if (street_address !== "") {
        person.street_address = street_address;
    }

    if (barangay !== "") {
        person.barangay = barangay;
    }

    if (city !== "") {
        person.city = city;
    }

    if (postal_code !== "") {
        person.postal_code = postal_code;
    }

    if (potentialFlag) {
        person.tempKeyInClan = potentialUser.tempKeyInClan;
        person.clanId = potentialUser.clanId;
        person.wasPotential = true;
    }

    $('#finish').click(function(){
        usersRef.child(currentUser.uid).set(person)
        console.log(person)
        showSuccess();
    })
}

function createUserAccount() {
    console.log('inside createUserAccount function');
    if (!potentialFlag) {
        if (provider === "facebook.com") {
            createAcctWithFacebook()
        } else if (provider === "password") {
            createAcctWithEmailAndPass();
        }
    } else {

    }
}

function assignUserDataToForm() {
    console.log(potentialFlag)
    if (!potentialFlag) {
        console.log('!potentialFlag')
        if (provider === "facebook.com") {
            assignFbDataToForm();
        } else if (provider === "password") {
            $("#group_email").addClass("is-focused");
            $("#email").val(currentUser.email);
        }
    } else {
        console.log('potentialFlag')
        showAvailableMergeData(potentialUser);
    }
}

function assignFbDataToForm() {
    $("#wizard_picture_preview").attr("src", fbResponse.picture.data.url);
    $("#group_first_name").addClass("is-focused");
    $("#first_name").val(fbResponse.first_name);
    $("#group_last_name").addClass("is-focused");
    $("#last_name").val(fbResponse.last_name);
    $("#birth_date").val(fbResponse.birthday);
    $("#group_email").addClass("is-focused");
    $("#email").val(fbResponse.email);
    if (fbResponse.middle_name !== undefined) {
        $("#group_middle_name").addClass("is-focused");
        $("#middle_name").text(fbResponse.middle_name);
    }
    if (fbResponse.hometown !== undefined) {
        $("#group_birth_place").addClass("is-focused");
        $("#birth_place").val(fbResponse.hometown.name);
    }
    if (fbResponse.gender === "male") {
        $("#radio_group_male").addClass("active");
        $("#radio_male").attr("checked", true);
    } else {
        $("#radio_group_female").addClass("active");
        $("#radio_female").attr("checked", true);
    }
}

function handleWizardPic(eventData) {
    var file = eventData.target.files[0];
    var fileName = file.name;
    var fileExtension = fileName.split(".").pop();
    var picKey = FIREBASE_DATABASE.ref().child('url_display_pics').child(currentUser.uid).push().getKey();
    var fileNameOnStorage = picKey + '.' + fileExtension;
    var storageRef = FIREBASE_STORAGE.ref('user_profile-pics/' + currentUser.uid + '/' + fileNameOnStorage);

    $('#next').on('click', function(){
        var task = storageRef.put(file);
        console.log('lahos sa next button')
        task.on('state_changed',
       
        function complete() {
            uid = firebase.auth().currentUser.uid;
            var downloadURL = task.snapshot.downloadURL;
            console.log(downloadURL)
            createAcctWithEmailAndPass(downloadURL);
            })
    })  
}

function showAvailableMergeData(data) {
    $("#wizard_picture_preview").attr("src", data.photoURL);
    $("#group_first_name").addClass("is-focused");
    $("#first_name").val(data.firstName);
    $("#group_last_name").addClass("is-focused");
    $("#last_name").val(data.lastName);
    $("#birth_date").val(data.birthDate);
    $("#group_email").addClass("is-focused");
    $("#email").val(data.email);

    if (data.middleName !== undefined) {
        $("#group_middle_name").addClass("is-focused");
        $("#middle_name").val(data.middleName);
    }
    if (data.birthPlace !== undefined) {
        $("#group_birth_place").addClass("is-focused");
        $("#birth_place").val(data.birthPlace);
    }
    if (data.gender === "male") {
        $("#radio_group_male").addClass("active");
        $("#radio_male").attr("checked", true);
    } else {
        $("#radio_group_female").addClass("active");
        $("#radio_female").attr("checked", true);
    }
}

function showSuccess() {
    swal({
        title: "Nice! You're all set.",
        text: "You will be redirected shortly.",
        timer: 7000,
        showConfirmButton: false,
        type: "success"
    }).then(function() {},

        function(dismiss) {
            if (dismiss === "timer") {
                console.log("I was closed by the timer");
                window.location.href = "/genealogy";
            }
        });
}