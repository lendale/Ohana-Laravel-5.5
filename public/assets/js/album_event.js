firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        f = user.uid;
        const firebaseRef = firebase.database().ref();
        const gen_id = firebaseRef.child('users').child(f).child('clanId');
        gen_id.once('value').then(function(snapshot) {
            key = snapshot.val();

            var eventsRef = firebaseRef.child('events').child(key);


            eventsRef.once('value').then((data) => {

                const snapshot = data.val();

                console.log(snapshot);                
                
            });
        });
    } else {

        console.log('no user logged in');

    }
});



        function createEventAlbum() {
            
            var album_data = new Object()
            var album_name = $('#album_name').val();
            var album_description = $('#album_description').val();
            // var album_privacy = $("input[name='album_privacy']:checked").val();

            // getUploaderName(uid);  
            getUploadTime();

            console.log(currentUser.displayName)

            album_data = {
                
                album_name: album_name,
                album_description: album_description,
                album_creator: currentUser.displayName,
                album_privacy: album_privacy
            }

            console.log('ALBUM_DATA:', album_data)

            var albumDataRef = firebase.database().ref().child('user_album').child(currentUser.uid).child(albumKey);
            albumDataRef.set(album_data);

            console.log('************************YOU HAVE REACHED THE END OF CREATING YOUR ALBUM!!*******************************')

            showSuccess()

            return location.reload();


        }