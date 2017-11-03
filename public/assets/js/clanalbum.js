var userTreeId;
var clanAlbumData = [];

var usersRef = firebase.database().ref().child('users');
var clanAlbumRef = firebase.database().ref().child('clan_album');

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        getUserTreeId(user.uid);
    }
})

function getUserTreeId(uid) {
    usersRef
        .child(uid)
        .once("value")
        .then(function(snapshot) {
            userTreeId = snapshot.val().clanId;
        })
        .then(function() {
            getClanAlbumData(userTreeId);
        });
}

function getClanAlbumData(clanID) {
    clanAlbumRef
        .child(clanID)
        .once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var obj = childSnapshot.val();
                clanAlbumData.push(obj);
            });
            console.log(clanAlbumData);
        })
        .then(function() {
            var html = '';
            $.each(clanAlbumData, function(key, value) {

                html += '<div class="col s12 m6 l2"><div class="card small z-depth-5"><div class="card-image"><img width="250" src="' + value.photoUrl + '" id="photoUrl"></div><div class="card-content"><p class="card-subtitle grey-text text-darken-2">' +
                    value.caption + '</p></div>&nbsp;';

                html += '</div></div>';
            });
            $('#card-container').html(html);
        })
}