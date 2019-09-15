const functions = require('firebase-functions');
const admin = require('firebase-admin');
const index = require('../index')


exports.sendNotifications = function(data, context) {

    var currUser = context.params.uid
    // Setup notification
    let NOTIFICATION_SNAPSHOT = data.val();
    const payload = message();
    webNotif()


    function message(a) {
        const message = NOTIFICATION_SNAPSHOT.message;


        if (message == 'Obituary') {

            var msg = {
                notification: {
                    title: `Ohana`,
                    body: `${NOTIFICATION_SNAPSHOT.message} invitation`,
                    icon: NOTIFICATION_SNAPSHOT.avatar,
                    // click_action: `https://${functions.config().firebase.authDomain}/events`
                    click_action: `localhost:8000/events`
                }
            }


        } else if (message == 'Wedding') {
            var msg = {
                notification: {
                    title: `Ohana`,
                    body: `You have been invited to a ${NOTIFICATION_SNAPSHOT.message} from ${NOTIFICATION_SNAPSHOT.user}`,
                    icon: NOTIFICATION_SNAPSHOT.avatar,
                    // click_action: `https://${functions.config().firebase.authDomain}/events`
                    click_action: `localhost:8000/events`
                }
            }

        } else if (message == 'Baptism') {
            var msg = {
                notification: {
                    title: `Ohana`,
                    body: `You have been invited to a ${NOTIFICATION_SNAPSHOT.message} from ${NOTIFICATION_SNAPSHOT.user}`,
                    icon: NOTIFICATION_SNAPSHOT.avatar,
                    // click_action: `https://${functions.config().firebase.authDomain}/events`
                    click_action: `localhost:8000/events`
                }
            }

        } else {
            var msg = {
                notification: {
                    title: `Ohana`,
                    body: `Reminder: You've got an Event comming up today.`,
                    icon: NOTIFICATION_SNAPSHOT.avatar,
                    // click_action: `https://${functions.config().firebase.authDomain}/events`
                    click_action: `localhost:8000/events`
                }
            }

        }
        const msgPayload = msg;


        return msgPayload;



    }

    function webNotif() {

        notifData = new Object();
        notifKey = admin.database().ref('notifications').push().getKey();

        notifData = {

            icon: NOTIFICATION_SNAPSHOT.avatar,
            user: NOTIFICATION_SNAPSHOT.user,
            message: NOTIFICATION_SNAPSHOT.message,
            uid: currUser

        };


        admin.database().ref('notifications').child(notifKey).child(notifKey).set(notifData)
        admin.database().ref('notif_privacy').child(NOTIFICATION_SNAPSHOT.privacy).child(currUser).child(notifKey).set(notifKey);


    }
    // kuwang pa ang Immediate 
    const extended_id = admin.database().ref().child('users').child(currUser).child('extendedId');
    extended_id.once('value').then(function(extended) {

        key = extended.val();
        admin.database().ref('extended_family').child(key).once('value').then((extendedFamily) => {

            extendedFamily.forEach(function(uid) {
                id = uid.val();
                admin.database().ref('tokens').child(id).once('value').then((data) => {
                    // console.log("Exnteded FamilyID:", uid.val())
                    // if (!data.val()) return;

                    const snapshot = data.val();
                    const tokens = [];
                    const tokensWithKey = [];


                    const userToken = admin.database().ref('tokens').child(currUser).child('token');
                    userToken.once('value').then((data) => {

                        const currToken = data.val();


                        for (let id in snapshot) {
                            // console.log("snapshotID", snapshot[id])
                            // if (snapshot[id] != currUser) {
                                console.log(snapshot[id].token)
                            tokens.push(snapshot[id].token);
                            // tokensWithKey.push({
                            //     token: snapshot[id].token,
                            //     key: id
                            // });
                            // } else {

                            //    return console.log('Wai labot ang user');
                            // }
                        }



                        console.log("Tokens:", tokens)
                        console.info("Payload:", payload)


                        return admin.messaging().sendToDevice(tokens, payload)
                            // .then((response) => cleanInvalidTokens(tokensWithKey, response.results))
                            .then(() => admin.database().ref('/pushNotif').child(currUser).child(NOTIFICATION_SNAPSHOT.key).remove())
                            .catch(function(err) {
                                return eRKey.remove()
                                console.log('naay error')
                            });

                    });
                });
            });
        });
    });
}