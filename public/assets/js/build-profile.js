/* ========================
      Variables
    ======================== */

var gen_tree = firebase.database().ref().child('gen_tree_id');
var clan_id = gen_tree.push().getKey();

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
        } else if (user.providerData[0].providerId === "password") {
            provider = user.providerData[0].providerId;
            // assignSignUpDataToForm();
        }
        console.log("user is signed in");
    } else {
        console.log("user is signed out");
    }
}

$('#wizard_picture').change(handleWizardPic);

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
                    fields: "name,first_name,middle_name,last_name,picture.height(961),email,birthday,hometown,gender,family{first_name,middle_name,last_name,name,relationship,picture.height(961)}",
                    access_token: fbAccessToken
                },
                function(response) {
                    fbResponse = response;
                    // assignFbDataToForm();
                    segregateFbData(response, currentUser.uid);
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
                photoUrl: response.picture.data.url,
                clanId: clan_id,
                merged: true
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
                photoUrl: response.picture.data.url,
                clanId: clan_id,
                merged: true
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
                photoUrl: response.picture.data.url,
                clanId: clan_id,
                merged: true
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
                photoUrl: response.picture.data.url,
                clanId: clan_id,
                merged: true
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
            photoUrl: response.picture.data.url,
            clanId: clan_id,
            merged: true
        };
    }

    getFbFamilyData(response);
}

function getFbFamilyData(graphResponse) {

    var person = new Object();

    //Get family data
    if (graphResponse.family !== undefined) {
        graphResponse.family.data.forEach(function(element) {
            //Get mother
            if (element.relationship === "mother") {
                if (element.middle_name === undefined) {
                    person = {
                        fbId: element.id,
                        firstName: element.first_name,
                        lastName: element.last_name,
                        displayName: element.name,
                        relationship: element.relationship,
                        clanId: clan_id,
                        merged: false,
                        photoUrl: element.picture.data.url
                    };
                } else {
                    person = {
                        fbId: element.id,
                        firstName: element.first_name,
                        middleName: element.middle_name,
                        lastName: element.last_name,
                        displayName: element.name,
                        relationship: element.relationship,
                        clanId: clan_id,
                        merged: false,
                        photoUrl: element.picture.data.url
                    };
                }
                fbFamily.push(person);
            }

            //Get father
            if (element.relationship === "father") {
                if (element.middle_name === undefined) {
                    person = {
                        fbId: element.id,
                        firstName: element.first_name,
                        lastName: element.last_name,
                        displayName: element.name,
                        relationship: element.relationship,
                        clanId: clan_id,
                        merged: false,
                        photoUrl: element.picture.data.url
                    };
                } else {
                    person = {
                        fbId: element.id,
                        firstName: element.first_name,
                        middleName: element.middle_name,
                        lastName: element.last_name,
                        displayName: element.name,
                        relationship: element.relationship,
                        clanId: clan_id,
                        merged: false,
                        photoUrl: element.picture.data.url
                    };
                }
                fbFamily.push(person);
            }

            //Get children
            if (element.relationship === "son") {
                if (element.middle_name === undefined) {
                    person = {
                        fbId: element.id,
                        firstName: element.first_name,
                        lastName: element.last_name,
                        displayName: element.name,
                        relationship: element.relationship,
                        clanId: clan_id,
                        merged: false,
                        photoUrl: element.picture.data.url
                    };
                } else {
                    person = {
                        fbId: element.id,
                        firstName: element.first_name,
                        middleName: element.middle_name,
                        lastName: element.last_name,
                        displayName: element.name,
                        relationship: element.relationship,
                        clanId: clan_id,
                        merged: false,
                        photoUrl: element.picture.data.url
                    };
                }
                fbFamily.push(person);
            } else if (element.relationship === "daugther") {
                if (element.middle_name === undefined) {
                    person = {
                        fbId: element.id,
                        firstName: element.first_name,
                        lastName: element.last_name,
                        displayName: element.name,
                        relationship: element.relationship,
                        clanId: clan_id,
                        merged: false,
                        photoUrl: element.picture.data.url
                    };
                } else {
                    person = {
                        fbId: element.id,
                        firstName: element.first_name,
                        middleName: element.middle_name,
                        lastName: element.last_name,
                        displayName: element.name,
                        relationship: element.relationship,
                        clanId: clan_id,
                        merged: false,
                        photoUrl: element.picture.data.url
                    };
                }
                fbFamily.push(person);
            }
        });
    }
}

function pushFbFamilyData(uid, data) {
    const mothersRef = userFamilyRef.child(uid).child("mothers");
    const fathersRef = userFamilyRef.child(uid).child("fathers");
    const daughtersRef = userFamilyRef.child(uid).child("daughters");
    const sonsRef = userFamilyRef.child(uid).child("sons");

    data.forEach(function(element) {
        if (element.relationship === "mother") {
            mothersRef.push(element);
        } else if (element.relationship === "father") {
            fathersRef.push(element);
        } else if (element.relationship === "son") {
            sonsRef.push(element);
        } else if (element.relationship === "daughter") {
            daughtersRef.push(element);
        }
    });

    showSuccess();
}

function createAcctWithFacebook() {
    var middle_name = $("#middle_name").val();
    var birth_place = $("#birth_place").val();

    if (middle_name !== "") {
        fbUser.middleName = middle_name;
    } else if (birth_place !== "") {
        fbUser.birthPlace = birth_place;
    }

    if (fbResponse.family !== undefined) {
        console.log(fbUser)
        usersRef.child(currentUser.uid).set(fbUser);
        pushFbFamilyData(currentUser.uid, fbFamily);
    } else {
        //Set user data to 'users' node in database
        usersRef.child(currentUser.uid).set(fbUser);
        showSuccess();
    }
}

function createAcctWithEmailAndPass() {
    var person = new Object();
    var middle_name = $('#middle_name').val();
    var birth_place = $('#birth_place').val();
    var displayName = $("#first_name").val() + " " + $("#last_name").val();
    currentUser.displayName = displayName;

    person = {
        uid: currentUser.uid,
        firstName: $('#first_name').val(),
        lastName: $('#last_name').val(),
        displayName: displayName,
        email: $('#email').val(),
        birthDate: $('#birth_date').val(),
        // photoUrl: response.picture.data.url,
        clanId: clan_id,
        merged: true
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
        person.birth_place = birth_place;
    }

    usersRef.child(currentUser.uid).set(person);

    showSuccess();
}

function assignUserDataToForm() {
    if (!potentialFlag) {
        if (provider === "facebook.com") {
            assignFbDataToForm();
        } else if (provider === "password") {
            $("#group_email").addClass("is-focused");
            $("#email").val(currentUser.email);
        }
    } else {
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

function assignSignUpDataToForm() {
    $("#group_email").addClass("is-focused");
    $("#email").val(currentUser.email);
}

function handleWizardPic(eventData) {
    var file = eventData.target.files[0];
    var fileName = file.name;
    var fileExtension = fileName.split(".").pop();

    var picKey = FIREBASE_DATABASE.ref().child('url_display_pics').child(currentUser.uid).push().getKey();
    var fileNameOnStorage = picKey + '.' + fileExtension;

    // displayPicStorageRef
    //     .child(currentUser.uid)
    //     .
}

function showAvailableMergeData(data) {
    // $('#potential_data').modal('show')
    // $('div#potential_data h4').empty()
    // $('div#potential_data h4').append("Are you " + data.displayName + "?")
    console.log(data)

    // $("#wizard_picture_preview").attr("src", fbResponse.picture.data.url);
    $("#group_first_name").addClass("is-focused");
    $("#first_name").val(data.firstName);
    $("#group_last_name").addClass("is-focused");
    $("#last_name").val(data.lastName);
    $("#birth_date").val(data.birthDate);
    $("#group_email").addClass("is-focused");
    $("#email").val(data.email);
    if (data.middleName !== null) {
        $("#group_middle_name").addClass("is-focused");
        $("#middle_name").text(data.middleName);
    }
    if (data.birthPlace !== null) {
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

function checkPotentialUser() {
    rootRef
        .child('potential_users')
        .once('value')
        .then(snapshot => {
            snapshot.forEach(childSnapshot => {
                if (currentUser.email === childSnapshot.val().email) {
                    // showAvailableMergeData(childSnapshot.val())
                    potentialUser = childSnapshot.val();
                    potentialFlag = true;
                }
            })
            assignUserDataToForm();
        })
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