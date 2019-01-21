const functions = require('firebase-functions');
const admin = require('firebase-admin');
const index = require('../index');

exports.eventsReminder = function(event) {
    eRUID = admin.database().ref('eventsReminder')
    eRUID.on('value', snapshot => {
        let eUID = snapshot.val();
        var uid = Object.keys(eUID);

        uid.forEach(function(uid) {
            var uUid = uid;
            var eRKey = eRUID.child(uid)
            
            eRKey.on('value', snapshot => {
                let eKey = snapshot.val();
                let key = Object.keys(eKey)

                key.forEach(function(key) {
                    var eUser = eRKey.child(key).child('user')
                    eUser.on('value', snapshot => {
                        let user = snapshot.val();
                        var ePhoto = eRKey.child(key).child('Photo')

                        ePhoto.on('value', snapshot => {
                            let photo = snapshot.val();
                        })
                    })
                })
            })
        })

        var firebaseRef = admin.database().ref('/notifications');

        firebaseRef.child(uUid).push({
            user: user,
            message: 'remind',
            avatar: photo
        })
        return eRKey.remove()
    })
}