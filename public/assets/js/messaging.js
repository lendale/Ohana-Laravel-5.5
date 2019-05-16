const messaging = firebase.messaging();
const sendNotificationForm = document.getElementById('send-notification-form');
sendNotificationForm.addEventListener('submit', sendNotification);


// Put it in Events.js  
// ADD EVENTS //
var currentUser = firebase.auth().currentUser.uid;
var dateTxt = document.getElementById("Date");
var timeTxt = document.getElementById("time");
var titleTxt = document.getElementById("eventTitle");
var descTxt = document.getElementById("desc");
var venueTxt = document.getElementById("venue");
var eventAlbum1 = document.getElementById('check');
var albumCoverURL;
var strRef;

$('#wizard_picture').change(handleEventCoverInStr);

function addClick() {
        var e = $("#eventSlct").val();

    const firebaseRef = firebase.database().ref();
    // const ex_id       = firebaseRef.child('users').child(currentUser).child('extendedId');
    // const im_id      = firebaseRef.child('users').child(currentUser).child('immediateID');

    if (document.getElementById('Extended').checked) {

        var privacy = 'extended';
        albumKey = firebaseRef.child('album').push().getKey();
        eventKey = firebaseRef.child('events').push().getKey();
        console.log('ALBUK KEY:', albumKey)

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
            uName: firebase.auth().currentUser.displayName,
            uid: currentUser,
            Photo: firebase.auth().currentUser.photoURL,

        };
        firebaseRef.child('events').child(eventKey).child(eventKey).set(eventData)
        firebaseRef.child('events_privacy').child('extended').child(currentUser).child(eventKey).set(eventKey);

        if (eventAlbum1.checked == true) {

            console.log("true");

            return createEventAlbum(privacy, albumKey);

        } else {

            console.log("false");
        }

        return window.location.replace("http://localhost:8000/eventsExtended");

        // });

    } else if (document.getElementById('Immediate').checked) {

        var privacy = 'immediate';
        albumKey = firebaseRef.child('album').push().getKey();
        eventKey = firebaseRef.child('events').push().getKey();
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
                uName: firebase.auth().currentUser.displayName,
                uid: currentUser,
                Photo: firebase.auth().currentUser.photoURL,

            };

        firebaseRef.child('events').child(eventKey).child(eventKey).set(eventData)
        firebaseRef.child('events_privacy').child('immediate').child(currentUser).child(eventKey).set(eventKey);

        if (eventAlbum1.checked == true) {

                console.log("true");

                return createEventAlbum(privacy, albumKey);

        } else {

            console.log("false");
        }

        return window.location.replace("http://localhost:8000/eventsImmediate");
        // });
    }

}

function handleEventCoverInStr(eventData){
    var file = eventData.target.files[0];
    var fileName = file.name;
    var fileExtension = fileName.split(".").pop();

    albumKey = firebase.database().ref().child('album-cover').push().getKey();
    strRef = 'ALBUM/' +albumKey + fileExtension;
    var albumStorageRef = firebase.storage().ref(strRef);

    console.log('FILE:', file)
    console.log('FILENAME:', fileName)
    console.log('FILE EXTENSION:', fileExtension)

    if(file.size <= 100000){

    $('#next').on('click', function(){
        console.log('FILE TO STORAGE:', file)
        if(file == null){
            showPhotoNull()
        }else{
        var task = albumStorageRef.put(file);
        console.log('file was stored in storage')
        task.on('state_changed',

            function complete(){
                uid = firebase.auth().uid;
                albumCoverURL = task.snapshot.downloadURL;
                console.log(albumCoverURL)  
            })
        }
    })
    }else{
        showPhotoError()
    }

    // addClick(albumCoverURL, albumKey, strRef)
}


function createEventAlbum(privacy,albumKey,albumCoverURL) {

    var album_data = new Object();
    var album_name = titleTxt.value;
    var album_description = descTxt.value;
    var album_privacy = privacy;
    var album_date = dateTxt.value;
    var album_time = timeTxt.value;

    album_data = {

        album_name: album_name,
        album_description: album_description,
        album_creator: firebase.auth().currentUser.displayName,
        album_privacy: album_privacy,
        album_creatorId: currentUser,
        albumkey: albumKey,
        album_time: album_time,
        album_date: album_date,
        album_cover: albumCoverURL,
        album_url: strRef
    }

    console.log('ALBUM_DATA:', album_data)
    console.log(album_privacy)
    var albumDataRef = firebase.database().ref().child('album').child(albumKey).child(albumKey);
    albumDataRef.set(album_data);

    if (album_privacy == "extended") {

        firebase.database().ref().child('album_privacy').child('extended').child(currentUser).child(albumKey).set(albumKey);

    }
    if (album_privacy == "immediate") {

        firebase.database().ref().child('album_privacy').child('immediate').child(currentUser).child(albumKey).set(albumKey);
    }

    console.log('************************YOU HAVE REACHED THE END OF CREATING YOUR ALBUM!!*******************************')

    showSuccess()
    return window.location.replace("http://localhost:8000/eventsImmediate");

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
                location.reload()
            }
        })
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
        .catch((e) => {

            console.log(e)

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


// // datepicker
// $(document).ready(function() {
//     $('#btn_search').hide();
//     materialKit.initFormExtendedDatetimepickers();
// })