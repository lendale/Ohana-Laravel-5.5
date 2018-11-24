const messaging = firebase.messaging();
const sendNotificationForm = document.getElementById('send-notification-form');
// const request = require('request');
sendNotificationForm.addEventListener('submit', sendNotification);


// Put it in Events.js  
 // ADD EVENTS //
var dateTxt = document.getElementById("Date");
var timeTxt = document.getElementById("time");
var titleTxt = document.getElementById("notification-message");
var descTxt = document.getElementById("desc");


function addClick() {
    var e = $("#eventSlct").val();

    const firebaseRef = firebase.database().ref();
    const currentUser = firebase.auth().currentUser.uid;
    const gen_id = firebaseRef.child('users').child(currentUser).child('clanId');

    gen_id.once('value').then(function(snapshot) {
        key = snapshot.val();

        firebaseRef
            .child("events")
            .child(key)
            .push({
                Event: e,
                Date: dateTxt.value,
                Time: timeTxt.value,
                Title: titleTxt.value,
                Description: desc.value,
                uName: firebase.auth().currentUser.displayName,
                uid: currentUser,
                Photo: firebase.auth().currentUser.photoURL,


            });

        return location.reload();

    });
}



function tokenRefresh() {




    const currUser = firebase.auth().currentUser.uid;
    const gen_id = firebase.database().ref().child('users').child(currUser).child('clanId');
    gen_id.once('value').then(function(snapshot) {
        key = snapshot.val();


        return messaging.getToken()
            .then(function(token) {
                firebase.database().ref('/tokens').once('value').then(function(snapshot) {
                    checkID = snapshot.val();

                    
                    // if (checkID == null) {
                    var firebaseRef = firebase.database().ref('/tokens');
                    firebaseRef
                        .child(key)
                        .child(currUser)
                        .set({
                            token: token
                        });
                    // } else {

                    //     console.log(token);

                    //     return firebase.database().ref('/tokens').child(key).child(currUser).child('token').remove()
                    //         .then(() => firebase.database().ref('tokens')
                    //             .child(key)
                    //             .child(currUser)
                    //             .set({
                    //                 token: token,
                    //             })

                    //         )
                    //                                  }

                })
            });
    });
}


function sendNotification(e) {
    e.preventDefault();

    const notificationMessage = $("#eventSlct").val();
    const currUser = firebase.auth().currentUser.uid;


    var firebaseRef = firebase.database().ref('/notifications').child(currUser);

    firebaseRef.push({
            user: firebase.auth().currentUser.displayName,
            message: notificationMessage,
            avatar: firebase.auth().currentUser.photoURL
        }).then(() => {
            document.getElementById('notification-message').value = "";
        })
        .catch(() => {
            console.log("error sending notifications")
        });


}




var userId;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        f = user.uid;

        messaging.requestPermission()
            .then(function() {
                console.log('Permision Granted');
                return messaging.getToken();
            })
            .then(() => tokenRefresh())
            .catch(function(err) {
                console.log(err);
            });
    } else {

        console.log('no user logged in');

    }
});


// datepicker
$(document).ready(function() {
    $('#btn_search').hide();
    materialKit.initFormExtendedDatetimepickers();
})