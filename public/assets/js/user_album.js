var clanId;

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        var uid = firebase.auth().currentUser.uid;
        var photoUrl = document.getElementById('photoUrl');

        var albumRef = firebase.database().ref().child('user_album').child(uid);
        var albumData = [];

        getUserTreeId(uid);

        albumRef.once('value')
            .then(function(data) {
                data.forEach(function(childData) {
                    albumData.push(childData.val())
                })
            })
            .then(function() {
                var html = '';
                $.each(albumData, function(key, value) {

                    html += '<div class="col s12 m6 l2"><div class="card small z-depth-5"><div class="card-image"><img width="250" src="' + value.photoUrl + '" id="photoUrl"></div><div class="card-content"><p class="card-subtitle grey-text text-darken-2">' +
                        value.caption + '</p></div>&nbsp;';

                    html += '</div></div>';
                });
                $('#card-container').html(html);
            });


        //Get Element
        var uploader = document.getElementById('uploader');
        var fileButton = document.getElementById('fileButton');

        //Listen for file selection
        fileButton.addEventListener('change', function(e) {

            //Get File
            var file = e.target.files[0];
            var fileExtension = getFileExtension(file.name);

            var clanPicKey = firebase.database().ref().child('clan_album').push().getKey();

            //Create a storage ref
            //   var storageRef = firebase.storage().ref('album/'+file.name);
            var storageRef = firebase.storage().ref('album-test/' + clanId + '/' + uid + clanPicKey + '.' + fileExtension);
            console.log(file)

            //Upload File
            var task = storageRef.put(file);

            //Update progress bar
            task.on('state_changed',
                function progress(snapshot) {
                    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    uploader.value = percentage;
                    console.log('Upload is ' + percentage + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                },
                function error(err) {
                    window.alert('ERROR');
                },

                function complete() {
                    var uid = firebase.auth().currentUser.uid;
                    var caption = document.getElementById('imgCaption');
                    var caption = caption.value;

                    var uploader = document.getElementById('uploader');
                    var downloadURL = task.snapshot.downloadURL;
                    var blah;
                    var uploadData = {
                        extension: fileExtension,
                        photoUrl: downloadURL,
                        caption: caption
                    };


                    var photoRef = firebase.database().ref('user_album').child(uid);
                    var albumRef = firebase.database().ref('users').child(uid);
                    var clanRef = firebase.database().ref('clan_album');
                    getClanId(user.uid);

                    function getClanId(uid) {
                        albumRef
                            .once("value")
                            .then(function(snapshot) {
                                blah = snapshot.val().clanId;
                            })
                            .then(function() {
                                getClanAlbumData(blah);
                            });
                    }

                    function getClanAlbumData(clanID) {
                        var clanAlbumRef = clanRef.child(clanID);
                        clanAlbumRef.child(clanPicKey).set(uploadData);
                        console.log(uploadData)
                    }

                    photoRef.child(clanPicKey).set(uploadData);

                    console.log(uid);
                    console.log(uploadData);
                    window.alert('Successfully Uploaded Photo')
                    location.reload();
                }
            );
        })
    }
});

function getFileExtension(filename) {
    return filename.split('.').pop();
}

function getUserTreeId(uid) {
    firebase
        .database()
        .ref()
        .child('users')
        .child(uid)
        .once("value")
        .then(function(snapshot) {
            clanId = snapshot.val().clanId;
        })
}