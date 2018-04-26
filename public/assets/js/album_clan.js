var clanId;
var uid;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        retrieveClanImage(clanId);
    } else {
      console.log('No signed in user')
    }
});

function retrieveClanImage(clanId){
    uid = firebase.auth().currentUser.uid;
    var clanAlbumData = [];

    getUserClanId(uid);
            
    firebase
    .database()
    .ref()
    .child('clan_album')
    .child(clanId)
    .once("value")
    .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var obj = childSnapshot.val();
            clanAlbumData.push(obj);
        });
    })
    .then(function() {
            var html = '';
            $.each(clanAlbumData, function(key, value) {

                html += '<div class="col-md-4"><div class="card card-blog"><div class="card-image"><img src="' + value.photoUrl + '" id="photoUrl"></div><div class="card-content"><h4 class="card-title"><p>'+ value.uploader +'</p></h4> <p class="card-description" id="caption">'  + value.caption +  '</p><div class="footer"><i class="material-icons raised">schedule</i>&nbsp;&nbsp;'+ value.timestamp +'</div></div></div>&nbsp;';
    
                html += '</div></div>'; 
            });
                $('#card-container').html(html);
        })
}

function getUserClanId(uid) {
    firebase
        .database()
        .ref()
        .child('users')
        .child(uid)
        .once("value")
        .then(function(snapshot) {
            clanId = snapshot.val().clanId;
        })
        .then(function(){
            retrieveClanImage(clanId);
        })
}