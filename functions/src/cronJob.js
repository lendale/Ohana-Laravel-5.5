const functions = require('firebase-functions');
const admin = require('firebase-admin');
const index = require('../index');


exports.dateJob = function(req, res) {

    res.status(200).send(`<h1>Success!</h1>`);

    const firebaseRef = admin.database().ref();

    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();

    if (day <= 9 && month <= 9) {

        var shortDate = "0" + month + "/" + "0" + day + "/" + year;

    } else if (month <= 9) {

        var shortDate = "0" + month + "/" + day + "/" + year;

    } else if (day <= 9) {

        var shortDate = month + "/" + "0" + day + "/" + year;
    } else {

        var shortDate = month + "/" + day + "/" + year;

    }

    console.log(shortDate);


    
    admin.database().ref('/events').once('value').then((data) => {

        EventsClan = data.val();
        var eKey = Object.keys(EventsClan);

        eKey.forEach(function(element) {

            admin.database().ref('/events').child(element).once('value').then(function(data) {

                key = data.val();
                var kKey = Object.keys(key)

                kKey.forEach(function(elements) {

                    EventsDate = admin.database().ref('/events').child(element).child(elements).child('Date')
                    EventsDate.on('value', snapshot => {

                        var dKey = snapshot.val();

                        if (dKey == shortDate) {

                            var user = admin.database().ref('/events').child(element).child(elements).child('uName')
                            user.on('value', snapshot => {

                                var username = snapshot.val();

                                var eUser = admin.database().ref('/events').child(element).child(elements).child('uid')
                                eUser.on('value', snapshot => {

                                    var uUid = snapshot.val();

                                    var ePhoto = admin.database().ref('/events').child(element).child(elements).child('Photo')
                                    ePhoto.on('value', snapshot => {

                                        var photo = snapshot.val();

                                        var firebaseRef = admin.database().ref();

                                        firebaseRef
                                            .child('/eventsReminder')
                                            .child(uUid)
                                            .push({
                                                user: username,
                                                message: 'remind',
                                                Photo: photo

                                            }).then(() => eRKey.remove())

                                          if(dKey < shortDate)
                                          {
                                            EventsDate.remove()
                                          }
                                          else{
                                            console.log('nothing to remove')
                                          }
                                    })
                                })
                            })
                        } else {

                            console.log('false')
                        }
                    });
                })
            })
        })
    })
}