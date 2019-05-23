/* ========================
      Variables
    ======================== */

var ext_id = firebase.database().ref().child('extended-id').push().getKey();
var fam_id = firebase.database().ref().child('family-id').push().getKey();

var FB;
var fbAccessToken;
var fbResponse;
var fbUser = new Object();

var potentialUser;
var registered = false;
var currentUser;
var provider;
var downloadURL;
var photo_data = new Object();

const FIREBASE_AUTH = firebase.auth();
const FIREBASE_DATABASE = firebase.database();
const FIREBASE_STORAGE = firebase.storage();

const rootRef = FIREBASE_DATABASE.ref();
const usersRef = rootRef.child("users");
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
            console.log('handleAuthStateChanged if')
            provider = user.providerData[0].providerId;
            segregateFbData(fbResponse, currentUser.uid);
        } else if (user.providerData[0].providerId === "password") {
            console.log('handleAuthStateChanged else if')
            provider = user.providerData[0].providerId;
            assignSignUpDataToForm();
        }
        console.log("user is signed in");
    } else {
        console.log("user is signed out");
    }
}

$('#wizard_picture').change(handleWizardPic);

$('#next').click(function() {
    console.log('next')
    console.log($('#wizard_picture').val())
    console.log("photo_data", photo_data)
    console.log("downloadURL", downloadURL)
    if(downloadURL == undefined && $('#wizard_picture').val() == '') {
        document.getElementById("finish").disabled = true;
        showPhotoNull();
    } else if(downloadURL != undefined || $('#wizard_picture').val() != '') {
        document.getElementById("finish").disabled = false;
        checkPotentialUser2();
    }
})

$('#finish').click(function() {    
    console.log('finish')
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
                key: uid,
                fbId: response.id,
                firstName: response.first_name,
                lastName: response.last_name,
                displayName: response.name,
                email: response.email,
                birthDate: response.birthday,
                gender: response.gender,
                photoURL: response.picture.data.url,
                livingStatus: "living",
                registered: true,
                extendedId: ext_id,
                familyId: fam_id
            };
        } else {
            fbUser = {
                key: uid,
                fbId: response.id,
                firstName: response.first_name,
                lastName: response.last_name,
                displayName: response.name,
                email: response.email,
                birthDate: response.birthday,
                birthPlace: response.hometown.name,
                gender: response.gender,
                photoURL: response.picture.data.url,
                livingStatus: "living",
                registered: true,
                extendedId: ext_id,
                familyId: fam_id
            };
        }
    } else if (response.hometown === undefined) {
        if (response.middle_name === undefined) {
            fbUser = {
                key: uid,
                fbId: response.id,
                firstName: response.first_name,
                lastName: response.last_name,
                displayName: response.name,
                email: response.email,
                birthDate: response.birthday,
                gender: response.gender,
                photoURL: response.picture.data.url,
                livingStatus: "living",
                registered: true,
                extendedId: ext_id,
                familyId: fam_id
            };
        } else {
            fbUser = {
                key: uid,
                fbId: response.id,
                firstName: response.first_name,
                middleName: response.middle_name,
                lastName: response.last_name,
                displayName: response.name,
                email: response.email,
                birthDate: response.birthday,
                gender: response.gender,
                photoURL: response.picture.data.url,
                livingStatus: "living",
                registered: true,
                extendedId: ext_id,
                familyId: fam_id
            };
        }
    } else {
        fbUser = {
            key: uid,
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
            livingStatus: "living",
            registered: true,
            extendedId: ext_id,
            familyId: fam_id
        };
    }
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
        fbUser.streetAddress = street_address;
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

    console.log(fbUser)
    usersRef.child(currentUser.uid).set(fbUser);
    showSuccess();
}

function createAcctWithEmailAndPass(downloadURL) {
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
        key: currentUser.uid,
        firstName: $('#first_name').val(),
        lastName: $('#last_name').val(),
        displayName: displayName,
        email: $('#email').val(),
        birthDate: $('#birth_date').val(),
        // photoURL: downloadURL,
        livingStatus: "living",
        registered: true,
        familyId: fam_id,
        extendedId: ext_id
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
        person.streetAddress = street_address;
    }

    if (barangay !== "") {
        person.barangay = barangay;
    }

    if (city !== "") {
        person.city = city;
    }

    if (postal_code !== "") {
        person.postalCode = postal_code;
    }

    console.log('street_address', street_address)
    console.log('barangay', barangay)
    console.log('city', city)
    console.log('postal_code', postal_code)
    console.log('downloadURL', downloadURL)
    console.log('photo data:', photo_data)

    console.log(potentialUser)
    if(potentialUser != undefined || potentialUser != null) {
        console.log('sud diri')

        person.oldKey = potentialUser.key;

        if(downloadURL !== undefined || downloadURL != null) {
            person.photoURL = downloadURL
        } else {
            person.photoURL = potentialUser.photoURL;
        }

        if(potentialUser.f != undefined) {
            person.f = potentialUser.f;
        }

        if(potentialUser.m != undefined) {
            person.m = potentialUser.m;
        }

        if(potentialUser.ux != undefined) {
            person.ux = potentialUser.ux;
        }

        if(potentialUser.vir != undefined) {
            person.vir = potentialUser.vir;
        }

        if(potentialUser.ms != undefined) {
            person.ms = potentialUser.ms;
        }

        if(potentialUser.children != undefined) {
            person.children = potentialUser.children;
        }

        if(potentialUser.siblings != undefined) {
            person.siblings = potentialUser.siblings;
        }

        if(potentialUser.parenthood != undefined) {
            person.parenthood = potentialUser.parenthood;
        }

        $('#finish').click(function() {
            usersRef.child(currentUser.uid).set(person)
            usersRef.child(potentialUser.key).remove()
            console.log(person)
            showSuccess();
        })
    } else {
        person.photoURL = downloadURL

        $('#finish').click(function() {
            usersRef.child(currentUser.uid).set(person)
            console.log(person)
            showSuccess();
        })
    }
}

function assignUserDataToForm() {
    console.log(registered)
    if (!registered) {
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
    var storageRef = FIREBASE_STORAGE.ref('PROFILE-PICS/' + fileNameOnStorage);

    console.log(file)
    console.log(fileName)

    if(file.size <= 100000) {
        $('#next').on('click', function() {
            if(file == null) {
                console.log('handlewizardpic')
                showPhotoNull()
            } else {
                var task = storageRef.put(file);
                console.log('lahos sa next button')
                task.on('state_changed',
                    function complete() {
                        uid = firebase.auth().currentUser.uid;
                        downloadURL = task.snapshot.downloadURL;
                        console.log(downloadURL)
                        createAcctWithEmailAndPass(downloadURL);
                })
            }
        }) 
    } else {
        showPhotoError()
    }
}

function showAvailableMergeData(data) {
    $("#wizard_picture_preview").attr("src", data.photoURL);
    $("#group_first_name").addClass("is-focused");
    $("#first_name").val(data.firstName);
    $("#group_last_name").addClass("is-focused");
    $("#last_name").val(data.lastName);
    $("#birth_date").val(data.birthDate);
    $("#group_email").addClass("is-focused");
    $("#email").val(currentUser.email);

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
        $("#radio_group_female").removeClass("active");
        $("#radio_male").attr("checked", true);
        $("#radio_female").attr("checked", false);
    } else {
        $("#radio_group_female").addClass("active");
        $("#radio_group_male").removeClass("active");
        $("#radio_female").attr("checked", true);
        $("#radio_male").attr("checked", false);
    }
    photo_data = data.photoURL;
    console.log(photo_data)
    document.getElementById("wizard_picture").required = false;
}

function checkPotentialUser() {
    console.log('checkPotentialUser')

    usersRef.once('value').then(snapshot => {
        snapshot.forEach(childSnapshot => {
            if (currentUser.email === childSnapshot.val().email) {
                potentialUser = childSnapshot.val();
                registered = true;
            }
        })
    })
    .then(() => {
        assignUserDataToForm();
    })
}

function checkPotentialUser2() {
    console.log('checkPotentialUser2')
    var firstname = $('#first_name').val();
    var lastname = $('#last_name').val();

    usersRef.once('value').then(snap => {
        snap.forEach(snap2 => {
            if (firstname.toLowerCase() === snap2.val().firstName.toLowerCase() 
            && lastname.toLowerCase() === snap2.val().lastName.toLowerCase()) {
                console.log('existing user by name')
                potentialUser = snap2.val();
                registered = true;
                alert("This name has existing data. Click Previous button to update.")
            }
        })
    })
    .then(() => {
        assignUserDataToForm();
    })

    return true;
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

function showPhotoError() {
    swal({
        title: "Photo size too large!",
        text: "Please choose another photo",
        timer: 7000,
        showConfirmButton: false,
        type: "error"
    })
}

function showPhotoLoading() {
    swal({
        imageUrl: "assets/img/icons/loader.gif",
        imageWidth: '90',
        imageHeight: '90',
        timer: 9000,
        showConfirmButton: false
    })
}

function showPhotoNull() {
    swal({
        title: "Error Adding Photo",
        text: "Please add a photo to be recognized..",
        timer: 3000,
        showConfirmButton: false,
        type: "error"
    })
}
