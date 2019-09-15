firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
        currentUser = user;
        uid = currentUser.uid;
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

const messaging = firebase.messaging();
const sendNotificationForm = document.getElementById('send-notification-form');
sendNotificationForm.addEventListener('submit', sendNotification);


// Put it in Events.js  
// ADD EVENTS //
var dateTxt = document.getElementById("Date");
var timeTxt = document.getElementById("time");
var titleTxt = document.getElementById("eventTitle");
var desc = document.getElementById("desc");
var venueTxt = document.getElementById("venue");
var eventAlbum1 = document.getElementById('check');
var coverData = $('#wizard_picture').change();
var albumKey = firebase.database().ref().child('album').push().getKey();
var eventKey = firebase.database().ref().child('events').push().getKey();
var albumCoverURL;
var eventCoverURL;
var strRef;
var eventStrRef;
$('#wizard_picture').change(handleEventCoverInStr);

console.log(dateTxt.value)

function addClick() {
    var e = $("#eventSlct").val();
    const firebaseRef = firebase.database().ref();



    if (document.getElementById('Extended').checked) {

        var privacy = 'Extended';
        var currentUser = firebase.auth().currentUser.uid;
        eventKey = firebaseRef.child('events').push().getKey();
        var users = firebaseRef.child('users');
        var extendedId = firebaseRef.child('users').child(currentUser).child('extendedId');
        var extendedFamilyRef = firebaseRef.child('extended_family');

        extendedId.once('value').then(function(snapshot) {
            extendedId = snapshot.val();
            extendedFamilyRef.child(extendedId).once('value')
                .then(function(data) {
                    data.forEach(function(childDataKeys) {
                        users.child(childDataKeys.val()).once('value')
                            .then(function(snap) {
                                if (snap.key != currentUser) {
                                    firebaseRef.child("event_response").child(eventKey).child("Not Going").child(snap.key).set(snap.key)
                                } else {
                                    console.log("User not included")
                                }
                            })
                    })
                })
        })

        eventData = new Object();

        eventData = {
            Event: e,
            Venue: venueTxt.value,
            Date: dateTxt.value,
            Time: timeTxt.value,
            Title: titleTxt.value,
            Description: desc.value,
            Privacy: privacy,
            album_key: albumKey,
            event_key: eventKey,
            event_cover: eventCoverURL,
            event_cover_link: eventStrRef,
            uName: firebase.auth().currentUser.displayName,
            uid: currentUser,
            Photo: firebase.auth().currentUser.photoURL,

        };

        firebaseRef.child('events').child(eventKey).child(eventKey).set(eventData)
        firebaseRef.child('events_privacy').child('Extended').child(currentUser).child(eventKey).set(eventKey);
        firebaseRef.child("event_response").child(eventKey).child("Going").child(currentUser).set(currentUser)

        if (eventAlbum1.checked == true) {

            console.log("true");

            return createEventAlbum(privacy, albumKey);

        } else {

            console.log("false");
        }

        return window.location.replace("http://localhost:8000/events");



    } else if (document.getElementById('Immediate').checked) {

        var privacy = 'Immediate';
        var currentUser = firebase.auth().currentUser.uid;
        eventKey = firebaseRef.child('events').push().getKey();
        var users = firebaseRef.child('users');
        var immediatedId = firebaseRef.child('users').child(currentUser).child('familyId');
        var immediateFamilyRef = firebaseRef.child('immediate_family');

        immediatedId.once('value').then(function(snapshot) {
            immediatedId = snapshot.val();
            immediateFamilyRef.child(immediatedId).once('value')
                .then(function(data) {
                    data.forEach(function(childDataKeys) {

                        if (childDataKeys.key == "brother") {

                            childDataKeys.forEach(function(brother) {
                                users.child(brother.val()).once('value')
                                    .then(function(snap) {
                                        firebaseRef.child("event_response").child(eventKey).child("Not Going").child(snap.key).set(snap.key)
                                    })
                            })
                        } else if (childDataKeys.key == "sister") {

                            childDataKeys.forEach(function(sister) {
                                users.child(sister.val()).once('value')
                                    .then(function(snap) {
                                        firebaseRef.child("event_response").child(eventKey).child("Not Going").child(snap.key).set(snap.key)
                                    })
                            })
                        } else if (childDataKeys.key == "son") {

                            childDataKeys.forEach(function(son) {
                                users.child(son.val()).once('value')
                                    .then(function(snap) {
                                        firebaseRef.child("event_response").child(eventKey).child("Not Going").child(snap.key).set(snap.key)
                                    })
                            })
                        } else if (childDataKeys.key == "daughter") {

                            childDataKeys.forEach(function(daughter) {
                                users.child(daughter.val()).once('value')
                                    .then(function(snap) {
                                        firebaseRef.child("event_response").child(eventKey).child("Not Going").child(snap.key).set(snap.key)
                                    })
                            })
                        } else if (childDataKeys.key == "husband") {

                            childDataKeys.forEach(function(husband) {
                                users.child(husband.val()).once('value')
                                    .then(function(snap) {
                                        firebaseRef.child("event_response").child(eventKey).child("Not Going").child(snap.key).set(snap.key)
                                    })
                            })
                        } else if (childDataKeys.key == "wife") {

                            childDataKeys.forEach(function(wife) {
                                users.child(wife.val()).once('value')
                                    .then(function(snap) {
                                        firebaseRef.child("event_response").child(eventKey).child("Not Going").child(snap.key).set(snap.key)
                                    })
                            })
                        } else if (childDataKeys.key == "father") {

                            users.child(childDataKeys.val()).once('value')
                                .then(function(snap) {
                                    firebaseRef.child("event_response").child(eventKey).child("Not Going").child(snap.key).set(snap.key)
                                })

                        } else if (childDataKeys.key == "mother") {

                            users.child(childDataKeys.val()).once('value')
                                .then(function(snap) {
                                    firebaseRef.child("event_response").child(eventKey).child("Not Going").child(snap.key).set(snap.key)
                                })
                        } else if (childDataKeys.key == "user") {

                            users.child(childDataKeys.val()).once('value')
                                .then(function(snap) {
                                    if (snap.key != currentUser) {
                                        firebaseRef.child("event_response").child(eventKey).child("Not Going").child(snap.key).set(snap.key)
                                    } else {
                                        console.log("User not included")
                                    }
                                })
                        }
                    })

                })
        })

        eventData = new Object();

        eventData = {
            Event: e,
            Venue: venueTxt.value,
            Date: dateTxt.value,
            Time: timeTxt.value,
            Title: titleTxt.value,
            Description: desc.value,
            Privacy: privacy,
            album_key: albumKey,
            event_key: eventKey,
            event_cover: eventCoverURL,
            event_cover_link: eventStrRef,
            uName: firebase.auth().currentUser.displayName,
            uid: currentUser,
            Photo: firebase.auth().currentUser.photoURL,

        };

        console.log(eventData)

        firebaseRef.child('events').child(eventKey).child(eventKey).set(eventData)
        firebaseRef.child('events_privacy').child('Immediate').child(currentUser).child(eventKey).set(eventKey);
        firebaseRef.child("event_response").child(eventKey).child("Going").child(currentUser).set(currentUser)

        if (eventAlbum1.checked == true) {

            console.log("true");

            return createEventAlbum(privacy, albumKey);


        } else {

            console.log("false");
        }


        return window.location.replace("http://localhost:8000/events");

    }

}


function updateClick() {

    const firebaseRef = firebase.database().ref();
    var e = $("#eventSlct").val();
    var eventKey = document.getElementById("eventKey");
    var dateTxt = document.getElementById("Date");
    var timeTxt = document.getElementById("time");
    var titleTxt = document.getElementById("eventTitle");
    var desc = document.getElementById("desc");
    var venueTxt = document.getElementById("venue");
    updatedData = new Object();

    updatedData = {
        Event: e,
        Venue: venueTxt.value,
        Date: dateTxt.value,
        Time: timeTxt.value,
        Title: titleTxt.value,
        Description: desc.value,

    };


    firebaseRef.child('events').child(eventKey.value).child(eventKey.value).update(updatedData)
    showSuccessUpdate()
}


function handleEventCoverInStr(eventData) {

    console.log(albumKey)
    console.log(eventData)
    var file = eventData.target.files[0];
    var fileName = file.name;
    var fileExtension = fileName.split(".").pop();

    console.log(albumKey)
    strRef = 'ALBUM/' + albumKey + fileExtension;
    eventStrRef = 'EVENTS/' + eventKey + fileExtension;
    var albumStorageRef = firebase.storage().ref(strRef);
    var eventStorageRef = firebase.storage().ref(eventStrRef)

    console.log('FILE:', file)
    console.log('FILENAME:', fileName)
    console.log('FILE EXTENSION:', fileExtension)

    if (file.size <= 100000) {

        $('#next').on('click', function() {
            console.log('FILE TO STORAGE:', file)
            if (file == null) {
                showPhotoNull()
            } else {
                var task = albumStorageRef.put(file);
                var event_task = eventStorageRef.put(file)
                task.on('state_changed', function complete() {
                    uid = firebase.auth().uid;
                    albumCoverURL = task.snapshot.downloadURL;
                    console.log(albumCoverURL)
                })

                event_task.on('state_changed', function complete() {
                    uid = firebase.auth().uid;
                    eventCoverURL = event_task.snapshot.downloadURL;
                    console.log(eventCoverURL)
                })
            }
        })
    } else {
        showPhotoError()
    }


}


function createEventAlbum(privacy, albumKey) {

    var currentUser = firebase.auth().currentUser.uid;
    var album_data = new Object();
    var album_name = titleTxt.value;
    var album_description = desc.value;
    var album_privacy = privacy;
    var album_date = dateTxt.value;
    var album_time = timeTxt.value;

    album_data = {

        album_name: album_name,
        album_description: album_description,
        album_creator: firebase.auth().currentUser.displayName,
        album_privacy: album_privacy,
        album_creatorId: currentUser,
        album_key: albumKey,
        album_time: album_time,
        album_date: album_date,
        album_cover: albumCoverURL,
        album_url: strRef,
        photo_url: 'PHOTOS/' + albumKey + '/'
    }

    console.log('ALBUM_DATA:', album_data)
    console.log(album_privacy)
    var albumDataRef = firebase.database().ref().child('album').child(albumKey).child(albumKey);
    albumDataRef.set(album_data);


    if (album_privacy == "Extended") {
        console.log('Here')
        firebase.database().ref().child('album_privacy').child('extended').child(currentUser).child(albumKey).set(albumKey);

    }
    if (album_privacy == "Immediate") {

        console.log('Here')
        firebase.database().ref().child('album_privacy').child('immediate').child(currentUser).child(albumKey).set(albumKey);
    }

    console.log('************************YOU HAVE REACHED THE END OF CREATING YOUR ALBUM!!*******************************')

    showSuccess()


}

function showSuccess() {
    swal({
        // imageUrl: "assets/img/grow-tree.gif",
        title: "Album Created Successfully",
        // text: "Please wait",
        timer: 5000,
        showConfirmButton: false,
        type: "success"
    }).then(function() {},

        function(dismiss) {
            if (dismiss === "timer") {
                return window.location.replace("http://localhost:8000/events");
            }
        })
}

function showSuccessUpdate() {
    swal({
        title: "Events Updated!",
        timer: 5000,
        showConfirmButton: false,
        type: "success"
    }).then(function() {},
        function(dismiss) {
            if (dismiss === "timer") {
                return window.location.replace("http://localhost:8000/events");
            }
        })
}


function tokenRefresh() {

    const currUser = firebase.auth().currentUser.uid;
    // const extended_id = firebase.database().ref().child('users').child(currUser).child('extendedId');
    // extended_id.once('value').then(function(extended) {
    //     key = extended.val();

    return messaging.getToken()
        .then(function(token) {
            firebase.database().ref('/tokens').once('value')
                .then(function(snapshot) {
                    checkID = snapshot.val();

                    var firebaseRef = firebase.database().ref('/tokens');
                    firebaseRef
                        .child(currUser)
                        .child(currUser)
                        .set({
                            token: token
                        });

                })
        });
    // });
}


function sendNotification(e) {
    e.preventDefault();

    const notificationMessage = $("#eventSlct").val();
    const currUser = firebase.auth().currentUser.uid;
    var firebaseRef = firebase.database().ref('/pushNotif').child(currUser);

    firebase.database().ref().child('users').child(currUser).child('photoURL').once('value').then(
        function(snapshot) {

            //  
            if (document.getElementById('Extended').checked) {

                var privacy = 'Extended';

                firebaseRef.push({
                        user: firebase.auth().currentUser.displayName,
                        message: notificationMessage,
                        privacy: privacy,
                        avatar: snapshot.val()
                    }).then(() => {

                        // document.getElementById('notification-message').value = "";

                    })
                    .catch((e) => {

                        console.log(e)

                    });
            } else if (document.getElementById('Immediate').checked) {

                var privacy = 'Immediate';

                firebaseRef.push({
                        user: firebase.auth().currentUser.displayName,
                        message: notificationMessage,
                        privacy: privacy,
                        avatar: snapshot.val()
                    }).then(() => {

                        // document.getElementById('notification-message').value = "";

                    })
                    .catch((e) => {

                        console.log(e)

                    });
            }

        })

}