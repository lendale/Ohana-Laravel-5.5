$(document).ready(function() {
    $("#gallery").justifiedGallery();
});

$('#edit_profile').click(function() {
    $('.prof-update').removeAttr('disabled');
    $("#update_profile").removeAttr("disabled");
});

$("#update_profile").click(function() {
    updateProfile();
});

const rootRef = firebase.database().ref();
const usersRef = rootRef.child('users');
var uid;

function populateUserData() {
    let userObj;

    usersRef
        .child(uid)
        .once("value")
        .then(function(snapshot) {
            userObj = snapshot.val();
            // console.log(userObj);
        })
        .then(function() {
            $("label").attr("class", "active");
            $("#prof_display_pic").attr('src', userObj.photoUrl);
            $("#prof_display_name").text(userObj.displayName);
            $("#prof_bio").attr('value', userObj.bio);
            $("#edit_marital_status").attr('value', userObj.maritalStatus);
            $("#edit_nickname").attr('value', userObj.nickname);
            $("#edit_email_address").attr('value', userObj.email);
            $("#edit_first_name").attr('value', userObj.firstName);
            $("#edit_middle_name").attr("value", userObj.middleName);
            $("#edit_last_name").attr("value", userObj.lastName);
            $("#edit_address").attr("value", userObj.address);
            $("#edit_city").attr("value", userObj.city);
            $("#edit_country").attr("value", userObj.country);
            $("#edit_postal_code").attr("value", userObj.postalCode);
            $("#edit_bio").attr("value", userObj.bio);
        });
}

function updateProfile() {
    // $(".prof-update").attr("disabled", true);
    location.reload();
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        uid = user.uid;
        console.log(uid)
        populateUserData();
    } else {}
});